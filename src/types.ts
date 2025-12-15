export type BoardType = number[];

export type MoveType = {
  direction: string;
  swapWith: number;
};

export type AlgorithmType = "random" | "bfs";
