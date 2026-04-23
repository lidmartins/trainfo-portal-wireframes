"use client"

import Link from "next/link"
import { BarChart3, HelpCircle, LogOut, Menu, X, Target, Calendar, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/bdm-sdr", active: true },
  { icon: Users, label: "Leads", href: "/portal/leads" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function BDMSDRDashboard() {
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
            <h1 className="text-xl font-bold">Sales Dashboard</h1>
            <p className="text-sm text-muted-foreground">Pipeline and demo tracking</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portal/settings">Account Settings</Link>
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Sales Pipeline & Demos</h2>
            <p className="text-muted-foreground">Track leads, demos, and customer engagement</p>
          </div>

          {/* Sales Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Open Opportunities", value: "8", change: "3 closing this month", icon: Target },
              { label: "Demos Scheduled", value: "5", change: "2 this week", icon: Calendar },
              { label: "Leads (Qualified)", value: "24", change: "+6 this month", icon: MessageSquare },
              {
                label: "Pipeline Value",
                value: "$1.2M",
                change: "86% close rate avg",
                icon: BarChart3,
              },
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

          {/* Sales Pipeline & Demo Calendar */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target size={20} /> Active Opportunities
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Town of Millbrook",
                    stage: "Demo Scheduled",
                    value: "$150K",
                    date: "Dec 18",
                  },
                  {
                    name: "County Transit Authority",
                    stage: "Proposal",
                    value: "$280K",
                    date: "Jan 5",
                  },
                  {
                    name: "City Planning Dept",
                    stage: "Qualification",
                    value: "$95K",
                    date: "Jan 12",
                  },
                  {
                    name: "Regional Infrastructure",
                    stage: "Proposal",
                    value: "$420K",
                    date: "Jan 20",
                  },
                ].map((opp, i) => (
                  <div key={i} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{opp.name}</p>
                        <p className="text-xs text-muted-foreground">{opp.stage}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{opp.value}</p>
                        <p className="text-xs text-muted-foreground">{opp.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Update
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Add Note
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Calendar size={20} /> Upcoming Demos
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Millbrook - Live Demo", time: "Dec 18, 2:00 PM" },
                  { name: "County Authority - Prep Call", time: "Dec 19, 10:30 AM" },
                  { name: "City Planning - Discovery", time: "Dec 20, 1:00 PM" },
                ].map((demo, i) => (
                  <div key={i} className="p-3 border border-border rounded-lg">
                    <p className="font-medium text-sm">{demo.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{demo.time}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-accent hover:bg-accent/90">Schedule Demo</Button>
            </Card>
          </div>

          {/* Leads by Status */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Lead Status Distribution</h3>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { status: "New", count: 8, color: "blue" },
                { status: "Contacted", count: 6, color: "purple" },
                { status: "Qualified", count: 24, color: "green" },
                { status: "In Demo", count: 5, color: "orange" },
                { status: "Proposal", count: 4, color: "red" },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-lg bg-${item.color}-50 border border-${item.color}-200`}>
                  <p className="text-sm font-medium text-center">{item.status}</p>
                  <p className="text-2xl font-bold text-center mt-2">{item.count}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
