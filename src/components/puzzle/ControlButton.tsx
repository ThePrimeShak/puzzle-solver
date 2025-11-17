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
    "rounded text-white text-sm border px-3 py-1 cursor-pointer outline-none focus:outline-none transition-all duration-200 text-semibold active:scale-95";
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "hover:opacity-90",
    danger: "bg-red-500 hover:bg-red-600",
  };
  const disabledClasses = "opacity-50 cursor-not-allowed";

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
