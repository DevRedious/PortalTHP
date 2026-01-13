# SEO, Performance et Analytics - Portail THP

Documentation des améliorations SEO, performance et analytics implémentées.

## 📊 SEO

### Métadonnées dynamiques

Les métadonnées sont générées dynamiquement pour chaque page :

- **Page d'accueil** : Métadonnées de base avec Open Graph et Twitter Cards
- **Page de profil** (`/u/[address]`) : Métadonnées dynamiques basées sur le profil IPFS
- **Page directory** : Métadonnées avec le nombre de profils

### Sitemap dynamique

Le sitemap (`/sitemap.xml`) inclut automatiquement :
- Les pages statiques (accueil, directory, dashboard)
- Toutes les pages de profils publics récupérées depuis le smart contract

### Schema.org JSON-LD

Structured data ajouté pour :
- **Profils** : Type `Person` avec toutes les informations du profil
- **Directory** : Type `CollectionPage` avec le nombre d'items

### Open Graph

Images Open Graph dynamiques basées sur les avatars IPFS des profils.

## ⚡ Performance

### Cache React Query

Configuration optimisée du cache :
- `staleTime` : 5 minutes pour les données IPFS
- `gcTime` : 10 minutes de cache
- `refetchOnWindowFocus` : désactivé pour éviter les requêtes inutiles

### Lazy Loading

- Les images Next.js sont automatiquement lazy-loaded
- Configuration optimisée dans `next.config.js` avec formats AVIF/WebP
- Cache TTL de 7 jours pour les images

### Code Splitting

- Optimisation automatique des imports de packages (`lucide-react`, `@radix-ui`)
- Code splitting par route (géré automatiquement par Next.js)

### Service Worker

Service Worker pour le cache offline :
- Cache des ressources statiques
- Cache des profils IPFS récemment consultés
- Page de fallback offline

**Fichiers** :
- `public/sw.js` : Service Worker
- `lib/service-worker.ts` : Utilitaires d'enregistrement
- `components/service-worker/service-worker-script.tsx` : Composant d'enregistrement

## 📈 Analytics

### Configuration

Deux options d'analytics supportées :

1. **Plausible Analytics** (recommandé pour la vie privée)
   - Variable d'environnement : `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
   - Exemple : `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=portal-thp.vercel.app`

2. **Google Analytics 4**
   - Variable d'environnement : `NEXT_PUBLIC_GA_ID`
   - Exemple : `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

### Événements trackés

- `profile_created` : Création d'un profil
- `profile_view` : Visualisation d'un profil
- `search` : Recherche dans l'annuaire
- `wallet_connect` : Connexion d'un wallet
- `siwe_auth` : Authentification SIWE

### Utilisation

Les événements sont automatiquement trackés dans :
- `components/profile/profile-form.tsx` : Création de profil
- `app/u/[address]/page.tsx` : Visualisation de profil
- `app/directory/page.tsx` : Recherche
- `components/wallet/connect-button.tsx` : Connexion wallet
- `components/wallet/siwe-button.tsx` : Authentification SIWE

## 🔧 Configuration

### Variables d'environnement

Ajoutez dans votre `.env.local` :

```bash
# Analytics (optionnel)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=portal-thp.vercel.app
# OU
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Base URL pour SEO
NEXT_PUBLIC_BASE_URL=https://portal-thp.vercel.app
```

### Vérification

1. **Sitemap** : Vérifiez `/sitemap.xml` après déploiement
2. **Métadonnées** : Utilisez les outils de débogage Facebook/Twitter
3. **Schema.org** : Validez avec [Google Rich Results Test](https://search.google.com/test/rich-results)
4. **Analytics** : Vérifiez les événements dans votre dashboard analytics

## 📝 Notes

- Le Service Worker nécessite HTTPS en production
- Les métadonnées dynamiques nécessitent un accès au smart contract
- Le sitemap est généré au build time, pensez à le régénérer régulièrement
