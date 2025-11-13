import { useEffect, useState, useRef } from "react";

import Board from "@/components/puzzle/Board";
import ControlInputGroup from "@/components/puzzle/ControlInputGroup";
import Controls from "@/components/puzzle/Controls";
import History from "@/components/puzzle/History";
import { GOAL_STATE } from "@/constants";
import type { BoardType, MoveType } from "@/types";

import StatusInformation from "./StatusInformation";

const Puzzle = () => {
  const [puzzleBoard, setPuzzleBoard] = useState<BoardType>(GOAL_STATE);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [possibleMoves, setPossibleMoves] = useState<MoveType[]>([]);

  const [lastPerformedMove, setLastPerformedMove] = useState<string | null>(
    null
  );

  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);

  const intervalTimerRef = useRef<number | null>(null);

  const [maxStepsAllowed, setMaxStepsAllowed] = useState<number>(1000);
  const [animationSpeed, setAnimationSpeed] = useState<number>(300);

  // Helper: Find index of empty tile (0)
  function findEmptyTileIndex(board: BoardType): number {
    return board.indexOf(0);
  }

  // Helper: Get all valid moves from current position
  function getValidMoves(board: BoardType): MoveType[] {
    const emptyIndex = findEmptyTileIndex(board);
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    const validMoves: MoveType[] = [];

    // Can move up (swap with tile above)
    if (row > 0) {
      validMoves.push({ direction: "UP", swapWith: emptyIndex - 3 });
    }
    // Can move down (swap with tile below)
    if (row < 2) {
      validMoves.push({ direction: "DOWN", swapWith: emptyIndex + 3 });
    }
    // Can move left (swap with tile on left)
    if (col > 0) {
      validMoves.push({ direction: "LEFT", swapWith: emptyIndex - 1 });
    }
    // Can move right (swap with tile on right)
    if (col < 2) {
      validMoves.push({ direction: "RIGHT", swapWith: emptyIndex + 1 });
    }

    return validMoves;
  }

  // Helper: Apply a move to the board
  function executeMove(board: BoardType, move: MoveType): BoardType {
    const newBoard = board.slice();
    const emptyIndex = findEmptyTileIndex(board);

    // Swap empty tile with target tile
    [newBoard[emptyIndex], newBoard[move.swapWith]] = [
      newBoard[move.swapWith],
      newBoard[emptyIndex],
    ];

    return newBoard;
  }

  // Helper: Create a shuffled board by random moves from goal
  function createShuffledPuzzle(numberOfMoves: number): BoardType {
    let currentBoard = GOAL_STATE.slice();

    for (let i = 0; i < numberOfMoves; i++) {
      const moves = getValidMoves(currentBoard);
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      currentBoard = executeMove(currentBoard, randomMove);
    }

    return currentBoard;
  }

  // Perform one random step
  function performRandomStep() {
    setPuzzleBoard((currentBoard) => {
      const moves = getValidMoves(currentBoard);
      setPossibleMoves(moves);

      if (moves.length === 0) return currentBoard;

      const selectedMove = moves[Math.floor(Math.random() * moves.length)];
      const updatedBoard = executeMove(currentBoard, selectedMove);

      setLastPerformedMove(
        `${selectedMove.direction} (swap with index ${selectedMove.swapWith})`
      );
      setMoveHistory((history) => [
        `#${history.length + 1}: moved ${
          selectedMove.direction
        } -> board: [${updatedBoard.join(",")}]`,
        ...history,
      ]);
      setTotalSteps((steps) => steps + 1);

      return updatedBoard;
    });
  }

  // Start automatic random walk
  function startAutoSolving() {
    if (intervalTimerRef.current) return;

    setIsAutoRunning(true);
    let stepsTaken = 0;

    intervalTimerRef.current = setInterval(() => {
      stepsTaken++;

      if (stepsTaken >= maxStepsAllowed) {
        stopAutoSolving();
        return;
      }

      performRandomStep();
    }, animationSpeed);
  }

  // Stop automatic solving
  function stopAutoSolving() {
    if (intervalTimerRef.current !== null) {
      clearInterval(intervalTimerRef.current);
    }
    intervalTimerRef.current = null;
    setIsAutoRunning(false);
  }

  // Reset and shuffle the puzzle
  function resetAndShuffle() {
    stopAutoSolving();
    const shuffledBoard = createShuffledPuzzle(40);
    setPuzzleBoard(shuffledBoard);
    setMoveHistory([]);
    setPossibleMoves(getValidMoves(shuffledBoard));
    setLastPerformedMove(null);
    setTotalSteps(0);
  }

  // Reset to goal state
  function resetToGoal() {
    setPuzzleBoard(GOAL_STATE.slice());
    setMoveHistory(["Reset to GOAL"]);
    setTotalSteps(0);
    stopAutoSolving();
  }

  // Update available moves when board changes
  useEffect(() => {
    setPossibleMoves(getValidMoves(puzzleBoard));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzleBoard]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalTimerRef.current !== null) {
        clearInterval(intervalTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="container max-w-4xl py-6">
      <div className="flex flex-col gap-6 overflow-hidden md:flex-row md:gap-3">
        <div className="flex flex-col">
          <Board puzzleBoard={puzzleBoard} />

          <Controls
            resetAndShuffle={resetAndShuffle}
            performRandomStep={performRandomStep}
            stopAutoSolving={stopAutoSolving}
            resetToGoal={resetToGoal}
            isAutoRunning={isAutoRunning}
            startAutoSolving={startAutoSolving}
          />

          <section
            aria-label="control input section"
            className="mt-2 mb-3 flex items-center justify-center gap-2"
          >
            <ControlInputGroup
              label="Max steps"
              value={maxStepsAllowed}
              setValue={setMaxStepsAllowed}
            />

            <ControlInputGroup
              label="Speed (ms)"
              value={animationSpeed}
              setValue={setAnimationSpeed}
            />
          </section>

          <StatusInformation
            totalSteps={totalSteps}
            lastPerformedMove={lastPerformedMove}
            possibleMoves={possibleMoves}
            puzzleBoard={puzzleBoard}
            isAutoRunning={isAutoRunning}
          />
        </div>

        <History histories={moveHistory} />
      </div>
    </section>
  );
};

export default Puzzle;
