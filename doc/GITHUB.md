# Guide GitHub - Portail THP

Guide complet pour gérer le dépôt GitHub du Portail THP.

## Dépôt GitHub

**URL** : [https://github.com/DevRedious/PortalTHP.git](https://github.com/DevRedious/PortalTHP.git)

## Initialisation du dépôt

### 1. Vérifier l'état Git

```bash
# Vérifier si Git est initialisé
git status

# Si non initialisé, initialiser
git init
```

### 2. Configurer Git (si première fois)

```bash
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"
```

### 3. Ajouter le remote

```bash
git remote add origin https://github.com/DevRedious/PortalTHP.git

# Vérifier
git remote -v
```

### 4. Première configuration

```bash
# Vérifier que .gitignore est présent
ls -la .gitignore

# Vérifier qu'aucun fichier sensible n'est listé
git status
```

## Premier commit et push

### 1. Ajouter tous les fichiers

```bash
# Vérifier ce qui sera ajouté
git status

# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Vérifier à nouveau
git status
```

### 2. Créer le premier commit

```bash
git commit -m "Initial commit: Portail THP - Web3 Profile Portal"
```

### 3. Pousser sur GitHub

```bash
# Pousser sur la branche main
git push -u origin main

# Si la branche s'appelle master
git branch -M main
git push -u origin main
```

## Structure recommandée du dépôt

```
PortalTHP/
├── .gitignore           # ✅ Commiter
├── LICENSE              # ✅ Commiter
├── README.md            # ✅ Commiter
├── package.json         # ✅ Commiter
├── tsconfig.json        # ✅ Commiter
├── next.config.js       # ✅ Commiter
├── tailwind.config.ts   # ✅ Commiter
├── app/                 # ✅ Commiter
├── components/          # ✅ Commiter
├── lib/                # ✅ Commiter
├── contracts/          # ✅ Commiter
└── doc/                # ✅ Commiter
```

## Fichiers à NE JAMAIS commiter

Vérifier avant chaque commit :

```bash
git status
```

**Ne jamais commiter** :
- `.env.local`
- `.env`
- `node_modules/`
- `.next/`
- Clés privées
- Secrets

## Workflow Git recommandé

### Branches

```bash
# Créer une branche pour une nouvelle fonctionnalité
git checkout -b feature/nom-fonctionnalite

# Travailler sur la branche
# ... faire des modifications ...

# Commiter
git add .
git commit -m "feat: description de la fonctionnalité"

# Pousser la branche
git push origin feature/nom-fonctionnalite

# Créer une Pull Request sur GitHub
```

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

Exemples :
```bash
git commit -m "feat: add language selector"
git commit -m "fix: resolve wallet connection issue"
git commit -m "docs: update installation guide"
```

## Configuration GitHub

### Description du dépôt

```
Application Web3 décentralisée pour créer et gérer des profils de développeurs.
Utilise Next.js, Wagmi, IPFS et des smart contracts Solidity.
```

### Topics recommandés

- `nextjs`
- `web3`
- `ethereum`
- `ipfs`
- `solidity`
- `wagmi`
- `siwe`
- `decentralized`
- `typescript`
- `tailwindcss`

### README GitHub

Le README principal (`README.md`) sera automatiquement affiché sur la page d'accueil du dépôt GitHub.

## Protection de la branche main

### Recommandations

1. **Protéger la branche main** :
   - Aller dans Settings → Branches
   - Ajouter une règle pour `main`
   - Exiger des Pull Requests avant merge

2. **Exiger des reviews** :
   - Au moins 1 review approuvée
   - Pas de push direct sur main

3. **Status checks** :
   - Require status checks to pass
   - `npm run build`
   - `npm run lint`

## Actions GitHub (CI/CD)

### Créer `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Build
      run: npm run build
      env:
        NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: ${{ secrets.WALLETCONNECT_PROJECT_ID }}
        NEXT_PUBLIC_PINATA_JWT: ${{ secrets.PINATA_JWT }}
        NEXT_PUBLIC_CHAIN_ID: 11155111
        NEXT_PUBLIC_CONTRACT_ADDRESS: ${{ secrets.CONTRACT_ADDRESS }}
```

## Secrets GitHub

Pour les Actions GitHub, ajouter des secrets dans Settings → Secrets :

- `WALLETCONNECT_PROJECT_ID`
- `PINATA_JWT`
- `CONTRACT_ADDRESS`

**⚠️ Important** : Ne jamais mettre de secrets dans le code !

## Releases

### Créer une release

1. Aller dans Releases → Draft a new release
2. Tag : `v0.1.0`
3. Titre : `v0.1.0 - Initial Release`
4. Description : Notes de version

### Tags Git

```bash
# Créer un tag
git tag -a v0.1.0 -m "Version 0.1.0"

# Pousser le tag
git push origin v0.1.0
```

## Issues et Pull Requests

### Template d'Issue

Créer `.github/ISSUE_TEMPLATE/bug_report.md` :

```markdown
## Description du bug

[Description claire du bug]

## Étapes pour reproduire

1. ...
2. ...

## Comportement attendu

[Ce qui devrait se passer]

## Environnement

- OS: [ex: Windows 10]
- Navigateur: [ex: Chrome]
- Version: [ex: 0.1.0]
```

### Template de Pull Request

Créer `.github/pull_request_template.md` :

```markdown
## Description

[Description des changements]

## Type de changement

- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Documentation
- [ ] Refactorisation

## Checklist

- [ ] Code testé
- [ ] Documentation mise à jour
- [ ] Pas d'erreurs de linter
- [ ] Build réussi
```

## Documentation GitHub Pages (optionnel)

Pour héberger la documentation sur GitHub Pages :

1. Aller dans Settings → Pages
2. Source : `main` branch, `/doc` folder
3. URL : `https://devredious.github.io/PortalTHP/`

## Support

Pour toute question sur GitHub :
1. Consulter cette documentation
2. Consulter [GitHub Docs](https://docs.github.com)
3. Ouvrir une issue sur le dépôt
