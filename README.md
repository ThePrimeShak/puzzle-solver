# 8-Puzzle State Explorer

A visual state-space explorer for the classic 8-puzzle, originally developed as a university Artificial Intelligence course project. Shuffle a solvable board, apply random valid operators, and inspect every resulting state in the move history.

## Getting started

```bash
npm install
npm run dev
```

Node.js 20.19+ or 22.12+ is required by the current Vite toolchain.

## Available scripts

- `npm run dev` starts the local development server.
- `npm run build` runs TypeScript checks and creates the production build.
- `npm run check` runs formatting, linting, type checks, and the build.
- `npm run format` formats the project with Prettier.
- `npm run lint` checks the source with ESLint.
- `npm run preview` serves the production build locally.

## Project structure

```text
src/
├── app/                      # Application shell
├── components/layout/        # Shared page layout
├── features/puzzle/
│   ├── components/           # Puzzle presentation components
│   ├── hooks/                # Puzzle state and timer orchestration
│   ├── lib/                  # Pure board, move, and status functions
│   ├── constants.ts          # Puzzle configuration and goal state
│   └── types.ts              # Puzzle domain types
├── styles/                   # Global Tailwind styles
└── main.tsx                  # Browser entry point
```

The puzzle feature is self-contained: UI components consume `usePuzzle`, while domain rules remain framework-independent under `lib/`.

## Author

Created by [ThePrimeShak](https://www.linkedin.com/in/theprimeshak/). Source code is available on [GitHub](https://github.com/ThePrimeShak/puzzle-solver).
