import ControlButton from "@/components/puzzle/ControlButton";

type ControlsProps = {
  resetAndShuffle: () => void;
  performRandomStep: () => void;
  stopAutoSolving: () => void;
  resetToGoal: () => void;
  isAutoRunning: boolean;
  startAutoSolving: () => void;
};

const Controls: React.FC<ControlsProps> = ({
  resetAndShuffle,
  performRandomStep,
  stopAutoSolving,
  resetToGoal,
  isAutoRunning,
  startAutoSolving,
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

        <ControlButton onClick={performRandomStep} variant="secondary">
          Step Once
        </ControlButton>

        {!isAutoRunning ? (
          <ControlButton onClick={startAutoSolving} variant="secondary">
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
