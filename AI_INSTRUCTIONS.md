# AI Instructions — TRAINFO Admin Portal

Keep this file updated as new UX decisions, design patterns, and conventions are established.

---

## Project Overview

TRAINFO Admin Portal — internal tool for managing rail crossing sensors, customers, and configurations.

Built with Next.js App Router, Tailwind CSS, Shadcn UI components, and Lucide React icons.

---

## Design System

- **Primary color:** Orange (`bg-accent`, `hover:bg-accent/90`) — used for primary action buttons only
- **Secondary buttons:** `variant="outline"` — white background, visible border, dark text (e.g. "Generate Response Intelligence", "Reset Customer Password")
- **Ghost buttons:** `variant="ghost"` — text only, no border (Cancel, Close X icons)
- **Destructive:** Red only — delete icons, Decommission button
- **Custom icons:** Inline SVG components in `components/icons/` for Font Awesome icons not in Lucide (e.g. `RightLeftIcon.tsx` for fa-right-left)

---

## Button Hierarchy Rules

- **ONE** orange primary button per page/modal — the final submit action (Save Configuration, Send, Add, Submit)
- **Section-level actions** (Add Rail Segment, Create Road Segment, Attach Device): `variant="outline"`
- **Cancel / Close / Back:** `variant="ghost"` — no border, text only
- **Destructive actions:** red only (`text-red-600`, `hover:bg-red-100`) — never orange or grey

---

## Navigation Patterns

- All pages have a **sticky breadcrumb header**: `sticky top-16 z-20 bg-background border-b border-border`
  - `top-16` docks just below the 64px portal top bar
  - Contains: breadcrumb + page title (optional, remove if breadcrumb provides full context)
- All pages have a **sticky footer**: `sticky bottom-0 z-10 bg-background border-t border-border px-6 py-4`
  - Contains: Back/Cancel (ghost) on the left + primary action (orange) on the right
- Breadcrumbs reflect **navigation path only**, not data hierarchy
- Back buttons always present in sticky footer

---

## Page vs Modal Decisions

### Standalone Pages (not modals) — for complex/heavy content

| Page | Route | Notes |
|------|-------|-------|
| Configure Crossing | `/customers/[id]/crossings/[crossingId]/configure` | 5 tabs: Rail Segments, Road Segments, Bluetooth Sensors, DMS & Beacons, Sensor Configuration |
| Sensor Files | `/sensors/[sensorId]/files` | 3 tabs (Logs, Video, Audio) with orange filled tab buttons |
| Heartbeat History | `/sensors/[sensorId]/heartbeat` | Pagination (50 rows/page), date range filter, 200 mock entries |
| Manage Bells | `/portal/cse/bells` | Global config — not per-sensor; breadcrumb shows Sensors > Manage Bells |

### Modals — for lightweight/focused actions

| Modal | Trigger |
|-------|---------|
| Set Beacon Location | Pin icon on Beacon rows (DMS & Beacons tab) |
| DMS Logs | Document icon on DMS Board rows (DMS & Beacons tab) |
| Replace Sensor | ArrowLeftRight icon on Crossing of Interest rows |
| Reset Customer Password | Button on Customer Record page |
| Add Crossing of Interest | Button on Customer Record page (2-step) |
| Ingest Pre-emption Data | Button on Customer Record page (2-step) |

---

## Icon Conventions

| Action | Icon | Notes |
|--------|------|-------|
| Configure crossing | `Settings` (Lucide) | Navigates to Configure Crossing page |
| View customer record | `Eye` (Lucide) | Navigates to Customer Record page |
| Replace sensor | `RightLeftIcon` (FA6 fa-right-left) | Custom SVG in `components/icons/` |
| Sensor files | `FileText` (Lucide) | Navigates to Sensor Files page |
| Heartbeat history | `Heart` (Lucide) | Navigates to Heartbeat History page |
| Delete | `Trash2` (Lucide) | Always red |
| Set beacon location | `MapPin` (Lucide) | Opens Set Beacon Location modal |
| DMS logs | `FileText` (Lucide) | Opens DMS Logs modal |

---

## Modal Structure Rules

All modals **must** follow this 3-section structure:

