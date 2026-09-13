import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      href,
      external,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-primary text-primary-foreground hover:opacity-90 active:opacity-95 shadow-sm border border-transparent",
      secondary:
        "bg-surface-elevated text-foreground hover:bg-surface-muted border border-border",
      outline:
        "bg-transparent text-foreground border border-border hover:bg-surface-elevated hover:border-border-strong",
      ghost:
        "bg-transparent text-foreground-muted hover:text-foreground hover:bg-surface-elevated border border-transparent",
    }[variant];

    const sizeStyles = {
      sm: "text-xs px-2.5 py-1.5 gap-1.5 h-8",
      md: "text-xs sm:text-sm px-3.5 py-2 gap-2 h-9",
      lg: "text-sm px-4.5 py-2.5 gap-2.5 h-11",
    }[size];

    const combinedClasses = twMerge(clsx(baseStyles, variantStyles, sizeStyles, className));

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={combinedClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
