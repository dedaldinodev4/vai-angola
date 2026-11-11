import type { Metadata } from "next";
import { ComingSoon } from "@/components/feedback/coming-soon";

export const metadata: Metadata = { title: "Histórias" };

export default function Page() {
  return (
    <ComingSoon
      title="Histórias"
      description="Reportagens e guias editoriais sobre lugares e cultura."
    />
  );
}
