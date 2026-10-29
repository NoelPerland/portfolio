import { notFound } from "next/navigation";
import { apps, kindSchema } from "../../../lib/domain";
import Workspace from "./workspace";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ kind: string }>;
}) {
  const { kind } = await params;
  const parsed = kindSchema.safeParse(kind);
  return {
    title: parsed.success
      ? `${apps[parsed.data].name} — Noel Perland`
      : "Project not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ kind: string }>;
}) {
  const parsed = kindSchema.safeParse((await params).kind);
  if (!parsed.success) notFound();
  return <Workspace kind={parsed.data} />;
}
