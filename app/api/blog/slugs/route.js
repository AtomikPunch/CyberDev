import { fetchBlogSlugs } from '@/lib/getBlog'

export async function GET() {
  try {
    const slugs = await fetchBlogSlugs()
    return Response.json(slugs)
  } catch (error) {
    console.error('Error in blog slugs API:', error)
    return Response.json(
      { error: 'Failed to fetch blog slugs' },
      { status: 500 }
    )
  }
} 