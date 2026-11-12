import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="py-20 md:py-32">
      <h1 className="max-w-3xl">Esta página não foi encontrada</h1>
      <p className="mt-6 max-w-xl text-lg text-ink/80">
        O endereço pode estar errado ou o conteúdo já não existe. Podes voltar ao início ou continuar a explorar.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/explore"
          className="inline-flex min-h-12 items-center rounded-md bg-terracotta-deep px-7 font-semibold text-white transition-colors duration-(--duration-fast) hover:bg-ink"
        >
          Explorar destinos
        </Link>
        <Link href="/" className="font-semibold underline decoration-terracotta decoration-2 underline-offset-4 hover:text-terracotta-deep">
          Voltar ao início
        </Link>
      </div>
    </Container>
  );
}
