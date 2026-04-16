"use client"

import PortalLayout from "@/components/portal-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, Edit, Trash2, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CSEBellsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const bells = [
    { id: 1, type: "B42", frequencies: ["2379", "2831"] },
    { id: 2, type: "B20", frequencies: ["1970", "2665", "3413"] },
    { id: 3, type: "B43", frequencies: ["1529", "2143"] },
    { id: 4, type: "B21", frequencies: ["1416", "1911", "2439"] },
    { id: 5, type: "B22", frequencies: ["1443", "1949", "2132"] },
    { id: 6, type: "B01", frequencies: ["1588", "2147", "2740"] },
    { id: 7, type: "B02", frequencies: ["1399", "1889", "2417", "2976"] },
    { id: 8, type: "B03", frequencies: ["1641", "2217", "2831"] },
    { id: 9, type: "B04", frequencies: ["1556", "2099", "2686"] },
    { id: 10, type: "B05", frequencies: ["1497", "2589"] },
  ]

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

          {/* Breadcrumb */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent w-64"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90">
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
                {bells.map((bell) => (
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
        </Card>
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
