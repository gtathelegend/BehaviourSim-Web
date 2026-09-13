import React from "react";
import { Container } from "@/components/layout/Container";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border min-h-[calc(100vh-3.5rem)]">
      <Container size="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <DocsSidebar />
          <div className="flex-1 py-8 lg:px-10 min-w-0">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
