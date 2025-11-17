import type { BoardType } from "@/types";
import { getTileBackgroundColor, getTileDisplayText } from "@/utils/board";

type BoardProps = {
  puzzleBoard: BoardType;
};

const Board: React.FC<BoardProps> = ({ puzzleBoard }) => {
  return (
    <section aria-label="Puzzle Board" className="mb-3">
      <h2 className="mb-2 text-center text-lg font-semibold md:text-left">
        Puzzle Board
      </h2>

      <div className="mx-auto mb-4 grid w-fit grid-cols-3 gap-1 text-black">
        {puzzleBoard.map((tileValue, tileIndex) => {
          const backgroundColor = getTileBackgroundColor(tileValue);
          const displayText = getTileDisplayText(tileValue);

          return (
            <div
              aria-label="Puzzle Tile"
              key={tileIndex}
              className={`flex h-20 w-20 items-center justify-center rounded border text-xl font-semibold ${backgroundColor}`}
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
