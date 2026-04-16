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
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/consulting-admin" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
  { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function ScorecardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const scorecards = [
    {
      crossing: "Main St & Railway Ave",
      crossingId: "620872B",
      client: "City of Springfield",
      grade: "B+",
      status: "good",
      lastUpdated: "2025-01-10",
      metrics: { safety: 85, efficiency: 88, reliability: 92 },
    },
    {
      crossing: "Oak Boulevard Crossing",
      crossingId: "758610E",
      client: "Metro County",
      grade: "A-",
      status: "excellent",
      lastUpdated: "2025-01-09",
      metrics: { safety: 92, efficiency: 89, reliability: 95 },
    },
    {
      crossing: "Industrial Park Rail",
      crossingId: "912020F",
      client: "State DOT",
      grade: "C+",
      status: "caution",
      lastUpdated: "2025-01-08",
      metrics: { safety: 72, efficiency: 68, reliability: 75 },
    },
    {
      crossing: "Heritage Dr Crossing",
      crossingId: "445321G",
      client: "City of Riverside",
      grade: "B",
      status: "good",
      lastUpdated: "2025-01-07",
      metrics: { safety: 81, efficiency: 78, reliability: 84 },
    },
    {
      crossing: "Commerce Ave & Tracks",
      crossingId: "758289M",
      client: "Port Authority",
      grade: "A",
      status: "excellent",
      lastUpdated: "2025-01-06",
      metrics: { safety: 94, efficiency: 93, reliability: 96 },
    },
  ]

  const filteredScorecards = scorecards.filter(
    (sc) =>
      sc.crossing.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sc.crossingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sc.client.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const styles = {
      excellent: "bg-green-100 text-green-700",
      good: "bg-blue-100 text-blue-700",
      caution: "bg-amber-100 text-amber-700",
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-700"
  }

  const getStatusIcon = (status: string) => {
    if (status === "excellent") return <CheckCircle size={16} className="text-green-600" />
    if (status === "good") return <TrendingUp size={16} className="text-blue-600" />
    return <AlertTriangle size={16} className="text-amber-600" />
  }

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
            <h1 className="text-xl font-bold">Grade Crossing Scorecards</h1>
            <p className="text-sm text-muted-foreground">Comprehensive crossing performance analysis</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portal/settings">Account Settings</Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Search & Filter Bar */}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  placeholder="Search by crossing name, ID, or client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Download size={18} className="mr-2" />
                Export All
              </Button>
            </div>
          </Card>

          {/* Scorecards Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredScorecards.map((scorecard, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition cursor-pointer">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{scorecard.crossing}</h3>
                      <p className="text-sm text-muted-foreground">ID: {scorecard.crossingId}</p>
                      <p className="text-xs text-muted-foreground mt-1">{scorecard.client}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-accent">{scorecard.grade}</div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full mt-1 flex items-center gap-1 ${getStatusBadge(scorecard.status)}`}
                      >
                        {getStatusIcon(scorecard.status)}
                        <span className="capitalize">{scorecard.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Safety Score</span>
                        <span className="font-medium">{scorecard.metrics.safety}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${scorecard.metrics.safety}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Efficiency Score</span>
                        <span className="font-medium">{scorecard.metrics.efficiency}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${scorecard.metrics.efficiency}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Reliability Score</span>
                        <span className="font-medium">{scorecard.metrics.reliability}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all"
                          style={{ width: `${scorecard.metrics.reliability}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Updated: {new Date(scorecard.lastUpdated).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Download size={14} className="mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredScorecards.length === 0 && (
            <Card className="p-12 text-center">
              <TrendingUp size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-bold text-xl mb-2">No scorecards found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
