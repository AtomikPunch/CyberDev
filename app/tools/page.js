"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wrench, Calendar, Search, Filter } from "lucide-react"

export default function ToolsPage() {
  const [toolsData, setToolsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    async function fetchAllMetadata() {
      try {
        // First, fetch the slugs from GitHub
        const slugsResponse = await fetch('/api/tools/slugs')
        if (!slugsResponse.ok) {
          throw new Error(`Failed to fetch slugs: ${slugsResponse.status}`)
        }
        const slugs = await slugsResponse.json()

        // Then fetch metadata for each slug
        const results = await Promise.all(
          slugs.map(async (slug) => {
            try {
              const res = await fetch(`/api/tools/${slug}`)
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
        setToolsData(validResults)
      } catch (error) {
        console.error('Error fetching tools:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllMetadata()
  }, [])

  const allTags = [...new Set(toolsData.flatMap((tool) => tool.tags || []))]
  const allCategories = [...new Set(toolsData.map((tool) => tool.category).filter(Boolean))]

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchesSearch =
        tool.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => tool.tags?.includes(tag))
      const matchesCategory = !selectedCategory || tool.category === selectedCategory

      return matchesSearch && matchesTags && matchesCategory
    })
  }, [toolsData, searchTerm, selectedTags, selectedCategory])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <Wrench className="w-16 h-16 mx-auto mb-4 text-[rgb(100,150,230)]" />
        <h1 className="text-4xl font-bold mb-4 text-foreground">Tools I&apos;ve Used</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Collection of tools I&apos;ve used in cybersecurity, with detailed write-ups, usage examples, and technical explanations.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        {allCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-foreground flex items-center">
              <Filter className="w-4 h-4 mr-1" />
              Category:
            </span>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-foreground">Tags:</span>
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
        <p className="text-muted-foreground">
          {loading ? "Loading..." : `Showing ${filteredTools.length} tool${filteredTools.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Wrench className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">Loading tools...</h3>
          <p className="text-muted-foreground">Fetching tools from GitHub repository.</p>
        </div>
      )}

      {/* Tools Grid */}
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.slug} className="hover:shadow-lg transition-shadow bg-card border border-[rgb(100,150,230)]/30 hover:border-[rgb(100,150,230)]/50">
              <CardHeader>
                {tool.category && (
                  <Badge variant="outline" className="mb-2 border-[rgb(100,150,230)]/50 text-[rgb(100,150,230)] bg-card w-fit">
                    {tool.category}
                  </Badge>
                )}
                <CardTitle className="text-lg text-foreground">{tool.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tool.date && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(tool.date).toLocaleDateString("en-US")}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {tool.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-card border border-[rgb(100,150,230)]/30 text-[rgb(100,150,230)] hover:border-[rgb(100,150,230)]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/tools/${tool.slug}`}>Read the Write-up</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">No tools found</h3>
          <p className="text-muted-foreground">Try modifying your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}

