import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BehaviorSim — Scientific Behavioral Simulation Framework",
    short_name: "BehaviorSim",
    description:
      "Open-source Python framework and API for simulating complex human and system behaviors through mathematical Markov models and synthetic sequential generation.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0c10",
    theme_color: "#0a0c10",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
