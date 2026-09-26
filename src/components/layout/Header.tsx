"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink, User } from "lucide-react";
import { Container } from "./Container";
import { Button } from "../ui/Button";
import { useAuth } from "@/lib/auth/AuthContext";

const NAV_ITEMS = [
  { label: "Docs", href: "/docs" },
  { label: "Playground", href: "/playground" },
  { label: "Concepts", href: "/concepts" },
  { label: "Methodology", href: "/methodology" },
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "API", href: "/api" },
];

export function Header() {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container size="default">
        <div className="flex h-14 items-center justify-between">
          {/* Brand Logo & Version Badge */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" />
              <span>BehaviourSim</span>
              <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-surface-elevated text-foreground-muted border border-border">
                v1.0.1
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden md:flex items-center gap-5 text-xs font-medium text-foreground-muted"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              href="https://github.com/gtathelegend/BehaviourSim"
              external
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
            </Button>
            {isAuthenticated ? (
              <Button variant="secondary" size="sm" href="/account" className="gap-1.5">
                <User className="w-3.5 h-3.5 text-accent" />
                <span>Account</span>
              </Button>
            ) : (
              <Button variant="primary" size="sm" href="/login">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="p-1.5 rounded border border-border text-foreground-muted hover:text-foreground hover:bg-surface-elevated transition-colors focus-visible:ring-2 focus-visible:ring-ring"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 py-4 space-y-3">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-surface-elevated text-foreground font-semibold"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center"
              href="https://github.com/gtathelegend/BehaviourSim"
              external
            >
              GitHub <ExternalLink className="w-3 h-3 opacity-60 ml-1" />
            </Button>
            {isAuthenticated ? (
              <Button variant="secondary" size="sm" className="w-full justify-center gap-1.5" href="/account">
                <User className="w-3.5 h-3.5 text-accent" />
                <span>Account</span>
              </Button>
            ) : (
              <Button variant="primary" size="sm" className="w-full justify-center" href="/login">
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
