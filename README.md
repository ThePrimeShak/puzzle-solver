# 8-Puzzle State Explorer

An 8-puzzle search visualizer built with React and TypeScript for a university AI course.

**Live demo:** [Open on Vercel](https://puzzle-solver-beryl.vercel.app)

## Overview

Created for a university Artificial Intelligence course to compare breadth-first search with a random walk over the classic 8-puzzle state space.

## Features

- Find a shortest solution using breadth-first search.
- Animate the computed solution or advance one move at a time.
- Inspect solution depth, explored nodes, visited states, and move history.
- Try maximum-depth 31-move configurations and the original random-walk mode.

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS.

## Run locally

Use Node.js 22.12 or newer and npm.

```sh
git clone https://github.com/ThePrimeShak/puzzle-solver.git
cd puzzle-solver
npm ci
npm run dev
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Check TypeScript types |
| `npm run lint` | Check code with ESLint |
| `npm run format` | Format project files |
| `npm run format:check` | Check formatting |
| `npm run check` | Run the configured quality checks |

## Project structure

- `src/features/puzzle/` — board rules, BFS logic, state hook, and puzzle UI.
- `src/app/`, `src/components/layout/`, and `src/styles/` — application shell and styling.

## Scope and limitations

The configured goal is `[0, 1, 2, 3, 4, 5, 6, 7, 8]`. Search runs on the browser main thread, so difficult configurations can briefly affect responsiveness.

## Author

Built by [ThePrimeShak](https://github.com/ThePrimeShak) · [LinkedIn](https://www.linkedin.com/in/theprimeshak/).
