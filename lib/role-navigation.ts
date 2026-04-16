export type UserRole =
  | "customer-admin"
  | "customer-general"
  | "consulting-admin"
  | "consulting-general"
  | "cse"
  | "account-manager"
  | "bdm-sdr"

export interface NavigationItem {
  icon: string
  label: string
  href: string
}

export const roleNavigationMap: Record<UserRole, NavigationItem[]> = {
  "customer-admin": [
    { icon: "BarChart3", label: "Dashboard", href: "/portal/dashboards/customer-admin" },
    { icon: "Users", label: "Agents", href: "/portal/agents" },
    { icon: "FileText", label: "Studies & Planning", href: "/portal/studies" },
    { icon: "Clock", label: "Signal Timing", href: "/portal/timing" },
    { icon: "Database", label: "Data & API", href: "/portal/data" },
    { icon: "Settings", label: "Admin", href: "/portal/admin" },
    { icon: "HelpCircle", label: "Help & Support", href: "/portal/support" },
  ],
  "customer-general": [
    { icon: "BarChart3", label: "Dashboard", href: "/portal/dashboards/customer-general" },
    { icon: "Users", label: "Agents", href: "/portal/agents" },
    { icon: "FileText", label: "Studies & Planning", href: "/portal/studies" },
    { icon: "Clock", label: "Signal Timing", href: "/portal/timing" },
    { icon: "Database", label: "Data & API", href: "/portal/data" },
    { icon: "HelpCircle", label: "Help & Support", href: "/portal/support" },
  ],
  "consulting-admin": [
    { icon: "BarChart3", label: "Dashboard", href: "/portal/dashboards/consulting-admin" },
    { icon: "Users", label: "Agents", href: "/portal/agents" },
    { icon: "FileText", label: "Studies & Planning", href: "/portal/studies" },
    { icon: "Clock", label: "Signal Timing", href: "/portal/timing" },
    { icon: "Database", label: "Data & API", href: "/portal/data" },
    { icon: "Settings", label: "Admin", href: "/portal/admin" },
    { icon: "HelpCircle", label: "Help & Support", href: "/portal/support" },
  ],
  "consulting-general": [
    { icon: "BarChart3", label: "Dashboard", href: "/portal/dashboards/consulting-general" },
    { icon: "Users", label: "Agents", href: "/portal/agents" },
    { icon: "FileText", label: "Studies & Planning", href: "/portal/studies" },
    { icon: "Clock", label: "Signal Timing", href: "/portal/timing" },
    { icon: "Database", label: "Data & API", href: "/portal/data" },
    { icon: "HelpCircle", label: "Help & Support", href: "/portal/support" },
  ],
  cse: [
    { icon: "BarChart3", label: "Dashboard", href: "/portal/dashboards/cse-superuser" },
    { icon: "Users", label: "Agents", href: "/portal/agents" },
    { icon: "FileText", label: "Studies & Planning", href: "/portal/studies" },
    { icon: "Clock", label: "Signal Timing", href: "/portal/timing" },
    { icon: "Database", label: "Data & API", href: "/portal/data" },
    { icon: "Settings", label: "Admin", href: "/portal/admin" },
    { icon: "BookOpen", label: "Onboarding", href: "/portal/onboarding" },
    { icon: "HelpCircle", label: "Help & Support", href: "/portal/support" },
  ],
  "account-manager": [
    { icon: "BarChart3", label: "Dashboard", href: "/portal/dashboards/account-manager" },
    { icon: "Users", label: "Agents", href: "/portal/agents" },
    { icon: "FileText", label: "Studies & Planning", href: "/portal/studies" },
    { icon: "Database", label: "Data & API", href: "/portal/data" },
    { icon: "Settings", label: "Admin", href: "/portal/admin" },
    { icon: "HelpCircle", label: "Help & Support", href: "/portal/support" },
  ],
  "bdm-sdr": [
    { icon: "BarChart3", label: "Dashboard", href: "/portal/dashboards/bdm-sdr" },
    { icon: "Users", label: "Leads", href: "/portal/leads" },
    { icon: "HelpCircle", label: "Help & Support", href: "/portal/support" },
  ],
}

export const roleDisplayNames: Record<UserRole, string> = {
  "customer-admin": "Customer Admin",
  "customer-general": "Customer General",
  "consulting-admin": "Consulting Partner Admin",
  "consulting-general": "Consulting Partner General",
  cse: "Customer Support Engineer",
  "account-manager": "Account Manager",
  "bdm-sdr": "BDM / SDR",
}

export const roleDescriptions: Record<UserRole, string> = {
  "customer-admin": "Administrator for public agencies who have deployed TRAINFO",
  "customer-general": "Users with public agencies with no admin privileges",
  "consulting-admin": "Engineering consultants with admin access for studies and data",
  "consulting-general": "Engineering consultants who use TRAINFO data and models",
  cse: "Superuser who administrates the entire system",
  "account-manager": "Power users with privileged access to all user groups",
  "bdm-sdr": "Sales and business development team members",
}
