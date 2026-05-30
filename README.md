# PeopleOS — Employee Management Dashboard

A premium, production-grade employee analytics dashboard built with React + Vite + AG Grid + Tailwind CSS.

## Tech Stack

- **React 18** — functional components with hooks
- **Vite** — lightning-fast build tooling
- **AG Grid Community** — enterprise-grade data grid with sorting, filtering, pagination, CSV export
- **Recharts** — responsive, composable chart library
- **Tailwind CSS v3** — utility-first styling
- **Lucide React** — crisp icon set

## Features

- Dark / Light theme toggle with smooth transitions
- Animated stat counters (Total, Active, Avg Salary, Top Department)
- Three analytics charts: Department Distribution, Performance Bands, Salary Distribution
- AG Grid table with floating filters, column resizing, row selection, quick search, CSV export
- Custom cell renderers: avatar initials, department badges, performance progress bars, skill chips, status indicators
- Subtle ambient background gradients + glassmorphism elements
- Fully responsive layout

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Navbar.jsx          — Top bar with search and theme toggle
    StatCard.jsx        — Animated KPI cards
    Charts.jsx          — Dept, Performance, Salary charts
    EmployeeTable.jsx   — AG Grid table with custom renderers
  pages/
    Dashboard.jsx       — Main layout page
  hooks/
    useTheme.js         — Dark/light mode hook
  utils/
    analytics.js        — Dynamic stat computation from JSON
  data/
    employees.json      — Source of truth for all 20 employees
```
