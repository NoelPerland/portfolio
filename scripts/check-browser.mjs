import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { name } = JSON.parse(await readFile(new URL("../package.json", import.meta.url)));
const portfolio = name === "portfolio";
const socket = createServer();
await new Promise(resolve => socket.listen(0, "127.0.0.1", resolve));
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "-p", String(port), "-H", "127.0.0.1"], { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1", ENABLE_SIGNUP: "false", SUPABASE_URL: "", SUPABASE_PUBLISHABLE_KEY: "", GROQ_API_KEY: "" } });
let log = "";
server.stdout.on("data", chunk => { log += chunk; });
server.stderr.on("data", chunk => { log += chunk; });
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (server.exitCode !== null) throw new Error(`Server exited: ${log}`);
    try { const response = await fetch(base); ready = response.ok; } catch {}
    if (ready) break;
    await delay(250);
  }
  assert(ready, `Server not ready. Run npm run build first. ${log}`);
  const foreign = await fetch(base + "/api/records", { method: "POST", headers: { Origin: "https://foreign.invalid", "Content-Type": "application/json" }, body: "{}" });
  assert.equal(foreign.status, 403, "Foreign-origin mutations must be rejected before backend access");
  if (!portfolio) {
    const guest = await fetch(base + "/api/auth");
    assert.deepEqual(await guest.json(), { email: null, signupEnabled: false });
    assert(guest.headers.get("cache-control")?.includes("no-store"));
    const signup = await fetch(base + "/api/auth", { method: "POST", headers: { Origin: base, "Content-Type": "application/json" }, body: JSON.stringify({ action: "signup", email: "fixture@example.com", password: "fixture-only-password" }) });
    assert.equal(signup.status, 403, "Disabled registration must reject before backend access");
    const logout = await fetch(base + "/api/auth", { method: "DELETE", headers: { Origin: base, "Content-Type": "application/json" }, body: "{}" });
    assert.deepEqual(await logout.json(), { signedOut: true });
  }
  browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });
  if (portfolio) {
    const home = await browser.newPage();
    const homeErrors = [];
    home.on("pageerror", error => homeErrors.push(error.message));
    const externalFonts = [];
    home.on("request", request => { if (/fonts\.googleapis|fonts\.gstatic/.test(request.url())) externalFonts.push(request.url()); });
    for (const [width, height] of [[1366,768],[1920,1080],[390,844],[360,640],[844,390]]) {
      await home.setViewportSize({width,height});
      await home.goto(base);
      assert.deepEqual(await home.locator('.project-index button').allTextContents(), ['Forma Studio','GamePulse','Minute to Action','Reply Desk','GameHub','Calorie Tracker']);
      await home.locator('.project-index button').nth(3).click();
      assert.equal(await home.locator('.work:not([hidden]) .project-preview-link').getAttribute('href'), 'https://support-desk-ai-gules.vercel.app/');
      await home.locator('.theme-toggle').click();
      await home.reload();
      assert.equal(await home.locator('html').getAttribute('data-theme'), 'dark', 'Saved theme survives reload');
      for (const theme of ['dark','light']) {
        if (theme === 'light') await home.locator('.theme-toggle').click();
        assert(await home.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal page overflow');
        for (let i=0;i<6;i++) {
          await home.locator('.project-index button').nth(i).click();
          const slide=home.locator('.work:not([hidden])');
          assert.equal(await slide.count(),1);
          await slide.locator('img').evaluate(img => img.decode());
          assert.equal(await home.locator('.project-index button').nth(i).getAttribute('aria-current'),'true');
        }
        await home.getByRole('button',{name:'Next project',exact:true}).click();
        assert.equal(await home.locator('.project-index button').first().getAttribute('aria-current'),'true','Gallery wraps');
        await home.locator('.project-index button').first().focus();
        await home.keyboard.press('ArrowLeft');
        assert.equal(await home.locator('.project-index button').last().getAttribute('aria-current'),'true','Keyboard navigation wraps');
        for(let i=0;i<3;i++) {
          await home.locator('.skills-index button').nth(i).click();
          assert.equal(await home.locator('.skill-slide:not([hidden])').count(),1);
          assert.equal(await home.locator('.skills-index button[aria-current]').count(),1);
        }
      }
    }
    await home.goto(base);
    await home.keyboard.press('Tab');
    assert.equal(await home.locator(':focus').innerText(),'Skip to content');
    await home.keyboard.press('Enter');
    assert.equal(await home.locator(':focus').getAttribute('id'),'main-content');
    const cv=await home.request.get(base+'/noel-perland-cv.pdf');
    assert(cv.ok());assert((await cv.body()).subarray(0,4).toString()==='%PDF');
    for(const path of ['/work/studio-booking','/work/minute-to-action','/work/game-hub','/work/reply-desk']) {
      const response=await home.goto(base+path);assert.equal(response.status(),200);
      await home.getByRole('heading',{name:'Engineering decisions'}).waitFor();
      await home.getByRole('link',{name:'All work',exact:false}).click();
      await home.locator('.project-index').waitFor();
    }
    const noJs=await browser.newContext({javaScriptEnabled:false});
    const fallback=await noJs.newPage();await fallback.goto(base);
    assert.equal(await fallback.locator('.work:visible').count(),6,'Every project is readable without JavaScript');
    assert.equal(await fallback.locator('.skill-slide:visible').count(),3);
    await noJs.close();
    const blocked=await browser.newContext();await blocked.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error('Storage disabled')};Storage.prototype.setItem=()=>{throw new Error('Storage disabled')};});
    const storagePage=await blocked.newPage();await storagePage.goto(base);await storagePage.locator('.theme-toggle').click();assert.equal(await storagePage.locator('html').getAttribute('data-theme'),'dark');await blocked.close();
    const early=await browser.newContext();await early.addInitScript(()=>localStorage.setItem('portfolio2-theme','dark'));
    const earlyPage=await early.newPage();await earlyPage.route('**/*.js*',route=>route.abort());await earlyPage.goto(base);assert.equal(await earlyPage.locator('html').getAttribute('data-theme'),'dark','Saved theme applies before React loads');await early.close();
    await home.emulateMedia({reducedMotion:'reduce'});await home.goto(base);
    assert.equal(await home.locator('html').evaluate(el=>getComputedStyle(el).scrollBehavior),'auto');
    assert.deepEqual(homeErrors,[]);assert.deepEqual(externalFonts,[],'Fonts are served from the portfolio');
    await home.close();
    console.log('PASS: five viewport sizes, both themes, all project/skill slides, keyboard navigation, CV, build notes, disabled storage, theme before hydration, reduced motion, and no-JavaScript content.');
  }
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException("Test: storage full", "QuotaExceededError"); }; });
  await page.route("**/api/records**", route => route.fulfill({ status: route.request().method() === "GET" ? 200 : 503, contentType: "application/json", body: route.request().method() === "GET" ? "[]" : JSON.stringify({ error: "Provider unavailable" }) }));
  await page.route("**/api/auth", route => route.fulfill({ contentType: "application/json", body: JSON.stringify({ email: null, signupEnabled: false }) }));
  const warns = () => page.evaluate(() => { const event = new Event("beforeunload", { cancelable: true }); window.dispatchEvent(event); return event.defaultPrevented; });
  for (const path of portfolio ? ["/projects/support-desk", "/projects/meeting-notes"] : ["/workspace"]) {
    await page.goto(base + path);
    if (!portfolio) await page.locator(".compose-button").click();
    const input = page.locator(portfolio ? "#source" : ".compose-sheet textarea");
    const draft = "Draft text must survive a failed provider request and unavailable storage.";
    await input.fill(draft);
    await page.waitForTimeout(100);
    assert(await warns(), "Nonempty draft must warn before leaving");
    const generate = page.locator(portfolio ? ".generate" : ".compose-sheet button[type=submit]");
    await generate.click();
    await page.locator(".message.error").filter({ hasText: "Provider unavailable" }).waitFor();
    assert.equal(await input.inputValue(), draft);
    assert(await generate.isEnabled(), "Failed provider must allow retry");
    if (portfolio) {
      const dialog = page.waitForEvent("dialog");
      const click = page.locator(".primary.full").click();
      await (await dialog).dismiss();
      await click;
      assert.equal(await input.inputValue(), draft, "Canceled discard must preserve draft");
    }
    await input.fill("");
    await page.waitForTimeout(100);
    assert.equal(await warns(), false, "Empty draft must not warn");
  }
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log("PASS: blocked-storage draft guard, provider failure retains input/retry, empty draft cleanup" + (portfolio ? ", canceled discard in both tools." : "."));
  console.log("Mocked APIs only: no live AI, database, account, or isolation verification claimed.");
} finally {
  await browser?.close();
  server.kill();
}
