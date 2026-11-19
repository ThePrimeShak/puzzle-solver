import { useCallback, useEffect, useRef, useState } from "react";

import {
  DEFAULT_ANIMATION_SPEED_MS,
  DEFAULT_MAX_STEPS,
  DEFAULT_SHUFFLE_MOVES,
  GOAL_STATE,
} from "@/features/puzzle/constants";
import {
  createHistoryEntry,
  createShuffledPuzzle,
  executeMove,
  formatMoveDescription,
  getHardestPuzzle,
  getValidMoves,
  selectRandomMove,
  solvePuzzleWithBfs,
} from "@/features/puzzle/lib/puzzle";
import { isBoardSolved } from "@/features/puzzle/lib/status";
import type {
  Algorithm,
  Board,
  Move,
  MoveHistoryEntry,
  SearchResult,
} from "@/features/puzzle/types";

type PuzzleSession = {
  board: Board;
  history: MoveHistoryEntry[];
  lastMove: string | null;
  totalSteps: number;
};

const INITIAL_SESSION: PuzzleSession = {
  board: GOAL_STATE,
  history: [],
  lastMove: null,
  totalSteps: 0,
};

export function usePuzzle() {
  const [session, setSession] = useState<PuzzleSession>(INITIAL_SESSION);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [maxStepsAllowed, setMaxStepsAllowed] = useState(DEFAULT_MAX_STEPS);
  const [animationSpeed, setAnimationSpeed] = useState(
    DEFAULT_ANIMATION_SPEED_MS
  );
  const [selectedAlgorithm, setSelectedAlgorithmState] =
    useState<Algorithm>("bfs");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [solverError, setSolverError] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const possibleMoves = getValidMoves(session.board);
  const canMove = !isBoardSolved(session.board);

  const stopAutoSolving = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsAutoRunning(false);
  }, []);

  const applyMove = useCallback((move: Move) => {
    setSession((currentSession) => {
      if (isBoardSolved(currentSession.board)) {
        return currentSession;
      }

      const updatedBoard = executeMove(currentSession.board, move);
      const nextStep = currentSession.totalSteps + 1;

      return {
        board: updatedBoard,
        history: [
          createHistoryEntry(nextStep, move, updatedBoard),
          ...currentSession.history,
        ],
        lastMove: formatMoveDescription(move),
        totalSteps: nextStep,
      };
    });
  }, []);

  const performRandomStep = useCallback(() => {
    setSession((currentSession) => {
      const availableMoves = getValidMoves(currentSession.board);

      if (availableMoves.length === 0 || isBoardSolved(currentSession.board)) {
        return currentSession;
      }

      const selectedMove = selectRandomMove(availableMoves);
      const updatedBoard = executeMove(currentSession.board, selectedMove);
      const nextStep = currentSession.totalSteps + 1;

      return {
        board: updatedBoard,
        history: [
          createHistoryEntry(nextStep, selectedMove, updatedBoard),
          ...currentSession.history,
        ],
        lastMove: formatMoveDescription(selectedMove),
        totalSteps: nextStep,
      };
    });
  }, []);

  const performStep = useCallback(() => {
    setSolverError(null);

    if (selectedAlgorithm === "random") {
      setSearchResult(null);
      performRandomStep();
      return;
    }

    const result = solvePuzzleWithBfs(session.board);

    if (!result) {
      setSolverError("BFS could not find a solution within the search limit.");
      return;
    }

    setSearchResult(result);
    const nextMove = result.solution[0];

    if (nextMove) {
      applyMove(nextMove);
    }
  }, [applyMove, performRandomStep, selectedAlgorithm, session.board]);

  const startAutoSolving = useCallback(() => {
    if (timerRef.current !== null || !canMove) {
      return;
    }

    setSolverError(null);

    if (selectedAlgorithm === "bfs") {
      const result = solvePuzzleWithBfs(session.board);

      if (!result) {
        setSolverError(
          "BFS could not find a solution within the search limit."
        );
        return;
      }

      setSearchResult(result);
      let solutionIndex = 0;
      setIsAutoRunning(true);

      timerRef.current = window.setInterval(() => {
        const nextMove = result.solution[solutionIndex];

        if (!nextMove) {
          stopAutoSolving();
          return;
        }

        applyMove(nextMove);
        solutionIndex += 1;

        if (solutionIndex >= result.solution.length) {
          stopAutoSolving();
        }
      }, animationSpeed);

      return;
    }

    setSearchResult(null);
    let stepsTaken = 0;
    setIsAutoRunning(true);

    timerRef.current = window.setInterval(() => {
      performRandomStep();
      stepsTaken += 1;

      if (stepsTaken >= maxStepsAllowed) {
        stopAutoSolving();
      }
    }, animationSpeed);
  }, [
    animationSpeed,
    applyMove,
    canMove,
    maxStepsAllowed,
    performRandomStep,
    selectedAlgorithm,
    session.board,
    stopAutoSolving,
  ]);

  const resetSession = useCallback(
    (board: Board) => {
      stopAutoSolving();
      setSearchResult(null);
      setSolverError(null);
      setSession({ ...INITIAL_SESSION, board });
    },
    [stopAutoSolving]
  );

  const resetAndShuffle = useCallback(() => {
    resetSession(createShuffledPuzzle(DEFAULT_SHUFFLE_MOVES));
  }, [resetSession]);

  const loadHardestPuzzle = useCallback(() => {
    resetSession(getHardestPuzzle());
  }, [resetSession]);

  const resetToGoal = useCallback(() => {
    resetSession(GOAL_STATE);
  }, [resetSession]);

  const setSelectedAlgorithm = useCallback((algorithm: Algorithm) => {
    setSelectedAlgorithmState(algorithm);
    setSearchResult(null);
    setSolverError(null);
  }, []);

  useEffect(() => {
    if (isAutoRunning && !canMove) {
      stopAutoSolving();
    }
  }, [canMove, isAutoRunning, stopAutoSolving]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    animationSpeed,
    canMove,
    isAutoRunning,
    lastPerformedMove: session.lastMove,
    loadHardestPuzzle,
    maxStepsAllowed,
    moveHistory: session.history,
    performStep,
    possibleMoves,
    puzzleBoard: session.board,
    resetAndShuffle,
    resetToGoal,
    searchResult,
    selectedAlgorithm,
    setAnimationSpeed,
    setMaxStepsAllowed,
    setSelectedAlgorithm,
    solverError,
    startAutoSolving,
    stopAutoSolving,
    totalSteps: session.totalSteps,
  };
}
