"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus, X, ThumbsUp, Trash2, AlertTriangle } from "lucide-react"
import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { TablePagination } from "@/components/ui/table-pagination"

const BELL_MODAL_PAGE_SIZE = 6

function calibStateNum(cal: string): number {
  if (cal.includes("State 3")) return 3
  if (cal.includes("State 2")) return 2
  if (cal.includes("State 1")) return 1
  if (cal.includes("State 0")) return 0
  if (cal.includes("State -1")) return -1
  return 0
}

const sensorDataMap: Record<string, {
  location: string
  ipAddress: string
  deviceType: string
  status: string
  calibration: string
  powerType: string
  simCardId: string
  simCardProvider: string
  cameraModule: string
  manufacturer: string
  warrantyStart: string
  warrantyEnd: string
}> = {
  "622":       { location: "Beaver & Chaffee",                    ipAddress: "192.168.1.22",  deviceType: "TRAINFO-T3",  status: "Active", calibration: "Calibrated (State 3)",   powerType: "Direct Power", simCardId: "89014103211118510720", simCardProvider: "Rogers",  cameraModule: "Yes", manufacturer: "TRAINFO Inc.", warrantyStart: "2022-06-01", warrantyEnd: "2025-06-01" },
  "495":       { location: "Lane & Beaver",                       ipAddress: "192.168.1.95",  deviceType: "TRAINFO-T3",  status: "Active", calibration: "Calibrated (State 3)",   powerType: "Solar",        simCardId: "89014103211118510721", simCardProvider: "Telus",   cameraModule: "No",  manufacturer: "TRAINFO Inc.", warrantyStart: "2022-08-15", warrantyEnd: "2025-08-15" },
  "266":       { location: "Beaver & Edgewood",                   ipAddress: "192.168.1.66",  deviceType: "TRAINFO-T2",  status: "Down",   calibration: "Calibrating (State 1)",  powerType: "Direct Power", simCardId: "89014103211118510722", simCardProvider: "Bell",    cameraModule: "No",  manufacturer: "TRAINFO Inc.", warrantyStart: "2021-03-10", warrantyEnd: "2024-03-10" },
  "257":       { location: "Beaver & Stockton",                   ipAddress: "192.168.1.57",  deviceType: "TRAINFO-T3",  status: "Active", calibration: "Validating (State 2)",   powerType: "Solar",        simCardId: "89014103211118510723", simCardProvider: "Rogers",  cameraModule: "Yes", manufacturer: "TRAINFO Inc.", warrantyStart: "2023-01-20", warrantyEnd: "2026-01-20" },
  "256":       { location: "Beaver & King/Canal",                 ipAddress: "192.168.1.56",  deviceType: "TRAINFO-T2",  status: "Down",   calibration: "Low Power (State -1)",   powerType: "Solar",        simCardId: "89014103211118510724", simCardProvider: "Telus",   cameraModule: "No",  manufacturer: "TRAINFO Inc.", warrantyStart: "2020-11-05", warrantyEnd: "2023-11-05" },
  "2060":      { location: "US 441 / NW 13th St @ NW 53rd Ave",  ipAddress: "192.168.2.60",  deviceType: "TRAINFO-T3",  status: "Active", calibration: "Unassigned (State 0)",   powerType: "Direct Power", simCardId: "89014103211118510725", simCardProvider: "AT&T",    cameraModule: "No",  manufacturer: "TRAINFO Inc.", warrantyStart: "2023-07-01", warrantyEnd: "2026-07-01" },
  "280":       { location: "SR 26 @ US 301 (Orange Heights)",     ipAddress: "192.168.1.80",  deviceType: "TRAINFO-T3",  status: "Active", calibration: "Calibrated (State 3)",   powerType: "Solar",        simCardId: "89014103211118510726", simCardProvider: "Verizon", cameraModule: "Yes", manufacturer: "TRAINFO Inc.", warrantyStart: "2022-04-22", warrantyEnd: "2025-04-22" },
  "255":       { location: "McDuff & Beaver",                     ipAddress: "192.168.1.55",  deviceType: "TRAINFO-T2",  status: "Down",   calibration: "Calibrated (State 3)",   powerType: "Direct Power", simCardId: "89014103211118510727", simCardProvider: "Bell",    cameraModule: "No",  manufacturer: "TRAINFO Inc.", warrantyStart: "2021-09-14", warrantyEnd: "2024-09-14" },
  "1150":      { location: "US 441 @ NW 34th Blvd",              ipAddress: "192.168.1.150", deviceType: "TRAINFO-T3",  status: "Active", calibration: "Calibrated (State 3)",   powerType: "Direct Power", simCardId: "89014103211118510728", simCardProvider: "Rogers",  cameraModule: "Yes", manufacturer: "TRAINFO Inc.", warrantyStart: "2022-12-01", warrantyEnd: "2025-12-01" },
  "TAS2BCE03": { location: "Heckscher Dr",                        ipAddress: "192.168.3.3",   deviceType: "TRAINFO-TAS", status: "Active", calibration: "Calibrated (State 3)",   powerType: "Solar",        simCardId: "89014103211118510729", simCardProvider: "Telus",   cameraModule: "Yes", manufacturer: "TRAINFO Inc.", warrantyStart: "2023-03-15", warrantyEnd: "2026-03-15" },
  "341":       { location: "Blanding Blvd & 103rd St",            ipAddress: "192.168.3.41",  deviceType: "TRAINFO-T3",  status: "Active", calibration: "Calibrated (State 3)",   powerType: "Direct Power", simCardId: "89014103211118510730", simCardProvider: "AT&T",    cameraModule: "No",  manufacturer: "TRAINFO Inc.", warrantyStart: "2022-05-10", warrantyEnd: "2025-05-10" },
  "342":       { location: "Collins Rd & Oak St",                 ipAddress: "192.168.3.42",  deviceType: "TRAINFO-T2",  status: "Down",   calibration: "Low Power (State -1)",   powerType: "Solar",        simCardId: "89014103211118510731", simCardProvider: "Verizon", cameraModule: "No",  manufacturer: "TRAINFO Inc.", warrantyStart: "2021-07-20", warrantyEnd: "2024-07-20" },
  "489":       { location: "Beach Blvd @ Hodges Blvd",            ipAddress: "192.168.4.89",  deviceType: "TRAINFO-T3",  status: "Active", calibration: "Calibrated (State 3)",   powerType: "Direct Power", simCardId: "89014103211118510732", simCardProvider: "Rogers",  cameraModule: "Yes", manufacturer: "TRAINFO Inc.", warrantyStart: "2023-02-01", warrantyEnd: "2026-02-01" },
  "512":       { location: "University Blvd & St Johns Bluff",    ipAddress: "192.168.5.12",  deviceType: "TRAINFO-T3",  status: "Active", calibration: "Validating (State 2)",   powerType: "Solar",        simCardId: "89014103211118510733", simCardProvider: "Bell",    cameraModule: "No",  manufacturer: "TRAINFO Inc.", warrantyStart: "2023-04-15", warrantyEnd: "2026-04-15" },
}

