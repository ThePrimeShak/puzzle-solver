import type { BoardType } from "./types";

export const GRID_SIZE = 3;
export const EMPTY_TILE_VALUE = 0;
export const DEFAULT_SHUFFLE_MOVES = 40;

// Goal state: 0 represents empty tile
export const GOAL_STATE: BoardType = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// Hardest 8-puzzle configurations (require maximum moves to solve)
// These configurations are known to require 31 moves (optimal solution depth)
export const HARDEST_PUZZLES: BoardType[] = [
  [8, 7, 6, 5, 4, 3, 2, 1, 0], // Classic hardest puzzle - 31 moves
  [8, 6, 7, 2, 5, 4, 3, 0, 1], // Another extremely hard configuration
  [6, 4, 7, 8, 5, 0, 3, 2, 1], // Very challenging puzzle
  [7, 5, 6, 8, 4, 0, 2, 3, 1], // High complexity puzzle
  [8, 7, 6, 0, 4, 1, 2, 5, 3], // Difficult configuration
];
