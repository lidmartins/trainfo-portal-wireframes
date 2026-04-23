"use client"

import type React from "react"

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
  CheckCircle,
  Circle,
  Users,
  Lock,
  DatabaseIcon,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal", active: true },
  { icon: MapPin, label: "Map & Agents", href: "/portal/map" },
  { icon: FileText, label: "Studies & Planning", href: "/portal/studies" },
  { icon: Settings, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: Settings, label: "Admin", href: "/portal/admin" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

interface WizardStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
}

export default function OnboardingWizard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [formData, setFormData] = useState({
    // Step 1: System Configuration
    dataCollection: true,
    apiAccess: true,
    emailNotifications: false,

    // Step 2: User Management
    users: [{ name: "John Smith", email: "john@example.com", role: "Admin" }],
    newUserName: "",
    newUserEmail: "",
    newUserRole: "User",

    // Step 3: Permissions
    adminUsers: ["John Smith"],
    analysts: [],
    viewers: [],
    selectedUserRole: "User",
  })

  const steps: WizardStep[] = [
    {
      id: 1,
      title: "System Configuration",
      description: "Enable features and configure system settings",
      icon: <Zap size={24} />,
      completed: completedSteps.includes(1),
    },
    {
      id: 2,
      title: "User Provisioning",
      description: "Add team members and set their roles",
      icon: <Users size={24} />,
      completed: completedSteps.includes(2),
    },
    {
      id: 3,
      title: "Permission Assignment",
      description: "Define access levels and data permissions",
      icon: <Lock size={24} />,
      completed: completedSteps.includes(3),
    },
    {
      id: 4,
      title: "Data Integration",
      description: "Connect data sources and configure sync",
      icon: <DatabaseIcon size={24} />,
      completed: completedSteps.includes(4),
    },
  ]

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleAddUser = () => {
    if (formData.newUserName && formData.newUserEmail) {
      setFormData({
        ...formData,
        users: [
          ...formData.users,
          {
            name: formData.newUserName,
            email: formData.newUserEmail,
            role: formData.newUserRole,
          },
        ],
        newUserName: "",
        newUserEmail: "",
        newUserRole: "User",
      })
    }
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
          <h1 className="text-xl font-bold">Setup Wizard</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/portal">Skip Setup</Link>
          </Button>
        </div>

        <div className="p-6 space-y-6 max-w-5xl">
          {/* Progress Overview */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Welcome to TRAINFO Setup</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    currentStep === step.id
                      ? "border-accent bg-accent/10"
                      : step.completed
                        ? "border-green-500 bg-green-50"
                        : "border-border hover:border-accent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 ${
                        step.completed
                          ? "text-green-600"
                          : currentStep === step.id
                            ? "text-accent"
                            : "text-muted-foreground"
                      }`}
                    >
                      {step.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Step Content */}
          {currentStep === 1 && (
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">System Configuration</h2>
                <p className="text-muted-foreground">
                  Configure which features and capabilities are enabled for your organization.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "dataCollection",
                    label: "Data Collection",
                    desc: "Automatically collect and store crossing data",
                  },
                  {
                    name: "apiAccess",
                    label: "API Access",
                    desc: "Enable external integrations via API",
                  },
                  {
                    name: "emailNotifications",
                    label: "Email Notifications",
                    desc: "Send alerts and reports via email",
                  },
                ].map((setting) => (
                  <label
                    key={setting.name}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-accent transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData[setting.name as keyof typeof formData] as boolean}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [setting.name]: e.target.checked,
                        })
                      }
                      className="w-5 h-5"
                    />
                    <div>
                      <p className="font-bold">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <Button className="bg-accent hover:bg-accent/90" onClick={handleStepComplete}>
                  Continue
                </Button>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Back
                  </Button>
                )}
              </div>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">User Provisioning</h2>
                <p className="text-muted-foreground">Add team members and assign their roles.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-3">Current Users ({formData.users.length})</h3>
                  <div className="space-y-2">
                    {formData.users.map((user, i) => (
                      <div key={i} className="p-3 border border-border rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">{user.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-bold mb-3">Add New User</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.newUserName}
                      onChange={(e) => setFormData({ ...formData, newUserName: e.target.value })}
                      className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.newUserEmail}
                      onChange={(e) => setFormData({ ...formData, newUserEmail: e.target.value })}
                      className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                    />
                    <select
                      value={formData.newUserRole}
                      onChange={(e) => setFormData({ ...formData, newUserRole: e.target.value })}
                      className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                    >
                      <option>Admin</option>
                      <option>Analyst</option>
                      <option>User</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                  <Button className="mt-3 bg-accent hover:bg-accent/90" onClick={handleAddUser}>
                    Add User
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-accent hover:bg-accent/90" onClick={handleStepComplete}>
                  Continue
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              </div>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Permission Assignment</h2>
                <p className="text-muted-foreground">Define data access and feature permissions by user role.</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    role: "Admin",
                    perms: ["Full system access", "User management", "Configuration changes", "Data export"],
                  },
                  {
                    role: "Analyst",
                    perms: ["View all studies", "Create studies", "Access API", "Data export"],
                  },
                  {
                    role: "User",
                    perms: ["View own studies", "Create studies", "View map"],
                  },
                  {
                    role: "Viewer",
                    perms: ["View-only access", "Dashboard access"],
                  },
                ].map((rolePerms, i) => (
                  <Card key={i} className="p-4 bg-muted">
                    <h4 className="font-bold mb-3">{rolePerms.role}</h4>
                    <ul className="space-y-2">
                      {rolePerms.perms.map((perm, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle size={16} className="text-green-600" />
                          {perm}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <Button className="bg-accent hover:bg-accent/90" onClick={handleStepComplete}>
                  Continue
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              </div>
            </Card>
          )}

          {currentStep === 4 && (
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Data Integration Setup</h2>
                <p className="text-muted-foreground">
                  Configure connections to data sources and set up automated synchronization.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "GIS Data Feed",
                    status: "Not Connected",
                    icon: "🗺️",
                  },
                  {
                    name: "Traffic Signal Systems",
                    status: "Not Connected",
                    icon: "🚦",
                  },
                  {
                    name: "Rail Authority Data",
                    status: "Not Connected",
                    icon: "🚂",
                  },
                  {
                    name: "Emergency Response Data",
                    status: "Not Connected",
                    icon: "🚨",
                  },
                ].map((source, i) => (
                  <div
                    key={i}
                    className="p-4 border border-border rounded-lg flex items-center justify-between hover:border-accent transition"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{source.icon}</span>
                      <div>
                        <h4 className="font-bold">{source.name}</h4>
                        <p className="text-sm text-muted-foreground">{source.status}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  You can also configure data integrations later in the Admin panel. These are optional and can be set
                  up whenever your organization is ready.
                </p>
              </div>

              <div className="flex gap-3">
                <Button className="bg-accent hover:bg-accent/90" onClick={handleStepComplete}>
                  Complete Setup
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              </div>
            </Card>
          )}

          {completedSteps.length === steps.length && (
            <Card className="p-8 text-center space-y-4 bg-accent/5 border-accent/20">
              <div className="text-6xl">✨</div>
              <h2 className="text-2xl font-bold">Setup Complete!</h2>
              <p className="text-muted-foreground">
                Your TRAINFO system is ready to use. You can now start creating studies and managing your crossing data.
              </p>
              <div className="flex gap-3 justify-center">
                <Button className="bg-accent hover:bg-accent/90" asChild>
                  <Link href="/portal">Go to Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/portal/support">View Help</Link>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
