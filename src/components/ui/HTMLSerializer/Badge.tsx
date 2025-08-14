"use client";

import { classNames } from "@/helpers/classNames";

interface BadgeProps {
  children: React.ReactNode;
  type?: "green" | "orange" | "red" | "blue" | "gray";
  className?: string;
}

const Badge = ({ children, type = "gray", className }: BadgeProps) => {
  const colorClasses: Record<string, string> = {
    green: "text-green-600 border-green-600",
    orange: "text-orange-500 border-orange-500",
    red: "text-red-600 border-red-600",
    blue: "text-blue-600 border-blue-600",
    gray: "text-gray-600 border-gray-400",
  };

  return (
    <span
      className={classNames(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-transparent",
        colorClasses[type],
        className || ""
      )}
      style={{ marginLeft: "10px"}}
    >
      {children}
    </span>
  );
};

export default Badge;