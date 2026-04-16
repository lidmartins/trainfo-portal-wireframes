"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Activity, AlertTriangle, X, ThumbsUp, TrendingUp, TrendingDown, ChevronRight, Wrench, Info, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CSESuperuserDashboard() {
  const [showOnboardModal, setShowOnboardModal] = useState(false)
  const [modalStep, setModalStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState("United States")
  const [selectedState, setSelectedState] = useState("Michigan")
  const [selectedCity, setSelectedCity] = useState("Mount Clemens")
  const [showUptimeModal, setShowUptimeModal] = useState(false)
  const [showCrossingsModal, setShowCrossingsModal] = useState(false)

  // Crossings data by customer (Total crossings > sensors because some are projected/future)
  const crossingsByCustomer = [
    { customer: "Florida International University", sensors: 44, crossings: 52 },
    { customer: "County Of Macomb MI", sensors: 7, crossings: 12 },
    { customer: "City Of Nashville TN", sensors: 2, crossings: 5 },
    { customer: "North Florida TPO", sensors: 1, crossings: 3 },
    { customer: "City Of Alabaster AL", sensors: 2, crossings: 4 },
    { customer: "City Of Little Rock AR", sensors: 2, crossings: 6 },
  ]
  const totalSensors = 383
  const totalCrossings = 456
  const projectedCrossings = totalCrossings - totalSensors

  const fraCrossings = [
    { id: "284080E", location: "Groesbeck Hwy", lat: "42.58508", long: "-82.90289" },
    { id: "284101V", location: "Hall Road", lat: "42.630382", long: "-82.869981" },
    { id: "284085N", location: "Cass Ave", lat: "42.59821", long: "-82.89291" },
    { id: "284081L", location: "Harrington Ave", lat: "42.58744", long: "-82.90109" },
    { id: "284103J", location: "21 Mile Rd", lat: "42.64476", long: "-82.85996" },
    { id: "284090K", location: "Elizabeth Rd", lat: "42.61258", long: "-82.88246" },
    { id: "284098P", location: "North Ave", lat: "42.61685", long: "-82.87946" },
  ]

  // Down sensors data by customer
  const downSensors = [
    {
      customer: "Florida International University",
      sensors: [
        { crossingId: "620872B", sensorId: "TAS25564A", location: "Beaver & edgewood", downSince: "3 days ago" },
        { crossingId: "620873C", sensorId: "TAS25565B", location: "Mcduff & beaver", downSince: "7 days ago" },
      ]
    },
    {
      customer: "County Of Macomb Mi",
      sensors: [
        { crossingId: "284091M", sensorId: "TAS28401C", location: "Metro Pkwy", downSince: "1 day ago" },
      ]
    },
  ]

  const totalDownSensors = downSensors.reduce((acc, c) => acc + c.sensors.length, 0)

  // Calibration data by customer
  const calibrationNeeds = [
    { 
      customer: "Florida International University", 
      crossings: [
        { crossingId: "620874D", sensorId: "TAS25566C", name: "Heckscher Dr", lastCalibration: "45 days ago" },
        { crossingId: "620875E", sensorId: "TAS25567D", name: "University Blvd", lastCalibration: "32 days ago" },
      ]
    },
    { 
      customer: "County Of Macomb Mi", 
      crossings: [
        { crossingId: "284080E", sensorId: "TAS28400A", name: "Groesbeck Hwy", lastCalibration: "60 days ago" },
      ]
    },
    { 
      customer: "City Of Nashville Tn", 
      crossings: [
        { crossingId: "NSH001A", sensorId: "TAS31001A", name: "Broadway Crossing", lastCalibration: "28 days ago" },
        { crossingId: "NSH002B", sensorId: "TAS31002B", name: "Music Row", lastCalibration: "35 days ago" },
      ]
    },
  ]

  const totalCalibrationNeeded = calibrationNeeds.reduce((acc, c) => acc + c.crossings.length, 0)

  return (
    <PortalLayout
      role="cse"
      title="CSE Dashboard"
      subtitle="System-wide oversight and customer management"
      activeHref="/portal/dashboards/cse-superuser"
    >
      <div className="p-6 space-y-6">
        {/* Compact KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Total Sensors */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Server size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalSensors}</p>
                  <p className="text-xs text-muted-foreground">Total Sensors</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp size={14} />
                <span className="text-xs font-medium">+12</span>
              </div>
            </div>
          </Card>

          {/* Total Crossings - Clickable */}
          <Card 
            className="p-4 cursor-pointer hover:border-accent transition-colors"
            onClick={() => setShowCrossingsModal(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCrossings}</p>
                  <p className="text-xs text-muted-foreground">Total Crossings</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp size={14} />
                <span className="text-xs font-medium">+8</span>
              </div>
            </div>
            <p className="text-xs text-accent mt-2 flex items-center gap-1">
              {projectedCrossings} Projected Crossings <ChevronRight size={12} />
            </p>
          </Card>

          {/* Sensor Uptime - Clickable */}
          <Card 
            className="p-4 cursor-pointer hover:border-accent transition-colors"
            onClick={() => setShowUptimeModal(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">95.4%</p>
                  <p className="text-xs text-muted-foreground">Sensor Uptime</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp size={14} />
                <span className="text-xs font-medium">+0.3%</span>
              </div>
            </div>
            <p className="text-xs text-accent mt-2 flex items-center gap-1">
              View Sensor Uptime <ChevronRight size={12} />
            </p>
          </Card>

          {/* Sensors Impacted by Outage - Clickable */}
          <Link href="/portal/cse/sensors?filter=down">
            <Card className="p-4 cursor-pointer hover:border-accent transition-colors h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle size={18} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">4.6%</p>
                    <p className="text-xs text-muted-foreground">Sensors Impacted</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <TrendingDown size={14} />
                  <span className="text-xs font-medium">+2</span>
                </div>
              </div>
              <p className="text-xs text-accent mt-2 flex items-center gap-1">
                View 18 sensors <ChevronRight size={12} />
              </p>
            </Card>
          </Link>
        </div>

        {/* Action Items Row - Sensors Down & Calibration Needed */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sensors Down */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold">Sensors Down</h3>
                  <p className="text-xs text-muted-foreground">{totalDownSensors} sensors across {downSensors.length} customers need attention</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="/portal/cse/sensors?filter=down">View All</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {downSensors.map((customer, i) => (
                <div key={i} className="border border-red-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 flex items-center justify-between bg-red-50 border-b border-red-200">
                    <p className="font-semibold text-sm text-red-900">{customer.customer}</p>
                    <span className="text-xs text-red-600 font-medium bg-red-100 px-2 py-0.5 rounded-full">
                      {customer.sensors.length} down
                    </span>
                  </div>
                  <div className="divide-y divide-red-100 bg-white">
                    {customer.sensors.map((sensor, j) => (
                      <div key={j} className="px-4 py-3 flex items-center justify-between hover:bg-red-50/50 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{sensor.location}</p>
                            <p className="text-xs text-muted-foreground font-mono">{sensor.crossingId} - {sensor.sensorId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-red-600 font-medium">{sensor.downSince}</span>
                          <Button size="sm" variant="outline" className="bg-white text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400">
                            Investigate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Calibration Needs */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Wrench size={16} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold">Calibration Needed</h3>
                  <p className="text-xs text-muted-foreground">{totalCalibrationNeeded} crossings across {calibrationNeeds.length} customers</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="/portal/cse/sensors">View All</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {calibrationNeeds.map((customer, i) => (
                <div key={i} className="border border-amber-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 flex items-center justify-between bg-amber-50 border-b border-amber-200">
                    <p className="font-semibold text-sm text-amber-900">{customer.customer}</p>
                    <span className="text-xs text-amber-700 font-medium bg-amber-100 px-2 py-0.5 rounded-full">
                      {customer.crossings.length} need{customer.crossings.length > 1 ? '' : 's'} calibration
                    </span>
                  </div>
                  <div className="divide-y divide-amber-100 bg-white">
                    {customer.crossings.map((crossing, j) => (
                      <div key={j} className="px-4 py-3 flex items-center justify-between hover:bg-amber-50/50 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{crossing.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">{crossing.crossingId} - {crossing.sensorId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-amber-600 font-medium">{crossing.lastCalibration}</span>
                          <Button size="sm" variant="outline" className="bg-white text-amber-700 border-amber-300 hover:bg-amber-50 hover:border-amber-400">
                            Calibrate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Info Row - System Health & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* System Health Summary */}
          <Card className="p-5">
            <h3 className="font-bold mb-4">System Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Healthy Customers</span>
                </div>
                <span className="text-lg font-bold text-green-700">48</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-sm font-medium">Needs Attention</span>
                </div>
                <span className="text-lg font-bold text-yellow-700">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">Critical</span>
                </div>
                <span className="text-lg font-bold text-red-700">1</span>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-5">
            <h3 className="font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: "Sensor TAS2BCE03 calibrated", time: "2 hrs ago", type: "success" },
                { action: "Crossing added - North Florida", time: "5 hrs ago", type: "info" },
                { action: "Outage detected - NSH002B", time: "8 hrs ago", type: "warning" },
                { action: "API key generated - FIU", time: "1 day ago", type: "info" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-3 text-accent p-0 h-auto" asChild>
              <Link href="/portal/reports">View all activity</Link>
            </Button>
          </Card>
        </div>
      </div>

      {/* Uptime Calculation Modal */}
      {showUptimeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Sensor Uptime Calculation</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowUptimeModal(false)}>
                  <X size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Formula</p>
                  <p className="font-mono text-sm">Uptime = (Online Sensors / Total Sensors) x 100</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Total Sensors</span>
                    <span className="font-bold">383</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Online Sensors</span>
                    <span className="font-bold text-green-600">365</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Offline Sensors</span>
                    <span className="font-bold text-red-600">18</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Calculated Uptime</span>
                    <span className="text-2xl font-bold text-green-600">95.4%</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Uptime is calculated based on sensors reporting within the last 24 hours.
                  </p>
                </div>
              </div>

              <Button className="w-full mt-6 bg-accent hover:bg-accent/90" onClick={() => setShowUptimeModal(false)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Crossings by Customer Modal */}
      {showCrossingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Crossings by Customer</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCrossingsModal(false)}>
                  <X size={20} />
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                    <p className="text-2xl font-bold text-purple-700">{totalCrossings}</p>
                    <p className="text-xs text-purple-600">Total Crossings</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <p className="text-2xl font-bold text-blue-700">{totalSensors}</p>
                    <p className="text-xs text-blue-600">Active Sensors</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
                    <p className="text-2xl font-bold text-amber-700">{projectedCrossings}</p>
                    <p className="text-xs text-amber-600">Projected</p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="text-left">
                      <th className="p-3 text-sm font-bold">Customer</th>
                      <th className="p-3 text-sm font-bold text-center">Sensors</th>
                      <th className="p-3 text-sm font-bold text-center">Crossings</th>
                      <th className="p-3 text-sm font-bold text-center">Projected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crossingsByCustomer.map((customer, i) => (
                      <tr key={i} className="border-t border-border hover:bg-muted/30">
                        <td className="p-3 text-sm">{customer.customer}</td>
                        <td className="p-3 text-sm text-center font-medium">{customer.sensors}</td>
                        <td className="p-3 text-sm text-center font-medium">{customer.crossings}</td>
                        <td className="p-3 text-sm text-center">
                          {customer.crossings - customer.sensors > 0 ? (
                            <span className="text-amber-600 font-medium">+{customer.crossings - customer.sensors}</span>
                          ) : (
                            <span className="text-muted-foreground">0</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Projected Crossings:</strong> Crossings attached to customers that do not yet have a TRAINFO sensor deployed.
                </p>
              </div>

              <Button className="w-full mt-6 bg-accent hover:bg-accent/90" onClick={() => setShowCrossingsModal(false)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* FRA Crossing Selection Modal */}
      {showOnboardModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Onboard Crossing</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowOnboardModal(false)
                    setModalStep(1)
                  }}
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      modalStep === 1 ? "bg-accent text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <div className="w-32 h-1 bg-gray-300"></div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      modalStep === 2 ? "bg-accent text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-bold text-lg">{modalStep === 1 ? "Select Crossing" : "Add Information Type"}</h3>
              </div>

              {/* Step 1: Select Crossing */}
              {modalStep === 1 && (
                <div className="space-y-6">
                  {/* Filters */}
                  <Card className="p-6 bg-muted/30">
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full border border-border rounded-lg p-2 bg-background"
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
                          className="w-full border border-border rounded-lg p-2 bg-background"
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                        >
                          <option>Michigan</option>
                          <option>Florida</option>
                          <option>Ontario</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-border rounded-lg p-2 bg-background"
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          placeholder="Mount Clemens"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="searchType" value="city" defaultChecked />
                        <span className="text-sm">City</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="searchType" value="latlong" />
                        <span className="text-sm">Lat / Long</span>
                      </label>
                    </div>
                  </Card>

                  {/* Crossings Table */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-medium">Total Crossings: {fraCrossings.length}</p>
                      <input
                        type="text"
                        placeholder="Search here..."
                        className="border border-border rounded-lg px-3 py-2 w-64"
                      />
                    </div>

                    <div className="overflow-x-auto border border-border rounded-lg">
                      <table className="w-full">
                        <thead className="bg-muted border-b border-border">
                          <tr className="text-left">
                            <th className="p-3 text-sm font-bold">
                              <input type="checkbox" />
                            </th>
                            <th className="p-3 text-sm font-bold text-accent">Crossing ID</th>
                            <th className="p-3 text-sm font-bold">Crossing Location</th>
                            <th className="p-3 text-sm font-bold">Latitude</th>
                            <th className="p-3 text-sm font-bold">Longitude</th>
                            <th className="p-3 text-sm font-bold text-center text-accent">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fraCrossings.map((crossing) => (
                            <tr key={crossing.id} className="border-b border-border hover:bg-muted/50">
                              <td className="p-3">
                                <input type="checkbox" />
                              </td>
                              <td className="p-3 font-medium">{crossing.id}</td>
                              <td className="p-3">{crossing.location}</td>
                              <td className="p-3 text-muted-foreground">{crossing.lat}</td>
                              <td className="p-3 text-muted-foreground">{crossing.long}</td>
                              <td className="p-3 text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-accent/10 text-accent"
                                  onClick={() => setModalStep(2)}
                                >
                                  <ThumbsUp size={20} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Add Information Type */}
              {modalStep === 2 && (
                <div className="space-y-6">
                  <p className="text-center text-muted-foreground mb-6">
                    Select the type of information to collect for this crossing
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {["Crossing Status", "Pre-Emption Data", "Traffic Analytics", "Safety Monitoring"].map(
                      (type, i) => (
                        <Card
                          key={i}
                          className="p-6 cursor-pointer hover:border-accent transition border-2 border-border"
                        >
                          <h4 className="font-bold mb-2">{type}</h4>
                          <p className="text-sm text-muted-foreground">
                            Monitor {type.toLowerCase()} for this crossing
                          </p>
                        </Card>
                      ),
                    )}
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => setModalStep(1)}>
                      Back
                    </Button>
                    <Button
                      className="bg-accent hover:bg-accent/90"
                      onClick={() => {
                        setShowOnboardModal(false)
                        setModalStep(1)
                      }}
                    >
                      Onboard Crossing
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </PortalLayout>
  )
}
