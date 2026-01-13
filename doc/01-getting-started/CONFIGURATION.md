# Configuration - Portail THP

Documentation complète de la configuration du Portail THP.

## Variables d'environnement

### Fichier `.env.local`

Toutes les variables d'environnement doivent être définies dans `.env.local` à la racine du projet.

### Variables requises

#### WalletConnect

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

- **Description** : Project ID WalletConnect pour la connexion multi-wallet
- **Où l'obtenir** : [cloud.walletconnect.com](https://cloud.walletconnect.com)
- **Gratuit** : Oui, compte gratuit disponible

#### Pinata IPFS

```env
NEXT_PUBLIC_PINATA_JWT=your_jwt_token
```

- **Description** : JWT token pour l'API Pinata (stockage IPFS)
- **Où l'obtenir** : [pinata.cloud](https://www.pinata.cloud) → API Keys
- **Gratuit** : Oui, plan gratuit avec limites généreuses

#### Blockchain

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

- **CHAIN_ID** : ID de la chaîne Ethereum
  - `11155111` : Sepolia (testnet)
  - `17000` : Holesky (testnet)
  - `80002` : Polygon Amoy (testnet)
  - `84532` : Base Sepolia (testnet)

- **CONTRACT_ADDRESS** : Adresse du contrat `THPProfileRegistry` déployé
  - Format : `0x` suivi de 40 caractères hexadécimaux

#### RPC URL (Optionnel)

```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your_key
```

- **Description** : URL RPC personnalisée pour les requêtes blockchain
- **Optionnel** : Wagmi utilise des RPC publics par défaut
- **Recommandé** : Pour la production, utiliser une RPC dédiée

## Configuration Next.js

### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ipfs.w3s.link',
      },
    ],
  },
};

module.exports = nextConfig;
```

**Explications :**
- `reactStrictMode` : Active le mode strict React
- `webpack.fallback` : Désactive les modules Node.js côté client
- `images.remotePatterns` : Autorise les images depuis IPFS

## Configuration Tailwind CSS

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Variables CSS définies dans globals.css
      },
    },
  },
  plugins: [],
};

export default config;
```

**Thème sombre :** Activé par défaut via `darkMode: ["class"]` et `className="dark"` dans le layout.

## Configuration TypeScript

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Points importants :**
- `strict: true` : Mode strict activé
- `paths` : Alias `@/*` pour les imports absolus

## Configuration Wagmi

### `lib/wagmi.ts`

```typescript
import { getDefaultConfig } from '@wagmi/core';
import { sepolia } from 'wagmi/chains';
import { injected, walletConnect } from '@wagmi/connectors';

export const config = getDefaultConfig({
  appName: 'Portail THP',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [sepolia],
  connectors: [
    injected({ target: 'metaMask' }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID! }),
  ],
});
```

**Configuration :**
- **Chains** : Modifier selon votre réseau cible
- **Connectors** : MetaMask (injected) et WalletConnect

## Configuration IPFS

### `lib/ipfs.ts`

Utilise Pinata pour l'upload IPFS :

```typescript
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT!;
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
```

**Fonctions principales :**
- `uploadToIPFS()` : Upload un fichier ou JSON
- `fetchProfile()` : Récupère un profil depuis IPFS
- `getIPFSUrl()` : Génère l'URL IPFS complète

## Configuration SIWE

### `lib/siwe.ts`

```typescript
import { SiweMessage } from 'siwe';

export function createSiweMessage(
  address: string,
  statement: string,
  domain: string,
  origin: string
): SiweMessage {
  return new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
  });
}
```

**Paramètres :**
- `domain` : Domaine du site (ex: `localhost:3000`)
- `origin` : Origine complète (ex: `http://localhost:3000`)
- `chainId` : ID de la chaîne depuis les variables d'environnement

## Configuration i18n

### `lib/i18n.ts`

```typescript
export type Locale = 'fr' | 'en';
export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';
```

**Langues supportées :**
- Français (fr) - par défaut
- Anglais (en)

**Ajouter une langue :**
1. Ajouter le code dans `Locale` et `locales`
2. Ajouter les traductions dans `translations`
3. Mettre à jour `languageNames` dans `language-selector.tsx`

## Configuration des Smart Contracts

### `contracts/foundry.toml`

```toml
[profile]
default = "default"

[profile.default]
src = "src"
out = "out"
libs = ["lib"]

[profile.default.solc]
version = "0.8.20"
```

**Version Solidity :** 0.8.20

### Variables d'environnement Foundry

Créer `.env` dans `contracts/` :

```env
RPC_URL=https://sepolia.infura.io/v3/your_key
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_key
```

## Configuration ESLint

### `.eslintrc.json`

```json
{
  "extends": "next/core-web-vitals"
}
```

**Règles :** Utilise les règles Next.js par défaut.

## Thème et styles

### `app/globals.css`

Variables CSS pour le thème sombre :

```css
:root {
  --background: 0 0% 8%;
  --foreground: 0 0% 95%;
  --card: 0 0% 10%;
  /* ... */
}
```

**Personnalisation :**
- Modifier les valeurs HSL dans `:root`
- Le thème est appliqué automatiquement via Tailwind

## Vérification de la configuration

### Script de vérification

Créer un script `scripts/check-config.js` :

```javascript
const requiredEnvVars = [
  'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
  'NEXT_PUBLIC_PINATA_JWT',
  'NEXT_PUBLIC_CHAIN_ID',
  'NEXT_PUBLIC_CONTRACT_ADDRESS',
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ ${varName} is missing`);
    process.exit(1);
  } else {
    console.log(`✅ ${varName} is set`);
  }
});
```

Exécuter : `node scripts/check-config.js`

## Bonnes pratiques

1. **Ne jamais commiter `.env.local`** : Déjà dans `.gitignore`
2. **Utiliser des testnets pour le développement** : Sepolia, Holesky, etc.
3. **Valider les variables d'environnement** : Vérifier qu'elles sont définies
4. **Documenter les changements** : Mettre à jour cette doc si vous ajoutez des configs

## Support

Pour toute question sur la configuration :
1. Vérifier cette documentation
2. Consulter les fichiers de configuration dans le projet
3. Ouvrir une issue sur GitHub
