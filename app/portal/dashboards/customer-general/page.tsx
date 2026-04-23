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
  TrendingDown,
  AlertTriangle,
  Activity,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/customer-general", active: true },
  { icon: MapPin, label: "Agents", href: "/portal/agents" },
  { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
  { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function CustomerGeneralDashboard() {
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
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Customer General View</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portal/settings">Account Settings</Link>
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics derived from Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Activation Duration</p>
                  <p className="text-2xl font-bold">4.18 min</p>
                  <p className="text-xs text-accent mt-2">From Blockage Insights</p>
                </div>
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Activity size={20} className="text-accent" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Daily Activations</p>
                  <p className="text-2xl font-bold">32 avg</p>
                  <p className="text-xs text-accent mt-2">From Blockage Insights</p>
                </div>
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Activity size={20} className="text-accent" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Vehicle Delay</p>
                  <p className="text-2xl font-bold">1.5 min</p>
                  <p className="text-xs text-orange-500 mt-2">From Congestion Analytics</p>
                </div>
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <TrendingDown size={20} className="text-orange-500" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Responders Delayed/Week</p>
                  <p className="text-2xl font-bold">148.62</p>
                  <p className="text-xs text-red-500 mt-2">From Response Intelligence</p>
                </div>
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-500" />
                </div>
              </div>
            </Card>
          </div>

          {/* Real-Time Map & Crossings Section */}
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Map */}
            <Card className="lg:col-span-4 p-4 bg-gradient-to-br from-sidebar/20 to-background border-2 border-accent/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <MapPin className="text-accent" size={20} />
                    Real-Time Crossing Data
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Live monitoring of all crossing activity
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg h-[400px] flex items-center justify-center border border-border">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <p className="font-semibold">Interactive Crossing Map</p>
                  <p className="text-xs text-muted-foreground">Click on crossings to view details</p>
                </div>
              </div>
            </Card>

            {/* Crossings Table */}
            <Card className="p-4 flex flex-col">
              <h3 className="font-bold mb-3 text-sm">Crossings</h3>
              <div className="space-y-1.5 flex-1 overflow-y-auto">
                {[
                  { id: "620872B", name: "Heckscher Dr", status: "Active" },
                  { id: "284080E", name: "Groesbeck Hwy", status: "Active" },
                  { id: "284101V", name: "Hall Road", status: "Active" },
                  { id: "284085N", name: "Cass Ave", status: "Active" },
                  { id: "284081L", name: "Harrington Ave", status: "Inactive" },
                  { id: "284103J", name: "21 Mile Rd", status: "Active" },
                  { id: "284090K", name: "Elizabeth Rd", status: "Active" },
                  { id: "284098P", name: "North Ave", status: "Active" },
                ].map((crossing, i) => (
                  <div
                    key={i}
                    className="p-2 border border-border rounded hover:bg-muted transition cursor-pointer"
                  >
                    <p className="font-medium text-xs truncate">{crossing.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-muted-foreground">{crossing.id}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          crossing.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {crossing.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Stats moved to bottom of crossings table */}
              <div className="border-t border-border pt-3 mt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">Active Crossings</span>
                  <span className="text-sm font-bold text-accent">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">Sensors Online</span>
                  <span className="text-sm font-bold text-green-600">11</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">Last Update</span>
                  <span className="text-sm font-bold">2 hrs</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Reports Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Data Reports</h3>
                <p className="text-sm text-muted-foreground">Access comprehensive analytics and insights</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Blockage Insights Report */}
              <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer group border-l-4 border-l-accent">
                <Link href="/portal/reports/blockage-insights" className="block">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Activity size={24} className="text-accent" />
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Blockage Insights</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Crossing activity analysis including blockage frequency, duration, train characteristics, and
                    temporal patterns
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. Activation Duration</span>
                      <span className="font-semibold">4.18 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Activations</span>
                      <span className="font-semibold">32 avg</span>
                    </div>
                  </div>
                </Link>
              </Card>

              {/* Congestion Analytics Report */}
              <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer group border-l-4 border-l-orange-500">
                <Link href="/portal/reports/congestion-analytics" className="block">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <TrendingDown size={24} className="text-orange-500" />
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Congestion Analytics</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vehicle delay and congestion impact analysis by crossing and origin-destination pairs with temporal
                    breakdowns
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. Delay per Vehicle</span>
                      <span className="font-semibold">1.5 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vehicles Impacted/Day</span>
                      <span className="font-semibold">10.2K avg</span>
                    </div>
                  </div>
                </Link>
              </Card>

              {/* Response Intelligence Report */}
              <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer group border-l-4 border-l-red-500">
                <Link href="/portal/reports/response-intelligence" className="block">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle size={24} className="text-red-500" />
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-muted-foreground group-hover:text-red-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Response Intelligence</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Emergency responder interaction and delay analysis with geographic risk assessment by crossing and
                    route
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Responders Delayed/Week</span>
                      <span className="font-semibold">148.62 avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interactions/Week</span>
                      <span className="font-semibold">2.31K</span>
                    </div>
                  </div>
                </Link>
              </Card>
            </div>
          </div>

          {/* Planning Studies Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Planning Studies</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/portal/studies">View All</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "Downtown Corridor Analysis",
                    date: "Dec 5, 2025",
                    status: "In Progress",
                    crossing: "Main St",
                  },
                  { name: "Peak Hour Study", date: "Dec 1, 2025", status: "Completed", crossing: "Oak Ave" },
                  { name: "Safety Assessment", date: "Nov 28, 2025", status: "Completed", crossing: "River Rd" },
                ].map((study, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{study.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {study.crossing} • {study.date}
                      </p>
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
                <Button className="w-full justify-start bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href="/portal/agents">
                    <MapPin size={18} className="mr-2" />
                    Ask AI Agents
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/portal/studies">
                    <FileText size={18} className="mr-2" />
                    Create Study
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/portal/data">
                    <Database size={18} className="mr-2" />
                    Export Data
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
