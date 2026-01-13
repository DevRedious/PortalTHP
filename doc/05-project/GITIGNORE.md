# Documentation .gitignore - Portail THP

Documentation complète du fichier `.gitignore` et des fichiers ignorés.

## Vue d'ensemble

Le fichier `.gitignore` définit les fichiers et dossiers qui ne doivent pas être versionnés dans Git.

## Fichier .gitignore

**Emplacement** : `.gitignore` à la racine du projet

## Sections du .gitignore

### 1. Dépendances

```
/node_modules
/.pnp
.pnp.js
```

**Pourquoi** : Les dépendances sont installées via `npm install`, pas besoin de les versionner.

### 2. Tests

```
/coverage
```

**Pourquoi** : Les rapports de couverture de tests sont générés automatiquement.

### 3. Next.js

```
/.next/
/out/
```

**Pourquoi** :
- `.next/` : Dossier de build Next.js (généré automatiquement)
- `out/` : Dossier de sortie pour l'export statique

### 4. Production

```
/build
```

**Pourquoi** : Dossier de build de production (généré automatiquement).

### 5. Fichiers système

```
.DS_Store
*.pem
```

**Pourquoi** :
- `.DS_Store` : Fichier système macOS
- `*.pem` : Fichiers de certificats (ne jamais commiter)

### 6. Logs de debug

```
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**Pourquoi** : Logs de débogage npm/yarn, générés automatiquement.

### 7. Variables d'environnement

```
.env*.local
.env
```

**Pourquoi** : ⚠️ **CRITIQUE** - Ne jamais commiter les fichiers d'environnement contenant :
- Clés API
- Tokens d'authentification
- Clés privées
- Secrets

**Utiliser** : `.env.example` comme modèle (sans valeurs sensibles).

### 8. Vercel

```
.vercel
```

**Pourquoi** : Dossier de configuration Vercel (généré automatiquement lors du déploiement).

### 9. TypeScript

```
*.tsbuildinfo
next-env.d.ts
```

**Pourquoi** :
- `*.tsbuildinfo` : Fichiers de cache TypeScript
- `next-env.d.ts` : Fichier généré automatiquement par Next.js

### 10. Foundry

```
/out/
/cache/
/broadcast/
```

**Pourquoi** :
- `out/` : Artifacts compilés des smart contracts
- `cache/` : Cache Foundry
- `broadcast/` : Logs de déploiement (peuvent contenir des infos sensibles)

### 11. IDE

```
.vscode/
.idea/
*.swp
*.swo
```

**Pourquoi** :
- `.vscode/`, `.idea/` : Configurations d'IDE (personnelles)
- `*.swp`, `*.swo` : Fichiers temporaires Vim

## Fichiers à ne JAMAIS commiter

### ⚠️ Critiques

1. **Fichiers d'environnement** :
   - `.env`
   - `.env.local`
   - `.env.production`
   - Tous les fichiers contenant des secrets

2. **Clés privées** :
   - `*.pem`
   - `*.key`
   - Fichiers contenant des clés privées

3. **Secrets** :
   - Tokens API
   - Mots de passe
   - Clés d'authentification

### ⚠️ Recommandés

1. **Fichiers générés** :
   - `node_modules/`
   - `.next/`
   - `out/`
   - `build/`

2. **Fichiers système** :
   - `.DS_Store`
   - `Thumbs.db`
   - Fichiers temporaires

## Vérifier les fichiers ignorés

### Voir les fichiers ignorés

```bash
git status --ignored
```

### Vérifier si un fichier est ignoré

```bash
git check-ignore -v chemin/vers/fichier
```

## Ajouter des exceptions

Si vous devez forcer l'ajout d'un fichier normalement ignoré :

```bash
git add -f chemin/vers/fichier
```

**⚠️ Attention** : Ne jamais faire cela pour des fichiers contenant des secrets !

## Fichier .env.example

Créer un fichier `.env.example` comme modèle :

```env
# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Pinata IPFS
NEXT_PUBLIC_PINATA_JWT=your_jwt_token_here

# Blockchain
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# RPC URL (optionnel)
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your_key
```

**Important** : `.env.example` peut être committé (sans valeurs réelles).

## Bonnes pratiques

### 1. Toujours vérifier avant de commiter

```bash
git status
```

Vérifier qu'aucun fichier sensible n'est listé.

### 2. Utiliser git-secrets (optionnel)

Installer `git-secrets` pour détecter automatiquement les secrets :

```bash
# Linux/Mac
brew install git-secrets

# Configuration
git secrets --install
git secrets --register-aws
```

### 3. Vérifier les fichiers avant push

```bash
# Voir ce qui sera poussé
git diff origin/main

# Vérifier les fichiers sensibles
git log --all --full-history -- "*.env*"
```

## Récupérer un fichier ignoré

Si vous avez accidentellement committé un fichier sensible :

### 1. Supprimer du dépôt (garder localement)

```bash
git rm --cached .env.local
git commit -m "Remove sensitive file"
```

### 2. Ajouter au .gitignore

```bash
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "Add .env.local to gitignore"
```

### 3. Si déjà poussé

**⚠️ URGENT** : Si le fichier a été poussé avec des secrets :

1. **Changer immédiatement** tous les secrets exposés
2. Consulter l'historique Git pour voir qui a accès
3. Consulter [GitHub Docs - Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

## Fichiers Foundry

### Structure recommandée

```
contracts/
├── .gitignore          # Ignorer out/, cache/, broadcast/
├── foundry.toml        # ✅ Commiter
├── remappings.txt      # ✅ Commiter
├── THPProfileRegistry.sol  # ✅ Commiter
└── script/
    └── Deploy.s.sol    # ✅ Commiter
```

### Fichiers à ignorer

- `out/` : Artifacts compilés
- `cache/` : Cache Foundry
- `broadcast/` : Logs de déploiement (peuvent contenir des clés privées)

## Support

Pour toute question sur `.gitignore` :
1. Consulter cette documentation
2. Vérifier le fichier `.gitignore` dans le projet
3. Consulter [Git Documentation - gitignore](https://git-scm.com/docs/gitignore)
