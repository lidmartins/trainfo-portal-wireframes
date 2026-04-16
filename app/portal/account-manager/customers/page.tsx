"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Eye, FileText, KeyRound } from "lucide-react"
import { useState } from "react"

export default function AccountManagerCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const customers = [
    {
      id: 127,
      name: "North Florida TPO",
      province: "Florida",
      crossings: 1,
      uptime: "100%",
      renewalDate: "Mar 2025",
      status: "On Track",
    },
    {
      id: 129,
      name: "Florida International University",
      province: "Florida",
      crossings: 44,
      uptime: "99.85%",
      renewalDate: "Aug 2025",
      status: "Strong",
    },
    {
      id: 130,
      name: "City Of Alabaster AL",
      province: "Alabama",
      crossings: 2,
      uptime: "100%",
      renewalDate: "Nov 2025",
      status: "On Track",
    },
    {
      id: 131,
      name: "County Of Macomb MI",
      province: "Michigan",
      crossings: 7,
      uptime: "100%",
      renewalDate: "May 2025",
      status: "At Risk",
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.province.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PortalLayout
      role="account-manager"
      title="Customers"
      subtitle="View and manage customer accounts"
      activeHref="/portal/account-manager/customers"
    >
      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent w-96"
            />
          </div>
        </div>

        {/* Customer Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="pb-3 font-bold text-sm">Customer Name</th>
                  <th className="pb-3 font-bold text-sm">Province/State</th>
                  <th className="pb-3 font-bold text-sm text-right">Crossings</th>
                  <th className="pb-3 font-bold text-sm text-right">Uptime</th>
                  <th className="pb-3 font-bold text-sm">Renewal Date</th>
                  <th className="pb-3 font-bold text-sm text-center">Status</th>
                  <th className="pb-3 font-bold text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 font-medium">{customer.name}</td>
                    <td className="py-4 text-muted-foreground">{customer.province}</td>
                    <td className="py-4 text-right font-medium">{customer.crossings}</td>
                    <td className="py-4 text-right">
                      <span
                        className={`font-medium ${Number.parseFloat(customer.uptime) > 95 ? "text-green-600" : "text-orange-600"}`}
                      >
                        {customer.uptime}
                      </span>
                    </td>
                    <td className="py-4">{customer.renewalDate}</td>
                    <td className="py-4 text-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          customer.status === "At Risk"
                            ? "bg-red-100 text-red-700"
                            : customer.status === "Strong"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-accent/10"
                          onClick={() =>
                            window.open(`/portal/account-manager/customer-preview/${customer.id}`, "_blank")
                          }
                          title="View Customer Portal"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-accent/10"
                          onClick={() => {
                            setSelectedCustomer(customer)
                            setShowResponseModal(true)
                          }}
                          title="Generate Response Intelligence"
                        >
                          <FileText size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-accent/10"
                          onClick={() => {
                            setSelectedCustomer(customer)
                            setShowPasswordModal(true)
                          }}
                          title="Reset Password"
                        >
                          <KeyRound size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {showResponseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6 space-y-4">
            <h3 className="font-bold text-lg">Generate Response Intelligence Report</h3>
            <p className="text-sm text-muted-foreground">
              Customer: <strong>{selectedCustomer?.name}</strong>
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Upload Responder Data CSV</label>
                <input type="file" accept=".csv" className="w-full p-2 border border-border rounded-lg" />
              </div>

              <div className="bg-muted p-3 rounded-lg text-xs space-y-1">
                <p className="font-medium">Required CSV Format:</p>
                <p>• Timestamp, Responder ID, Origin Lat/Lng, Destination Lat/Lng</p>
                <p>• Crossing ID, Delay Time (seconds)</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowResponseModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert("Response Intelligence report generated successfully!")
                  setShowResponseModal(false)
                }}
              >
                Generate Report
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6 space-y-4">
            <h3 className="font-bold text-lg">Reset Customer Password</h3>
            <p className="text-sm text-muted-foreground">
              Customer: <strong>{selectedCustomer?.name}</strong>
            </p>

            <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
              <p className="text-sm text-orange-800">
                This will send a password reset email to all administrators for this customer account.
              </p>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  alert("Password reset email sent successfully!")
                  setShowPasswordModal(false)
                }}
              >
                Send Reset Email
              </Button>
            </div>
          </Card>
        </div>
      )}
    </PortalLayout>
  )
}
