"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Github, Linkedin, Mail, Download, MapPin, Phone, Mail as MailIcon, Globe, Award, Briefcase, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const stats = [
    { label: "Years of Experience", value: "3+", icon: Briefcase },
    { label: "Certifications", value: "3", icon: Award },
    { label: "Languages", value: "2", icon: Globe }
  ]

  const certifications = [
    { name: "Stormshield Certification", status: "Stormshield", description: "Network Security" },
    { name: "WALLIX PAM Bastion", status: "Wallix", description: "Privileged Access Management" },
    { name: "SecNumedu", status: "ESIEA", description: "Cybersecurity" },
  ]

  const skills = {
    "Programming": ["Python", "C", "Java", "C#", "JavaScript"],
    "OS & Tools": ["Windows", "Linux", "Git", "Docker", "Jenkins", "Gitlab CI/CD"],
    "Databases": ["Neo4j", "MySQL", "MongoDB"],
    "Security Tools": ["Splunk", "Microsoft Intune", "Microsoft Defender", "Azure", "Ansible"],
    "Office Tools": ["Pack Office", "Trello", "Excel", "CSV", "Pivot Tables"]
  }

  const experiences = [
    {
      title: "SDET Consultant",
      company: "Sight",
      location: "Paris",
      period: "Since May 2025",
      description: "Software Development Engineer in Test consultant in AMUNDI"
    },
    {
      title: "IT Assistant - Apprentice SDET Consultant",
      company: "B/acceptance",
      location: "Paris",
      period: "October 2022 - September 2024",
      description: "IT Assistant - Apprentice Automation Consultant",
      achievements: [
        "Security monitoring of endpoints with Microsoft Defender for Endpoint",
        "Centralized management via Microsoft Intune (policies, compliance, app deployment)",
        "Identity and access administration with Microsoft Entra ID (MFA, RBAC)",
        "Audit automation via PowerShell",
        "Deployment of personalized PowerShell scripts for local protections",
        "Automated application installation via Intune",
        "Simulation of attacks through internal phishing campaigns",
        "Implementation of advanced security policies via OMA-URI (CSP)",
        "Monitoring and improvement of Windows security score to meet ISO 27001 standards",
        "Front-end and back-end test automation with Ranorex, Cypress and Selenium",
        "Design of automated test scenarios in JavaScript, TypeScript and C#",
        "Integration of tests into pipelines with Jenkins and GitLab CI/CD"
      ]
    }
  ]

  const education = [
    {
      degree: "Computer Science Engineering Degree - Cybersecurity Specialization",
      school: "ESIEA",
      location: "Paris",
      period: "September 2019 - August 2024",
      description: "Digital Engineering Degree - Cybersecurity Specialization - Business Engineer Option",
      courses: [
        "Control and audit (ISO 27001, EBIOS RM, Pentest, GDPR compliance)",
        "Identity and access management (SSO, MFA, OAuth2, Active Directory, Zero Trust)",
        "Forensic (Digital investigation)",
        "Interconnection security (IPSec, TLS, Zero Trust Network)",
        "Local network security",
        "Virtual Private Network Managing Security in Google Cloud"
      ]
    },
    {
      degree: "BIP Transform to Sustain",
      school: "University of Split",
      location: "Split, Croatia",
      period: "May 2022 - July 2022",
      description: "Sustainable future enabled by digital transformation",
      courses: ["AI-equipped drones for agricultural optimization"]
    },
    {
      degree: "Academic Exchange Semester",
      school: "Glyndwr University",
      location: "Wales, United Kingdom",
      period: "September 2021 - February 2022",
      description: "Academic Exchange Semester",
      courses: ["Applied Programming", "Cyber Security and Forensics", "Server Technologies"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
              <section className="bg-background text-foreground py-20 relative overflow-hidden">
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(100, 150, 230, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(100, 150, 230, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <Shield className="w-16 h-16 mx-auto mb-4 text-[rgb(100,150,230)] drop-shadow-[0_0_10px_rgba(100,150,230,0.5)]" />
              </div>
              <h1 className="text-5xl leading-normal font-bold mb-8 bg-gradient-to-r from-[rgb(100,150,230)] via-[rgb(120,200,180)] to-[rgb(100,150,230)] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(100,150,230,0.3)]">
                Jad YAMOUT
              </h1>
              <p className="text-xl mb-4 text-muted-foreground leading-relaxed font-mono">
                Computer Science Engineer Graduate – Cybersecurity Specialization
              </p>
              <p className="text-lg mb-8 text-muted-foreground/80 leading-relaxed">
                Autonomous and motivated professional with hands-on experience in cybersecurity engineering. 
                My professional journey has strengthened the technical and strategic skills acquired during 
                my engineering education at ESIEA, specializing in information security and digital protection.
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-mono">
                <div className="flex items-center gap-2 text-[rgb(100,150,230)]">
                  <MailIcon className="w-4 h-4" />
                  <span>jad.y@hotmail.fr</span>
                </div>
                <div className="flex items-center gap-2 text-[rgb(100,150,230)]">
                  <Phone className="w-4 h-4" />
                  <span>+33 6 51 83 27 57</span>
                </div>
                <div className="flex items-center gap-2 text-[rgb(100,150,230)]">
                  <MapPin className="w-4 h-4" />
                  <span>Paris, France</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-card border border-[rgb(100,150,230)]/30 text-[rgb(100,150,230)] hover:border-[rgb(100,150,230)]">
                  Cybersecurity
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-card border border-[rgb(100,150,230)]/30 text-[rgb(100,150,230)] hover:border-[rgb(100,150,230)]">
                  IAM & Security
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-card border border-[rgb(100,150,230)]/30 text-[rgb(100,150,230)] hover:border-[rgb(100,150,230)]">
                  Software development engineer in test
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-card border border-[rgb(100,150,230)]/30 text-[rgb(100,150,230)] hover:border-[rgb(100,150,230)]">
                  CTF chaser
                </Badge>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-[rgb(100,150,230)] hover:bg-[rgb(80,130,210)] text-white font-semibold border border-[rgb(100,150,230)] shadow-[0_0_15px_rgba(100,150,230,0.3)]">
                  <Link href="/CV_2025_F_Jad_Yamout.pdf" target="_blank">
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-[rgb(100,150,230)] border-[rgb(100,150,230)]/50 hover:bg-[rgb(100,150,230)]/10 hover:border-[rgb(100,150,230)] bg-transparent backdrop-blur-sm"
                >
                  <Link href="https://www.linkedin.com/in/jadyamout/" target="_blank">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                  <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-[rgb(100,150,230)] border-[rgb(100,150,230)]/50 hover:bg-[rgb(100,150,230)]/10 hover:border-[rgb(100,150,230)] bg-transparent backdrop-blur-sm">
                    <Link href="https://github.com/AtomikPunch" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                  <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-[rgb(100,150,230)] border-[rgb(100,150,230)]/50 hover:bg-[rgb(100,150,230)]/10 hover:border-[rgb(100,150,230)] bg-transparent backdrop-blur-sm">
                    <Link href="mailto:jad.y@hotmail.fr">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact me !
                    </Link>
                  </Button>
              </div>
            </div>
            
            {/* Scroll Arrow */}
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => {
                  document.getElementById('about-me')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
                variant="ghost"
                size="sm"
                className="text-[rgb(100,150,230)] hover:text-[rgb(120,170,240)] hover:bg-[rgb(100,150,230)]/10 transition-all duration-300 animate-bounce"
              >
                <ChevronDown className="w-6 h-6" />
                About me
              </Button>
            </div>
          </div>
        </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-t border-[rgb(100,150,230)]/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-card border border-[rgb(100,150,230)]/30 hover:border-[rgb(100,150,230)]/50 transition-all">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-[rgb(100,150,230)]" />
                  <div className="text-3xl font-bold text-[rgb(100,150,230)] mb-1 font-mono">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* About Me */}
       <section id="about-me" className="py-16 bg-background border-t border-cyan-400/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[rgb(100,150,230)]">About Me</h2>
          <div className="space-y-6 text-foreground">
            <p>
              I&apos;m <strong className="text-[rgb(100,150,230)]">Jad Yamout</strong>, a digital engineer specialized in cybersecurity, graduated from ESIEA with a double focus on technical mastery and business strategy. Over the past three years, I&apos;ve built strong expertise in penetration testing, IAM, malware analysis, and system hardening - both on the field and through academic research.
            </p>
            <p>
              Over the past few years, I&apos;ve worked across multiple roles in the tech industry, from <strong className="text-[rgb(100,150,230)]">IT Assistant</strong> to 
              <strong className="text-[rgb(100,150,230)]"> Software Development Engineer in Test (SDET)</strong> at <strong className="text-[rgb(100,150,230)]">B/Acceptance</strong>. 
              During my time there, I led several projects from kickoff to delivery , including meetings, reporting, and client communication. 
              I worked directly with the Chief Information Security Officer, contributing to security policy design and enforcement. 
              These experiences taught me how to combine automation, system administration, and cybersecurity best practices to 
              strengthen software quality and resilience.
            </p>
            <p>
              My technical background includes <strong className="text-[rgb(100,150,230)]">TLS encryption, VLAN segmentation, ACL design, ISO 27001 compliance, and Azure Entra ID</strong> for identity and access management. I also deployed phishing simulations and contributed to endpoint security through Microsoft Defender and PowerShell automation.
            </p>
            <p>
              What drives me? Applying advanced security practices to protect real-world systems - especially in critical environments. I&apos;m motivated, detail-oriented, and eager to keep growing in a challenging, impactful cybersecurity role.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-background border-t border-cyan-400/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[rgb(100,150,230)]">Professional Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card key={index} className="bg-card border border-[rgb(100,150,230)]/30 hover:border-[rgb(100,150,230)]/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[rgb(100,150,230)]">{exp.title}</h3>
                        <p className="text-lg text-[rgb(120,200,180)] font-medium">{exp.company}</p>
                        <p className="text-muted-foreground">{exp.location}</p>
                      </div>
                      <Badge variant="outline" className="text-sm border-[rgb(100,150,230)]/50 text-[rgb(100,150,230)] bg-card">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-foreground mb-4">{exp.description}</p>
                    {exp.achievements && (
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm">{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 bg-background border-t border-[rgb(100,150,230)]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[rgb(100,150,230)]">Education</h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <Card key={index} className="bg-card border border-[rgb(100,150,230)]/30 hover:border-[rgb(100,150,230)]/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[rgb(100,150,230)]">{edu.degree}</h3>
                        <p className="text-lg text-[rgb(120,200,180)] font-medium">{edu.school}</p>
                        <p className="text-muted-foreground">{edu.location}</p>
                      </div>
                      <Badge variant="outline" className="text-sm border-[rgb(100,150,230)]/50 text-[rgb(100,150,230)] bg-card">
                        {edu.period}
                      </Badge>
                    </div>
                    <p className="text-foreground mb-4">{edu.description}</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {edu.courses.map((course, idx) => (
                        <li key={idx} className="text-sm">{course}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-background border-t border-[rgb(100,150,230)]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[rgb(100,150,230)]">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card key={category} className="bg-card border border-[rgb(100,150,230)]/30 hover:border-[rgb(100,150,230)]/50 transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-[rgb(100,150,230)]">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-card border border-[rgb(100,150,230)]/30 text-[rgb(100,150,230)] hover:border-[rgb(100,150,230)]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-background border-t border-[rgb(100,150,230)]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[rgb(100,150,230)]">Certifications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-card border border-[rgb(100,150,230)]/30 hover:border-[rgb(100,150,230)]/50 transition-all">
                  <CardContent className="p-6 text-center">
                    <Award className="w-12 h-12 mx-auto mb-4 text-[rgb(100,150,230)]" />
                    <h3 className="text-lg font-semibold mb-2 text-[rgb(100,150,230)]">{cert.name}</h3>
                    <Badge variant="outline" className="mb-2 border-[rgb(100,150,230)]/50 text-[rgb(100,150,230)] bg-card">
                      {cert.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
