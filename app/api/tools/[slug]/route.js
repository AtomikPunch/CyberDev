import { fetchToolFromGitHub } from "@/lib/getTools"

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params
    const { metadata, content } = await fetchToolFromGitHub(resolvedParams.slug)
    return new Response(JSON.stringify({ metadata, content }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch {
    return new Response(JSON.stringify({ error: "Tool not found" }), { status: 404 })
  }
}

