# Guide de Setup Complet - Portail THP

Guide détaillé pour configurer le projet depuis zéro.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Vérification](#vérification)
5. [Dépannage](#dépannage)

## Prérequis

### Logiciels requis

#### Node.js et npm

- **Version requise** : Node.js 18+ et npm 9+
- **Vérification** :
  ```bash
  node --version  # Doit afficher v18.x.x ou supérieur
  npm --version   # Doit afficher 9.x.x ou supérieur
  ```
- **Installation** : [nodejs.org](https://nodejs.org/)

#### Git

- **Vérification** :
  ```bash
  git --version
  ```
- **Installation** : [git-scm.com](https://git-scm.com/)

#### Foundry (pour les smart contracts)

- **Installation Linux/Mac** :
  ```bash
  curl -L https://foundry.paradigm.xyz | bash
  foundryup
  ```
- **Installation Windows** :
  - Utiliser WSL (Windows Subsystem for Linux) recommandé
  - Ou télécharger depuis [GitHub Releases](https://github.com/foundry-rs/foundry/releases)

### Comptes requis (gratuits)

#### 1. WalletConnect

- **URL** : [cloud.walletconnect.com](https://cloud.walletconnect.com)
- **Étapes** :
  1. Créer un compte gratuit
  2. Créer un nouveau projet
  3. Copier le **Project ID**

#### 2. Pinata (IPFS)

- **URL** : [pinata.cloud](https://www.pinata.cloud)
- **Étapes** :
  1. Créer un compte gratuit
  2. Aller dans "API Keys"
  3. Créer une nouvelle clé API (JWT)
  4. Copier le **JWT Token**

#### 3. Wallet Ethereum

- **MetaMask** : [metamask.io](https://metamask.io)
- Configurer un wallet de test (Sepolia, Holesky, etc.)

## Installation

### 1. Cloner le dépôt

```bash
git clone <repository-url>
cd PortalTHP
```

### 2. Installer les dépendances Node.js

```bash
npm install
```

**Durée estimée** : 2-5 minutes selon la connexion

### 3. Installer les dépendances Foundry

```bash
cd contracts
forge install
cd ..
```

**Note** : Cela installe OpenZeppelin et autres dépendances Foundry.

## Configuration

### 1. Créer le fichier d'environnement

Créer `.env.local` à la racine du projet :

```bash
# Sur Linux/Mac
cp .env.example .env.local

# Sur Windows (PowerShell)
Copy-Item .env.example .env.local
```

### 2. Configurer les variables d'environnement

Éditer `.env.local` avec vos valeurs :

```env
# WalletConnect (obligatoire)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=votre_project_id_ici

# Pinata IPFS (obligatoire)
NEXT_PUBLIC_PINATA_JWT=votre_jwt_token_ici

# Blockchain (obligatoire)
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# RPC URL (optionnel, utilise des RPC publics par défaut)
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/votre_key
```

### 3. Déployer le Smart Contract (optionnel)

Si vous développez les smart contracts :

```bash
cd contracts

# Configurer les variables Foundry
export PRIVATE_KEY=votre_cle_privee_testnet
export RPC_URL=https://sepolia.infura.io/v3/votre_key
export ETHERSCAN_API_KEY=votre_etherscan_key  # Pour la vérification

# Déployer
forge script script/Deploy.s.sol \
  --rpc-url $RPC_URL \
  --broadcast \
  --verify

# Copier l'adresse du contrat déployé dans NEXT_PUBLIC_CONTRACT_ADDRESS
```

**⚠️ Important** : Utilisez uniquement des clés privées de testnet, jamais de clés de mainnet !

## Vérification

### 1. Vérifier l'installation

```bash
# Vérifier Node.js
node --version

# Vérifier npm
npm --version

# Vérifier Foundry (si installé)
forge --version
```

### 2. Vérifier les dépendances

```bash
npm list --depth=0
```

### 3. Vérifier la configuration

```bash
# Vérifier que .env.local existe
ls -la .env.local  # Linux/Mac
dir .env.local     # Windows

# Vérifier le contenu (sans afficher les valeurs)
grep -E "^NEXT_PUBLIC_" .env.local | cut -d'=' -f1
```

### 4. Tester le build

```bash
npm run build
```

Si le build réussit, la configuration est correcte.

### 5. Démarrer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Structure du fichier .env.local

### Variables requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Project ID WalletConnect | `abc123def456...` |
| `NEXT_PUBLIC_PINATA_JWT` | JWT token Pinata | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXT_PUBLIC_CHAIN_ID` | ID de la chaîne Ethereum | `11155111` (Sepolia) |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Adresse du contrat déployé | `0x1234...` |

### Variables optionnelles

| Variable | Description | Exemple |
|----------|-------------|---------|
| `NEXT_PUBLIC_RPC_URL` | URL RPC personnalisée | `https://sepolia.infura.io/v3/...` |

### IDs de chaînes courants

| Réseau | Chain ID |
|--------|----------|
| Sepolia (testnet) | `11155111` |
| Holesky (testnet) | `17000` |
| Polygon Amoy (testnet) | `80002` |
| Base Sepolia (testnet) | `84532` |

## Dépannage

### Problème : npm install échoue

**Solution** :
```bash
# Supprimer le cache npm
npm cache clean --force

# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème : Variables d'environnement non chargées

**Vérifications** :
1. Le fichier s'appelle bien `.env.local` (pas `.env`)
2. Les variables commencent par `NEXT_PUBLIC_`
3. Redémarrer le serveur de développement après modification

### Problème : Erreur Foundry

**Solution** :
```bash
# Réinstaller Foundry
foundryup

# Réinstaller les dépendances
cd contracts
forge install
```

### Problème : Port 3000 déjà utilisé

**Solution** :
```bash
# Linux/Mac : Tuer le processus
lsof -ti:3000 | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Problème : Erreur de connexion wallet

**Vérifications** :
1. MetaMask est installé et déverrouillé
2. Vous êtes sur le bon réseau (testnet)
3. Le WalletConnect Project ID est correct dans `.env.local`
4. Le Chain ID correspond au réseau sélectionné

### Problème : Erreur IPFS

**Vérifications** :
1. Le JWT token Pinata est valide
2. Le compte Pinata n'a pas atteint ses limites
3. La connexion internet fonctionne

## Prochaines étapes

Une fois le setup terminé :

1. Consulter [INSTALLATION.md](./INSTALLATION.md) pour plus de détails
2. Consulter [CONFIGURATION.md](./CONFIGURATION.md) pour la configuration avancée
3. Consulter [DEVELOPPEMENT.md](./DEVELOPPEMENT.md) pour commencer à développer

## Support

En cas de problème persistant :
1. Vérifier les logs d'erreur dans la console
2. Consulter la documentation appropriée dans `doc/`
3. Vérifier les issues GitHub existantes
4. Ouvrir une nouvelle issue si nécessaire
