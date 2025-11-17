import ControlButton from "@/components/puzzle/ControlButton";

type ControlsProps = {
  resetAndShuffle: () => void;
  performRandomStep: () => void;
  stopAutoSolving: () => void;
  resetToGoal: () => void;
  isAutoRunning: boolean;
  startAutoSolving: () => void;
  isPuzzleShuffled: boolean;
};

const Controls: React.FC<ControlsProps> = ({
  resetAndShuffle,
  performRandomStep,
  stopAutoSolving,
  resetToGoal,
  isAutoRunning,
  startAutoSolving,
  isPuzzleShuffled,
}) => {
  return (
    <section aria-label="Puzzle Controls">
      <h2 className="mb-2 text-center text-lg font-semibold md:text-left">
        Controls
      </h2>

      <div className="flex flex-wrap justify-center gap-2">
        <ControlButton onClick={resetAndShuffle} variant="primary">
          New Shuffle
        </ControlButton>

        <ControlButton
          onClick={performRandomStep}
          variant="secondary"
          disabled={!isPuzzleShuffled}
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

        <ControlButton onClick={resetToGoal} variant="secondary">
          Reset to Goal
        </ControlButton>
      </div>
    </section>
  );
};

export default Controls;
