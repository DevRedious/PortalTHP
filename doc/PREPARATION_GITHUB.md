# Préparation pour GitHub - Portail THP

Guide rapide pour préparer et pousser le projet sur GitHub.

## ✅ Checklist avant le premier push

### 1. Vérifier les fichiers sensibles

```bash
# Vérifier qu'aucun fichier .env n'est présent
git status | grep ".env"

# Vérifier le .gitignore
cat .gitignore | grep ".env"
```

**Résultat attendu** : Aucun fichier `.env` ne doit apparaître dans `git status`.

### 2. Créer le fichier .env.example

Créer manuellement `.env.example` à la racine :

```env
# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Pinata IPFS
NEXT_PUBLIC_PINATA_JWT=your_jwt_token_here

# Blockchain
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# RPC URL (optionnel)
# NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your_key
```

**Important** : Ce fichier peut être committé (sans valeurs réelles).

### 3. Vérifier les fichiers à commiter

```bash
git status
```

**Doit inclure** :
- ✅ `README.md`
- ✅ `LICENSE`
- ✅ `.gitignore`
- ✅ `package.json`
- ✅ Tous les fichiers de code
- ✅ Dossier `doc/`

**Ne doit PAS inclure** :
- ❌ `.env.local`
- ❌ `.env`
- ❌ `node_modules/`
- ❌ `.next/`

## Commandes pour le premier push

### Option 1 : Dépôt vide (recommandé)

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter le remote
git remote add origin https://github.com/DevRedious/PortalTHP.git

# Vérifier les fichiers
git status

# Ajouter tous les fichiers
git add .

# Vérifier à nouveau
git status

# Créer le premier commit
git commit -m "Initial commit: Portail THP - Web3 Profile Portal"

# Pousser sur GitHub
git push -u origin main
```

### Option 2 : Dépôt avec README GitHub

Si vous avez créé un README sur GitHub :

```bash
# Récupérer le README GitHub
git pull origin main --allow-unrelated-histories

# Résoudre les conflits si nécessaire
# Puis pousser
git push -u origin main
```

## Vérifications post-push

### 1. Vérifier sur GitHub

- [ ] Le README s'affiche correctement
- [ ] Tous les fichiers sont présents
- [ ] Aucun fichier sensible n'est visible
- [ ] La structure du projet est correcte

### 2. Vérifier les fichiers sensibles

```bash
# Vérifier l'historique Git pour les fichiers .env
git log --all --full-history -- "*.env*"
```

**Résultat attendu** : Aucun commit ne doit contenir de fichiers `.env`.

## Configuration GitHub recommandée

### Description du dépôt

```
Application Web3 décentralisée pour créer et gérer des profils de développeurs. Utilise Next.js, Wagmi, IPFS et des smart contracts Solidity.
```

### Topics

Ajouter ces topics dans les paramètres du dépôt :
- `nextjs`
- `web3`
- `ethereum`
- `ipfs`
- `solidity`
- `wagmi`
- `siwe`
- `typescript`
- `tailwindcss`

### Website (si déployé)

Si l'application est déployée, ajouter l'URL dans les paramètres du dépôt.

## Prochaines étapes

Une fois le projet poussé sur GitHub :

1. **Protéger la branche main** : Settings → Branches → Add rule
2. **Configurer les Actions** : Voir [GITHUB.md](./GITHUB.md)
3. **Créer des Issues** : Pour tracker les bugs et fonctionnalités
4. **Ajouter des contributeurs** : Settings → Collaborators

## Support

Pour plus de détails, consultez [GITHUB.md](./GITHUB.md).
