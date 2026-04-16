"use client"

import { useState } from "react"
import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Train } from "lucide-react"

// Simplified sensor location data
const sensorLocations = [
  { id: 1, lat: 25.7617, lng: -80.1918, customer: "Florida International University", sensors: 44, status: "active", city: "Miami, FL" },
  { id: 2, lat: 33.749, lng: -84.388, customer: "City Of Atlanta GA", sensors: 15, status: "active", city: "Atlanta, GA" },
  { id: 3, lat: 36.1627, lng: -86.7816, customer: "City Of Nashville TN", sensors: 8, status: "warning", city: "Nashville, TN" },
  { id: 4, lat: 42.3314, lng: -83.0458, customer: "County Of Macomb MI", sensors: 7, status: "active", city: "Detroit, MI" },
  { id: 5, lat: 41.8781, lng: -87.6298, customer: "City Of Chicago IL", sensors: 22, status: "active", city: "Chicago, IL" },
  { id: 6, lat: 39.0997, lng: -94.5786, customer: "City Of Kansas City MO", sensors: 5, status: "warning", city: "Kansas City, MO" },
  { id: 7, lat: 29.7604, lng: -95.3698, customer: "City Of Houston TX", sensors: 18, status: "active", city: "Houston, TX" },
  { id: 8, lat: 47.6062, lng: -122.3321, customer: "City Of Seattle WA", sensors: 3, status: "active", city: "Seattle, WA" },
]

const customers = [
  "All Customers",
  "Florida International University",
  "County Of Macomb MI",
  "City Of Nashville TN",
  "City Of Chicago IL",
  "City Of Atlanta GA",
  "City Of Houston TX",
  "City Of Seattle WA",
  "City Of Kansas City MO",
]

export default function DeploymentMapPage() {
  const [sensorFilter, setSensorFilter] = useState("all")
  const [customerFilter, setCustomerFilter] = useState("All Customers")
  const [selectedLocation, setSelectedLocation] = useState<typeof sensorLocations[0] | null>(null)

  const filteredLocations = sensorLocations.filter(loc => {
    const matchesStatus = sensorFilter === "all" || 
      (sensorFilter === "active" && loc.status === "active") ||
      (sensorFilter === "warning" && loc.status === "warning")
    const matchesCustomer = customerFilter === "All Customers" || loc.customer === customerFilter
    return matchesStatus && matchesCustomer
  })

  const totalSensors = filteredLocations.reduce((acc, loc) => acc + loc.sensors, 0)
  const activeCount = filteredLocations.filter(l => l.status === "active").length
  const warningCount = filteredLocations.filter(l => l.status === "warning").length

  // Convert lat/lng to approximate x/y positions on a US map (simplified)
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 125) / 60) * 100
    const y = ((50 - lat) / 25) * 100
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
  }

  return (
    <PortalLayout
      role="cse"
      title="Deployment Map"
      subtitle="View all sensor deployments across locations"
      activeHref="/portal/cse/deployment-map"
    >
      <div className="p-6 space-y-6">
        {/* Stats & Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Locations</p>
              <p className="text-2xl font-bold">{filteredLocations.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sensors</p>
              <p className="text-2xl font-bold">{totalSensors}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Needs Attention</p>
              <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <select 
              value={sensorFilter}
              onChange={(e) => setSensorFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
            >
              <option value="all">All Sensors</option>
              <option value="active">Active Only</option>
              <option value="warning">Needs Attention</option>
            </select>
            <select 
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
            >
              {customers.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Map Container */}
        <Card className="relative h-[500px] overflow-hidden bg-gray-200">
          {/* Simple US Map Background */}
          <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full">
            {/* Simplified US outline */}
            <path 
              d="M 15 15 L 25 12 L 35 14 L 45 12 L 55 14 L 65 12 L 75 14 L 85 16 L 88 20 L 90 28 L 88 35 L 85 40 L 80 42 L 75 45 L 70 44 L 65 46 L 60 45 L 55 47 L 50 45 L 45 47 L 40 45 L 35 46 L 30 44 L 25 45 L 20 42 L 15 40 L 12 35 L 10 28 L 12 20 Z"
              fill="#e5e7eb"
              stroke="#d1d5db"
              strokeWidth="0.5"
            />
          </svg>

          {/* Location Markers */}
          {filteredLocations.map(loc => {
            const pos = getPosition(loc.lat, loc.lng)
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 ${
                  selectedLocation?.id === loc.id ? 'scale-125 z-20' : ''
                }`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  loc.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                }`}>
                  <Train size={18} className="text-white" />
                  <span className="absolute -top-1 -right-1 bg-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow text-gray-800">
                    {loc.sensors}
                  </span>
                </div>
              </button>
            )
          })}

          {/* Selected Location Info */}
          {selectedLocation && (
            <Card className="absolute bottom-4 left-4 p-4 shadow-lg max-w-xs z-30 bg-background">
              <div className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 ${
                  selectedLocation.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{selectedLocation.customer}</h4>
                  <p className="text-xs text-muted-foreground">{selectedLocation.city}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span><strong>{selectedLocation.sensors}</strong> sensors</span>
                    <span className={`capitalize ${
                      selectedLocation.status === 'active' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {selectedLocation.status === 'active' ? 'Active' : 'Needs Attention'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Card>
      </div>
    </PortalLayout>
  )
}
