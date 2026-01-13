# Résolution du problème "Multiple versions of Lit loaded"

## Problème

L'avertissement suivant apparaît dans la console du navigateur :
```
Multiple versions of Lit loaded. Loading multiple versions is not recommended.
See https://lit.dev/msg/multiple-versions for more information.
```

## Cause

Le problème vient de la chaîne de dépendances suivante :
- `@wagmi/connectors` → `@walletconnect/ethereum-provider` → `@reown/appkit` → `lit`

Plusieurs packages dans cette chaîne peuvent charger Lit séparément, causant le chargement de plusieurs versions.

## Solution appliquée

### 1. Overrides dans package.json

Ajout de `overrides` et `resolutions` pour forcer une seule version de Lit :

```json
{
  "overrides": {
    "lit": "3.3.0"
  },
  "resolutions": {
    "lit": "3.3.0"
  }
}
```

**Note :**
- `overrides` : Fonctionne avec npm (v7+)
- `resolutions` : Fonctionne avec yarn

### 2. Réinstallation des dépendances

Après avoir ajouté les overrides, réinstallez les dépendances :

```bash
rm -rf node_modules package-lock.json
npm install
```

## Vérification

Pour vérifier qu'une seule version de Lit est installée :

```bash
npm list lit
```

Vous devriez voir une seule version (3.3.0) avec des mentions "deduped".

## Si le problème persiste

Si l'avertissement apparaît toujours dans le navigateur, cela peut être dû à :

1. **Chargement dynamique** : WalletConnect peut charger Lit dynamiquement via des scripts externes
2. **Cache du navigateur** : Videz le cache et rechargez la page
3. **Build en production** : Testez avec `npm run build && npm start` pour voir si le problème persiste

### Solutions alternatives

Si le problème persiste en production :

1. **Ignorer l'avertissement** : C'est généralement un avertissement non bloquant qui n'affecte pas le fonctionnement de l'application

2. **Mise à jour des dépendances** : Vérifiez si des versions plus récentes de `@wagmi/connectors` ou `wagmi` résolvent le problème

3. **Configuration Next.js** : Ajoutez une configuration pour exclure Lit du bundle si nécessaire (non recommandé car peut casser WalletConnect)

## Références

- [Lit.dev - Multiple versions warning](https://lit.dev/msg/multiple-versions)
- [npm overrides documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides)
- [yarn resolutions documentation](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/)
