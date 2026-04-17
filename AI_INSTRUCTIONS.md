# AI Instructions — TRAINFO Website Wireframes

This file documents all established UX decisions, design patterns, and conventions in this project. Read this before making any changes so new work stays consistent with what already exists.

---

## Project Overview

A Next.js wireframe for the TRAINFO portal — a B2B SaaS product for railroad crossing monitoring. The app simulates multiple user roles (CSE, account manager, customer admin, etc.) with role-specific navigation and data views.

**Tech Stack**
- Next.js 16 (App Router, `"use client"` pages throughout)
- React 19, TypeScript
- Tailwind CSS 4 with OKLch color tokens
- Radix UI primitives + shadcn/ui components
- Lucide React icons
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — always use this for conditional classnames

---

## Directory Structure

```
app/
  portal/
    cse/                          # Customer Support Engineer pages
      sensors/page.tsx            # Sensor list
      bells/page.tsx              # Bell frequency management
      customers/page.tsx          # Customer list
      customers/[id]/page.tsx     # Customer detail / crossings
      deployment-map/page.tsx
    account-manager/
    dashboards/
    ...
  customers/[id]/crossings/[crossingId]/configure/page.tsx   # Complex multi-tab page
  sensors/[sensorId]/
    files/page.tsx
    heartbeat/page.tsx

components/
  portal-layout.tsx               # Role-based layout wrapper (use on every portal page)
  ui/
    table-pagination.tsx          # Shared pagination component
    button.tsx, card.tsx, ...     # shadcn/ui components

styles/globals.css                # Color tokens (OKLch), Tailwind theme
lib/
  utils.ts                        # cn() utility
  role-navigation.ts              # Role definitions and sidebar nav maps
```

---

## Layout: `PortalLayout`

Every portal page wraps its content in `<PortalLayout>`. Props:

```tsx
<PortalLayout
  role="cse"                          // role string — controls sidebar nav
  title="Page Title"                   // shown in sticky top bar
  subtitle="Optional subtitle text"    // shown below title
  activeHref="/portal/cse/sensors"     // highlights the active nav item
>
  {/* page content */}
</PortalLayout>
```

**Role values in use:** `cse`, `account-manager`. Defined roles (not yet wired to pages): `customer-admin`, `customer-general`, `consulting-admin`, `consulting-general`, `bdm-sdr`.

**Layout structure:**
- Collapsible sidebar (w-64 expanded / w-20 collapsed, 300ms transition)
- Sticky top bar at `top-0 z-10` with title + subtitle
- Scrollable main content area below

**Sticky page header pattern** (used on pages with breadcrumbs or tab bars — goes inside PortalLayout, before scrollable content):
```tsx
<div className="sticky top-16 z-10 bg-background border-b border-border">
  <div className="px-6 pt-4 pb-4">
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      <button className="hover:text-foreground transition" onClick={() => router.push("/portal/cse/sensors")}>
        Sensors
      </button>
      <ChevronRight size={14} />
      <span className="text-foreground font-medium">Current Page</span>
    </nav>
  </div>
</div>
```

**Sticky bottom action bar** (used on detail/sub-pages for back navigation):
```tsx
<div className="sticky bottom-0 z-10 bg-background border-t border-border px-6 py-4">
  <Button variant="outline" onClick={() => router.push("/portal/cse/sensors")}>
    ← Back to Sensors
  </Button>
</div>
```

---

## Color Tokens

Defined in `styles/globals.css` using OKLch. Always use these Tailwind token names — never hardcode hex or rgb values.

| Token | Usage |
|---|---|
| `bg-background` / `text-foreground` | Page background and body text |
| `bg-accent` / `text-accent` | Brand orange — CTAs, active states, selected items, focus rings |
| `bg-muted` / `text-muted-foreground` | Secondary backgrounds, disabled text, labels, placeholders |
| `border-border` | All borders and dividers |
| `bg-card` | Card backgrounds (same as background in light mode) |
| `text-destructive` | Error states, delete actions |

**Status badge colors** (used for sensor/calibration status — always inline Tailwind, not token-based):
```
Active / Calibrated:   bg-green-100 text-green-700
Down / Error:          bg-red-100 text-red-700
Info / Validating:     bg-blue-100 text-blue-700
Warning / Calibrating: bg-yellow-100 text-yellow-700
Low Power:             bg-red-100 text-red-700
Unassigned:            bg-gray-100 text-gray-700
```

Badge shape: `px-2 py-0.5 text-xs rounded-full`

---

## Buttons

Use the `<Button>` component from `components/ui/button.tsx`.

| Variant | Usage |
|---|---|
| `default` | Solid primary action (maps to `bg-primary`) |
| `outline` | Secondary / Cancel actions |
| `ghost` | Icon-only table actions (edit, delete, play, download) |
| `destructive` | Irreversible destructive actions |
| `link` | Text link styling |

**CTA / Save buttons** always use the brand orange directly:
```tsx
<Button className="bg-accent hover:bg-accent/90 text-white">Save</Button>
```

**Sizes:** `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`

