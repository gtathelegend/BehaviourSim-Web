"use client";

import React from "react";

export default function RootGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 font-sans p-4">
        <div className="max-w-md w-full p-6 rounded-lg border border-slate-800 bg-slate-900 text-center space-y-4 shadow-xl">
          <div className="w-10 h-10 rounded-full bg-red-950/60 border border-red-800 text-red-400 flex items-center justify-center mx-auto text-lg font-bold">
            !
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-white">Application Exception</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            A critical system error occurred. You may retry reloading the application root.
          </p>
          {error.digest && (
            <p className="font-mono text-[10px] text-slate-500">Digest: {error.digest}</p>
          )}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
