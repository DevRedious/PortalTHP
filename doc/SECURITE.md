# Sécurité - Portail THP

Documentation sur la sécurité et les bonnes pratiques.

## Vue d'ensemble

Le Portail THP est une application décentralisée qui minimise les risques de sécurité en évitant un backend centralisé. Cependant, certaines précautions sont nécessaires.

## Sécurité côté client

### Variables d'environnement

**⚠️ Important :** Les variables `NEXT_PUBLIC_*` sont exposées côté client.

**Ne jamais exposer :**
- Clés privées
- Secrets API sensibles
- Tokens d'authentification serveur

**Sécurisé d'exposer :**
- Project ID WalletConnect (public)
- JWT Pinata (limité par les permissions Pinata)
- Adresses de contrats (publiques)

### Validation des données

**Toujours valider avec Zod :**

```typescript
import { profileSchema } from "@/lib/schemas";

const result = profileSchema.safeParse(userInput);
if (!result.success) {
  // Rejeter les données invalides
  return;
}
```

### Injection XSS

**Protection automatique :**
- React échappe automatiquement le contenu
- Ne jamais utiliser `dangerouslySetInnerHTML` sans sanitization

**Bonnes pratiques :**
```typescript
// ✅ Sécurisé
<div>{userContent}</div>

// ❌ Éviter
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### Stockage local

**localStorage :**
- Utilisé pour les sessions SIWE
- Ne jamais stocker de données sensibles
- Les données peuvent être modifiées par l'utilisateur

**Limitations :**
- Pas de chiffrement côté client
- Accessible via JavaScript
- Peut être vidé par l'utilisateur

## Sécurité Web3

### Authentification SIWE

**Vérification :**
- La signature prouve la propriété de l'adresse
- Le message inclut le domaine pour éviter le phishing
- Vérification côté client (basique)

**Améliorations futures :**
- Vérification serveur des signatures
- Expiration des sessions
- Refresh tokens

### Transactions blockchain

**Vérifications :**
- Toujours vérifier l'adresse du contrat
- Vérifier les paramètres avant signature
- Confirmer les transactions avant affichage

**Exemple :**
```typescript
const { writeContract } = useWriteContract();

// Vérifier les données avant
if (!profileURI || profileURI.length === 0) {
  return; // Rejeter
}

writeContract({
  address: getContractAddress(), // Vérifier l'adresse
  abi: THP_PROFILE_REGISTRY_ABI,
  functionName: "setProfile",
  args: [profileURI, isPublic],
});
```

### Phishing

**Protection :**
- Message SIWE inclut le domaine
- Vérifier toujours l'URL dans le wallet
- Ne jamais signer de transactions suspectes

## Sécurité IPFS

### Contenu uploadé

**Validation :**
- Valider le type de fichier (images uniquement pour avatars)
- Limiter la taille des fichiers
- Valider le format JSON des profils

**Exemple :**
```typescript
// Valider le type de fichier
if (!file.type.startsWith('image/')) {
  throw new Error('Type de fichier invalide');
}

// Valider la taille (max 5MB)
if (file.size > 5 * 1024 * 1024) {
  throw new Error('Fichier trop volumineux');
}
```

### CID IPFS

**Vérification :**
- Vérifier que le CID correspond au contenu
- Ne jamais faire confiance à un CID sans vérification

## Sécurité des Smart Contracts

### Contrôles d'accès

**Dans le contrat :**
```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not authorized");
    _;
}
```

**Vérifications :**
- Seul le propriétaire peut modifier son profil
- Validation des données on-chain
- Protection contre les reentrancy

### Audit

**Recommandé :**
- Faire auditer les smart contracts avant déploiement
- Utiliser des outils d'analyse statique
- Tests complets avant production

## Bonnes pratiques

### 1. Ne jamais faire confiance aux données utilisateur

```typescript
// ✅ Toujours valider
const result = schema.safeParse(userInput);
if (!result.success) {
  return;
}

// ❌ Ne jamais faire confiance
const data = userInput; // Dangereux
```

### 2. Gérer les erreurs

```typescript
try {
  await riskyOperation();
} catch (error) {
  console.error("Erreur:", error);
  // Ne jamais exposer les détails d'erreur à l'utilisateur
  showGenericError();
}
```

### 3. Limiter les permissions

- Pinata : Utiliser des clés API avec permissions limitées
- WalletConnect : Project ID public (sécurisé)

### 4. Mettre à jour les dépendances

```bash
# Vérifier les vulnérabilités
npm audit

# Mettre à jour
npm update
```

### 5. HTTPS uniquement

- Toujours utiliser HTTPS en production
- Vercel/Netlify fournissent SSL automatiquement

## Checklist de sécurité

### Avant le déploiement

- [ ] Variables d'environnement configurées
- [ ] Aucune clé privée dans le code
- [ ] Validation Zod sur tous les inputs
- [ ] Tests de sécurité passés
- [ ] Smart contracts audités
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés

### Maintenance

- [ ] Mise à jour régulière des dépendances
- [ ] Surveillance des logs d'erreurs
- [ ] Vérification des accès Pinata
- [ ] Monitoring des transactions suspectes

## Responsabilités

### Développeurs

- Valider toutes les entrées utilisateur
- Gérer les erreurs proprement
- Ne jamais exposer de secrets
- Tester la sécurité

### Utilisateurs

- Vérifier les transactions avant signature
- Ne jamais partager leurs clés privées
- Utiliser des wallets sécurisés
- Vérifier les URLs avant connexion

## Signaler une vulnérabilité

Si vous découvrez une vulnérabilité :

1. **Ne pas** ouvrir une issue publique
2. Contacter l'équipe directement
3. Fournir des détails sur la vulnérabilité
4. Attendre la correction avant divulgation

## Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Ethereum Security](https://ethereum.org/en/developers/docs/smart-contracts/security/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

## Support

Pour toute question sur la sécurité :
1. Consulter cette documentation
2. Examiner le code source
3. Consulter les ressources de sécurité
4. Contacter l'équipe si nécessaire
