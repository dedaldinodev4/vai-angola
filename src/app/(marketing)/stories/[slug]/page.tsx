import type { Metadata } from "next";
import { Suspense } from "react";

import { getArticleBySlug, listArticles } from "@/features/editorial/utils/articles-queries";

import StorySkeleton from "@/features/editorial/components/story-skeleton";
import StoriesContent from "@/features/editorial/components/stories-content";

export async function generateStaticParams() {
  const all = await listArticles();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article)
    return { title: "História não encontrada" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: "article", publishedTime: article.publishedAt, title: article.title, description: article.excerpt },
  };
}

export default async function StoryPage(props: PageProps<"/stories/[slug]">) {

  return (
    <Suspense fallback={<StorySkeleton />}>
      <StoriesContent params={props.params} />
    </Suspense>
  );
}
