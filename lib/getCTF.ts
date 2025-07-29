import matter from "gray-matter"

interface GitHubTreeItem {
  type: string
  path: string
}

export async function fetchCTFFromGitHub(slug: string) {
  const url = `https://raw.githubusercontent.com/AtomikPunch/CTF_Writeups/main/${slug}.md`
  const res = await fetch(url)

  if (!res.ok) throw new Error("Failed to fetch CTF markdown")

  const raw = await res.text()
  const { data: metadata, content } = matter(raw)

  return { metadata, content }
}

export async function fetchCTFSlugs(): Promise<string[]> {
  try {
    // Step 1: Get the main branch reference
    const refResponse = await fetch('https://api.github.com/repos/AtomikPunch/CTF_Writeups/git/refs/heads/main')
    if (!refResponse.ok) {
      throw new Error(`Failed to fetch main branch: ${refResponse.status}`)
    }
    const refData = await refResponse.json()
    const commitSha = refData.object.sha

    // Step 2: Get the commit to find the tree SHA
    const commitResponse = await fetch(`https://api.github.com/repos/AtomikPunch/CTF_Writeups/git/commits/${commitSha}`)
    if (!commitResponse.ok) {
      throw new Error(`Failed to fetch commit: ${commitResponse.status}`)
    }
    const commitData = await commitResponse.json()
    const treeSha = commitData.tree.sha

    // Step 3: Get the tree with all files recursively
    const treeResponse = await fetch(`https://api.github.com/repos/AtomikPunch/CTF_Writeups/git/trees/${treeSha}?recursive=1`)
    if (!treeResponse.ok) {
      throw new Error(`Failed to fetch tree: ${treeResponse.status}`)
    }
    const treeData = await treeResponse.json()

    // Step 4: Filter for markdown files in the root directory and extract slugs
    const slugs = treeData.tree
      .filter((item: GitHubTreeItem) => 
        item.type === 'blob' && 
        item.path.endsWith('.md') && 
        !item.path.includes('/') // Only files in root directory
      )
      .map((item: GitHubTreeItem) => item.path.replace('.md', ''))

    return slugs
  } catch (error) {
    console.error('Error fetching CTF slugs:', error)
    // Fallback to hardcoded slugs if API fails
    return [
      "soc-simulator-analysis",
      "code-reversing-challenge", 
      "neighbour-web-app"
    ]
  }
}
