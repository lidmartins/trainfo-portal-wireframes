"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle, Shield, Settings, BarChart3, Briefcase, Users, Wrench } from "lucide-react"

const roles = [
  {
    id: "customer-general",
    name: "Customer General",
    description: "Users with public agencies with no admin privileges",
    icon: UserCircle,
    href: "/portal/dashboards/customer-general",
    color: "bg-blue-500",
  },
  {
    id: "customer-admin",
    name: "Customer Admin",
    description: "Administrator for public agencies who have deployed TRAINFO",
    icon: Settings,
    href: "/portal/dashboards/customer-admin",
    color: "bg-purple-500",
  },
  {
    id: "consulting-general",
    name: "Consulting Partner General",
    description: "Engineering consultants who use TRAINFO data and models",
    icon: Users,
    href: "/portal/dashboards/consulting-general",
    color: "bg-teal-500",
  },
  {
    id: "consulting-admin",
    name: "Consulting Partner Admin",
    description: "Engineering consultants with admin access for studies and data",
    icon: Wrench,
    href: "/portal/dashboards/consulting-admin",
    color: "bg-cyan-500",
  },
  {
    id: "cse-superuser",
    name: "CSE / Superuser",
    description: "Superuser who administrates the entire system",
    icon: Shield,
    href: "/portal/dashboards/cse-superuser",
    color: "bg-red-500",
  },
  {
    id: "account-manager",
    name: "Account Manager",
    description: "Power users with privileged access to all user groups",
    icon: BarChart3,
    href: "/portal/dashboards/account-manager",
    color: "bg-green-500",
  },
  {
    id: "bdm-sdr",
    name: "BDM / SDR",
    description: "Sales and business development team members",
    icon: Briefcase,
    href: "/portal/dashboards/bdm-sdr",
    color: "bg-orange-500",
  },
]

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">TI</span>
            </div>
            <span className="font-bold text-lg">TRAINFO</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Select Your Role</h1>
            <p className="text-muted-foreground text-lg">
              Choose the role that matches your access level to view the appropriate dashboard
            </p>
          </div>

          {/* Role Selection Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Link key={role.id} href={role.href}>
                <Card className="p-6 hover:shadow-lg transition-all hover:border-accent cursor-pointer h-full">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center`}>
                      <role.icon size={24} className="text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Access Dashboard
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Info Note */}
          <Card className="p-6 bg-muted/50 border-accent/20">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-accent" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold">Wireframe Demo Mode</h4>
                <p className="text-sm text-muted-foreground">
                  In production, users will login with credentials and be automatically directed to their role-specific
                  dashboard. This role selection is for wireframe demonstration purposes only.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
