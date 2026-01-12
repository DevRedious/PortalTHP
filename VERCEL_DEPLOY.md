# Guide de déploiement Vercel - Portail THP

Vercel est **parfaitement adapté** pour héberger votre application web3 Next.js. Voici pourquoi et comment déployer.

## ✅ Pourquoi Vercel est idéal pour votre app web3

1. **Support natif Next.js** : Vercel est le créateur de Next.js, donc support optimal
2. **HTTPS automatique** : Essentiel pour WalletConnect et les connexions sécurisées
3. **Variables d'environnement** : Support complet des variables `NEXT_PUBLIC_*`
4. **Déploiement automatique** : Déploiement à chaque push sur GitHub
5. **CDN global** : Performance optimale partout dans le monde
6. **Gratuit** : Plan gratuit généreux pour les projets open-source
7. **Serverless** : Pas de gestion de serveur nécessaire

## 🚀 Déploiement en 5 étapes

### Étape 1 : Préparer le projet

Vérifiez que tout fonctionne localement :

```bash
# Build de test
npm run build

# Vérifier les erreurs
npm run lint
```

### Étape 2 : Créer un compte Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec votre compte GitHub
3. Autoriser l'accès au dépôt `DevRedious/PortalTHP`

### Étape 3 : Importer le projet

1. Cliquer sur **"Add New Project"**
2. Sélectionner le dépôt `PortalTHP`
3. Vercel détecte automatiquement Next.js

### Étape 4 : Configurer les variables d'environnement

Dans les **Settings** → **Environment Variables**, ajouter :

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=votre_project_id
NEXT_PUBLIC_PINATA_JWT=votre_jwt_token
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important** :
- ✅ Cochez **Production**, **Preview**, et **Development**
- 🔒 Les valeurs sont chiffrées automatiquement
- 🔄 Redéployez après chaque modification

### Étape 5 : Déployer

1. Cliquer sur **"Deploy"**
2. Attendre la fin du build (2-3 minutes)
3. Votre app est en ligne ! 🎉

## 📋 Configuration Vercel recommandée

### Build Settings

Vercel détecte automatiquement :
- **Framework Preset** : Next.js
- **Build Command** : `npm run build` (automatique)
- **Output Directory** : `.next` (automatique)
- **Install Command** : `npm install` (automatique)

### Domaine personnalisé (optionnel)

1. **Settings** → **Domains**
2. Ajouter votre domaine
3. Suivre les instructions DNS

## 🔧 Configuration spécifique web3

### Headers CORS (si nécessaire)

Vercel gère automatiquement les CORS pour les requêtes blockchain.

### Variables d'environnement par environnement

Vous pouvez définir des variables différentes pour :
- **Production** : Votre app publique
- **Preview** : Déploiements de branches
- **Development** : Tests locaux

### Exemple de configuration multi-environnement

```env
# Production (mainnet)
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# Preview (testnet)
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

## ✅ Vérifications post-déploiement

Après le déploiement, vérifier :

1. **Page d'accueil** : Charge correctement
2. **Connexion wallet** : MetaMask se connecte
3. **WalletConnect** : QR code s'affiche
4. **SIWE** : Signature fonctionne
5. **IPFS** : Upload de profil fonctionne
6. **Blockchain** : Lecture des données on-chain fonctionne

## 🐛 Dépannage

### Erreur "Module not found"

Si vous voyez des erreurs comme :
```
Module not found: Can't resolve '@react-native-async-storage/async-storage'
```

C'est normal ! Ce sont des dépendances optionnelles pour React Native qui ne sont pas utilisées en web. Le build fonctionne quand même.

### Erreur de build

1. Vérifier les logs dans Vercel Dashboard
2. Vérifier que toutes les variables d'environnement sont définies
3. Tester le build localement : `npm run build`

### WalletConnect ne fonctionne pas

1. Vérifier que `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` est correct
2. Vérifier que le domaine est autorisé dans WalletConnect Cloud
3. Vérifier que HTTPS est activé (automatique sur Vercel)

## 📊 Monitoring

Vercel fournit automatiquement :
- **Analytics** : Visiteurs, pages vues
- **Logs** : Erreurs et warnings
- **Performance** : Temps de chargement, Core Web Vitals

## 🔄 Déploiement continu

Une fois configuré :
- ✅ Chaque push sur `main` → Déploiement production
- ✅ Chaque PR → Déploiement preview
- ✅ URLs preview uniques pour tester

## 💰 Coûts

**Plan gratuit Vercel** :
- ✅ 100 GB bandwidth/mois
- ✅ Déploiements illimités
- ✅ Domaine `.vercel.app` gratuit
- ✅ SSL automatique

**Suffisant pour** :
- Applications avec trafic modéré
- Projets open-source
- Applications de démonstration

## 🎯 Prochaines étapes

1. Déployer sur Vercel
2. Tester toutes les fonctionnalités
3. Configurer un domaine personnalisé (optionnel)
4. Activer Analytics (optionnel)
5. Configurer les webhooks pour notifications (optionnel)

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js sur Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables d'environnement Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
