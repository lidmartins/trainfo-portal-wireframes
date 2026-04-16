"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, FileText, Heart, Video, BarChart, Settings, AlertTriangle, Wrench } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"


export default function CSESensorsPage() {
  const searchParams = useSearchParams()
  const [sensorType, setSensorType] = useState("trainfo")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "down" | "calibration">("all")
  // Check URL for filter param
  useEffect(() => {
    const filter = searchParams.get('filter')
    if (filter === 'down') {
      setStatusFilter('down')
    }
  }, [searchParams])

  // Calibration Status options:
  // - Unassigned (State 0)
  // - Low Power (State -1)
  // - Calibrating (State 1)
  // - Validating (State 2)
  // - Calibrated (State 3) - Green, end state

  const sensors = [
    {
      id: "622",
      location: "Beaver & chaffee",
      customer: "Florida International University",
      status: "Active",
      calibration: "Calibrated (State 3)",
      lastBlockage: "2 hrs ago",
    },
    {
      id: "495",
      location: "Lane & beaver",
      customer: "Florida International University",
      status: "Active",
      calibration: "Calibrated (State 3)",
      lastBlockage: "5 hrs ago",
    },
    {
      id: "266",
      location: "Beaver & edgewood",
      customer: "Florida International University",
      status: "Down",
      calibration: "Calibrating (State 1)",
      lastBlockage: "3 days ago",
    },
    {
      id: "257",
      location: "Beaver & stockton",
      customer: "Florida International University",
      status: "Active",
      calibration: "Validating (State 2)",
      lastBlockage: "1 hr ago",
    },
    {
      id: "256",
      location: "Beaver & king/canal",
      customer: "Florida International University",
      status: "Down",
      calibration: "Low Power (State -1)",
      lastBlockage: "5 days ago",
    },
    {
      id: "2060",
      location: "Us 441 / nw 13th st @ nw 53rd ave",
      customer: "Florida International University",
      status: "Active",
      calibration: "Unassigned (State 0)",
      lastBlockage: "30 min ago",
    },
    {
      id: "280",
      location: "Sr 26 @ us 301 (orange heights)",
      customer: "Florida International University",
      status: "Active",
      calibration: "Calibrated (State 3)",
      lastBlockage: "4 hrs ago",
    },
    {
      id: "255",
      location: "Mcduff & beaver",
      customer: "Florida International University",
      status: "Down",
      calibration: "Calibrated (State 3)",
      lastBlockage: "7 days ago",
    },
    {
      id: "1150",
      location: "Us 441 @ nw 34th blvd",
      customer: "Florida International University",
      status: "Active",
      calibration: "Calibrated (State 3)",
      lastBlockage: "12 hrs ago",
    },
    {
      id: "TAS2BCE03",
      location: "Heckscher dr",
      customer: "Florida International University",
      status: "Active",
      calibration: "Calibrated (State 3)",
      lastBlockage: "45 min ago",
    },
  ]

  const filteredSensors = sensors.filter((sensor) => {
    const matchesSearch = 
      sensor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.customer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "active" && sensor.status === "Active") ||
      (statusFilter === "down" && sensor.status === "Down") ||
      (statusFilter === "calibration" && !sensor.calibration.includes("Calibrated (State 3)"))
    
    return matchesSearch && matchesStatus
  })

  const downCount = sensors.filter(s => s.status === "Down").length
  const calibrationCount = sensors.filter(s => !s.calibration.includes("Calibrated (State 3)")).length

  return (
    <PortalLayout
      role="cse"
      title="Sensors"
      subtitle="Manage all TRAINFO and Bluetooth sensors"
      activeHref="/portal/cse/sensors"
    >
      <div className="p-6 space-y-6">
        {/* Stats & Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Sensors</p>
              <p className="text-2xl font-bold">{sensors.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600">{sensors.length - downCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Down</p>
              <p className="text-2xl font-bold text-red-600">{downCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Needs Calibration</p>
              <p className="text-2xl font-bold text-orange-600">{calibrationCount}</p>
            </div>
          </div>

          </div>

        {/* Action Item Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setStatusFilter(statusFilter === "down" ? "all" : "down")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              statusFilter === "down" 
                ? "border-red-500 bg-red-50 text-red-700" 
                : "border-border bg-background hover:border-red-300"
            }`}
          >
            <AlertTriangle size={18} className="text-red-500" />
            <span className="font-medium">Down Sensors</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700 font-medium">
              {downCount}
            </span>
          </button>
          <button
            onClick={() => setStatusFilter(statusFilter === "calibration" ? "all" : "calibration")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              statusFilter === "calibration" 
                ? "border-orange-500 bg-orange-50 text-orange-700" 
                : "border-border bg-background hover:border-orange-300"
            }`}
          >
            <Wrench size={18} className="text-orange-500" />
            <span className="font-medium">Calibration Needed</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700 font-medium">
              {calibrationCount}
            </span>
          </button>
          {statusFilter !== "all" && (
            <button
              onClick={() => setStatusFilter("all")}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Sensor Type Tabs & Search */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSensorType("trainfo")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                sensorType === "trainfo" ? "bg-accent text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Trainfo Sensors
            </button>
            <button
              onClick={() => setSensorType("bluetooth")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                sensorType === "bluetooth" ? "bg-accent text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Bluetooth Sensors
            </button>
            <Link href="/portal/cse/bells">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent">
                Manage Bells
              </Button>
            </Link>
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "down" | "calibration")}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="down">Down Only</option>
              <option value="calibration">Needs Calibration</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search sensors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent w-64"
              />
            </div>
          </div>
        </div>

        {/* Sensor Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSensors.length} of {sensors.length} sensors
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="pb-3 font-bold text-sm">Sensor ID</th>
                  <th className="pb-3 font-bold text-sm">Sensor Location</th>
                  <th className="pb-3 font-bold text-sm">Customer Name</th>
                  <th className="pb-3 font-bold text-sm">Sensor Status</th>
                  <th className="pb-3 font-bold text-sm">Calibration Status</th>
                  <th className="pb-3 font-bold text-sm">Last Blockage</th>
                  <th className="pb-3 font-bold text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSensors.map((sensor) => (
                  <tr key={sensor.id} className={`border-b border-border hover:bg-muted/50 transition ${sensor.status === "Down" ? "bg-red-50" : ""}`}>
                    <td className="py-4 font-medium text-accent">{sensor.id}</td>
                    <td className="py-4">{sensor.location}</td>
                    <td className="py-4 text-muted-foreground">{sensor.customer}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        sensor.status === "Active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {sensor.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        sensor.calibration.includes("Calibrated (State 3)") 
                          ? "bg-green-100 text-green-700" 
                          : sensor.calibration.includes("Validating")
                          ? "bg-blue-100 text-blue-700"
                          : sensor.calibration.includes("Calibrating")
                          ? "bg-yellow-100 text-yellow-700"
                          : sensor.calibration.includes("Low Power")
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {sensor.calibration}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{sensor.lastBlockage}</td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-accent/10 text-accent"
                          title="Configure Sensor"
                        >
                          <Settings size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-accent/10"
                          title="Files & Downloads"
                          asChild
                        >
                          <Link href={`/sensors/${sensor.id}/files`}>
                            <FileText size={16} />
                          </Link>
                        </Button>
<Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-accent/10"
                          title="Heartbeat History"
                          asChild
                        >
                          <Link href={`/sensors/${sensor.id}/heartbeat`}>
                            <Heart size={16} />
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-accent/10" title="Video">
                          <Video size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-accent/10" title="Analytics">
                          <BarChart size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredSensors.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No sensors found matching your filters.</div>
          )}
        </Card>
      </div>
    </PortalLayout>
  )
}
