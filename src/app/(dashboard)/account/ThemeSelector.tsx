import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";

interface ThemeOptionProps {
  theme: string;
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const ThemeOption = ({
  theme,
  label,
  onClick,
  isSelected,
}: ThemeOptionProps) => (
  <div className="flex flex-col items-center">
    <button
      onClick={onClick}
      className={`w-40 h-40 rounded-2xl p-3 flex relative overflow-hidden transition-all duration-300 ${
        isSelected ? "ring-2 ring-ring" : ""
      }`}
      style={{
        backgroundColor: theme === "light" ? "white" : "#1a1a1a",
        border: theme === "light" ? "" : "none",
      }}
    >
      <div className="absolute top-3 left-3 flex space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="w-1/3 h-full flex flex-col justify-between pr-2"></div>
      <div className="w-2/3 h-full flex flex-col justify-between pl-2">
        <div className="space-y-2 mb-4">
          <div
            className="h-3 rounded-full"
            style={{
              backgroundColor: theme === "light" ? "#e2e8f0" : "#333333",
              width: "60%",
            }}
          />
          <div
            className="h-3 rounded-full"
            style={{
              backgroundColor: theme === "light" ? "#e2e8f0" : "#333333",
              width: "80%",
            }}
          />
          <div
            className="h-3 rounded-full"
            style={{
              backgroundColor: theme === "light" ? "#e2e8f0" : "#333333",
              width: "40%",
            }}
          />
        </div>
        <div className="space-y-2">
          <div
            className="h-6 rounded-full"
            style={{
              backgroundColor: theme === "light" ? "#f1f5f9" : "#262626",
            }}
          />
          <div
            className="h-6 rounded-full"
            style={{
              backgroundColor: theme === "light" ? "#f1f5f9" : "#262626",
            }}
          />
        </div>
      </div>
    </button>
    <Label className="mt-2">{label}</Label>
  </div>
);

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-4">
      <ThemeOption
        theme="light"
        label="Light"
        onClick={() => setTheme("light")}
        isSelected={theme === "light"}
      />
      <ThemeOption
        theme="dark"
        label="Dark"
        onClick={() => setTheme("dark")}
        isSelected={theme === "dark"}
      />
    </div>
  );
}
