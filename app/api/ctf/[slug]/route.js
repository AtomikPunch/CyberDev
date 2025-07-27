import { fetchCTFFromGitHub } from "@/lib/getCTF"

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params
    const { metadata } = await fetchCTFFromGitHub(resolvedParams.slug)
    return new Response(JSON.stringify({ metadata }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: "CTF not found" }), { status: 404 })
  }
} 