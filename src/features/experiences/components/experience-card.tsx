import Link from "next/link";
import { DemoArt } from "@/components/media/demo-art";
import type { Destination, Experience } from "@/types";


type ExperienceCardProps = {
  experience: Experience;
  destination?: Destination;
  imageClassName?: string;
};

export function ExperienceCard({ experience, destination, imageClassName = "aspect-[3/4]" }: ExperienceCardProps) {
  return (
    <article>
      <DemoArt
        scene={experience.art.scene}
        tone={experience.art.tone}
        label={experience.title}
        className={`w-full rounded-sm ${imageClassName}`}
      />
      {destination && <p className="mt-4 text-sm font-semibold text-olive-deep">{destination.province}</p>}
      <h3 className="mt-1 text-2xl">{experience.title}</h3>
      <p className="mt-2 text-ink/80">{experience.summary}</p>
      {destination && (
        <Link
          href={`/destinations/${destination.slug}`}
          className="mt-3 inline-block font-semibold text-terracotta-deep underline decoration-2 underline-offset-4 hover:text-ink"
        >
          Ver {destination.name}
        </Link>
      )}
    </article>
  );
}
