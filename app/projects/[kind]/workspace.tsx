"use client";
import { useEffect, useState } from "react";
import {
  apps,
  exportMarkdown,
  type Kind,
  type Meeting,
  type RecordItem,
  type Result,
  type Ticket,
} from "../../../lib/domain";

export default function Workspace({ kind }: { kind: Kind }) {
  const app = apps[kind];
  const [records, setRecords] = useState<RecordItem[]>([]),
    [current, setCurrent] = useState<RecordItem | null>(null);
  const [source, setSource] = useState(""),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [dirty, setDirty] = useState(false),
    [filter, setFilter] = useState("All");
  async function request(method: string, data?: unknown) {
    const res = await fetch(
      `/api/records${method === "GET" ? `?kind=${kind}` : ""}`,
      {
        method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
      },
    );
    const value = await res.json();
    if (!res.ok)
      throw new Error(value.error || "Request failed. Please retry.");
    return value;
  }
  useEffect(() => {
    let active = true;
    request("GET")
      .then((data) => {
        if (active) setRecords(data);
      })
      .catch((e) => {
        if (active) setError(e.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [kind]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function mayLeave() {
    return !dirty || window.confirm("Discard your unsaved edits?");
  }
  function select(record: RecordItem | null) {
    if (!mayLeave()) return;
    setCurrent(record);
    setDirty(false);
    setError("");
    setNotice("");
  }
  function change(result: Result) {
    if (current) {
      setCurrent({ ...current, result });
      setDirty(true);
      setNotice("");
    }
  }
  async function generate() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const record = await request("POST", { kind, source });
      setRecords((rows) => [record, ...rows]);
      setCurrent(record);
      setSource("");
      setDirty(false);
      setNotice("AI draft created and saved. Review it before use.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function save() {
    if (!current) return;
    setBusy(true);
    setError("");
    try {
      const saved = await request("PATCH", {
        kind,
        id: current.id,
        result: current.result,
        state: current.state,
      });
      setRecords((rows) => rows.map((r) => (r.id === saved.id ? saved : r)));
      setCurrent(saved);
      setDirty(false);
      setNotice("Changes saved to your workspace.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (
      !current ||
      !window.confirm("Delete this saved item? This cannot be undone.")
    )
      return;
    setBusy(true);
    setError("");
    try {
      await request("DELETE", { kind, id: current.id });
      setRecords((rows) => rows.filter((r) => r.id !== current.id));
      setCurrent(null);
      setDirty(false);
      setNotice("Item deleted.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function download() {
    if (!current) return;
    const url = URL.createObjectURL(
      new Blob([exportMarkdown(current)], {
        type: "text/markdown;charset=utf-8",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${kind}-${current.id.slice(0, 8)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }
  const visible = records.filter((r) => filter === "All" || r.state === filter);
  const result = current?.result;
  return (
    <main className={`workspace ${kind}`}>
      <header className="app-nav">
        <a href="/">← Noel’s portfolio</a>
        <a
          href={
            kind === "support-desk"
              ? "/projects/meeting-notes"
              : "/projects/support-desk"
          }
        >
          Try {kind === "support-desk" ? "Minute to Action" : "Reply Desk"} ↗
        </a>
      </header>
      <div className="workspace-heading">
        <span className="app-mark">{app.mark}</span>
        <div>
          <p className="eyebrow">{app.eyebrow}</p>
          <h1>
            {app.name}
            <span className="demo-tag">Live demo</span>
          </h1>
        </div>
        <span className="workspace-note">
          Private browser workspace
          <br />
          Saved for 30 days
        </span>
      </div>
      <div className="workspace-grid">
        <aside className="saved-panel">
          <div className="panel-heading">
            <h2>Your {kind === "support-desk" ? "tickets" : "meetings"}</h2>
            <span>{records.length}</span>
          </div>
          <button
            className="primary full"
            disabled={busy}
            onClick={() => select(null)}
          >
            ＋ New {app.item}
          </button>
          <label className="filter">
            View
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {["All", "Open", "Reviewed", "Done"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          {loading ? (
            <p className="muted">Loading your workspace…</p>
          ) : visible.length ? (
            visible.map((r) => (
              <button
                disabled={busy}
                className={`saved-item ${current?.id === r.id ? "selected" : ""}`}
                key={r.id}
                onClick={() => select(r)}
              >
                <span>{r.state}</span>
                <strong>{r.result.title}</strong>
                <small>
                  {new Date(r.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </button>
            ))
          ) : (
            <div className="empty-list">
              <span>↗</span>
              <p>
                {records.length
                  ? "No items in this view."
                  : `Your next ${app.item} starts here.`}
              </p>
              <small>Generate a draft and it will appear in this list.</small>
            </div>
          )}
        </aside>
        <section className="editor-panel" aria-label="Project workspace">
          {error && (
            <div role="alert" className="message error">
              {error}
              <button onClick={() => setError("")} aria-label="Dismiss error">
                ×
              </button>
            </div>
          )}
          {notice && (
            <p role="status" className="message success">
              {notice}
            </p>
          )}
          {!current ? (
            <>
              <p className="eyebrow">FROM RAW TEXT TO READY TO REVIEW</p>
              <h2 className="editor-headline">{app.headline}</h2>
              <p className="editor-intro">{app.description}</p>
              <div className="input-heading">
                <label htmlFor="source">{app.inputLabel}</label>
                <button
                  className="text-button"
                  disabled={busy}
                  onClick={() => {
                    setSource(app.sample);
                    setError("");
                  }}
                >
                  Use example ↗
                </button>
              </div>
              <textarea
                id="source"
                className="source-input"
                value={source}
                maxLength={6000}
                onChange={(e) => setSource(e.target.value)}
                placeholder={app.placeholder}
                disabled={busy}
              />
              <div className="input-footer">
                <span>{source.length.toLocaleString()} / 6,000 characters</span>
                <span>30 characters minimum</span>
              </div>
              <button
                className="primary generate"
                disabled={busy || source.trim().length < 30}
                onClick={generate}
              >
                {busy ? (
                  <>
                    <span className="spinner" /> Analysing and saving…
                  </>
                ) : (
                  <>
                    {app.button} <span>→</span>
                  </>
                )}
              </button>
              <p className="privacy-note">
                Text is sent to Groq to generate a draft and saved in Supabase
                for this browser. Try the fictional example. Clearing browser
                cookies removes access to saved work.
              </p>
              <div className="how-it-works">
                <span>
                  <b>01</b> Paste your text
                </span>
                <span>
                  <b>02</b> AI finds structure
                </span>
                <span>
                  <b>03</b> Review &amp; save
                </span>
              </div>
            </>
          ) : (
            <fieldset className="result-fields" disabled={busy}>
              <div className="result-top">
                <p className="eyebrow">AI DRAFT · YOUR REVIEW MATTERS</p>
                <span>{dirty ? "Unsaved changes" : "Saved"}</span>
              </div>
              <label className="field">
                Title
                <input
                  value={result!.title}
                  maxLength={240}
                  onChange={(e) =>
                    change({ ...result!, title: e.target.value })
                  }
                />
              </label>
              <label className="field">
                Summary
                <textarea
                  value={result!.summary}
                  maxLength={kind === "support-desk" ? 700 : 1000}
                  onChange={(e) =>
                    change({ ...result!, summary: e.target.value })
                  }
                />
              </label>
              {"reply" in result! ? (
                <TicketEditor result={result as Ticket} change={change} />
              ) : (
                <MeetingEditor result={result as Meeting} change={change} />
              )}
              <label className="field state-field">
                Workflow status
                <select
                  value={current.state}
                  onChange={(e) => {
                    setCurrent({
                      ...current,
                      state: e.target.value as RecordItem["state"],
                    });
                    setDirty(true);
                  }}
                >
                  {["Open", "Reviewed", "Done"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <div className="result-actions">
                <button
                  className="primary"
                  disabled={busy || !dirty}
                  onClick={save}
                >
                  {busy ? "Working…" : "Save changes"}
                </button>
                <button
                  className="secondary"
                  disabled={busy}
                  onClick={download}
                >
                  Export Markdown ↓
                </button>
                <button
                  className="danger text-button"
                  disabled={busy}
                  onClick={remove}
                >
                  Delete
                </button>
              </div>
              <details className="original">
                <summary>View original {app.inputLabel.toLowerCase()}</summary>
                <p>{current.source}</p>
              </details>
            </fieldset>
          )}
        </section>
      </div>
      <footer className="app-footer">
        <span>
          Built by Noel Perland · Next.js / TypeScript / PostgreSQL / Groq
        </span>
        <a
          href="https://github.com/NoelPerland/portfolio"
          target="_blank"
          rel="noreferrer"
        >
          Explore the source ↗
        </a>
      </footer>
    </main>
  );
}
function TicketEditor({
  result: r,
  change,
}: {
  result: Ticket;
  change: (r: Result) => void;
}) {
  return (
    <>
      <div className="two-fields">
        <label className="field">
          Priority
          <select
            value={r.priority}
            onChange={(e) =>
              change({ ...r, priority: e.target.value as Ticket["priority"] })
            }
          >
            {["Low", "Medium", "High", "Urgent"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Category
          <select
            value={r.category}
            onChange={(e) =>
              change({ ...r, category: e.target.value as Ticket["category"] })
            }
          >
            {["Billing", "Technical", "Account", "General"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="reasoning">Why this priority: {r.reasoning}</p>
      <label className="field">
        Reply draft
        <textarea
          className="reply-input"
          maxLength={2500}
          value={r.reply}
          onChange={(e) => change({ ...r, reply: e.target.value })}
        />
      </label>
      <label className="field">
        Next steps <small>One per line · up to 8</small>
        <textarea
          value={r.nextSteps.join("\n")}
          onChange={(e) =>
            change({ ...r, nextSteps: e.target.value.split("\n") })
          }
        />
      </label>
    </>
  );
}
function MeetingEditor({
  result: r,
  change,
}: {
  result: Meeting;
  change: (r: Result) => void;
}) {
  return (
    <>
      <label className="field">
        Decisions <small>One per line · up to 12</small>
        <textarea
          value={r.decisions.join("\n")}
          onChange={(e) =>
            change({ ...r, decisions: e.target.value.split("\n") })
          }
        />
      </label>
      <div className="panel-heading">
        <h3>Action checklist</h3>
        <span>
          {r.actions.filter((a) => a.done).length}/{r.actions.length} done
        </span>
      </div>
      {r.actions.map((a, i) => (
        <div className="action-row" key={i}>
          <label className="action-check">
            <input
              type="checkbox"
              checked={a.done}
              onChange={(e) =>
                change({
                  ...r,
                  actions: r.actions.map((x, j) =>
                    i === j ? { ...x, done: e.target.checked } : x,
                  ),
                })
              }
            />
            <span className="sr-only">Mark action {i + 1} complete</span>
          </label>
          <div>
            <label className="field">
              Action {i + 1}
              <input
                maxLength={240}
                value={a.task}
                onChange={(e) =>
                  change({
                    ...r,
                    actions: r.actions.map((x, j) =>
                      i === j ? { ...x, task: e.target.value } : x,
                    ),
                  })
                }
              />
            </label>
            <div className="two-fields">
              {(["owner", "due"] as const).map((key) => (
                <label className="field" key={key}>
                  {key === "owner" ? "Owner" : "Due"}
                  <input
                    maxLength={240}
                    value={a[key]}
                    onChange={(e) =>
                      change({
                        ...r,
                        actions: r.actions.map((x, j) =>
                          i === j ? { ...x, [key]: e.target.value } : x,
                        ),
                      })
                    }
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
      {!r.actions.length && (
        <p className="muted">No explicit actions were found in these notes.</p>
      )}
      <label className="field">
        Open questions <small>One per line · up to 12</small>
        <textarea
          value={r.questions.join("\n")}
          onChange={(e) =>
            change({ ...r, questions: e.target.value.split("\n") })
          }
        />
      </label>
    </>
  );
}
