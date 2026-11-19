import ControlButton from "@/features/puzzle/components/ControlButton";
import type { Algorithm } from "@/features/puzzle/types";

type ControlsProps = {
  resetAndShuffle: () => void;
  performStep: () => void;
  stopAutoSolving: () => void;
  resetToGoal: () => void;
  loadHardestPuzzle: () => void;
  isAutoRunning: boolean;
  startAutoSolving: () => void;
  canMove: boolean;
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
};

const Controls: React.FC<ControlsProps> = ({
  resetAndShuffle,
  performStep,
  stopAutoSolving,
  resetToGoal,
  loadHardestPuzzle,
  isAutoRunning,
  startAutoSolving,
  canMove,
  selectedAlgorithm,
  setSelectedAlgorithm,
}) => {
  return (
    <section
      aria-label="Puzzle Controls"
      className="border-t border-slate-700 pt-5"
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">Method</p>
          <h2 className="text-sm font-semibold text-slate-200">
            Search controls
          </h2>
        </div>

        <div className="relative min-w-36">
          <label className="sr-only" htmlFor="algorithm-select">
            Search algorithm
          </label>
          <select
            id="algorithm-select"
            value={selectedAlgorithm}
            disabled={isAutoRunning}
            onChange={(event) =>
              setSelectedAlgorithm(event.target.value as Algorithm)
            }
            className="h-10 w-full appearance-none border border-slate-600 bg-slate-950 py-2 pr-9 pl-3 text-sm font-semibold text-slate-200 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <option value="bfs">Breadth-first search</option>
            <option value="random">Random walk</option>
          </select>
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 fill-slate-400"
          >
            <path d="m5.4 7.5 4.6 4.6 4.6-4.6 1.4 1.4-6 6-6-6 1.4-1.4Z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <ControlButton
          onClick={resetAndShuffle}
          variant="primary"
          disabled={isAutoRunning}
        >
          New Shuffle
        </ControlButton>

        <ControlButton
          onClick={loadHardestPuzzle}
          variant="secondary"
          disabled={isAutoRunning}
        >
          Load Hard Case
        </ControlButton>

        <ControlButton
          onClick={performStep}
          variant="secondary"
          disabled={!canMove || isAutoRunning}
        >
          Step Once
        </ControlButton>

        {!isAutoRunning ? (
          <ControlButton
            onClick={startAutoSolving}
            variant="secondary"
            disabled={!canMove}
          >
            {selectedAlgorithm === "bfs" ? "Solve" : "Run Random"}
          </ControlButton>
        ) : (
          <ControlButton onClick={stopAutoSolving} variant="danger">
            Stop
          </ControlButton>
        )}

        <ControlButton
          onClick={resetToGoal}
          variant="secondary"
          disabled={isAutoRunning}
        >
          Reset to Goal
        </ControlButton>
      </div>
    </section>
  );
};

export default Controls;
