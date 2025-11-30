import { Shield, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-[rgb(100,150,230)]/20 text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-[rgb(100,150,230)]" />
              <span className="font-bold text-xl text-foreground font-mono">The Exploit Chronicle</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Personal blog dedicated to cybersecurity and sharing my knowledge.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-[rgb(100,150,230)] border border-[rgb(100,150,230)]/30 hover:border-[rgb(100,150,230)]">
                <Link href="https://github.com/AtomikPunch" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-cyan-400 border border-cyan-400/30 hover:border-cyan-400" asChild>
                <Link href="https://www.linkedin.com/in/jadyamout/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-cyan-400 border border-cyan-400/30 hover:border-cyan-400" asChild>
                <Link href="mailto:jad.y@hotmail.fr">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
