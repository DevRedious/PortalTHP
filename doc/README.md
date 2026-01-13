# 📚 Documentation Portail THP

Documentation complète et organisée du Portail THP - Application Web3 décentralisée pour créer et gérer des profils de développeurs.

---

## 🎯 Vue d'ensemble

Le **Portail THP** est une application Web3 décentralisée permettant aux développeurs de créer et gérer des profils décentralisés stockés sur IPFS et liés à leur adresse Ethereum.

### Fonctionnalités principales

- 🔐 **Authentification décentralisée** : Sign-In With Ethereum (SIWE)
- 👤 **Profils décentralisés** : Stockage sur IPFS, liés à une adresse blockchain
- 🔍 **Annuaire public** : Recherche et découverte de profils
- 🌐 **Multi-langue** : Support français et anglais
- 🎨 **Interface moderne** : Design sombre et minimaliste avec effets visuels

### Stack technique

- **Frontend** : Next.js 14, React, TypeScript, Tailwind CSS
- **Web3** : Wagmi, Viem, WalletConnect
- **Authentification** : SIWE (EIP-4361)
- **Stockage** : IPFS via Pinata
- **Smart Contracts** : Solidity, Foundry

---

## 📖 Table des matières

### 🚀 Démarrage rapide (`01-getting-started/`)

| Document | Description |
|----------|-------------|
| [**Setup Complet**](./01-getting-started/SETUP_COMPLET.md) | Guide de configuration depuis zéro |
| [**Configuration**](./01-getting-started/CONFIGURATION.md) | Configuration complète de l'application |

### 🏗️ Architecture et développement (`02-development/`)

| Document | Description |
|----------|-------------|
| [**Architecture**](./02-development/ARCHITECTURE.md) | Architecture système et flux de données |
| [**Composants**](./02-development/COMPOSANTS.md) | Documentation des composants UI |
| [**Brave Browser Fix**](./02-development/BRAVE_BROWSER_FIX.md) | Correction duplication boutons Brave |
| [**Améliorations**](./02-development/AMELIORATIONS.md) | Liste des améliorations |

### 🔧 Référence technique (`03-reference/`)

| Document | Description |
|----------|-------------|
| [**Internationalisation**](./03-reference/INTERNATIONALISATION.md) | Système de traduction i18n |

### 🚢 Déploiement et maintenance (`04-deployment/`)

| Document | Description |
|----------|-------------|
| [**Sécurité**](./04-deployment/SECURITE.md) | Sécurité et bonnes pratiques |

### 📋 Documentation projet (`05-project/`)

| Document | Description |
|----------|-------------|
| [**Licence**](./05-project/LICENCE.md) | Documentation de la licence MIT |
| [**Gitignore**](./05-project/GITIGNORE.md) | Documentation du fichier .gitignore |
| [**GitHub**](./05-project/GITHUB.md) | Guide pour gérer le dépôt GitHub |
| [**Commandes GitHub**](./05-project/COMMANDES_GITHUB.md) | Commandes Git pour pousser sur GitHub |
| [**Préparation GitHub**](./05-project/PREPARATION_GITHUB.md) | Checklist avant de pousser sur GitHub |
| [**Guide README**](./05-project/README_GUIDE.md) | Guide pour maintenir le README |

---

## 🗺️ Parcours recommandé

### Pour les nouveaux développeurs

1. ⚙️ Suivre [Setup Complet](./01-getting-started/SETUP_COMPLET.md)
2. 🏗️ Comprendre [Architecture](./02-development/ARCHITECTURE.md)
3. 🧩 Étudier [Composants](./02-development/COMPOSANTS.md)

### Pour les contributeurs

1. 🧩 Étudier [Composants](./02-development/COMPOSANTS.md)
2. 🏗️ Comprendre [Architecture](./02-development/ARCHITECTURE.md)
3. 🌐 Voir [Internationalisation](./03-reference/INTERNATIONALISATION.md)

### Pour le déploiement