```
<Card className="w-full max-w-[size] max-h-[90vh] flex flex-col overflow-hidden">
  {/* 1. Sticky header */}
  <div className="flex-shrink-0 px-6 pt-6 pb-0 border-b border-border bg-background">
    {/* title + X close button + step indicator (if multi-step) */}
  </div>

  {/* 2. Scrollable body */}
  <div className="flex-1 overflow-y-auto p-6">
    {/* form content only */}
  </div>

  {/* 3. Sticky footer */}
  <div className="flex-shrink-0 px-6 py-4 border-t border-border bg-background flex justify-end gap-3">
    {/* action buttons — always visible */}
  </div>
</Card>
```

---

## Multi-step Modal Behavior

- **Thumbs-up icon** (`ThumbsUp` from Lucide, size 20) toggles row selection:
  - Turns green (`text-green-600`) + checks checkbox when selected
  - Reverts to orange (`text-accent`) + unchecks when deselected
  - Never navigates automatically on icon click
- **Next button** is disabled (greyed out) until a selection is made
- **User clicks Next** to advance — navigation is never automatic

| Modal | Selection type |
|-------|----------------|
| Add Crossing of Interest | Multi-select (`string[]`) |
| Ingest Pre-emption Data | Single-select (`string \| null`) |

---

## Table Conventions

- **Table headers:** `bg-muted` background with `border-b border-border`
- **Column headers with emphasis:** `text-accent` (orange) — used on Heartbeat History metric columns
- **Crossing IDs / Sensor IDs:** `text-accent font-medium` — visually distinct, clickable
- **Status badges:** pill-shaped (`px-2 py-1 text-xs rounded-full`)
  - Active: `bg-green-100 text-green-700`
  - Down: `bg-red-100 text-red-700`
  - Warning / Warned: `bg-yellow-100 text-yellow-700`
  - Calibrating: `bg-yellow-100 text-yellow-700`
  - Validating: `bg-blue-100 text-blue-700`
  - Unassigned: `bg-gray-100 text-gray-700`
- **Actions column:** icon-only ghost buttons with `title` tooltip on hover
- **Alternating rows:** `bg-background` / `bg-muted/10` on index even/odd

---

## Breadcrumb Style

Consistent across all pages:

```tsx
<nav className="flex items-center gap-1 text-sm text-muted-foreground">
  <button className="hover:text-foreground transition" onClick={() => router.push("/target")}>
    Parent Page
  </button>
  <ChevronRight size={14} />
  <span className="text-foreground font-medium">Current Page</span>
</nav>
```

---

## Removed Redundancies

- **Configure Crossing page:** title block removed — breadcrumb (Customers > [Name] > Configure Crossing — [ID]) provides full context; tab bar follows breadcrumb directly
- **Customer Record page:** title block removed — breadcrumb (Customers > [Customer Name]) provides full context; customer info card is first content section

---

## Layout Rules

| Element | Rule |
|---------|------|
| Sidebar | `shrink-0`, never scrolls |
| Main content area | `flex-1 overflow-y-auto` — sole scroll container |
| Portal top bar | `sticky top-0 z-10 h-16` — always visible |
| In-page sticky headers | `sticky top-16 z-20` — docks below 64px top bar |
| Tab bars | `sticky` within the page header block, `z-20` |
| Bottom action bars | `sticky bottom-0 z-10` |
| Outer wrapper | `flex h-screen overflow-hidden` — prevents body scroll |

---

## Known Bugs Fixed

### Origin/Destination badges (Road Segments tab — Configure Crossing)
- **Problem:** Badges with `position: absolute` floated outside card into header area
- **Fix:** Remove `absolute` positioning entirely. Use `flex flex-col` on the card div: badge in top row (`p-2 shrink-0`), centered content in `flex-1 flex items-center justify-center`. No stacking context issues.

### DMS Logs modal filter row
- **Problem:** Filter button misaligned with date inputs
- **Fix:** `items-center` on the row + `<div className="pt-5">` wrapping the button to offset below label height

### DMS Logs modal table header
- **Problem:** Missing background color on `<thead>`
- **Fix:** `className="bg-muted border-b border-border"` on `<thead>`

### Sticky header z-index
- **Problem:** Content with `z-10` could paint over sticky tab bars also at `z-10`
- **Fix:** Sticky page headers and tab bars use `z-20`; content uses `z-10` or lower
