"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Calendar, Search, Filter } from "lucide-react"

export default function CTFPage() {
  const [ctfsData, setCtfsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedDifficulty, setSelectedDifficulty] = useState("")

  useEffect(() => {
    async function fetchAllMetadata() {
      try {
        // First, fetch the slugs from GitHub
        const slugsResponse = await fetch('/api/ctf/slugs')
        if (!slugsResponse.ok) {
          throw new Error(`Failed to fetch slugs: ${slugsResponse.status}`)
        }
        const slugs = await slugsResponse.json()

        // Then fetch metadata for each slug
        const results = await Promise.all(
          slugs.map(async (slug) => {
            try {
              const res = await fetch(`/api/ctf/${slug}`)
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
        setCtfsData(validResults)
      } catch (error) {
        console.error('Error fetching CTFs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllMetadata()
  }, [])

  const allTags = [...new Set(ctfsData.flatMap((ctf) => ctf.tags || []))]

  const filteredCTFs = useMemo(() => {
    return ctfsData.filter((ctf) => {
      const matchesSearch =
        ctf.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ctf.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => ctf.tags?.includes(tag))
      const matchesDifficulty = !selectedDifficulty || ctf.difficulty === selectedDifficulty

      return matchesSearch && matchesTags && matchesDifficulty
    })
  }, [ctfsData, searchTerm, selectedTags, selectedDifficulty])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h1 className="text-4xl font-bold mb-4">My CTFs</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Collection of all the CTFs I&apos;ve solved, with detailed write-ups and technical explanations for
          each challenge.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search CTFs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <Filter className="w-4 h-4 mr-1" />
            Difficulty:
          </span>
          {["Easy", "Medium", "Hard"].map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? "" : difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Tags:</span>
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
          {loading ? "Loading..." : `Showing ${filteredCTFs.length} CTF${filteredCTFs.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
          <h3 className="text-xl font-semibold mb-2">Loading CTFs...</h3>
          <p className="text-gray-600">Fetching writeups from GitHub repository.</p>
        </div>
      )}

      {/* CTF Grid */}
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCTFs.map((ctf) => (
            <Card key={ctf.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getDifficultyColor(ctf.difficulty)}>{ctf.difficulty}</Badge>
                  <Badge variant="outline">{ctf.platform}</Badge>
                </div>
                <CardTitle className="text-lg">{ctf.title}</CardTitle>
                <CardDescription>{ctf.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(ctf.date).toLocaleDateString("en-US")}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {ctf.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/ctf/${ctf.slug}`}>Read the Write-up</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredCTFs.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">No CTFs found</h3>
          <p className="text-gray-600">Try modifying your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}
