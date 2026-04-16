"use client"

import Link from "next/link"
import { BarChart3, MapPin, FileText, Database, Settings, HelpCircle, LogOut, Menu, X, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal" },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function AccountSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedRole, setSelectedRole] = useState("customer-general")
  const [showPasswordReset, setShowPasswordReset] = useState(false)

  const roles = [
    {
      id: "customer-general",
      name: "Customer General",
      description: "Standard access to data and studies",
      dashboardLink: "/portal/dashboards/customer-general",
    },
    {
      id: "customer-admin",
      name: "Customer Admin",
      description: "System configuration and user management",
      dashboardLink: "/portal/dashboards/customer-admin",
    },
    {
      id: "cse-superuser",
      name: "CSE / Superuser",
      description: "Deployment oversight and diagnostics",
      dashboardLink: "/portal/dashboards/cse-superuser",
    },
    {
      id: "account-manager",
      name: "Account Manager",
      description: "Usage analytics and renewal insights",
      dashboardLink: "/portal/dashboards/account-manager",
    },
    {
      id: "bdm-sdr",
      name: "BDM / SDR",
      description: "Sales pipeline and demo tracking",
      dashboardLink: "/portal/dashboards/bdm-sdr",
    },
    {
      id: "consulting-admin",
      name: "Consulting Partner Admin",
      description: "Team and client management",
      dashboardLink: "/portal/dashboards/consulting-admin",
    },
    {
      id: "consulting-general",
      name: "Consulting Partner General",
      description: "Client project access",
      dashboardLink: "/portal/dashboards/consulting-general",
    },
  ]

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
          <h1 className="text-xl font-bold">Account Settings</h1>
        </div>

        <div className="p-6 space-y-6 max-w-4xl">
          {/* Profile Section */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Profile Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Smith"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.smith@example.com"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Organization</label>
                <input
                  type="text"
                  defaultValue="City of Springfield"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </Card>

          {/* Role Selection (For Wireframe/Demo Purposes) */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Role Simulation (Demo)</h2>
            <p className="text-sm text-muted-foreground">
              For wireframe demonstration purposes, select a role to view the corresponding dashboard. In production,
              user roles are determined by actual account credentials.
            </p>
            <div className="space-y-3">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-accent transition cursor-pointer"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{role.name}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <Button size="sm" variant="outline" asChild className="flex-shrink-0 bg-transparent">
                    <Link href={role.dashboardLink}>View Dashboard</Link>
                  </Button>
                </label>
              ))}
            </div>
          </Card>

          {/* Security Section with Password Reset */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Security</h2>

            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Key size={18} />
                Password
              </h3>
              {!showPasswordReset ? (
                <Button variant="outline" onClick={() => setShowPasswordReset(true)}>
                  Change Password
                </Button>
              ) : (
                <div className="space-y-4 p-4 border border-border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-accent hover:bg-accent/90">Update Password</Button>
                    <Button variant="outline" onClick={() => setShowPasswordReset(false)}>
                      Cancel
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters with uppercase, lowercase, and numbers.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground mb-3">Secure your account with 2FA</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button className="bg-accent hover:bg-accent/90">Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
