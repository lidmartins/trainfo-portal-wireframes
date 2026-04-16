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
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  FileBarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/account-manager" },
  { icon: Users, label: "Customers", href: "/portal/account-manager/customers" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
  { icon: TrendingUp, label: "System Reports", href: "/portal/reports" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function AccountManagerDashboard() {
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
            <h1 className="text-xl font-bold">Account Manager Dashboard</h1>
            <p className="text-sm text-muted-foreground">Usage analytics and renewal insights</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portal/settings">Account Settings</Link>
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Manage Your Accounts</h2>
            <p className="text-muted-foreground">Track usage, renewals, and customer health metrics</p>
          </div>

          {/* KPI Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Contract Value",
                value: "$2.4M",
                change: "+12% YoY",
                icon: DollarSign,
              },
              {
                label: "Renewal Rate",
                value: "94%",
                change: "+2% from last year",
                icon: TrendingUp,
              },
              {
                label: "Customers (Managed)",
                value: "12",
                change: "+2 this quarter",
                icon: Users,
              },
              {
                label: "Expansion Revenue",
                value: "$340K",
                change: "From new features",
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

          {/* Account Health & Renewal Pipeline */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="font-bold mb-4">Renewal Pipeline</h3>
              <div className="space-y-3">
                {[
                  {
                    customer: "Springfield City",
                    renewal: "Mar 2025",
                    status: "At Risk",
                    value: "$180K",
                  },
                  { customer: "Metro County", renewal: "May 2025", status: "On Track", value: "$320K" },
                  {
                    customer: "Riverside District",
                    renewal: "Aug 2025",
                    status: "Strong",
                    value: "$145K",
                  },
                  {
                    customer: "North Valley",
                    renewal: "Nov 2025",
                    status: "On Track",
                    value: "$125K",
                  },
                ].map((account, i) => (
                  <div key={i} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{account.customer}</p>
                        <p className="text-xs text-muted-foreground">Renews: {account.renewal}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{account.value}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            account.status === "At Risk"
                              ? "bg-red-100 text-red-700"
                              : account.status === "Strong"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {account.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-bold">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href="/portal/account-manager/customers">
                    <Eye size={18} className="mr-2" />
                    View Customers
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/portal/reports">
                    <FileBarChart size={18} className="mr-2" />
                    System Reports
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <DollarSign size={18} className="mr-2" />
                  Revenue Report
                </Button>
              </div>
            </Card>
          </div>

          {/* Usage by Customer */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Customer Usage Summary</h3>
            <div className="space-y-3">
              {[
                { customer: "Springfield City", usage: 85, tier: "Enterprise" },
                { customer: "Metro County", usage: 92, tier: "Enterprise" },
                { customer: "Riverside District", usage: 62, tier: "Professional" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.customer}</p>
                    <p className="text-xs text-muted-foreground">{item.tier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{item.usage}% used</p>
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
