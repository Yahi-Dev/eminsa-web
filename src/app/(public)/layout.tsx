// app/(public)/layout.tsx
'use client';

import { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">{children}</main>
    </div>
  );
}