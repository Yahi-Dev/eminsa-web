"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { ContentProvider } from "@/features/contact/containers/content-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ContentProvider>
        {children}
      </ContentProvider>
    </AuthProvider>
  );
}
