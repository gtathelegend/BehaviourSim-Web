import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
          muted: "var(--surface-muted)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          muted: "var(--foreground-muted)",
          subtle: "var(--foreground-subtle)",
        },
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          subtle: "var(--accent-subtle)",
          foreground: "var(--accent-foreground)",
        },
        semantic: {
          success: "var(--success)",
          "success-bg": "var(--success-bg)",
          "success-border": "var(--success-border)",
          warning: "var(--warning)",
          "warning-bg": "var(--warning-bg)",
          "warning-border": "var(--warning-border)",
          error: "var(--error)",
          "error-bg": "var(--error-bg)",
          "error-border": "var(--error-border)",
        },
        code: {
          bg: "var(--code-bg)",
          fg: "var(--code-fg)",
          border: "var(--code-border)",
          "inline-bg": "var(--code-inline-bg)",
          "inline-fg": "var(--code-inline-fg)",
        },
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      maxWidth: {
        content: "72rem", // 1152px (max-w-6xl)
      },
    },
  },
  plugins: [typography],
};

export default config;