const defaultSensorData = {
  location: "Unknown Location",
  ipAddress: "192.168.0.1",
  deviceType: "TRAINFO-T3",
  status: "Active",
  calibration: "Calibrated (State 3)",
  powerType: "Direct Power",
  simCardId: "89014103211118510700",
  simCardProvider: "Rogers",
  cameraModule: "No",
  manufacturer: "TRAINFO Inc.",
  warrantyStart: "2022-01-01",
  warrantyEnd: "2025-01-01",
}

const bellLibrary = [
  { type: "B42", frequencies: ["2379", "2831"] },
  { type: "B20", frequencies: ["1970", "2665", "3413"] },
  { type: "B43", frequencies: ["1529", "2143"] },
  { type: "B21", frequencies: ["1416", "1911", "2439"] },
  { type: "B44", frequencies: ["1572", "2186", "2789", "3435"] },
  { type: "B22", frequencies: ["1443", "1949", "2132"] },
  { type: "B45", frequencies: ["1448", "1934", "2492", "3074"] },
  { type: "B01", frequencies: ["1588", "2147", "2740"] },
  { type: "B46", frequencies: ["2810", "1625"] },
  { type: "B02", frequencies: ["1399", "1889", "2417", "2976"] },
]

type BellRow = { bellType: string; bellCode: string; freq: string; power: string }

