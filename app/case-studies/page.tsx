"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

const caseStudies = [
  {
    title: "Safety Improvements: Downtown Corridor",
    description: "Reduced near-miss incidents by 34% through predictive blocking analysis",
    region: "Ontario",
    metrics: ["34% reduction", "Near-miss incidents", "8 months"],
  },
  {
    title: "Congestion Reduction Study",
    description: "Decreased vehicle delays by 28% with AI-optimized signal timing",
    region: "California",
    metrics: ["28% reduction", "Avg vehicle delay", "12 weeks"],
  },
  {
    title: "Emergency Response Optimization",
    description: "Improved first responder efficiency by routing around predicted blockages",
    region: "Illinois",
    metrics: ["18% faster", "Response times", "Ongoing"],
  },
  {
    title: "Planning & Grant Support",
    description: "Secured funding for grade separation project using quantified delay data",
    region: "Quebec",
    metrics: ["$2.3M", "Grant awarded", "Public-private"],
  },
]

export default function CaseStudies() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Real-world implementations demonstrating the impact of TRAINFO across different use cases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, i) => (
            <Card key={i} className="p-6 hover:border-accent transition group cursor-pointer">
              <p className="text-sm text-accent font-medium mb-2">{study.region}</p>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition">{study.title}</h3>
              <p className="text-muted-foreground mb-6">{study.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-6 pt-6 border-t border-border">
                {study.metrics.map((metric, j) => (
                  <div key={j} className="text-center">
                    <p className="text-sm font-bold">{metric}</p>
                  </div>
                ))}
              </div>

              <Link
                href="#"
                className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition"
              >
                View Details <ArrowRight size={18} />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
