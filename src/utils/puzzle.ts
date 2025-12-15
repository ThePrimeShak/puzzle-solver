import {
  GOAL_STATE,
  EMPTY_TILE_VALUE,
  GRID_SIZE,
  HARDEST_PUZZLES,
} from "@/constants";
import type { BoardType, MoveType } from "@/types";

function findEmptyTileIndex(board: BoardType): number {
  const emptyTileIndex = board.indexOf(EMPTY_TILE_VALUE);
  return emptyTileIndex;
}

// Find row from tile index
function getRowFromIndex(tileIndex: number): number {
  const rowPosition = Math.floor(tileIndex / GRID_SIZE);
  return rowPosition;
}

// Find column from tile index
function getColumnFromIndex(tileIndex: number): number {
  const columnPosition = tileIndex % GRID_SIZE;
  return columnPosition;
}

// Check if the tile is on the highest row of the grid (because if we are on row 0, we can't move up)
function canMoveUp(rowPosition: number): boolean {
  const isNotInTopRow = rowPosition > 0;
  return isNotInTopRow;
}

// Check if the tile is on the lowest row of the grid (because if we are on the last row, we can't move down)
function canMoveDown(rowPosition: number): boolean {
  const isNotInBottomRow = rowPosition < GRID_SIZE - 1;
  return isNotInBottomRow;
}

// Check if the tile is on the leftmost column of the grid (because if we are on column 0, we can't move left)
function canMoveLeft(columnPosition: number): boolean {
  const isNotInLeftmostColumn = columnPosition > 0;
  return isNotInLeftmostColumn;
}

// Check if the tile is on the rightmost column of the grid (because if we are on the last column, we can't move right)
function canMoveRight(columnPosition: number): boolean {
  const isNotInRightmostColumn = columnPosition < GRID_SIZE - 1;
  return isNotInRightmostColumn;
}

export function getValidMoves(board: BoardType): MoveType[] {
  const emptyTileIndex = findEmptyTileIndex(board);
  const currentRow = getRowFromIndex(emptyTileIndex);
  const currentColumn = getColumnFromIndex(emptyTileIndex);
  const validMoves: MoveType[] = [];

  // Check if we can move a tile from above into the empty space
  if (canMoveUp(currentRow)) {
    const tileAboveIndex = emptyTileIndex - GRID_SIZE;
    validMoves.push({
      direction: "UP",
      swapWith: tileAboveIndex,
    });
  }

  // Check if we can move a tile from below into the empty space
  if (canMoveDown(currentRow)) {
    const tileBelowIndex = emptyTileIndex + GRID_SIZE;
    validMoves.push({
      direction: "DOWN",
      swapWith: tileBelowIndex,
    });
  }

  // Check if we can move a tile from the left into the empty space
  if (canMoveLeft(currentColumn)) {
    const tileLeftIndex = emptyTileIndex - 1;
    validMoves.push({
      direction: "LEFT",
      swapWith: tileLeftIndex,
    });
  }

  // Check if we can move a tile from the right into the empty space
  if (canMoveRight(currentColumn)) {
    const tileRightIndex = emptyTileIndex + 1;
    validMoves.push({
      direction: "RIGHT",
      swapWith: tileRightIndex,
    });
  }

  return validMoves;
}

// Execute a move on the board by swapping the empty tile with another tile and Returns a new board with the move applied
export function executeMove(board: BoardType, move: MoveType): BoardType {
  // Create a copy of the board to avoid mutating the original
  const newBoard = board.slice();
  const emptyTileIndex = findEmptyTileIndex(board);
  const targetTileIndex = move.swapWith;

  // Swap the empty tile with the target tile
  const emptyTileValue = newBoard[emptyTileIndex];
  const targetTileValue = newBoard[targetTileIndex];

  newBoard[emptyTileIndex] = targetTileValue;
  newBoard[targetTileIndex] = emptyTileValue;

  return newBoard;
}

// Select a random move from the list of available moves
export function selectRandomMove(moves: MoveType[]): MoveType {
  const randomIndex = Math.floor(Math.random() * moves.length);
  const selectedMove = moves[randomIndex];
  return selectedMove;
}

