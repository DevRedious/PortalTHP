# Portail THP - Web3 Profile Portal

Application web3 décentralisée pour créer et gérer des profils de développeurs, utilisant exclusivement des technologies gratuites et open-source.

## 🚀 Stack Technique

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Web3**: wagmi, viem, WalletConnect
- **Authentification**: SIWE (Sign-In With Ethereum - EIP-4361)
- **Smart Contracts**: Solidity, OpenZeppelin, Foundry
- **Stockage**: IPFS via Pinata (gratuit)
- **Blockchain**: Ethereum Testnet (Sepolia/Holesky) ou L2 (Polygon Amoy, Base Sepolia)

## 📚 Documentation

La documentation complète est disponible dans le dossier [`doc/`](./doc/README.md) :

- [Vue d'ensemble](./doc/README.md)
- [Architecture](./doc/ARCHITECTURE.md)
- [Installation](./doc/INSTALLATION.md)
- [Configuration](./doc/CONFIGURATION.md)
- [Développement](./doc/DEVELOPPEMENT.md)
- [Composants](./doc/COMPOSANTS.md)
- [API et Contrats](./doc/API.md)
- [Internationalisation](./doc/INTERNATIONALISATION.md)
- [Déploiement](./doc/DEPLOIEMENT.md)
- [Sécurité](./doc/SECURITE.md)

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Démarrer le serveur de développement
npm run dev
```

Pour plus de détails, consultez le [guide d'installation](./doc/INSTALLATION.md).

## 🔗 Liens

- **Dépôt GitHub** : [github.com/DevRedious/PortalTHP](https://github.com/DevRedious/PortalTHP)
- **Documentation** : Voir [`doc/`](./doc/README.md)

## 📝 Licence

MIT - Voir [LICENSE](./LICENSE) pour plus d'informations.
