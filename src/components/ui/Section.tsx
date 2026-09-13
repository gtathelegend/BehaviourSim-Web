import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Container } from "../layout/Container";

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  containerSize?: "default" | "narrow" | "wide" | "full";
  bordered?: boolean;
}

export function Section({
  title,
  description,
  badge,
  containerSize = "default",
  bordered = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={twMerge(
        clsx(
          "py-16 sm:py-24",
          bordered && "border-t border-border",
          className
        )
      )}
      {...props}
    >
      <Container size={containerSize}>
        {(badge || title || description) && (
          <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
            {badge && <div>{badge}</div>}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm sm:text-base leading-relaxed text-foreground-muted">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
