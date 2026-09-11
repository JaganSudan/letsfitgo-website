import { associationDocuments } from "@/lib/inviteConfig.mjs";
import { INVITE_CONFIG } from "@/lib/constants";
export const dynamic = "force-dynamic";
export function GET() {
  const documents = associationDocuments(INVITE_CONFIG, process.env);
  return documents
    ? Response.json(documents.android)
    : new Response(null, { status: 404 });
}
