"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const solutions = [
  {
    title: "TRAINFO Mobility",
    description: "Real-time prediction of train blockages with vehicle delay quantification",
    features: ["Blockage prediction", "Delay quantification", "Route optimization", "Multi-agency support"],
  },
  {
    title: "Response Intelligence",
    description: "Optimize emergency response routes and reduce response times",
    features: ["Route optimization", "Real-time traffic data", "First responder dashboard", "Analytics"],
  },
  {
    title: "Safety & Congestion Analytics",
    description: "Comprehensive analysis of safety metrics and congestion patterns",
    features: ["Safety metrics", "Congestion analysis", "Trend reporting", "Visualization"],
  },
  {
    title: "Planning & Signal Timing",
    description: "AI-powered signal timing optimization for rail corridors",
    features: ["Timing optimization", "Coordination", "Traffic simulation", "Before/after analysis"],
  },
]

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-card/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:text-accent transition">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Comprehensive tools and analytics to improve safety and mobility at rail crossings across your jurisdiction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, i) => (
            <Card key={i} className="p-8 hover:border-accent transition cursor-pointer group">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition">{solution.title}</h3>
              <p className="text-muted-foreground mb-6">{solution.description}</p>
              <div className="space-y-2 mb-6">
                {solution.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition"
              >
                Learn more <ArrowRight size={18} />
              </Link>
            </Card>
          ))}
        </div>

        {/* Integration Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <h2 className="text-3xl font-bold mb-8">Integrations & Partners</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Signal & ITS Vendors", count: "12+ partners" },
              { title: "Navigation & Mapping", count: "8+ partners" },
              { title: "Data Platforms", count: "15+ partners" },
            ].map((category, i) => (
              <Card key={i} className="p-6 text-center">
                <h3 className="font-bold mb-2">{category.title}</h3>
                <p className="text-accent font-medium">{category.count}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to see it in action?</h3>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </div>
  )
}
