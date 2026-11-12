import Link from "next/link";

type SectionHeadingProps = {
  id: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({ id, title, description, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 id={id}>{title}</h2>
        {description && <p className="mt-4 text-lg text-ink/80">{description}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="shrink-0 font-semibold text-terracotta-deep underline decoration-2 underline-offset-4 transition-colors duration-(--duration-fast) hover:text-ink"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
