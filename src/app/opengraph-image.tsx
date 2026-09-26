import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "BehaviourSim — Synthetic Sequential Behavioral Data Generation Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0c10",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "64px 72px",
          color: "#f8fafc",
          border: "2px solid #1e293b",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "#3b82f6",
              }}
            />
            <span
              style={{
                fontSize: "32px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "#ffffff",
              }}
            >
              BehaviourSim
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: "6px",
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                color: "#93c5fd",
                fontFamily: "monospace",
              }}
            >
              v1.0.1
            </span>
          </div>

          <div
            style={{
              fontSize: "14px",
              padding: "6px 14px",
              borderRadius: "6px",
              backgroundColor: "#161b22",
              border: "1px solid #30363d",
              color: "#8b949e",
              fontFamily: "monospace",
            }}
          >
            MIT Open Source
          </div>
        </div>

        {/* Central Hero Message */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "1000px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              color: "#ffffff",
            }}
          >
            Synthetic Sequential Behavioral Data Generation Platform
          </div>
          <div
            style={{
              fontSize: "22px",
              lineHeight: 1.45,
              color: "#94a3b8",
            }}
          >
            Open-source Python framework and Cloud API for modeling Markov state transitions,
            probabilistic feature emissions, and reproducible multi-agent sequential trajectories.
          </div>
        </div>

        {/* Bottom Feature Badges & Coordinates */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid #1e293b",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <span
              style={{
                fontSize: "15px",
                color: "#e2e8f0",
                backgroundColor: "#1e293b",
                padding: "8px 16px",
                borderRadius: "6px",
                fontFamily: "monospace",
              }}
            >
              pip install behaviorsim
            </span>
            <span
              style={{
                fontSize: "15px",
                color: "#94a3b8",
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                padding: "8px 16px",
                borderRadius: "6px",
              }}
            >
              8 Parametric Distributions
            </span>
            <span
              style={{
                fontSize: "15px",
                color: "#94a3b8",
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                padding: "8px 16px",
                borderRadius: "6px",
              }}
            >
              4 Domain Presets
            </span>
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#60a5fa",
              fontWeight: 600,
            }}
          >
            behavioursim.vedaangsharma.in
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