const initialBellRows: BellRow[] = [
  { bellType: "B01", bellCode: "1", freq: "2024", power: "5" },
  { bellType: "B01", bellCode: "1", freq: "2029", power: "5" },
  { bellType: "B20", bellCode: "2", freq: "1970", power: "6" },
  { bellType: "B20", bellCode: "2", freq: "2665", power: "6" },
  { bellType: "B42", bellCode: "3", freq: "2379", power: "4" },
  { bellType: "B42", bellCode: "3", freq: "2831", power: "4" },
]

export default function ConfigureSensorPage() {
  const params = useParams()
  const router = useRouter()
  const sensorId = params.sensorId as string

  const base = sensorDataMap[sensorId] ?? defaultSensorData

  const [status, setStatus] = useState(base.status)
  const [calibration, setCalibration] = useState(base.calibration)
  const [location, setLocation] = useState(base.location)
  const [powerType, setPowerType] = useState(base.powerType)
  const [simCardId, setSimCardId] = useState(base.simCardId)
  const [simCardProvider, setSimCardProvider] = useState(base.simCardProvider)
  const [cameraModule, setCameraModule] = useState(base.cameraModule)
  const [manufacturer, setManufacturer] = useState(base.manufacturer)
  const [warrantyStart, setWarrantyStart] = useState(base.warrantyStart)
  const [warrantyEnd, setWarrantyEnd] = useState(base.warrantyEnd)

  const [bellRows, setBellRows] = useState<BellRow[]>(initialBellRows)

  // Unsaved-changes guard
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)
  const [pendingNav, setPendingNav] = useState<string | null>(null)

  // Delete Bell Modal state
  const [deleteBellModal, setDeleteBellModal] = useState<{ open: boolean; index: number; bellType: string; bellCode: string } | null>(null)

  // Add Bell Modal state
  const [showAddBellModal, setShowAddBellModal] = useState(false)
  const [addBellStep, setAddBellStep] = useState(1)
  const [bellSearch, setBellSearch] = useState("")
  const [bellPage, setBellPage] = useState(1)
  const [selectedBell, setSelectedBell] = useState<string | null>(null)
  const [bellFreqRows, setBellFreqRows] = useState<{ freq: string; power: string }[]>([])

  const calState = calibStateNum(calibration)

  const isDirty = useMemo(() => (
    status !== base.status ||
    calibration !== base.calibration ||
    location !== base.location ||
    powerType !== base.powerType ||
    simCardId !== base.simCardId ||
    simCardProvider !== base.simCardProvider ||
    cameraModule !== base.cameraModule ||
    manufacturer !== base.manufacturer ||
    warrantyStart !== base.warrantyStart ||
    warrantyEnd !== base.warrantyEnd ||
    JSON.stringify(bellRows) !== JSON.stringify(initialBellRows)
  ), [status, calibration, location, powerType, simCardId, simCardProvider, cameraModule, manufacturer, warrantyStart, warrantyEnd, bellRows, base])

  function navigate(href: string) {
    if (isDirty) {
      setPendingNav(href)
      setShowLeaveDialog(true)
    } else {
      router.push(href)
    }
  }

  const filteredBellLibrary = bellLibrary.filter(b => b.type.toLowerCase().includes(bellSearch.toLowerCase()))
  const bellTotalPages = Math.max(1, Math.ceil(filteredBellLibrary.length / BELL_MODAL_PAGE_SIZE))
  const pagedBells = filteredBellLibrary.slice((bellPage - 1) * BELL_MODAL_PAGE_SIZE, bellPage * BELL_MODAL_PAGE_SIZE)
  const selectedBellData = bellLibrary.find(b => b.type === selectedBell) ?? null

  function closeAddBellModal() {
    setShowAddBellModal(false)
    setAddBellStep(1)
    setBellSearch("")
    setBellPage(1)
    setSelectedBell(null)
    setBellFreqRows([])
  }

  function handleAddBellSave() {
    if (!selectedBellData) return
    const nextCode = String(Math.max(...bellRows.map(b => parseInt(b.bellCode) || 0), 0) + 1)
    const newRows: BellRow[] = bellFreqRows
      .filter(r => r.freq.trim())
      .map(r => ({ bellType: selectedBellData.type, bellCode: nextCode, freq: r.freq, power: r.power }))
    setBellRows(prev => [...prev, ...newRows])
    closeAddBellModal()
  }

  function handleDeleteBellRow(index: number) {
    setBellRows(prev => prev.filter((_, i) => i !== index))
  }

  function handleBellRowChange(index: number, field: "freq" | "power", value: string) {
    const numeric = value.replace(/\D/g, "")
    setBellRows(prev => prev.map((r, i) => i === index ? { ...r, [field]: numeric } : r))
  }

  const showAddBellButton = calState === -1 || calState === 1
  const showDeleteButton = calState >= 2
  const bellsReadOnly = calState === 0

  return (
    <PortalLayout
      role="cse"
      title="Configure Sensor"
      subtitle={base.location}
      activeHref="/portal/cse/sensors"
      onBeforeNavigate={(href) => {
        if (isDirty) {
          setPendingNav(href)
          setShowLeaveDialog(true)
          return false
        }
        return true
      }}
    >
      {/* Sticky breadcrumb */}
      <div className="sticky top-16 z-10 bg-background border-b border-border px-6 py-3">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <button
            className="hover:text-foreground transition"
            onClick={() => navigate("/portal/cse/sensors")}
          >
            Sensors
          </button>
          <ChevronRight size={14} />
          <span className="text-foreground/60">{sensorId}</span>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Configure</span>
        </nav>
      </div>

      <div className="p-6 space-y-6 pb-24">

        {/* Section 1 — Sensor Details */}
        <Card className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Sensor ID</label>
              <input
                type="text"
                value={sensorId}
                disabled
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">IP Address</label>
              <input
                type="text"
                value={base.ipAddress}
                disabled
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Device Type</label>
              <input
                type="text"
                value={base.deviceType}
                disabled
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Sensor Status <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              >
                <option value="Active">Active</option>
                <option value="Down">Down</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Calibration Status <span className="text-red-500">*</span>
              </label>
              <select
                value={calibration}
                onChange={e => setCalibration(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              >
                <option value="Unassigned (State 0)">Unassigned (State 0)</option>
                <option value="Low Power (State -1)">Low Power (State -1)</option>
                <option value="Calibrating (State 1)">Calibrating (State 1)</option>
                <option value="Validating (State 2)">Validating (State 2)</option>
                <option value="Calibrated (State 3)">Calibrated (State 3)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Power Type <span className="text-red-500">*</span>
              </label>
              <select
                value={powerType}
                onChange={e => setPowerType(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              >
                <option value="Direct Power">Direct Power</option>
                <option value="Solar">Solar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                SIM Card ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={simCardId}
                onChange={e => setSimCardId(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                SIM Card Provider <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={simCardProvider}
                onChange={e => setSimCardProvider(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Camera Module <span className="text-red-500">*</span>
              </label>
              <select
                value={cameraModule}
                onChange={e => setCameraModule(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Manufacturer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={manufacturer}
                onChange={e => setManufacturer(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Warranty Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={warrantyStart}
                onChange={e => setWarrantyStart(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Warranty End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={warrantyEnd}
                onChange={e => setWarrantyEnd(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
              />
            </div>

          </div>
        </Card>

        {/* Section 2 — Bells */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded text-xs font-bold bg-[#8B1A1A] text-white uppercase tracking-wide">
                Bells
              </span>
              <span className="text-sm text-muted-foreground">{bellRows.length} configured</span>
            </div>
            {showAddBellButton && (
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-white"
                onClick={() => setShowAddBellModal(true)}
              >
                <Plus size={16} className="mr-1.5" />
                Add Known Bell
              </Button>
            )}
          </div>

          <div className="p-6">
            {bellsReadOnly && (
              <div className="mb-4 px-4 py-3 bg-muted rounded-lg border border-border text-sm text-muted-foreground">
                Bell management is not available for unassigned sensors.
              </div>
            )}

            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr className="text-left text-sm">
                    <th className="px-4 py-3 font-semibold">Bell Type</th>
                    <th className="px-4 py-3 font-semibold">Bell Code</th>
                    <th className="px-4 py-3 font-semibold">Frequency (Hz)</th>
                    <th className="px-4 py-3 font-semibold">Power (dB)</th>
                    {showDeleteButton && (
                      <th className="px-4 py-3 font-semibold text-center">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {bellRows.map((row, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/30 transition">
                      <td className="px-4 py-2.5 text-sm font-medium">{row.bellType}</td>
                      <td className="px-4 py-2.5 text-sm">{row.bellCode}</td>
                      <td className="px-4 py-2.5">
                        {bellsReadOnly ? (
                          <span className="text-sm">{row.freq}</span>
                        ) : (
                          <input
                            type="text"
                            inputMode="numeric"
                            value={row.freq}
                            onChange={e => handleBellRowChange(i, "freq", e.target.value)}
                            className="w-24 border border-border rounded px-2 py-1 text-sm bg-background focus:outline-none focus:border-accent font-mono"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        {bellsReadOnly ? (
                          <span className="text-sm">{row.power}</span>
                        ) : (
                          <input
                            type="text"
                            inputMode="numeric"
                            value={row.power}
                            onChange={e => handleBellRowChange(i, "power", e.target.value)}
                            className="w-20 border border-border rounded px-2 py-1 text-sm bg-background focus:outline-none focus:border-accent"
                          />
                        )}
                      </td>
                      {showDeleteButton && (
                        <td className="px-4 py-2.5 text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-red-100 text-red-600"
                            onClick={() => setDeleteBellModal({ open: true, index: i, bellType: row.bellType, bellCode: row.bellCode })}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {bellRows.length === 0 && (
                    <tr>
                      <td
                        colSpan={showDeleteButton ? 5 : 4}
                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                      >
                        No bells configured.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

      </div>

      {/* Fixed Save button */}
      <div className="fixed bottom-6 right-6 z-50 shadow-lg rounded-md">
        <Button
          className={`px-8 transition ${
            isDirty
              ? "bg-accent hover:bg-accent/90 text-white"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          disabled={!isDirty}
        >
          Save
        </Button>
      </div>

      {/* Add Known Bell Modal — 2-step */}
      {showAddBellModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex-shrink-0 px-6 pt-5 pb-0 border-b border-border">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Add Bell Configuration</h2>
                <Button variant="ghost" size="sm" onClick={closeAddBellModal}>
                  <X size={20} />
                </Button>
              </div>

              {/* Step indicator */}
              <div className="flex items-center justify-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${addBellStep === 1 ? "bg-accent text-white" : "bg-gray-200 text-gray-500"}`}>
                      1
                    </div>
                    <span className={`text-xs font-medium ${addBellStep === 1 ? "text-accent" : "text-muted-foreground"}`}>
                      Select Bell
                    </span>
                  </div>
                  <div className={`w-24 h-1 mb-4 ${addBellStep >= 2 ? "bg-accent" : "bg-gray-200"}`} />
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${addBellStep >= 2 ? "bg-accent text-white" : "bg-gray-200 text-gray-500"}`}>
                      2
                    </div>
                    <span className={`text-xs font-medium ${addBellStep >= 2 ? "text-accent" : "text-muted-foreground"}`}>
                      Add Frequency Bounds
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

              {/* Step 1 — Select Bell */}
              {addBellStep === 1 && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Total Bells: {bellLibrary.length}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Search:</span>
                      <input
                        type="text"
                        placeholder="Search here..."
                        value={bellSearch}
                        onChange={e => { setBellSearch(e.target.value); setBellPage(1) }}
                        className="border border-border rounded-lg px-3 py-2 text-sm w-44 focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr className="text-left text-sm">
                          <th className="px-4 py-3 font-semibold">Bell Type</th>
                          <th className="px-4 py-3 font-semibold">Bell Frequency (Hz)</th>
                          <th className="px-4 py-3 font-semibold text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagedBells.length > 0 ? pagedBells.map((bell, i) => {
                          const isSelected = selectedBell === bell.type
                          return (
                            <tr
                              key={bell.type}
                              className={`border-t border-border hover:bg-muted/30 transition ${isSelected ? "bg-accent/5" : i % 2 !== 0 ? "bg-muted/10" : ""}`}
                            >
                              <td className="px-4 py-3 text-sm font-medium text-accent">{bell.type}</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{bell.frequencies.join(" - ")}</td>
                              <td className="px-4 py-3 text-center">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={isSelected ? "text-green-600 hover:bg-green-100" : "text-accent hover:bg-accent/10"}
                                  onClick={() => setSelectedBell(isSelected ? null : bell.type)}
                                >
                                  <ThumbsUp size={18} />
                                </Button>
                              </td>
                            </tr>
                          )
                        }) : (
                          <tr>
                            <td colSpan={3} className="px-4 py-8 text-center text-sm text-muted-foreground">
                              No bells found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <TablePagination currentPage={bellPage} totalPages={bellTotalPages} onPageChange={setBellPage} />
                </>
              )}

              {/* Step 2 — Add Frequency Bounds */}
              {addBellStep === 2 && selectedBellData && (
                <>
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <p className="text-sm font-medium">
                      Selected Bell: <span className="text-accent font-bold">{selectedBellData.type}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Reference frequencies: {selectedBellData.frequencies.join(" - ")} Hz
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium">Frequency / Power rows</label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setBellFreqRows(prev => [...prev, { freq: "", power: "" }])}
                      >
                        <Plus size={14} className="mr-1" />
                        Add Row
                      </Button>
                    </div>

                    {bellFreqRows.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-6">
                        Click "Add Row" to add frequency/power entries.
                      </p>
                    )}

                    <div className="space-y-2">
                      {bellFreqRows.map((row, i) => (
                        <div key={i} className="flex items-end gap-3">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-muted-foreground block mb-1">Frequency (Hz)</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="e.g., 2379"
                              value={row.freq}
                              onChange={e => setBellFreqRows(prev => prev.map((r, j) => j === i ? { ...r, freq: e.target.value.replace(/\D/g, "") } : r))}
                              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent font-mono"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm font-medium text-muted-foreground block mb-1">Power (dB)</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="e.g., 5"
                              value={row.power}
                              onChange={e => setBellFreqRows(prev => prev.map((r, j) => j === i ? { ...r, power: e.target.value.replace(/\D/g, "") } : r))}
                              className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-accent"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-red-100 text-red-600 mb-0.5"
                            onClick={() => setBellFreqRows(prev => prev.filter((_, j) => j !== i))}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Modal footer */}
            <div className="flex-shrink-0 flex items-center justify-between gap-3 px-6 py-4 border-t border-border">
              <Button variant="outline" onClick={closeAddBellModal}>Cancel</Button>
              <div className="flex gap-2">
                {addBellStep === 2 && (
                  <Button variant="outline" onClick={() => setAddBellStep(1)}>
                    ← Back
                  </Button>
                )}
                {addBellStep === 1 && (
                  <Button
                    className="bg-accent hover:bg-accent/90 text-white"
                    disabled={!selectedBell}
                    onClick={() => {
                      if (selectedBellData) {
                        setBellFreqRows(selectedBellData.frequencies.map(f => ({ freq: f, power: "" })))
                      }
                      setAddBellStep(2)
                    }}
                  >
                    Next →
                  </Button>
                )}
                {addBellStep === 2 && (
                  <Button
                    className="bg-accent hover:bg-accent/90 text-white"
                    disabled={bellFreqRows.filter(r => r.freq.trim()).length === 0}
                    onClick={handleAddBellSave}
                  >
                    Save Bell Config
                  </Button>
                )}
              </div>
            </div>

          </Card>
        </div>
      )}

      {/* Delete Bell Configuration Modal */}
      {deleteBellModal?.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold">Delete Bell Configuration</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setDeleteBellModal(null)}>
                  <X size={20} />
                </Button>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-orange-800">
                  <strong>Warning:</strong> This will permanently remove this bell configuration from the crossing. This action cannot be undone.
                </p>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Are you sure you want to delete the <strong>{deleteBellModal.bellType}</strong> - Bell Code <strong>{deleteBellModal.bellCode}</strong> configuration?
              </p>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setDeleteBellModal(null)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => { handleDeleteBellRow(deleteBellModal.index); setDeleteBellModal(null) }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Unsaved-changes leave dialog */}
      {showLeaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 border border-border">
            <h3 className="font-bold text-xl mb-2">Unsaved Changes</h3>
            <p className="text-sm text-muted-foreground mb-6">
              You have unsaved changes. Are you sure you want to leave?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowLeaveDialog(false)
                  setPendingNav(null)
                }}
              >
                Stay
              </Button>
              <Button
                className="bg-accent hover:bg-accent/90 text-white"
                onClick={() => {
                  setShowLeaveDialog(false)
                  if (pendingNav) router.push(pendingNav)
                }}
              >
                Leave
              </Button>
            </div>
          </div>
        </div>
      )}

    </PortalLayout>
  )
}
