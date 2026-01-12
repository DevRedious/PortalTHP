# Guide de déploiement - Portail THP

Guide complet pour déployer le Portail THP en production.

## Prérequis

- Compte sur une plateforme de déploiement (Vercel, Netlify, etc.)
- Variables d'environnement configurées
- Smart contract déployé sur la blockchain cible
- Comptes Pinata et WalletConnect configurés

## Déploiement sur Vercel (Recommandé)

### 1. Préparer le projet

```bash
# Vérifier que le build fonctionne
npm run build

# Vérifier les erreurs
npm run lint
```

### 2. Créer un projet Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Connecter votre dépôt GitHub
3. Créer un nouveau projet

### 3. Configurer les variables d'environnement

Dans les paramètres du projet Vercel, ajouter :

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_PINATA_JWT=your_jwt_token
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### 4. Déployer

Vercel déploie automatiquement à chaque push sur la branche principale.

### 5. Vérifier le déploiement

- Vérifier que l'application charge correctement
- Tester la connexion wallet
- Tester la création de profil

## Déploiement sur Netlify

### 1. Configuration

Créer `netlify.toml` :

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 2. Variables d'environnement

Dans Netlify Dashboard → Site settings → Environment variables, ajouter les mêmes variables que Vercel.

### 3. Déployer

Connecter le dépôt GitHub et déployer.

## Déploiement du Smart Contract

### 1. Préparer Foundry

```bash
cd contracts
forge install
```

### 2. Configurer les variables

Créer `.env` dans `contracts/` :

```env
RPC_URL=https://sepolia.infura.io/v3/your_key
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_key
```

### 3. Déployer

```bash
forge script script/Deploy.s.sol \
  --rpc-url $RPC_URL \
  --broadcast \
  --verify
```

### 4. Récupérer l'adresse

L'adresse du contrat déployé sera affichée dans la console. La copier dans les variables d'environnement.

## Variables d'environnement de production

### Requises

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_PINATA_JWT=your_jwt_token
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### Optionnelles

```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your_key
```

## Vérifications post-déploiement

### 1. Application

- [ ] Page d'accueil charge correctement
- [ ] Sélecteur de langue fonctionne
- [ ] Connexion wallet fonctionne
- [ ] Authentification SIWE fonctionne
- [ ] Annuaire affiche les profils
- [ ] Création de profil fonctionne

### 2. Performance

- [ ] Temps de chargement < 3s
- [ ] Images optimisées
- [ ] Code minifié

### 3. Sécurité

- [ ] Variables d'environnement non exposées
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés

## Optimisations

### 1. Images

Utiliser le composant `Image` de Next.js pour l'optimisation automatique.

### 2. Code splitting

Next.js fait automatiquement le code splitting avec l'App Router.

### 3. Cache

Configurer le cache pour les données IPFS :

```typescript
// Dans next.config.js
async headers() {
  return [
    {
      source: '/api/ipfs/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600',
        },
      ],
    },
  ];
}
```

## Monitoring

### 1. Vercel Analytics

Activer Vercel Analytics pour suivre les performances.

### 2. Logs

Vérifier les logs dans le dashboard Vercel/Netlify pour les erreurs.

### 3. Erreurs

Configurer un service de monitoring d'erreurs (Sentry, etc.).

## Rollback

### En cas de problème

1. **Vercel** : Aller dans Deployments → Cliquer sur les 3 points → Promote to Production
2. **Netlify** : Aller dans Deploys → Cliquer sur "Publish deploy" sur un ancien déploiement

## Domaines personnalisés

### Vercel

1. Aller dans Project Settings → Domains
2. Ajouter votre domaine
3. Suivre les instructions DNS

### Netlify

1. Aller dans Domain settings
2. Ajouter votre domaine
3. Configurer les DNS

## SSL/HTTPS

Vercel et Netlify fournissent automatiquement des certificats SSL gratuits.

## Support

Pour toute question sur le déploiement :
1. Consulter cette documentation
2. Vérifier la documentation Vercel/Netlify
3. Consulter les logs de déploiement
4. Ouvrir une issue sur GitHub
