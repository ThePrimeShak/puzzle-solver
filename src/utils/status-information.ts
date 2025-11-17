import { GOAL_STATE } from "@/constants";
import type { BoardType, MoveType } from "@/types";

function checkIfPuzzleIsSolved(board: BoardType): boolean {
  let isSolved = true;

  for (let position = 0; position < board.length; position++) {
    const currentTileValue = board[position];
    const expectedTileValue = GOAL_STATE[position];

    if (currentTileValue !== expectedTileValue) {
      isSolved = false;
      break;
    }
  }

  return isSolved;
}

export function getAvailableMovesText(possibleMoves: MoveType[]): string {
  const moveDirections = possibleMoves.map((move) => move.direction);
  return moveDirections.join(", ");
}

export function getCurrentStatusText(
  puzzleBoard: BoardType,
  isAutoRunning: boolean
): string {
  const isPuzzleSolved = checkIfPuzzleIsSolved(puzzleBoard);

  if (isPuzzleSolved) {
    return "Solved ✅";
  }

  if (isAutoRunning) {
    return "Running...";
  }

  return "Idle";
}
