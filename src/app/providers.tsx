"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { ContentProvider } from "@/lib/content-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ContentProvider>
        {children}
      </ContentProvider>
    </AuthProvider>
  );
}
