import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { MainNav, MainNavFallback } from "@/components/navigation/main-nav";

export function SiteHeader() {
  return (
    <header className="relative border-b border-ink/15 bg-paper">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
          Vai Angola
        </Link>
        <Suspense fallback={<MainNavFallback />}>
          <MainNav />
        </Suspense>
      </Container>
    </header>
  );
}
