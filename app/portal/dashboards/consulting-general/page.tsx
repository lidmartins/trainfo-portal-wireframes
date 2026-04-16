"use client"

import Link from "next/link"
import {
  BarChart3,
  MapPin,
  FileText,
  Database,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Clock,
  TrendingUp,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/consulting-general" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Studies & Planning", href: "/portal/studies" },
  { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function ConsultingGeneralDashboard() {
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
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition text-sidebar-foreground hover:bg-sidebar-accent"
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
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Consulting Partner General</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portal/settings">Account Settings</Link>
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Welcome back, Engineer</h2>
            <p className="text-muted-foreground">Access data, conduct studies, and build timing plans</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "My Studies", value: "6", change: "+1 this week", icon: FileText },
              { label: "Available Crossings", value: "45", change: "Access granted", icon: MapPin },
              { label: "Recent Downloads", value: "12", change: "Last 7 days", icon: Download },
              { label: "Scorecards Generated", value: "8", change: "+2 this month", icon: TrendingUp },
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

          {/* My Studies & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="font-bold mb-4">My Active Studies</h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Corridor Analysis - Main St",
                    client: "City Project",
                    date: "Dec 10, 2025",
                    status: "In Progress",
                  },
                  {
                    name: "Before/After Safety Study",
                    client: "County DOT",
                    date: "Dec 8, 2025",
                    status: "Data Collection",
                  },
                  {
                    name: "Signal Timing Optimization",
                    client: "Regional Transit",
                    date: "Dec 5, 2025",
                    status: "Analysis",
                  },
                ].map((study, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{study.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {study.client} • {study.date}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">{study.status}</span>
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
                  <Download size={18} className="mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp size={18} className="mr-2" />
                  Get Scorecard
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Downloads & Study Templates */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Recent Data Downloads</h3>
              <div className="space-y-3">
                {[
                  { file: "Main_St_Crossing_Data_Dec.csv", date: "Dec 14, 2025", size: "2.4 MB" },
                  { file: "County_Study_Export.xlsx", date: "Dec 12, 2025", size: "1.8 MB" },
                  { file: "Signal_Timing_Report.pdf", date: "Dec 10, 2025", size: "892 KB" },
                  { file: "Regional_Analysis_GIS.shp", date: "Dec 8, 2025", size: "4.1 MB" },
                ].map((download, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{download.file}</p>
                      <p className="text-xs text-muted-foreground">{download.date}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{download.size}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Available Study Templates</h3>
              <div className="space-y-3">
                {[
                  { name: "Before/After Analysis", type: "Safety & Operations" },
                  { name: "Planning Study", type: "Infrastructure Planning" },
                  { name: "Signal Timing Plan", type: "Traffic Engineering" },
                  { name: "Grade Crossing Assessment", type: "Safety Analysis" },
                ].map((template, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-sm">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.type}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Use
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
