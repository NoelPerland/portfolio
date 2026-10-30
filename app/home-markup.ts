// Static markup preserved from Noel’s original public portfolio.
export const homeMarkup = `<a class="skip-link" href="#main-content">Skip to content</a><nav>
  <div class="bar">
    <div class="brand">Noel <b>Perland</b></div>
    <ul>
      <li><a href="#work">Work</a></li>
      <li><a href="#xp">Experience</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#about">About</a></li>
    </ul>
    <div class="nav-actions">
      <button class="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch theme">
        <svg class="sun-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg class="moon-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
          <path d="M20 15.3A8 8 0 0 1 8.7 4a7 7 0 1 0 11.3 11.3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      </button>
      <a href="#contact" class="status"><span class="dot"></span>Contact</a>
    </div>
  </div>
</nav>

<main id="main-content" tabindex="-1">
<header class="hero">
  <div class="wrap">
    <div class="status"><span class="dot"></span>Stockholm, Sweden</div>
    <h1 aria-label="Full-stack developer AI builder">
      <span class="line"><span class="word word-a">Full-stack</span> <span class="pill">developer</span></span><br>
      <span class="line"><span class="word word-b">AI builder.</span></span>
    </h1>
    <p class="tagline">I build shipped React/TypeScript projects, Node.js/API-backed tools, AI workflows, and browser games. I am strongest in the space between idea and working product: user flow, data shape, debugging, deployment, and iteration.</p>
    <div class="row">
      <a href="#work" class="btn btn-dark">See my work &rarr;</a>
      <a href="/noel-perland-cv.docx" class="btn btn-ghost" download>Download CV &darr;</a>
    </div>
  </div>
</header>

<section id="about">
  <div class="wrap">
    <div class="sec-head"><h2>About</h2></div>
    <div class="about">
      <div class="photo">
        <img src="/noel-portrait.jpg" alt="Noel Perland portrait in an autumn park">
      </div>
      <div class="body">
        <p>Hi, I'm Noel. I work across <b>frontend, backend, AI workflows, deployment, and content systems</b>. I am building the kind of junior portfolio that proves range: live products, code links, shipped experiments, and enough debugging experience to be useful quickly.</p>
        <div class="currently">
          <div class="item"><span class="k">Now</span><span class="v">Fullstack / AI Architect Intern</span></div>
          <div class="item"><span class="k">Building</span><span class="v">Web tools + browser games</span></div>
          <div class="item"><span class="k">Learning</span><span class="v">AI workflows + evaluation</span></div>
          <div class="item"><span class="k">Based</span><span class="v">Stockholm, Sweden</span></div>
          <div class="item"><span class="k">Education</span><span class="v">Chas Academy + Nackademin</span></div>
          <div class="item"><span class="k">Other</span><span class="v">WordPress, support, documentation</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="work">
  <div class="wrap">
    <div class="sec-head"><h2>Work</h2></div>
    <div class="works">
<article class="work"><div class="frame"><img src="/reply-desk.png" alt="Reply Desk standalone support workspace" loading="lazy"><div class="quick"><a href="https://support-desk-ai-noel-perlands-projects.vercel.app/">Open app &nearr;</a><a href="https://github.com/NoelPerland/support-desk-ai" target="_blank" rel="noreferrer">Code &nearr;</a></div></div><div class="meta"><h3>Reply Desk</h3><span class="yr">2026</span></div><p class="desc">An AI support desk for turning customer messages into reviewed replies. Triage, edit, save, and track the next step.</p><div class="tools"><span>Next.js</span><span>TypeScript</span><span>Groq</span><span>Supabase</span></div></article>
<article class="work"><div class="frame"><img src="/minute-to-action.png" alt="Minute to Action standalone meeting journal" loading="lazy"><div class="quick"><a href="https://minute-to-action-noel-perlands-projects.vercel.app/">Open app &nearr;</a><a href="https://github.com/NoelPerland/minute-to-action" target="_blank" rel="noreferrer">Code &nearr;</a></div></div><div class="meta"><h3>Minute to Action</h3><span class="yr">2026</span></div><p class="desc">Turn meeting notes into decisions and assigned actions. Review the details, follow up, and export the work.</p><div class="tools"><span>Next.js</span><span>TypeScript</span><span>Groq</span><span>Supabase</span></div></article>
<article class="work">
        <div class="frame"><img src="/vendorflow-ai.png" alt="VendorFlow AI screenshot"><div class="quick"><a href="https://vendorflowai.apps.liivo.io" target="_blank" rel="noreferrer">Visit &nearr;</a><a href="https://github.com/NoelPerland/vendorflow-ai" target="_blank" rel="noreferrer">Code &nearr;</a></div></div>
        <div class="meta"><h3>VendorFlow AI [WIP]</h3><span class="yr">2026</span></div>
        <p class="desc">Full-stack vendor comparison tool with notes, scoring, and AI-assisted summaries. Built around product structure, state, backend/API flow, and useful AI output.</p>
        <div class="tools"><span>React</span><span>Node.js</span><span>AI workflow</span><span>Product UI</span></div>
      </article>
<article class="work">
        <div class="frame"><img src="/startup-postmortem-analyzer.png" alt="Startup Postmortem Analyzer screenshot"><div class="quick"><a href="https://185b55bb05.apps.osaas.io" target="_blank" rel="noreferrer">Visit &nearr;</a><a href="https://github.com/NoelPerland/startup-postmortem-analyzer" target="_blank" rel="noreferrer">Code &nearr;</a></div></div>
        <div class="meta"><h3>Startup Postmortem Analyzer</h3><span class="yr">2026</span></div>
        <p class="desc">AI workflow that turns a messy startup story into causes, risks, lessons, and next steps. Focused on prompt design, parsing, and clear structured output.</p>
        <div class="tools"><span>AI</span><span>Node.js</span><span>Structured output</span></div>
      </article>
<article class="work"><div class="frame"><img src="/game-hub.png" alt="Noel’s browser game collection" loading="lazy"><div class="quick"><a href="https://noelperland.github.io/noels-game-hub/" target="_blank" rel="noreferrer">Play games &nearr;</a><a href="https://github.com/NoelPerland/noels-game-hub" target="_blank" rel="noreferrer">Code &nearr;</a></div></div><div class="meta"><h3>Noel’s Game Hub</h3><span class="yr">2026</span></div><p class="desc">My browser games in one place: strategy, runners, arcade games, and experiments in interactive systems.</p><div class="tools"><span>Phaser</span><span>Three.js</span><span>Unity</span></div></article>
    </div>
  </div>
</section>

<section id="xp">
  <div class="wrap">
    <div class="sec-head"><h2>Experience</h2></div>
    <div class="xp">
      <div class="row">
        <div class="yr">Nov 2025 - May 2026</div>
        <div class="role">Full-stack / AI Architect Intern <span>- AI integration, deployment, open-source web tooling</span></div>
        <div class="place">Eyevinn Technology</div>
      </div>
      <div class="row">
        <div class="yr">Oct 2023 - Apr 2024</div>
        <div class="role">Frontend Developer Intern <span>- client websites, CMS, design handoff</span></div>
        <div class="place">Red Capes</div>
      </div>
      <div class="row">
        <div class="yr">Mar 2019 - present</div>
        <div class="role">IT Consultant <span>- support, permissions, cloud server maintenance, troubleshooting</span></div>
        <div class="place">Randstad</div>
      </div>
      <div class="row">
        <div class="yr">2022 - present</div>
        <div class="role">Frontend + full-stack studies <span>- React, Node.js, TypeScript, accessibility, CI/CD</span></div>
        <div class="place">Chas Academy / Nackademin</div>
      </div>
    </div>
  </div>
</section>

<section id="skills">
  <div class="wrap">
    <div class="sec-head"><h2>Skills</h2></div>
    <div class="skills">
      <div class="group">
        <h4>Frontend</h4>
        <div class="pills"><span class="pill">React</span><span class="pill">Next.js</span><span class="pill">TypeScript</span><span class="pill">JavaScript</span><span class="pill">HTML</span><span class="pill">CSS</span><span class="pill">Accessibility</span></div>
      </div>
      <div class="group">
        <h4>Backend</h4>
        <div class="pills"><span class="pill">Node.js</span><span class="pill">APIs</span><span class="pill">SQL</span><span class="pill">MongoDB</span><span class="pill">Auth basics</span><span class="pill">Deployment</span></div>
      </div>
      <div class="group">
        <h4>AI</h4>
        <div class="pills"><span class="pill">LLM workflows</span><span class="pill">Prompt design</span><span class="pill">Automation</span><span class="pill">Evaluation mindset</span></div>
      </div>
      <div class="group">
        <h4>Other</h4>
        <div class="pills"><span class="pill">WordPress</span><span class="pill">Debugging</span><span class="pill">Documentation</span><span class="pill">Git</span><span class="pill">IT support</span></div>
      </div>
    </div>
  </div>
</section>

</main>
<footer id="contact">
  <div class="wrap">
    <div class="contact">
      <h3>Want to <em>work together?</em></h3>
      <p>Ask about a project, collaboration, or role. Quickest reply by email.</p>
      <div class="actions">
        <a href="mailto:noel.perland@gmail.com" class="btn btn-mail" aria-label="Email Noel">
          <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          noel.perland@gmail.com &rarr;
        </a>
        <a href="https://github.com/NoelPerland" target="_blank" rel="noreferrer" class="btn btn-social" aria-label="GitHub">
          <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.8 12.8 0 0 0-6.7 0C6.7.3 5.6.6 5.6.6a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 4.1 8c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          GitHub &nearr;
        </a>
        <a href="https://www.linkedin.com/in/noel-perland/" target="_blank" rel="noreferrer" class="btn btn-social" aria-label="LinkedIn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 9h4v12H2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 4h.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>
          LinkedIn &nearr;
        </a>
      </div>
    </div>
    <div class="colophon">
      <span>&copy; 2026 Noel Perland</span>
    </div>
  </div>
</footer>`;
