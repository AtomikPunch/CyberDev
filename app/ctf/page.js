"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Calendar, Search, Filter } from "lucide-react"
import Navigation from "@/components/navigation"

// Sample CTF data
const ctfsData = [
  {
    id: 1,
    slug: "buffer-overflow-basic",
    title: "Basic Buffer Overflow",
    description: "Introduction to buffer overflow attacks with stack exploitation.",
    date: "2024-01-15",
    difficulty: "Easy",
    tags: ["Binary Exploitation", "Stack Overflow", "Assembly"],
    platform: "PicoCTF",
    points: 100,
  },
  {
    id: 2,
    slug: "xss-reflected-challenge",
    title: "XSS Reflected Challenge",
    description: "Exploitation of a reflected XSS vulnerability in a web application.",
    date: "2024-01-20",
    difficulty: "Medium",
    tags: ["Web Security", "XSS", "JavaScript"],
    platform: "HackTheBox",
    points: 250,
  },
  {
    id: 3,
    slug: "rsa-crypto-attack",
    title: "RSA Attack - Factorization",
    description: "Breaking a weak RSA key through prime number factorization.",
    date: "2024-01-25",
    difficulty: "Hard",
    tags: ["Cryptography", "RSA", "Mathematics"],
    platform: "CryptoHack",
    points: 500,
  },
  {
    id: 4,
    slug: "sql-injection-blind",
    title: "Blind SQL Injection",
    description: "Exploitation of a blind SQL injection to extract data.",
    date: "2024-02-01",
    difficulty: "Medium",
    tags: ["Web Security", "SQL Injection", "Database"],
    platform: "PortSwigger",
    points: 300,
  },
  {
    id: 5,
    slug: "forensics-memory-dump",
    title: "Memory Dump Analysis",
    description: "Forensic investigation on a memory dump to recover artifacts.",
    date: "2024-02-05",
    difficulty: "Hard",
    tags: ["Forensics", "Memory Analysis", "Volatility"],
    platform: "CyberDefenders",
    points: 450,
  },
  {
    id: 6,
    slug: "reverse-engineering-malware",
    title: "Malware Reverse Engineering",
    description: "Static and dynamic analysis of a malware sample.",
    date: "2024-02-10",
    difficulty: "Hard",
    tags: ["Reverse Engineering", "Malware", "IDA Pro"],
    platform: "MalwareBazaar",
    points: 600,
  },
  {
    id: 7,
    slug: "soc-simulator-analysis",
    title: "SOC Simulator - Incident Analysis",
    description: "Investigation of suspicious emails and outbound connections using simulated SOC tools.",
    date: "2025-07-21",
    difficulty: "Easy",
    tags: ["SOC", "Threat Detection", "Email Security", "Firewall", "SIEM"],
    platform: "TryHackMe",
    points: 100,
  },
  {
    id: 8,
    slug: "code-reversing-challenge",
    title: "Code Reversing Challenge",
    description: "Analyzing a compiled binary to find the correct password using decompilation tools.",
    date: "2025-07-21",
    difficulty: "Easy",
    tags: ["Reversing", "Binary Analysis", "Decompilation", "CTF"],
    platform: "Custom",
    points: 150,
  },
  {
    id: 9,
    slug: "neighbour-web-app",
    title: "Neighbour - Web Application Enumeration",
    description: "A simple web application enumeration challenge involving source code analysis and lateral movement.",
    date: "2024-01-25",
    difficulty: "Easy",
    tags: ["Web Security", "Source Code Analysis", "Enumeration", "Lateral Movement"],
    platform: "TryHackMe",
    points: 100,
  }
]

const allTags = [...new Set(ctfsData.flatMap((ctf) => ctf.tags))]

export default function CTFPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedDifficulty, setSelectedDifficulty] = useState("")

  const filteredCTFs = useMemo(() => {
    return ctfsData.filter((ctf) => {
      const matchesSearch =
        ctf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ctf.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => ctf.tags.includes(tag))
      const matchesDifficulty = !selectedDifficulty || ctf.difficulty === selectedDifficulty

      return matchesSearch && matchesTags && matchesDifficulty
    })
  }, [searchTerm, selectedTags, selectedDifficulty])

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
      <Navigation />
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
          Showing {filteredCTFs.length} CTF{filteredCTFs.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* CTF Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCTFs.map((ctf) => (
          <Card key={ctf.id} className="hover:shadow-lg transition-shadow">
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

                <div className="flex items-center text-sm text-gray-500">
                  <Trophy className="w-4 h-4 mr-1" />
                  {ctf.points} points
                </div>

                <div className="flex flex-wrap gap-1">
                  {ctf.tags.map((tag, index) => (
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

      {filteredCTFs.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">No CTFs found</h3>
          <p className="text-gray-600">Try modifying your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}
