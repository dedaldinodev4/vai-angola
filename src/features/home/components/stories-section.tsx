import { Container } from "@/components/layout/container";

import { ArticleCard } from "@/features/editorial/components/article-card";
import { listArticles } from "@/features/editorial/utils/articles-queries";

import { SectionHeading } from "./section-heading";


export async function StoriesSection() {
  const [lead, ...rest] = await listArticles();
  if (!lead)
    return null;

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
          <div className="lg:col-span-7">
            <ArticleCard article={lead} variant="lead" />
          </div>
          <ul className="flex flex-col gap-10 lg:col-span-5 lg:pt-16">
            {rest.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} variant="compact" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

