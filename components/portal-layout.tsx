"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  MapPin,
  FileText,
  Clock,
  Database,
  Settings,
  HelpCircle,
  Users,
  Cpu,
  TrendingUp,
} from "lucide-react"
import { useState, useEffect } from "react"

interface PortalLayoutProps {
  role:
    | "customer-admin"
    | "customer-general"
    | "consulting-admin"
    | "consulting-general"
    | "cse"
    | "account-manager"
    | "bdm-sdr"
  title: string
  subtitle?: string
  children: React.ReactNode
  activeHref?: string
  /** Return false to cancel navigation (e.g. unsaved-changes guard). */
  onBeforeNavigate?: (href: string) => boolean
}

const navigationByRole = {
  "customer-admin": [
    { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/customer-admin" },
    { icon: Users, label: "Agents", href: "/portal/agents" },
    { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
    { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
    { icon: Database, label: "Data & API", href: "/portal/data" },
    { icon: Settings, label: "Admin", href: "/portal/admin" },
    { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
  ],
  "customer-general": [
    { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/customer-general" },
    { icon: Users, label: "Agents", href: "/portal/agents" },
    { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
    { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
    { icon: Database, label: "Data & API", href: "/portal/data" },
    { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
  ],
  "consulting-admin": [
    { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/consulting-admin" },
    { icon: Users, label: "Agents", href: "/portal/agents" },
    { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
    { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
    { icon: Database, label: "Data & API", href: "/portal/data" },
    { icon: Settings, label: "Admin", href: "/portal/admin" },
    { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
  ],
  "consulting-general": [
    { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/consulting-general" },
    { icon: Users, label: "Agents", href: "/portal/agents" },
    { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
    { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
    { icon: Database, label: "Data & API", href: "/portal/data" },
    { icon: Settings, label: "Admin", href: "/portal/admin" },
    { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
  ],
  cse: [
    { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/cse-superuser" },
    { icon: Users, label: "Customers", href: "/portal/cse/customers" },
    { icon: MapPin, label: "Deployment Map", href: "/portal/cse/deployment-map" },
    { icon: Cpu, label: "Sensors", href: "/portal/cse/sensors" },
    { icon: TrendingUp, label: "System Reports", href: "/portal/reports" },
    { icon: Database, label: "Data & API", href: "/portal/data" },
    { icon: Settings, label: "Admin", href: "/portal/admin" },
    { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
  ],
  "account-manager": [
    { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/account-manager" },
    { icon: Users, label: "Customers", href: "/portal/account-manager/customers" },
    { icon: Users, label: "Agents", href: "/portal/agents" },
    { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
    { icon: TrendingUp, label: "System Reports", href: "/portal/reports" },
    { icon: Database, label: "Data & API", href: "/portal/data" },
    { icon: Settings, label: "Admin", href: "/portal/admin" },
    { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
  ],
  "bdm-sdr": [
    { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/bdm-sdr" },
    { icon: Users, label: "Leads", href: "/portal/leads" },
    { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
  ],
}

export default function PortalLayout({ role, title, subtitle, children, activeHref, onBeforeNavigate }: PortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean | null>(null)
  const sidebarItems = navigationByRole[role]

  useEffect(() => {
    const stored = localStorage.getItem("sidebarOpen")
    setSidebarOpen(stored === null ? true : stored === "true")
  }, [])

  // Don't render sidebar until localStorage is read to avoid hydration flash
  if (sidebarOpen === null) return null

  function toggleSidebar() {
    const next = !sidebarOpen
    setSidebarOpen(next)
    localStorage.setItem("sidebarOpen", String(next))
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} shrink-0 bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-hidden`}
      >
        {/* Header */}
        {sidebarOpen ? (
          <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="TRAINFO"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
            <button
              onClick={toggleSidebar}
              className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-75 transition flex-shrink-0 ml-2"
            >
              <ChevronLeft size={14} />
            </button>
          </div>
        ) : (
          <div className="border-b border-sidebar-border flex flex-col items-center justify-center py-3 gap-2 flex-shrink-0">
            {/* Show only the icon portion of logo.png by clipping the image */}
            <div className="w-8 h-8 overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="TRAINFO"
                style={{ height: "32px", width: "auto", maxWidth: "none" }}
              />
            </div>
            <button
              onClick={toggleSidebar}
              className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-75 transition flex-shrink-0"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {sidebarItems.map((item, i) => {
            const IconComponent = item.icon
            const isActive = activeHref === item.href
            return (
              <Link
                key={i}
                href={item.href}
                title={!sidebarOpen ? item.label : undefined}
                onClick={(e) => {
                  if (onBeforeNavigate && !onBeforeNavigate(item.href)) {
                    e.preventDefault()
                  }
                }}
                className={`flex items-center gap-3 px-3 py-2 mb-1 rounded-lg transition ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <IconComponent size={20} className="shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-sidebar-border p-4">
          <Link
            href="/"
            title={!sidebarOpen ? "Logout" : undefined}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent w-full transition"
          >
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar — sticky so it never scrolls away */}
        <div className="sticky top-0 z-10 h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}
