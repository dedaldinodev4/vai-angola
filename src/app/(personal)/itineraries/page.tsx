import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/coming-soon";

export const metadata: Metadata = { title: "Roteiros" };

export default function Page() {
  return (
    <ComingSoon
      title="Roteiros"
      description="Cria e organiza os teus roteiros de viagem."
    />
  );
}
