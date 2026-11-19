import {
  EMPTY_TILE_VALUE,
  GOAL_STATE,
  GRID_SIZE,
} from "@/features/puzzle/constants";
import type { Board, Move, MoveHistoryEntry } from "@/features/puzzle/types";

function findEmptyTileIndex(board: Board): number {
  return board.indexOf(EMPTY_TILE_VALUE);
}

export function getValidMoves(board: Board): Move[] {
  const emptyTileIndex = findEmptyTileIndex(board);
  const row = Math.floor(emptyTileIndex / GRID_SIZE);
  const column = emptyTileIndex % GRID_SIZE;
  const moves: Move[] = [];

  if (row > 0) {
    moves.push({ direction: "UP", swapWith: emptyTileIndex - GRID_SIZE });
  }

  if (row < GRID_SIZE - 1) {
    moves.push({ direction: "DOWN", swapWith: emptyTileIndex + GRID_SIZE });
  }

  if (column > 0) {
    moves.push({ direction: "LEFT", swapWith: emptyTileIndex - 1 });
  }

  if (column < GRID_SIZE - 1) {
    moves.push({ direction: "RIGHT", swapWith: emptyTileIndex + 1 });
  }

  return moves;
}

export function executeMove(board: Board, move: Move): Board {
  const nextBoard = [...board];
  const emptyTileIndex = findEmptyTileIndex(board);

  [nextBoard[emptyTileIndex], nextBoard[move.swapWith]] = [
    nextBoard[move.swapWith],
    nextBoard[emptyTileIndex],
  ];

  return nextBoard;
}

export function selectRandomMove(moves: Move[]): Move {
  const selectedMove = moves[Math.floor(Math.random() * moves.length)];

  if (!selectedMove) {
    throw new Error("Cannot select a move from an empty list");
  }

  return selectedMove;
}

export function createShuffledPuzzle(numberOfMoves: number): Board {
  let board: Board = [...GOAL_STATE];

  for (let moveCount = 0; moveCount < numberOfMoves; moveCount += 1) {
    board = executeMove(board, selectRandomMove(getValidMoves(board)));
  }

  return board;
}

export function formatMoveDescription(move: Move): string {
  return `${move.direction} (swap with index ${move.swapWith})`;
}

export function createHistoryEntry(
  step: number,
  move: Move,
  resultingBoard: Board
): MoveHistoryEntry {
  return {
    step,
    description: `#${step}: moved ${move.direction} → board: [${resultingBoard.join(",")}]`,
  };
}
