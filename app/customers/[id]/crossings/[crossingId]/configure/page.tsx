"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Settings, MapPin, Plus, Navigation, Monitor, Radio, FileText, ChevronRight, X, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ConfigureCrossingPage() {
  const params = useParams()
  const router = useRouter()
  const crossingId = params.crossingId as string
  const customerId = params.id as string

  // Hardcoded customer name for wireframe
  const customerName = "North Florida TPO"

  const [configTab, setConfigTab] = useState("rail")
  const [showAddRailSegment, setShowAddRailSegment] = useState(false)
  const [showAddRoadSegment, setShowAddRoadSegment] = useState(false)
  const [showAddBellConfig, setShowAddBellConfig] = useState(false)
  const [showEditBellConfig, setShowEditBellConfig] = useState<{ open: boolean; freq: string; power: string }>({ open: false, freq: "", power: "" })
  const [showEditRailSegment, setShowEditRailSegment] = useState(false)
  const [editRailMaxSpeed, setEditRailMaxSpeed] = useState("80")
  const [editRailDistance, setEditRailDistance] = useState("1500")
  const [railMaxSpeed, setRailMaxSpeed] = useState("")
  const [railDistance, setRailDistance] = useState("")
  const [railCrossingSearch, setRailCrossingSearch] = useState("")
  const [selectedRailCrossing, setSelectedRailCrossing] = useState<string | null>(null)
  const [railPage, setRailPage] = useState(1)
  const [showDmsLogsModal, setShowDmsLogsModal] = useState<{ open: boolean; dms: any }>({ open: false, dms: null })
  const [showSetLocationModal, setShowSetLocationModal] = useState<{ open: boolean; beacon: any }>({ open: false, beacon: null })

  // Crossing data derived from crossingId param
  const crossingsList = [
    { id: "620872B", location: "Heckscher Dr", type: "Crossing Status", status: "Active", sensorId: "TAS2BCE03" },
  ]
  const selectedCrossing = crossingsList.find(c => c.id === crossingId) ?? {
    id: crossingId,
    location: "Unknown Location",
    type: "Crossing Status",
    status: "Active",
    sensorId: "N/A",
  }

  const availableCrossings = [
    { id: "620873A", location: "Main St & Railway" },
    { id: "620874C", location: "Oak Ave Crossing" },
    { id: "620875D", location: "Industrial Park Access" },
  ]

  const fraRailCrossings = [
    { id: "273062B", location: "Breakers Drive",           lat: "30.138894",  long: "-81.527566"   },
    { id: "273057E", location: "Flagler Center Boulevard", lat: "30.139381",  long: "-81.5181566"  },
    { id: "272938M", location: "Kenan Drive",              lat: "30.1394967", long: "-81.5239524"  },
    { id: "271831G", location: "Race Track Rd",            lat: "30.104647",  long: "-81.479465"   },
    { id: "271816E", location: "Atlantic Blvd",            lat: "30.306632",  long: "-81.649786"   },
    { id: "621188U", location: "Soutel Dr",                lat: "30.382568",  long: "-81.737747"   },
    { id: "271824W", location: "Sunbeam Rd",               lat: "30.206077",  long: "-81.57877"    },
    { id: "271829F", location: "Greenland Rd",             lat: "30.1645389", long: "-81.5399787"  },
    { id: "620872B", location: "Heckscher Dr",             lat: "30.3285",    long: "-81.6558"     },
    { id: "273099A", location: "Main Street",              lat: "25.7617",    long: "-80.1918"     },
    { id: "273100B", location: "Biscayne Blvd",            lat: "25.7839",    long: "-80.1912"     },
  ]
  const RAIL_PAGE_SIZE = 5
  const filteredRailCrossings = fraRailCrossings.filter(
    (c) =>
      c.id.toLowerCase().includes(railCrossingSearch.toLowerCase()) ||
      c.location.toLowerCase().includes(railCrossingSearch.toLowerCase())
  )
  const railTotalPages = Math.max(1, Math.ceil(filteredRailCrossings.length / RAIL_PAGE_SIZE))
  const pagedRailCrossings = filteredRailCrossings.slice(
    (railPage - 1) * RAIL_PAGE_SIZE,
    railPage * RAIL_PAGE_SIZE
  )
  const railSaveEnabled = !!selectedRailCrossing && railMaxSpeed.trim() !== "" && railDistance.trim() !== ""
  const closeRailModal = () => {
    setShowAddRailSegment(false)
    setRailMaxSpeed("")
    setRailDistance("")
    setRailCrossingSearch("")
    setSelectedRailCrossing(null)
    setRailPage(1)
  }

  const bluetoothSensors = [
    { id: "BT-001", location: "North Entrance", type: "3rd Party", status: "Active", canEdit: false },
    { id: "BT-002", location: "South Exit", type: "3rd Party", status: "Active", canEdit: false },
    { id: "OD-001", location: "East Origin", type: "Manual", status: "Active", canEdit: true },
    { id: "OD-002", location: "West Destination", type: "Manual", status: "Active", canEdit: true },
  ]

  const dmsBoards = [
    { id: "DMS-001", name: "North Approach DMS", voltage: "12.4V", status: "Active", deviceId: "DMS-A1B2C3", vin: "1HGBH41JXMN109186", lat: "30.3285", long: "-81.6558", message: "TRAIN APPROACHING - EXPECT DELAYS" },
    { id: "DMS-002", name: "South Approach DMS", voltage: "12.2V", status: "Active", deviceId: "DMS-D4E5F6", vin: "2FMDK3GC5CBA12345", lat: "30.3275", long: "-81.6548", message: "CLEAR - NO DELAYS" },
  ]

  const beacons = [
    { id: "BCN-001", name: "East Gate Beacon", voltage: "11.8V", status: "Active", deviceId: "BCN-G7H8I9", vin: "3VWDX7AJ5DM123456", lat: "30.3280", long: "-81.6553", message: "ON" },
    { id: "BCN-002", name: "West Gate Beacon", voltage: "12.1V", status: "Inactive", deviceId: "BCN-J1K2L3", vin: "4T1BF1FK5CU123789", lat: "30.3270", long: "-81.6543", message: "OFF" },
  ]

  return (
    <PortalLayout role="cse" title="Configure Crossing" subtitle={`${crossingId} — ${selectedCrossing.location}`} activeHref="/portal/cse/customers">
      {/* Sticky page header: breadcrumb + tab bar */}
      <div className="sticky top-16 z-20 bg-background border-b border-border">
        <div className="px-6 pt-3 pb-0">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <button
              className="hover:text-foreground transition"
              onClick={() => router.push("/portal/cse/customers")}
            >
              Customers
            </button>
            <ChevronRight size={14} />
            <button
              className="hover:text-foreground transition"
              onClick={() => router.push(`/portal/cse/customers/${customerId}`)}
            >
              {customerName}
            </button>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">
              Configure Crossing — {crossingId}
            </span>
          </nav>

        </div>

        {/* Crossing info bar */}
        <div className="px-6 py-3 border-t border-border">
        <div className="grid grid-cols-4 gap-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Crossing ID</p>
            <p className="font-semibold text-sm">{selectedCrossing.id}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Location</p>
            <p className="font-semibold text-sm">{selectedCrossing.location}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sensor ID</p>
            <p className="font-semibold text-sm font-mono">{selectedCrossing.sensorId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
              {selectedCrossing.status}
            </span>
          </div>
        </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 px-6 border-t border-border">
          {[
            { id: "rail", label: "Rail Segments" },
            { id: "road", label: "Road Segments" },
            { id: "bluetooth", label: "Bluetooth Sensors" },
            { id: "dms", label: "DMS & Beacons" },
            { id: "bell", label: "Sensor Configuration" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setConfigTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                configTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div>
          {/* Rail Segments Tab */}
          {configTab === "rail" && (
            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Define rail segments by selecting an end crossing. The current crossing ({selectedCrossing?.id})
                  is the start point.
                </p>
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-white shrink-0 ml-4"
                  onClick={() => setShowAddRailSegment(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add Rail Segment
                </Button>
              </div>

              {/* Rail segments table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-sm">
                      <th className="px-4 py-3 font-semibold">Segment</th>
                      <th className="px-4 py-3 font-semibold">Start Crossing Location</th>
                      <th className="px-4 py-3 font-semibold">Max Speed (km/h)</th>
                      <th className="px-4 py-3 font-semibold">Distance (m)</th>
                      <th className="px-4 py-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border hover:bg-muted/30 transition">
                      <td className="px-4 py-3 text-sm font-medium">620873A → 620872B</td>
                      <td className="px-4 py-3 text-sm">Main St &amp; Railway</td>
                      <td className="px-4 py-3 text-sm">80</td>
                      <td className="px-4 py-3 text-sm">1500</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <Button size="sm" variant="ghost" className="hover:bg-accent/10 text-accent" onClick={() => setShowEditRailSegment(true)}>
                            <Edit size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-red-100 text-red-600">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Edit Rail Segment Modal */}
              {showEditRailSegment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="w-full max-w-lg flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border">
                      <h2 className="text-xl font-bold">Edit Rail Segment</h2>
                      <Button variant="ghost" size="sm" onClick={() => setShowEditRailSegment(false)}>
                        <X size={20} />
                      </Button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-5 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Segment</label>
                        <input
                          type="text"
                          value="620873A → 620872B"
                          disabled
                          className="w-full border border-border rounded-lg p-3 bg-muted text-muted-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Crossing Location</label>
                        <input
                          type="text"
                          value="Main St & Railway"
                          disabled
                          className="w-full border border-border rounded-lg p-3 bg-muted text-muted-foreground"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Max Speed (km/h)</label>
                          <input
                            type="text"
                            value={editRailMaxSpeed}
                            onChange={(e) => setEditRailMaxSpeed(e.target.value)}
                            className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Distance (m)</label>
                          <input
                            type="text"
                            value={editRailDistance}
                            onChange={(e) => setEditRailDistance(e.target.value)}
                            className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-border">
                      <Button variant="outline" onClick={() => setShowEditRailSegment(false)}>Cancel</Button>
                      <Button className="bg-accent hover:bg-accent/90 text-white" onClick={() => setShowEditRailSegment(false)}>
                        Save Changes
                      </Button>
                    </div>

                  </Card>
                </div>
              )}

              {/* Add Rail Segment Modal */}
              {showAddRailSegment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">

                    {/* Modal header */}
                    <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border">
                      <h2 className="text-xl font-bold">Add Rail Segment</h2>
                      <Button variant="ghost" size="sm" onClick={closeRailModal}>
                        <X size={20} />
                      </Button>
                    </div>

                    {/* Modal body — scrollable */}
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                      {/* Max Speed + Distance inputs */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Max Speed (km/h)</label>
                          <input
                            type="text"
                            placeholder="e.g., 80"
                            value={railMaxSpeed}
                            onChange={(e) => setRailMaxSpeed(e.target.value)}
                            className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Distance (m)</label>
                          <input
                            type="text"
                            placeholder="e.g., 1500"
                            value={railDistance}
                            onChange={(e) => setRailDistance(e.target.value)}
                            className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>

                      {/* Table controls row */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Total Crossings: 315</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Search:</span>
                          <input
                            type="text"
                            placeholder="Search here..."
                            value={railCrossingSearch}
                            onChange={(e) => { setRailCrossingSearch(e.target.value); setRailPage(1) }}
                            className="border border-border rounded-lg px-3 py-2 text-sm w-48 focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>

                      {/* Crossings table */}
                      <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr className="text-left text-sm">
                              <th className="px-4 py-3 font-semibold text-foreground">Crossing ID</th>
                              <th className="px-4 py-3 font-semibold text-foreground">Crossing Location</th>
                              <th className="px-4 py-3 font-semibold text-foreground">Latitude</th>
                              <th className="px-4 py-3 font-semibold text-foreground">Longitude</th>
                              <th className="px-4 py-3 font-semibold text-foreground text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pagedRailCrossings.length > 0 ? pagedRailCrossings.map((crossing, i) => {
                              const isSelected = selectedRailCrossing === crossing.id
                              return (
                                <tr key={crossing.id} className={`border-t border-border hover:bg-muted/30 transition ${isSelected ? "bg-accent/5" : i % 2 !== 0 ? "bg-muted/10" : ""}`}>
                                  <td className="px-4 py-3 text-sm font-medium text-accent">{crossing.id}</td>
                                  <td className="px-4 py-3 text-sm">{crossing.location}</td>
                                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{crossing.lat}</td>
                                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{crossing.long}</td>
                                  <td className="px-4 py-3 text-center">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className={`${isSelected ? "text-green-600 hover:bg-green-100" : "text-accent hover:bg-accent/10"}`}
                                      onClick={() => setSelectedRailCrossing(isSelected ? null : crossing.id)}
                                    >
                                      <ThumbsUp size={18} />
                                    </Button>
                                  </td>
                                </tr>
                              )
                            }) : (
                              <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">No crossings found.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      {railTotalPages > 1 && (
                        <div className="flex items-center justify-center gap-1 text-sm">
                          <button
                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition disabled:opacity-40"
                            disabled={railPage === 1}
                            onClick={() => setRailPage(1)}
                          >
                            First
                          </button>
                          <button
                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition disabled:opacity-40"
                            disabled={railPage === 1}
                            onClick={() => setRailPage((p) => p - 1)}
                          >
                            ←
                          </button>
                          {Array.from({ length: railTotalPages }, (_, i) => i + 1).map((p) => (
                            <button
                              key={p}
                              onClick={() => setRailPage(p)}
                              className={`w-8 h-8 rounded-full text-sm transition ${
                                p === railPage
                                  ? "bg-accent text-white font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                          <button
                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition disabled:opacity-40"
                            disabled={railPage === railTotalPages}
                            onClick={() => setRailPage((p) => p + 1)}
                          >
                            →
                          </button>
                          <button
                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition disabled:opacity-40"
                            disabled={railPage === railTotalPages}
                            onClick={() => setRailPage(railTotalPages)}
                          >
                            Last
                          </button>
                        </div>
                      )}

                    </div>

                    {/* Modal footer */}
                    <div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-border">
                      <Button variant="outline" onClick={closeRailModal}>Cancel</Button>
                      <Button
                        className="bg-accent hover:bg-accent/90 text-white"
                        disabled={!railSaveEnabled}
                        onClick={closeRailModal}
                      >
                        Save Rail Segment
                      </Button>
                    </div>

                  </Card>
                </div>
              )}

            </div>
          )}

          {/* Road Segments Tab */}
          {configTab === "road" && (
            <div className="space-y-4">

              {/* Description + Add button */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Define road segments by selecting Origin and Destination points.
                </p>
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-white shrink-0 ml-4"
                  onClick={() => setShowAddRoadSegment(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add Road Segment
                </Button>
              </div>

              {/* Road segments table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-sm">
                      <th className="px-4 py-3 font-semibold text-foreground">Origin</th>
                      <th className="px-4 py-3 font-semibold text-foreground">Destination</th>
                      <th className="px-4 py-3 font-semibold text-foreground text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border hover:bg-muted/30 transition">
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                          Main St (30.3285, -81.6558)
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500 shrink-0"></span>
                          Oak Ave (30.3275, -81.6548)
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button size="sm" variant="ghost" className="hover:bg-red-100 text-red-600">
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Add Road Segment Modal */}
              {showAddRoadSegment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border">
                      <div>
                        <h2 className="text-xl font-bold">Add Road Segment</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">{selectedCrossing.id} - {selectedCrossing.location}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setShowAddRoadSegment(false)}>
                        <X size={20} />
                      </Button>
                    </div>

                    {/* Body — scrollable */}
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                      <h4 className="font-medium">Select Origin &amp; Destination</h4>

                      {/* Map placeholders */}
                      <div className="grid lg:grid-cols-2 gap-4">
                        <div className="h-56 bg-muted rounded-lg border-2 border-dashed border-border flex flex-col overflow-hidden">
                          <div className="p-2 shrink-0">
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Origin</span>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                              <Navigation size={32} className="mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to set Origin point</p>
                              <p className="text-xs text-muted-foreground mt-1">or enter coordinates below</p>
                            </div>
                          </div>
                        </div>
                        <div className="h-56 bg-muted rounded-lg border-2 border-dashed border-border flex flex-col overflow-hidden">
                          <div className="p-2 shrink-0">
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">Destination</span>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                              <MapPin size={32} className="mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to set Destination point</p>
                              <p className="text-xs text-muted-foreground mt-1">or enter coordinates below</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Coordinate inputs */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h5 className="font-medium text-sm flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            Origin Coordinates
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-muted-foreground">Latitude</label>
                              <input type="text" placeholder="30.3285" className="w-full border border-border rounded-lg p-2 bg-background text-sm focus:outline-none focus:border-accent" />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Longitude</label>
                              <input type="text" placeholder="-81.6558" className="w-full border border-border rounded-lg p-2 bg-background text-sm focus:outline-none focus:border-accent" />
                            </div>
                          </div>
                          <input type="text" placeholder="Origin name (e.g., Main St)" className="w-full border border-border rounded-lg p-2 bg-background text-sm focus:outline-none focus:border-accent" />
                        </div>
                        <div className="space-y-3">
                          <h5 className="font-medium text-sm flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            Destination Coordinates
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-muted-foreground">Latitude</label>
                              <input type="text" placeholder="30.3275" className="w-full border border-border rounded-lg p-2 bg-background text-sm focus:outline-none focus:border-accent" />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Longitude</label>
                              <input type="text" placeholder="-81.6548" className="w-full border border-border rounded-lg p-2 bg-background text-sm focus:outline-none focus:border-accent" />
                            </div>
                          </div>
                          <input type="text" placeholder="Destination name (e.g., Oak Ave)" className="w-full border border-border rounded-lg p-2 bg-background text-sm focus:outline-none focus:border-accent" />
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-border">
                      <Button variant="outline" onClick={() => setShowAddRoadSegment(false)}>Cancel</Button>
                      <Button className="bg-accent hover:bg-accent/90 text-white" onClick={() => setShowAddRoadSegment(false)}>
                        Save Road Segment
                      </Button>
                    </div>

                  </Card>
                </div>
              )}

            </div>
          )}

          {/* Bluetooth Sensors Tab */}
          {configTab === "bluetooth" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                View 3rd party sensors and manual Origin/Destination points. Only manual entries can be edited.
              </p>

              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-sm">
                      <th className="px-4 py-3 font-semibold">Sensor ID</th>
                      <th className="px-4 py-3 font-semibold">Location</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bluetoothSensors.map((sensor) => (
                      <tr key={sensor.id} className="border-t border-border hover:bg-muted/30 transition">
                        <td className="px-4 py-3 text-sm font-medium">{sensor.id}</td>
                        <td className="px-4 py-3 text-sm">{sensor.location}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              sensor.type === "3rd Party"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {sensor.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {sensor.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            {sensor.canEdit ? (
                              <>
                                <Button size="sm" variant="ghost" className="hover:bg-accent/10 text-accent">
                                  <Edit size={16} />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-red-100 text-red-600">
                                  Decommission
                                </Button>
                              </>
                            ) : (
                              <Button size="sm" variant="ghost" className="hover:bg-red-100 text-red-600">
                                Decommission
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DMS & Beacons Tab */}
          {configTab === "dms" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">DMS Boards & Beacons</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Plus size={16} className="mr-2" />
                    Add DMS Board
                  </Button>
                  <Button size="sm" variant="outline">
                    <Plus size={16} className="mr-2" />
                    Add Beacon
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Attach DMS boards and beacons to this crossing for enhanced safety and communication.
              </p>

              {/* DMS Boards Section */}
              <Card className="p-4">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Monitor size={18} />
                  DMS Boards
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="pb-3 font-bold text-sm">Name</th>
                        <th className="pb-3 font-bold text-sm">Voltage</th>
                        <th className="pb-3 font-bold text-sm">Status</th>
                        <th className="pb-3 font-bold text-sm">Device ID</th>
                        <th className="pb-3 font-bold text-sm">VIN #</th>
                        <th className="pb-3 font-bold text-sm">Lat/Long</th>
                        <th className="pb-3 font-bold text-sm">Current Message</th>
                        <th className="pb-3 font-bold text-sm text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dmsBoards.map((dms) => (
                        <tr key={dms.id} className="border-b border-border">
                          <td className="py-3 font-medium">{dms.name}</td>
                          <td className="py-3 font-mono">{dms.voltage}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${dms.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                              {dms.status}
                            </span>
                          </td>
                          <td className="py-3 font-mono text-xs">{dms.deviceId}</td>
                          <td className="py-3 font-mono text-xs">{dms.vin}</td>
                          <td className="py-3 font-mono text-xs">{dms.lat}, {dms.long}</td>
                          <td className="py-3">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full max-w-32 truncate inline-block">
                              {dms.message}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center justify-center gap-1">
                              <Button size="sm" variant="ghost" className="hover:bg-accent/10 text-accent" title="Settings">
                                <Settings size={16} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="hover:bg-blue-100 text-blue-600"
                                title="View Logs"
                                onClick={() => setShowDmsLogsModal({ open: true, dms })}
                              >
                                <FileText size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="hover:bg-red-100 text-red-600" title="Remove">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Beacons Section */}
              <Card className="p-4">
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Radio size={18} />
                  Beacons
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="pb-3 font-bold text-sm">Name</th>
                        <th className="pb-3 font-bold text-sm">Voltage</th>
                        <th className="pb-3 font-bold text-sm">Status</th>
                        <th className="pb-3 font-bold text-sm">Device ID</th>
                        <th className="pb-3 font-bold text-sm">VIN #</th>
                        <th className="pb-3 font-bold text-sm">Lat/Long</th>
                        <th className="pb-3 font-bold text-sm">State</th>
                        <th className="pb-3 font-bold text-sm text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beacons.map((beacon) => (
                        <tr key={beacon.id} className="border-b border-border">
                          <td className="py-3 font-medium">{beacon.name}</td>
                          <td className="py-3 font-mono">{beacon.voltage}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${beacon.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                              {beacon.status}
                            </span>
                          </td>
                          <td className="py-3 font-mono text-xs">{beacon.deviceId}</td>
                          <td className="py-3 font-mono text-xs">{beacon.vin}</td>
                          <td className="py-3 font-mono text-xs">{beacon.lat}, {beacon.long}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${beacon.message === "ON" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                              {beacon.message}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center justify-center gap-1">
                              <Button size="sm" variant="ghost" className="hover:bg-accent/10 text-accent" title="Settings">
                                <Settings size={16} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="hover:bg-blue-100 text-blue-600"
                                title="Set Location"
                                onClick={() => setShowSetLocationModal({ open: true, beacon })}
                              >
                                <MapPin size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="hover:bg-red-100 text-red-600" title="Remove">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Add New DMS/Beacon Form */}
              <Card className="p-4 bg-muted/30">
                <h4 className="font-medium mb-4">Add New Device</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Device Type</label>
                    <select className="w-full border border-border rounded-lg p-3 bg-background">
                      <option value="">Select device type...</option>
                      <option value="dms">DMS Board</option>
                      <option value="beacon">Beacon</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="e.g., North Approach"
                      className="w-full border border-border rounded-lg p-3 bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">IP Address (DMS only)</label>
                    <input
                      type="text"
                      placeholder="e.g., 192.168.1.12"
                      className="w-full border border-border rounded-lg p-3 bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Signal Type (Beacon only)</label>
                    <select className="w-full border border-border rounded-lg p-3 bg-background">
                      <option value="">Select signal type...</option>
                      <option value="flashing-red">Flashing Red</option>
                      <option value="flashing-amber">Flashing Amber</option>
                      <option value="steady-red">Steady Red</option>
                      <option value="alternating">Alternating</option>
                    </select>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  <Plus size={16} className="mr-2" />
                  Attach Device to Crossing
                </Button>
              </Card>
            </div>
          )}

          {/* Sensor Configuration Tab */}
          {configTab === "bell" && (
            <div className="space-y-4">

              {/* Configured Bell Settings table */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Configure the power and frequency settings for the sensor at this crossing.
                </p>
                  <Button
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-white"
                    onClick={() => setShowAddBellConfig(true)}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Bell Config
                  </Button>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-sm">
                      <th className="px-4 py-3 font-semibold">Bell Type</th>
                      <th className="px-4 py-3 font-semibold">Bell Code</th>
                      <th className="px-4 py-3 font-semibold">Frequency (Hz)</th>
                      <th className="px-4 py-3 font-semibold">Power (dB)</th>
                      <th className="px-4 py-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[{ bellType: "B01", bellCode: "1", freq: "2024", power: "5" }, { bellType: "B01", bellCode: "1", freq: "2029", power: "5" }].map((row, i) => (
                      <tr key={i} className="border-t border-border hover:bg-muted/30 transition">
                        <td className="px-4 py-3 text-sm">{row.bellType}</td>
                        <td className="px-4 py-3 text-sm">{row.bellCode}</td>
                        <td className="px-4 py-3 text-sm">{row.freq}</td>
                        <td className="px-4 py-3 text-sm">{row.power}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-accent/10 text-accent"
                              onClick={() => setShowEditBellConfig({ open: true, freq: row.freq, power: row.power })}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-red-100 text-red-600">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Bell Config Modal */}
              {showAddBellConfig && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="w-full max-w-md flex flex-col overflow-hidden">
                    <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border">
                      <h2 className="text-xl font-bold">Add Bell Configuration</h2>
                      <Button variant="ghost" size="sm" onClick={() => setShowAddBellConfig(false)}>
                        <X size={20} />
                      </Button>
                    </div>
                    <div className="px-6 py-5 space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">Bell Type</label>
                        <select className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent">
                          <option value="">Select bell type...</option>
                          <option value="B01">B01</option>
                          <option value="B02">B02</option>
                          <option value="B20">B20</option>
                          <option value="B21">B21</option>
                          <option value="B42">B42</option>
                          <option value="B43">B43</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Bell Code</label>
                        <input type="text" placeholder="e.g., 44" className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Frequency (Hz)</label>
                        <input type="text" placeholder="e.g., 2024" className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Power (dB)</label>
                        <input type="text" placeholder="e.g., 5" className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-border">
                      <Button variant="outline" onClick={() => setShowAddBellConfig(false)}>Cancel</Button>
                      <Button className="bg-accent hover:bg-accent/90 text-white" onClick={() => setShowAddBellConfig(false)}>Save Bell Config</Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Edit Bell Config Modal */}
              {showEditBellConfig.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="w-full max-w-md flex flex-col overflow-hidden">
                    <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border">
                      <h2 className="text-xl font-bold">Edit Bell Configuration</h2>
                      <Button variant="ghost" size="sm" onClick={() => setShowEditBellConfig({ open: false, freq: "", power: "" })}>
                        <X size={20} />
                      </Button>
                    </div>
                    <div className="px-6 py-5 space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">Frequency (Hz)</label>
                        <input
                          type="text"
                          defaultValue={showEditBellConfig.freq}
                          className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Power (dB)</label>
                        <input
                          type="text"
                          defaultValue={showEditBellConfig.power}
                          className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-border">
                      <Button variant="outline" onClick={() => setShowEditBellConfig({ open: false, freq: "", power: "" })}>Cancel</Button>
                      <Button className="bg-accent hover:bg-accent/90 text-white" onClick={() => setShowEditBellConfig({ open: false, freq: "", power: "" })}>Save Changes</Button>
                    </div>
                  </Card>
                </div>
              )}

            </div>
          )}
        </div>

      </div>{/* end tab content */}

      {/* DMS Logs Modal */}
      {showDmsLogsModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-background z-10">
              <h2 className="text-xl font-bold">DMS Logs — {showDmsLogsModal.dms?.name}</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowDmsLogsModal({ open: false, dms: null })}>
                <X size={20} />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              {/* Date filter row */}
              <div className="flex items-center gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">From</label>
                  <input
                    type="date"
                    defaultValue="2025-02-20"
                    className="border border-border rounded-lg px-3 py-2 bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">To</label>
                  <input
                    type="date"
                    defaultValue="2025-02-20"
                    className="border border-border rounded-lg px-3 py-2 bg-background text-sm"
                  />
                </div>
                <div className="pt-5">
                  <Button size="sm" variant="outline">Filter</Button>
                </div>
              </div>

              {/* Logs table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted border-b border-border">
                    <tr className="text-left">
                      <th className="px-3 py-3 font-bold text-sm">Timestamp</th>
                      <th className="px-3 py-3 font-bold text-sm">Event</th>
                      <th className="px-3 py-3 font-bold text-sm">Message</th>
                      <th className="px-3 py-3 font-bold text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { ts: "2025-02-20 14:32:15", event: "Message Update",      message: "TRAIN APPROACHING - EXPECT DELAYS", status: "Success" },
                      { ts: "2025-02-20 14:30:00", event: "Status Check",        message: "Heartbeat received",                status: "Success" },
                      { ts: "2025-02-20 14:15:22", event: "Message Clear",       message: "CLEAR - NO DELAYS",                 status: "Success" },
                      { ts: "2025-02-20 13:45:10", event: "Connection Lost",     message: "Reconnecting...",                   status: "Warning" },
                      { ts: "2025-02-20 13:45:45", event: "Connection Restored", message: "Connected",                         status: "Success" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/50 transition">
                        <td className="py-3 font-mono text-xs">{row.ts}</td>
                        <td className="py-3">{row.event}</td>
                        <td className="py-3 text-muted-foreground">{row.message}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            row.status === "Success"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setShowDmsLogsModal({ open: false, dms: null })}>
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Set Beacon Location Modal */}
      {showSetLocationModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Set Beacon Location</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Set the location for beacon: <strong>{showSetLocationModal.beacon?.name}</strong>
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowSetLocationModal({ open: false, beacon: null })}>
                <X size={20} />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              {/* Map placeholder */}
              <div className="h-56 bg-muted rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2">
                <MapPin size={32} className="text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click on map to set location</p>
              </div>

              {/* Coordinate inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Latitude</label>
                  <input
                    type="text"
                    placeholder="30.3280"
                    defaultValue={showSetLocationModal.beacon?.lat ?? ""}
                    className="w-full border border-border rounded-lg px-3 py-2 bg-background text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Longitude</label>
                  <input
                    type="text"
                    placeholder="-81.6553"
                    defaultValue={showSetLocationModal.beacon?.long ?? ""}
                    className="w-full border border-border rounded-lg px-3 py-2 bg-background text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowSetLocationModal({ open: false, beacon: null })}>
                  Cancel
                </Button>
                <Button
                  className="bg-accent hover:bg-accent/90"
                  onClick={() => setShowSetLocationModal({ open: false, beacon: null })}
                >
                  Save Location
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </PortalLayout>
  )
}
