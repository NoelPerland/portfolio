import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  inputSchema,
  kindSchema,
  updateSchema,
  validateResult,
} from "../../../lib/domain";
import {
  AppError,
  database,
  generate,
  hash,
  workspace,
} from "../../../lib/server";

export const runtime = "nodejs";
export const maxDuration = 45;
const fields = "id,kind,source,result,state,created_at";
function reply(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
function failure(error: unknown) {
  if (error instanceof z.ZodError)
    return reply(
      {
        error:
          "Please check your input. Text must be 30–6,000 characters and all fields must be valid.",
      },
      400,
    );
  if (error instanceof AppError)
    return reply({ error: error.message }, error.status);
  return reply(
    { error: "The request could not be completed. Please retry." },
    503,
  );
}
async function body(request: NextRequest) {
  let originHost = "";
  try {
    originHost = new URL(request.headers.get("origin") || "").host;
  } catch {}
  if (!originHost || originHost !== request.headers.get("host"))
    throw new AppError("Please submit from this website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new AppError("Expected JSON.", 415);
  if (Number(request.headers.get("content-length") || 0) > 24000)
    throw new AppError("This request is too large.", 413);
  const text = await request.text();
  if (Buffer.byteLength(text) > 24000)
    throw new AppError("This request is too large.", 413);
  try {
    return JSON.parse(text);
  } catch {
    throw new AppError("Invalid JSON.", 400);
  }
}
export async function GET(request: NextRequest) {
  try {
    const kind = kindSchema.parse(request.nextUrl.searchParams.get("kind"));
    return reply(
      await database(
        `portfolio_ai_records?kind=eq.${kind}&select=${fields}&order=created_at.desc&limit=50`,
        await workspace(),
      ),
    );
  } catch (e) {
    return failure(e);
  }
}
export async function POST(request: NextRequest) {
  try {
    const { kind, source } = inputSchema.parse(await body(request));
    const owner = await workspace();
    // Vercel overwrites this header; never trust the general x-forwarded-for chain.
    const ip =
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      (process.env.VERCEL ? "unknown" : "local");
    const allowed = await database("rpc/portfolio_ai_budget", owner, {
      method: "POST",
      body: JSON.stringify({ p_ip: hash(ip) }),
    });
    if (!allowed)
      throw new AppError(
        "Demo generation limit reached. Try again later; saved work is still available.",
        429,
      );
    const result = await generate(kind, source);
    const rows = await database(
      `portfolio_ai_records?select=${fields}`,
      owner,
      {
        method: "POST",
        body: JSON.stringify({
          kind,
          owner_key: owner,
          source,
          result,
          state: "Open",
        }),
      },
    );
    return reply(rows[0], 201);
  } catch (e) {
    return failure(e);
  }
}
export async function PATCH(request: NextRequest) {
  try {
    const data = updateSchema.parse(await body(request));
    const result = validateResult(data.kind, data.result);
    const rows = await database(
      `portfolio_ai_records?id=eq.${data.id}&kind=eq.${data.kind}&select=${fields}`,
      await workspace(),
      { method: "PATCH", body: JSON.stringify({ result, state: data.state }) },
    );
    if (!rows.length)
      throw new AppError("This item was not found in your workspace.", 404);
    return reply(rows[0]);
  } catch (e) {
    return failure(e);
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const data = z
      .object({ kind: kindSchema, id: z.uuid() })
      .parse(await body(request));
    const rows = await database(
      `portfolio_ai_records?id=eq.${data.id}&kind=eq.${data.kind}&select=id`,
      await workspace(),
      { method: "DELETE" },
    );
    if (!rows.length)
      throw new AppError("This item was not found in your workspace.", 404);
    return reply({ deleted: true });
  } catch (e) {
    return failure(e);
  }
}
