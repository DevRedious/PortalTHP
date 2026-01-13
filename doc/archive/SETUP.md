# Guide de Configuration Initiale

## 🚀 Installation Rapide

### 1. Installer les dépendances Node.js

```bash
npm install
```

### 2. Installer Foundry (pour les smart contracts)

```bash
# Sur Linux/Mac
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Sur Windows (PowerShell)
# Télécharger depuis https://github.com/foundry-rs/foundry/releases
# Ou utiliser WSL
```

### 3. Installer les dépendances Foundry

```bash
cd contracts
forge install OpenZeppelin/openzeppelin-contracts
```

### 4. Configurer les variables d'environnement

1. Copiez `.env.example` vers `.env.local`
2. Obtenez un **WalletConnect Project ID** gratuit :
   - Allez sur [cloud.walletconnect.com](https://cloud.walletconnect.com)
   - Créez un compte gratuit
   - Créez un nouveau projet
   - Copiez le Project ID

3. Obtenez un **Pinata JWT Token** gratuit :
   - Allez sur [pinata.cloud](https://www.pinata.cloud)
   - Créez un compte gratuit
   - Allez dans "API Keys" dans le dashboard
   - Créez une nouvelle clé API (JWT)
   - Copiez le JWT token

4. Configurez `.env.local` :

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=votre_project_id
NEXT_PUBLIC_PINATA_JWT=votre_jwt_token
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000  # À remplir après déploiement
```

### 5. Déployer le Smart Contract (optionnel pour développement local)

```bash
# Configurer les variables pour Foundry
export PRIVATE_KEY=votre_cle_privee
export RPC_URL=https://sepolia.infura.io/v3/votre_key

# Déployer
cd contracts
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify

# Notez l'adresse du contrat et ajoutez-la à NEXT_PUBLIC_CONTRACT_ADDRESS
```

### 6. Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📝 Tests

### Tests unitaires (Vitest)

```bash
npm test
```

### Tests E2E (Playwright)

```bash
npm run test:e2e
```

### Tests des smart contracts (Foundry)

```bash
npm run contracts:test
```

## 🔧 Commandes Utiles

- `npm run dev` : Démarrer le serveur de développement
- `npm run build` : Builder l'application pour la production
- `npm run lint` : Vérifier le code avec ESLint
- `npm run contracts:build` : Builder les smart contracts
- `npm run contracts:test` : Tester les smart contracts

## ⚠️ Notes Importantes

1. **Clés privées** : Ne jamais commiter vos clés privées ou le fichier `.env.local`
2. **Testnet** : Utilisez uniquement des testnets pour le développement
3. **Gas fees** : Les utilisateurs ont besoin d'ETH de test pour créer des profils
4. **IPFS** : Les données sont stockées de manière permanente sur IPFS

## 🐛 Dépannage

### Erreur "Cannot find module"

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur Foundry

```bash
# Réinstaller Foundry
foundryup
```

### Erreur de connexion wallet

- Vérifiez que MetaMask est installé
- Vérifiez que vous êtes sur le bon réseau (testnet)
- Vérifiez le WalletConnect Project ID dans `.env.local`

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation wagmi](https://wagmi.sh)
- [Documentation Foundry](https://book.getfoundry.sh)
- [Documentation web3.storage](https://web3.storage/docs)
