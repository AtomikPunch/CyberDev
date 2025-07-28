"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Calendar, Clock, Search, Filter } from "lucide-react"

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    async function fetchAllMetadata() {
      try {
        // First, fetch the slugs from GitHub
        const slugsResponse = await fetch('/api/blog/slugs')
        if (!slugsResponse.ok) {
          throw new Error(`Failed to fetch slugs: ${slugsResponse.status}`)
        }
        const slugs = await slugsResponse.json()

        // Then fetch metadata for each slug
        const results = await Promise.all(
          slugs.map(async (slug) => {
            try {
              const res = await fetch(`/api/blog/${slug}`)
              if (!res.ok) {
                console.error(`Failed to fetch ${slug}: ${res.status}`)
                return null
              }
              const { metadata } = await res.json()
              return { ...metadata, slug }
            } catch (error) {
              console.error(`Error fetching ${slug}:`, error)
              return null
            }
          })
        )

        const validResults = results.filter(result => result !== null)
        setBlogPosts(validResults)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllMetadata()
  }, [])

  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags || []))]

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags?.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [blogPosts, searchTerm, selectedTags])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const featuredPost = filteredPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Technical articles, tool analysis, experience sharing and reflections on the cybersecurity universe.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Tags:
          </span>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {loading ? "Loading..." : `Showing ${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
          <h3 className="text-xl font-semibold mb-2">Loading articles...</h3>
          <p className="text-gray-600">Fetching articles from GitHub repository.</p>
        </div>
      )}

      {/* Featured Article */}
      {!loading && featuredPost && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(featuredPost.date).toLocaleDateString("en-US")}
                <Clock className="w-4 h-4 ml-2" />
                {featuredPost.readTime}
              </div>
              <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
              <CardDescription className="text-lg">{featuredPost.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild size="lg">
                  <Link href={`/blog/${featuredPost.slug}`}>Read the article</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* All Articles */}
      {!loading && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("en-US")}
                    <Clock className="w-4 h-4 ml-2" />
                    {post.readTime}
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/blog/${post.slug}`}>Read the article</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-gray-600">Try modifying your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}
