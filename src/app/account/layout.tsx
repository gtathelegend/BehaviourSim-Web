import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Dashboard — BehaviorSim",
  description: "Manage your BehaviorSim account, inspect simulation usage quotas, and manage API keys.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
