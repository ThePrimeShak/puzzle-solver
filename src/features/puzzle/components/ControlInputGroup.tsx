type ControlInputGroupProps = {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  value: number;
};

const ControlInputGroup = ({
  label,
  value,
  setValue,
}: ControlInputGroupProps) => {
  const inputId = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400" htmlFor={inputId}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        min={1}
        name={inputId}
        id={inputId}
        onChange={(e) => setValue(Math.max(1, Number(e.target.value)))}
        className="w-full border border-slate-600 bg-slate-950 px-3 py-2 text-sm font-medium text-white transition-colors outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-300/10"
      />
    </div>
  );
};

export default ControlInputGroup;
