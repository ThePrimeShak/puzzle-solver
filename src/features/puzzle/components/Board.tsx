import {
  getTileBackgroundColor,
  getTileDisplayText,
} from "@/features/puzzle/lib/board";
import type { Board as PuzzleBoard } from "@/features/puzzle/types";

type BoardProps = {
  puzzleBoard: PuzzleBoard;
};

const Board: React.FC<BoardProps> = ({ puzzleBoard }) => {
  return (
    <section aria-label="Puzzle Board">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="section-eyebrow">Current state</p>
          <h2 className="section-title">Puzzle Board</h2>
        </div>
        <span className="border border-slate-700 bg-slate-950 px-2.5 py-1 font-mono text-xs font-medium text-slate-400">
          GRID 3×3
        </span>
      </div>

      <div className="mx-auto grid w-fit grid-cols-3 gap-2 border border-slate-700 bg-slate-950 p-2.5">
        {puzzleBoard.map((tileValue, tileIndex) => {
          const backgroundColor = getTileBackgroundColor(tileValue);
          const displayText = getTileDisplayText(tileValue);

          return (
            <div
              aria-label={tileValue === 0 ? "Empty tile" : `Tile ${tileValue}`}
              key={tileIndex}
              className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center text-2xl font-bold transition-all duration-300 sm:h-20 sm:w-20 ${backgroundColor}`}
            >
              {displayText}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Board;
