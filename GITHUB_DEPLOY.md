# Guide pour envoyer le code sur GitHub

## Prérequis

1. **Installer Git** (si pas déjà installé) :
   - Télécharger depuis : https://git-scm.com/download/win
   - Ou installer via winget : `winget install Git.Git`

## Étapes pour envoyer sur GitHub

### 1. Initialiser le dépôt Git (si pas déjà fait)

```bash
git init
```

### 2. Ajouter tous les fichiers

```bash
git add .
```

### 3. Faire le premier commit

```bash
git commit -m "Initial commit: Portail THP - Web3 Profile Portal"
```

### 4. Ajouter le remote GitHub

```bash
git remote add origin https://github.com/DevRedious/PortalTHP.git
```

### 5. Renommer la branche principale (si nécessaire)

```bash
git branch -M main
```

### 6. Envoyer le code sur GitHub

```bash
git push -u origin main
```

## Si le dépôt GitHub n'est pas vide

Si le dépôt GitHub contient déjà des fichiers (README, .gitignore, etc.), vous devrez d'abord les récupérer :

```bash
git pull origin main --allow-unrelated-histories
```

Puis résoudre les conflits si nécessaire, et ensuite :

```bash
git push -u origin main
```

## Authentification GitHub

Si vous êtes invité à vous authentifier :
- Utilisez un **Personal Access Token** (PAT) au lieu de votre mot de passe
- Créer un PAT : https://github.com/settings/tokens
- Sélectionnez les permissions : `repo` (accès complet aux dépôts)

## Commandes complètes (copier-coller)

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit: Portail THP - Web3 Profile Portal"

# Ajouter le remote
git remote add origin https://github.com/DevRedious/PortalTHP.git

# Renommer la branche
git branch -M main

# Envoyer sur GitHub
git push -u origin main
```

## Vérification

Après le push, vérifiez que tout est bien en ligne :
https://github.com/DevRedious/PortalTHP
