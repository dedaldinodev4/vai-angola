import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/coming-soon";

export const metadata: Metadata = { title: "Favoritos" };

export default function Page() {
  return (
    <ComingSoon
      title="Favoritos"
      description="Os destinos que guardares vão aparecer aqui."
    />
  );
}
