# Guide d'installation - Portail THP

Ce guide vous accompagne dans l'installation complète du Portail THP.

## Prérequis

### Logiciels requis

- **Node.js** : Version 18 ou supérieure
  - Télécharger depuis [nodejs.org](https://nodejs.org/)
  - Vérifier l'installation : `node --version`

- **npm** : Inclus avec Node.js
  - Vérifier l'installation : `npm --version`

- **Foundry** : Pour les smart contracts (optionnel si vous ne développez pas les contrats)
  ```bash
  curl -L https://foundry.paradigm.xyz | bash
  foundryup
  ```

- **Git** : Pour cloner le dépôt
  - Télécharger depuis [git-scm.com](https://git-scm.com/)

### Comptes requis (gratuits)

1. **WalletConnect** : Project ID gratuit
   - Créer un compte sur [cloud.walletconnect.com](https://cloud.walletconnect.com)
   - Créer un nouveau projet
   - Copier le Project ID

2. **Pinata** : JWT token pour IPFS
   - Créer un compte sur [pinata.cloud](https://www.pinata.cloud)
   - Aller dans "API Keys"
   - Créer une nouvelle clé API
   - Copier le JWT token

3. **Wallet Ethereum** : MetaMask ou autre
   - Installer MetaMask : [metamask.io](https://metamask.io)
   - Configurer un wallet de test (Sepolia, Holesky, etc.)

## Installation

### 1. Cloner le dépôt

```bash
git clone <repository-url>
cd PortalTHP
```

### 2. Installer les dépendances

```bash
npm install
```

Cela installera toutes les dépendances listées dans `package.json`.

### 3. Configuration de l'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Pinata IPFS
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token

# Blockchain
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia (ou autre testnet)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...  # Adresse du contrat déployé

# Optionnel : RPC URL personnalisée
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your_key
```

### 4. Vérifier la configuration

Vérifier que tous les fichiers de configuration sont présents :

```bash
# Vérifier les fichiers de config
ls -la .env.local
ls -la next.config.js
ls -la tailwind.config.ts
ls -la tsconfig.json
```

## Développement des Smart Contracts (Optionnel)

Si vous souhaitez développer ou tester les smart contracts :

### 1. Installer Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Vérifier l'installation

```bash
forge --version
```

### 3. Installer les dépendances Foundry

```bash
cd contracts
forge install
```

### 4. Tester les contrats

```bash
npm run contracts:test
```

## Démarrage

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build de production

```bash
npm run build
npm start
```

## Vérification de l'installation

### 1. Vérifier que le serveur démarre

```bash
npm run dev
# Devrait afficher : "Ready on http://localhost:3000"
```

### 2. Vérifier les dépendances

```bash
npm list --depth=0
# Vérifier que toutes les dépendances sont installées
```

### 3. Vérifier TypeScript

```bash
npm run build
# Vérifier qu'il n'y a pas d'erreurs TypeScript
```

### 4. Vérifier le linter

```bash
npm run lint
# Vérifier qu'il n'y a pas d'erreurs ESLint
```

## Dépannage

### Problème : Erreur de dépendances

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème : Erreur de port déjà utilisé

```bash
# Changer le port dans package.json ou tuer le processus
lsof -ti:3000 | xargs kill -9
```

### Problème : Variables d'environnement non chargées

- Vérifier que le fichier s'appelle bien `.env.local`
- Redémarrer le serveur de développement
- Vérifier que les variables commencent par `NEXT_PUBLIC_`

### Problème : Erreur Foundry

```bash
# Réinstaller Foundry
foundryup
cd contracts
forge install
```

## Prochaines étapes

Une fois l'installation terminée :

1. Consulter [CONFIGURATION.md](./CONFIGURATION.md) pour la configuration détaillée
2. Consulter [DEVELOPPEMENT.md](./DEVELOPPEMENT.md) pour commencer à développer
3. Consulter [API.md](./API.md) pour comprendre les smart contracts

## Support

En cas de problème :
1. Vérifier les logs d'erreur dans la console
2. Consulter la documentation appropriée
3. Vérifier les issues GitHub existantes
4. Ouvrir une nouvelle issue si nécessaire
