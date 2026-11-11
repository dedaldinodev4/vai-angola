"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { MAIN_NAV, PERSONAL_NAV, type NavItem } from "@/lib/constants/navigation";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const linkBase =
  "rounded-sm py-1 transition-colors duration-[var(--duration-fast)] hover:text-terracotta-deep";

function NavList({
  items,
  pathname,
  onNavigate,
  className,
}: {
  items: readonly NavItem[];
  pathname: string;
  onNavigate?: () => void;
  className: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`${linkBase} ${
                active ? "font-semibold underline decoration-terracotta decoration-2 underline-offset-8" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <nav aria-label="Principal" className="hidden items-center gap-10 md:flex">
        <NavList items={MAIN_NAV} pathname={pathname} className="flex items-center gap-8 text-[0.95rem]" />
        <span aria-hidden="true" className="h-5 w-px bg-ink/25" />
        <NavList items={PERSONAL_NAV} pathname={pathname} className="flex items-center gap-6 text-[0.95rem]" />
      </nav>

      <div className="md:hidden">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/30 px-4 text-sm font-semibold transition-colors duration-[var(--duration-fast)] hover:border-ink"
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id={panelId}
          aria-label="Principal (móvel)"
          className="absolute inset-x-0 top-full border-b border-ink/15 bg-paper md:hidden"
        >
          <div className="mx-auto max-w-[var(--container-page)] px-5 py-6 sm:px-8">
            <NavList
              items={MAIN_NAV}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
              className="flex flex-col gap-1 font-display text-3xl [&_a]:block [&_a]:py-2"
            />
            <div className="my-5 h-px bg-ink/15" />
            <NavList
              items={PERSONAL_NAV}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
              className="flex flex-col gap-1 text-lg [&_a]:block [&_a]:py-2"
            />
          </div>
        </nav>
      )}
    </>
  );
}

/** Versão estática (sem estado ativo) usada enquanto o pathname não está disponível. */
export function MainNavFallback() {
  return (
    <nav aria-label="Principal" className="hidden items-center gap-8 text-[0.95rem] md:flex">
      {[...MAIN_NAV, ...PERSONAL_NAV].map((item) => (
        <Link key={item.href} href={item.href} className={linkBase}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
