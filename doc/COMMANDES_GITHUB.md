# Commandes pour envoyer sur GitHub - Portail THP

Guide pas à pas avec toutes les commandes à exécuter pour pousser le projet sur GitHub.

## ⚠️ Prérequis

1. **Git installé** : [git-scm.com](https://git-scm.com/download/win)
2. **Compte GitHub** : [github.com](https://github.com)
3. **Dépôt créé** : [https://github.com/DevRedious/PortalTHP](https://github.com/DevRedious/PortalTHP)

## 📋 Checklist avant de commencer

- [ ] Git est installé (`git --version` fonctionne)
- [ ] Vous êtes connecté à GitHub
- [ ] Le dépôt GitHub existe et est vide
- [ ] Aucun fichier `.env.local` ne sera committé
- [ ] Le fichier `.env.example` existe (optionnel mais recommandé)

## 🚀 Commandes à exécuter

### Étape 1 : Vérifier Git

```powershell
# Vérifier que Git est installé
git --version

# Si erreur, installer Git depuis https://git-scm.com/download/win
```

### Étape 2 : Configurer Git (si première fois)

```powershell
# Configurer votre nom et email
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"

# Vérifier la configuration
git config --list
```

### Étape 3 : Initialiser le dépôt Git

```powershell
# Aller dans le dossier du projet
cd c:\CODE\PortalTHP

# Initialiser Git (si pas déjà fait)
git init

# Vérifier l'état
git status
```

### Étape 4 : Vérifier les fichiers sensibles

```powershell
# Vérifier qu'aucun fichier .env n'est présent
git status | Select-String ".env"

# Si des fichiers .env apparaissent, ils NE DOIVENT PAS être committés
# Vérifier que .gitignore les ignore bien
```

### Étape 5 : Créer .env.example (si pas déjà fait)

Créer manuellement le fichier `.env.example` à la racine avec ce contenu :

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

### Étape 6 : Ajouter le remote GitHub

```powershell
# Ajouter le dépôt GitHub comme remote
git remote add origin https://github.com/DevRedious/PortalTHP.git

# Vérifier
git remote -v
```

**Si le remote existe déjà** :
```powershell
# Vérifier le remote actuel
git remote -v

# Si besoin de changer l'URL
git remote set-url origin https://github.com/DevRedious/PortalTHP.git
```

### Étape 7 : Ajouter tous les fichiers

```powershell
# Vérifier ce qui sera ajouté
git status

# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Vérifier à nouveau (doit montrer tous les fichiers en vert)
git status
```

**⚠️ Vérification importante** : 
- ✅ Doit inclure : `README.md`, `LICENSE`, `.gitignore`, `package.json`, `doc/`, etc.
- ❌ Ne doit PAS inclure : `.env.local`, `.env`, `node_modules/`, `.next/`

### Étape 8 : Créer le premier commit

```powershell
# Créer le commit initial
git commit -m "Initial commit: Portail THP - Web3 Profile Portal

- Application Web3 décentralisée
- Authentification SIWE
- Profils stockés sur IPFS
- Smart contracts Solidity
- Documentation complète"
```

### Étape 9 : Pousser sur GitHub

```powershell
# Vérifier la branche actuelle
git branch

# Si sur master, renommer en main
git branch -M main

# Pousser sur GitHub
git push -u origin main
```

**Si erreur d'authentification** :
- Utiliser un Personal Access Token GitHub
- Ou configurer SSH : [GitHub Docs - SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## 🔐 Authentification GitHub

### Option 1 : Personal Access Token (recommandé)

1. Aller sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Générer un nouveau token avec les permissions `repo`
3. Utiliser le token comme mot de passe lors du `git push`

### Option 2 : SSH

```powershell
# Générer une clé SSH (si pas déjà fait)
ssh-keygen -t ed25519 -C "votre.email@example.com"

# Copier la clé publique
cat ~/.ssh/id_ed25519.pub

# Ajouter la clé sur GitHub : Settings → SSH and GPG keys
# Changer l'URL du remote en SSH
git remote set-url origin git@github.com:DevRedious/PortalTHP.git
```

## ✅ Vérifications après le push

### 1. Vérifier sur GitHub

Aller sur [https://github.com/DevRedious/PortalTHP](https://github.com/DevRedious/PortalTHP) et vérifier :

- [ ] Le README s'affiche correctement
- [ ] Tous les fichiers sont présents
- [ ] La structure du projet est correcte
- [ ] Aucun fichier sensible n'est visible

### 2. Vérifier les fichiers sensibles

```powershell
# Vérifier l'historique Git pour les fichiers .env
git log --all --full-history -- "*.env*"
```

**Résultat attendu** : Aucun commit ne doit contenir de fichiers `.env`.

## 🐛 Dépannage

### Erreur : "git is not recognized"

**Solution** : Installer Git depuis [git-scm.com/download/win](https://git-scm.com/download/win)

### Erreur : "remote origin already exists"

```powershell
# Vérifier le remote actuel
git remote -v

# Supprimer et recréer si nécessaire
git remote remove origin
git remote add origin https://github.com/DevRedious/PortalTHP.git
```

### Erreur : "failed to push some refs"

```powershell
# Si le dépôt GitHub a un README, récupérer d'abord
git pull origin main --allow-unrelated-histories

# Résoudre les conflits si nécessaire
# Puis pousser
git push -u origin main
```

### Erreur : "authentication failed"

**Solution** : Utiliser un Personal Access Token ou configurer SSH (voir section Authentification ci-dessus).

## 📝 Commandes complètes (copier-coller)

```powershell
# 1. Aller dans le projet
cd c:\CODE\PortalTHP

# 2. Initialiser Git
git init

# 3. Configurer Git (remplacer par vos infos)
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"

# 4. Ajouter le remote
git remote add origin https://github.com/DevRedious/PortalTHP.git

# 5. Vérifier les fichiers
git status

# 6. Ajouter tous les fichiers
git add .

# 7. Vérifier à nouveau
git status

# 8. Créer le commit
git commit -m "Initial commit: Portail THP - Web3 Profile Portal"

# 9. Renommer la branche en main (si nécessaire)
git branch -M main

# 10. Pousser sur GitHub
git push -u origin main
```

## 🎯 Prochaines étapes

Une fois le projet poussé sur GitHub :

1. **Configurer le dépôt** : Voir [GITHUB.md](./GITHUB.md)
2. **Protéger la branche main** : Settings → Branches
3. **Ajouter une description** : Settings → General
4. **Ajouter des topics** : Voir [PREPARATION_GITHUB.md](./PREPARATION_GITHUB.md)

## Support

Pour toute question :
1. Consulter [GITHUB.md](./GITHUB.md) pour plus de détails
2. Consulter [GitHub Docs](https://docs.github.com)
3. Vérifier les logs d'erreur Git