1. 🔒 Lire [Sécurité](./04-deployment/SECURITE.md)
2. ⚙️ Vérifier [Configuration](./01-getting-started/CONFIGURATION.md)

---

## 🔍 Recherche rapide

- 📑 **[Index alphabétique complet](./INDEX.md)** - Tous les documents classés par ordre alphabétique et par catégorie

### Par sujet

- **Installation/Setup** : [SETUP_COMPLET.md](./01-getting-started/SETUP_COMPLET.md)
- **Configuration** : [CONFIGURATION.md](./01-getting-started/CONFIGURATION.md)
- **Architecture** : [ARCHITECTURE.md](./02-development/ARCHITECTURE.md)
- **Développement** : [COMPOSANTS.md](./02-development/COMPOSANTS.md), [AMELIORATIONS.md](./02-development/AMELIORATIONS.md)
- **i18n** : [INTERNATIONALISATION.md](./03-reference/INTERNATIONALISATION.md)
- **Sécurité** : [SECURITE.md](./04-deployment/SECURITE.md)
- **Git/GitHub** : [GITHUB.md](./05-project/GITHUB.md), [COMMANDES_GITHUB.md](./05-project/COMMANDES_GITHUB.md)

### Par type de document

- **Guides** : Installation, Setup, Développement, Déploiement
- **Référence** : Architecture, API, Composants, Configuration
- **Projet** : Licence, Gitignore, GitHub, README

---

## 📝 Structure des fichiers

```
doc/
├── README.md                    # Ce fichier - Index principal
├── INDEX.md                     # Index alphabétique complet
│
├── 01-getting-started/          # 🚀 Guides de démarrage
│   ├── SETUP_COMPLET.md         # Setup depuis zéro
│   └── CONFIGURATION.md         # Configuration complète
│
├── 02-development/              # 🏗️ Architecture & Développement
│   ├── ARCHITECTURE.md          # Architecture système
│   ├── COMPOSANTS.md            # Documentation composants
│   ├── BRAVE_BROWSER_FIX.md     # Correction duplication boutons Brave
│   ├── BUTTONS_ANALYSIS.md      # Analyse des boutons
│   ├── I18N_AUDIT.md            # Audit i18n
│   ├── LIT_VERSION_FIX.md       # Correction version Lit
│   ├── VERCEL_BUILD_FIXES.md    # Corrections build Vercel
│   └── AMELIORATIONS.md         # Liste des améliorations
│
├── 03-reference/                # 🔧 Référence technique
│   └── INTERNATIONALISATION.md  # Système i18n
│
├── 04-deployment/               # 🚢 Déploiement
│   └── SECURITE.md              # Sécurité
│
├── 05-project/                  # 📋 Gestion du projet
│   ├── LICENCE.md               # Licence MIT
│   ├── GITIGNORE.md             # Documentation .gitignore
│   ├── GITHUB.md                # Guide GitHub
│   ├── COMMANDES_GITHUB.md      # Commandes Git
│   ├── PREPARATION_GITHUB.md    # Checklist GitHub
│   └── README_GUIDE.md          # Guide README
│
└── archive/                     # 📦 Archives
    └── (anciennes versions)
```

---

## 🆘 Support

Pour toute question ou problème :

1. 📖 Consulter la documentation appropriée ci-dessus
2. 🔍 Utiliser la recherche rapide pour trouver le sujet
3. 🐛 Ouvrir une issue sur [GitHub](https://github.com/DevRedious/PortalTHP)

---

## 📄 Licence

MIT - Voir [LICENCE.md](./05-project/LICENCE.md) pour plus d'informations.

---

## 🔗 Liens utiles

- **Dépôt GitHub** : [github.com/DevRedious/PortalTHP](https://github.com/DevRedious/PortalTHP)
- **README principal** : [../README.md](../README.md)
- **Next.js Docs** : [nextjs.org/docs](https://nextjs.org/docs)
- **Wagmi Docs** : [wagmi.sh](https://wagmi.sh)

---

*Dernière mise à jour : Documentation organisée et structurée*
