import { fetchBlogFromGitHub } from "@/lib/getBlog"

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params
    const { metadata, content } = await fetchBlogFromGitHub(resolvedParams.slug)
    return new Response(JSON.stringify({ metadata, content }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: "Blog post not found" }), { status: 404 })
  }
} 