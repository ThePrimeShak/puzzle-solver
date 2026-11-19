import type { Board } from "./types";

export const GRID_SIZE = 3;
export const EMPTY_TILE_VALUE = 0;
export const DEFAULT_SHUFFLE_MOVES = 40;
export const DEFAULT_MAX_STEPS = 1000;
export const DEFAULT_ANIMATION_SPEED_MS = 300;
export const MAX_BFS_ITERATIONS = 181_440;

// Goal state: 0 represents empty tile
export const GOAL_STATE: Board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// The two states at the maximum optimal depth (31 moves) for this goal state.
export const HARDEST_PUZZLES: readonly Board[] = [
  [8, 7, 6, 0, 4, 1, 2, 5, 3],
  [8, 0, 6, 5, 4, 7, 2, 3, 1],
];
