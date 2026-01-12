# Guide de développement - Portail THP

Guide complet pour développer sur le Portail THP.

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## Structure du code

### Pages (App Router)

Les pages sont dans `app/` :

- `app/page.tsx` : Page d'accueil
- `app/directory/page.tsx` : Annuaire des profils
- `app/dashboard/page.tsx` : Dashboard utilisateur
- `app/u/[address]/page.tsx` : Profil public

**Convention :** Utiliser `"use client"` pour les composants interactifs.

### Composants

Organisation dans `components/` :

```
components/
├── ui/              # Composants UI réutilisables (shadcn)
├── wallet/          # Composants wallet
├── profile/          # Composants profil
└── providers.tsx    # Providers React
```

**Convention :** Un composant par fichier, nommé en PascalCase.

### Bibliothèques

Utilitaires dans `lib/` :

- `wagmi.ts` : Configuration Wagmi
- `siwe.ts` : Logique SIWE
- `ipfs.ts` : Intégration IPFS
- `contract.ts` : ABI et adresses
- `schemas.ts` : Schémas Zod
- `utils.ts` : Utilitaires
- `i18n.ts` : Traductions

## Conventions de code

### TypeScript

```typescript
// ✅ Bon : Typage explicite
function getUser(address: string): Promise<User> {
  // ...
}

// ❌ Éviter : any
function getUser(address: any): any {
  // ...
}
```

### React

```typescript
// ✅ Bon : Client Component explicite
"use client";

export function MyComponent() {
  // ...
}

// ✅ Bon : Hooks personnalisés
function useMyHook() {
  // ...
}
```

### Imports

```typescript
// ✅ Bon : Imports organisés
import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
```

**Ordre :**
1. React et bibliothèques externes
2. Bibliothèques internes (wagmi, etc.)
3. Composants UI
4. Utilitaires et hooks personnalisés

## Hooks personnalisés

### useI18n

```typescript
import { useI18n } from "@/lib/i18n-context";

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return <div>{t.home.title}</div>;
}
```

### Hooks Wagmi

```typescript
import { useAccount, useConnect } from "wagmi";

function MyComponent() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  
  // ...
}
```

## Gestion des formulaires

### React Hook Form + Zod

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/schemas";

function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      // ...
    },
  });

  const onSubmit = async (data) => {
    // Validation automatique via Zod
    // ...
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ... */}
    </form>
  );
}
```

## Traductions

### Ajouter une traduction

1. Ajouter dans `lib/i18n.ts` :

```typescript
export const translations = {
  fr: {
    mySection: {
      myKey: "Ma traduction",
    },
  },
  en: {
    mySection: {
      myKey: "My translation",
    },
  },
};
```

2. Utiliser dans un composant :

```typescript
const { t } = useI18n();
return <div>{t.mySection.myKey}</div>;
```

## Web3

### Lire depuis le contrat

```typescript
import { useReadContract } from "wagmi";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";

function MyComponent() {
  const { data } = useReadContract({
    address: getContractAddress(),
    abi: THP_PROFILE_REGISTRY_ABI,
    functionName: "getProfile",
    args: [address],
  });
  
  // ...
}
```

### Écrire dans le contrat

```typescript
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

function MyComponent() {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = async () => {
    writeContract({
      address: getContractAddress(),
      abi: THP_PROFILE_REGISTRY_ABI,
      functionName: "setProfile",
      args: [profileURI, isPublic],
    });
  };
  
  // ...
}
```

## IPFS

### Uploader un fichier

```typescript
import { uploadToIPFS } from "@/lib/ipfs";

const handleUpload = async (file: File) => {
  const cid = await uploadToIPFS(file);
  console.log("CID:", cid);
};
```

### Récupérer un profil

```typescript
import { fetchProfile } from "@/lib/ipfs";

const profile = await fetchProfile(profileURI);
```

## Tests

### Tests unitaires (Vitest)

```bash
npm run test
```

Créer un test dans `__tests__/` :

```typescript
import { describe, it, expect } from "vitest";
import { truncateAddress } from "@/lib/utils";

describe("truncateAddress", () => {
  it("should truncate address", () => {
    const address = "0x1234567890123456789012345678901234567890";
    expect(truncateAddress(address)).toBe("0x1234...7890");
  });
});
```

### Tests E2E (Playwright)

```bash
npm run test:e2e
```

Créer un test dans `tests/` :

```typescript
import { test, expect } from "@playwright/test";

test("should display home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Portail THP")).toBeVisible();
});
```

## Linting et formatage

### ESLint

```bash
npm run lint
```

**Règles :** Configurées dans `.eslintrc.json`

### TypeScript

```bash
npm run build
```

Vérifie les erreurs TypeScript lors du build.

## Débogage

### Console logs

```typescript
console.log("Debug:", data);
console.error("Error:", error);
```

### React DevTools

Installer l'extension React DevTools pour inspecter les composants.

### Wagmi DevTools

Wagmi inclut des DevTools pour inspecter l'état Web3.

## Performance

### Optimisations

1. **Lazy loading** : Charger les composants à la demande
2. **Memoization** : Utiliser `useMemo` et `useCallback`
3. **Image optimization** : Utiliser le composant `Image` de Next.js

### Exemple

```typescript
import { useMemo } from "react";

const filteredProfiles = useMemo(() => {
  return profiles.filter(/* ... */);
}, [profiles, searchQuery]);
```

## Git

### Workflow recommandé

1. Créer une branche : `git checkout -b feature/my-feature`
2. Commiter régulièrement : `git commit -m "feat: add feature"`
3. Pousser : `git push origin feature/my-feature`
4. Créer une Pull Request

### Messages de commit

Format : `type: description`

Types :
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage
- `refactor` : Refactorisation
- `test` : Tests
- `chore` : Tâches diverses

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)

## Support

Pour toute question :
1. Consulter cette documentation
2. Vérifier les exemples dans le code
3. Ouvrir une issue sur GitHub
