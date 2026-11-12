import Link from "next/link";
import { DemoArt } from "@/components/media/demo-art";
import type { Destination } from "@/types";

type DestinationCardProps = {
  destination: Destination;
  /** Classes de proporção da imagem, p.ex. "aspect-[4/3]". */
  imageClassName?: string;
  /** Aumenta o título nos cartões de destaque. */
  large?: boolean;
  className?: string;
};

export function DestinationCard({
  destination,
  imageClassName = "aspect-[4/5]",
  large = false,
  className = "",
}: DestinationCardProps) {
  const { name, slug, province, shortDescription, art } = destination;
  return (
    <article className={`group relative ${className}`}>
      <DemoArt
        scene={art.scene}
        tone={art.tone}
        label={name}
        className={`w-full rounded-sm ${imageClassName}`}
      />
      <div className="mt-4">
        <p className="text-sm font-semibold text-olive-deep">{province}</p>
        <h3 className={`mt-1 ${large ? "text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]" : ""}`}>
          <Link
            href={`/destinations/${slug}`}
            className="decoration-terracotta decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline"
          >
            {name}
          </Link>
        </h3>
        <p className="mt-2 max-w-[44ch] text-ink/80">{shortDescription}</p>
      </div>
    </article>
  );
}
