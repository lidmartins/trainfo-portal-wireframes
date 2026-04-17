"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Settings, MapPin, Plus, X, Eye, Monitor, Radio, Upload, KeyRound, RefreshCw, AlertTriangle, FileText, Navigation, ThumbsUp, Check, MapPinned, ChevronRight, ExternalLink } from "lucide-react"
import { useState } from "react"
import { TablePagination } from "@/components/ui/table-pagination"
import { useRouter } from "next/navigation"
import RightLeftIcon from "@/components/icons/RightLeftIcon"

const PAGE_SIZE = 15

export default function CustomerDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("crossings")
  const [crossingsPage, setCrossingsPage] = useState(1)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showOnboardModal, setShowOnboardModal] = useState(false)
  const [editingContact, setEditingContact] = useState(false)
  const [contactName, setContactName] = useState("John Smith")
  const [contactEmail, setContactEmail] = useState("john.smith@nftpo.org")
  const [contactNameDraft, setContactNameDraft] = useState("")
  const [contactEmailDraft, setContactEmailDraft] = useState("")
  const [onboardStep, setOnboardStep] = useState(1)
  const [searchMode, setSearchMode] = useState<"city" | "latlong">("city")
  const [selectedCountry, setSelectedCountry] = useState("United States")
  const [selectedState, setSelectedState] = useState("Florida")
  const [searchCity, setSearchCity] = useState("")
  const [searchLat, setSearchLat] = useState("")
  const [searchLong, setSearchLong] = useState("")
  const [selectedCrossings, setSelectedCrossings] = useState<string[]>([])
  const [informationType, setInformationType] = useState("Crossing Status")
  const [crossingType, setCrossingType] = useState("TRAINFO Sensor")
  const [isNoWarningSystem, setIsNoWarningSystem] = useState(false)
  const [noWarningLocation, setNoWarningLocation] = useState("")
  const [noWarningLat, setNoWarningLat] = useState("")
  const [noWarningLong, setNoWarningLong] = useState("")
  const [crossingSearch, setCrossingSearch] = useState("")
  
  // Map layer visibility toggles
  const [showTrainfoSensors, setShowTrainfoSensors] = useState(true)
  const [showDmsBoards, setShowDmsBoards] = useState(true)
  const [showBeacons, setShowBeacons] = useState(true)
  const [showFutureSensors, setShowFutureSensors] = useState(true)

  // Sample FRA crossings data for Florida
  const fraCrossings = [
    { id: "273062B", location: "Breakers Drive", city: "Jacksonville", lat: "30.138894", long: "-81.527566" },
    { id: "273057E", location: "Flagler Center Boulevard", city: "Jacksonville", lat: "30.139381", long: "-81.5181566" },
    { id: "272938M", location: "Kenan Drive", city: "Jacksonville", lat: "30.1394967", long: "-81.5239524" },
    { id: "271831G", location: "Race Track Rd", city: "Jacksonville", lat: "30.104647", long: "-81.479465" },
    { id: "271816E", location: "Atlantic Blvd", city: "Jacksonville", lat: "30.306632", long: "-81.649786" },
    { id: "621188U", location: "Soutel Dr", city: "Jacksonville", lat: "30.382568", long: "-81.737747" },
    { id: "271824W", location: "Sunbeam Rd", city: "Jacksonville", lat: "30.206077", long: "-81.57877" },
    { id: "271829F", location: "Greenland Rd", city: "Jacksonville", lat: "30.1645389", long: "-81.5399787" },
    { id: "620872B", location: "Heckscher Dr", city: "Jacksonville", lat: "30.3285", long: "-81.6558" },
    { id: "273099A", location: "Main Street", city: "Miami", lat: "25.7617", long: "-80.1918" },
    { id: "273100B", location: "Biscayne Blvd", city: "Miami", lat: "25.7839", long: "-80.1912" },
  ]

  const filteredCrossings = fraCrossings.filter(c => {
    const matchesSearch = crossingSearch === "" || 
      c.id.toLowerCase().includes(crossingSearch.toLowerCase()) ||
      c.location.toLowerCase().includes(crossingSearch.toLowerCase())
    const matchesCity = searchCity === "" || c.city.toLowerCase().includes(searchCity.toLowerCase())
    return matchesSearch && matchesCity
  })

  const toggleCrossingSelection = (id: string) => {
    setSelectedCrossings(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; type: 'decommission' | 'replace' | null; crossing: any }>({ open: false, type: null, crossing: null })
  const [confirmText, setConfirmText] = useState("")
  const [showDmsLogsModal, setShowDmsLogsModal] = useState(false)
  const [showSetLocationModal, setShowSetLocationModal] = useState<{ open: boolean; beacon: any }>({ open: false, beacon: null })
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null)
  const [editingLocationName, setEditingLocationName] = useState("")
  const [showShippingModal, setShowShippingModal] = useState(false)

  const [crossingsList, setCrossingsList] = useState([
    { id: "620872B", location: "Heckscher Dr", type: "Crossing Status", status: "Active", sensorId: "TAS2BCE03" },
    { id: "273062B", location: "Breakers Drive", type: "Crossing Status", status: "Active", sensorId: "341" },
    { id: "273057E", location: "Flagler Center Blvd", type: "Crossing Status", status: "Active", sensorId: "342" },
    { id: "272938M", location: "Kenan Drive", type: "Crossing Status", status: "Active", sensorId: "489" },
    { id: "271831G", location: "Race Track Rd", type: "Crossing Status", status: "Active", sensorId: "512" },
    { id: "271816E", location: "Atlantic Blvd", type: "Crossing Status", status: "Down", sensorId: "TAS3ACF01" },
    { id: "621188U", location: "Soutel Dr", type: "Crossing Status", status: "Active", sensorId: "TAS3ACF02" },
    { id: "271824W", location: "Sunbeam Rd", type: "Crossing Status", status: "Active", sensorId: "601" },
    { id: "271829F", location: "Greenland Rd", type: "Crossing Status", status: "Active", sensorId: "602" },
    { id: "273099A", location: "Main Street", type: "Crossing Status", status: "Active", sensorId: "778" },
    { id: "273100B", location: "Biscayne Blvd", type: "Crossing Status", status: "Active", sensorId: "779" },
    { id: "274011C", location: "Blanding Blvd", type: "Pre-emption", status: "Active", sensorId: "830" },
    { id: "274022D", location: "Collins Rd", type: "Pre-emption", status: "Active", sensorId: "831" },
    { id: "274033E", location: "Beach Blvd", type: "Crossing Status", status: "Down", sensorId: "TAS4BDE05" },
    { id: "274044F", location: "University Blvd", type: "Crossing Status", status: "Active", sensorId: "TAS4BDE06" },
    { id: "274055G", location: "Baymeadows Rd", type: "Pre-emption", status: "Active", sensorId: "944" },
    { id: "274066H", location: "San Jose Blvd", type: "Crossing Status", status: "Active", sensorId: "945" },
    { id: "274077J", location: "Philips Hwy", type: "Crossing Status", status: "Active", sensorId: "1023" },
    { id: "274088K", location: "Cassat Ave", type: "Pre-emption", status: "Active", sensorId: "1024" },
    { id: "274099L", location: "Monument Rd", type: "Crossing Status", status: "Active", sensorId: "1205" },
    { id: "274100M", location: "Merrill Rd", type: "Crossing Status", status: "Down", sensorId: "1206" },
    { id: "274111N", location: "Normandy Blvd", type: "Pre-emption", status: "Active", sensorId: "TAS5CEG07" },
  ])
  const crossings = crossingsList
  const crossingsTotalPages = Math.max(1, Math.ceil(crossings.length / PAGE_SIZE))
  const pagedCrossings = crossings.slice((crossingsPage - 1) * PAGE_SIZE, crossingsPage * PAGE_SIZE)

  const handleSaveLocationName = (crossingId: string) => {
    setCrossingsList(prev => prev.map(c => 
      c.id === crossingId ? { ...c, location: editingLocationName } : c
    ))
    setEditingLocationId(null)
    setEditingLocationName("")
  }

  const availableCrossings = [
    { id: "620873A", location: "Main St & Railway" },
    { id: "620874C", location: "Oak Ave Crossing" },
    { id: "620875D", location: "Industrial Park Access" },
  ]

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

  const customerName = "North Florida TPO"
  const hubspotUrl = "https://app.hubspot.com"

  const handleEditCrossing = (crossing: any) => {
    router.push(`/customers/127/crossings/${crossing.id}/configure`)
  }

  return (
    <PortalLayout role="cse" title="Customer Record" subtitle={customerName} activeHref="/portal/cse/customers">

      {/* ── Sticky page header: breadcrumb ── */}
      <div className="sticky top-16 z-10 bg-background border-b border-border">
        <div className="px-6 py-3">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <button
              className="hover:text-foreground transition"
              onClick={() => router.push("/portal/cse/customers")}
            >
              Customers
            </button>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{customerName}</span>
          </nav>

        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Customer Info Card */}
        <Card className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Customer ID</p>
              <p className="font-medium">127</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
              <a
                href={hubspotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-accent underline hover:text-accent/80 transition-colors"
              >
                North Florida TPO
                <ExternalLink size={13} />
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">License Activated</p>
                <p className="font-medium">02/21/2025</p>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent shrink-0" onClick={() => setShowShippingModal(true)}>
                <Edit size={14} className="mr-2" />
                Edit Customer
              </Button>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Province/State</p>
              <p className="font-medium">Florida</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Support Contact</p>
              {editingContact ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={contactNameDraft}
                    onChange={(e) => setContactNameDraft(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-border rounded-md bg-muted focus:outline-none focus:border-accent"
                  />
                  <input
                    type="text"
                    value={contactEmailDraft}
                    onChange={(e) => setContactEmailDraft(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-border rounded-md bg-muted focus:outline-none focus:border-accent"
                  />
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => { setContactName(contactNameDraft); setContactEmail(contactEmailDraft); setEditingContact(false) }}
                      className="hover:opacity-80 transition"
                    >
                      <Check size={16} className="text-green-600" />
                    </button>
                    <button
                      onClick={() => setEditingContact(false)}
                      className="hover:opacity-80 transition"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-1 group">
                  <div>
                    <p className="font-medium">{contactName}</p>
                    <p className="text-xs text-muted-foreground">{contactEmail}</p>
                  </div>
                  <button
                    onClick={() => { setContactNameDraft(contactName); setContactEmailDraft(contactEmail); setEditingContact(true) }}
                    className="mt-0.5 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Edit size={13} className="text-accent" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Shipping Address</h3>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="font-medium">North Florida TPO</p>
              <p className="text-sm text-muted-foreground">980 N Jefferson St, Suite 200</p>
              <p className="text-sm text-muted-foreground">Jacksonville, FL 32209</p>
              <p className="text-sm text-muted-foreground">United States</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            {/* CSE action buttons */}
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-accent hover:bg-accent/90">
                <a href="/portal/cse/customer-preview/127" target="_blank" rel="noopener noreferrer">
                  <Eye size={18} className="mr-2" />
                  View Customer Portal
                </a>
              </Button>
              <Button variant="outline" onClick={() => setShowReportModal(true)}>
                <Upload size={18} className="mr-2" />
                Generate Response Intelligence
              </Button>
              <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
                <KeyRound size={18} className="mr-2" />
                Reset Customer Password
              </Button>
              <Button variant="outline" onClick={() => setShowOnboardModal(true)}>
                <Plus size={18} className="mr-2" />
                Onboard Crossing
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Customer management tools - portal preview, report generation, password reset, and crossing onboarding
            </p>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {[
            { id: "map", label: "Map" },
            { id: "crossings", label: "Crossing of Interest" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Map Tab Content */}
        {activeTab === "map" && (
          <Card className="p-6 space-y-6">
            <div className="flex">
              {/* Layer Controls Sidebar */}
              <div className="w-72 border-r border-border pr-4 space-y-1">
                {/* TRAINFO Sensors Layer */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30">
                    <input 
                      type="checkbox" 
                      checked={showTrainfoSensors} 
                      onChange={(e) => setShowTrainfoSensors(e.target.checked)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="font-medium">TRAINFO Sensors</span>
                  </label>
                  <div className="px-3 pb-3 pl-10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-[#8B0000] flex items-center justify-center">
                        <Radio size={10} className="text-white" />
                      </div>
                      <span>All items (1)</span>
                    </div>
                  </div>
                </div>

                {/* DMS Boards Layer */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30">
                    <input 
                      type="checkbox" 
                      checked={showDmsBoards} 
                      onChange={(e) => setShowDmsBoards(e.target.checked)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="font-medium">DMS Boards</span>
                  </label>
                  <div className="px-3 pb-3 pl-10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded bg-green-600 flex items-center justify-center">
                        <Monitor size={10} className="text-white" />
                      </div>
                      <span>All items (0)</span>
                    </div>
                  </div>
                </div>

                {/* Beacons Layer */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30">
                    <input 
                      type="checkbox" 
                      checked={showBeacons} 
                      onChange={(e) => setShowBeacons(e.target.checked)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="font-medium">Beacons</span>
                  </label>
                  <div className="px-3 pb-3 pl-10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-5 h-5 bg-yellow-500 rotate-45 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full -rotate-45" />
                      </div>
                      <span>All items (0)</span>
                    </div>
                  </div>
                </div>

                {/* Future Sensors Layer */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30">
                    <input 
                      type="checkbox" 
                      checked={showFutureSensors} 
                      onChange={(e) => setShowFutureSensors(e.target.checked)}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="font-medium">Future Sensors</span>
                  </label>
                  <div className="px-3 pb-3 pl-10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
                        <Plus size={10} className="text-gray-400" />
                      </div>
                      <span>All items (0)</span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">LEGEND</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#8B0000]" />
                      <span>TRAINFO Sensor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-600" />
                      <span>DMS Board</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rotate-45" />
                      <span>Beacon</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-dashed border-gray-400" />
                      <span>Future Sensor</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Area */}
              <div className="flex-1 pl-4">
                <div className="h-[500px] bg-[#e8e4d9] rounded-lg relative overflow-hidden">
                  {/* Simulated map background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-0 right-0 h-1 bg-blue-400" />
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400" />
                    <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-gray-400" />
                    <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gray-400" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400" />
                    <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gray-400" />
                  </div>
                  
                  {/* Railroad line */}
                  <div className="absolute top-20 left-10 right-20 h-1 bg-black transform rotate-3" />
                  
                  {/* TRAINFO Sensor markers */}
                  {showTrainfoSensors && crossings.map((crossing, i) => (
                    <div 
                      key={crossing.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition group"
                      style={{ top: `${80 + (i * 30)}px`, left: `${150 + (i * 100)}px` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#8B0000] flex items-center justify-center shadow-lg border-2 border-white">
                        <Radio size={14} className="text-white" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition z-10">
                        {crossing.location}
                      </div>
                    </div>
                  ))}

                  {/* Map controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="bg-white w-8 h-8 p-0">+</Button>
                    <Button size="sm" variant="outline" className="bg-white w-8 h-8 p-0">-</Button>
                  </div>

                  {/* City label */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <p className="text-lg font-semibold text-gray-600">Jacksonville</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Summary */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 border-l-4 border-l-[#8B0000]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B0000] flex items-center justify-center">
                    <Radio size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{crossings.length}</p>
                    <p className="text-sm text-muted-foreground">TRAINFO Sensors</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-l-green-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center">
                    <Monitor size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">DMS Boards</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-l-yellow-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rotate-45 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full -rotate-45" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Beacons</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-l-gray-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
                    <Plus size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Future Sensors</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Crossings List */}
            <Card className="p-4">
              <h3 className="font-bold mb-4">Equipment Locations</h3>
              <div className="space-y-2">
                {crossings.map((crossing) => (
                  <div
                    key={crossing.id}
                    className="p-3 border border-border rounded-lg hover:border-accent transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#8B0000] flex items-center justify-center">
                          <Radio size={14} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{crossing.location}</h4>
                          <p className="text-sm text-muted-foreground">FRA ID: {crossing.id} | Sensor: {crossing.sensorId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">TRAINFO Sensor</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {crossing.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Card>
        )}

        {/* Crossings Tab Content */}
        {activeTab === "crossings" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Total Crossing of Interest: 1 - (1 Active)</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="pb-3 font-bold text-sm">Crossing ID</th>
                    <th className="pb-3 font-bold text-sm">Sensor ID</th>
                    <th className="pb-3 font-bold text-sm">Location</th>
                    <th className="pb-3 font-bold text-sm">Information Type</th>
                    <th className="pb-3 font-bold text-sm">Status</th>
                    <th className="pb-3 font-bold text-sm text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedCrossings.map((crossing) => (
                    <tr key={crossing.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="py-4 font-medium text-accent">{crossing.id}</td>
                      <td className="py-4 font-mono text-sm">{crossing.sensorId}</td>
                      <td className="py-4">
                        {editingLocationId === crossing.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editingLocationName}
                              onChange={(e) => setEditingLocationName(e.target.value)}
                              className="px-2 py-1 border border-border rounded bg-background focus:outline-none focus:border-accent w-40"
                              autoFocus
                            />
                            <Button size="sm" variant="ghost" className="hover:bg-green-100 text-green-600" onClick={() => handleSaveLocationName(crossing.id)}>
                              <Check size={16} />
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-muted" onClick={() => setEditingLocationId(null)}>
                              <X size={16} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group">
                            <span>{crossing.location}</span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="opacity-0 group-hover:opacity-100 transition hover:bg-accent/10 text-accent h-6 w-6 p-0"
                              onClick={() => {
                                setEditingLocationId(crossing.id)
                                setEditingLocationName(crossing.location)
                              }}
                            >
                              <Edit size={12} />
                            </Button>
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-muted-foreground">{crossing.type}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {crossing.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-accent/10 text-accent"
                            title="Configure Crossing"
                            onClick={() => handleEditCrossing(crossing)}
                          >
                            <Settings size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-blue-100 text-blue-600"
                            title="Replace Sensor"
                            onClick={() => {
                              setConfirmModal({ open: true, type: 'replace', crossing })
                              setConfirmText("")
                            }}
                          >
                            <RightLeftIcon width={16} height={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="hover:bg-orange-100 text-orange-600"
                            title="Decommission Crossing"
                            onClick={() => {
                              setConfirmModal({ open: true, type: 'decommission', crossing })
                              setConfirmText("")
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TablePagination currentPage={crossingsPage} totalPages={crossingsTotalPages} onPageChange={setCrossingsPage} />
          </Card>
        )}


        {/* Response Intelligence Report Upload Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Generate Response Intelligence Report</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowReportModal(false)}>
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload a CSV file containing responder interaction data to generate a Response Intelligence report
                      for <span className="font-semibold text-foreground">North Florida TPO</span>.
                    </p>
                  </div>

                  <Card className="p-8 bg-muted/30 border-2 border-dashed border-border hover:border-accent transition cursor-pointer">
                    <div className="text-center">
                      <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="font-medium mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">CSV files only (Max 10MB)</p>
                      <input type="file" accept=".csv" className="hidden" id="csv-upload" />
                      <label htmlFor="csv-upload" className="cursor-pointer">
                        <Button variant="outline" className="mt-4 bg-transparent" asChild>
                          <span>Browse Files</span>
                        </Button>
                      </label>
                    </div>
                  </Card>

                  <div className="space-y-3">
                    <h3 className="font-medium text-sm">CSV Format Requirements:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>
                        Required columns: Responder ID, Crossing ID, Origin, Destination, Timestamp, Delay (seconds)
                      </li>
                      <li>Date format: YYYY-MM-DD HH:MM:SS</li>
                      <li>File must include header row</li>
                    </ul>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setShowReportModal(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90">
                      <Upload size={16} className="mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Reset Customer Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Reset Customer Password</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowPasswordModal(false)}>
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Warning:</strong> This will reset the password for all admin users of North Florida TPO.
                      They will receive an email with password reset instructions.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Customer Name</label>
                    <input
                      type="text"
                      value="North Florida TPO"
                      disabled
                      className="w-full border border-border rounded-lg p-3 bg-muted text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Customer ID</label>
                    <input
                      type="text"
                      value="127"
                      disabled
                      className="w-full border border-border rounded-lg p-3 bg-muted text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Admin Email</label>
                    <input
                      type="email"
                      placeholder="admin@nftpo.com"
                      className="w-full border border-border rounded-lg p-3 bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Password reset link will be sent to this email</p>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90">
                      <KeyRound size={16} className="mr-2" />
                      Send Reset Link
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Onboard Crossing Modal */}
        {showOnboardModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
              {/* Sticky Header */}
              <div className="flex-shrink-0 px-6 pt-6 pb-0 border-b border-border bg-background">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Onboard Crossing</h2>
                  <Button variant="ghost" size="sm" onClick={() => { setShowOnboardModal(false); setOnboardStep(1); setSelectedCrossings([]); }}>
                    <X size={20} />
                  </Button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${onboardStep === 1 ? "bg-accent text-white" : "bg-muted text-muted-foreground"}`}>
                      1
                    </div>
                    <div className="w-32 h-1 bg-muted"></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${onboardStep === 2 ? "bg-accent text-white" : "bg-muted text-muted-foreground"}`}>
                      2
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className={`font-bold text-lg ${onboardStep === 1 ? "" : "text-muted-foreground"}`}>
                    {onboardStep === 1 ? "Select Crossing" : "Select Crossing"}
                  </h3>
                  <h3 className={`font-bold text-lg ${onboardStep === 2 ? "" : "text-muted-foreground"}`}>
                    {onboardStep === 2 ? "Add Information Type" : ""}
                  </h3>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6">

                {/* Step 1: Select Crossing */}
                {onboardStep === 1 && (
                  <div className="space-y-6">
                    {/* No Warning System Toggle */}
                    <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div>
                        <p className="font-medium">Manual Crossing</p>
                        <p className="text-sm text-muted-foreground">Enable this to add a crossing without an FRA Crossing ID</p>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isNoWarningSystem} 
                          onChange={(e) => setIsNoWarningSystem(e.target.checked)}
                          className="w-5 h-5 accent-accent"
                        />
                      </label>
                    </div>

                    {/* No Warning System Form */}
                    {isNoWarningSystem ? (
                      <Card className="p-6 border-accent/30">
                        <h4 className="font-medium mb-4">Enter Crossing Details Manually</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                              Crossing Location Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={noWarningLocation}
                              onChange={(e) => setNoWarningLocation(e.target.value)}
                              placeholder="e.g., Main Street & Railroad Ave"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Latitude <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={noWarningLat}
                              onChange={(e) => setNoWarningLat(e.target.value)}
                              placeholder="e.g., 30.3285"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Longitude <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={noWarningLong}
                              onChange={(e) => setNoWarningLong(e.target.value)}
                              placeholder="e.g., -81.6558"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={selectedCountry}
                              onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                              <option>United States</option>
                              <option>Canada</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Province / State <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={selectedState}
                              onChange={(e) => setSelectedState(e.target.value)}
                            >
                              <option>Florida</option>
                              <option>Michigan</option>
                              <option>Tennessee</option>
                              <option>Alabama</option>
                              <option>Arkansas</option>
                            </select>
                          </div>
                        </div>
                      </Card>
                    ) : (
                    <>
                    {/* Filters */}
                    <Card className="p-6 border-accent/30">
                      {/* Search Mode Toggle */}
                      <div className="flex justify-end mb-4">
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="searchMode" 
                              checked={searchMode === "latlong"} 
                              onChange={() => setSearchMode("latlong")}
                              className="accent-accent"
                            />
                            <span className="text-sm">Lat / Long</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="searchMode" 
                              checked={searchMode === "city"} 
                              onChange={() => setSearchMode("city")}
                              className="accent-accent"
                            />
                            <span className="text-sm">City</span>
                          </label>
                        </div>
                      </div>

                      {searchMode === "city" ? (
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={selectedCountry}
                              onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                              <option>United States</option>
                              <option>Canada</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Province / State <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={selectedState}
                              onChange={(e) => setSelectedState(e.target.value)}
                            >
                              <option>Florida</option>
                              <option>Michigan</option>
                              <option>Tennessee</option>
                              <option>Alabama</option>
                              <option>Arkansas</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={searchCity}
                              onChange={(e) => setSearchCity(e.target.value)}
                              placeholder="Jacksonville"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-4 gap-4 items-end">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={selectedCountry}
                              onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                              <option>United States</option>
                              <option>Canada</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Province / State <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={selectedState}
                              onChange={(e) => setSelectedState(e.target.value)}
                            >
                              <option>Florida</option>
                              <option>Michigan</option>
                              <option>Tennessee</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Latitude</label>
                            <input
                              type="text"
                              className="w-full border border-border rounded-lg p-2.5 bg-background"
                              value={searchLat}
                              onChange={(e) => setSearchLat(e.target.value)}
                              placeholder="Set Latitude"
                            />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-2">Longitude</label>
                              <input
                                type="text"
                                className="w-full border border-border rounded-lg p-2.5 bg-background"
                                value={searchLong}
                                onChange={(e) => setSearchLong(e.target.value)}
                                placeholder="Set Longitude"
                              />
                            </div>
                            <Button className="bg-accent hover:bg-accent/90 self-end">
                              Search
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card>

                    {/* Crossings Table */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-medium">Total Crossings: {filteredCrossings.length}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Search:</span>
                          <input
                            type="text"
                            placeholder="Search here..."
                            value={crossingSearch}
                            onChange={(e) => setCrossingSearch(e.target.value)}
                            className="border border-border rounded-lg px-3 py-2 w-48"
                          />
                        </div>
                      </div>

                      <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr className="text-left text-accent">
                              <th className="p-3 w-10"></th>
                              <th className="p-3 font-bold text-sm">Crossing ID</th>
                              <th className="p-3 font-bold text-sm">Crossing Location</th>
                              <th className="p-3 font-bold text-sm">City</th>
                              <th className="p-3 font-bold text-sm">Latitude</th>
                              <th className="p-3 font-bold text-sm">Longitude</th>
                              <th className="p-3 font-bold text-sm text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCrossings.length > 0 ? (
                              filteredCrossings.map((crossing, i) => (
                                <tr key={crossing.id} className={`border-t border-border hover:bg-muted/30 ${i % 2 === 0 ? "bg-muted/10" : ""}`}>
                                  <td className="p-3">
                                    <input 
                                      type="checkbox" 
                                      checked={selectedCrossings.includes(crossing.id)}
                                      onChange={() => toggleCrossingSelection(crossing.id)}
                                      className="accent-accent w-4 h-4"
                                    />
                                  </td>
                                  <td className="p-3 font-medium">{crossing.id}</td>
                                  <td className="p-3">{crossing.location}</td>
                                  <td className="p-3">{crossing.city}</td>
                                  <td className="p-3 font-mono text-sm">{crossing.lat}</td>
                                  <td className="p-3 font-mono text-sm">{crossing.long}</td>
                                  <td className="p-3 text-center">
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className={`${selectedCrossings.includes(crossing.id) ? "text-green-600" : "text-accent hover:text-accent/80"}`}
                                      onClick={() => toggleCrossingSelection(crossing.id)}
                                    >
                                      <ThumbsUp size={20} />
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                  No Data
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {selectedCrossings.length > 0 && (
                        <p className="mt-2 text-sm text-accent font-medium">{selectedCrossings.length} crossing(s) selected</p>
                      )}
                    </div>
                    </>
                    )}

                  </div>
                )}

                {/* Step 2: Add Information Type */}
                {onboardStep === 2 && (
                  <div className="space-y-6">
                    <Card className="p-6 border-accent/30">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Information Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full border border-border rounded-lg p-2.5 bg-background"
                            value={informationType}
                            onChange={(e) => setInformationType(e.target.value)}
                          >
                            <option>Crossing Status</option>
                            <option>Crossing Prediction</option>
                            <option>Congestion Analytics</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Crossing Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full border border-border rounded-lg p-2.5 bg-background"
                            value={crossingType}
                            onChange={(e) => setCrossingType(e.target.value)}
                          >
                            <option>TRAINFO Sensor</option>
                            <option>Interpolated Crossing</option>
                            <option>Virtual Crossing</option>
                          </select>
                        </div>
                      </div>
                    </Card>

                    {/* Selected Crossings Table */}
                    <div>
                      <p className="font-medium mb-4">Total Crossings: {isNoWarningSystem ? 1 : selectedCrossings.length}</p>
                      <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr className="text-left text-accent">
                              <th className="p-3 font-bold text-sm">Crossing ID</th>
                              <th className="p-3 font-bold text-sm">Crossing Location</th>
                              <th className="p-3 font-bold text-sm">Latitude</th>
                              <th className="p-3 font-bold text-sm">Longitude</th>
                              <th className="p-3 font-bold text-sm text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {isNoWarningSystem ? (
                              <tr className="border-t border-border bg-muted/10">
                                <td className="p-3 font-medium">
                                  <span className="text-amber-600 italic">No Warning System</span>
                                </td>
                                <td className="p-3">{noWarningLocation}</td>
                                <td className="p-3 font-mono text-sm">{noWarningLat}</td>
                                <td className="p-3 font-mono text-sm">{noWarningLong}</td>
                                <td className="p-3 text-center">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-orange-600 hover:bg-orange-100"
                                    onClick={() => setOnboardStep(1)}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                </td>
                              </tr>
                            ) : (
                              selectedCrossings.map((id, i) => {
                                const crossing = fraCrossings.find(c => c.id === id)
                                if (!crossing) return null
                                return (
                                  <tr key={id} className={`border-t border-border ${i % 2 === 0 ? "bg-muted/10" : ""}`}>
                                    <td className="p-3 font-medium">{crossing.id}</td>
                                    <td className="p-3">{crossing.location}</td>
                                    <td className="p-3 font-mono text-sm">{crossing.lat}</td>
                                    <td className="p-3 font-mono text-sm">{crossing.long}</td>
                                    <td className="p-3 text-center">
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="text-orange-600 hover:bg-orange-100"
                                        onClick={() => toggleCrossingSelection(id)}
                                      >
                                        <X size={20} />
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              })
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination - only show for multiple crossings */}
                      {!isNoWarningSystem && selectedCrossings.length > 10 && (
                        <div className="flex items-center justify-center gap-2 mt-4">
                          <Button variant="outline" size="sm" className="bg-transparent text-accent">First</Button>
                          <Button variant="outline" size="sm" className="bg-transparent">←</Button>
                          <Button size="sm" className="bg-accent text-white">1</Button>
                          <Button variant="outline" size="sm" className="bg-transparent">→</Button>
                          <Button variant="outline" size="sm" className="bg-transparent text-accent">Last</Button>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>

              {/* Sticky Footer */}
              <div className="flex-shrink-0 px-6 py-4 border-t border-border bg-background flex justify-end gap-3">
                {onboardStep === 1 ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => { setShowOnboardModal(false); setOnboardStep(1); setSelectedCrossings([]); setIsNoWarningSystem(false); }}
                    >
                      Close
                    </Button>
                    <Button
                      className="bg-accent hover:bg-accent/90"
                      disabled={isNoWarningSystem ? (!noWarningLocation || !noWarningLat || !noWarningLong) : selectedCrossings.length === 0}
                      onClick={() => setOnboardStep(2)}
                    >
                      Next
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="bg-muted" onClick={() => setOnboardStep(1)}>
                      Back
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90">
                      Save
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Crossing Decommission/Replace Confirmation Modal */}
        {confirmModal.open && confirmModal.crossing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${confirmModal.type === 'decommission' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                      {confirmModal.type === 'decommission' ? (
                        <AlertTriangle size={20} className="text-orange-600" />
                      ) : (
                        <RightLeftIcon width={20} height={20} className="text-blue-600" />
                      )}
                    </div>
                    <h2 className="text-xl font-bold">
                      {confirmModal.type === 'decommission' ? 'Decommission' : 'Replace Sensor'} - {confirmModal.crossing.id}
                    </h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmModal({ open: false, type: null, crossing: null })}>
                    <X size={20} />
                  </Button>
                </div>

                {confirmModal.type === 'decommission' ? (
                  <>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-orange-800">
                        <strong>Warning:</strong> Decommissioning this crossing will disable the sensor and stop all data collection. Historical data will be preserved.
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      To confirm, please type the crossing ID <strong>{confirmModal.crossing.id}</strong> below:
                    </p>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Replacing the sensor will require recalibration. The new sensor will be associated with this crossing.
                      </p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">New Sensor ID</label>
                      <input type="text" placeholder="Enter new sensor ID" className="w-full border border-border rounded-lg p-3 bg-background" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      To confirm, please type the crossing ID <strong>{confirmModal.crossing.id}</strong> below:
                    </p>
                  </>
                )}

                <input
                  type="text"
                  placeholder="Type crossing ID to confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent mb-4"
                />

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setConfirmModal({ open: false, type: null, crossing: null })}>
                    Cancel
                  </Button>
                  <Button
                    className={`flex-1 ${confirmModal.type === 'decommission' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    disabled={confirmText !== confirmModal.crossing.id}
                  >
                    {confirmModal.type === 'decommission' ? 'Decommission' : 'Replace Sensor'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* DMS Logs Modal */}
        {showDmsLogsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">DMS Logs - North Approach DMS</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowDmsLogsModal(false)}>
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input type="date" className="border border-border rounded-lg p-2 bg-background" />
                    <input type="date" className="border border-border rounded-lg p-2 bg-background" />
                    <Button variant="outline" className="bg-transparent">Filter</Button>
                  </div>

                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-3 text-left font-bold">Timestamp</th>
                          <th className="p-3 text-left font-bold">Event</th>
                          <th className="p-3 text-left font-bold">Message</th>
                          <th className="p-3 text-left font-bold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { time: "2025-02-20 14:32:15", event: "Message Update", message: "TRAIN APPROACHING - EXPECT DELAYS", status: "Success" },
                          { time: "2025-02-20 14:30:00", event: "Status Check", message: "Heartbeat received", status: "Success" },
                          { time: "2025-02-20 14:15:22", event: "Message Clear", message: "CLEAR - NO DELAYS", status: "Success" },
                          { time: "2025-02-20 13:45:10", event: "Connection Lost", message: "Reconnecting...", status: "Warning" },
                          { time: "2025-02-20 13:45:45", event: "Connection Restored", message: "Connected", status: "Success" },
                        ].map((log, i) => (
                          <tr key={i} className="border-t border-border">
                            <td className="p-3 font-mono text-xs">{log.time}</td>
                            <td className="p-3">{log.event}</td>
                            <td className="p-3 text-muted-foreground">{log.message}</td>
                            <td className="p-3">
                              <span className={`text-xs px-2 py-1 rounded-full ${log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="outline" onClick={() => setShowDmsLogsModal(false)}>Close</Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Set Beacon Location Modal */}
        {showSetLocationModal.open && showSetLocationModal.beacon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Set Beacon Location</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowSetLocationModal({ open: false, beacon: null })}>
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Set the location for beacon: <strong>{showSetLocationModal.beacon.name}</strong>
                  </p>

                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center">
                      <MapPin size={32} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click on map to set location</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Latitude</label>
                      <input 
                        type="text" 
                        defaultValue={showSetLocationModal.beacon.lat}
                        className="w-full border border-border rounded-lg p-3 bg-background" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Longitude</label>
                      <input 
                        type="text" 
                        defaultValue={showSetLocationModal.beacon.long}
                        className="w-full border border-border rounded-lg p-3 bg-background" 
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setShowSetLocationModal({ open: false, beacon: null })}>Cancel</Button>
                    <Button className="bg-accent hover:bg-accent/90">Save Location</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Edit Shipping Address Modal */}
        {showShippingModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <MapPinned size={20} className="text-accent" />
                    </div>
                    <h2 className="text-xl font-bold">Edit Customer</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowShippingModal(false)}>
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Customer Name</label>
                    <input
                      type="text"
                      defaultValue="North Florida TPO"
                      className="w-full border border-border rounded-lg p-3 bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Support Contact Name</label>
                    <input
                      type="text"
                      defaultValue="John Smith"
                      className="w-full border border-border rounded-lg p-3 bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Support Contact Email</label>
                    <input
                      type="email"
                      defaultValue="john.smith@nftpo.org"
                      className="w-full border border-border rounded-lg p-3 bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      defaultValue="North Florida TPO"
                      className="w-full border border-border rounded-lg p-3 bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Street Address</label>
                    <input
                      type="text"
                      defaultValue="980 N Jefferson St, Suite 200"
                      className="w-full border border-border rounded-lg p-3 bg-background"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        defaultValue="Jacksonville"
                        className="w-full border border-border rounded-lg p-3 bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State/Province</label>
                      <input
                        type="text"
                        defaultValue="FL"
                        className="w-full border border-border rounded-lg p-3 bg-background"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        defaultValue="32209"
                        className="w-full border border-border rounded-lg p-3 bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country</label>
                      <select className="w-full border border-border rounded-lg p-3 bg-background">
                        <option>United States</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                  <Button variant="outline" onClick={() => setShowShippingModal(false)}>Cancel</Button>
                  <Button className="bg-accent hover:bg-accent/90" onClick={() => setShowShippingModal(false)}>Save Customer</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* ── Sticky bottom action bar ── */}
      <div className="sticky bottom-0 z-10 bg-background border-t border-border px-6 py-4">
        <Button variant="outline" onClick={() => router.push("/portal/cse/customers")}>
          ← Back to Customers
        </Button>
      </div>

    </PortalLayout>
  )
}
