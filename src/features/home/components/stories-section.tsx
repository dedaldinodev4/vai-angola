import { Container } from "@/components/layout/container";
import { DemoArt } from "@/components/media/demo-art";

import { formatLongDate } from "@/lib/formatters/date";
import { articles } from "@/mocks/articles";
import type { Article } from "@/types";

import { SectionHeading } from "./section-heading";

function Meta({ article }: { article: Article }) {
  return (
    <p className="mt-3 flex flex-wrap gap-x-4 text-sm text-ink/70">
      <span>{article.readingMinutes} min de leitura</span>
      <time dateTime={article.publishedAt}>{formatLongDate(article.publishedAt)}</time>
    </p>
  );
}

export function StoriesSection() {
  const [lead, ...rest] = articles;

  return (
    <section aria-labelledby="historias-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="historias-title"
          title="Histórias"
          description="Leituras para decidir para onde ir. Textos de demonstração."
          href="/stories"
          linkLabel="Ver todas as histórias"
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <DemoArt
              scene={lead.art.scene}
              tone={lead.art.tone}
              label={lead.title}
              className="aspect-16/10 w-full rounded-sm"
            />
            <h3 className="mt-5 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)]">{lead.title}</h3>
            <p className="mt-3 max-w-[56ch] text-lg text-ink/80">{lead.excerpt}</p>
            <Meta article={lead} />
          </article>
          <div className="flex flex-col gap-10 lg:col-span-5 lg:pt-16">
            {rest.map((article) => (
              <article key={article.id} className="grid grid-cols-[7.5rem_1fr] gap-5 sm:grid-cols-[10rem_1fr]">
                <DemoArt
                  scene={article.art.scene}
                  tone={article.art.tone}
                  label={article.title}
                  className="aspect-4/5 w-full rounded-sm"
                />
                <div>
                  <h3 className="text-2xl">{article.title}</h3>
                  <p className="mt-2 text-ink/80">{article.excerpt}</p>
                  <Meta article={article} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
