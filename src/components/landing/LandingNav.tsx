'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingNav() {
  return (
    <header className="w-full border-b border-gray-100 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.3em] text-primary">
          CraftConnect
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/signup">
            <Button variant="ghost" size="sm">
              Sign up
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Log in</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

