"use client"

import { useParams } from "next/navigation"
import {
  BarChart3,
  MapPin,
  FileText,
  Database,
  HelpCircle,
  Activity,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AccountManagerCustomerPreview() {
  const params = useParams()
  const customerId = params.id

  const customerName = "Florida International University"

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-blue-600 text-white py-3 px-6">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="font-bold">Account Manager Preview Mode</span>
            <span className="text-blue-200">|</span>
            <span>
              Customer: {customerName} (ID: {customerId})
            </span>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" asChild>
            <Link href="/portal/account-manager/customers">Exit Preview</Link>
          </Button>
        </div>
      </div>

      {/* Portal Content - Same as Customer General */}
      <div className="flex h-screen">
        <aside className="w-64 bg-sidebar border-r border-sidebar-border">
          <div className="h-16 border-b border-sidebar-border flex items-center px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-sm">TI</span>
              </div>
              <span className="font-bold">Portal</span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {[
              { icon: BarChart3, label: "Dashboard", href: "#" },
              { icon: MapPin, label: "Map & Agents", href: "#" },
              { icon: FileText, label: "Planning Studies", href: "#" },
              { icon: Database, label: "Data & API", href: "#" },
              { icon: HelpCircle, label: "Help & Support", href: "#" },
            ].map((item, i) => (
              <button
                key={i}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent w-full transition"
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time crossing data and reports</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Active Crossings", value: "44", icon: Activity },
                { label: "Avg. Blockages/Day", value: "126", icon: AlertTriangle },
                { label: "Avg. Delay per Vehicle", value: "2.4 min", icon: Clock },
                { label: "Responder Interactions", value: "148", icon: TrendingUp },
              ].map((kpi, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                    </div>
                    <kpi.icon size={20} className="text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Reports */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Blockage Insights", description: "Crossing activity and train characteristics" },
                { title: "Congestion Analytics", description: "Vehicle delay and impact by origin-destination" },
                { title: "Response Intelligence", description: "Responder delay risk and interaction data" },
              ].map((report, i) => (
                <Card key={i} className="p-4 hover:shadow-lg transition cursor-pointer">
                  <h3 className="font-bold mb-2">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
