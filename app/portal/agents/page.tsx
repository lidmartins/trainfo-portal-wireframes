"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, BarChart3, Users, FileText, Database, Settings, HelpCircle, LogOut, Clock, Bot, Sparkles, MessageSquare, Brain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/portal/dashboards/customer-general" },
  { icon: Users, label: "Agents", href: "/portal/agents", active: true },
  { icon: FileText, label: "Planning Studies", href: "/portal/studies" },
  { icon: Clock, label: "Signal Timing", href: "/portal/timing" },
  { icon: Database, label: "Data & API", href: "/portal/data" },
  { icon: HelpCircle, label: "Help & Support", href: "/portal/support" },
]

export default function AgentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agents = [
    {
      id: "safety",
      name: "Safety Agent",
      icon: Bot,
      description: "Identify high-risk crossings and prioritize safety improvements using real-world data.",
      capabilities: ["Safety Scoring", "Incident History", "Accident Prediction", "Traffic Exposure"],
      status: "Available",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "economic",
      name: "Economic Agent",
      icon: Zap,
      description: "Measure delay and cost impacts to build strong cases for funding and investment.",
      capabilities: ["Delay Costs", "Travel Time Impact", "Freight Efficiency", "Benefit-Cost Analysis"],
      status: "Coming soon",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "environmental",
      name: "Environmental Agent",
      icon: Brain,
      description: "Understand environmental impacts and risks to support more sustainable decisions.",
      capabilities: ["Emissions Impact", "Idle Time Pollution", "Spill Risk", "Waterway Exposure"],
      status: "Coming soon",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "community",
      name: "Community Agent",
      icon: Sparkles,
      description: "Evaluate how crossings affect people, responders, and communities to improve livability.",
      capabilities: ["Emergency Access", "Responder Delays", "Population Exposure", "Equity Impact"],
      status: "Coming soon",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
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
            <span className="font-bold">TRAINFO</span>
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
              className={`flex items-center gap-3 px-3 py-2 mb-1 rounded-lg transition ${
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
          <div>
            <h1 className="text-xl font-bold">AI Agents</h1>
            <p className="text-sm text-muted-foreground">Interact with intelligent assistants for your crossing data</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Agents Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedAgent === agent.id ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${agent.bgColor} rounded-lg flex items-center justify-center`}>
                    <agent.icon size={24} className={agent.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{agent.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        agent.status === "Available" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map((cap, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Chat Interface */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare size={20} className="text-accent" />
              <h3 className="font-bold">Ask an Agent</h3>
              {selectedAgent && (
                <span className="text-sm text-muted-foreground">
                  - Chatting with {agents.find(a => a.id === selectedAgent)?.name}
                </span>
              )}
            </div>
            
            <div className="bg-muted/50 rounded-lg p-8 mb-4 min-h-48 flex items-center justify-center border border-border">
              <div className="text-center">
                <Bot size={32} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {selectedAgent 
                    ? "Start a conversation with your selected agent"
                    : "Select an agent above to start chatting"
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder={selectedAgent ? "Ask a question..." : "Select an agent first"}
                disabled={!selectedAgent}
                className="flex-1 border border-border rounded-lg px-4 py-2 bg-background disabled:opacity-50"
              />
              <Button disabled={!selectedAgent} className="bg-accent hover:bg-accent/90">
                Send
              </Button>
            </div>
          </Card>

          {/* Quick Questions */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Suggested Questions</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "What are the highest risk crossings this month?",
                "Show me congestion patterns for peak hours",
                "Which crossings have the longest average delays?",
                "Analyze responder impact at downtown crossings",
                "Compare before/after metrics for Main St crossing",
                "What safety improvements are recommended?",
              ].map((question, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 bg-transparent"
                  disabled={!selectedAgent}
                >
                  <MessageSquare size={16} className="mr-2 shrink-0" />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
