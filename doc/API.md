# API et Smart Contracts - Portail THP

Documentation complète de l'API IPFS et des smart contracts.

## Smart Contract : THPProfileRegistry

### Adresse du contrat

L'adresse du contrat est définie dans `lib/contract.ts` :

```typescript
export function getContractAddress(): `0x${string}` {
  return (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0") as `0x${string}`;
}
```

### ABI

L'ABI complet est disponible dans `lib/contract.ts`.

### Fonctions principales

#### getProfile

Récupère le profil d'une adresse.

```solidity
function getProfile(address owner) external view returns (Profile memory)
```

**Paramètres :**
- `owner` : Adresse Ethereum du propriétaire

**Retourne :**
```solidity
struct Profile {
    address owner;
    string profileURI;  // CID IPFS
    bool isPublic;
    uint256 updatedAt;
}
```

**Exemple d'utilisation :**
```typescript
import { useReadContract } from "wagmi";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";

const { data } = useReadContract({
  address: getContractAddress(),
  abi: THP_PROFILE_REGISTRY_ABI,
  functionName: "getProfile",
  args: [address],
});
```

#### getAllProfiles

Récupère tous les profils enregistrés.

```solidity
function getAllProfiles() external view returns (Profile[] memory)
```

**Retourne :** Tableau de tous les profils

**Exemple d'utilisation :**
```typescript
const { data: profiles } = useReadContract({
  address: getContractAddress(),
  abi: THP_PROFILE_REGISTRY_ABI,
  functionName: "getAllProfiles",
});
```

#### setProfile

Enregistre ou met à jour un profil.

```solidity
function setProfile(string calldata profileURI, bool isPublic) external
```

**Paramètres :**
- `profileURI` : CID IPFS du profil JSON
- `isPublic` : Visibilité publique

**Événements :**
```solidity
event ProfileUpdated(address indexed owner, string profileURI, bool isPublic, uint256 timestamp);
```

**Exemple d'utilisation :**
```typescript
import { useWriteContract } from "wagmi";

const { writeContract } = useWriteContract();

writeContract({
  address: getContractAddress(),
  abi: THP_PROFILE_REGISTRY_ABI,
  functionName: "setProfile",
  args: [profileURI, isPublic],
});
```

### Structure des données

#### On-chain (Smart Contract)

```solidity
struct Profile {
    address owner;        // Adresse Ethereum du propriétaire
    string profileURI;    // CID IPFS du profil JSON
    bool isPublic;        // Visibilité publique
    uint256 updatedAt;    // Timestamp de dernière mise à jour
}
```

#### Off-chain (IPFS JSON)

```typescript
interface ProfileIPFS {
  version: "1.0";
  firstName: string;
  lastName: string;
  age?: number;
  department: string;
  bio: string;
  linkedin?: string;
  github?: string;
  discord?: string;
  stackTags: string[];
  availability: "available" | "busy" | "unavailable";
  avatarCID?: string;  // CID IPFS de l'avatar
  updatedAt: string;  // ISO timestamp
}
```

## API IPFS (Pinata)

### Configuration

**Endpoint :** `https://api.pinata.cloud`

**Authentification :** JWT token dans le header `Authorization`

### Upload de fichier

**Fonction :** `uploadToIPFS(file: File | Blob | string)`

**Fichier :** `lib/ipfs.ts`

**Exemple :**
```typescript
import { uploadToIPFS } from "@/lib/ipfs";

// Upload d'un fichier
const file = new File([...], "avatar.jpg", { type: "image/jpeg" });
const cid = await uploadToIPFS(file);

// Upload d'un JSON
const profileData = { firstName: "John", lastName: "Doe" };
const cid = await uploadToIPFS(JSON.stringify(profileData), "application/json");
```

**Retourne :** CID IPFS (string)

### Récupération de profil

**Fonction :** `fetchProfile(profileURI: string)`

**Fichier :** `lib/ipfs.ts`

**Exemple :**
```typescript
import { fetchProfile } from "@/lib/ipfs";

const profile = await fetchProfile("QmXxxx...");
```

