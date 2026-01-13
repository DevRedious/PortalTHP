import type { Metadata } from "next";
import { generateDirectoryMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  // Pour une vraie implémentation, récupérer le nombre de profils depuis le contrat
  // Pour l'instant, on utilise une valeur par défaut
  return generateDirectoryMetadata(0);
}
