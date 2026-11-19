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
  getValidMoves,
  selectRandomMove,
} from "@/features/puzzle/lib/puzzle";
import { isBoardSolved } from "@/features/puzzle/lib/status";
import type { Board, MoveHistoryEntry } from "@/features/puzzle/types";

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

  const startAutoSolving = useCallback(() => {
    if (timerRef.current !== null || !canMove) {
      return;
    }

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
    canMove,
    maxStepsAllowed,
    performRandomStep,
    stopAutoSolving,
  ]);

  const resetAndShuffle = useCallback(() => {
    stopAutoSolving();
    setSession({
      ...INITIAL_SESSION,
      board: createShuffledPuzzle(DEFAULT_SHUFFLE_MOVES),
    });
  }, [stopAutoSolving]);

  const resetToGoal = useCallback(() => {
    stopAutoSolving();
    setSession(INITIAL_SESSION);
  }, [stopAutoSolving]);

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
    maxStepsAllowed,
    moveHistory: session.history,
    performRandomStep,
    possibleMoves,
    puzzleBoard: session.board,
    resetAndShuffle,
    resetToGoal,
    setAnimationSpeed,
    setMaxStepsAllowed,
    startAutoSolving,
    stopAutoSolving,
    totalSteps: session.totalSteps,
  };
}
