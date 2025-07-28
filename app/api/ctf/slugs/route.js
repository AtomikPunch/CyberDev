import { fetchCTFSlugs } from '@/lib/getCTF'

export async function GET() {
  try {
    const slugs = await fetchCTFSlugs()
    return Response.json(slugs)
  } catch (error) {
    console.error('Error in slugs API:', error)
    return Response.json(
      { error: 'Failed to fetch CTF slugs' },
      { status: 500 }
    )
  }
} 