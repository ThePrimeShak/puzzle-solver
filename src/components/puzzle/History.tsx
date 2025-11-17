type HistoryProps = {
  histories: string[];
};

const History: React.FC<HistoryProps> = ({ histories }) => {
  const hasNoMoves = histories.length === 0;

  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <h2 className="mb-2 text-center text-lg font-semibold md:text-left">
        Move History
      </h2>

      <div className="flex-1 overflow-auto rounded border bg-white p-2 text-black">
        {hasNoMoves ? (
          <div className="text-center text-sm text-gray-500">No moves yet</div>
        ) : (
          <div>
            {histories.map((historyEntry, index) => (
              <div
                key={index}
                className="border-b py-1 text-sm last:border-b-0"
              >
                {historyEntry}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default History;
