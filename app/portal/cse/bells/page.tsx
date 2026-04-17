"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, Edit, Trash2, ChevronRight, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { TablePagination } from "@/components/ui/table-pagination"

const PAGE_SIZE = 15

export default function CSEBellsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [bellsPage, setBellsPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)

  const [minFreq, setMinFreq] = useState("")
  const [maxFreq, setMaxFreq] = useState("")
  const [mid1Freq, setMid1Freq] = useState("")
  const [mid2Freq, setMid2Freq] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const bells = [
    { id: 1,  type: "B42", frequencies: ["2379", "2831"] },
    { id: 2,  type: "B20", frequencies: ["1970", "2665", "3413"] },
    { id: 3,  type: "B43", frequencies: ["1529", "2143"] },
    { id: 4,  type: "B21", frequencies: ["1416", "1911", "2439"] },
    { id: 5,  type: "B22", frequencies: ["1443", "1949", "2132"] },
    { id: 6,  type: "B01", frequencies: ["1588", "2147", "2740"] },
    { id: 7,  type: "B02", frequencies: ["1399", "1889", "2417", "2976"] },
    { id: 8,  type: "B03", frequencies: ["1641", "2217", "2831"] },
    { id: 9,  type: "B04", frequencies: ["1556", "2099", "2686"] },
    { id: 10, type: "B05", frequencies: ["1497", "2589"] },
    { id: 11, type: "B06", frequencies: ["1520", "2100", "2750"] },
    { id: 12, type: "B07", frequencies: ["1612", "2234"] },
    { id: 13, type: "B08", frequencies: ["1478", "2015", "2589"] },
    { id: 14, type: "B09", frequencies: ["1633", "2198", "2812", "3456"] },
    { id: 15, type: "B10", frequencies: ["1501", "2067", "2634"] },
    { id: 16, type: "B11", frequencies: ["1445", "1978", "2532"] },
    { id: 17, type: "B12", frequencies: ["1589", "2156", "2723", "3298"] },
    { id: 18, type: "B13", frequencies: ["1467", "2034"] },
  ]

  const filteredBells = bells.filter(b =>
    b.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.frequencies.some(f => f.includes(searchTerm))
  )
  const bellsTotalPages = Math.max(1, Math.ceil(filteredBells.length / PAGE_SIZE))
  const pagedBells = filteredBells.slice((bellsPage - 1) * PAGE_SIZE, bellsPage * PAGE_SIZE)

  function openModal() {
    setMinFreq(""); setMaxFreq(""); setMid1Freq(""); setMid2Freq("")
    setSubmitted(false)
    setShowAddModal(true)
  }

  function closeModal() {
    setShowAddModal(false)
    setSubmitted(false)
  }

  function handleSave() {
    setSubmitted(true)
    if (!minFreq.trim() || !maxFreq.trim()) return
    closeModal()
  }

  const invalid = (val: string) => submitted && !val.trim()

  return (
    <PortalLayout
      role="cse"
      title="Bells"
      subtitle="Manage bell frequency configurations"
      activeHref="/portal/cse/bells"
    >
      {/* ── Sticky page header: breadcrumb + title ── */}
      <div className="sticky top-16 z-10 bg-background border-b border-border">
        <div className="px-6 pt-4 pb-4">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <button
              className="hover:text-foreground transition"
              onClick={() => router.push("/portal/cse/sensors")}
            >
              Sensors
            </button>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">Manage Bells</span>
          </nav>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Header with Search and Add Button */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Bells</p>
            <p className="text-2xl font-bold">43</p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search bells..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setBellsPage(1) }}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent w-64"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90" onClick={openModal}>
              <Plus size={18} className="mr-2" />
              Add New Bell
            </Button>
          </div>
        </div>

        {/* Bells Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="pb-3 font-bold text-sm w-1/4">Bell Type ↕</th>
                  <th className="pb-3 font-bold text-sm">Bell Frequency (Hz) ↕</th>
                  <th className="pb-3 font-bold text-sm text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedBells.map((bell) => (
                  <tr key={bell.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 font-medium">{bell.type}</td>
                    <td className="py-4 text-muted-foreground">{bell.frequencies.join(" - ")}</td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost" className="hover:bg-accent/10 text-accent">
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
          <TablePagination currentPage={bellsPage} totalPages={bellsTotalPages} onPageChange={setBellsPage} />
        </Card>
      </div>

      {/* ── Sticky bottom action bar ── */}
      <div className="sticky bottom-0 z-10 bg-background border-t border-border px-6 py-4">
        <Button variant="outline" onClick={() => router.push("/portal/cse/sensors")}>
          ← Back to Sensors
        </Button>
      </div>

      {/* ── Add New Bell Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
              <h2 className="text-base font-bold">Add New Bell</h2>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">

              {/* Min / Max Frequency */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Min Frequency <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">(Hz)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1400"
                    value={minFreq}
                    onChange={(e) => setMinFreq(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:border-accent transition ${
                      invalid(minFreq) ? "border-red-500" : "border-border"
                    }`}
                  />
                  {invalid(minFreq) && <p className="text-xs text-red-500 mt-1">Required.</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Frequency <span className="text-red-500">*</span> <span className="text-muted-foreground font-normal">(Hz)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2800"
                    value={maxFreq}
                    onChange={(e) => setMaxFreq(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:border-accent transition ${
                      invalid(maxFreq) ? "border-red-500" : "border-border"
                    }`}
                  />
                  {invalid(maxFreq) && <p className="text-xs text-red-500 mt-1">Required.</p>}
                </div>
              </div>

              {/* Mid Frequency 1 / 2 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mid Frequency 1 <span className="text-muted-foreground font-normal">(Hz)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1900"
                    value={mid1Freq}
                    onChange={(e) => setMid1Freq(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mid Frequency 2 <span className="text-muted-foreground font-normal">(Hz)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2300"
                    value={mid2Freq}
                    onChange={(e) => setMid2Freq(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-accent transition"
                  />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button className="bg-accent hover:bg-accent/90 text-white" onClick={handleSave}>Save</Button>
            </div>

          </div>
        </div>
      )}

    </PortalLayout>
  )
}
