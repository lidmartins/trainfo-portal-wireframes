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
  Plus,
  Download,
  BookOpen,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Planning Studies", href: "/portal/studies", active: true },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

const studies = [
  { name: "Downtown Corridor - Phase 2", date: "Dec 5, 2025", status: "In Progress", type: "Safety" },
  { name: "Safety Analysis - Intersection A", date: "Dec 3, 2025", status: "Completed", type: "Safety" },
  { name: "Delay Reduction Study", date: "Nov 28, 2025", status: "Completed", type: "Congestion" },
]

export default function StudiesPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("active")

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
          <h1 className="text-xl font-bold">Planning Studies</h1>
          <Button className="bg-accent hover:bg-accent/90">
            <Plus size={18} className="mr-2" />
            New Study
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-border overflow-x-auto">
            {[
              { id: "active", label: "Active Studies" },
              { id: "before-after", label: "Before & After Analysis" },
              { id: "archived", label: "Archived" },
              { id: "templates", label: "Study Templates" },
              { id: "export", label: "Export Data" },
              { id: "reference", label: "Data Dictionary" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Studies Tab */}
          {activeTab === "active" && (
            <div className="space-y-4">
              <div className="space-y-3">
                {studies
                  .filter((s) => s.status === "In Progress" || s.status === "Completed")
                  .map((study, i) => (
                    <Card key={i} className="p-4 hover:border-accent transition cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold">{study.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {study.date} • {study.type} Study
                          </p>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            study.status === "In Progress" ? "bg-accent/20 text-accent" : "bg-green-100 text-green-700"
                          }`}
                        >
                          {study.status}
                        </span>
                      </div>
                    </Card>
                  ))}
              </div>

              <Card className="p-8 bg-muted text-center">
                <h3 className="text-lg font-bold mb-2">Create a New Study</h3>
                <p className="text-muted-foreground mb-4">Step through our wizard to set up a custom analysis</p>
                <Button className="bg-accent hover:bg-accent/90">Get Started</Button>
              </Card>
            </div>
          )}

          {/* Before & After Analysis Tab */}
          {activeTab === "before-after" && (
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BarChart size={20} /> Before & After Analysis
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Compare crossing performance before and after infrastructure changes, signal timing updates, or other
                  modifications.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      name: "Main St Signal Timing Update",
                      beforePeriod: "Jan-Mar 2024",
                      afterPeriod: "Apr-Jun 2024",
                      improvement: "22% delay reduction",
                    },
                    {
                      name: "Oak Ave Grade Separation",
                      beforePeriod: "Jul-Sep 2023",
                      afterPeriod: "Oct-Dec 2024",
                      improvement: "95% delay reduction",
                    },
                  ].map((analysis, i) => (
                    <Card key={i} className="p-4 hover:border-accent transition cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold">{analysis.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Before: {analysis.beforePeriod} | After: {analysis.afterPeriod}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                          {analysis.improvement}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Before</p>
                          <p className="text-xl font-bold">45.2 min</p>
                          <p className="text-xs text-muted-foreground">Avg delay</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">After</p>
                          <p className="text-xl font-bold">35.3 min</p>
                          <p className="text-xs text-muted-foreground">Avg delay</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button className="w-full mt-6 bg-accent hover:bg-accent/90">
                  <Plus size={18} className="mr-2" />
                  Create New Before & After Analysis
                </Button>
              </Card>
            </div>
          )}

          {/* Archived Studies Tab */}
          {activeTab === "archived" && (
            <div className="space-y-3">
              {studies
                .filter((s) => s.status === "Completed")
                .map((study, i) => (
                  <Card key={i} className="p-4 hover:border-accent transition cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold">{study.name}</h4>
                        <p className="text-sm text-muted-foreground">Archived on {study.date}</p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Restore
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          )}

          {/* Study Templates Tab */}
          {activeTab === "templates" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Start faster with pre-built study templates tailored to common analysis scenarios.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Safety & Collision Risk",
                    desc: "Analyze collision patterns and identify risk factors",
                    sections: 5,
                  },
                  {
                    name: "Traffic Delay Analysis",
                    desc: "Quantify delays and identify peak congestion periods",
                    sections: 6,
                  },
                  {
                    name: "Community Impact Assessment",
                    desc: "Document economic and social impacts of crossing closures",
                    sections: 4,
                  },
                  {
                    name: "Emergency Response Optimization",
                    desc: "Analyze emergency service routing and response times",
                    sections: 5,
                  },
                ].map((template, i) => (
                  <Card key={i} className="p-4 hover:border-accent transition cursor-pointer flex flex-col">
                    <h4 className="font-bold mb-2">{template.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{template.desc}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{template.sections} sections</p>
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        <Plus size={16} /> Use
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Export Data Tab */}
          {activeTab === "export" && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Download size={20} /> Export Study Data & Templates
              </h3>
              <p className="text-sm text-muted-foreground">
                Export your completed studies and templates for sharing, archiving, or integration with other systems.
              </p>

              <div className="space-y-4">
                {/* Study Export Section */}
                <div>
                  <h4 className="font-medium mb-3">Export Completed Studies</h4>
                  <div className="grid md:grid-cols-4 gap-2">
                    {[
                      { format: "CSV", icon: "📊", desc: "Spreadsheet format" },
                      { format: "PDF", icon: "📄", desc: "Report format" },
                      { format: "GeoJSON", icon: "🗺️", desc: "GIS format" },
                      { format: "Excel", icon: "📈", desc: "Excel workbook" },
                    ].map((exp, i) => (
                      <button
                        key={i}
                        className="p-4 border border-border rounded-lg hover:border-accent transition text-center space-y-1"
                      >
                        <p className="text-xl">{exp.icon}</p>
                        <p className="font-medium text-sm">{exp.format}</p>
                        <p className="text-xs text-muted-foreground">{exp.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-3">Export Templates</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Share your custom study templates with team members or keep standardized versions for consistency.
                  </p>
                  <div className="space-y-2">
                    {[
                      { name: "Safety & Collision Risk", studies: 3, downloads: 0 },
                      { name: "Traffic Delay Analysis", studies: 5, downloads: 2 },
                    ].map((t, i) => (
                      <div key={i} className="p-3 border border-border rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Used in {t.studies} studies • Downloaded {t.downloads} times
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Download size={16} /> Export
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Data Dictionary Tab */}
          {activeTab === "reference" && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <BookOpen size={20} /> Data Dictionary & Field Reference
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete reference guide for all data fields and their definitions used in TRAINFO studies.
              </p>

              <div className="space-y-4">
                {[
                  {
                    category: "Train Activity Metrics",
                    fields: [
                      { name: "activation_time", type: "DateTime", desc: "Time train activated crossing" },
                      { name: "closure_duration", type: "Integer (minutes)", desc: "How long crossing was closed" },
                      { name: "train_direction", type: "String", desc: "Direction train was traveling" },
                    ],
                  },
                  {
                    category: "Vehicle Impact Metrics",
                    fields: [
                      { name: "vehicles_delayed", type: "Integer", desc: "Number of vehicles impacted" },
                      { name: "total_delay_minutes", type: "Integer", desc: "Cumulative delay for all vehicles" },
                      { name: "avg_delay_per_vehicle", type: "Decimal", desc: "Average delay per vehicle" },
                    ],
                  },
                  {
                    category: "Safety Indicators",
                    fields: [
                      { name: "incidents_observed", type: "Integer", desc: "Observed safety incidents" },
                      { name: "incident_severity", type: "String", desc: "Severity level of incident" },
                      { name: "risk_score", type: "Decimal (0-100)", desc: "Calculated risk assessment" },
                    ],
                  },
                ].map((section, i) => (
                  <div key={i} className="border border-border rounded-lg p-4">
                    <h4 className="font-bold mb-3">{section.category}</h4>
                    <div className="space-y-2">
                      {section.fields.map((field, j) => (
                        <div key={j} className="bg-muted p-3 rounded text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <code className="font-mono font-bold">{field.name}</code>
                            <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">{field.type}</span>
                          </div>
                          <p className="text-muted-foreground">{field.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90">
                <Download size={18} className="mr-2" />
                Download Full Data Dictionary (PDF)
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
