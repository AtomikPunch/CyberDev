import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Code, Trophy, BookOpen, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const stats = [
    { label: "CTFs Solved", value: "25+", icon: Trophy },
    { label: "Articles Published", value: "12", icon: BookOpen },
    { label: "Years of Experience", value: "3", icon: Shield },
    { label: "GitHub Projects", value: "15+", icon: Code },
  ]

  const recentCTFs = [
    { title: "Buffer Overflow Challenge", difficulty: "Hard", tag: "Binary Exploitation" },
    { title: "XSS Reflected Attack", difficulty: "Medium", tag: "Web Security" },
    { title: "RSA Crypto Challenge", difficulty: "Easy", tag: "Cryptography" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Shield className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            </div>
            <h1 className="text-5xl leading-normal font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CyberDev blog
            </h1>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Passionate about information security, I share my discoveries through CTFs, vulnerability analysis
              and technical articles. Currently specialized in penetration testing and malware analysis.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Penetration Testing
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Reverse Engineering
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Web Security
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Cryptography
              </Badge>
            </div>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/ctf">
                  <Trophy className="w-4 h-4 mr-2" />
                  View my CTFs
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/blog">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Cybersecurity Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">About</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                <p className="text-gray-600 mb-4">
                  Graduated in cybersecurity with a specialization in penetration testing and malware analysis.
                  Currently working as an information security consultant, I work on penetration testing and security
                  audit missions for various companies.
                </p>
                <p className="text-gray-600 mb-6">
                  My passion for CTFs has allowed me to develop deep expertise in many areas of cybersecurity,
                  from binary exploitation to cryptography and web security.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Recent CTFs</h3>
                <div className="space-y-4">
                  {recentCTFs.map((ctf, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge
                            variant="outline"
                            className={
                              ctf.difficulty === "Easy"
                                ? "text-green-600 border-green-200"
                                : ctf.difficulty === "Medium"
                                ? "text-yellow-600 border-yellow-200"
                                : "text-red-600 border-red-200"
                            }
                          >
                            {ctf.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {ctf.tag}
                          </Badge>
                        </div>
                        <h4 className="font-semibold">{ctf.title}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/ctf">View all CTFs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
