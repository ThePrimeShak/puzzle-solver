type ControlButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

const ControlButton = ({
  onClick,
  children,
  variant = "primary",
  disabled = false,
}: ControlButtonProps) => {
  const baseClasses =
    "min-h-10 border px-4 py-2.5 text-sm font-semibold outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
  const variantClasses = {
    primary:
      "border-amber-300 bg-amber-300 text-slate-950 hover:border-amber-200 hover:bg-amber-200",
    secondary:
      "border-slate-600 bg-slate-800 text-slate-200 hover:border-slate-400 hover:bg-slate-700",
    danger:
      "border-rose-400/50 bg-rose-950/50 text-rose-200 hover:bg-rose-900/60",
  };
  const disabledClasses = "cursor-not-allowed opacity-40";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : ""}`}
    >
      {children}
    </button>
  );
};

export default ControlButton;
