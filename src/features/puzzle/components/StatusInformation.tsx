import {
  getAvailableMovesText,
  getPuzzleStatus,
} from "@/features/puzzle/lib/status";
import type {
  Algorithm,
  Board,
  Move,
  PuzzleStatus,
  SearchResult,
} from "@/features/puzzle/types";

type StatusInformationProps = {
  totalSteps: number;
  lastPerformedMove: string | null;
  possibleMoves: Move[];
  puzzleBoard: Board;
  isAutoRunning: boolean;
  searchResult: SearchResult | null;
  selectedAlgorithm: Algorithm;
  solverError: string | null;
};

const STATUS_LABELS: Record<PuzzleStatus, string> = {
  solved: "Solved",
  running: "Running...",
  idle: "Idle",
};

const StatusInformation: React.FC<StatusInformationProps> = ({
  lastPerformedMove,
  totalSteps,
  possibleMoves,
  puzzleBoard,
  isAutoRunning,
  searchResult,
  selectedAlgorithm,
  solverError,
}) => {
  const displayLastMove = lastPerformedMove ?? "-";
  const availableMovesText = getAvailableMovesText(possibleMoves);
  const status = getPuzzleStatus(puzzleBoard, isAutoRunning);
  const statusText = STATUS_LABELS[status];

  return (
    <section
      className="border-t border-white/10 pt-5"
      aria-label="Status Information"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-200">Live status</h2>
        <span
          className={`inline-flex border px-2.5 py-1 font-mono text-xs font-semibold ${
            status === "solved"
              ? "border-emerald-400/40 bg-emerald-950/40 text-emerald-300"
              : isAutoRunning
                ? "border-sky-400/40 bg-sky-950/40 text-sky-300"
                : "border-amber-400/40 bg-amber-950/40 text-amber-300"
          }`}
        >
          {statusText}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="stat-card">
          <span className="stat-label">Algorithm</span>
          <strong className="stat-value text-sm uppercase">
            {selectedAlgorithm}
          </strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Step count</span>
          <strong className="stat-value">{totalSteps}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Available</span>
          <strong className="stat-value truncate text-sm">
            {availableMovesText}
          </strong>
        </div>
        <div className="stat-card col-span-2">
          <span className="stat-label">Last move</span>
          <strong className="stat-value truncate text-sm">
            {displayLastMove}
          </strong>
        </div>

        {searchResult && (
          <>
            <div className="stat-card">
              <span className="stat-label">Solution depth</span>
              <strong className="stat-value">{searchResult.depth}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Nodes explored</span>
              <strong className="stat-value">
                {searchResult.nodesExplored.toLocaleString()}
              </strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">States visited</span>
              <strong className="stat-value">
                {searchResult.visitedStates.toLocaleString()}
              </strong>
            </div>
          </>
        )}
      </div>

      {solverError && (
        <p className="mt-2 border border-rose-400/40 bg-rose-950/40 px-3 py-2 text-sm text-rose-200">
          {solverError}
        </p>
      )}
    </section>
  );
};

export default StatusInformation;
