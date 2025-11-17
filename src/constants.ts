import type { BoardType } from "./types";

export const GRID_SIZE = 3;
export const EMPTY_TILE_VALUE = 0;
export const DEFAULT_SHUFFLE_MOVES = 40;

// Goal state: 0 represents empty tile
export const GOAL_STATE: BoardType = [0, 1, 2, 3, 4, 5, 6, 7, 8];
