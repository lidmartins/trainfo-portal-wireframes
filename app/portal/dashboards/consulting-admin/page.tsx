"use client"

import Link from "next/link"
import {
  BarChart3,
  MapPin,
  FileText,
  Database,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/consulting-admin" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Studies & Planning", href: "/portal/studies" },
  { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function ConsultingAdminDashboard() {
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
            <p className="text-sm text-muted-foreground">Consulting Partner Admin</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portal/settings">Account Settings</Link>
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Welcome back, Consultant</h2>
            <p className="text-muted-foreground">Manage your team, studies, and API access</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Studies", value: "8", change: "+2 this month", icon: FileText },
              { label: "Team Members", value: "5", change: "No change", icon: Users },
              { label: "API Calls (Month)", value: "24.5K", change: "+12%", icon: Database },
              { label: "Crossing Scorecards", value: "15", change: "+3 new", icon: TrendingUp },
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

          {/* Active Studies & Team Management */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="font-bold mb-4">Active Client Studies</h3>
              <div className="space-y-3">
                {[
                  {
                    name: "City of Springfield - Corridor Study",
                    client: "Springfield DOT",
                    status: "Analysis Phase",
                    progress: 65,
                  },
                  {
                    name: "County Transit Planning",
                    client: "Metro County",
                    status: "Data Collection",
                    progress: 30,
                  },
                  { name: "Safety Assessment Report", client: "State DOT", status: "Final Review", progress: 90 },
                ].map((study, i) => (
                  <div
                    key={i}
                    className="p-4 border border-border rounded-lg hover:bg-muted transition cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{study.name}</p>
                        <p className="text-xs text-muted-foreground">{study.client}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">{study.status}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{study.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all"
                          style={{ width: `${study.progress}%` }}
                        />
                      </div>
                    </div>
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
                  <Users size={18} className="mr-2" />
                  Manage Team
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Database size={18} className="mr-2" />
                  API Keys
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/portal/scorecards">
                    <TrendingUp size={18} className="mr-2" />
                    Get Scorecards
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Team Members & API Usage */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Team Members</h3>
              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", role: "Senior Analyst", status: "Active" },
                  { name: "Mike Chen", role: "Transportation Engineer", status: "Active" },
                  { name: "Emily Davis", role: "Junior Analyst", status: "Active" },
                  { name: "Tom Wilson", role: "Project Manager", status: "Active" },
                  { name: "Lisa Brown", role: "Data Specialist", status: "Active" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-accent-foreground">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{member.status}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">API Usage This Month</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Total API Calls</span>
                    <span className="text-2xl font-bold">24,567</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "65%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">65% of monthly limit</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Crossing Data API</span>
                    <span className="font-medium">12,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Studies API</span>
                    <span className="font-medium">8,920</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Scorecards API</span>
                    <span className="font-medium">3,197</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  View Detailed Analytics
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
