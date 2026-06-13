# Wisdom Wellbeing – Resource Centre

A single-page application built as part of the Health Assured frontend technical assessment.

## Tech Stack

- React 19
- TypeScript
- Vite
- Vitest + React Testing Library
- CSS Modules

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
- Click any tag to filter resources by that tag
- Filter resources by title or tag via search
- Sort resources by category or date
- Fully responsive — 3 columns on desktop, 2 on tablet, 1 on mobile
- WCAG 2.2 compliant — verified with SiteLint

## Project Structure

```
src/
├── components/        # React components with co-located CSS modules
│   ├── ResourceCard.tsx
│   ├── ResourceCard.module.css
│   ├── ResourceCard.test.tsx
│   ├── ResourceDetail.tsx
│   ├── ResourceDetail.module.css
│   └── ResourceDetail.test.tsx
├── data/              # Mock resource data
├── hooks/             # Custom React hooks
│   ├── useResources.ts
│   └── useFocusTrap.ts
├── types/             # TypeScript types
└── utils/             # Pure utility functions with tests
    ├── groupByCategory.ts
    ├── groupByCategory.test.ts
    ├── filterResources.ts
    └── filterResources.test.ts
```

## Testing Approach

This project follows Test-Driven Development (TDD). Tests are written before implementation, with the goal of writing the minimum code needed to make each test pass.

### Test observations

- The `groupByCategory([])` empty array test was identified as an accidental pass on the stub — the stub returned `{}` which matched the expected output by coincidence. The assertion was made more explicit so it passes for the correct reason.

- When accessibility improvements were added (setting `alt=""` on decorative card thumbnails), existing tests broke. These were fixed with more explicit queries — for example using `document.querySelector('img')` instead of `getByRole('img')`, which correctly reflects the decorative nature of the image.

## Accessibility

- Keyboard navigable — all cards and tags are focusable and operable via keyboard
- Modal closes on Escape key
- Focus moves inside the modal when it opens, and returns to the triggering card on close
- ARIA labels on all interactive elements
- Semantic HTML landmarks — `<header>` and `<main>`
- WCAG 2.2 verified with SiteLint — zero issues

## Development Approach

All architectural decisions were made by me. I understood every line of code written, caught issues the AI missed (such as the accidental test pass in the empty array test), and debugged all failing tests independently — including fixing broken tests after accessibility changes affected the DOM structure.

This project was built using a combination of AI tools as pair programming assistants — specifically Claude (via claude.ai and the VS Code extension) and ChatGPT. Rather than relying on a single AI tool, I deliberately used both in parallel, which allowed me to:

- Cross-reference suggestions and spot discrepancies quickly
- Ask better, more targeted questions based on different responses
- Catch errors faster by comparing approaches

The AI tools guided a significant portion of the code and structure. My contribution was in directing the process, asking the right questions, understanding the output, spotting issues such as the accidental test pass in the empty array test, and making decisions about what to build and why.

The full solution including all three bonus features was completed in approximately 2.5 hours.

## What I'd Add With More Time

- Integration with a real API or headless CMS
- Pagination for large datasets
- End-to-end tests with Playwright
- Favouriting resources with persistent state
- Skeleton loading states
- Persistent filter state via URL query params
- A "clear all filters" button when multiple filters are active
