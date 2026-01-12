# Internationalisation (i18n) - Portail THP

Documentation complète du système de traduction.

## Vue d'ensemble

Le Portail THP supporte actuellement **2 langues** :
- 🇫🇷 **Français (fr)** - Langue par défaut
- 🇬🇧 **Anglais (en)**

## Architecture

### Fichiers principaux

- `lib/i18n.ts` : Définition des traductions
- `lib/i18n-context.tsx` : Contexte React et provider
- `components/ui/language-selector.tsx` : Composant de sélection
- `components/lang-wrapper.tsx` : Wrapper pour mettre à jour l'attribut lang

### Flux de traduction

```
I18nProvider → useI18n() → Composant → Affichage traduit
     │              │            │
     │              │            └─ t.home.title
     │              └─ { t, locale, setLocale }
     └─ localStorage (persistance)
```

## Utilisation

### Hook useI18n

```typescript
import { useI18n } from "@/lib/i18n-context";

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <h1>{t.home.title}</h1>
      <p>Langue actuelle : {locale}</p>
      <button onClick={() => setLocale("en")}>English</button>
    </div>
  );
}
```

**Propriétés retournées :**
- `t` : Objet contenant toutes les traductions
- `locale` : Langue actuelle (`'fr'` | `'en'`)
- `setLocale` : Fonction pour changer la langue

### Structure des traductions

Les traductions sont organisées par sections :

```typescript
{
  common: { ... },      // Textes communs
  home: { ... },        // Page d'accueil
  directory: { ... },   // Annuaire
  profile: { ... },     // Profils
  dashboard: { ... },   // Dashboard
  siwe: { ... },        // Authentification SIWE
}
```

### Exemples d'utilisation

#### Texte simple

```typescript
const { t } = useI18n();
return <h1>{t.home.title}</h1>;
```

#### Texte avec interpolation

```typescript
// Dans i18n.ts
description: "Bienvenue, {name}"

// Dans le composant
const { t } = useI18n();
return <p>{t.description.replace("{name}", userName)}</p>;
```

#### Condition basée sur la langue

```typescript
const { locale } = useI18n();
const message = locale === 'fr' ? 'Bonjour' : 'Hello';
```

## Ajouter une nouvelle langue

### 1. Ajouter le type

Dans `lib/i18n.ts` :

```typescript
export type Locale = 'fr' | 'en' | 'es'; // Ajouter 'es'
export const locales: Locale[] = ['fr', 'en', 'es'];
```

### 2. Ajouter les traductions

Dans `lib/i18n.ts` :

```typescript
export const translations = {
  fr: { ... },
  en: { ... },
  es: {  // Nouvelle langue
    common: {
      connect: 'Conectar',
      disconnect: 'Desconectar',
      // ...
    },
    home: {
      title: 'Portal THP',
      // ...
    },
    // ... toutes les sections
  },
};
```

### 3. Ajouter le nom de la langue

Dans `components/ui/language-selector.tsx` :

```typescript
const languageNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",  // Nouveau
};
```

### 4. Tester

```typescript
const { setLocale } = useI18n();
setLocale('es'); // Changer vers espagnol
```

## Ajouter une nouvelle traduction

### 1. Ajouter dans toutes les langues

Dans `lib/i18n.ts` :

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

### 2. Utiliser dans un composant

```typescript
const { t } = useI18n();
return <div>{t.mySection.myKey}</div>;
```

## Sélecteur de langue

### Composant LanguageSelector

**Fichier :** `components/ui/language-selector.tsx`

**Utilisation :**
```typescript
import { LanguageSelector } from "@/components/ui/language-selector";

<LanguageSelector />
```

**Fonctionnalités :**
- Dropdown avec icône Languages
- Affiche la langue actuelle
- Change la langue au clic
- Sauvegarde dans localStorage

## Persistance

### localStorage

La langue choisie est sauvegardée dans `localStorage` avec la clé `locale`.

**Chargement :**
- Au démarrage, la langue est chargée depuis `localStorage`
- Si absente, utilise la langue par défaut (`fr`)

**Mise à jour :**
- Lors du changement de langue, `localStorage` est mis à jour
- L'attribut `lang` du HTML est mis à jour automatiquement

## Attribut HTML lang

### Mise à jour automatique

Le composant `LangWrapper` met à jour l'attribut `lang` du `<html>` :

```typescript
useEffect(() => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
}, [locale]);
```

**Avantages :**
- Accessibilité améliorée
- SEO optimisé
- Détection automatique par les navigateurs

## Structure complète des traductions

### common

Textes communs utilisés partout :
- `connect`, `disconnect`
- `loading`, `search`
- `save`, `cancel`, `delete`
- `edit`, `create`, `view`
- `language`

### home

Page d'accueil :
- `title`, `subtitle`, `description`
- `viewDirectory`
- `readyToStart`, `createProfile`, `createMyProfile`
- `walletConnection`, `walletDescription`
- `siweAuth`, `siweDescription`
- `decentralizedProfile`, `profileDescription`

### directory

Annuaire :
- `title`, `subtitle`
- `loading`
- `noResults`, `noProfiles`

### profile

Profils :
- `about`, `techStack`, `availability`
- `available`, `busy`, `unavailable`
- `ethereumAddress`, `lastUpdate`
- `profileNotFound`, `noProfileFound`
- `invalidAddress`, `invalidAddressDescription`
- `backToDirectory`

### dashboard

Dashboard :
- `title`
- `connectionRequired`, `connectionRequiredDescription`
- `authRequired`, `authRequiredDescription`

### siwe

Authentification SIWE :
- `signIn`
- `signing`
- `signMessage`

## Bonnes pratiques

### 1. Toujours utiliser les traductions

```typescript
// ✅ Bon
const { t } = useI18n();
return <div>{t.home.title}</div>;

// ❌ Éviter
return <div>Portail THP</div>;
```

### 2. Organiser par section

```typescript
// ✅ Bon
t.home.title
t.profile.about

// ❌ Éviter
t.title
t.about
```

### 3. Noms de clés descriptifs

```typescript
// ✅ Bon
t.home.viewDirectory
t.profile.ethereumAddress

// ❌ Éviter
t.home.vd
t.profile.addr
```

### 4. Vérifier toutes les langues

Lors de l'ajout d'une traduction, s'assurer qu'elle existe dans **toutes** les langues.

## Dépannage

### Traduction manquante

Si une traduction n'existe pas, TypeScript affichera une erreur. Ajouter la traduction dans toutes les langues.

### Langue non persistée

Vérifier que `localStorage` est disponible (pas en SSR) :

```typescript
if (typeof window !== "undefined") {
  localStorage.setItem('locale', locale);
}
```

### Attribut lang non mis à jour

Vérifier que `LangWrapper` est bien dans les providers.

## Support

Pour toute question sur l'internationalisation :
1. Consulter cette documentation
2. Examiner `lib/i18n.ts` pour voir toutes les traductions
3. Vérifier les exemples dans les composants
4. Ouvrir une issue sur GitHub