**Icon-only table action pattern:**
```tsx
<Button size="sm" variant="ghost" className="hover:bg-accent/10 text-accent">
  <Edit size={16} />
</Button>
<Button size="sm" variant="ghost" className="hover:bg-red-100 text-red-600">
  <Trash2 size={16} />
</Button>
```

---

## Tables

Standard table structure used across all pages:

```tsx
<div className="border border-border rounded-lg overflow-hidden">
  <table className="w-full">
    <thead className="bg-muted border-b border-border">
      <tr className="text-left text-sm">
        <th className="px-4 py-3 font-semibold">Column</th>
        {/* ... */}
        <th className="px-4 py-3 font-semibold text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {pagedItems.map((item, index) => (
        <tr
          key={item.id}
          className={`border-t border-border hover:bg-muted/30 transition ${
            index % 2 === 0 ? "bg-background" : "bg-muted/10"
          }`}
        >
          <td className="px-4 py-3 text-sm">{item.field}</td>
          {/* ... */}
          <td className="px-4 py-3">
            <div className="flex items-center justify-center gap-1">
              {/* action buttons */}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {filteredItems.length === 0 && (
    <div className="text-center py-8 text-muted-foreground">No items found.</div>
  )}
  <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
</div>
```

Alternatively, tables inside `<Card>` omit the outer border wrapper and use `Card`'s border.

---

## Pagination

**Component:** `components/ui/table-pagination.tsx`

```tsx
import { TablePagination } from "@/components/ui/table-pagination"

<TablePagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
```

- Returns `null` automatically when `totalPages <= 1` — no conditional needed
- Shows at most 5 page numbers (sliding window around current page)
- Active page: filled orange circle (`bg-accent text-white`)
- Navigation: First / ← / [pages] / → / Last
- Placed flush below the table, no box or border around it

**Page size constants** — always defined at module level (outside the component):
```typescript
const PAGE_SIZE = 15         // all main full-page tables
const TAB_PAGE_SIZE = 15     // tab content tables inside a tabbed page
const MODAL_PAGE_SIZE = 6    // selection tables inside modals
```

**Standard pagination setup pattern:**
```typescript
const [currentPage, setCurrentPage] = useState(1)

// Reset to page 1 when filters change:
// Option A — inline in onChange:
onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
// Option B — useEffect:
useEffect(() => { setCurrentPage(1) }, [searchTerm, filterValue])

const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
const pagedItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
```

**Per-tab pagination** (e.g. Sensor Files page): use separate page states per tab and reset all on tab switch:
```typescript
const [logsPage, setLogsPage] = useState(1)
const [videoPage, setVideoPage] = useState(1)
const [audioPage, setAudioPage] = useState(1)
const currentPage = fileType === "logs" ? logsPage : fileType === "video" ? videoPage : audioPage
const setCurrentPage = fileType === "logs" ? setLogsPage : fileType === "video" ? setVideoPage : setAudioPage
// On tab switch: reset all three + clear search
```

---

## Modals

All modals use the same structural pattern. Never use a third-party dialog component — always build with this pattern:

```tsx
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 flex flex-col max-h-[85vh]">

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
        <h2 className="text-base font-bold">Modal Title</h2>
        <button onClick={closeModal} className="text-muted-foreground hover:text-foreground transition">
          <X size={18} />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {/* form fields, tables, etc. */}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
        <Button variant="outline" onClick={closeModal}>Cancel</Button>
        <Button className="bg-accent hover:bg-accent/90 text-white" onClick={handleSave}>Save</Button>
      </div>

    </div>
  </div>
)}
```

**Modal rules:**
- Z-index: always `z-50`
- Backdrop: `bg-black/40` (40%) for simple modals; `bg-black/50` (50%) for complex/larger modals
- Max height: `max-h-[85vh]` or `max-h-[90vh]` — always set to prevent viewport overflow
- Max width: `max-w-md` (simple forms), `max-w-lg` (medium), `max-w-2xl` / `max-w-3xl` (tables inside modal)
- Close button: always top-right, `<X size={18} />` icon
- Footer: always right-aligned (`justify-end`)
- Cancel + Save always present; Save uses brand orange
- Header and footer use `flex-shrink-0`; body uses `flex-1 overflow-y-auto`

**Multi-step modal pattern** (e.g. Add Bell Configuration):
- Step indicator in the header area showing Step 1 / Step 2
- Step 1 indicator uses `=== 1` (not `>= 1`) for filled state
- Footer shows Back/Next (step 1→2) or Cancel/Save (step 2)

**Modal state pattern:**
```typescript
const [showModal, setShowModal] = useState(false)
const [submitted, setSubmitted] = useState(false)
// form field states...

function openModal() {
  // reset all field states
  setSubmitted(false)
  setShowModal(true)
}
function closeModal() {
  setShowModal(false)
  setSubmitted(false)
}
function handleSave() {
  setSubmitted(true)
  if (!requiredField.trim()) return   // validation gate
  closeModal()
}
```

---

## Form Inputs

Consistent input styling across all pages and modals:

```tsx
<input
  type="text"
  placeholder="Placeholder text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-accent transition"
/>
```

