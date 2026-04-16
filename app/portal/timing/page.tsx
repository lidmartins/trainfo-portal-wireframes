"use client"

import Link from "next/link"
import { BarChart3, MapPin, FileText, Database, Settings, HelpCircle, LogOut, Menu, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Studies & Planning", href: "/portal/studies" },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing", active: true },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function SignalTimingPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
          <div className={`flex items-center gap-2 ${!sidebarOpen && "hidden"}`}>
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">TI</span>
            </div>
            <span className="font-bold">Portal</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-sidebar-accent rounded-lg p-1">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {sidebarItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                item.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent w-full transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Signal Timing Planner</h1>
          <Button variant="outline" size="sm">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Corridor Selection */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Select Corridor</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "Downtown Main St", crossings: 4, status: "Active" },
                { name: "Industrial Zone North", crossings: 6, status: "Active" },
                { name: "Suburbs East", crossings: 3, status: "Pending" },
              ].map((corridor, i) => (
                <Card key={i} className="p-4 border-2 border-border hover:border-accent cursor-pointer transition">
                  <h4 className="font-bold mb-2">{corridor.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{corridor.crossings} crossings</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      corridor.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {corridor.status}
                  </span>
                </Card>
              ))}
            </div>
          </Card>

          {/* Timing Data */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Existing Timing Plan</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Plan Name:</span>
                  <span className="text-muted-foreground">Peak Hour Plan A</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Cycle Length:</span>
                  <span className="text-muted-foreground">120 seconds</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Offsets:</span>
                  <span className="text-muted-foreground">Coordinated</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">AI Recommendations</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-accent/10 border border-accent rounded-lg">
                  <p className="font-medium text-accent">+15% efficiency</p>
                  <p className="text-muted-foreground">Increase cycle length to 135s</p>
                </div>
                <div className="p-3 bg-accent/10 border border-accent rounded-lg">
                  <p className="font-medium text-accent">+8% delay reduction</p>
                  <p className="text-muted-foreground">Adjust offsets by -12s on Crossing B</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Proposed Plan */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Proposed Timing Plan</h3>
            <div className="bg-muted rounded-lg p-4 mb-4 h-40 flex items-center justify-center">
              <p className="text-muted-foreground">Signal Timing Visualization</p>
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90">Apply Recommendation</Button>
          </Card>
        </div>
      </main>
    </div>
  )
}
