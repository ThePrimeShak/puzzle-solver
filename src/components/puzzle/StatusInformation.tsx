import { GOAL_STATE } from "@/constants";
import type { BoardType, MoveType } from "@/types";

type StatusInformationProps = {
  totalSteps: number;
  lastPerformedMove: string | null;
  possibleMoves: MoveType[];
  puzzleBoard: BoardType;
  isAutoRunning: boolean;
};

const StatusInformation: React.FC<StatusInformationProps> = ({
  lastPerformedMove,
  totalSteps,
  possibleMoves,
  puzzleBoard,
  isAutoRunning,
}) => {
  const isSolved = (board: BoardType): boolean => {
    return board.every((value, index) => value === GOAL_STATE[index]);
  };

  return (
    <section className="mb-3" aria-label="Status Information">
      <h2 className="mb-2 text-center text-lg font-semibold md:text-left">
        Status Information
      </h2>
      <div className="flex flex-col gap-1 text-center text-sm md:text-left">
        <span>Step count: {totalSteps}</span>
        <span>Last move: {lastPerformedMove ?? "-"}</span>
        <span>
          Available moves: {possibleMoves.map((m) => m.direction).join(", ")}
        </span>
        <span>
          Status:{" "}
          {isSolved(puzzleBoard)
            ? "Solved ✅"
            : isAutoRunning
              ? "Running..."
              : "Idle"}
        </span>
      </div>
    </section>
  );
};

export default StatusInformation;
