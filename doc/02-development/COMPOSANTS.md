# Documentation des composants - Portail THP

Documentation complète de tous les composants UI et fonctionnels.

## Composants UI (shadcn/ui)

### Button

**Fichier :** `components/ui/button.tsx`

**Variantes :**
- `default` : Bouton principal (fond clair, texte sombre)
- `outline` : Bouton avec bordure (fond transparent avec backdrop blur)
- `secondary` : Bouton secondaire
- `ghost` : Bouton sans bordure
- `destructive` : Bouton de suppression
- `link` : Bouton style lien

**Tailles :**
- `default` : `h-7 px-3`
- `sm` : `h-6 px-2.5`
- `lg` : `h-8 px-4`

**Exemple :**
```typescript
import { Button } from "@/components/ui/button";

<Button variant="outline" size="sm">
  Cliquer
</Button>
```

### Card

**Fichier :** `components/ui/card.tsx`

**Composants :**
- `Card` : Conteneur principal
- `CardHeader` : En-tête
- `CardTitle` : Titre
- `CardDescription` : Description
- `CardContent` : Contenu

**Exemple :**
```typescript
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card className="bg-card border-border/30">
  <CardHeader>
    <CardTitle>Titre</CardTitle>
  </CardHeader>
  <CardContent>
    Contenu
  </CardContent>
</Card>
```

### Input

**Fichier :** `components/ui/input.tsx`

**Style :** Minimaliste, hauteur `h-7`, texte `text-xs`

**Exemple :**
```typescript
import { Input } from "@/components/ui/input";

<Input
  placeholder="Rechercher..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Textarea

**Fichier :** `components/ui/textarea.tsx`

**Style :** Minimaliste, hauteur minimale `min-h-[60px]`

**Exemple :**
```typescript
import { Textarea } from "@/components/ui/textarea";

<Textarea
  placeholder="Description..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Select

**Fichier :** `components/ui/select.tsx`

**Composants :**
- `Select` : Racine
- `SelectTrigger` : Déclencheur
- `SelectValue` : Valeur affichée
- `SelectContent` : Contenu du menu
- `SelectItem` : Élément du menu

**Exemple :**
```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Avatar

**Fichier :** `components/ui/avatar.tsx`

**Composants :**
- `Avatar` : Conteneur
- `AvatarImage` : Image
- `AvatarFallback` : Fallback (initiales)

**Exemple :**
```typescript
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src={avatarUrl} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Composants Wallet

### ConnectButton

**Fichier :** `components/wallet/connect-button.tsx`

**Fonctionnalités :**
- Affiche les connecteurs disponibles (MetaMask, WalletConnect)
- Affiche l'adresse tronquée si connecté
- Bouton de déconnexion

**Exemple :**
```typescript
import { ConnectButton } from "@/components/wallet/connect-button";

<ConnectButton />
```

**Comportement :**
- Si non connecté : Affiche les boutons de connexion
- Si connecté : Affiche l'adresse + bouton déconnexion

### SiweButton

**Fichier :** `components/wallet/siwe-button.tsx`

**Fonctionnalités :**
- Authentification SIWE
- Signature de message
- Stockage de session dans localStorage
- Redirection vers dashboard après authentification

**Exemple :**
```typescript
import { SiweButton } from "@/components/wallet/siwe-button";

<SiweButton />
```

**États :**
- Non connecté : Non affiché
- Connecté mais non authentifié : Bouton "Se connecter avec Ethereum"
- Authentifié : Bouton "Authentifié" (désactivé)

## Composants Profil

### ProfileForm

**Fichier :** `components/profile/profile-form.tsx`

**Fonctionnalités :**
- Formulaire de création/édition de profil
- Upload d'avatar (IPFS)
- Gestion des tags de stack technique
- Validation Zod
- Sauvegarde sur blockchain

**Props :**
```typescript
interface ProfileFormProps {
  initialData?: Profile;
}
```

**Champs :**
- Prénom, Nom
- Âge, Département
- Bio
- LinkedIn, GitHub, Discord
- Stack technique (tags)
- Disponibilité
- Visibilité (public/privé)

**Exemple :**
```typescript
import { ProfileForm } from "@/components/profile/profile-form";

<ProfileForm initialData={profile} />
```

## Composants i18n

### LanguageSelector

**Fichier :** `components/ui/language-selector.tsx`

**Fonctionnalités :**
- Sélection de langue (FR/EN)
- Sauvegarde dans localStorage
- Mise à jour automatique de l'interface

**Exemple :**
```typescript
import { LanguageSelector } from "@/components/ui/language-selector";

<LanguageSelector />
```

**Langues supportées :**
- Français (fr)
- Anglais (en)

## Composants spéciaux

### LetterGlitch

**Fichier :** `components/ui/letter-glitch.tsx`

**Fonctionnalités :**
- Animation de fond avec lettres glitch
- Canvas HTML5
- Effet de vignette

**Props :**
```typescript
interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
}
```

**Exemple :**
```typescript
import LetterGlitch from "@/components/ui/letter-glitch";

<LetterGlitch
  glitchColors={['#2a2a2a', '#3a3a3a', '#4a4a4a', '#5a5a5a']}
  glitchSpeed={80}
  outerVignette={true}
/>
```

### MetaMaskLogo

**Fichier :** `components/ui/metamask-logo.tsx`

**Fonctionnalités :**
- Logo MetaMask officiel (SVG)
- Taille personnalisable via className

**Exemple :**
```typescript
import { MetaMaskLogo } from "@/components/ui/metamask-logo";

<MetaMaskLogo className="h-3 w-3" />
```

## Providers

### Providers

**Fichier :** `components/providers.tsx`

**Fonctionnalités :**
- Wrapper pour tous les providers React
- WagmiProvider : Configuration Web3
- QueryClientProvider : Cache React Query
- I18nProvider : Gestion des traductions
- LangWrapper : Mise à jour de l'attribut lang

**Utilisation :**
```typescript
import { Providers } from "@/components/providers";

<Providers>
  {children}
</Providers>
```

## Hooks personnalisés

### useI18n

**Fichier :** `lib/i18n-context.tsx`

**Retourne :**
```typescript
{
  locale: Locale;           // Langue actuelle ('fr' | 'en')
  setLocale: (locale) => void; // Changer la langue
  t: Translation;           // Objet de traductions
}
```

**Exemple :**
```typescript
import { useI18n } from "@/lib/i18n-context";

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return <div>{t.home.title}</div>;
}
```

## Bonnes pratiques

### Utilisation des composants

1. **Imports absolus** : Utiliser `@/components/...`
2. **Composants UI** : Utiliser les composants shadcn/ui
3. **Traductions** : Toujours utiliser `useI18n()` pour les textes
4. **Types** : Typer les props avec TypeScript

### Création de nouveaux composants

1. Créer dans le dossier approprié (`ui/`, `wallet/`, etc.)
2. Utiliser TypeScript avec types explicites
3. Ajouter les traductions si nécessaire
4. Documenter les props et l'utilisation

### Style

- Utiliser Tailwind CSS
- Respecter le thème sombre
- Utiliser les classes utilitaires
- Éviter les styles inline sauf nécessité

## Support

Pour toute question sur les composants :
1. Consulter cette documentation
2. Examiner le code source du composant
3. Vérifier les exemples d'utilisation dans le projet
