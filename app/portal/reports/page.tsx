"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Server, Activity } from "lucide-react"
import { useState } from "react"

export default function SystemPerformanceReports() {
  const [reportScope, setReportScope] = useState<"all" | "customer">("all")
  const [selectedCustomer, setSelectedCustomer] = useState("")

  return (
    <PortalLayout
      role="cse"
      title="System Performance Reports"
      subtitle="Generate system-wide or customer-specific performance reports"
      activeHref="/portal/reports"
    >
      <div className="p-6 space-y-6">
        {/* Report Configuration */}
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Report Configuration</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Scope</label>
              <select
                value={reportScope}
                onChange={(e) => setReportScope(e.target.value as "all" | "customer")}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">Entire System</option>
                <option value="customer">Specific Customer</option>
              </select>
            </div>

            {reportScope === "customer" && (
              <div>
                <label className="text-sm font-medium mb-2 block">Select Customer</label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="">Choose a customer...</option>
                  <option value="127">North Florida TPO</option>
                  <option value="129">Florida International University</option>
                  <option value="130">City Of Alabaster AL</option>
                  <option value="131">County Of Macomb MI</option>
                </select>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-background">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Custom Range</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Report Format</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-background">
                <option>PDF</option>
                <option>CSV</option>
                <option>Excel</option>
              </select>
            </div>
          </div>

          <Button className="w-full mt-4">
            <Download size={18} className="mr-2" />
            Generate Performance Report
          </Button>
        </Card>

        {/* Performance Metrics Preview */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "System Uptime", value: "99.2%", icon: Server, color: "text-green-600" },
            { label: "Active Sensors", value: "328", icon: Activity, color: "text-blue-600" },
            { label: "Data Throughput", value: "2.4 TB", icon: TrendingUp, color: "text-purple-600" },
          ].map((metric, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <metric.icon size={20} className="text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {[
              { name: "System Performance - Q4 2024", date: "2024-12-15", scope: "All Customers", size: "2.4 MB" },
              {
                name: "Florida International University - November",
                date: "2024-12-01",
                scope: "Single Customer",
                size: "890 KB",
              },
              {
                name: "System Uptime Analysis - Last 90 Days",
                date: "2024-11-28",
                scope: "All Customers",
                size: "1.2 MB",
              },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.date} • {report.scope} • {report.size}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PortalLayout>
  )
}
