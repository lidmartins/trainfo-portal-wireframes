"use client"

import Link from "next/link"
import { ArrowLeft, MapPin, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const deployments = [
  { city: "Toronto", state: "Ontario", agency: "City Transit", crossings: 8, status: "Active" },
  { city: "Vancouver", state: "British Columbia", agency: "Regional DOT", crossings: 12, status: "Active" },
  { city: "Montreal", state: "Quebec", agency: "City Engineering", crossings: 6, status: "Active" },
  { city: "Chicago", state: "Illinois", agency: "City DOT", crossings: 15, status: "Active" },
  { city: "Los Angeles", state: "California", agency: "Transportation Dept", crossings: 22, status: "Active" },
]

export default function Deployments() {
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
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Active Deployments</h1>
            <p className="text-muted-foreground">View TRAINFO installations across North America</p>
          </div>
          <Button variant="outline" className="w-fit bg-transparent">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>

        {/* Map Placeholder */}
        <Card className="mb-12 h-96 flex items-center justify-center bg-muted rounded-lg">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Interactive Deployment Map</p>
            <p className="text-sm text-muted-foreground">Click to view details by region</p>
          </div>
        </Card>

        {/* Deployments List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Deployment Locations</h2>
          <div className="space-y-3">
            {deployments.map((deployment, i) => (
              <Card key={i} className="p-4 hover:border-accent transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold">
                      {deployment.city}, {deployment.state}
                    </h3>
                    <p className="text-sm text-muted-foreground">{deployment.agency}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{deployment.crossings} crossings</p>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full inline-block">
                      {deployment.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
