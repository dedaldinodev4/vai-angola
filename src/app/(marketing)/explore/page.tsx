import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/coming-soon";

export const metadata: Metadata = { title: "Explorar" };

export default function Page() {
  return (
    <ComingSoon
      title="Explorar"
      description="Aqui vais poder pesquisar e filtrar destinos por província e categoria."
    />
  );
}
