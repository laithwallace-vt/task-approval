# Task Approval Prototype

A design prototype for Vertice's task approval workflow. Built as standalone HTML — no build step, no dependencies.

## Viewing the prototype

Open `index.html` directly in a browser, or visit the deployed Vercel URL shared with you.

The prototype includes a **breakpoint toggle bar** at the top so you can preview it at 1440px, 900px, 600px, and 375px without resizing your browser.

## File structure

```
index.html                  ← Main prototype (task approval modal, responsive)
form-builder-system.jsx     ← Form builder UI — React reference component (not rendered standalone)
task-approval-widgets.jsx   ← Widget library — React reference components (hero + reference modes)
archive/                    ← Earlier design iterations (for context only)
```

## The two JSX files

These are **reference implementations** — not wired up to a build system. They document the intended component API so engineering can implement them in the existing React app.

- **`form-builder-system.jsx`** — Drag-and-drop form builder editor. Fields, rich components, and action sections are defined in registries (`STANDARD_FIELDS`, `RICH_COMPONENTS`, `ACTION_SECTIONS`). State is local `useState` only — no external store needed.
- **`task-approval-widgets.jsx`** — Widgets that appear inside a task view. Each widget supports two render modes: `hero` (full display in the task body) and `reference` (compact in the right-hand side panel). Widgets: `BudgetVarianceWidget`, `OfferComparisonWidget`, `ContractLineageWidget`, `VendorRiskWidget`, `LicenseUsageWidget`, `AIRecommendationWidget`.

If you want to render the JSX components locally, scaffold a Vite project and import them directly.

## Design tokens

All files use these tokens. Please don't deviate from them when building.

| Token | Value |
|---|---|
| Font sizes | 20px (titles/metrics), 14px (body/buttons), 13px (labels/captions) |
| Font weights | 400 regular, 500 medium — never 700 |
| Spacing grid | 4px increments: 4, 8, 12, 16, 20, 24, 32, 40px |
| Card padding | 24px |
| Button height | 32px |
| Border radius (cards) | 8px |
| Border radius (buttons) | 6px |
| Primary | `#6000f0` (purple) |
| Success | `#16a249` (green) |
| Warning | `#f97415` (amber) |
| Error | `#dc2828` (red) |
| Info | `#2563eb` (blue) |
| Text primary | `rgba(15,15,20, 1.0)` |
| Text secondary | `rgba(15,15,20, 0.7)` |
| Text tertiary | `rgba(15,15,20, 0.5)` |
| Border default | `rgba(15,15,20, 0.08)` |
| Border emphasis | `rgba(15,15,20, 0.12)` |

No box shadows on cards. No gradients on UI elements.

## Archive

The `archive/` folder contains earlier iterations of the prototype for design history. Ignore these for implementation — `index.html` is the source of truth.

## Questions

Reach out to Laith (Head of Design) with any design questions before implementing.
