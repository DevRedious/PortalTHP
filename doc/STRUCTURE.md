# 📁 Structure de la documentation

Ce document explique l'organisation de la documentation du Portail THP.

## Organisation par catégories

La documentation est organisée en 5 catégories principales, numérotées pour faciliter la navigation :

### 🚀 01 - Getting Started (`01-getting-started/`)

Guides pour démarrer avec le projet.

**Contenu :**
- `SETUP_COMPLET.md` - Guide de configuration depuis zéro
- `CONFIGURATION.md` - Configuration complète de l'application

**Quand consulter :**
- Vous installez le projet pour la première fois
- Vous configurez l'environnement de développement
- Vous avez besoin de comprendre les variables d'environnement

### 🏗️ 02 - Development (`02-development/`)

Documentation technique et guides de développement.

**Contenu :**
- `ARCHITECTURE.md` - Architecture système et flux de données
- `COMPOSANTS.md` - Documentation des composants UI
- `BRAVE_BROWSER_FIX.md` - Correction duplication boutons Brave
- `BUTTONS_ANALYSIS.md` - Analyse des boutons
- `I18N_AUDIT.md` - Audit du système i18n
- `LIT_VERSION_FIX.md` - Correction version Lit
- `VERCEL_BUILD_FIXES.md` - Corrections build Vercel
- `AMELIORATIONS.md` - Liste des améliorations

**Quand consulter :**
- Vous développez de nouvelles fonctionnalités
- Vous devez comprendre l'architecture
- Vous travaillez sur les composants UI
- Vous résolvez des bugs spécifiques

### 🔧 03 - Reference (`03-reference/`)

Documentation de référence pour les APIs et systèmes.

**Contenu :**
- `INTERNATIONALISATION.md` - Système de traduction i18n

**Quand consulter :**
- Vous avez besoin de références techniques
- Vous travaillez sur l'internationalisation
- Vous cherchez des détails d'implémentation

### 🚢 04 - Deployment (`04-deployment/`)

Guides pour déployer l'application.

**Contenu :**
- `SECURITE.md` - Sécurité et bonnes pratiques

**Quand consulter :**
- Vous déployez l'application
- Vous configurez la sécurité
- Vous préparez la production

### 📋 05 - Project (`05-project/`)

Gestion du projet, Git, GitHub et licence.

**Contenu :**
- `LICENCE.md` - Documentation de la licence MIT
- `GITIGNORE.md` - Documentation du fichier .gitignore
- `GITHUB.md` - Guide pour gérer le dépôt GitHub
- `COMMANDES_GITHUB.md` - Commandes Git pour pousser sur GitHub
- `PREPARATION_GITHUB.md` - Checklist avant de pousser sur GitHub
- `README_GUIDE.md` - Guide pour maintenir le README

**Quand consulter :**
- Vous gérez le dépôt Git
- Vous préparez un commit/push
- Vous avez des questions sur la licence
- Vous maintenez la documentation

### 📦 Archive (`archive/`)

Anciennes versions et documents archivés.

**Contenu :**
- Documents historiques et anciennes versions
- Analyses et audits archivés

**Quand consulter :**
- Vous cherchez des informations historiques
- Vous voulez comprendre l'évolution du projet

## Fichiers à la racine

- `README.md` - Index principal de la documentation
- `INDEX.md` - Index alphabétique complet avec tous les documents
- `STRUCTURE.md` - Ce fichier (explication de l'organisation)

## Navigation rapide

### Par cas d'usage

**Je veux installer le projet :**
1. `01-getting-started/SETUP_COMPLET.md`
2. `01-getting-started/CONFIGURATION.md`

**Je veux comprendre l'architecture :**
1. `02-development/ARCHITECTURE.md`
2. `02-development/COMPOSANTS.md`

**Je veux contribuer au code :**
1. `02-development/COMPOSANTS.md`
2. `02-development/ARCHITECTURE.md`
3. `03-reference/INTERNATIONALISATION.md`

**Je veux déployer :**
1. `04-deployment/SECURITE.md`
2. `01-getting-started/CONFIGURATION.md`

**Je veux gérer GitHub :**
1. `05-project/GITHUB.md`
2. `05-project/COMMANDES_GITHUB.md`
3. `05-project/PREPARATION_GITHUB.md`

## Avantages de cette organisation

✅ **Clarté** : Chaque document est dans une catégorie logique  
✅ **Navigation facile** : Numérotation pour ordre logique  
✅ **Scalabilité** : Facile d'ajouter de nouveaux documents  
✅ **Maintenance** : Structure claire pour maintenir la documentation  
✅ **Découverte** : INDEX.md et README.md pour trouver rapidement  

## Ajouter un nouveau document

1. **Identifier la catégorie** appropriée
2. **Créer le fichier** dans le bon sous-dossier
3. **Mettre à jour** `INDEX.md` avec le nouveau document
4. **Ajouter un lien** dans `README.md` si pertinent

## Convention de nommage

- **Majuscules** pour les noms de fichiers
- **Underscore** pour séparer les mots (`BRAVE_BROWSER_FIX.md`)
- **Extension** `.md` pour tous les fichiers Markdown

---

📖 Pour une liste complète, consultez [INDEX.md](./INDEX.md)  
🏠 Pour l'index principal, consultez [README.md](./README.md)
