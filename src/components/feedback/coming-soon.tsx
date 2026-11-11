import Link from "next/link";
import { Container } from "@/components/layout/container";

type ComingSoonProps = {
  title: string;
  description: string;
};

/** Página provisória: será substituída na fase indicada no roteiro do projeto. */
export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <Container className="py-20 md:py-32">
      <h1 className="max-w-3xl">{title}</h1>
      <p className="mt-6 max-w-xl text-lg text-ink/80">{description}</p>
      <p className="mt-2 max-w-xl text-ink/70">Esta secção ainda está em construção.</p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center rounded-md bg-terracotta-deep px-6 font-semibold text-white transition-colors duration-[var(--duration-fast)] hover:bg-ink"
      >
        Voltar ao início
      </Link>
    </Container>
  );
}
