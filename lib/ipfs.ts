import type { ProfileIPFS } from "./schemas";

const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs";
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT || "";

/**
 * Upload un fichier sur IPFS via Pinata
 */
async function uploadToPinata(file: File | Blob, fileName: string): Promise<string> {
  if (!PINATA_JWT) {
    throw new Error("NEXT_PUBLIC_PINATA_JWT is not set. Get your free API key at https://www.pinata.cloud");
  }

  const formData = new FormData();
  formData.append("file", file, fileName);

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pinata upload failed: ${error}`);
  }

  const data = await response.json();
  return data.IpfsHash; // CID
}

export async function uploadProfile(profile: ProfileIPFS): Promise<string> {
  try {
    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: "application/json",
    });
    const file = new File([blob], "profile.json", { type: "application/json" });

    const cid = await uploadToPinata(file, "profile.json");
    return cid;
  } catch (error) {
    console.error("Error uploading profile to IPFS:", error);
    throw error;
  }
}

export async function uploadAvatar(file: File): Promise<string> {
  try {
    const cid = await uploadToPinata(file, file.name);
    return cid;
  } catch (error) {
    console.error("Error uploading avatar to IPFS:", error);
    throw error;
  }
}

export async function fetchProfile(cid: string): Promise<ProfileIPFS | null> {
  try {
    // Essayer plusieurs gateways IPFS pour la résilience
    const gateways = [
      `${PINATA_GATEWAY}/${cid}/profile.json`,
      `${PINATA_GATEWAY}/${cid}`,
      `https://ipfs.io/ipfs/${cid}/profile.json`,
      `https://ipfs.io/ipfs/${cid}`,
      `https://${cid}.ipfs.w3s.link/profile.json`,
      `https://${cid}.ipfs.w3s.link`,
    ];

    for (const url of gateways) {
      try {
        const response = await fetch(url, {
          // Timeout après 5 secondes
          signal: AbortSignal.timeout(5000),
        });
        
        if (response.ok) {
          const text = await response.text();
          try {
            return JSON.parse(text) as ProfileIPFS;
          } catch {
            // Si ce n'est pas du JSON valide, continuer avec le prochain gateway
            continue;
          }
        }
      } catch {
        // Continuer avec le prochain gateway
        continue;
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching profile from IPFS:", error);
    return null;
  }
}

export function getIPFSUrl(cid: string, filename?: string): string {
  // Utiliser Pinata gateway en priorité
  if (filename) {
    return `${PINATA_GATEWAY}/${cid}/${filename}`;
  }
  return `${PINATA_GATEWAY}/${cid}`;
}
