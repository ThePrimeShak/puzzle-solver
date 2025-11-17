import type { BoardType, MoveType } from "@/types";
import {
  getAvailableMovesText,
  getCurrentStatusText,
} from "@/utils/status-information";

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
  const displayLastMove = lastPerformedMove ?? "-";
  const availableMovesText = getAvailableMovesText(possibleMoves);
  const statusText = getCurrentStatusText(puzzleBoard, isAutoRunning);

  return (
    <section className="mb-3" aria-label="Status Information">
      <h2 className="mb-2 text-center text-lg font-semibold md:text-left">
        Status Information
      </h2>

      <div className="flex flex-col gap-1 text-center text-sm md:text-left">
        <span>Step count: {totalSteps}</span>
        <span>Last move: {displayLastMove}</span>
        <span>Available moves: {availableMovesText}</span>
        <span>Status: {statusText}</span>
      </div>
    </section>
  );
};

export default StatusInformation;
