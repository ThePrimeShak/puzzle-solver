import ControlButton from "@/components/puzzle/ControlButton";
import type { AlgorithmType } from "@/types";

type ControlsProps = {
  resetAndShuffle: () => void;
  performRandomStep: () => void;
  stopAutoSolving: () => void;
  resetToGoal: () => void;
  isAutoRunning: boolean;
  startAutoSolving: () => void;
  isPuzzleShuffled: boolean;
  selectedAlgorithm: AlgorithmType;
  setSelectedAlgorithm: (algorithm: AlgorithmType) => void;
  loadHardestPuzzle: () => void;
};

const Controls: React.FC<ControlsProps> = ({
  resetAndShuffle,
  performRandomStep,
  stopAutoSolving,
  resetToGoal,
  isAutoRunning,
  startAutoSolving,
  isPuzzleShuffled,
  selectedAlgorithm,
  setSelectedAlgorithm,
  loadHardestPuzzle,
}) => {
  return (
    <section aria-label="Puzzle Controls">
      <h2 className="mb-2 text-center text-lg font-semibold md:text-left">
        Controls
      </h2>

      <div className="flex flex-wrap justify-center gap-2">
        <ControlButton
          onClick={resetAndShuffle}
          variant="primary"
          disabled={isAutoRunning}
        >
          New Shuffle
        </ControlButton>

        <ControlButton
          onClick={loadHardestPuzzle}
          variant="primary"
          disabled={isAutoRunning}
        >
          Hardest Puzzle 🔥
        </ControlButton>

        <ControlButton
          onClick={performRandomStep}
          variant="secondary"
          disabled={!isPuzzleShuffled || isAutoRunning}
        >
          Step Once
        </ControlButton>

        {!isAutoRunning ? (
          <ControlButton
            onClick={startAutoSolving}
            variant="secondary"
            disabled={!isPuzzleShuffled}
          >
            Run
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

      <div className="mt-3 flex items-center justify-center gap-2">
        <label htmlFor="algorithm-select" className="text-sm font-medium">
          Algorithm:
        </label>
        <select
          id="algorithm-select"
          value={selectedAlgorithm}
          onChange={(e) =>
            setSelectedAlgorithm(e.target.value as AlgorithmType)
          }
          disabled={isAutoRunning}
          className="cursor-pointer rounded border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="random" className="text-black">
            Random
          </option>
          <option value="bfs" className="text-black">
            BFS
          </option>
        </select>
      </div>
    </section>
  );
};

export default Controls;
