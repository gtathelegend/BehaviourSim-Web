import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In — BehaviourSim",
  description: "Sign in to your BehaviourSim account to manage API keys and inspect simulation quotas.",
  robots: {
    index: false,
    follow: false,
  },
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.behavioursim.vedaangsharma.in";

export default function LoginPage() {
  const googleAuthUrl = `${API_BASE_URL}/v1/auth/google`;
  const githubAuthUrl = `${API_BASE_URL}/v1/auth/github`;

  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <div className="mx-auto max-w-md">
          <Card className="border-border bg-surface shadow-md">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-sm bg-accent inline-block" />
                <span className="text-xs font-mono text-foreground-muted tracking-widest uppercase">
                  BehaviourSim
                </span>
              </div>
              <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-foreground-muted mt-1">
                Access your BehaviorSim developer profile, manage API keys, and monitor simulation usage.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {/* Google OAuth Button */}
              <a
                href={googleAuthUrl}
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded border border-border bg-surface-elevated hover:bg-surface-muted text-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <span>Continue with Google</span>
              </a>

              {/* GitHub OAuth Button */}
              <a
                href={githubAuthUrl}
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded border border-border bg-surface-elevated hover:bg-surface-muted text-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg className="w-4 h-4 fill-current text-foreground" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>Continue with GitHub</span>
              </a>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
              </div>

              {/* Technical / Scientific Disclaimer */}
              <p className="text-center text-[11px] text-foreground-muted leading-relaxed">
                By continuing, you agree to use BehaviorSim in accordance with its intended scientific and technical scope.
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-xs text-foreground-muted">
            <p>
              Looking for API documentation?{" "}
              <Link
                href="/docs/interfaces/rest/endpoints"
                className="text-accent hover:underline inline-flex items-center gap-0.5"
              >
                View REST Endpoints <ExternalLink className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
