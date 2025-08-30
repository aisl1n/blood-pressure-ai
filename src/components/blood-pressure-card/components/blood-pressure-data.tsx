import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface Props {
  icon: LucideIcon;
  value: string | number;
  label: string;
  variant?: Variant;
  isNote?: boolean;
  className?: string;
}

interface StyleConfig {
  container: string;
  iconContainer: string;
  iconSize: number;
  valueText: string;
}

const getStyleConfig = (variant: Variant, isNote: boolean): StyleConfig => {
  const isPrimary = variant === "primary";

  return {
    container: isPrimary
      ? "border-red-200 bg-red-50 hover:bg-red-100"
      : "border-gray-200 bg-gray-50 hover:bg-gray-100",
    iconContainer: isPrimary
      ? "bg-red-100 text-red-600"
      : "bg-blue-100 text-blue-600",
    iconSize: 24,
    valueText: cn(
      "font-semibold",
      isNote ? "text-sm" : "text-lg",
      isPrimary ? "text-red-700" : "text-gray-800"
    ),
  };
};

export const BloodPressureData = ({
  icon: Icon,
  value,
  label,
  variant = "secondary",
  isNote = false,
  className,
}: Props) => {
  const styleConfig = getStyleConfig(variant, isNote);

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border p-3 transition-colors",
        styleConfig.container,
        className
      )}
    >
      <div
        className={cn(
          "flex size-12 items-center justify-center rounded-full",
          styleConfig.iconContainer
        )}
      >
        <Icon size={styleConfig.iconSize} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-1 truncate text-sm font-medium text-gray-600">
          {label}
        </p>
        <p className={cn(styleConfig.valueText, "break-words")}>{value}</p>
      </div>
    </div>
  );
};
