# Guide du README - Portail THP

Documentation sur la structure et la maintenance du README principal.

## Vue d'ensemble

Le fichier `README.md` à la racine du projet est le point d'entrée principal pour les développeurs et utilisateurs.

## Structure recommandée

### 1. En-tête et description

```markdown
# Nom du Projet

Description courte et claire du projet (1-2 phrases).
```

### 2. Badges (optionnel)

```markdown
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)
```

### 3. Stack technique

Liste les technologies principales utilisées.

### 4. Documentation

Lien vers la documentation complète dans `doc/`.

### 5. Démarrage rapide

Instructions minimales pour démarrer rapidement.

### 6. Licence

Mention de la licence.

## Structure actuelle du README

Le README actuel suit cette structure :

1. **Titre et description** : Portail THP - Web3 Profile Portal
2. **Stack technique** : Liste des technologies
3. **Documentation** : Liens vers `doc/`
4. **Démarrage rapide** : Commandes essentielles
5. **Licence** : MIT

## Bonnes pratiques

### 1. Garder le README concis

Le README principal doit être **court** (50-100 lignes max). Les détails sont dans `doc/`.

### 2. Liens vers la documentation

Toujours référencer la documentation détaillée :

```markdown
Pour plus de détails, consultez le [guide d'installation](./doc/INSTALLATION.md).
```

### 3. Mettre à jour régulièrement

Mettre à jour le README quand :
- De nouvelles fonctionnalités sont ajoutées
- La stack technique change
- Les instructions de démarrage changent

### 4. Exemples de code

Inclure des exemples simples mais fonctionnels :

```bash
npm install
npm run dev
```

### 5. Liens utiles

Inclure des liens vers :
- Documentation complète
- Issues GitHub
- Site web (si disponible)

## Template README complet

```markdown
# Portail THP - Web3 Profile Portal

Application web3 décentralisée pour créer et gérer des profils de développeurs.

## 🚀 Stack Technique

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Web3**: Wagmi, Viem, WalletConnect
- **Authentification**: SIWE (EIP-4361)
- **Stockage**: IPFS via Pinata
- **Smart Contracts**: Solidity, Foundry

## 📚 Documentation

Documentation complète dans [`doc/`](./doc/README.md).

## 🚀 Démarrage rapide

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📝 Licence

MIT - Voir [LICENSE](./LICENSE)
```

## Sections optionnelles

### Badges

```markdown
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
```

### Captures d'écran

```markdown
![Screenshot](./screenshot.png)
```

### Contribuer

```markdown
## 🤝 Contribuer

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](./CONTRIBUTING.md).
```

### Support

```markdown
## 💬 Support

- Documentation : [doc/](./doc/README.md)
- Issues : [GitHub Issues](https://github.com/.../issues)
```

## Mise à jour du README

### Quand mettre à jour

1. **Nouvelle fonctionnalité** : Ajouter dans la description ou stack
2. **Changement de stack** : Mettre à jour la section stack
3. **Nouvelle documentation** : Ajouter le lien dans la section documentation
4. **Changement de licence** : Mettre à jour la section licence

### Processus

1. Modifier `README.md`
2. Vérifier les liens (ils doivent fonctionner)
3. Tester les commandes (s'assurer qu'elles fonctionnent)
4. Commiter avec un message clair

## Vérification

### Checklist avant commit

- [ ] Tous les liens fonctionnent
- [ ] Les commandes sont testées
- [ ] La structure est cohérente
- [ ] Pas de fautes d'orthographe
- [ ] Les exemples de code sont corrects

### Vérifier les liens

```bash
# Vérifier les liens markdown (nécessite un outil externe)
# Ou vérifier manuellement dans un viewer markdown
```

## Exemples de README

### Minimaliste

```markdown
# Portail THP

Application Web3 décentralisée.

## Installation

npm install && npm run dev

## Documentation

Voir [doc/](./doc/README.md)
```

### Complet

```markdown
# Portail THP

[Description détaillée]

## Fonctionnalités

- Liste des fonctionnalités

## Installation

[Instructions détaillées]

## Documentation

[Liens vers doc/]

## Contribuer

[Instructions]

## Licence

MIT
```

## Support

Pour toute question sur le README :
1. Consulter cette documentation
2. Examiner le README actuel
3. Consulter des exemples de README sur GitHub
4. Demander de l'aide à l'équipe
