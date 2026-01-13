# Corrections des erreurs de build Vercel

## Problèmes identifiés

### 1. Modules non trouvés lors du build

**Erreurs :**
```
Module not found: Can't resolve '@react-native-async-storage/async-storage'
Module not found: Can't resolve 'pino-pretty'
```

**Cause :**
- `@react-native-async-storage/async-storage` : Dépendance optionnelle de MetaMask SDK pour React Native, non nécessaire en web
- `pino-pretty` : Dépendance optionnelle de développement de pino (logger), non nécessaire en production

**Solution :**
Configuration de webpack dans `next.config.js` pour ignorer ces modules optionnels :

```javascript
webpack: (config, { isServer }) => {
  config.resolve.fallback = { 
    fs: false, 
    net: false, 
    tls: false,
  };

  // Ignorer les modules optionnels React Native qui ne sont pas nécessaires en web
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    '@react-native-async-storage/async-storage': false,
    'pino-pretty': false,
  };

  return config;
},
```

### 2. Erreur TypeScript - Type undefined

**Erreur :**
```
Type error: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
```

**Fichier :** `app/u/[address]/page.tsx` ligne 193

**Cause :**
`profile.discord` peut être `undefined` même si vérifié dans la condition `{profile.discord && ...}`

**Solution :**
Ajout d'une vérification explicite avant l'utilisation :

```typescript
onClick={async () => {
  if (!profile.discord) return;
  try {
    await navigator.clipboard.writeText(profile.discord);
    // ...
  }
}}
```

## Warnings npm (non bloquants)

Ces warnings sont normaux et n'empêchent pas le build :

- `rimraf@3.0.2` : Déprécié mais utilisé par des dépendances transitives
- `inflight@1.0.6` : Déprécié mais utilisé par des dépendances transitives
- `@humanwhocodes/config-array@0.13.0` : Déprécié, remplacé par `@eslint/config-array`
- `@humanwhocodes/object-schema@2.0.3` : Déprécié, remplacé par `@eslint/object-schema`
- `@paulmillr/qr@0.2.1` : Déprécié, remplacé par `qr`
- `glob@7.2.3` : Déprécié mais utilisé par des dépendances transitives
- `node-domexception@1.0.0` : Déprécié mais utilisé par des dépendances transitives
- `@walletconnect/*` : Versions dépréciées mais fonctionnelles
- `eslint@8.57.1` : Déprécié mais requis par `eslint-config-next@14.2.35`

**Note :** Ces warnings proviennent de dépendances transitives et seront résolus lorsque les packages parents seront mis à jour.

## Fichiers modifiés

1. **`next.config.js`**
   - Ajout de la configuration webpack pour ignorer les modules optionnels
   - Configuration des alias pour `@react-native-async-storage/async-storage` et `pino-pretty`

2. **`app/u/[address]/page.tsx`**
   - Ajout d'une vérification explicite pour `profile.discord` avant utilisation

## Vérification

Pour vérifier que le build fonctionne :

```bash
npm run build
```

Le build devrait maintenant se terminer sans erreurs de modules manquants.

## Déploiement Vercel

Ces corrections permettent au build Vercel de se terminer avec succès. Les warnings npm restants sont non bloquants et n'empêchent pas le déploiement.
