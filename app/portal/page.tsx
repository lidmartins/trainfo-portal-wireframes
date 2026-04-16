"use client"

import Link from "next/link"

import { useState } from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, BarChart3, MapPin, FileText, Database, Settings, HelpCircle, LogOut, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const portalNavItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal", active: true },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Studies & Planning", href: "/portal/studies" },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function PortalDashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    router.push("/login")
  }, [router])

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
          {portalNavItems.map((item, i) => (
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
          <h1 className="text-xl font-bold">Portal Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Account Settings
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Welcome back, Administrator</h2>
            <p className="text-muted-foreground">Here's an overview of your system performance</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Crossings", value: "142", change: "+12%", icon: MapPin },
              { label: "Studies Created", value: "28", change: "+4", icon: FileText },
              { label: "Data Points", value: "2.4M", change: "+156K", icon: TrendingUp },
              { label: "API Calls (Today)", value: "18.5K", change: "-2.3%", icon: Database },
            ].map((metric, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-accent mt-2">{metric.change}</p>
                  </div>
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <metric.icon size={20} className="text-muted-foreground" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="font-bold mb-4">Recent Studies</h3>
              <div className="space-y-3">
                {[
                  { name: "Downtown Corridor - Phase 2", date: "Dec 5, 2025", status: "In Progress" },
                  { name: "Safety Analysis - Intersection A", date: "Dec 3, 2025", status: "Completed" },
                  { name: "Delay Reduction Study", date: "Nov 28, 2025", status: "Completed" },
                ].map((study, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition"
                  >
                    <div>
                      <p className="font-medium">{study.name}</p>
                      <p className="text-xs text-muted-foreground">{study.date}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        study.status === "In Progress" ? "bg-accent/20 text-accent" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {study.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-bold">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-accent hover:bg-accent/90 text-accent-foreground">
                  <FileText size={18} className="mr-2" />
                  New Study
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MapPin size={18} className="mr-2" />
                  View Map
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Database size={18} className="mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings size={18} className="mr-2" />
                  Manage Users
                </Button>
              </div>
            </Card>
          </div>

          {/* System Status */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">System Status</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "Data Collection", status: "Operational", percentage: 100 },
                { name: "API Availability", status: "Operational", percentage: 99.9 },
                { name: "Processing Queue", status: "Nominal", percentage: 45 },
              ].map((system, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm">{system.name}</p>
                    <span className="text-xs text-green-600 font-medium">{system.status}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: `${system.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
