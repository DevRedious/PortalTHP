# Plan de conformité WCAG AAA - Portail THP

## 🎯 Objectif : Conformité WCAG 2.1 Niveau AAA

Le niveau AAA est le niveau d'accessibilité le plus élevé selon les Web Content Accessibility Guidelines 2.1.

## 📊 Exigences WCAG AAA vs AA

### Contraste des couleurs (1.4.6)

| Type de texte | WCAG AA | WCAG AAA |
|---------------|---------|----------|
| Texte normal | 4.5:1 | **7:1** |
| Texte large (18pt+) | 3:1 | **4.5:1** |

**Action** : Vérifier et ajuster tous les contrastes pour atteindre 7:1.

### Contenu non textuel (1.4.8)

- **AAA** : Alternative textuelle détaillée pour toutes les images
- **AAA** : Pas de contenu décoratif qui interfère

### Contrôle audio (1.4.2)

- **AAA** : Pas de contenu audio automatique

### Contraste (texte) (1.4.6)

- **AAA** : Ratio de contraste de 7:1 minimum

### Contraste (non textuel) (1.4.11)

- **AAA** : Ratio de contraste de 3:1 pour les éléments UI

### Réduction d'animation (2.3.3)

- **AAA** : Respect de `prefers-reduced-motion`
- **AAA** : Pas d'animation qui clignote plus de 3 fois/seconde

### Timing (2.2.3)

- **AAA** : Pas de timing pour les actions utilisateur

### Interruptions (2.2.4)

- **AAA** : Les interruptions peuvent être reportées ou supprimées

### Ré-authentification (2.2.5)

- **AAA** : Les sessions ne se terminent pas après authentification

### Trois flashs (2.3.2)

- **AAA** : Pas de contenu qui clignote plus de 3 fois/seconde

### Mécanisme d'aide (2.4.5)

- **AAA** : Plusieurs moyens de trouver une page

### En-têtes et étiquettes (2.4.6)

- **AAA** : En-têtes et étiquettes décrivent le sujet ou le but

### Focus visible (2.4.7)

- **AAA** : Indicateur de focus très visible (ratio 3:1)

### Localisation (2.4.8)

- **AAA** : Informations sur la localisation de l'utilisateur

### Changements de contexte (3.2.5)

- **AAA** : Changements de contexte uniquement sur demande

### Identification des erreurs (3.3.3)

- **AAA** : Suggestions pour corriger les erreurs

### Prévention des erreurs (3.3.4)

- **AAA** : Confirmation contextuelle pour les actions importantes

### Prévention des erreurs (légal) (3.3.5)

- **AAA** : Confirmation pour les soumissions légales

### Aide contextuelle (3.3.6)

- **AAA** : Aide disponible pour les erreurs

### Langue des parties (3.1.3)

- **AAA** : Langue identifiée pour chaque partie du contenu

### Abréviations (3.1.4)

- **AAA** : Mécanisme pour identifier les abréviations

### Niveau de lecture (3.1.5)

- **AAA** : Contenu écrit à un niveau de lecture de base

### Prononciation (3.1.6)

- **AAA** : Mécanisme pour identifier la prononciation

---

## 🔧 Implémentation WCAG AAA

### 1. Contraste des couleurs (7:1)

**Vérification actuelle** :
- `--foreground: 0 0% 95%` (blanc) sur `--background: 0 0% 8%` (noir)
- Ratio : ~18:1 ✅ (déjà conforme AAA)

**Actions** :
- [x] Vérifier tous les textes
- [ ] Vérifier les boutons
- [ ] Vérifier les liens
- [ ] Vérifier les bordures

### 2. Navigation au clavier

**Actions** :
- [ ] Tous les éléments interactifs accessibles au clavier
- [ ] Ordre de tabulation logique
- [ ] Focus visible (ratio 3:1)
- [ ] Pas de piège au clavier

### 3. ARIA et sémantique

**Actions** :
- [x] aria-live pour erreurs
- [x] aria-busy pour chargements
- [ ] aria-describedby pour aide contextuelle
- [ ] Landmarks ARIA complets
- [ ] Navigation skip links

### 4. Formulaires AAA

**Actions** :
- [x] Labels associés
- [ ] aria-required sur champs obligatoires
- [ ] aria-invalid sur champs en erreur
- [ ] Suggestions de correction
- [ ] Confirmation pour actions importantes

### 5. Animations et motion

**Actions** :
- [ ] Respecter prefers-reduced-motion
- [ ] Désactiver animations si nécessaire
- [ ] Pas de flash > 3Hz

### 6. Aide contextuelle

**Actions** :
- [ ] Tooltips pour tous les champs
- [ ] Messages d'aide détaillés
- [ ] Exemples de format

---

## 📋 Checklist WCAG AAA

### Percevable

- [x] 1.1.1 Contenu non textuel (niveau A)
- [ ] 1.4.6 Contraste (texte) - **7:1** (AAA)
- [ ] 1.4.8 Présentation visuelle (AAA)
- [ ] 1.4.9 Images de texte (AAA)

### Utilisable

- [ ] 2.1.3 Clavier (pas de timing) (AAA)
- [ ] 2.2.3 Pas de timing (AAA)
- [ ] 2.2.4 Interruptions (AAA)
- [ ] 2.2.5 Ré-authentification (AAA)
- [ ] 2.3.2 Trois flashs (AAA)
- [ ] 2.3.3 Animation de transition (AAA)
- [ ] 2.4.8 Localisation (AAA)
- [ ] 2.4.9 Mécanisme d'aide (AAA)
- [ ] 2.4.10 En-têtes et étiquettes (AAA)

### Compréhensible

- [ ] 3.1.3 Langue des parties (AAA)
- [ ] 3.1.4 Abréviations (AAA)
- [ ] 3.1.5 Niveau de lecture (AAA)
- [ ] 3.1.6 Prononciation (AAA)
- [ ] 3.2.5 Changements de contexte (AAA)
- [ ] 3.3.4 Prévention des erreurs (AAA)
- [ ] 3.3.5 Prévention des erreurs (légal) (AAA)
- [ ] 3.3.6 Aide contextuelle (AAA)

### Robuste

- [x] 4.1.1 Analyse (niveau A)
- [x] 4.1.2 Nom, rôle, valeur (niveau A)

---

## 🚀 Plan d'implémentation

### Phase 1 : Contraste et couleurs (Priorité 1)

1. Vérifier tous les contrastes avec un outil
2. Ajuster les couleurs pour 7:1 minimum
3. Tester avec différents thèmes

### Phase 2 : Navigation clavier (Priorité 1)

1. Tester toute la navigation au clavier
2. Ajouter skip links
3. Améliorer les indicateurs de focus

### Phase 3 : Formulaires AAA (Priorité 2)

1. Ajouter aria-required
2. Ajouter aria-invalid
3. Ajouter suggestions de correction
4. Ajouter aide contextuelle

### Phase 4 : Animations (Priorité 2)

1. Respecter prefers-reduced-motion
2. Désactiver animations si nécessaire

### Phase 5 : Aide et documentation (Priorité 3)

1. Ajouter tooltips
2. Ajouter aide contextuelle
3. Ajouter exemples

---

## 📚 Références

- [WCAG 2.1 Level AAA](https://www.w3.org/WAI/WCAG21/quickref/?levels=aaa)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
