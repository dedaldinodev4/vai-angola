import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MAIN_NAV, PERSONAL_NAV } from "@/lib/constants/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-3xl font-semibold">Vai Angola</p>
          <p className="mt-3 max-w-md text-paper/80">
            Descobre mais. Vive Angola. Uma revista digital de destinos, experiências e histórias.
          </p>
        </div>
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 md:col-span-6 md:justify-items-end">
          <ul className="space-y-2">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {PERSONAL_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-paper/20">
        <Container className="py-6 text-sm text-paper/75">
          <p>
            Projeto de demonstração. Os destinos, eventos e demais dados mostrados são ilustrativos e não
            foram verificados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
