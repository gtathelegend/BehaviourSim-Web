import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "muted" | "ghost";
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-surface border-border",
    elevated: "bg-surface-elevated border-border shadow-sm",
    muted: "bg-surface-muted border-border-subtle",
    ghost: "bg-transparent border-transparent",
  }[variant];

  return (
    <div
      className={twMerge(
        clsx(
          "rounded-md border p-5 sm:p-6 transition-colors",
          variantStyles,
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge(clsx("flex flex-col space-y-1.5 mb-4", className))} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={twMerge(
        clsx("text-sm font-semibold tracking-tight text-foreground", className)
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={twMerge(
        clsx("text-xs leading-relaxed text-foreground-muted", className)
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge(clsx("text-sm text-foreground", className))} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        clsx("mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-foreground-muted", className)
      )}
      {...props}
    >
      {children}
    </div>
  );
}
