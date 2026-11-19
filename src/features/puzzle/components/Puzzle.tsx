import Board from "@/features/puzzle/components/Board";
import ControlInputGroup from "@/features/puzzle/components/ControlInputGroup";
import Controls from "@/features/puzzle/components/Controls";
import History from "@/features/puzzle/components/History";
import StatusInformation from "@/features/puzzle/components/StatusInformation";
import { usePuzzle } from "@/features/puzzle/hooks/usePuzzle";

const Puzzle = () => {
  const {
    animationSpeed,
    canMove,
    isAutoRunning,
    lastPerformedMove,
    maxStepsAllowed,
    moveHistory,
    performRandomStep,
    possibleMoves,
    puzzleBoard,
    resetAndShuffle,
    resetToGoal,
    setAnimationSpeed,
    setMaxStepsAllowed,
    startAutoSolving,
    stopAutoSolving,
    totalSteps,
  } = usePuzzle();

  return (
    <section className="container max-w-6xl py-8 sm:py-12">
      <div className="mb-8 max-w-3xl border-l-2 border-amber-300 pl-5 sm:mb-10 sm:pl-7">
        <p className="mb-3 font-mono text-xs font-semibold tracking-[0.14em] text-amber-300 uppercase">
          AI coursework / state-space exploration
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          A visual study of the 8-puzzle state space.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Shuffle a solvable board, apply valid operators manually or as a
          random walk, and inspect every resulting state in sequence.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        {/* Left side: Board, Controls, and Status */}
        <div className="panel flex flex-col gap-5 p-5 sm:p-6">
          <Board puzzleBoard={puzzleBoard} />

          <Controls
            resetAndShuffle={resetAndShuffle}
            performRandomStep={performRandomStep}
            stopAutoSolving={stopAutoSolving}
            resetToGoal={resetToGoal}
            isAutoRunning={isAutoRunning}
            startAutoSolving={startAutoSolving}
            canMove={canMove}
          />

          <section
            aria-label="control input section"
            className="grid grid-cols-2 gap-3"
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
