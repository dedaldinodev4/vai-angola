import Link from "next/link";
import { Container } from "@/components/layout/container";
import { DemoArt } from "@/components/media/demo-art";


export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center lg:col-span-6">
          <h1 id="hero-title">Descobre mais. Vive Angola.</h1>
          <p className="mt-6 max-w-136 text-lg text-ink/80 md:text-xl">
            Quedas de água, miradouros, praias e fortalezas: um mapa editorial para escolheres o próximo
            lugar a visitar.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/explore"
              className="inline-flex min-h-12 items-center rounded-md bg-terracotta-deep px-7 font-semibold text-white transition-colors duration-(--duration-fast) hover:bg-ink"
            >
              Explorar destinos
            </Link>
            <Link
              href="/stories"
              className="font-semibold underline decoration-terracotta decoration-2 underline-offset-4 hover:text-terracotta-deep"
            >
              Ler as histórias
            </Link>
          </div>
          <p className="mt-10 max-w-md text-sm text-ink/70">
            Imagens e conteúdos desta página são de demonstração e ainda não foram verificados.
          </p>
        </div>

        <figure className="relative lg:col-span-6">
          <DemoArt
            scene="falls"
            tone={2}
            label="Quedas de Kalandula, Malanje"
            className="aspect-4/5 w-full rounded-sm sm:aspect-5/4 lg:aspect-5/6"
          />
          <DemoArt
            scene="cliffs"
            tone={1}
            label="Escarpa na Huíla"
            className="absolute -bottom-8 -left-8 hidden aspect-square w-44 rounded-sm border-8 border-paper lg:block"
          />
          <figcaption className="mt-3 text-sm text-ink/70 lg:text-right">
            Quedas de Kalandula, Malanje
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
