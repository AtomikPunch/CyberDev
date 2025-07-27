import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"
import remarkGfm from "remark-gfm"
import { fetchCTFFromGitHub } from "@/lib/getCTF"

export default async function CTFDetailPage({ params }) {
  if (!params || !params.slug) {
    notFound()
  }

  let metadata = {}
  let content = ""

  try {
    const result = await fetchCTFFromGitHub(params.slug)
    metadata = result.metadata
    content = result.content
  } catch (error) {
    notFound()
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */} 
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/ctf">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CTFs
          </Link>
        </Button>
      </div>

       {/* Header */}
       <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Badge className={getDifficultyColor(metadata.difficulty)}>{metadata.difficulty}</Badge>
          <Badge variant="outline">{metadata.platform}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(metadata.date).toLocaleDateString("en-US")}
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">{metadata.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{metadata.description}</p>
        <div className="flex flex-wrap gap-2">
          {metadata.tags?.map((tag,i)=>(
            <Badge key={i} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Markdown Content */}
        <div className="lg:col-span-3">
          <Card>
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
          <Card>
            <CardHeader><CardTitle>Tools Used</CardTitle></CardHeader>
            <CardContent>
              {metadata.tools?.map((tool,i)=><div key={i} className="text-sm text-gray-600">{tool}</div>)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>References</CardTitle></CardHeader>
            <CardContent>
              {metadata.references?.map((ref,i)=>(
                <a key={i} href={ref} target="_blank" rel="noopener noreferrer"
                   className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-3 h-3 mr-1" /> Learn more
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Share */}
          <Card>
            <CardHeader>
              <CardTitle>Share</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Trophy className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
