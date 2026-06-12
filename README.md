# Wisdom Wellbeing – Resource Centre

A single-page application built as part of the Health Assured frontend technical assessment.

## Tech Stack

- React 19
- TypeScript
- Vite
- Vitest + React Testing Library

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Run tests

```bash
npm run test
```

## Features

- Resources grouped by category on load
- Each resource displays title, thumbnail, tags and read/watch time
- Click a resource to view full details including description and upload date
- Filter resources by title or tag (click a tag pill or use the search box)
- Sort resources by category or date

## Project Structure

```
src/
├── components/
│   ├── ResourceCard.tsx        # Card displayed in the grid
│   ├── ResourceCard.test.tsx
│   ├── ResourceDetail.tsx      # Modal shown on card click
│   └── ResourceDetail.test.tsx
├── data/
│   └── resources.ts            # Static resource data
├── types/
│   └── index.ts                # Shared TypeScript types
├── utils/
│   ├── groupByCategory.ts      # Groups resources by category
│   └── groupByCategory.test.ts
├── App.tsx                     # Root component — filtering, sorting, layout
└── main.tsx
```

## Approach

I followed a TDD workflow throughout — writing tests first, confirming they failed for the right reasons, then implementing the feature to make them pass. I started with the `groupByCategory` utility (pure function, easy to unit test), then moved to the components, and wired everything together in `App.tsx` last.

Types were defined upfront in `src/types/index.ts` so that the data shape, filter state and sort options were all locked in before any components were written.

## What I'd Add With More Time

- **Accessibility** — keyboard navigation for the modal, focus trapping, and ARIA live regions for filter result counts
- **Responsive layout** — the grid currently breaks at smaller viewports; a proper mobile layout with a single column and stacked controls would be needed
- **Animations** — subtle enter/exit transitions on the modal and card hover states using CSS or Framer Motion
- **Persistent filter state** — sync search and sort to URL query params so results are shareable and survive a refresh
- **More test coverage** — integration tests for the filter and sort interactions in `App.tsx`
- **CMS-backed data** — swap the static `resources.ts` for a real API or headless CMS (the data is already structured for this)