// Create a shuffled puzzle board by performing random moves FROM THE GOAL STATE(This ensures the puzzle is always solvable)
export function createShuffledPuzzle(numberOfMoves: number): BoardType {
  let currentBoard = GOAL_STATE.slice();

  // Perform the specified number of random moves
  for (let moveCount = 0; moveCount < numberOfMoves; moveCount++) {
    const availableMoves = getValidMoves(currentBoard);
    const randomMove = selectRandomMove(availableMoves);
    currentBoard = executeMove(currentBoard, randomMove);
  }

  return currentBoard;
}

// Get one of the hardest 8-puzzle configurations
export function getHardestPuzzle(): BoardType {
  const randomIndex = Math.floor(Math.random() * HARDEST_PUZZLES.length);
  return HARDEST_PUZZLES[randomIndex].slice();
}

export function formatMoveDescription(move: MoveType): string {
  const description = `${move.direction} (swap with index ${move.swapWith})`;
  return description;
}

export function createHistoryEntry(
  moveNumber: number,
  move: MoveType,
  resultingBoard: BoardType
): string {
  const boardString = resultingBoard.join(",");
  const entry = `#${moveNumber}: moved ${move.direction} -> board: [${boardString}]`;
  return entry;
}

// Check if the puzzle is solved by comparing with the goal state
export function isPuzzleSolved(board: BoardType): boolean {
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== GOAL_STATE[i]) {
      return false;
    }
  }
  return true;
}

// BFS Node: represents a state in the search tree
type BFSNode = {
  board: BoardType; // Current board state
  path: MoveType[]; // Sequence of moves to reach this state
  depth: number; // Depth level in the search tree
};

// BFS Result: information about the search process
export type BFSResult = {
  solution: MoveType[]; // The sequence of moves to solve the puzzle
  depth: number; // The depth of the solution (number of moves)
  nodesExplored: number; // Total number of nodes explored during search
  visitedStates: number; // Total number of unique states visited
};

// Solve the puzzle using BFS algorithm (WITHOUT visited set to show full exploration)
// Returns detailed information about the search process, or null if no solution found
export function solvePuzzleWithBFS(
  startBoard: BoardType,
  maxIterations: number = 500000
): BFSResult | null {
  // Check if already solved
  if (isPuzzleSolved(startBoard)) {
    return {
      solution: [],
      depth: 0,
      nodesExplored: 0,
      visitedStates: 0,
    };
  }

  // Queue for BFS: stores nodes to explore
  const queue: BFSNode[] = [];

  // Set to track visited board states (to avoid infinite loops)
  // We still use this for safety, but we count ALL states attempted
  const visitedStates = new Set<string>();

  // Counter for total nodes explored (actually dequeued and processed)
  let nodesExplored = 0;

  // Counter for total states attempted to add (including duplicates)
  let statesAttempted = 0;

  // Add the starting state to the queue
  const startNode: BFSNode = {
    board: startBoard,
    path: [],
    depth: 0,
  };

  queue.push(startNode);
  visitedStates.add(startBoard.join(","));
  statesAttempted++;

  let iterations = 0;

  // BFS main loop: explore states level by level
  while (queue.length > 0 && iterations < maxIterations) {
    iterations++;

    // Get the next state to explore (first in queue)
    const currentNode = queue.shift()!;
    nodesExplored++;

    // Get all valid moves from the current state
    const validMoves = getValidMoves(currentNode.board);

    // Try each possible move
    for (const move of validMoves) {
      // Apply the move to get a new board state
      const newBoard = executeMove(currentNode.board, move);

      // Count this state attempt (even if duplicate)
      statesAttempted++;

      // Check if this new state solves the puzzle
      if (isPuzzleSolved(newBoard)) {
        // Found solution! Return the path of moves and statistics
        const solutionPath = [...currentNode.path, move];
        const solutionDepth = currentNode.depth + 1;

        return {
          solution: solutionPath,
          depth: solutionDepth,
          nodesExplored: nodesExplored,
          visitedStates: statesAttempted, // Total states attempted (including duplicates)
        };
      }

      // Convert board to string for tracking
      const boardKey = newBoard.join(",");

      // Only add to queue if not visited (to avoid infinite loops)
      // But we already counted it in statesAttempted above
      if (!visitedStates.has(boardKey)) {
        visitedStates.add(boardKey);

        const newNode: BFSNode = {
          board: newBoard,
          path: [...currentNode.path, move],
          depth: currentNode.depth + 1,
        };
        queue.push(newNode);
      }
    }
  }

  // No solution found within the iteration limit
  return null;
}
