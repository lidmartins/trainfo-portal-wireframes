"use client"

import PortalLayout from "@/components/portal-layout"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

// ─── Data helpers ─────────────────────────────────────────────────────────────

const generateMockHeartbeats = (sensorId: string) => {
  const baseDate = new Date("2026-04-13T09:30:00")
  const heartbeats = []

  for (let i = 0; i < 200; i++) {
    const date = new Date(baseDate)
    date.setMinutes(date.getMinutes() - i * 22)

    heartbeats.push({
      id: `${sensorId}-hb-${i}`,
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toTimeString().slice(0, 8),
      voltage: (13.70 + Math.random() * 0.1).toFixed(2),
      cpuUsage: (13.5 + Math.random() * 1).toFixed(1),
      ramUsage: (10.4 + Math.random() * 0.3).toFixed(1),
      diskUsage: (93.0 + Math.random() * 0.5).toFixed(1),
    })
  }
  return heartbeats
}

const sensors = [
  { id: "622",       location: "Beaver & chaffee",                    customer: "Florida International University", status: "Active", calibration: "Calibrated (State 3)",     lastBlockage: "2 hrs ago"  },
  { id: "495",       location: "Lane & beaver",                        customer: "Florida International University", status: "Active", calibration: "Calibrated (State 3)",     lastBlockage: "5 hrs ago"  },
  { id: "266",       location: "Beaver & edgewood",                    customer: "Florida International University", status: "Down",   calibration: "Calibrating (State 1)",    lastBlockage: "3 days ago" },
  { id: "257",       location: "Beaver & stockton",                    customer: "Florida International University", status: "Active", calibration: "Validating (State 2)",     lastBlockage: "1 hr ago"   },
  { id: "256",       location: "Beaver & king/canal",                  customer: "Florida International University", status: "Down",   calibration: "Low Power (State -1)",     lastBlockage: "5 days ago" },
  { id: "2060",      location: "Us 441 / nw 13th st @ nw 53rd ave",   customer: "Florida International University", status: "Active", calibration: "Unassigned (State 0)",     lastBlockage: "30 min ago" },
  { id: "280",       location: "Sr 26 @ us 301 (orange heights)",      customer: "Florida International University", status: "Active", calibration: "Calibrated (State 3)",     lastBlockage: "4 hrs ago"  },
  { id: "255",       location: "Mcduff & beaver",                      customer: "Florida International University", status: "Down",   calibration: "Calibrated (State 3)",     lastBlockage: "7 days ago" },
  { id: "1150",      location: "Us 441 @ nw 34th blvd",               customer: "Florida International University", status: "Active", calibration: "Calibrated (State 3)",     lastBlockage: "12 hrs ago" },
  { id: "TAS2BCE03", location: "Heckscher dr",                         customer: "Florida International University", status: "Active", calibration: "Calibrated (State 3)",     lastBlockage: "45 min ago" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50

export default function SensorHeartbeatPage() {
  const params = useParams()
  const router = useRouter()
  const sensorId = params.sensorId as string

  const sensor = sensors.find((s) => s.id === sensorId) ?? {
    id: sensorId,
    location: "Unknown Location",
    customer: "Unknown",
    status: "Unknown",
    calibration: "Unassigned (State 0)",
    lastBlockage: "N/A",
  }

  const allHeartbeats = generateMockHeartbeats(sensorId)

  const [searchTerm, setSearchTerm] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredHeartbeats = allHeartbeats.filter((hb) => {
    const matchesSearch =
      hb.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hb.time.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredHeartbeats.length / PAGE_SIZE)
  const paginatedHeartbeats = filteredHeartbeats.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <PortalLayout
      role="cse"
      title="Heartbeat History"
      subtitle={`Sensor ID — ${sensorId} | ${sensor.location}`}
      activeHref="/portal/cse/sensors"
    >
      {/* ── Sticky page header: breadcrumb + title ── */}
      <div className="sticky top-16 z-10 bg-background border-b border-border">
        <div className="px-6 pt-4 pb-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <button
              className="hover:text-foreground transition"
              onClick={() => router.push("/portal/cse/sensors")}
            >
              Sensors
            </button>
            <ChevronRight size={14} />
            <span>{sensorId}</span>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">Heartbeat History</span>
          </nav>

        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="p-6 space-y-4">

        {/* Sensor info bar — 6 cols */}
        <div className="grid grid-cols-6 gap-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sensor ID</p>
            <p className="font-semibold text-sm">{sensor.id}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Location</p>
            <p className="font-semibold text-sm truncate">{sensor.location}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              sensor.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {sensor.status === "Active" ? "Active" : "Warned"}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Calibration</p>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
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
              {sensor.calibration.split(" (")[0]}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">IP Address</p>
            <p className="font-semibold text-sm font-mono">192.168.1.{sensor.id.slice(-2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Camera Module</p>
            <p className="font-semibold text-sm">Yes</p>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Total + refresh */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            <span>Total: <span className="font-semibold text-foreground">{filteredHeartbeats.length}</span></span>
            <button className="p-2 hover:bg-muted rounded-lg transition" title="Refresh">
              <RefreshCw size={16} className="text-accent" />
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search by date or time..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
            />
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2 shrink-0">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => { setFromDate(e.target.value); setCurrentPage(1) }}
                className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => { setToDate(e.target.value); setCurrentPage(1) }}
                className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Heartbeat table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr className="text-left text-sm">
                <th className="px-4 py-3 font-semibold text-accent">Date</th>
                <th className="px-4 py-3 font-semibold text-accent">Time</th>
                <th className="px-4 py-3 font-semibold text-accent text-center">Voltage (V)</th>
                <th className="px-4 py-3 font-semibold text-accent text-center">CPU Usage (%)</th>
                <th className="px-4 py-3 font-semibold text-accent text-center">RAM Usage (%)</th>
                <th className="px-4 py-3 font-semibold text-accent text-center">Disk Usage (%)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHeartbeats.map((hb, index) => (
                <tr
                  key={hb.id}
                  className={`border-t border-border hover:bg-muted/30 transition ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  }`}
                >
                  <td className="px-4 py-3 text-sm">{hb.date}</td>
                  <td className="px-4 py-3 text-sm font-mono">{hb.time}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="text-green-600 font-medium">{hb.voltage}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="text-blue-600 font-medium">{hb.cpuUsage}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="text-purple-600 font-medium">{hb.ramUsage}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className={`font-medium ${parseFloat(hb.diskUsage) > 93 ? "text-amber-600" : "text-gray-600"}`}>
                      {hb.diskUsage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredHeartbeats.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No heartbeat records found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} &middot; showing {paginatedHeartbeats.length} of {filteredHeartbeats.length} records
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

      </div>

      {/* ── Sticky bottom action bar ── */}
      <div className="sticky bottom-0 z-10 bg-background border-t border-border px-6 py-4">
        <Button variant="outline" onClick={() => router.push("/portal/cse/sensors")}>
          ← Back to Sensors
        </Button>
      </div>

    </PortalLayout>
  )
}
