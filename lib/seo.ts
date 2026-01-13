/**
 * Utilitaires SEO pour le Portail THP
 */

import type { Metadata } from "next";
import type { ProfileIPFS } from "./schemas";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://portal-thp.vercel.app";

/**
 * Génère les métadonnées pour une page de profil
 */
export function generateProfileMetadata(
  profile: ProfileIPFS,
  address: string
): Metadata {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const title = `${fullName} - Portail THP`;
  const description = profile.bio || `Profil de ${fullName} sur le Portail THP`;

  const avatarUrl = profile.avatarCID
    ? `https://gateway.pinata.cloud/ipfs/${profile.avatarCID}`
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      locale: "fr_FR",
      images: avatarUrl
        ? [
            {
              url: avatarUrl,
              width: 400,
              height: 400,
              alt: `${fullName} - Avatar`,
            },
          ]
        : [],
      siteName: "Portail THP",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: avatarUrl ? [avatarUrl] : [],
    },
    alternates: {
      canonical: `${baseUrl}/u/${address}`,
    },
  };
}

/**
 * Génère le JSON-LD Schema.org pour un profil
 */
export function generateProfileSchema(
  profile: ProfileIPFS,
  address: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${profile.firstName} ${profile.lastName}`,
    description: profile.bio,
    url: `${baseUrl}/u/${address}`,
    image: profile.avatarCID
      ? `https://gateway.pinata.cloud/ipfs/${profile.avatarCID}`
      : undefined,
    jobTitle: profile.department,
    knowsAbout: profile.stackTags,
    sameAs: [
      profile.github,
      profile.linkedin,
    ].filter(Boolean),
    identifier: {
      "@type": "PropertyValue",
      name: "Ethereum Address",
      value: address,
    },
  };
}

/**
 * Génère les métadonnées pour la page directory
 */
export function generateDirectoryMetadata(profileCount: number): Metadata {
  return {
    title: "Annuaire - Portail THP",
    description: `Découvrez ${profileCount} développeur${profileCount > 1 ? "s" : ""} de la promo THP`,
    openGraph: {
      title: "Annuaire - Portail THP",
      description: `Annuaire décentralisé des développeurs THP - ${profileCount} profil${profileCount > 1 ? "s" : ""}`,
      type: "website",
      locale: "fr_FR",
    },
    alternates: {
      canonical: `${baseUrl}/directory`,
    },
  };
}

/**
 * Génère le JSON-LD Schema.org pour l'annuaire
 */
export function generateDirectorySchema(profileCount: number): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Annuaire Portail THP",
    description: `Annuaire décentralisé des développeurs THP - ${profileCount} profil${profileCount > 1 ? "s" : ""}`,
    url: `${baseUrl}/directory`,
    numberOfItems: profileCount,
  };
}
