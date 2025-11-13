type ControlButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

const ControlButton = ({
  onClick,
  children,
  variant = "primary",
}: ControlButtonProps) => {
  const baseClasses =
    "rounded text-white text-sm border px-3 py-1 cursor-pointer outline-none focus:outline-none transition-all duration-200 text-semibold active:scale-95";
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "hover:opacity-90",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default ControlButton;
