import { useQuery, useQueries } from "@tanstack/react-query";
import { useReadContract } from "wagmi";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "./contract";
import { fetchProfile } from "./ipfs";
import type { ProfileIPFS } from "./schemas";

export interface ProfileWithAddress {
  address: string;
  profile: ProfileIPFS | null;
  updatedAt: number;
  profileURI: string;
}

export interface ProfileRef {
  address: string;
  profileURI: string;
  updatedAt: number;
}

/**
 * Hook pour charger les références de tous les profils publics depuis le contrat
 */
export function useProfileRefs() {
  const { data: profilesData, isLoading, error } = useReadContract({
    address: getContractAddress(),
    abi: THP_PROFILE_REGISTRY_ABI,
    functionName: "getAllProfiles",
  });

  return useQuery<ProfileRef[]>({
    queryKey: ["profile-refs", profilesData],
    queryFn: async () => {
      if (!profilesData) return [];

      // Filtrer les profils publics et préparer les références
      return profilesData
        .filter((p: any) => p.isPublic && p.profileURI)
        .map((p: any) => ({
          address: p.owner,
          profileURI: p.profileURI,
          updatedAt: Number(p.updatedAt),
        }))
        .sort((a, b) => b.updatedAt - a.updatedAt); // Trier par date de mise à jour décroissante
    },
    enabled: !!profilesData && !isLoading,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook pour charger un batch de profils avec leurs données IPFS
 * Utilise useQueries pour charger plusieurs profils en parallèle avec cache
 */
export function useProfilesBatch(refs: ProfileRef[], startIndex: number, endIndex: number) {
  const batch = refs.slice(startIndex, endIndex);

  const queries = useQueries({
    queries: batch.map((ref) => ({
      queryKey: ["ipfs-profile", ref.profileURI],
      queryFn: () => fetchProfile(ref.profileURI),
      enabled: !!ref.profileURI,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    })),
  });

  const profiles: ProfileWithAddress[] = batch.map((ref, index) => ({
    address: ref.address,
    profile: queries[index].data || null,
    updatedAt: ref.updatedAt,
    profileURI: ref.profileURI,
  }));

  const isLoading = queries.some((q) => q.isLoading);
  const hasError = queries.some((q) => q.isError);

  return {
    profiles: profiles.filter((p) => p.profile !== null) as ProfileWithAddress[],
    isLoading,
    hasError,
  };
}
