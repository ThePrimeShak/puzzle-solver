import {
  EMPTY_TILE_VALUE,
  GOAL_STATE,
  GRID_SIZE,
  HARDEST_PUZZLES,
  MAX_BFS_ITERATIONS,
} from "../constants";
import { isBoardSolved } from "./status";

import type { Board, Move, MoveHistoryEntry, SearchResult } from "../types";

type ParentLink = {
  previousKey: string;
  move: Move;
};

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

export function getHardestPuzzle(): Board {
  const puzzle =
    HARDEST_PUZZLES[Math.floor(Math.random() * HARDEST_PUZZLES.length)];

  if (!puzzle) {
    throw new Error("No hard puzzle configurations are available");
  }

  return [...puzzle];
}

function serializeBoard(board: Board): string {
  return board.join(",");
}

function reconstructPath(
  solvedKey: string,
  parents: ReadonlyMap<string, ParentLink | null>
): Move[] {
  const reversedPath: Move[] = [];
  let currentKey = solvedKey;

  while (true) {
    const parent = parents.get(currentKey);

    if (!parent) {
      break;
    }

    reversedPath.push(parent.move);
    currentKey = parent.previousKey;
  }

  return reversedPath.reverse();
}

export function solvePuzzleWithBfs(
  startBoard: Board,
  maxIterations = MAX_BFS_ITERATIONS
): SearchResult | null {
  if (isBoardSolved(startBoard)) {
    return {
      solution: [],
      depth: 0,
      nodesExplored: 0,
      visitedStates: 1,
    };
  }

  const startKey = serializeBoard(startBoard);
  const queue: Board[] = [[...startBoard]];
  const parents = new Map<string, ParentLink | null>([[startKey, null]]);
  let queueIndex = 0;
  let nodesExplored = 0;

  while (queueIndex < queue.length && nodesExplored < maxIterations) {
    const currentBoard = queue[queueIndex];
    queueIndex += 1;

    if (!currentBoard) {
      break;
    }

    nodesExplored += 1;
    const currentKey = serializeBoard(currentBoard);

    for (const move of getValidMoves(currentBoard)) {
      const nextBoard = executeMove(currentBoard, move);
      const nextKey = serializeBoard(nextBoard);

      if (parents.has(nextKey)) {
        continue;
      }

      parents.set(nextKey, { previousKey: currentKey, move });

      if (isBoardSolved(nextBoard)) {
        const solution = reconstructPath(nextKey, parents);

        return {
          solution,
          depth: solution.length,
          nodesExplored,
          visitedStates: parents.size,
        };
      }

      queue.push(nextBoard);
    }
  }

  return null;
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
