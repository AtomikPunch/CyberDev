import matter from "gray-matter"

export async function fetchCTFFromGitHub(slug: string) {
  const url = `https://raw.githubusercontent.com/AtomikPunch/CTF_Writeups/main/${slug}.md`
  const res = await fetch(url)

  if (!res.ok) throw new Error("Failed to fetch CTF markdown")

  const raw = await res.text()
  const { data: metadata, content } = matter(raw)

  return { metadata, content }
}
