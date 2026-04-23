"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Download, RefreshCw, Volume2, Film, FileCode, ChevronRight } from "lucide-react"
import { useState } from "react"
import { TablePagination } from "@/components/ui/table-pagination"
import { useParams, useRouter } from "next/navigation"

// ─── Data helpers (moved as-is from sensors page) ────────────────────────────

const generateMockFiles = (sensorId: string, type: "logs" | "video" | "audio") => {
  const baseDate = new Date("2026-03-02")
  const files = []
  const count = type === "logs" ? 23 : type === "video" ? 16 : 13
  const ext = type === "logs" ? "zip" : type === "video" ? "mp4" : "wav"
  const sizeRange = type === "logs" ? [15, 40] : type === "video" ? [50, 200] : [5, 25]

  for (let i = 0; i < count; i++) {
    const date = new Date(baseDate)
    date.setMinutes(date.getMinutes() - i * 47)
    const hours = date.getHours().toString().padStart(2, "0")
    const mins = date.getMinutes().toString().padStart(2, "0")
    const secs = Math.floor(Math.random() * 60).toString().padStart(2, "0")

    files.push({
      id: `${sensorId}-${type}-${i}`,
      name: `${sensorId}${date.toISOString().split("T")[0].replace(/-/g, "")}_${hours}_${mins}_${secs}.${ext}`,
      size: (Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]).toFixed(2),
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: `${hours}:${mins}:${secs}`,
    })
  }
  return files
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

// ─── Page ────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 15

export default function SensorFilesPage() {
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

  const [fileType, setFileType] = useState<"logs" | "video" | "audio">("logs")
  const [fileSearchTerm, setFileSearchTerm] = useState("")
  const [logsPage, setLogsPage] = useState(1)
  const [videoPage, setVideoPage] = useState(1)
  const [audioPage, setAudioPage] = useState(1)

  const currentPage = fileType === "logs" ? logsPage : fileType === "video" ? videoPage : audioPage
  const setCurrentPage = fileType === "logs" ? setLogsPage : fileType === "video" ? setVideoPage : setAudioPage

  const currentFiles = generateMockFiles(sensorId, fileType)
  const filteredFiles = currentFiles.filter((f) =>
    f.name.toLowerCase().includes(fileSearchTerm.toLowerCase())
  )
  const filesTotalPages = Math.max(1, Math.ceil(filteredFiles.length / PAGE_SIZE))
  const pagedFiles = filteredFiles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const tabs: { id: "logs" | "video" | "audio"; label: string; Icon: typeof FileCode }[] = [
    { id: "logs",  label: "Logs",  Icon: FileCode },
    { id: "video", label: "Video", Icon: Film     },
    { id: "audio", label: "Audio", Icon: Volume2  },
  ]

  return (
    <PortalLayout
      role="cse"
      title="Sensor Files"
      subtitle={`Sensor ID — ${sensorId} | ${sensor.location}`}
      activeHref="/portal/cse/sensors"
    >
      {/* ── Sticky page header: breadcrumb + title + tab bar ── */}
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
            <span className="text-foreground font-medium">Files</span>
          </nav>

        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="p-6 space-y-4">

        {/* Sensor info bar */}
        <div className="grid grid-cols-5 gap-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
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
                : "bg-red-100 text-red-700"
            }`}>
              {sensor.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Calibration Status</p>
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
            <p className="text-xs text-muted-foreground mb-1">Last Blockage</p>
            <p className="font-semibold text-sm">{sensor.lastBlockage}</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setFileType(id); setFileSearchTerm(""); setLogsPage(1); setVideoPage(1); setAudioPage(1) }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                fileType === id
                  ? "bg-accent text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Search + total count */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search files..."
              value={fileSearchTerm}
              onChange={(e) => { setFileSearchTerm(e.target.value); setCurrentPage(1) }}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            <span>Total: <span className="font-semibold text-foreground">{filteredFiles.length}</span></span>
            <button className="p-2 hover:bg-muted rounded-lg transition" title="Refresh">
              <RefreshCw size={16} className="text-accent" />
            </button>
          </div>
        </div>

        {/* File table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm">
                <th className="px-4 py-3 font-semibold text-sm">Name</th>
                <th className="px-4 py-3 font-semibold text-sm text-right">Size</th>
                <th className="px-4 py-3 font-semibold text-sm">Date</th>
                <th className="px-4 py-3 font-semibold text-sm">Time</th>
                <th className="px-4 py-3 font-semibold text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedFiles.map((file) => (
                <tr
                  key={file.id}
                  className="border-t border-border hover:bg-muted/30 transition"
                >
                  <td className="px-4 py-3 text-sm">
                    <span className="font-mono text-accent cursor-pointer hover:underline">
                      {file.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-muted-foreground">
                    {file.size} KB
                  </td>
                  <td className="px-4 py-3 text-sm">{file.date}</td>
                  <td className="px-4 py-3 text-sm font-mono">{file.time}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-accent/10 text-accent"
                        title="Download file"
                      >
                        <Download size={16} />
                      </Button>
                      {fileType === "audio" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-accent/10 text-accent"
                          title="Play audio"
                        >
                          <Volume2 size={16} />
                        </Button>
                      )}
                      {fileType === "video" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-accent/10 text-accent"
                          title="Play video"
                        >
                          <Film size={16} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFiles.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No {fileType} files found.
            </div>
          )}
          <TablePagination currentPage={currentPage} totalPages={filesTotalPages} onPageChange={setCurrentPage} />
        </div>

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
