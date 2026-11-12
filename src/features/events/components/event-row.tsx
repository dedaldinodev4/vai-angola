import Link from "next/link";
import { eventDateParts } from "@/lib/formatters/date";
import type { AppEvent, EventStatus } from "@/types";

type EventRowProps = {
  event: AppEvent;
  status?: EventStatus;
};

export function EventRow({ event, status = "upcoming" }: EventRowProps) {
  const { day, month, weekday } = eventDateParts(event.date);
  const isPast = status === "past";

  return (
    <li
      className={`relative grid grid-cols-[4.5rem_1fr] gap-6 border-t border-ink/25 py-6 last:border-b md:grid-cols-[6rem_1fr] ${isPast ? "text-ink/75" : ""
        }`}
    >
      <time dateTime={event.date} className="block">
        <span className="block font-display text-5xl leading-none md:text-6xl">{day}</span>
        <span className="mt-1 block text-sm text-ink/75">{month}</span>
      </time>
      <div>
        <h3 className="text-2xl">
          <Link
            href={`/events/${event.slug}`}
            className="decoration-terracotta decoration-2 underline-offset-4 after:absolute after:inset-0 hover:underline"
          >
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-olive-deep">
          {event.province}, {weekday}
        </p>
        <p className="mt-2 max-w-xl text-ink/80">{event.summary}</p>
        <p className="mt-2 text-sm text-ink/70">
          Evento fictício{isPast ? ", já terminado" : status === "today" ? ", acontece hoje" : ""}
        </p>
      </div>
    </li>
  );
}
