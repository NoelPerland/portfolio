import { notFound } from "next/navigation";
import type { Metadata } from "next";
import OriginalTheme from "../../original-theme";
import "../../original-home.css";

const projects = {
  "reply-desk": {
    title: "Reply Desk",
    goal: "Turn a customer request into a reviewed reply and trackable next step.",
    architecture: "Next.js and TypeScript handle the workspace. Server routes validate bounded input and model output. Supabase stores editable tickets under row-level access rules; an HttpOnly cookie identifies guest work.",
    decision: "The model drafts; the user edits and chooses status. Provider errors retain the request instead of inventing an answer. Company context stays in browser storage.",
    evidence: "Validation, provider failure, export and draft-recovery checks pass. Registration stays disabled while real account and confirmation-email flows await verification.",
    live: "https://support-desk-ai-noel-perlands-projects.vercel.app/",
    code: "https://github.com/NoelPerland/support-desk-ai",
  },
  "minute-to-action": {
    title: "Minute to Action",
    goal: "Turn rough meeting notes into decisions, actions and unresolved questions.",
    architecture: "Next.js and TypeScript provide the journal and action board. Server-side model output is validated before editable records reach Supabase.",
    decision: "Unknown owners and dates remain unassigned. Only explicit dates drive overdue status. Markdown and CSV exports preserve edits; provider failures keep source notes.",
    evidence: "Output validation, action state, export and draft-recovery checks pass. Real account login and email delivery remain unverified.",
    live: "https://minute-to-action-noel-perlands-projects.vercel.app/",
    code: "https://github.com/NoelPerland/minute-to-action",
  },
  "game-hub": {
    title: "Noel’s Game Hub",
    goal: "Make nine independently built games easy to discover and play.",
    architecture: "A Vite launcher collects metadata, thumbnails, source links and release URLs. Each game has its own repository and GitHub Pages deployment.",
    decision: "Games retain their own saves and progression. Release builds use the Pages subfolder base so assets resolve. Browser checks exercise input and outcomes.",
    evidence: "Nine cards and assets pass checks. Cube has a full keyboard completion check; other games have targeted touch, save and restart checks. Full campaigns and physical devices remain open.",
    live: "https://noelperland.github.io/noels-game-hub/",
    code: "https://github.com/NoelPerland/noels-game-hub",
  },
} as const;

type Slug = keyof typeof projects;
export function generateStaticParams() { return Object.keys(projects).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug in projects ? `${projects[slug as Slug].title} — Noel Perland` : "Project — Noel Perland" };
}
export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in projects)) notFound();
  const project = projects[slug as Slug];
  return <><OriginalTheme /><main className="original-portfolio case-study">
    <a className="back" href="/#work">← All work</a>
    <p className="eyebrow">Project notes · 2026</p>
    <h1>{project.title}</h1><p className="lead">{project.goal}</p>
    <h2>How it works</h2><p>{project.architecture}</p>
    <h2>Engineering decisions</h2><p>{project.decision}</p>
    <h2>Evidence and limits</h2><p>{project.evidence}</p>
    <p className="case-links"><a href={project.live}>Open live project ↗</a><a href={project.code}>Read source ↗</a></p>
    <p className="case-note">Built with AI-assisted implementation and review. Source, tests and release history are available in the repository.</p>
  </main></>;
}
