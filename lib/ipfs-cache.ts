/**
 * Cache pour les profils IPFS
 * Utilise le cache React Query avec une clé dédiée
 */

import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "./ipfs";
import type { ProfileIPFS } from "./schemas";

const IPFS_CACHE_KEY = "ipfs-profile";

/**
 * Hook pour récupérer un profil IPFS avec cache
 */
export function useCachedProfile(cid: string | null | undefined) {
  return useQuery<ProfileIPFS | null>({
    queryKey: [IPFS_CACHE_KEY, cid],
    queryFn: () => (cid ? fetchProfile(cid) : Promise.resolve(null)),
    enabled: !!cid,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes de cache
  });
}

/**
 * Clé de cache pour les profils IPFS
 */
export function getProfileCacheKey(cid: string): string[] {
  return [IPFS_CACHE_KEY, cid];
}
