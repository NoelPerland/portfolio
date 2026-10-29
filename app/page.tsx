import ThemeToggle from "./theme-toggle";
export default function Home() {
  return (
    <>
      <nav className="portfolio-nav">
        <a className="wordmark" href="#">
          Noel <span>Perland</span>
          <i />
        </a>
        <div>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </div>
        <div>
          <ThemeToggle />
          <a className="nav-contact" href="mailto:noel.perland@gmail.com">
            Let’s talk ↗
          </a>
        </div>
      </nav>
      <main className="portfolio-main">
        <section className="portfolio-hero">
          <p className="location">
            <i /> Stockholm, Sweden · Open to opportunities
          </p>
          <h1>
            Full-stack developer.
            <br />
            <span>Practical AI.</span>
            <br />
            Working products.
          </h1>
          <div className="hero-bottom">
            <p>
              I turn everyday friction into useful web tools. Thoughtful
              interfaces, real APIs, and AI that helps people get something
              done.
            </p>
            <div className="hero-links">
              <a className="primary" href="#work">
                Try my work <span>↓</span>
              </a>
              <a className="secondary" href="/noel-perland-cv.docx" download>
                Download CV ↗
              </a>
            </div>
          </div>
          <p className="hero-stack">
            REACT &nbsp; / &nbsp; TYPESCRIPT &nbsp; / &nbsp; NEXT.JS &nbsp; /
            &nbsp; NODE.JS &nbsp; / &nbsp; POSTGRESQL
          </p>
        </section>
        <section id="work" className="work-section">
          <div className="section-title">
            <div>
              <p className="eyebrow">SELECTED WORK / 2026</p>
              <h2>
                Small problems.
                <br />
                Complete solutions.
              </h2>
            </div>
            <p>
              Two AI tools you can use right here.
              <br />
              Try an example, edit the result, save it, and come back to it.
            </p>
          </div>
          <article className="project-feature">
            <a
              className="project-visual triage-visual"
              href="/projects/support-desk"
              aria-label="Open Reply Desk"
            >
              <div className="mock-window">
                <div className="mock-toolbar">
                  <span>● ● ●</span>
                  <b>Reply Desk</b>
                  <span>RD</span>
                </div>
                <div className="mini-message">
                  “We were charged twice for October…”
                </div>
                <div className="mini-tags">
                  <span>HIGH PRIORITY</span>
                  <span>BILLING</span>
                </div>
                <h3>
                  A thoughtful reply.
                  <br />A clear next step.
                </h3>
                <div className="mock-lines">
                  <i />
                  <i />
                  <i />
                </div>
                <span className="mock-cta">Triage ticket →</span>
              </div>
              <span className="visual-caption">01 / SUPPORT WORKFLOW</span>
            </a>
            <div className="project-copy">
              <p className="eyebrow">01 — REPLY DESK</p>
              <h3>
                From incoming message
                <br />
                to considered response.
              </h3>
              <p>
                An AI support assistant that classifies requests, explains
                priority, and drafts a response. Edit the details and move each
                saved ticket through a simple review workflow.
              </p>
              <div className="proof-list">
                <span>Server-side AI + validated output</span>
                <span>Saved tickets, editing &amp; status tracking</span>
                <span>Isolated browser workspaces</span>
              </div>
              <div className="tech-tags">
                <span>Next.js</span>
                <span>TypeScript</span>
                <span>Supabase</span>
                <span>Groq</span>
              </div>
              <div className="project-links">
                <a className="primary" href="/projects/support-desk">
                  Open live app ↗
                </a>
                <a
                  href="https://github.com/NoelPerland/portfolio#reply-desk"
                  target="_blank"
                  rel="noreferrer"
                >
                  View source ↗
                </a>
              </div>
            </div>
          </article>
          <article className="project-feature reverse">
            <a
              className="project-visual meeting-visual"
              href="/projects/meeting-notes"
              aria-label="Open Minute to Action"
            >
              <div className="mock-window">
                <div className="mock-toolbar">
                  <span>● ● ●</span>
                  <b>Minute to Action</b>
                  <span>MA</span>
                </div>
                <p className="mini-eyebrow">WEBSITE LAUNCH CHECK-IN</p>
                <h3>
                  Less recap.
                  <br />
                  More follow-through.
                </h3>
                <div className="mini-task">
                  <span>✓</span>
                  <div>
                    Finish mobile navigation<small>Maya · Friday</small>
                  </div>
                </div>
                <div className="mini-task">
                  <span>○</span>
                  <div>
                    Review contact form<small>Leo · Before launch</small>
                  </div>
                </div>
                <span className="mock-cta">Create action plan →</span>
              </div>
              <span className="visual-caption">02 / NOTES TO ACTION</span>
            </a>
            <div className="project-copy">
              <p className="eyebrow">02 — MINUTE TO ACTION</p>
              <h3>
                A meeting ends.
                <br />
                The work gets clearer.
              </h3>
              <p>
                A meeting-notes assistant that extracts decisions, tasks,
                owners, and unresolved questions. Track action items, save your
                edits, and export a Markdown handoff.
              </p>
              <div className="proof-list">
                <span>Structured extraction from real input</span>
                <span>Editable owners, dates &amp; checklists</span>
                <span>Database persistence + Markdown export</span>
              </div>
              <div className="tech-tags">
                <span>Next.js</span>
                <span>TypeScript</span>
                <span>PostgreSQL</span>
                <span>Zod</span>
              </div>
              <div className="project-links">
                <a className="primary" href="/projects/meeting-notes">
                  Open live app ↗
                </a>
                <a
                  href="https://github.com/NoelPerland/portfolio#minute-to-action"
                  target="_blank"
                  rel="noreferrer"
                >
                  View source ↗
                </a>
              </div>
            </div>
          </article>
          <a
            className="game-hub-link"
            href="https://noelperland.github.io/noels-game-hub/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="game-symbol">✳</span>
            <div>
              <p className="eyebrow">THE PLAYFUL SIDE</p>
              <h3>I also make games.</h3>
              <p>
                Explore my browser games, interactive systems, and experiments.
              </p>
            </div>
            <span className="hub-arrow">Visit the game hub ↗</span>
          </a>
        </section>
        <section id="about" className="about-section">
          <div>
            <p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p>
            <h2>
              Curious by default.
              <br />
              Practical by habit.
            </h2>
            <p>
              I’m Noel, a Stockholm-based developer with a background in IT
              support and studies at Chas Academy and Nackademin. I enjoy
              connecting the visible part of a product to the systems behind it.
            </p>
            <p>
              My work spans React interfaces, Node.js APIs, data modelling, AI
              workflows, deployment, and debugging. These projects show how I
              bring those pieces together.
            </p>
            <a href="mailto:noel.perland@gmail.com">
              Let’s build something useful ↗
            </a>
          </div>
          <img
            src="/noel-portrait.jpg"
            alt="Noel Perland in an autumn park"
            width="480"
            height="520"
            loading="lazy"
          />
        </section>
        <section id="experience" className="experience-section">
          <div className="section-title">
            <div>
              <p className="eyebrow">EXPERIENCE &amp; EDUCATION</p>
              <h2>
                A foundation in
                <br />
                building and support.
              </h2>
            </div>
          </div>
          <div className="experience-list">
            {[
              [
                "Nov 2025 – May 2026",
                "Eyevinn Technology",
                "Full-stack / AI Architect Intern",
                "AI integration, deployment, and open-source web tooling.",
              ],
              [
                "Oct 2023 – Apr 2024",
                "Red Capes",
                "Frontend Developer Intern",
                "Client websites, CMS work, and design handoff.",
              ],
              [
                "Mar 2019 – present",
                "Randstad",
                "IT Consultant",
                "Support, permissions, cloud server maintenance, and troubleshooting.",
              ],
              [
                "2022 – present",
                "Chas Academy / Nackademin",
                "Frontend & full-stack studies",
                "React, Node.js, TypeScript, accessibility, and CI/CD.",
              ],
            ].map(([date, company, role, detail]) => (
              <div className="experience-row" key={company}>
                <span>{date}</span>
                <div>
                  <h3>{company}</h3>
                  <p>{role}</p>
                </div>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="skills-section">
          <p className="eyebrow">WHAT I WORK WITH</p>
          <div>
            {[
              "React & Next.js",
              "TypeScript",
              "Node.js & APIs",
              "PostgreSQL & SQL",
              "AI integration",
              "Accessible interfaces",
              "Git & deployment",
              "Debugging & documentation",
            ].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <p className="eyebrow">A GOOD NEXT STEP</p>
          <h2>
            Have something
            <br />
            worth building?
          </h2>
          <a href="mailto:noel.perland@gmail.com">noel.perland@gmail.com ↗</a>
          <p>
            I’m interested in developer roles where I can contribute, learn, and
            ship useful work.
          </p>
        </section>
      </main>
      <footer className="portfolio-footer">
        <span>© 2026 Noel Perland · Stockholm</span>
        <div>
          <a
            href="https://github.com/NoelPerland"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/noel-perland/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://noelperland.github.io/noels-game-hub/"
            target="_blank"
            rel="noreferrer"
          >
            Game hub ↗
          </a>
        </div>
      </footer>
    </>
  );
}
