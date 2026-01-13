# Guide de Déploiement - Portail THP

## Prérequis

1. **Wallet avec ETH de test** (pour payer les frais de gas sur testnet)
2. **Compte WalletConnect** (gratuit sur [cloud.walletconnect.com](https://cloud.walletconnect.com))
3. **Compte web3.storage** (gratuit sur [web3.storage](https://web3.storage))
4. **Foundry installé** (pour déployer les smart contracts)

## Étapes de déploiement

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de l'environnement

Copiez `.env.example` vers `.env.local` et remplissez les valeurs :

```bash
cp .env.example .env.local
```

**Variables requises :**
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` : Obtenu depuis WalletConnect Cloud
- `NEXT_PUBLIC_WEB3_STORAGE_TOKEN` : Token API depuis web3.storage
- `NEXT_PUBLIC_CHAIN_ID` : 11155111 pour Sepolia, 17000 pour Holesky
- `PRIVATE_KEY` : Clé privée du wallet pour déployer le contrat (NE JAMAIS COMMITER)
- `RPC_URL` : URL RPC du testnet (Infura, Alchemy, etc.)

### 3. Déploiement du Smart Contract

```bash
# Installer Foundry si pas déjà fait
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Installer les dépendances Foundry
forge install OpenZeppelin/openzeppelin-contracts

# Tester le contrat
forge test

# Déployer sur Sepolia
forge script script/Deploy.s.sol \
  --rpc-url $RPC_URL \
  --broadcast \
  --verify \
  --etherscan-api-key $ETHERSCAN_API_KEY

# Notez l'adresse du contrat déployé et ajoutez-la à NEXT_PUBLIC_CONTRACT_ADDRESS
```

### 4. Déploiement du Frontend

#### Option A : Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Ajouter les variables d'environnement dans le dashboard Vercel
```

#### Option B : Build local

```bash
npm run build
npm start
```

### 5. Vérification

1. Connectez votre wallet MetaMask au testnet approprié
2. Visitez l'application déployée
3. Connectez votre wallet
4. Authentifiez-vous avec SIWE
5. Créez votre profil

## Notes importantes

- ⚠️ **Ne jamais commiter** le fichier `.env.local` ou les clés privées
- Le contrat doit être déployé avant le frontend
- Assurez-vous que le `CHAIN_ID` correspond au réseau de déploiement
- Les utilisateurs doivent avoir des ETH de test pour créer/mettre à jour leur profil
