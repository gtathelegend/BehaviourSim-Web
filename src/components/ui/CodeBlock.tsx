"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "python",
  filename,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Graceful fallback if clipboard API is unavailable
    }
  };

  const lines = code.trimEnd().split("\n");

  return (
    <div
      className={twMerge(
        clsx(
          "rounded-md border border-code-border bg-code-bg overflow-hidden text-code-fg text-xs font-mono shadow-sm",
          className
        )
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-code-border bg-black/40">
        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          {filename ? (
            <span className="font-sans text-zinc-300 font-medium">{filename}</span>
          ) : (
            <span className="uppercase tracking-wider text-[10px] text-zinc-400">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto leading-relaxed">
        <pre className="flex">
          {showLineNumbers && (
            <div className="select-none pr-4 text-right text-zinc-600 border-r border-code-border/60 mr-4">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="flex-1 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}
