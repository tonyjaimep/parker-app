import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  variant?: "primary" | "secondary" | "outline" | "secondary-outline" | "negative";
  size?: "xs" | "sm" | "md" | "lg";
  label: string;
};

const baseStyles = "items-center";

const sizeStyles: Record<Required<ButtonProps>["size"], string> = {
  xs: "px-2 p-1 rounded",
  sm: "px-2 py-1 rounded-md",
  md: "px-6 py-3 rounded-lg ",
  lg: "px-8 py-4 rounded-xl ",
};

const variantStyles: Record<Required<ButtonProps>["variant"], string> = {
  primary: "bg-primary-600",
  secondary: "bg-neutral-400",
  outline: "border border-primary-600",
  "secondary-outline": "border border-neutral-600",
  negative: "bg-negative-600",
};

const textVariantStyles: Record<Required<ButtonProps>["variant"], string> = {
  primary: "font-bold text-white",
  secondary: "font-bold text-white",
  outline: "text-primary-600",
  "secondary-outline": "text-neutral-600",
  negative: "font-bold text-white",
};

const textSizeStyles: Record<Required<ButtonProps>["size"], string> = {
  xs: "text-sm",
  sm: "text-lg",
  md: "text-lg",
  lg: "text-lg",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  label,
  style,
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      className={[
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      <Text
        className={[textVariantStyles[variant], textSizeStyles[size]].join(" ")}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