**Validation state** (red border on failed submit):
```tsx
className={`w-full px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:border-accent transition ${
  submitted && !value.trim() ? "border-red-500" : "border-border"
}`}
```

**Form labels:**
```tsx
<label className="block text-sm font-medium mb-1">
  Field Name <span className="text-red-500">*</span>
  {/* optional unit: */}
  <span className="text-muted-foreground font-normal">(Hz)</span>
</label>
```

**Inline validation message:**
```tsx
{submitted && !value.trim() && (
  <p className="text-xs text-red-500 mt-1">This field is required.</p>
)}
```

**Two-column form layout:**
```tsx
<div className="grid grid-cols-2 gap-3">
  <div>{/* left field */}</div>
  <div>{/* right field */}</div>
</div>
```

---

## Search + Filter Bar Pattern

Standard layout at the top of paginated sections:

```tsx
<div className="flex items-center gap-4">
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
    />
  </div>
  {/* optional: total count + refresh */}
  <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
    <span>Total: <span className="font-semibold text-foreground">{filteredItems.length}</span></span>
    <button className="p-2 hover:bg-muted rounded-lg transition" title="Refresh">
      <RefreshCw size={16} className="text-accent" />
    </button>
  </div>
</div>
```

---

## Tab Bars

Simple tab bar pattern (hand-rolled, not using Radix Tabs):

```tsx
<div className="flex gap-1">
  {tabs.map(({ id, label, Icon }) => (
    <button
      key={id}
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
        activeTab === id
          ? "bg-accent text-white"
          : "bg-muted text-muted-foreground hover:bg-muted/70"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  ))}
</div>
```

Active tab: `bg-accent text-white`. Inactive: `bg-muted text-muted-foreground`.

---

## Sensor Info Bar

Reusable pattern for showing sensor metadata at the top of sensor sub-pages:

```tsx
<div className="grid grid-cols-5 gap-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
  <div>
    <p className="text-xs text-muted-foreground mb-1">Sensor ID</p>
    <p className="font-semibold text-sm">{sensor.id}</p>
  </div>
  {/* Location, Status (badge), Calibration Status (badge), Last Blockage */}
</div>
```

---

## Mock Data Conventions

- All data is hardcoded as static arrays or procedurally generated — no API calls
- Arrays should have **at least 17–22 items** per paginated table so pagination controls are visible at PAGE_SIZE=15
- Procedurally generated data (heartbeats, files) use a fixed base date and decrement by a fixed interval per row
- Sensor IDs: numeric strings (`"622"`, `"495"`) and alphanumeric (`"TAS2BCE03"`)
- Bell IDs: format `B` + two-digit number (`B01`, `B42`) — auto-generated by backend, never shown in Add forms
- File names: `{sensorId}{YYYYMMDD}_{HH}_{MM}_{SS}.{ext}`

---

## Icon Library

Always use `lucide-react`. Common icons used in this project:

| Icon | Usage |
|---|---|
| `Search` | Search inputs |
| `Plus` | Add / create buttons |
| `Edit` | Edit row action |
| `Trash2` | Delete row action |
| `X` | Modal close button **only** — never use for row delete |
| `ChevronRight` | Breadcrumb separator |
| `Download` | Download file action |
| `RefreshCw` | Refresh button |
| `Volume2` | Audio file / play audio |
| `Film` | Video file / play video |
| `FileCode` | Log file |
| `ThumbsUp` | Selection confirmation in modals |

---

## Fields Excluded from UI (Backend-Generated)

- **Bell Type** (`B01`, `B42`, etc.) — auto-generated by backend; never shown in "Add Bell" forms
- Do not add fields to forms for values stated to be backend-managed, even if they appear in the display table

---

## Routing

| Path pattern | Description |
|---|---|
| `/portal/cse/sensors` | Sensor list |
| `/portal/cse/bells` | Bell management |
| `/portal/cse/customers` | Customer list |
| `/portal/cse/customers/[id]` | Customer detail with crossings |
| `/customers/[id]/crossings/[crossingId]/configure` | Configure crossing (multi-tab) |
| `/sensors/[sensorId]/files` | Sensor file browser |
| `/sensors/[sensorId]/heartbeat` | Sensor heartbeat history |

The sensor detail routes (`/sensors/[sensorId]/...`) and customer configure route (`/customers/[id]/...`) live outside `/portal/` but still use `role="cse"` in PortalLayout.

---

## What Not to Do

- Do not use a role other than `cse` unless explicitly requested — the sidebar nav differs per role
- Do not add error handling, try/catch, or API loading states — this is a wireframe with mock data only
- Do not add comments unless the reason is genuinely non-obvious
- Do not create new components for one-off UI — inline the markup
- Do not use `<Dialog>` from Radix/shadcn for modals — use the `fixed inset-0` pattern documented above
- Do not change PAGE_SIZE values without being asked
- Do not add fields to "Add" forms for values that are auto-generated by the backend
- Do not modify `components/ui/table-pagination.tsx` unless asked — it is shared across the entire app
- Do not add features, refactor, or clean up surrounding code when asked to make a targeted change