**Retourne :** `ProfileIPFS` (objet profil)

### URL IPFS

**Fonction :** `getIPFSUrl(cid: string)`

**Fichier :** `lib/ipfs.ts`

**Exemple :**
```typescript
import { getIPFSUrl } from "@/lib/ipfs";

const imageUrl = getIPFSUrl("QmXxxx...");
// Retourne : "https://gateway.pinata.cloud/ipfs/QmXxxx..."
```

**Gateways disponibles :**
- Pinata : `https://gateway.pinata.cloud/ipfs/`
- IPFS.io : `https://ipfs.io/ipfs/`
- Cloudflare : `https://cloudflare-ipfs.com/ipfs/`

## API SIWE

### Création de message SIWE

**Fonction :** `createSiweMessage(address, statement, domain, origin)`

**Fichier :** `lib/siwe.ts`

**Exemple :**
```typescript
import { createSiweMessage } from "@/lib/siwe";

const message = createSiweMessage(
  "0x1234...",
  "Connectez-vous au Portail THP",
  "localhost:3000",
  "http://localhost:3000"
);

const messageToSign = message.prepareMessage();
```

### Vérification de signature

**Fonction :** `verifySiweMessage(message, signature)`

**Fichier :** `lib/siwe.ts`

**Exemple :**
```typescript
import { verifySiweMessage } from "@/lib/siwe";

const isValid = await verifySiweMessage(messageToSign, signature);
```

**Retourne :** `boolean` (true si valide)

## Schémas de validation

### Profile Schema

**Fichier :** `lib/schemas.ts`

**Schéma Zod :**
```typescript
export const profileSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  age: z.number().int().min(1).max(150).optional(),
  department: z.string().min(1).max(100),
  bio: z.string().min(10).max(1000),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  discord: z.string().max(50).optional(),
  stackTags: z.array(z.string().max(30)).max(20),
  availability: z.enum(["available", "busy", "unavailable"]),
  isPublic: z.boolean(),
});
```

**Utilisation :**
```typescript
import { profileSchema } from "@/lib/schemas";

const result = profileSchema.safeParse(data);
if (result.success) {
  const profile = result.data;
}
```

## Utilitaires

### truncateAddress

**Fichier :** `lib/utils.ts`

Tronque une adresse Ethereum pour l'affichage.

```typescript
import { truncateAddress } from "@/lib/utils";

truncateAddress("0x1234567890123456789012345678901234567890");
// Retourne : "0x1234...7890"
```

### formatDate

**Fichier :** `lib/utils.ts`

Formate une date pour l'affichage.

```typescript
import { formatDate } from "@/lib/utils";

formatDate(new Date());
// Retourne : "12 janv. 2024"
```

## Gestion des erreurs

### Erreurs Web3

```typescript
try {
  await writeContract(...);
} catch (error) {
  if (error.code === "USER_REJECTED") {
    // Utilisateur a annulé
  } else if (error.code === "INSUFFICIENT_FUNDS") {
    // Fonds insuffisants
  }
}
```

### Erreurs IPFS

```typescript
try {
  const cid = await uploadToIPFS(file);
} catch (error) {
  console.error("Erreur IPFS:", error);
  // Gérer l'erreur
}
```

## Rate Limits

### Pinata

- **Plan gratuit** : 1 GB de stockage, pas de limite de requêtes
- **Plan payant** : Limites plus élevées

### Blockchain

- **RPC publics** : Limites de rate limiting
- **RPC dédiés** : Limites plus élevées

## Bonnes pratiques

1. **Valider les données** : Toujours valider avec Zod avant upload
2. **Gérer les erreurs** : Capturer et gérer les erreurs Web3/IPFS
3. **Feedback utilisateur** : Afficher les états de chargement
4. **Confirmation** : Attendre la confirmation des transactions
5. **Cache** : Mettre en cache les données IPFS quand possible

## Support

Pour toute question sur l'API :
1. Consulter cette documentation
2. Examiner le code source dans `lib/`
3. Consulter la documentation Pinata et Wagmi
4. Ouvrir une issue sur GitHub
