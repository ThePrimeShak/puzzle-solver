import type { BoardType } from "@/types";

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
        {puzzleBoard.map((value, index) => (
          <div
            aria-label="Puzzle Tile"
            key={index}
            className={`flex h-20 w-20 items-center justify-center rounded border text-xl font-semibold ${
              value === 0 ? "bg-gray-300" : "bg-white"
            }`}
          >
            {value === 0 ? "" : value}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Board;
