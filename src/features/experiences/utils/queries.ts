import { experiences } from "@/mocks/experiences";
import type { Experience } from "@/types";

export async function listExperiences(): Promise<Experience[]> {
  return [...experiences];
}
