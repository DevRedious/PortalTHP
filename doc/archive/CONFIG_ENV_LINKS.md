# 🔗 Liens pour configurer les variables d'environnement

## 📋 Variables requises

Le projet nécessite 4 variables d'environnement principales :

| Variable | Description | Lien de configuration |
|----------|-------------|----------------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Project ID WalletConnect | [Cloud WalletConnect](https://cloud.walletconnect.com/) |
| `NEXT_PUBLIC_PINATA_JWT` | JWT Token Pinata (IPFS) | [Pinata Dashboard](https://app.pinata.cloud/) |
| `NEXT_PUBLIC_CHAIN_ID` | ID de la chaîne Ethereum | Voir valeurs ci-dessous |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Adresse du contrat déployé | Après déploiement du contrat |

---

## 🔐 1. WalletConnect Project ID

### Lien direct
**https://cloud.walletconnect.com/**

### Étapes
1. Créer un compte (gratuit)
2. Créer un nouveau projet
3. Copier le **Project ID** (ex: `abc123def456...`)
4. Ajouter dans `.env.local` :
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=abc123def456...
   ```

### Documentation
- [WalletConnect Cloud Docs](https://docs.walletconnect.com/cloud)
- [Getting Started Guide](https://docs.walletconnect.com/cloud/getting-started)

### ⚠️ Important
- Le Project ID est **public** (commence par `NEXT_PUBLIC_`)
- Ajouter votre domaine dans les **Allowed Domains** après déploiement

---

## 📦 2. Pinata JWT Token (IPFS)

### Lien direct
**https://app.pinata.cloud/**

### Étapes
1. Créer un compte (gratuit jusqu'à 1 GB)
2. Aller dans **API Keys**
3. Créer une nouvelle clé API
4. Copier le **JWT Token** (commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
5. Ajouter dans `.env.local` :
   ```env
   NEXT_PUBLIC_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Documentation
- [Pinata API Docs](https://docs.pinata.cloud/)
- [Getting Started](https://docs.pinata.cloud/getting-started)
- [JWT Authentication](https://docs.pinata.cloud/api-keys/api-key-authentication)

### 💰 Plan gratuit
- **1 GB** de stockage IPFS gratuit
- **1000 uploads/mois** gratuits
- Suffisant pour un projet de démonstration

---

## ⛓️ 3. Chain ID (ID de chaîne)

### Valeurs courantes

| Réseau | Chain ID | Lien |
|--------|----------|------|
| **Sepolia (testnet)** | `11155111` | [Sepolia Explorer](https://sepolia.etherscan.io/) |
| **Holesky (testnet)** | `17000` | [Holesky Explorer](https://holesky.etherscan.io/) |
| **Base Sepolia (testnet)** | `84532` | [Base Sepolia Explorer](https://sepolia.basescan.org/) |
| **Ethereum Mainnet** | `1` | [Etherscan](https://etherscan.io/) |
| **Polygon Amoy (testnet)** | `80002` | [Polygon Amoy Explorer](https://amoy.polygonscan.com/) |

### Configuration
```env
# Pour Sepolia (recommandé pour débuter)
NEXT_PUBLIC_CHAIN_ID=11155111
```

### Documentation
- [Chainlist.org](https://chainlist.org/) - Liste complète des Chain IDs
- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) - Standard Chain ID

---

## 📄 4. Contract Address (Adresse du contrat)

### Obtention
L'adresse du contrat est obtenue **après le déploiement** du smart contract.

### Étapes de déploiement
1. Déployer le contrat avec Foundry :
   ```bash
   cd contracts
   forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
   ```
2. Copier l'adresse du contrat déployé
3. Ajouter dans `.env.local` :
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
   ```

### Documentation
- [Foundry Book](https://book.getfoundry.sh/)
- [Deploying Contracts](https://book.getfoundry.sh/tutorials/solidity-scripting)

---

## 🔧 Configuration locale

### Créer le fichier `.env.local`

À la racine du projet, créer un fichier `.env.local` :

```env
# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=votre_project_id_ici

# Pinata (IPFS)
NEXT_PUBLIC_PINATA_JWT=votre_jwt_token_ici

# Blockchain
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

### ⚠️ Important
- Le fichier `.env.local` est dans `.gitignore` (ne sera pas commité)
- Ne jamais commiter les tokens secrets
- Les variables `NEXT_PUBLIC_*` sont **publiques** (exposées côté client)

---

## 🌐 Configuration Vercel (déploiement)

### Lien direct
**https://vercel.com/dashboard**

### Étapes
1. Aller dans votre projet Vercel
2. **Settings** → **Environment Variables**
3. Ajouter chaque variable :
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_PINATA_JWT`
   - `NEXT_PUBLIC_CHAIN_ID`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
4. Cocher **Production**, **Preview**, et **Development**
5. Redéployer le projet

### Documentation
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Deploying Next.js](https://vercel.com/docs/frameworks/nextjs)

---

## 🔍 Vérification

### Tester les variables

```bash
# Vérifier que les variables sont chargées
npm run dev
```

Dans la console du navigateur, vérifier :
- WalletConnect se connecte
- Pinata upload fonctionne
- La bonne chaîne est sélectionnée

### Commandes utiles

```bash
# Lister les variables d'environnement
grep -E "^NEXT_PUBLIC_" .env.local

# Vérifier le build avec les variables
npm run build
```

---

## 📚 Ressources supplémentaires

### WalletConnect
- [WalletConnect Docs](https://docs.walletconnect.com/)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)
- [Supported Wallets](https://walletconnect.com/explorer)

### Pinata
- [Pinata Docs](https://docs.pinata.cloud/)
- [IPFS Gateway](https://docs.pinata.cloud/gateways)
- [Pricing](https://www.pinata.cloud/pricing)

### Blockchain
- [Ethereum Testnets](https://ethereum.org/en/developers/docs/networks/)
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Holesky Faucet](https://holesky-faucet.pk910.de/)

### Vercel
- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🆘 Support

### Problèmes courants

1. **WalletConnect ne fonctionne pas**
   - Vérifier que le Project ID est correct
   - Vérifier que le domaine est autorisé dans WalletConnect Cloud

2. **Pinata upload échoue**
   - Vérifier que le JWT token est valide
   - Vérifier les limites du plan gratuit (1 GB)

3. **Contrat non trouvé**
   - Vérifier que l'adresse du contrat est correcte
   - Vérifier que le Chain ID correspond au réseau de déploiement

4. **Variables non chargées**
   - Redémarrer le serveur de développement (`npm run dev`)
   - Vérifier que le fichier `.env.local` est à la racine
   - Vérifier l'orthographe des noms de variables

---

## ✅ Checklist de configuration

- [ ] Compte WalletConnect créé
- [ ] Project ID WalletConnect obtenu
- [ ] Compte Pinata créé
- [ ] JWT Token Pinata obtenu
- [ ] Chain ID configuré (11155111 pour Sepolia)
- [ ] Contrat déployé
- [ ] Adresse du contrat ajoutée
- [ ] Fichier `.env.local` créé
- [ ] Variables testées localement
- [ ] Variables configurées sur Vercel (si déploiement)

---

**Dernière mise à jour** : 2025-01-12
