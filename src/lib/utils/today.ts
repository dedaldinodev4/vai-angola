import { connection } from "next/server";
import { todayInLuanda } from "@/lib/formatters/date";

/**
 * Data de hoje em Luanda (AAAA-MM-DD).
 * Com cacheComponents, `new Date()` só pode correr em pedido: chamar isto dentro de <Suspense>.
 */
export async function getToday(): Promise<string> {
  await connection();
  return todayInLuanda(new Date());
}
