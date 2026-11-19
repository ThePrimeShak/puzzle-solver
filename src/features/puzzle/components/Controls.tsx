import ControlButton from "@/features/puzzle/components/ControlButton";

type ControlsProps = {
  resetAndShuffle: () => void;
  performRandomStep: () => void;
  stopAutoSolving: () => void;
  resetToGoal: () => void;
  isAutoRunning: boolean;
  startAutoSolving: () => void;
  canMove: boolean;
};

const Controls: React.FC<ControlsProps> = ({
  resetAndShuffle,
  performRandomStep,
  stopAutoSolving,
  resetToGoal,
  isAutoRunning,
  startAutoSolving,
  canMove,
}) => {
  return (
    <section
      aria-label="Puzzle Controls"
      className="border-t border-white/10 pt-5"
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-200">Controls</h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <ControlButton onClick={resetAndShuffle} variant="primary">
          New Shuffle
        </ControlButton>

        <ControlButton
          onClick={performRandomStep}
          variant="secondary"
          disabled={!canMove}
        >
          Step Once
        </ControlButton>

        {!isAutoRunning ? (
          <ControlButton
            onClick={startAutoSolving}
            variant="secondary"
            disabled={!canMove}
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
