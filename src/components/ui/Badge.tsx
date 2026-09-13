import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "neutral" | "outline" | "success" | "warning" | "code";
  size?: "sm" | "md";
}

export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded tracking-tight transition-colors";

  const variantStyles = {
    default:
      "bg-accent-subtle text-accent-foreground border border-accent/20",
    neutral:
      "bg-surface-elevated text-foreground-muted border border-border",
    outline:
      "bg-transparent text-foreground-muted border border-border",
    success:
      "bg-semantic-success-bg text-semantic-success border border-semantic-success-border",
    warning:
      "bg-semantic-warning-bg text-semantic-warning border border-semantic-warning-border",
    code:
      "font-mono bg-code-inline-bg text-code-inline-fg border border-border px-1.5 py-0.5",
  }[variant];

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  }[size];

  return (
    <span
      className={twMerge(clsx(baseStyles, variantStyles, sizeStyles, className))}
      {...props}
    >
      {children}
    </span>
  );
}
