# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **design prototype codebase** for Vertice's task approval workflow and form builder system. It contains React JSX component definitions and standalone HTML prototypes — not a production application. There is no build system, package.json, or test infrastructure.

## Viewing Files

- **HTML prototypes**: Open directly in a browser — no build step required
- **JSX components**: Reference implementations only. To render them interactively, you'd need to scaffold a Vite or CRA project and import them

## Architecture

### Two Primary React Components

**`form-builder-system.jsx`** — The form builder UI editor:
- `STANDARD_FIELDS`, `RICH_COMPONENTS`, `ACTION_SECTIONS` registries define draggable palette items
- `FormBuilder` manages canvas state (`fields[]`, `selectedField`, property panel)
- `FieldOnCanvas` / `RichComponentOnCanvas` / `ActionSectionOnCanvas` render items on the canvas
- No external state library — local `useState` only

**`task-approval-widgets.jsx`** — The widget library consumed in task views:
- Each widget supports **two modes**: `hero` (full display in task body) and `reference` (compact in side panel)
- Widgets: `BudgetVarianceWidget`, `OfferComparisonWidget`, `ContractLineageWidget`, `VendorRiskWidget`, `LicenseUsageWidget`, `AIRecommendationWidget`, plus approval action widgets

### HTML Prototypes (Iteration History)

Files follow a naming convention reflecting design phases:
- `task-approval-flow.html` → `task-approval-flow-updated.html` — core approval flow iterations
- `task-shell-v2.html` / `task-shell-v3-slot-diagram.html` — container shell explorations
- `ratification-archetype-spec.html` — Figma-style anatomy and slot specification
- `taskmeta-placement-spec.html` — metadata positioning decisions

### Task Shell Layout Model

The container follows a slot-based layout:
- Left navigation (52px, icon-only, dark)
- Header (50px, breadcrumbs + actions)
- Main body (task content + hero widgets)
- Right panel (reference widgets, metadata tabs)
- Footer action bar (58px, approval/reject actions)

## Design System Tokens

All HTML and JSX files use these tokens consistently. Do not deviate from them:

**Typography** — 3 sizes only:
- `20px` — page titles, key metrics
- `14px` — body, section headings, buttons
- `13px` — labels, captions, metadata
- Weights: `400` (regular), `500` (medium) — never `700`

**Spacing** — 4px grid: `4, 8, 12, 16, 20, 24, 32, 40px`

**Colour opacity hierarchy:**
- Text: primary `1.0`, secondary `0.7`, tertiary `0.5`, quaternary `0.35`
- Borders: default `0.08`, emphasis `0.12`

**Semantic colours:** purple `#6000f0`, green `#16a249`, amber `#f97415`, red `#dc2828`, blue `#2563eb`

**Components:** buttons `32px` height, `6px` border-radius; cards `8px` border-radius, no box-shadows, no gradients on UI elements
