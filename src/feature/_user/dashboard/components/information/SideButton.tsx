import clsx from "clsx";

interface Props {
  active: "info" | "submit";
  onChange: (type: "info" | "submit") => void;
  disabledSubmit?: boolean;
}

const SideButtons = ({ active, onChange, disabledSubmit }: Props) => {
  return (
    <div className="flex flex-col gap-4 lg:w-2xs">
      <button
        onClick={() => onChange("info")}
        className={clsx(
          "p-8 font-changa font-bold text-2xl rounded-3xl transition",
          active === "info"
            ? "bg-purple-300 text-glow"
            : "bg-purple-400 hover:bg-purple-500"
        )}
      >
        Information
      </button>

      <button
        onClick={() => onChange("submit")}
        disabled={disabledSubmit}
        className={clsx(
          "p-8 font-changa font-bold text-2xl rounded-3xl transition",
          disabledSubmit
            ? "bg-gray-800 cursor-not-allowed text-gray-400"
            : active === "submit"
              ? "bg-purple-300 text-glow"
              : "bg-purple-400 hover:bg-purple-500"
        )}
      >
        Submit Your Work
      </button>
    </div>
  );
};

export default SideButtons;
