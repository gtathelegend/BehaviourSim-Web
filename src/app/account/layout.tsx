import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Dashboard — BehaviourSim",
  description: "Manage your BehaviourSim account, inspect simulation usage quotas, and manage API keys.",
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
