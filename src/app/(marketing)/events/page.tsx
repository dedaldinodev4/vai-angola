import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/coming-soon";

export const metadata: Metadata = { title: "Eventos" };

export default function Page() {
  return (
    <ComingSoon
      title="Eventos"
      description="Datas e acontecimentos para marcar na agenda."
    />
  );
}
