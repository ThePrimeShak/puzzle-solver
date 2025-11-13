type ControlInputProps = {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  value: number;
};

const ControlInput: React.FC<ControlInputProps> = ({
  label,
  value,
  setValue,
}) => {
  return (
    <div aria-label="label and input" className="flex items-center gap-1">
      <label className="text-sm" htmlFor={label.toLowerCase()}>
        {label}:
      </label>
      <input
        type="number"
        value={value}
        name={label.toLowerCase()}
        id={label.toLowerCase()}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-24 rounded border px-2 py-1"
      />
    </div>
  );
};

export default ControlInput;
