import { useEffect, useState, useRef } from "react";

import Board from "@/components/puzzle/Board";
import ControlInputGroup from "@/components/puzzle/ControlInputGroup";
import Controls from "@/components/puzzle/Controls";
import History from "@/components/puzzle/History";
import StatusInformation from "@/components/puzzle/StatusInformation";
import { GOAL_STATE, DEFAULT_SHUFFLE_MOVES } from "@/constants";
import type { BoardType, MoveType } from "@/types";
import {
  getValidMoves,
  executeMove,
  selectRandomMove,
  createShuffledPuzzle,
  formatMoveDescription,
  createHistoryEntry,
} from "@/utils/puzzle";

const Puzzle = () => {
  const [puzzleBoard, setPuzzleBoard] = useState<BoardType>(GOAL_STATE);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [possibleMoves, setPossibleMoves] = useState<MoveType[]>([]);
  const [lastPerformedMove, setLastPerformedMove] = useState<string | null>(
    null
  );
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);
  const [maxStepsAllowed, setMaxStepsAllowed] = useState<number>(1000);
  const [animationSpeed, setAnimationSpeed] = useState<number>(300);
  const intervalTimerRef = useRef<number | null>(null);

  function performRandomStep() {
    setPuzzleBoard((currentBoard) => {
      const availableMoves = getValidMoves(currentBoard);
      setPossibleMoves(availableMoves);

      // If no moves are available, keep the current board
      const hasNoAvailableMoves = availableMoves.length === 0;
      if (hasNoAvailableMoves) {
        return currentBoard;
      }

      const selectedMove = selectRandomMove(availableMoves);
      const updatedBoard = executeMove(currentBoard, selectedMove);

      const moveDescription = formatMoveDescription(selectedMove);
      setLastPerformedMove(moveDescription);

      // Add this move to the history
      setMoveHistory((previousHistory) => {
        const moveNumber = previousHistory.length + 1;
        const historyEntry = createHistoryEntry(
          moveNumber,
          selectedMove,
          updatedBoard
        );
        const newHistory = [historyEntry, ...previousHistory];
        return newHistory;
      });

      // Increment the step counter
      setTotalSteps((previousSteps) => previousSteps + 1);

      return updatedBoard;
    });
  }

  function startAutoSolving() {
    // Don't start if already running
    const isAlreadyRunning = intervalTimerRef.current !== null;
    if (isAlreadyRunning) {
      return;
    }

    setIsAutoRunning(true);
    let stepsTaken = 0;

    // Set up interval to perform steps automatically
    intervalTimerRef.current = setInterval(() => {
      stepsTaken = stepsTaken + 1;

      // Stop if we've reached the maximum allowed steps
      const hasReachedMaxSteps = stepsTaken >= maxStepsAllowed;
      if (hasReachedMaxSteps) {
        stopAutoSolving();
        return;
      }

      performRandomStep();
    }, animationSpeed);
  }

  function stopAutoSolving() {
    const hasActiveTimer = intervalTimerRef.current !== null;

    if (hasActiveTimer) {
      clearInterval(intervalTimerRef.current as number);
    }

    intervalTimerRef.current = null;
    setIsAutoRunning(false);
  }

  function resetAndShuffle() {
    // Stop any running auto-solve process
    stopAutoSolving();

    // Create a new shuffled board
    const shuffledBoard = createShuffledPuzzle(DEFAULT_SHUFFLE_MOVES);
    setPuzzleBoard(shuffledBoard);

    // Reset all state
    setMoveHistory([]);
    setPossibleMoves(getValidMoves(shuffledBoard));
    setLastPerformedMove(null);
    setTotalSteps(0);
  }

  function resetToGoal() {
    stopAutoSolving();

    setPuzzleBoard(GOAL_STATE.slice());
    setMoveHistory(["Reset to GOAL"]);
    setTotalSteps(0);
  }

  // Update available moves whenever the board changes
  useEffect(() => {
    const currentPossibleMoves = getValidMoves(puzzleBoard);
    setPossibleMoves(currentPossibleMoves);
  }, [puzzleBoard]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopAutoSolving(); // Prevent memory leaks by stopping auto-solving on unmount
    };
  }, []);

  return (
    <section className="container max-w-4xl py-6">
      <div className="flex flex-col gap-6 overflow-hidden md:flex-row md:gap-3">
        {/* Left side: Board, Controls, and Status */}
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

        {/* Right side: Move History */}
        <History histories={moveHistory} />
      </div>
    </section>
  );
};

export default Puzzle;
