import { MetadataRoute } from 'next';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from '@/lib/contract';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://portal-thp.vercel.app';

/**
 * Récupère tous les profils publics depuis le contrat
 */
async function getAllPublicProfiles(): Promise<Array<{ owner: string; updatedAt: bigint }>> {
  try {
    const contractAddress = getContractAddress();
    
    // Si pas d'adresse de contrat configurée, retourner un tableau vide
    if (contractAddress === '0x0000000000000000000000000000000000000000') {
      return [];
    }

    const client = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    const profiles = await client.readContract({
      address: contractAddress,
      abi: THP_PROFILE_REGISTRY_ABI,
      functionName: 'getAllProfiles',
    }) as Array<{ owner: string; profileURI: string; isPublic: boolean; updatedAt: bigint }>;

    // Filtrer uniquement les profils publics
    return profiles
      .filter((p) => p.isPublic && p.profileURI)
      .map((p) => ({
        owner: p.owner,
        updatedAt: p.updatedAt,
      }));
  } catch (error) {
    console.error('Error fetching profiles for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Ajouter les pages de profil dynamiques
  try {
    const profiles = await getAllPublicProfiles();
    const profilePages: MetadataRoute.Sitemap = profiles.map((profile) => ({
      url: `${baseUrl}/u/${profile.owner}`,
      lastModified: new Date(Number(profile.updatedAt) * 1000),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...profilePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Retourner au moins les pages statiques en cas d'erreur
    return staticPages;
  }
}
