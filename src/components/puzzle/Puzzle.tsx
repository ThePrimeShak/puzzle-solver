import { useEffect, useState, useRef } from "react";

import Board from "@/components/puzzle/Board";
import ControlInputGroup from "@/components/puzzle/ControlInputGroup";
import Controls from "@/components/puzzle/Controls";
import History from "@/components/puzzle/History";
import StatusInformation from "@/components/puzzle/StatusInformation";
import { GOAL_STATE, DEFAULT_SHUFFLE_MOVES } from "@/constants";
import type { BoardType, MoveType, AlgorithmType } from "@/types";
import {
  getValidMoves,
  executeMove,
  selectRandomMove,
  createShuffledPuzzle,
  formatMoveDescription,
  createHistoryEntry,
  solvePuzzleWithBFS,
  isPuzzleSolved,
  getHardestPuzzle,
  type BFSResult,
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
  const [isPuzzleShuffled, setIsPuzzleShuffled] = useState<boolean>(false);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmType>("bfs");
  const intervalTimerRef = useRef<number | null>(null);
  const bfsSolutionRef = useRef<MoveType[] | null>(null);
  const bfsStepIndexRef = useRef<number>(0);
  const bfsResultRef = useRef<BFSResult | null>(null);

  function performRandomStep() {
    // Check which algorithm is selected
    if (selectedAlgorithm === "bfs") {
      // For BFS: compute a fresh solution and execute only the first move
      const result = solvePuzzleWithBFS(puzzleBoard);

      // Handle edge cases
      if (result === null) {
        alert("BFS could not find a solution within the iteration limit.");
        return;
      }

      if (result.solution.length === 0) {
        alert("Puzzle is already solved! ✅");
        return;
      }

      // Execute only the FIRST move from the BFS solution
      const firstMove = result.solution[0];

      setPuzzleBoard((currentBoard) => {
        const updatedBoard = executeMove(currentBoard, firstMove);
        const moveDescription = formatMoveDescription(firstMove);
        setLastPerformedMove(moveDescription);

        setMoveHistory((previousHistory) => {
          const moveNumber = previousHistory.length + 1;
          const historyEntry = createHistoryEntry(
            moveNumber,
            firstMove,
            updatedBoard
          );
          return [historyEntry, ...previousHistory];
        });

        setTotalSteps((prev) => prev + 1);
        return updatedBoard;
      });
    } else {
      // For Random: perform a random move
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
  }

  function startAutoSolving() {
    // Don't start if already running
    const isAlreadyRunning = intervalTimerRef.current !== null;
    if (isAlreadyRunning) {
      return;
    }

    if (selectedAlgorithm === "bfs") {
      // Try to first find the solution using BFS

      const result = solvePuzzleWithBFS(puzzleBoard);

      if (result === null) {
        alert("BFS could not find a solution within the iteration limit.");
        return;
      }

      if (result.solution.length === 0) {
        alert("Puzzle is already solved! ✅");
        return;
      }

      // Store the solution path and BFS result
      bfsSolutionRef.current = result.solution;
      bfsStepIndexRef.current = 0;
      bfsResultRef.current = result;

      // Add message to history
      setMoveHistory((prev) => [
        `BFS found a solution with ${result.solution.length} moves! (Explored ${result.nodesExplored} nodes, Visited ${result.visitedStates} states)`,
        ...prev,
      ]);
    }

    setIsAutoRunning(true);
    let stepsTaken = 0;

    // Set up interval to perform steps automatically
    intervalTimerRef.current = setInterval(() => {
      stepsTaken = stepsTaken + 1;

      // For BFS mode: execute the pre-computed solution
      if (selectedAlgorithm === "bfs" && bfsSolutionRef.current) {
        // Check if we've completed all BFS steps
        if (bfsStepIndexRef.current >= bfsSolutionRef.current.length) {
          const result = bfsResultRef.current;
          stopAutoSolving();
          
          if (result) {
            alert(
              `🎉 Puzzle solved successfully using BFS! ✅\n\n` +
              `Solution Depth: ${result.depth} moves\n` +
              `Nodes Explored: ${result.nodesExplored}\n` +
              `States Visited: ${result.visitedStates}`
            );
          }
          return;
        }

        // Execute the next move from the BFS solution
        const nextMove = bfsSolutionRef.current[bfsStepIndexRef.current];
        bfsStepIndexRef.current += 1;

        setPuzzleBoard((currentBoard) => {
          const updatedBoard = executeMove(currentBoard, nextMove);
          const moveDescription = formatMoveDescription(nextMove);
          setLastPerformedMove(moveDescription);

          setMoveHistory((previousHistory) => {
            const moveNumber = previousHistory.length + 1;
            const historyEntry = createHistoryEntry(
              moveNumber,
              nextMove,
              updatedBoard
            );
            return [historyEntry, ...previousHistory];
          });

          setTotalSteps((prev) => prev + 1);
          return updatedBoard;
        });

        return;
      }

      // For random mode: check if solved
      if (selectedAlgorithm === "random") {
        // Check if puzzle is solved before taking another step
        setPuzzleBoard((currentBoard) => {
          if (isPuzzleSolved(currentBoard)) {
            stopAutoSolving();
            alert("🎉 Puzzle solved! ✅");
            return currentBoard;
          }

          // Stop if we've reached the maximum allowed steps
          const hasReachedMaxSteps = stepsTaken >= maxStepsAllowed;
          if (hasReachedMaxSteps) {
            stopAutoSolving();
            return currentBoard;
          }

          // Perform a random step
          const availableMoves = getValidMoves(currentBoard);
          if (availableMoves.length === 0) {
            return currentBoard;
          }

          const selectedMove = selectRandomMove(availableMoves);
          const updatedBoard = executeMove(currentBoard, selectedMove);

          const moveDescription = formatMoveDescription(selectedMove);
          setLastPerformedMove(moveDescription);

          setMoveHistory((previousHistory) => {
            const moveNumber = previousHistory.length + 1;
            const historyEntry = createHistoryEntry(
              moveNumber,
              selectedMove,
              updatedBoard
            );
            return [historyEntry, ...previousHistory];
          });

          setTotalSteps((prev) => prev + 1);
          return updatedBoard;
        });
      }
    }, animationSpeed);
  }

  function stopAutoSolving() {
    const hasActiveTimer = intervalTimerRef.current !== null;

    if (hasActiveTimer) {
      clearInterval(intervalTimerRef.current as number);
    }

    intervalTimerRef.current = null;
    setIsAutoRunning(false);

    // Reset BFS solution tracking
    bfsSolutionRef.current = null;
    bfsStepIndexRef.current = 0;
    bfsResultRef.current = null;
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

    // Enable puzzle play
    setIsPuzzleShuffled(true);
  }

  function loadHardestPuzzle() {
    // Stop any running auto-solve process
    stopAutoSolving();

    // Get one of the hardest puzzles
    const hardestBoard = getHardestPuzzle();
    setPuzzleBoard(hardestBoard);

    // Reset all state
    setMoveHistory(["Loaded hardest puzzle configuration"]);
    setPossibleMoves(getValidMoves(hardestBoard));
    setLastPerformedMove(null);
    setTotalSteps(0);

    // Enable puzzle play
    setIsPuzzleShuffled(true);
  }

  function resetToGoal() {
    stopAutoSolving();

    setPuzzleBoard(GOAL_STATE.slice());
    setMoveHistory(["Reset to GOAL"]);
    setTotalSteps(0);

    // Disable puzzle play
    setIsPuzzleShuffled(false);
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
            isPuzzleShuffled={isPuzzleShuffled}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            loadHardestPuzzle={loadHardestPuzzle}
          />

          <section
            aria-label="control input section"
            className="mt-2 mb-3 flex items-center justify-center gap-2"
          >
            <ControlInputGroup
              label="Max steps"
              value={maxStepsAllowed}
              setValue={setMaxStepsAllowed}
              disabled={isAutoRunning}
            />

            <ControlInputGroup
              label="Speed (ms)"
              value={animationSpeed}
              setValue={setAnimationSpeed}
              disabled={isAutoRunning}
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
