import { fetchToolSlugs } from '@/lib/getTools'

export async function GET() {
  try {
    const slugs = await fetchToolSlugs()
    return Response.json(slugs)
  } catch (error) {
    console.error('Error in tools slugs API:', error)
    return Response.json(
      { error: 'Failed to fetch tool slugs' },
      { status: 500 }
    )
  }
}

