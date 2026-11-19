import type { Board } from "@/features/puzzle/types";

export const GRID_SIZE = 3;
export const EMPTY_TILE_VALUE = 0;
export const DEFAULT_SHUFFLE_MOVES = 40;
export const DEFAULT_MAX_STEPS = 1000;
export const DEFAULT_ANIMATION_SPEED_MS = 300;

// Goal state: 0 represents empty tile
export const GOAL_STATE: Board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
