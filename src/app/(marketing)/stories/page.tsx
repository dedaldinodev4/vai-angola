import type { Metadata } from "next";

import { Container } from "@/components/layout/container";

import { ArticleCard } from "@/features/editorial/components/article-card";
import { listArticles } from "@/features/editorial/utils/articles-queries";

export const metadata: Metadata = {
  title: "Histórias",
  description: "Leituras editoriais de demonstração para decidir para onde ir.",
};

export default async function StoriesPage() {
  const articles = await listArticles();
  const [lead, ...rest] = articles;

  return (
    <Container className="py-12 md:py-20">
      <h1 className="max-w-3xl">Histórias</h1>
      <p className="mt-5 max-w-xl text-lg text-ink/80">
        Reportagens e guias para ler antes de partir. Todos os textos são de demonstração.
      </p>

      {!lead ? (
        <p className="mt-12 text-lg text-ink/80">Ainda não há histórias publicadas.</p>
      ) : (
        <div className="mt-14 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ArticleCard article={lead} variant="lead" />
          </div>
          <ul className="grid gap-12 lg:col-span-5 lg:pt-16">
            {rest.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} variant="compact" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
