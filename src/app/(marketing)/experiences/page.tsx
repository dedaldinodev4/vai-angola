import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/coming-soon";

export const metadata: Metadata = { title: "Experiências" };

export default function Page() {
  return (
    <ComingSoon
      title="Experiências"
      description="Atividades e vivências para fazer em Angola."
    />
  );
}
