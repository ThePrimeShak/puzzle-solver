import { GOAL_STATE } from "@/features/puzzle/constants";
import type { Board, Move, PuzzleStatus } from "@/features/puzzle/types";

export function isBoardSolved(board: Board): boolean {
  return (
    board.length === GOAL_STATE.length &&
    board.every((tile, position) => tile === GOAL_STATE[position])
  );
}

export function getAvailableMovesText(possibleMoves: Move[]): string {
  const moveDirections = possibleMoves.map((move) => move.direction);
  return moveDirections.join(", ");
}

export function getPuzzleStatus(
  puzzleBoard: Board,
  isAutoRunning: boolean
): PuzzleStatus {
  if (isBoardSolved(puzzleBoard)) {
    return "solved";
  }

  if (isAutoRunning) {
    return "running";
  }

  return "idle";
}
