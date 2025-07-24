import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

// Sample blog post data with detailed content
const blogPosts = {
  "introduction-pentest-web": {
    id: 1,
    title: "Introduction to Web Penetration Testing",
    description: "Complete guide to get started with web application penetration testing.",
    date: "2024-02-15",
    readTime: "8 min",
    tags: ["Pentest", "Web Security", "Guide"],
    content: `# Introduction to Web Penetration Testing

Web penetration testing, or web application penetration testing, is an essential discipline in cybersecurity that involves evaluating the security of a web application by simulating real attacks.

## What is Web Penetration Testing?

Web penetration testing is a methodical process that aims to identify, exploit, and document vulnerabilities present in a web application. Unlike automated tests, manual penetration testing allows the discovery of complex logical vulnerabilities that automated tools cannot detect.

## OWASP Methodology

The OWASP Testing Guide methodology is the reference for web security testing. It covers:

### 1. Reconnaissance and Information Gathering
- Identification of technologies used
- Application mapping
- Analysis of entry points

### 2. Configuration and Error Handling Tests
- Server configuration verification
- Error handling analysis
- Backup mechanism testing

### 3. Authentication Tests
- Login mechanism verification
- Brute force testing
- Session analysis

### 4. Authorization Tests
- Access control verification
- Privilege escalation testing
- Permission analysis

## Essential Tools

### Burp Suite
The reference tool for web penetration testing, offering:
- Intercepting proxy
- Vulnerability scanner
- Intruder for automated attacks
- Repeater for manual testing

### OWASP ZAP
Open-source alternative to Burp Suite:
- Intuitive interface
- Automatic scanner
- Integrated fuzzing
- API for CI/CD integration

### Command line tools
- **sqlmap**: SQL injection detection and exploitation
- **dirb/gobuster**: Directory and file discovery
- **nikto**: Web vulnerability scanner

## OWASP Top 10 2021

The most critical vulnerabilities to test:

1. **Broken Access Control** - Failed access controls
2. **Cryptographic Failures** - Cryptographic failures
3. **Injection** - Injections (SQL, NoSQL, LDAP, etc.)
4. **Insecure Design** - Insecure design
5. **Security Misconfiguration** - Security misconfiguration
6. **Vulnerable Components** - Vulnerable components
7. **Authentication Failures** - Authentication failures
8. **Software Integrity Failures** - Software integrity failures
9. **Logging Failures** - Logging failures
10. **Server-Side Request Forgery** - SSRF

## Best Practices

### Preparation
- Obtain written authorization
- Clearly define the scope
- Prepare an isolated test environment

### Execution
- Follow a structured methodology
- Document each test performed
- Take screenshots of evidence

### Reporting
- Classify vulnerabilities by criticality
- Provide concrete recommendations
- Include proof of concept

## Conclusion

Web penetration testing is an exciting field that requires a methodical approach and constant technological monitoring. The combination of automated tools and manual testing allows for a comprehensive evaluation of web application security.

Don't hesitate to practice on legal platforms like DVWA, WebGoat, or PortSwigger labs to develop your skills!`,
    author: "Cybersecurity Expert",
  },
}

export default function BlogPostPage({ params }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.date).toLocaleDateString("en-US")}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime}
          </div>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{post.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n").map((line, index) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                      {line.substring(2)}
                    </h1>
                  )
                } else if (line.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
                      {line.substring(3)}
                    </h2>
                  )
                } else if (line.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
                      {line.substring(4)}
                    </h3>
                  )
                } else if (line.startsWith("```")) {
                  return (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg font-mono text-sm my-4">
                      {line}
                    </div>
                  )
                } else if (line.trim() === "") {
                  return <br key={index} />
                } else {
                  return (
                    <p key={index} className="mb-4">
                      {line}
                    </p>
                  )
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
