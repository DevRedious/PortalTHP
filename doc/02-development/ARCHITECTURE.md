# Architecture - Portail THP

## Vue d'ensemble

Le Portail THP est une application Web3 décentralisée construite avec Next.js 14, utilisant l'App Router pour le routage côté serveur et client.

## Architecture générale

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │  Components  │  │     Lib      │     │
│  │              │  │              │  │              │     │
│  │ - Home       │  │ - UI         │  │ - Wagmi      │     │
│  │ - Directory  │  │ - Wallet     │  │ - SIWE       │     │
│  │ - Dashboard  │  │ - Profile    │  │ - IPFS       │     │
│  │ - Profile    │  │ - i18n       │  │ - Utils      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│   Blockchain   │  │      IPFS     │  │   Wallet      │
│   (Ethereum)   │  │   (Pinata)    │  │  (MetaMask)   │
│                │  │               │  │               │
│ Smart Contract │  │ Profile JSON  │  │  Connection   │
│ CID Storage    │  │ Avatar Images │  │  Signature    │
└────────────────┘  └───────────────┘  └───────────────┘
```

## Structure du projet

```
portal-thp/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout racine avec providers
│   ├── page.tsx           # Page d'accueil
│   ├── directory/         # Annuaire des profils
│   ├── dashboard/         # Dashboard utilisateur
│   └── u/[address]/       # Profil public
│
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables (shadcn)
│   ├── wallet/           # Composants wallet (connect, SIWE)
│   ├── profile/          # Composants profil
│   └── providers.tsx     # Providers React (Wagmi, i18n)
│
├── lib/                  # Bibliothèques et utilitaires
│   ├── wagmi.ts         # Configuration Wagmi
│   ├── siwe.ts          # Logique SIWE
│   ├── ipfs.ts          # Intégration IPFS
│   ├── contract.ts      # ABI et adresses contrats
│   ├── schemas.ts       # Schémas Zod
│   ├── utils.ts         # Utilitaires généraux
│   ├── i18n.ts          # Traductions
│   └── i18n-context.tsx # Contexte i18n
│
├── contracts/            # Smart contracts Solidity
│   ├── THPProfileRegistry.sol
│   ├── script/
│   └── test/
│
└── doc/                  # Documentation
```

## Flux de données

### 1. Authentification (SIWE)

```
Utilisateur → Connect Wallet → Sign Message → Store Session → Access Dashboard
     │              │                │              │              │
     │              │                │              │              │
  MetaMask      Wagmi Hook      SIWE Message   localStorage    Protected Route
```

**Étapes détaillées :**
1. L'utilisateur clique sur "Connecter" → Wagmi gère la connexion wallet
2. Une fois connecté, l'utilisateur signe un message SIWE
3. La signature est stockée dans `localStorage` avec l'adresse
4. Les routes protégées vérifient la présence de la session

### 2. Création de profil

```
Dashboard → Form Data → Validate (Zod) → Upload Avatar (IPFS) → Upload Profile (IPFS) → Get CID → Write Contract → Confirm
     │          │            │                  │                    │                │           │              │
     │          │            │                  │                    │                │           │              │
  React      FormData    Schema Check      Pinata API          Pinata API      IPFS CID   Blockchain    Transaction
```

**Étapes détaillées :**
1. L'utilisateur remplit le formulaire de profil
2. Validation avec Zod (`lib/schemas.ts`)
3. Upload de l'avatar sur IPFS (si fourni) → obtention du CID
4. Création du JSON de profil avec le CID de l'avatar
5. Upload du JSON sur IPFS → obtention du CID principal
6. Transaction blockchain pour enregistrer le CID dans le contrat
7. Attente de confirmation de la transaction

### 3. Lecture de profil

```
Directory → Read Contract → Get All Profiles → Filter Public → Fetch IPFS → Display
     │            │               │                 │              │          │
     │            │               │                 │              │          │
  Page Load   Wagmi Hook    Contract Call      Filter Logic   Pinata API   React UI
```

**Étapes détaillées :**
1. La page Directory charge tous les profils depuis le contrat
2. Filtrage des profils publics (`isPublic === true`)
3. Pour chaque profil, récupération du JSON depuis IPFS
4. Affichage dans l'interface utilisateur

## Technologies et bibliothèques

### Frontend Core
- **Next.js 14** : Framework React avec App Router, SSR, SSG
- **React 18** : Bibliothèque UI avec hooks et contexte
- **TypeScript** : Typage statique pour la sécurité du code

### Styling
- **Tailwind CSS** : Framework CSS utilitaire
- **shadcn/ui** : Composants UI basés sur Radix UI
- **Lucide React** : Icônes

### Web3
- **Wagmi** : Hooks React pour Ethereum
- **Viem** : Bibliothèque TypeScript pour Ethereum
- **WalletConnect** : Connexion multi-wallet
- **SIWE** : Sign-In With Ethereum (EIP-4361)

### Validation et formulaires
- **Zod** : Validation de schémas TypeScript
- **React Hook Form** : Gestion de formulaires

### Stockage
- **Pinata** : Service IPFS géré
- **IPFS** : Protocole de stockage décentralisé

### Smart Contracts
- **Solidity 0.8.20** : Langage de programmation
- **Foundry** : Outils de développement et tests
- **OpenZeppelin** : Bibliothèque de contrats sécurisés

## Patterns architecturaux

### 1. Server Components / Client Components

Next.js 14 utilise l'App Router avec distinction entre Server et Client Components :

- **Server Components** : Par défaut, rendus côté serveur
- **Client Components** : Marqués avec `"use client"` pour l'interactivité

### 2. Context API

Utilisation de Context pour :
- **I18nProvider** : Gestion de la langue
- **WagmiProvider** : Configuration Web3
- **QueryClientProvider** : Cache et requêtes

### 3. Custom Hooks

Hooks personnalisés pour :
- `useI18n()` : Accès aux traductions
- Hooks Wagmi : `useAccount()`, `useConnect()`, etc.

### 4. Schema Validation

Validation avec Zod avant :
- Upload IPFS
- Envoi de transactions
- Affichage de données

## Sécurité

### Côté client
- Validation Zod avant envoi
- Vérification de propriété via SIWE
- Stockage sécurisé des sessions

### Côté blockchain
- Contrôles d'accès dans le contrat
- Validation des données on-chain
- Protection contre les reentrancy

## Limitations actuelles

1. **Pas de backend** : Tout est décentralisé, pas de serveur centralisé
2. **Pas d'indexation** : Lecture directe depuis le contrat (peut être lent)
3. **Pas de pagination** : Tous les profils chargés en une fois
4. **Vérification SIWE basique** : Pas de vérification serveur

## Améliorations futures

1. **Subgraph The Graph** : Indexation pour requêtes rapides
2. **API Route SIWE** : Vérification serveur des signatures
3. **Pagination** : Chargement progressif
4. **Cache IPFS** : Mise en cache des données IPFS
5. **Notifications** : Alertes pour nouvelles mises à jour
