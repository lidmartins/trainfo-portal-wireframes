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
  Trash2,
  Video,
  Play,
  TrendingUp,
  ArrowUpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal" },
  { icon: MapPin, label: "Agents", href: "/portal/agents" },
  { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin", active: true },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function AdminPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("users")

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
          <h1 className="text-xl font-bold">Admin Settings</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Tabs - Fixed tab display issue */}
          <div className="flex gap-4 border-b border-border overflow-x-auto">
            {[
              { id: "users", label: "User Management" },
              { id: "license", label: "License & Agents" },
              { id: "monitoring", label: "Monitoring" },
              { id: "streams", label: "RTSP Streams" },
              { id: "integrations", label: "Integrations" },
              { id: "agent-upgrade", label: "Agent Upgrades" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* User Management Tab */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Users</h3>
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <Plus size={18} className="mr-2" />
                  Invite User
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", email: "sarah@example.com", role: "Admin", status: "Active" },
                  { name: "Mike Chen", email: "mike@example.com", role: "Analyst", status: "Active" },
                  { name: "Emily Davis", email: "emily@example.com", role: "User", status: "Pending" },
                ].map((user, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm font-medium">{user.role}</p>
                          <span className="text-xs text-muted-foreground">{user.status}</span>
                        </div>
                        <button className="p-2 hover:bg-muted rounded transition">
                          <Trash2 size={18} className="text-destructive" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* License & Agents Tab */}
          {activeTab === "license" && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-lg">License & Agent Access</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3">License Overview</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active Seats:</span>
                      <span className="font-medium">8/10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Module Tier:</span>
                      <span className="font-medium">Professional</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Enabled Agents</h4>
                  <div className="space-y-2">
                    {["Safety Agent", "Congestion Agent", "Planning Agent"].map((agent, i) => (
                      <label key={i} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        {agent}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Monitoring Tab */}
          {activeTab === "monitoring" && (
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-lg">Sensor Status</h3>

              <div className="space-y-3">
                {[
                  { name: "Downtown Crossing A", status: "Online", lastSeen: "2 mins ago" },
                  { name: "Industrial Zone B", status: "Online", lastSeen: "5 mins ago" },
                  { name: "Suburb District C", status: "Offline", lastSeen: "2 hours ago" },
                ].map((sensor, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{sensor.name}</p>
                      <p className="text-xs text-muted-foreground">Last seen: {sensor.lastSeen}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        sensor.status === "Online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sensor.status}
                    </span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full bg-transparent mt-4">
                Contact Support for Offline Devices
              </Button>
            </Card>
          )}

          {/* RTSP Streams Tab */}
          {activeTab === "streams" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">RTSP Video Streams</h3>
                  <p className="text-sm text-muted-foreground">
                    Access live video feeds from TRAINFO sensors at your crossings
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Refresh All
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    crossing: "Main St & Rail Line",
                    sensor: "TI-SENSOR-001",
                    status: "Streaming",
                    url: "rtsp://camera1.trainfo.ca:554/stream",
                  },
                  {
                    crossing: "Oak Ave & Rail Line",
                    sensor: "TI-SENSOR-002",
                    status: "Streaming",
                    url: "rtsp://camera2.trainfo.ca:554/stream",
                  },
                  {
                    crossing: "River Rd & Rail Line",
                    sensor: "TI-SENSOR-003",
                    status: "Offline",
                    url: "rtsp://camera3.trainfo.ca:554/stream",
                  },
                  {
                    crossing: "Park Blvd & Rail Line",
                    sensor: "TI-SENSOR-004",
                    status: "Streaming",
                    url: "rtsp://camera4.trainfo.ca:554/stream",
                  },
                  {
                    crossing: "Industrial Way & Rail Line",
                    sensor: "TI-SENSOR-005",
                    status: "Streaming",
                    url: "rtsp://camera5.trainfo.ca:554/stream",
                  },
                  {
                    crossing: "Downtown Ave & Rail Line",
                    sensor: "TI-SENSOR-006",
                    status: "Streaming",
                    url: "rtsp://camera6.trainfo.ca:554/stream",
                  },
                ].map((stream, i) => (
                  <Card key={i} className="p-4">
                    <div className="bg-muted rounded-lg h-40 flex items-center justify-center mb-3 relative">
                      {stream.status === "Streaming" ? (
                        <div className="flex flex-col items-center gap-2">
                          <Video size={32} className="text-muted-foreground" />
                          <Play
                            size={48}
                            className="text-accent absolute opacity-80 hover:opacity-100 cursor-pointer transition"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Video size={32} className="text-red-400" />
                          <span className="text-xs text-red-600">Offline</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            stream.status === "Streaming" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {stream.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm">{stream.crossing}</h4>
                      <p className="text-xs text-muted-foreground">{stream.sensor}</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={stream.url}
                          readOnly
                          className="flex-1 text-xs bg-muted border border-border rounded px-2 py-1 font-mono"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs bg-transparent"
                          onClick={() => navigator.clipboard.writeText(stream.url)}
                        >
                          Copy
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-transparent"
                        disabled={stream.status !== "Streaming"}
                      >
                        <Play size={14} className="mr-2" />
                        Open Stream
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-4 bg-muted/30">
                <h4 className="font-medium mb-2 text-sm">Stream Access Information</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• RTSP streams require compatible video player software (VLC, QuickTime, etc.)</li>
                  <li>• Streams are encrypted and accessible only to authorized users</li>
                  <li>• Video retention: 7 days rolling archive available on request</li>
                  <li>• For stream troubleshooting, contact support with the sensor ID</li>
                </ul>
              </Card>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === "integrations" && (
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg">Manage Customer Integrations</h3>
                <p className="text-sm text-muted-foreground">
                  Configure which integrations are available for each customer account. Toggle integrations on/off as
                  needed.
                </p>
              </div>

              {/* Integration Management by Customer */}
              <div className="space-y-4">
                {[
                  {
                    customer: "City of Springfield",
                    integrations: [
                      { name: "GIS Data Feed", enabled: true, apiCalls: "2.4K/day" },
                      { name: "Traffic Signal API", enabled: true, apiCalls: "1.2K/day" },
                      { name: "Emergency Response", enabled: false, apiCalls: "0/day" },
                    ],
                  },
                  {
                    customer: "Metro County",
                    integrations: [
                      { name: "GIS Data Feed", enabled: true, apiCalls: "1.8K/day" },
                      { name: "Traffic Signal API", enabled: true, apiCalls: "890/day" },
                      { name: "Emergency Response", enabled: true, apiCalls: "520/day" },
                    ],
                  },
                  {
                    customer: "North Florida TPO",
                    integrations: [
                      { name: "GIS Data Feed", enabled: true, apiCalls: "340/day" },
                      { name: "Traffic Signal API", enabled: false, apiCalls: "0/day" },
                      { name: "Emergency Response", enabled: false, apiCalls: "0/day" },
                    ],
                  },
                ].map((item, i) => (
                  <Card key={i} className="p-4">
                    <h4 className="font-bold mb-3">{item.customer}</h4>
                    <div className="space-y-2">
                      {item.integrations.map((integration, j) => (
                        <div key={j} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">{integration.apiCalls}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                integration.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {integration.enabled ? "Enabled" : "Disabled"}
                            </span>
                            <Button size="sm" variant={integration.enabled ? "destructive" : "default"}>
                              {integration.enabled ? "Disable" : "Enable"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "agent-upgrade" && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={24} className="text-accent" />
                <h3 className="font-bold text-lg">Agent Tier Upgrades</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Upgrade to higher-tier AI agents for enhanced capabilities and more detailed analysis.
              </p>

              <div className="space-y-4">
                {[
                  {
                    name: "Safety Agent",
                    currentTier: "Tier 2",
                    nextTier: "Tier 3",
                    features: ["Advanced risk prediction", "Incident pattern analysis", "Real-time safety scoring"],
                    price: "$299/month",
                  },
                  {
                    name: "Congestion Agent",
                    currentTier: "Tier 1",
                    nextTier: "Tier 2",
                    features: ["Predictive traffic modeling", "Peak hour optimization", "Multi-crossing coordination"],
                    price: "$199/month",
                  },
                  {
                    name: "Planning Agent",
                    currentTier: "Tier 2",
                    nextTier: "Tier 3",
                    features: ["Scenario simulation", "Cost-benefit analysis", "Long-term impact forecasting"],
                    price: "$349/month",
                  },
                ].map((agent, i) => (
                  <Card key={i} className="p-4 bg-muted/30">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Current: <span className="font-medium">{agent.currentTier}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Upgrade to</p>
                        <p className="font-bold text-accent">{agent.nextTier}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-medium mb-2">{agent.nextTier} Features:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {agent.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <ArrowUpCircle size={12} className="text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="font-bold">{agent.price}</p>
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        Upgrade to {agent.nextTier}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-4 bg-accent/10 border-accent/20">
                <h4 className="font-medium mb-2">Enterprise Tier Available</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Unlock all features with custom AI training, dedicated support, and unlimited API access.
                </p>
                <Button variant="outline" className="bg-transparent">
                  Contact Sales
                </Button>
              </Card>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
