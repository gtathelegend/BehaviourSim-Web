import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, BookOpen, Layers, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28">
      <Container size="narrow">
        <div className="mx-auto max-w-lg text-center space-y-6">
          <Card className="border-border bg-surface shadow-md">
            <CardHeader className="pb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface-elevated border border-border mx-auto mb-2 text-accent font-mono text-base font-bold">
                404
              </div>
              <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                Page Not Found
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-foreground-muted mt-1 leading-relaxed">
                The requested BehaviorSim route or documentation resource does not exist or has been relocated.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="p-3.5 rounded-lg border border-border bg-surface-elevated/40 text-left text-xs space-y-2">
                <span className="font-semibold text-foreground block">Popular Destinations</span>
                <ul className="space-y-1.5 text-foreground-muted">
                  <li>
                    <Link
                      href="/docs"
                      className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-accent" />
                      <span>Documentation &amp; Guides</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/playground"
                      className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5 text-accent" />
                      <span>Interactive Simulation Playground</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/api"
                      className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                    >
                      <Terminal className="w-3.5 h-3.5 text-accent" />
                      <span>REST API Reference &amp; Explorer</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <Button variant="primary" size="md" href="/" className="w-full sm:w-auto">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Back to Homepage</span>
                </Button>
                <Button variant="outline" size="md" href="/docs" className="w-full sm:w-auto">
                  Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
