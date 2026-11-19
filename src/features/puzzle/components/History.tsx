import type { MoveHistoryEntry } from "@/features/puzzle/types";

type HistoryProps = {
  histories: readonly MoveHistoryEntry[];
};

const History: React.FC<HistoryProps> = ({ histories }) => {
  const hasNoMoves = histories.length === 0;

  return (
    <section className="panel flex min-h-[28rem] flex-1 flex-col p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="section-eyebrow">Activity</p>
          <h2 className="section-title">Move History</h2>
        </div>
        <span className="border border-slate-700 bg-slate-950 px-2.5 py-1 font-mono text-xs font-semibold text-slate-400">
          {histories.length} {histories.length === 1 ? "move" : "moves"}
        </span>
      </div>

      <div className="history-scroll flex min-h-0 flex-1 overflow-y-auto border border-slate-700 bg-slate-950 p-2">
        {hasNoMoves ? (
          <div className="m-auto max-w-[15rem] px-4 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center border border-dashed border-slate-600 font-mono text-xl text-slate-500">
              00
            </div>
            <p className="text-sm font-medium text-slate-300">No moves yet</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Shuffle the board, then step through moves to see them here.
            </p>
          </div>
        ) : (
          <div className="w-full space-y-1">
            {histories.map((historyEntry) => (
              <div
                key={historyEntry.step}
                className="border border-transparent px-3 py-2.5 font-mono text-xs leading-5 text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-900"
              >
                {historyEntry.description}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default History;
