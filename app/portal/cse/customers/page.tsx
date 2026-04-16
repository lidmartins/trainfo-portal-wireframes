"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Eye, Edit, Archive, X, AlertTriangle, Check } from "lucide-react"
import { useState } from "react"

export default function CSECustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "new" | "decommissioned">("active")
  const [decommissionModal, setDecommissionModal] = useState<{ open: boolean; customer: { id: number; name: string; status: string } | null }>({ open: false, customer: null })
  const [activateModal, setActivateModal] = useState<{ open: boolean; customer: { id: number; name: string } | null }>({ open: false, customer: null })
  const [confirmText, setConfirmText] = useState("")
  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [customers, setCustomers] = useState([
    {
      id: 127,
      name: "North Florida TPO",
      province: "Florida",
      crossings: 1,
      status: "Active",
      licenseActivated: "02/21/2025",
    },
    {
      id: 128,
      name: "City Of Nashville TN",
      province: "Tennessee",
      crossings: 2,
      status: "Active",
      licenseActivated: "01/15/2025",
    },
    {
      id: 129,
      name: "Florida International University",
      province: "Florida",
      crossings: 44,
      status: "Active",
      licenseActivated: "03/10/2024",
    },
    {
      id: 130,
      name: "City Of Alabaster AL",
      province: "Alabama",
      crossings: 2,
      status: "Active",
      licenseActivated: "06/22/2024",
    },
    {
      id: 131,
      name: "County Of Macomb MI",
      province: "Michigan",
      crossings: 7,
      status: "Active",
      licenseActivated: "09/05/2024",
    },
    {
      id: 132,
      name: "City Of Little Rock AR",
      province: "Arkansas",
      crossings: 2,
      status: "Active",
      licenseActivated: "11/18/2024",
    },
    {
      id: 133,
      name: "Bay Area Rapid Transit",
      province: "California",
      crossings: 12,
      status: "Decommissioned",
      licenseActivated: "05/01/2023",
    },
    {
      id: 134,
      name: "Metro Transit Authority",
      province: "New York",
      crossings: 8,
      status: "Decommissioned",
      licenseActivated: "08/15/2022",
    },
    {
      id: 135,
      name: "City Of Jonesboro AR",
      province: "Arkansas",
      crossings: 0,
      status: "New",
      licenseActivated: "",
    },
    {
      id: 136,
      name: "Memphis Area Transit",
      province: "Tennessee",
      crossings: 0,
      status: "New",
      licenseActivated: "",
    },
  ])

  const handleStartEdit = (customer: { id: number; name: string }) => {
    setEditingCustomerId(customer.id)
    setEditingName(customer.name)
  }

  const handleSaveEdit = (customerId: number) => {
    setCustomers(prev => prev.map(c => 
      c.id === customerId ? { ...c, name: editingName } : c
    ))
    setEditingCustomerId(null)
    setEditingName("")
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.province.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.status === "Active") ||
      (statusFilter === "new" && customer.status === "New") ||
      (statusFilter === "decommissioned" && customer.status === "Decommissioned")
    return matchesSearch && matchesStatus
  })

  return (
    <PortalLayout
      role="cse"
      title="Customers"
      subtitle="Manage all customer deployments and configurations"
      activeHref="/portal/cse/customers"
    >
      <div className="p-6 space-y-6">
        {/* Stats & Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold">52</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600">48</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Decommissioned</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "new" | "decommissioned")}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
            >
              <option value="all">All Customers</option>
              <option value="active">Active Only</option>
              <option value="new">New Only</option>
              <option value="decommissioned">Decommissioned</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent w-64"
              />
            </div>
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
                  <th className="pb-3 font-bold text-sm text-right">Total Crossings</th>
                  <th className="pb-3 font-bold text-sm text-center">Status</th>
                  <th className="pb-3 font-bold text-sm text-center">License Activated</th>
                  <th className="pb-3 font-bold text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4">
                      {editingCustomerId === customer.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="px-2 py-1 border border-border rounded bg-background focus:outline-none focus:border-accent"
                            autoFocus
                          />
                          <Button size="sm" variant="ghost" className="hover:bg-green-100 text-green-600" onClick={() => handleSaveEdit(customer.id)}>
                            <Check size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="hover:bg-muted" onClick={() => setEditingCustomerId(null)}>
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <span className="font-medium">{customer.name}</span>
                      )}
                    </td>
                    <td className="py-4 text-muted-foreground">{customer.province}</td>
                    <td className="py-4 text-right font-medium">{customer.crossings}</td>
                    <td className="py-4 text-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          customer.status === "Active" 
                            ? "bg-green-100 text-green-700" 
                            : customer.status === "New"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 text-center text-muted-foreground">
                      {customer.licenseActivated || "—"}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-accent/10" asChild>
                          <a href={`/portal/cse/customers/${customer.id}`}>
                            <Eye size={16} />
                          </a>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="hover:bg-accent/10"
                          onClick={() => handleStartEdit(customer)}
                        >
                          <Edit size={16} />
                        </Button>
                        {customer.status === "New" ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-green-100 text-green-600"
                            title="Activate Customer"
                            onClick={() => setActivateModal({ open: true, customer })}
                          >
                            <Check size={16} />
                          </Button>
                        ) : customer.status === "Active" ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-orange-100 text-orange-600"
                            title="Decommission Customer"
                            onClick={() => {
                              setDecommissionModal({ open: true, customer })
                              setConfirmText("")
                            }}
                          >
                            <Archive size={16} />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-green-100 text-green-600"
                            title="Reactivate Customer"
                            onClick={() => {
                              setDecommissionModal({ open: true, customer })
                              setConfirmText("")
                            }}
                          >
                            <Archive size={16} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No customers found matching your filters.</div>
          )}
        </Card>
      </div>
      {/* Decommission Confirmation Modal */}
      {decommissionModal.open && decommissionModal.customer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold">
                    {decommissionModal.customer.status === "Active" ? "Decommission" : "Reactivate"} Customer
                  </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setDecommissionModal({ open: false, customer: null })}>
                  <X size={20} />
                </Button>
              </div>

              {decommissionModal.customer.status === "Active" ? (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-orange-800">
                      <strong>Warning:</strong> Decommissioning a customer will disable all sensors and crossings associated with this account. This action can be reversed but may require recalibration.
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    You are about to decommission <strong>{decommissionModal.customer.name}</strong>.
                  </p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Decommission Date</label>
                    <input
                      type="date"
                      className="w-full border border-border rounded-lg p-3 bg-background focus:outline-none focus:border-accent"
                    />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    To confirm, please type the customer name below:
                  </p>

                  <input
                    type="text"
                    placeholder="Type customer name to confirm"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent mb-4"
                  />

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setDecommissionModal({ open: false, customer: null })}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                      disabled={confirmText !== decommissionModal.customer.name}
                    >
                      Decommission
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    You are about to reactivate <strong>{decommissionModal.customer.name}</strong>. 
                    This will restore access to all sensors and crossings. Recalibration may be required.
                  </p>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setDecommissionModal({ open: false, customer: null })}
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      Reactivate
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Activate Customer Modal */}
      {activateModal.open && activateModal.customer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold">Activate Customer</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setActivateModal({ open: false, customer: null })}>
                  <X size={20} />
                </Button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-800">
                  Activating this customer will enable their license and allow them to access the TRAINFO platform.
                </p>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                You are about to activate <strong>{activateModal.customer.name}</strong>. 
                The license activation date will be set to today.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setActivateModal({ open: false, customer: null })}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
                    setCustomers(prev => prev.map(c => 
                      c.id === activateModal.customer!.id 
                        ? { ...c, status: "Active", licenseActivated: today }
                        : c
                    ))
                    setActivateModal({ open: false, customer: null })
                  }}
                >
                  Activate Customer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </PortalLayout>
  )
}
