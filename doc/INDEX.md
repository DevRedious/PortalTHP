# 📑 Index rapide - Documentation Portail THP

Index alphabétique de tous les documents de la documentation organisés par catégories.

## Structure de la documentation

```
doc/
├── 01-getting-started/     # Guides de démarrage
├── 02-development/         # Guides de développement
├── 03-reference/           # Documentation de référence
├── 04-deployment/          # Guides de déploiement
├── 05-project/             # Gestion du projet
├── archive/                # Archives (anciennes versions)
├── INDEX.md                # Ce fichier
├── README.md               # Index principal
└── STRUCTURE.md            # Explication de l'organisation
```

📖 Pour comprendre l'organisation, consultez [STRUCTURE.md](./STRUCTURE.md)

## Par ordre alphabétique

| Document | Description | Catégorie | Chemin |
|----------|-------------|-----------|--------|
| [**AMELIORATIONS.md**](./02-development/AMELIORATIONS.md) | Liste des améliorations | Développement | `02-development/` |
| [**ARCHITECTURE.md**](./02-development/ARCHITECTURE.md) | Architecture système et flux de données | Architecture | `02-development/` |
| [**BRAVE_BROWSER_FIX.md**](./02-development/BRAVE_BROWSER_FIX.md) | Correction duplication boutons dans Brave | Développement | `02-development/` |
| [**BUTTONS_ANALYSIS.md**](./02-development/BUTTONS_ANALYSIS.md) | Analyse des boutons | Développement | `02-development/` |
| [**COMMANDES_GITHUB.md**](./05-project/COMMANDES_GITHUB.md) | Commandes Git pour pousser sur GitHub | Projet | `05-project/` |
| [**COMPOSANTS.md**](./02-development/COMPOSANTS.md) | Documentation des composants UI | Développement | `02-development/` |
| [**CONFIGURATION.md**](./01-getting-started/CONFIGURATION.md) | Configuration complète de l'application | Configuration | `01-getting-started/` |
| [**GITHUB.md**](./05-project/GITHUB.md) | Guide pour gérer le dépôt GitHub | Projet | `05-project/` |
| [**GITIGNORE.md**](./05-project/GITIGNORE.md) | Documentation du fichier .gitignore | Projet | `05-project/` |
| [**I18N_AUDIT.md**](./02-development/I18N_AUDIT.md) | Audit du système i18n | Développement | `02-development/` |
| [**INTERNATIONALISATION.md**](./03-reference/INTERNATIONALISATION.md) | Système de traduction i18n | Référence | `03-reference/` |
| [**LICENCE.md**](./05-project/LICENCE.md) | Documentation de la licence MIT | Projet | `05-project/` |
| [**LIT_VERSION_FIX.md**](./02-development/LIT_VERSION_FIX.md) | Correction version Lit | Développement | `02-development/` |
| [**PREPARATION_GITHUB.md**](./05-project/PREPARATION_GITHUB.md) | Checklist avant de pousser sur GitHub | Projet | `05-project/` |
| [**README.md**](./README.md) | Index principal de la documentation | Index | Racine |
| [**README_GUIDE.md**](./05-project/README_GUIDE.md) | Guide pour maintenir le README | Projet | `05-project/` |
| [**SECURITE.md**](./04-deployment/SECURITE.md) | Sécurité et bonnes pratiques | Déploiement | `04-deployment/` |
| [**SETUP_COMPLET.md**](./01-getting-started/SETUP_COMPLET.md) | Guide de configuration depuis zéro | Démarrage | `01-getting-started/` |
| [**VERCEL_BUILD_FIXES.md**](./02-development/VERCEL_BUILD_FIXES.md) | Corrections build Vercel | Développement | `02-development/` |
| [**STRUCTURE.md**](./STRUCTURE.md) | Explication de l'organisation de la documentation | Index | Racine |

## Par catégorie

### 🚀 01 - Démarrage (`01-getting-started/`)
Guides pour commencer avec le projet.

- [SETUP_COMPLET.md](./01-getting-started/SETUP_COMPLET.md) - Setup depuis zéro
- [CONFIGURATION.md](./01-getting-started/CONFIGURATION.md) - Configuration

### 🏗️ 02 - Architecture & Développement (`02-development/`)
Documentation technique et guides de développement.

- [ARCHITECTURE.md](./02-development/ARCHITECTURE.md) - Architecture système
- [COMPOSANTS.md](./02-development/COMPOSANTS.md) - Documentation composants
- [BRAVE_BROWSER_FIX.md](./02-development/BRAVE_BROWSER_FIX.md) - Correction duplication boutons Brave
- [BUTTONS_ANALYSIS.md](./02-development/BUTTONS_ANALYSIS.md) - Analyse des boutons
- [I18N_AUDIT.md](./02-development/I18N_AUDIT.md) - Audit i18n
- [LIT_VERSION_FIX.md](./02-development/LIT_VERSION_FIX.md) - Correction version Lit
- [VERCEL_BUILD_FIXES.md](./02-development/VERCEL_BUILD_FIXES.md) - Corrections build Vercel
- [AMELIORATIONS.md](./02-development/AMELIORATIONS.md) - Liste des améliorations

### 🔧 03 - Référence (`03-reference/`)
Documentation de référence pour les APIs et systèmes.

- [INTERNATIONALISATION.md](./03-reference/INTERNATIONALISATION.md) - Système i18n

### 🚢 04 - Déploiement (`04-deployment/`)
Guides pour déployer l'application.

- [SECURITE.md](./04-deployment/SECURITE.md) - Sécurité

### 📋 05 - Projet (`05-project/`)
Gestion du projet, Git, GitHub et licence.

- [LICENCE.md](./05-project/LICENCE.md) - Licence MIT
- [GITIGNORE.md](./05-project/GITIGNORE.md) - Documentation .gitignore
- [GITHUB.md](./05-project/GITHUB.md) - Guide GitHub
- [COMMANDES_GITHUB.md](./05-project/COMMANDES_GITHUB.md) - Commandes Git
- [PREPARATION_GITHUB.md](./05-project/PREPARATION_GITHUB.md) - Checklist GitHub
- [README_GUIDE.md](./05-project/README_GUIDE.md) - Guide README

### 📦 Archive (`archive/`)
Anciennes versions et documents archivés.

- Voir le dossier [archive/](./archive/) pour les documents archivés

## Par cas d'usage

### Je veux installer le projet
1. [SETUP_COMPLET.md](./01-getting-started/SETUP_COMPLET.md)
2. [CONFIGURATION.md](./01-getting-started/CONFIGURATION.md)

### Je veux comprendre l'architecture
1. [ARCHITECTURE.md](./02-development/ARCHITECTURE.md)
2. [COMPOSANTS.md](./02-development/COMPOSANTS.md)

### Je veux contribuer au code
1. [COMPOSANTS.md](./02-development/COMPOSANTS.md)
2. [ARCHITECTURE.md](./02-development/ARCHITECTURE.md)
3. [INTERNATIONALISATION.md](./03-reference/INTERNATIONALISATION.md)

### Je veux déployer
1. [SECURITE.md](./04-deployment/SECURITE.md)
2. [CONFIGURATION.md](./01-getting-started/CONFIGURATION.md)

### Je veux gérer GitHub
1. [GITHUB.md](./05-project/GITHUB.md)
2. [COMMANDES_GITHUB.md](./05-project/COMMANDES_GITHUB.md)
3. [PREPARATION_GITHUB.md](./05-project/PREPARATION_GITHUB.md)

---

📖 Pour une vue d'ensemble complète, consultez [README.md](./README.md)
