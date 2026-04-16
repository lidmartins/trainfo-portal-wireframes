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
  Copy,
  Code,
  Zap,
  BookOpen,
  Server,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Studies & Planning", href: "/portal/studies" },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data", active: true },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function DataAPIPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("downloads")

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
          <h1 className="text-xl font-bold">Data & API Management</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-4 border-b border-border overflow-x-auto">
            {[
              { id: "downloads", label: "Data Downloads", icon: Download },
              { id: "sandbox", label: "Sandbox Environment", icon: Server },
              { id: "keys", label: "API Keys", icon: Zap },
              { id: "docs", label: "API Documentation", icon: BookOpen },
              { id: "integrations", label: "Integrations", icon: Code },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "downloads" && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold">Download Data</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Select Crossing(s)</label>
                  <select className="w-full border border-border rounded-lg p-2 bg-background">
                    <option>All Crossings</option>
                    <option>Downtown A</option>
                    <option>Industrial B</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Date Range</label>
                  <input type="date" className="w-full border border-border rounded-lg p-2 bg-background" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Data Type</label>
                <div className="grid md:grid-cols-2 gap-2">
                  {["Train Activation Data", "Vehicle Delay Data", "Summary Metrics", "Safety Indicators"].map(
                    (type, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Export Format</label>
                <div className="flex gap-2">
                  {["CSV", "JSON", "GIS (Shapefile)", "PDF"].map((format, i) => (
                    <button
                      key={i}
                      className="px-3 py-1 border border-border rounded-lg text-sm hover:border-accent transition"
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90">
                <Download size={18} className="mr-2" />
                Download Data
              </Button>
            </Card>
          )}

          {activeTab === "sandbox" && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Server size={20} /> Sandbox Environment
              </h3>
              <p className="text-sm text-muted-foreground">
                Test integrations and API calls in a safe environment before deploying to production.
              </p>

              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sandbox Endpoint</h4>
                    <code className="text-xs text-muted-foreground mt-1">api.sandbox.trainfo.ca/v2</code>
                  </div>
                  <button className="p-2 hover:bg-background rounded transition">
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Test Data Available</h4>
                {[
                  { name: "Sample Crossings Dataset", records: "50 crossing records" },
                  { name: "Historical Traffic Data", records: "30 days of sample data" },
                  { name: "Test Scenarios", records: "5 simulated conditions" },
                ].map((item, i) => (
                  <div key={i} className="p-3 border border-border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.records}</p>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Load
                    </Button>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90">
                <Zap size={18} className="mr-2" />
                Create Sandbox Account
              </Button>
            </Card>
          )}

          {/* API Keys */}
          {activeTab === "keys" && (
            <Card className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">API Keys</h3>
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  Generate New Key
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Production API", scope: "Full Access", status: "Active" },
                  { name: "Development API", scope: "Read Only", status: "Active" },
                ].map((key, i) => (
                  <Card key={i} className="p-4 bg-muted">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold">{key.name}</h4>
                        <p className="text-sm text-muted-foreground">{key.scope}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{key.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <code className="flex-1 bg-background p-2 rounded text-sm text-muted-foreground truncate">
                        sk_live_51a2b3c4d5e6f7g8h9i0j
                      </code>
                      <button className="p-2 hover:bg-background rounded transition">
                        <Copy size={18} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "docs" && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <BookOpen size={20} /> API Documentation
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete API reference and integration guides for developers.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Getting Started",
                    desc: "Authentication, base URLs, and common patterns",
                  },
                  { title: "Endpoints Reference", desc: "Complete list of all available API endpoints" },
                  { title: "Data Models", desc: "Schema definitions and field descriptions" },
                  { title: "Code Examples", desc: "Sample requests in multiple programming languages" },
                  { title: "Webhooks", desc: "Set up real-time event notifications" },
                  { title: "Rate Limiting", desc: "Usage limits and quota information" },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="p-4 border border-border rounded-lg hover:border-accent transition cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium">{doc.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{doc.desc}</p>
                    </div>
                    <BookOpen size={20} className="text-muted-foreground" />
                  </div>
                ))}
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90">
                <BookOpen size={18} className="mr-2" />
                View Full Documentation
              </Button>
            </Card>
          )}

          {activeTab === "integrations" && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Code size={20} /> Integration Status & Health
              </h3>
              <p className="text-sm text-muted-foreground">Monitor the status of all connected integrations.</p>

              <div className="space-y-3">
                {[
                  {
                    name: "Salesforce CRM",
                    status: "Connected",
                    health: 100,
                    lastSync: "2 minutes ago",
                  },
                  {
                    name: "GIS Data Platform",
                    status: "Connected",
                    health: 98,
                    lastSync: "15 minutes ago",
                  },
                  {
                    name: "Email Notifications",
                    status: "Connected",
                    health: 100,
                    lastSync: "5 minutes ago",
                  },
                ].map((integration, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {integration.status}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: `${integration.health}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90">
                <Code size={18} className="mr-2" />
                Add New Integration
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
