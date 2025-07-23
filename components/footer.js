import { Shield, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-purple-400" />
              <span className="font-bold text-xl">CyberBlog</span>
            </div>
            <p className="text-gray-400 mb-4">
              Personal blog dedicated to cybersecurity and sharing technical knowledge.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/ctf" className="hover:text-white transition-colors">
                  CTFs
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/ctf?tag=web" className="hover:text-white transition-colors">
                  Web Security
                </a>
              </li>
              <li>
                <a href="/ctf?tag=crypto" className="hover:text-white transition-colors">
                  Cryptography
                </a>
              </li>
              <li>
                <a href="/ctf?tag=binary" className="hover:text-white transition-colors">
                  Binary Exploitation
                </a>
              </li>
              <li>
                <a href="/ctf?tag=forensics" className="hover:text-white transition-colors">
                  Forensics
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CyberBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
