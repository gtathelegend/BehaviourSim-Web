import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulation Playground — BehaviorSim",
  description: "Interactive synthetic behavioral simulation workbench. Configure domain presets, execute runs, and inspect generated telemetry records.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
