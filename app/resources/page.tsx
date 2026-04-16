"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, FileText, Download, Code, File, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const pages = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Deployments", href: "/deployments" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Resources", href: "/resources" },
]

export default function Resources() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">TI</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">TRAINFO</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                className={`text-sm hover:text-accent transition ${page.name === "Resources" ? "text-accent font-medium" : ""}`}
              >
                {page.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Actions */}
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/request-demo">Request Demo</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border px-4 py-4 space-y-2">
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                className={`block py-2 hover:text-accent ${page.name === "Resources" ? "text-accent font-medium" : ""}`}
              >
                {page.name}
              </Link>
            ))}
            <Button className="w-full mt-2 bg-transparent" variant="outline" size="sm" asChild>
              <Link href="/request-demo">Request Demo</Link>
            </Button>
            <Button className="w-full" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/30 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Resources</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Access product materials, API documentation, and specification text to help you understand and implement
            TRAINFO solutions.
          </p>
        </div>
      </section>

      {/* Product Materials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FileText size={32} className="text-accent" />
          Product Materials
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <FileText size={24} className="text-accent" />
            </div>
            <h3 className="font-bold mb-2">Product One-Pagers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Quick reference PDFs with key product features and benefits.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                TRAINFO Mobility (PDF)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                TRAINFO Analytics (PDF)
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <File size={24} className="text-accent" />
            </div>
            <h3 className="font-bold mb-2">Brochures & Flyers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive marketing materials for agencies and stakeholders.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                Full Product Brochure
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                Case Study Flyer
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <FileText size={24} className="text-accent" />
            </div>
            <h3 className="font-bold mb-2">Slide Decks & Overviews</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Presentation materials for meetings and planning sessions.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                Executive Overview (PPTX)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                Technical Deep Dive (PDF)
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* API Documentation */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Code size={32} className="text-accent" />
            API Documentation (Public Overview)
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-6 lg:col-span-2">
              <h3 className="font-bold mb-4 text-xl">What the API Can Do</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The TRAINFO API provides programmatic access to crossing data, blockage predictions, and historical
                analytics. Integrate real-time rail crossing information into your existing systems and applications.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-bold mb-1">Real-Time Data Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Get live blockage status, delay estimates, and sensor data for active crossings.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-bold mb-1">Historical Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Query past blockage events, traffic patterns, and performance metrics for planning and analysis.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-bold mb-1">Webhook Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive automated notifications when specific crossing events occur.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-bold mb-4">Example Endpoints</h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="bg-background/10 p-3 rounded">
                  <p className="opacity-70 text-xs mb-1">GET</p>
                  <p>/api/crossings</p>
                </div>
                <div className="bg-background/10 p-3 rounded">
                  <p className="opacity-70 text-xs mb-1">GET</p>
                  <p>/api/crossings/:id/status</p>
                </div>
                <div className="bg-background/10 p-3 rounded">
                  <p className="opacity-70 text-xs mb-1">GET</p>
                  <p>/api/analytics/delays</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-6" asChild>
                <Link href="/login">
                  Get Full Docs in Portal <ExternalLink size={16} className="ml-2" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Bid / Specification Text Library */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Bid / Specification Text Library</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Save time preparing RFPs and technical specifications with our pre-written text templates. Customize these
          samples to fit your agency's procurement process.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <FileText size={20} className="text-accent" />
              Sample RFP / RFQ Text
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ready-to-use procurement language for requesting crossing monitoring and analytics solutions.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                RFP Template - Crossing Monitoring
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                RFQ Template - Analytics Services
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <File size={20} className="text-accent" />
              Requirements & Spec Language
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Technical specifications and system requirements for planners and procurement teams.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                System Requirements Document
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Download size={16} className="mr-2" />
                Technical Specifications
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need more information?</h2>
          <p className="text-lg mb-8 opacity-90">Contact our team for custom materials or technical support.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/request-demo">Request a Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    TRAINFO Mobility
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Planning Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TRAINFO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
