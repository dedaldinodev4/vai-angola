import Link from "next/link";

import { DemoArt } from "@/components/media/demo-art";

import { formatLongDate } from "@/lib/formatters/date";

import { estimateReadingMinutes } from "../utils/reading-time";
import type { Article } from "@/types";

type Variant = "lead" | "compact" | "grid";

const IMAGE: Record<Variant, string> = {
  lead: "aspect-[16/10] w-full",
  compact: "aspect-[4/5] w-full",
  grid: "aspect-[4/3] w-full",
};

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <p className="mt-3 flex flex-wrap gap-x-4 text-sm text-ink/70">
      <span>{estimateReadingMinutes(article.body)} min de leitura</span>
      <time dateTime={article.publishedAt}>{formatLongDate(article.publishedAt)}</time>
    </p>
  );
}

export function ArticleCard({ article, variant = "grid" }: { article: Article; variant?: Variant }) {
  const image = (
    <DemoArt
      scene={article.art.scene}
      tone={article.art.tone}
      label={article.title}
      className={`rounded-sm ${IMAGE[variant]}`}
    />
  );
  const title = (
    <Link
      href={`/stories/${article.slug}`}
      className="decoration-terracotta decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline"
    >
      {article.title}
    </Link>
  );

  if (variant === "compact") {
    return (
      <article className="group relative grid grid-cols-[7.5rem_1fr] gap-5 sm:grid-cols-[10rem_1fr]">
        {image}
        <div>
          <h3 className="text-2xl">{title}</h3>
          <p className="mt-2 text-ink/80">{article.excerpt}</p>
          <ArticleMeta article={article} />
        </div>
      </article>
    );
  }

  return (
    <article className="group relative">
      {image}
      <h3 className={`mt-5 ${variant === "lead" ? "text-[clamp(1.75rem,1.2rem+2vw,2.75rem)]" : "text-2xl"}`}>{title}</h3>
      <p className={`mt-3 max-w-[56ch] text-ink/80 ${variant === "lead" ? "text-lg" : ""}`}>{article.excerpt}</p>
      <ArticleMeta article={article} />
    </article>
  );
}
