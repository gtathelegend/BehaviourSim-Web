"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X, BookOpen } from "lucide-react";
import { DOCS_NAVIGATION } from "@/lib/docs/navigation";

export function DocsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route transition
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navContent = (
    <div className="space-y-6 text-xs">
      <div className="pb-3 border-b border-border">
        <Link
          href="/docs"
          className={`flex items-center gap-2 font-medium px-2 py-1.5 rounded transition-colors ${
            pathname === "/docs"
              ? "bg-surface-elevated text-foreground font-semibold"
              : "text-foreground-muted hover:text-foreground"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-accent" />
          <span>Documentation Overview</span>
        </Link>
      </div>

      {DOCS_NAVIGATION.map((section) => (
        <div key={section.title} className="space-y-2">
          <h4 className="px-2 text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-2 py-1.5 rounded transition-colors ${
                      isActive
                        ? "bg-surface-elevated text-accent font-semibold"
                        : "text-foreground-muted hover:text-foreground hover:bg-surface-elevated/50"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-foreground-subtle">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Trigger Button */}
      <div className="lg:hidden mb-4 pb-3 border-b border-border flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-surface text-xs font-medium text-foreground hover:bg-surface-elevated transition-colors"
        >
          {mobileOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          <span>Documentation Navigation</span>
        </button>
        <span className="text-[11px] font-mono text-foreground-subtle">v1.0.1</span>
      </div>

      {/* Mobile Sidebar Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden mb-6 p-4 rounded-lg border border-border bg-surface shadow-sm">
          {navContent}
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-60 shrink-0 pr-6 py-6 sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border">
        {navContent}
      </aside>
    </>
  );
}
