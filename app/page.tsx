"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MapPin, TrendingUp, BarChart3, Zap, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const pages = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Deployments", href: "/deployments" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Resources", href: "/resources" },
]

export default function Home() {
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
              <Link key={page.name} href={page.href} className="text-sm hover:text-accent transition">
                {page.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Login */}
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
              <Link key={page.name} href={page.href} className="block py-2 hover:text-accent">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance mb-6">
              Improve safety and mobility at rail crossings.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              TRAINFO is dedicated to understanding and preventing traffic delays at rail crossings. With predictive
              blockage and delay information, TRAINFO provides the tools and information government agencies need to
              ensure seamless mobility for motorists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Get Your Scorecard <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/request-demo">Request Demo</Link>
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 rounded-lg flex flex-col items-center justify-center">
              <Play size={48} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Hero Image / Video</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-balance">
            Prevent traffic delays and collisions at rail crossings.
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Decrease Traffic Congestion",
                desc: "Reduce vehicle-delay at rail crossings",
              },
              {
                icon: BarChart3,
                title: "Reduce Emergency Delays",
                desc: "Help emergency dispatchers select optimal routes",
              },
              {
                icon: Zap,
                title: "Mitigate Collision Risk",
                desc: "Discourage impatient drivers from dangerous behavior",
              },
              {
                icon: MapPin,
                title: "Quantify Traffic Impact",
                desc: "Produce detailed statistics on crossing performance",
              },
            ].map((feature, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <feature.icon size={24} className="text-accent-foreground" />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                <Link
                  href="#"
                  className="text-accent font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition"
                >
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployments Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold mb-12">Active Deployments</h2>
        <div className="bg-muted rounded-lg p-8 h-96 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-2">Interactive Deployment Map</p>
            <p className="text-muted-foreground text-sm">Filter by country, state, or agency type</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join agencies across North America improving safety at rail crossings.
          </p>
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
