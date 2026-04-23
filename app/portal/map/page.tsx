"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, BarChart3, MapPin, FileText, Database, Settings, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal" },
  { icon: MapPin, label: "Agents", href: "/portal/agents", active: true },
  { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function MapPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCrossing, setSelectedCrossing] = useState<{ id: number; name: string; trains: number; vehicles: number; safety: string; delay: number } | null>(null)

  const crossings = [
    { id: 1, name: "Downtown Crossing A", trains: 8, vehicles: 342, safety: "Excellent", delay: 12.4 },
    { id: 2, name: "Industrial Zone B", trains: 5, vehicles: 128, safety: "Good", delay: 8.2 },
    { id: 3, name: "Suburb District C", trains: 12, vehicles: 521, safety: "Good", delay: 18.7 },
  ]

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
          <h1 className="text-xl font-bold">Network Map</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map */}
            <Card className="lg:col-span-2 h-96 bg-muted flex items-center justify-center rounded-lg">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Interactive Network Map</p>
                <p className="text-sm text-muted-foreground">Click on crossings to view details</p>
              </div>
            </Card>

            {/* Filters & Selection */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold">Filters</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium block mb-2">Train Type</label>
                  <select className="w-full border border-border rounded-lg p-2 bg-background">
                    <option>All Types</option>
                    <option>Commuter</option>
                    <option>Freight</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Status</label>
                  <select className="w-full border border-border rounded-lg p-2 bg-background">
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Crossings List */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Crossings</h3>
            <div className="space-y-3">
              {crossings.map((crossing) => (
                <div
                  key={crossing.id}
                  onClick={() => setSelectedCrossing(crossing)}
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    selectedCrossing?.id === crossing.id
                      ? "border-accent bg-muted"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{crossing.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {crossing.trains} trains • {crossing.vehicles} vehicles/day
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          crossing.safety === "Excellent" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {crossing.safety}
                      </span>
                      <p className="text-sm font-bold mt-1">{crossing.delay}m avg delay</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Agents Hub */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">AI Agents</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {["Safety Agent", "Congestion Agent", "Planning Agent", "Emergency Response Agent"].map((agent, i) => (
                <Button key={i} variant="outline" className="justify-start h-auto py-3 bg-transparent">
                  <div>
                    <p className="font-medium">{agent}</p>
                    <p className="text-xs text-muted-foreground">Ask about this crossing</p>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
