import type { Metadata } from "next";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";
import { fetchProfile } from "@/lib/ipfs";
import { generateProfileMetadata, generateProfileSchema } from "@/lib/seo";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://portal-thp.vercel.app";

/**
 * Génère les métadonnées dynamiques pour une page de profil
 */
export async function generateMetadata({
  params,
}: {
  params: { address: string };
}): Promise<Metadata> {
  try {
    const address = params.address as `0x${string}`;
    const contractAddress = getContractAddress();

    if (contractAddress === "0x0000000000000000000000000000000000000000") {
      return {
        title: "Profil - Portail THP",
        description: "Profil sur le Portail THP",
      };
    }

    const client = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    const profileData = await client.readContract({
      address: contractAddress,
      abi: THP_PROFILE_REGISTRY_ABI,
      functionName: "getProfile",
      args: [address],
    }) as { owner: string; profileURI: string; isPublic: boolean; updatedAt: bigint };

    if (!profileData.profileURI || !profileData.isPublic) {
      return {
        title: "Profil non trouvé - Portail THP",
        description: "Ce profil n'existe pas ou n'est pas public",
      };
    }

    const profile = await fetchProfile(profileData.profileURI);

    if (!profile) {
      return {
        title: "Profil - Portail THP",
        description: "Profil sur le Portail THP",
      };
    }

    return generateProfileMetadata(profile, address);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Profil - Portail THP",
      description: "Profil sur le Portail THP",
    };
  }
}

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { address: string };
}) {
  // Le Schema.org JSON-LD sera ajouté dans le composant client
  return <>{children}</>;
}
