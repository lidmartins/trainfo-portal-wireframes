"use client"

import Link from "next/link"
import { BarChart3, MapPin, FileText, Database, Settings, HelpCircle, LogOut, Menu, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Studies & Planning", href: "/portal/studies" },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support", active: true },
]

export default function SupportPortal() {
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
        <div className="h-16 border-b border-border bg-card px-6 flex items-center">
          <h1 className="text-xl font-bold">Help & Support</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-border overflow-x-auto">
            <button className="px-4 py-2 font-medium border-b-2 border-accent text-accent whitespace-nowrap">
              Knowledge Base
            </button>
            <button className="px-4 py-2 text-muted-foreground hover:text-foreground whitespace-nowrap">FAQ</button>
            <button className="px-4 py-2 text-muted-foreground hover:text-foreground whitespace-nowrap">
              Submit Ticket
            </button>
          </div>

          {/* Knowledge Base */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Getting Started</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Portal Overview", desc: "Introduction to the TRAINFO Portal" },
                { title: "Using the Map", desc: "How to navigate and use the interactive map" },
                { title: "Creating Studies", desc: "Step-by-step guide to creating studies" },
                { title: "API Integration", desc: "Getting started with the API" },
              ].map((article, i) => (
                <Card key={i} className="p-4 hover:border-accent cursor-pointer transition">
                  <h4 className="font-bold mb-1">{article.title}</h4>
                  <p className="text-sm text-muted-foreground">{article.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="p-6 space-y-4 mt-8">
            <h3 className="font-bold text-lg">Frequently Asked Questions</h3>

            {[
              { q: "How do I reset my password?", a: "Use the Forgot Password link on the login page." },
              {
                q: "What data formats are supported?",
                a: "We support CSV, JSON, and GIS formats for data export.",
              },
              { q: "How do I contact support?", a: "Use the Submit Ticket tab or email support@trainfo.com" },
            ].map((faq, i) => (
              <details key={i} className="group border border-border rounded-lg">
                <summary className="flex items-center justify-between p-4 font-medium cursor-pointer">
                  {faq.q}
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <div className="px-4 pb-4 text-muted-foreground text-sm">{faq.a}</div>
              </details>
            ))}
          </Card>

          {/* Submit Ticket */}
          <Card className="p-6 space-y-4 mt-8">
            <h3 className="font-bold text-lg">Submit a Support Ticket</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Describe your issue..."
                  className="w-full border border-border rounded-lg p-2 bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Category</label>
                <select className="w-full border border-border rounded-lg p-2 bg-background">
                  <option>Data & Analytics</option>
                  <option>API Issues</option>
                  <option>Account & Access</option>
                  <option>Technical Support</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Description</label>
                <textarea
                  placeholder="Tell us more about your issue..."
                  className="w-full border border-border rounded-lg p-2 bg-background h-24 resize-none"
                />
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90">
                <Send size={18} className="mr-2" />
                Submit Ticket
              </Button>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-6 bg-muted text-center space-y-2">
            <h3 className="font-bold">Need Immediate Assistance?</h3>
            <p className="text-sm text-muted-foreground">Email: support@trainfo.com | Phone: 1-800-TRAIN-INFO</p>
            <p className="text-xs text-muted-foreground">Business hours: Monday - Friday, 8am - 6pm EST</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
