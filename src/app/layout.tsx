import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BehaviorSim — Scientific Behavioral Simulation Framework",
    template: "%s | BehaviorSim",
  },
  description:
    "An open-source Python framework and API for simulating complex human and system behaviors through mathematical Markov models and synthetic sequential generation.",
  keywords: [
    "behavioral simulation",
    "synthetic behavioral data",
    "Markov behavioral simulation",
    "synthetic sequential data",
    "Python behavioral simulator",
    "behavioral data generator",
  ],
  authors: [{ name: "BehaviorSim Contributors" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://behavioursim.vedaangsharma.in"),
  openGraph: {
    title: "BehaviorSim — Scientific Behavioral Simulation Framework",
    description:
      "Open-source Python framework and API for generative behavioral modeling and synthetic sequential data.",
    url: "https://behavioursim.vedaangsharma.in",
    siteName: "BehaviorSim",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-sky-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
