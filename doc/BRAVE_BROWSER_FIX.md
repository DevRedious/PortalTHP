# Correction du problème de duplication de boutons dans Brave

## Problème identifié

Sur le navigateur **Brave**, deux boutons "Connecter" apparaissaient côte à côte, alors que sur **Opera**, **Mozilla Firefox** et **Google Chrome**, un seul bouton s'affichait correctement.

### Symptômes

- **Brave** : Affichage de 2 boutons "Connecter" identiques
- **Autres navigateurs** : Affichage correct d'un seul bouton

### Cause racine

Brave Browser détecte plusieurs connecteurs wallet simultanément :
1. Le **wallet intégré de Brave** (Brave Wallet)
2. Le connecteur **WalletConnect** configuré dans l'application

Cela crée une duplication dans la liste des connecteurs disponibles, ce qui génère plusieurs boutons dans l'interface.

## Solution implémentée

### 1. Filtrage renforcé des connecteurs

Le composant `ConnectButton` a été amélioré pour filtrer efficacement les doublons :

```typescript
const uniqueConnectors = useMemo(() => {
  const seenUids = new Set<string>();
  const seenNames = new Set<string>();
  const seenIds = new Set<string>();
  
  return connectors.filter((connector) => {
    // Exclure MetaMask
    if (connector.name === "MetaMask" || connector.name.toLowerCase().includes("metamask")) {
      return false;
    }
    
    // Vérifier les doublons par UID (plus fiable)
    if (seenUids.has(connector.uid)) {
      return false;
    }
    
    // Vérifier aussi par nom normalisé
    const normalizedName = connector.name.toLowerCase().trim();
    if (seenNames.has(normalizedName)) {
      return false;
    }
    
    // Vérifier aussi par ID si disponible
    if (connector.id && seenIds.has(connector.id)) {
      return false;
    }
    
    seenUids.add(connector.uid);
    seenNames.add(normalizedName);
    if (connector.id) {
      seenIds.add(connector.id);
    }
    
    return true;
  });
}, [connectors]);
```

### 2. Affichage d'un seul bouton

Au lieu d'afficher un bouton par connecteur unique, le composant affiche maintenant **un seul bouton** en utilisant le premier connecteur filtré :

```typescript
// Prendre seulement le premier connecteur pour éviter les doublons dans Brave
const connectorToUse = uniqueConnectors[0];

return (
  <Button
    key={connectorToUse.uid}
    onClick={() => {
      connect({ connector: connectorToUse });
      trackWalletConnect(connectorToUse.name);
    }}
    disabled={isPending}
    size="sm"
  >
    {/* Contenu du bouton */}
  </Button>
);
```

### 3. Optimisation avec useMemo

L'utilisation de `useMemo` garantit que le filtrage n'est recalculé que lorsque la liste des connecteurs change, améliorant les performances et évitant les re-renders inutiles.

## Fichiers modifiés

- `components/wallet/connect-button.tsx` : Amélioration du filtrage et affichage d'un seul bouton

## Tests effectués

✅ **Brave Browser** : Un seul bouton s'affiche correctement  
✅ **Chrome** : Fonctionnement normal  
✅ **Firefox** : Fonctionnement normal  
✅ **Opera** : Fonctionnement normal  

## Stratégie de filtrage

Le filtrage utilise trois niveaux de vérification pour garantir l'unicité :

1. **Par UID** : Identifiant unique du connecteur (le plus fiable)
2. **Par nom normalisé** : Nom en minuscules et sans espaces pour détecter les variantes
3. **Par ID** : Identifiant supplémentaire si disponible

Cette approche multi-niveaux garantit que même si Brave détecte plusieurs instances du même connecteur avec des identifiants légèrement différents, seule une instance sera conservée.

## Notes techniques

### Pourquoi Brave détecte plusieurs connecteurs ?

Brave Browser intègre son propre wallet Ethereum qui peut être détecté comme un connecteur séparé. De plus, Brave peut parfois détecter plusieurs instances du même connecteur à cause de :

- Son système de détection de wallets intégré
- Les extensions de wallet installées
- La façon dont Brave expose l'API `window.ethereum`

### Pourquoi un seul bouton ?

Afficher un seul bouton simplifie l'expérience utilisateur et évite la confusion. Le premier connecteur filtré est généralement le plus approprié (WalletConnect dans notre cas).

Si plusieurs connecteurs uniques légitimes sont détectés à l'avenir, il sera possible de modifier le code pour afficher plusieurs boutons avec des labels différents.

## Évolutions futures

Si besoin d'afficher plusieurs connecteurs à l'avenir :

1. Ajouter des labels spécifiques pour chaque connecteur
2. Utiliser des icônes différentes pour chaque wallet
3. Permettre à l'utilisateur de choisir explicitement son wallet

## Références

- [Documentation Wagmi - Connectors](https://wagmi.sh/core/api/connectors)
- [Brave Browser Wallet](https://brave.com/wallet/)
- [WalletConnect Documentation](https://docs.walletconnect.com/)

---

**Date de correction** : 2024  
**Version** : 1.0  
**Statut** : ✅ Résolu
