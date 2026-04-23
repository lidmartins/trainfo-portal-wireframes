"use client"

import PortalLayout from "@/components/portal-layout"
import { Button } from "@/components/ui/button"
import { Search, FileText, Heart, Video, BarChart, Settings, AlertTriangle, Wrench } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { TablePagination } from "@/components/ui/table-pagination"


const PAGE_SIZE = 15

export default function CSESensorsPage() {
  const searchParams = useSearchParams()
  const [sensorType, setSensorType] = useState("trainfo")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "down" | "calibration">("all")
  const [sensorPage, setSensorPage] = useState(1)

  // Check URL for filter param
  useEffect(() => {
    const filter = searchParams.get('filter')
    if (filter === 'down') {
      setStatusFilter('down')
    }
  }, [searchParams])

  // Reset page when filters/tab change
  useEffect(() => { setSensorPage(1) }, [searchTerm, statusFilter, sensorType])

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
    { id: "341", location: "Blanding blvd & 103rd st", customer: "North Florida TPO", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "1 hr ago" },
    { id: "342", location: "Collins rd & oak st", customer: "North Florida TPO", status: "Down", calibration: "Low Power (State -1)", lastBlockage: "2 days ago" },
    { id: "489", location: "Beach blvd @ hodges blvd", customer: "City Of Nashville TN", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "3 hrs ago" },
    { id: "512", location: "University blvd & st johns bluff", customer: "City Of Nashville TN", status: "Active", calibration: "Validating (State 2)", lastBlockage: "20 min ago" },
    { id: "TAS3ACF01", location: "Baymeadows rd @ i-95", customer: "City Of Nashville TN", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "6 hrs ago" },
    { id: "TAS3ACF02", location: "San jose blvd @ old st augustine", customer: "City Of Alabaster AL", status: "Down", calibration: "Calibrating (State 1)", lastBlockage: "4 days ago" },
    { id: "601", location: "Philips hwy @ emerson st", customer: "City Of Alabaster AL", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "55 min ago" },
    { id: "602", location: "Cassat ave & edgewood ave", customer: "City Of Alabaster AL", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "2 hrs ago" },
    { id: "778", location: "Monument rd & atlantic blvd", customer: "County Of Macomb MI", status: "Active", calibration: "Unassigned (State 0)", lastBlockage: "8 hrs ago" },
    { id: "779", location: "Merrill rd & regency sq blvd", customer: "County Of Macomb MI", status: "Down", calibration: "Calibrated (State 3)", lastBlockage: "6 days ago" },
    { id: "830", location: "Normandy blvd &103rd st", customer: "County Of Macomb MI", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "35 min ago" },
    { id: "831", location: "Lenoir ave & main st", customer: "County Of Macomb MI", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "1 hr ago" },
    { id: "TAS4BDE05", location: "Commonwealth ave @ alt 19", customer: "City Of Little Rock AR", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "15 min ago" },
    { id: "TAS4BDE06", location: "Timuquana rd & wilson blvd", customer: "City Of Little Rock AR", status: "Down", calibration: "Calibrating (State 1)", lastBlockage: "9 days ago" },
    { id: "944", location: "103rd st & ramona blvd", customer: "City Of Little Rock AR", status: "Active", calibration: "Validating (State 2)", lastBlockage: "4 hrs ago" },
    { id: "945", location: "Plymouth st & main st n", customer: "City Of Little Rock AR", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "50 min ago" },
    { id: "1023", location: "Dunn ave & i-295 nb ramp", customer: "Florida International University", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "2 hrs ago" },
    { id: "1024", location: "Soutel dr & commonwealth ave", customer: "Florida International University", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "3 hrs ago" },
    { id: "1205", location: "Lane ave & timuquana rd", customer: "North Florida TPO", status: "Down", calibration: "Low Power (State -1)", lastBlockage: "11 days ago" },
    { id: "1206", location: "Argyle forest blvd & bichara blvd", customer: "North Florida TPO", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "25 min ago" },
    { id: "TAS5CEG07", location: "Old middleburg rd & 103rd st", customer: "City Of Nashville TN", status: "Active", calibration: "Calibrated (State 3)", lastBlockage: "7 hrs ago" },
    { id: "TAS5CEG08", location: "Hammond blvd & edgewood ave", customer: "City Of Alabaster AL", status: "Active", calibration: "Unassigned (State 0)", lastBlockage: "1 day ago" },
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
  const sensorTotalPages = Math.max(1, Math.ceil(filteredSensors.length / PAGE_SIZE))
  const pagedSensors = filteredSensors.slice((sensorPage - 1) * PAGE_SIZE, sensorPage * PAGE_SIZE)

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
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {pagedSensors.length} of {filteredSensors.length} sensors
          </p>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm">
                <th className="px-4 py-3 font-semibold">Sensor ID</th>
                <th className="px-4 py-3 font-semibold">Sensor Location</th>
                <th className="px-4 py-3 font-semibold">Customer Name</th>
                <th className="px-4 py-3 font-semibold">Sensor Status</th>
                <th className="px-4 py-3 font-semibold">Calibration Status</th>
                <th className="px-4 py-3 font-semibold">Last Blockage</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedSensors.map((sensor) => (
                <tr key={sensor.id} className={`border-t border-border hover:bg-muted/30 transition ${sensor.status === "Down" ? "bg-red-50" : ""}`}>
                  <td className="px-4 py-3 text-sm font-medium text-accent">{sensor.id}</td>
                  <td className="px-4 py-3 text-sm">{sensor.location}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{sensor.customer}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sensor.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {sensor.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
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
                  <td className="px-4 py-3 text-sm text-muted-foreground">{sensor.lastBlockage}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-accent/10 text-accent"
                        title="Configure Sensor"
                        asChild
                      >
                        <Link href={`/portal/cse/sensors/${sensor.id}/configure`}>
                          <Settings size={16} />
                        </Link>
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
        <TablePagination currentPage={sensorPage} totalPages={sensorTotalPages} onPageChange={setSensorPage} />
      </div>
    </PortalLayout>
  )
}
