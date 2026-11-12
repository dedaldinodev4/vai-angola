import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { DemoArt } from "@/components/media/demo-art";
import { DestinationCard } from "@/features/destinations/components/destination-card";
import { destinationRepository } from "@/features/destinations/repositories/destination-repository";
import { ArticleCard, ArticleMeta } from "@/features/editorial/components/article-card";
import { getArticleBySlug, listArticles } from "@/features/editorial/utils/articles-queries";

interface ArticleContentProps {
  params: Promise<{ slug: string }>;
}


export default async function StoriesContent({ params }: ArticleContentProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article)
    notFound();

  const [destination, all] = await Promise.all([
    destinationRepository.getBySlug(article.destinationSlug),
    listArticles(),
  ]);
  const others = all.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article>
      <Container className="pt-12 md:pt-20">
        <nav aria-label="Localização">
          <Link href="/stories" className="font-semibold text-terracotta-deep underline underline-offset-4 hover:text-ink">
            Todas as histórias
          </Link>
        </nav>
        <header className="mt-8 max-w-4xl">
          <h1>{article.title}</h1>
          <p className="mt-6 max-w-[48ch] font-display text-2xl leading-snug text-ink/85">{article.excerpt}</p>
          <p className="mt-6 text-sm text-ink/75">Por {article.author}</p>
          <ArticleMeta article={article} />
        </header>
        <DemoArt
          scene={article.art.scene}
          tone={article.art.tone}
          label={article.title}
          className="mt-12 aspect-video w-full rounded-sm lg:aspect-21/9"
        />
      </Container>

      <Container className="py-14 md:py-20">
        <div className="mx-auto max-w-[65ch]">
          <p className="mb-10 border-l-4 border-sand pl-4 text-sm text-ink/75">
            Texto de demonstração, escrito para testar o layout de leitura. Factos, horários e preços reais devem ser
            confirmados antes de qualquer viagem.
          </p>
          <div className="space-y-6 text-lg leading-8">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>

      <section aria-labelledby="destino-title" className="bg-sand/45 py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          {destination && (
            <div className="lg:col-span-5">
              <h2 id="destino-title" className="text-3xl">
                Sobre este lugar
              </h2>
              <DestinationCard destination={destination} imageClassName="aspect-[4/3]" className="mt-6" />
            </div>
          )}
          {others.length > 0 && (
            <div className="lg:col-span-7">
              <h2 className="text-3xl">Continuar a ler</h2>
              <ul className="mt-6 grid gap-10">
                {others.map((other) => (
                  <li key={other.id}>
                    <ArticleCard article={other} variant="compact" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
    </article>
  );
}
