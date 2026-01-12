# Architecture - Portail THP

## Vue d'ensemble

Le Portail THP est une application web3 décentralisée permettant aux développeurs de créer et gérer des profils décentralisés stockés sur IPFS et liés à leur adresse Ethereum.

## Flux d'authentification (SIWE)

1. **Connexion Wallet** : L'utilisateur connecte son wallet (MetaMask, WalletConnect, etc.)
2. **Signature SIWE** : L'utilisateur signe un message conforme à EIP-4361
3. **Session Locale** : La signature est stockée dans `localStorage` pour maintenir la session
4. **Accès Dashboard** : L'utilisateur peut accéder à son dashboard pour gérer son profil

## Flux de création de profil

1. **Authentification** : L'utilisateur doit être connecté et authentifié via SIWE
2. **Upload Avatar** (optionnel) : L'avatar est uploadé sur IPFS via web3.storage
3. **Création Profil JSON** : Les données du profil sont structurées en JSON selon le schéma Zod
4. **Upload Profil** : Le JSON est uploadé sur IPFS, retournant un CID
5. **Transaction Blockchain** : Le CID est enregistré dans le smart contract `THPProfileRegistry`
6. **Confirmation** : La transaction est confirmée, le profil est maintenant public

## Structure des données

### On-chain (Smart Contract)

```solidity
struct Profile {
    address owner;        // Adresse Ethereum du propriétaire
    string profileURI;    // CID IPFS du profil JSON
    bool isPublic;        // Visibilité publique
    uint256 updatedAt;    // Timestamp de dernière mise à jour
}
```

### Off-chain (IPFS JSON)

```typescript
{
  version: "1.0",
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
  avatarCID?: string;
  updatedAt: string; // ISO timestamp
}
```

## Technologies utilisées

### Frontend
- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling utilitaire
- **shadcn/ui** : Composants UI réutilisables

### Web3
- **wagmi** : Hooks React pour Ethereum
- **viem** : Bibliothèque TypeScript pour Ethereum
- **WalletConnect** : Connexion multi-wallet

### Authentification
- **SIWE** : Sign-In With Ethereum (EIP-4361)
- **localStorage** : Stockage de session côté client

### Stockage
- **web3.storage** : Service IPFS gratuit
- **IPFS** : Stockage décentralisé

### Smart Contracts
- **Solidity 0.8.20** : Langage de programmation
- **OpenZeppelin** : Bibliothèque de contrats sécurisés
- **Foundry** : Outils de développement et tests

## Sécurité

### Contrôles d'accès
- Seul le propriétaire du wallet peut modifier son profil
- L'authentification SIWE garantit la propriété de l'adresse
- Les données sensibles sont stockées hors chaîne (IPFS)

### Validations
- Schémas Zod pour valider les données avant upload
- Validation côté contrat pour éviter les URIs vides
- Vérification de l'adresse Ethereum avant lecture

## Limitations actuelles

1. **Pas de vérification serveur SIWE** : La vérification SIWE est basique côté client
2. **Pas d'indexation** : Lecture directe des événements on-chain (pas de subgraph)
3. **Pas de pagination** : Tous les profils sont chargés en une fois
4. **Pas de recherche avancée** : Recherche simple par texte

## Améliorations futures

1. **Subgraph The Graph** : Indexation pour des requêtes plus rapides
2. **Vérification SIWE serveur** : API route pour vérifier les signatures
3. **Pagination** : Chargement progressif des profils
4. **Filtres avancés** : Recherche par stack, département, disponibilité
5. **Notifications** : Alertes pour nouvelles mises à jour
