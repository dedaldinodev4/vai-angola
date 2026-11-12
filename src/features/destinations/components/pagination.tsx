import Link from "next/link";

import type { DiscoveryQuery } from "../utils/discovery";
import { buildExploreHref } from "../utils/search-params";

type PaginationProps = {
  query: DiscoveryQuery;
  page: number;
  totalPages: number;
};

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 font-semibold transition-colors duration-[var(--duration-fast)] hover:bg-sand/70";

export function Pagination({ query, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;
  const href = (target: number) => buildExploreHref({ ...query, page: target });

  return (
    <nav aria-label="Paginação" className="mt-16 flex flex-wrap items-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={linkClass}>
          Anterior
        </Link>
      ) : (
        <span aria-disabled="true" className={`${linkClass} cursor-not-allowed text-ink/60 hover:bg-transparent`}>
          Anterior
        </span>
      )}
      <ul className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Página ${n}`}
              className={`${linkClass} ${n === page ? "bg-ink text-paper hover:bg-ink" : ""}`}
            >
              {n}
            </Link>
          </li>
        ))}
      </ul>
      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next" className={linkClass}>
          Seguinte
        </Link>
      ) : (
        <span aria-disabled="true" className={`${linkClass} cursor-not-allowed text-ink/60 hover:bg-transparent`}>
          Seguinte
        </span>
      )}
    </nav>
  );
}
