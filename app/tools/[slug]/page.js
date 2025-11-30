import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wrench, Calendar, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"
import remarkGfm from "remark-gfm"
import { fetchToolFromGitHub } from "@/lib/getTools"

export default async function ToolDetailPage({ params }) {
  if (!params || !params.slug) {
    notFound()
  }

  let metadata = {}
  let content = ""

  try {
    const result = await fetchToolFromGitHub(params.slug)
    metadata = result.metadata
    content = result.content
  } catch {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */} 
      <div className="mb-6">
        <Button variant="ghost" asChild className="text-foreground hover:text-cyan-400">
          <Link href="/tools">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {metadata.category && (
            <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 bg-card">
              {metadata.category}
            </Badge>
          )}
          {metadata.date && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(metadata.date).toLocaleDateString("en-US")}
            </div>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4 text-foreground">{metadata.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{metadata.description}</p>
        <div className="flex flex-wrap gap-2">
          {metadata.tags?.map((tag, i) => (
            <Badge key={i} variant="secondary" className="bg-card border border-cyan-400/30 text-cyan-400 hover:border-cyan-400">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Markdown Content */}
        <div className="lg:col-span-3">
          <Card className="bg-card border border-cyan-400/30">
            <CardContent className="p-8">
              <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {metadata.website && (
            <Card className="bg-card border border-cyan-400/30">
              <CardHeader>
                <CardTitle className="text-foreground">Website</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={metadata.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-cyan-400 hover:text-cyan-300"
                >
                  <ExternalLink className="w-3 h-3 mr-1" /> Visit Website
                </a>
              </CardContent>
            </Card>
          )}

          {metadata.references && metadata.references.length > 0 && (
            <Card className="bg-card border border-cyan-400/30">
              <CardHeader>
                <CardTitle className="text-foreground">References</CardTitle>
              </CardHeader>
              <CardContent>
                {metadata.references.map((ref, i) => (
                  <a 
                    key={i} 
                    href={ref} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 mb-2"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" /> Learn more
                  </a>
                ))}
              </CardContent>
            </Card>
          )}

          {metadata.license && (
            <Card className="bg-card border border-cyan-400/30">
              <CardHeader>
                <CardTitle className="text-foreground">License</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">{metadata.license}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

