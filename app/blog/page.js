import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock } from "lucide-react"

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    slug: "introduction-pentest-web",
    title: "Introduction to Web Penetration Testing",
    description: "Complete guide to get started with web application penetration testing.",
    date: "2024-02-15",
    readTime: "8 min",
    tags: ["Pentest", "Web Security", "Guide"],
    featured: true,
  },
  {
    id: 2,
    slug: "outils-forensics-essentiels",
    title: "Essential Forensics Tools",
    description: "Presentation of essential tools for digital investigation.",
    date: "2024-02-10",
    readTime: "12 min",
    tags: ["Forensics", "Tools", "Investigation"],
  },
  {
    id: 3,
    slug: "analyse-malware-statique",
    title: "Static Malware Analysis",
    description: "Techniques and methodologies to analyze malware without executing it.",
    date: "2024-02-05",
    readTime: "15 min",
    tags: ["Malware", "Reverse Engineering", "Analysis"],
  },
  {
    id: 4,
    slug: "cryptographie-moderne-ctf",
    title: "Modern Cryptography in CTFs",
    description: "Understanding and solving advanced cryptographic challenges.",
    date: "2024-01-30",
    readTime: "10 min",
    tags: ["Cryptography", "CTF", "Mathematics"],
  },
  {
    id: 5,
    slug: "securite-containers-docker",
    title: "Docker Container Security",
    description: "Best practices and techniques for securing containerized environments.",
    date: "2024-01-25",
    readTime: "6 min",
    tags: ["Docker", "Containers", "DevSecOps"],
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

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

      {/* Featured Article */}
      {featuredPost && (
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
                  {featuredPost.tags.map((tag, index) => (
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">All Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
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
                    {post.tags.map((tag, index) => (
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

      {/* Newsletter Signup */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-6">
          Subscribe to receive the latest articles and cybersecurity insights directly in your inbox.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  )
}
