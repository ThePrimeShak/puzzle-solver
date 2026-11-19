export type Board = readonly number[];

export type MoveDirection = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type Move = {
  direction: MoveDirection;
  swapWith: number;
};

export type MoveHistoryEntry = {
  step: number;
  description: string;
};

export type PuzzleStatus = "solved" | "running" | "idle";
