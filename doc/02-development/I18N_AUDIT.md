# Audit i18n - Portail THP

## ✅ Fichiers utilisant déjà i18n

Les fichiers suivants utilisent correctement le système de traduction :

1. **app/page.tsx** - Page d'accueil ✅
2. **app/dashboard/page.tsx** - Dashboard utilisateur ✅
3. **app/terms/page.tsx** - Conditions d'utilisation ✅
4. **app/privacy/page.tsx** - Politique de confidentialité ✅
5. **components/layout/footer.tsx** - Footer ✅
6. **components/wallet/connect-button.tsx** - Bouton de connexion ✅
7. **components/wallet/siwe-button.tsx** - Bouton SIWE ✅

---

## ❌ Fichiers nécessitant des traductions

### 1. app/u/[address]/page.tsx

**Textes à traduire :**

- `"Retour à l'annuaire"` → `t.profile.backToDirectory`
- `"Chargement du profil..."` → `t.profile.loading` (à ajouter)
- `"Profil non trouvé"` → `t.profile.profileNotFound`
- `"Aucun profil n'a été trouvé pour cette adresse"` → `t.profile.noProfileFound`
- `"Adresse invalide"` → `t.profile.invalidAddress`
- `"L'adresse Ethereum fournie n'est pas valide"` → `t.profile.invalidAddressDescription`
- `"Adresse:"` → `t.profile.address` (à ajouter)
- `"À propos"` → `t.profile.about`
- `"Stack technique"` → `t.profile.techStack`
- `"Disponibilité"` → `t.profile.availability`
- `"Disponible"` → `t.profile.available`
- `"Occupé"` → `t.profile.busy`
- `"Indisponible"` → `t.profile.unavailable`
- `"Adresse Ethereum:"` → `t.profile.ethereumAddress`
- `"Dernière mise à jour:"` → `t.profile.lastUpdate`
- `"Discord copié !"` → Toast (à traduire)
- `"a été copié dans le presse-papier"` → Toast (à traduire)
- `"Erreur"` → Toast (à traduire)
- `"Impossible de copier le texte Discord"` → Toast (à traduire)
- `"Copié !"` → `t.common.copied` (à ajouter)
- `"ans"` → `t.common.years` (à ajouter)
- `"Aller au contenu principal"` → `t.common.skipToContent`

---

### 2. app/directory/page.tsx

**Textes à traduire :**

- `"Aller au contenu principal"` → `t.common.skipToContent`
- `"Annuaire"` → `t.directory.title`
- `"Découvrez les développeurs de la promo THP"` → `t.directory.subtitle`
- `"Rechercher dans l'annuaire"` → `t.directory.searchLabel` (à ajouter)
- `"Rechercher..."` → `t.common.search`
- `"Rechercher dans l'annuaire par nom, département ou technologie"` → `t.directory.searchAriaLabel` (à ajouter)
- `"Chargement des profils"` → `t.directory.loading`
- `"Aucun profil ne correspond à votre recherche"` → `t.directory.noResults`
- `"Aucun profil disponible pour le moment"` → `t.directory.noProfiles`
- `"profil(s) trouvé(s)"` → `t.directory.profilesFound` (à ajouter)

---

### 3. components/profile/profile-form.tsx

**Textes à traduire :**

**Toasts d'erreur :**
- `"Erreur inconnue"` → `t.form.errors.unknown` (à ajouter)
- `"Transaction rejetée"` → `t.form.errors.transactionRejected` (à ajouter)
- `"Vous avez annulé la transaction dans MetaMask."` → `t.form.errors.transactionCancelled` (à ajouter)
- `"Fonds insuffisants"` → `t.form.errors.insufficientFunds` (à ajouter)
- `"Vous n'avez pas assez d'ETH pour payer les frais de transaction."` → `t.form.errors.insufficientFundsDescription` (à ajouter)
- `"Erreur réseau"` → `t.form.errors.networkError` (à ajouter)
- `"Problème de connexion au réseau. Vérifiez votre connexion internet."` → `t.form.errors.networkErrorDescription` (à ajouter)
- `"Erreur de transaction"` → `t.form.errors.transactionError` (à ajouter)
- `"Erreur inconnue lors de l'upload"` → `t.form.errors.uploadUnknown` (à ajouter)
- `"Erreur de connexion à Pinata. Vérifiez votre configuration."` → `t.form.errors.pinataError` (à ajouter)
- `"Wallet non connecté"` → `t.form.errors.walletNotConnected` (à ajouter)
- `"Fichier trop volumineux"` → `t.form.errors.fileTooLarge` (à ajouter)
- `"Erreur lors de la sauvegarde"` → `t.form.errors.saveError` (à ajouter)

**Toasts de chargement :**
- `"Transaction en attente..."` → `t.form.loading.transactionPending` (à ajouter)
- `"Veuillez confirmer la transaction dans MetaMask."` → `t.form.loading.transactionPendingDescription` (à ajouter)
- `"Confirmation de la transaction..."` → `t.form.loading.transactionConfirming` (à ajouter)
- `"Upload de l'avatar en cours..."` → `t.form.loading.avatarUpload` (à ajouter)
- `"Upload du profil en cours..."` → `t.form.loading.profileUpload` (à ajouter)

**Toasts de succès :**
- `"Profil sauvegardé avec succès !"` → `t.form.success.profileSaved` (à ajouter)
- `"Transaction confirmée: {hash}"` → `t.form.success.transactionConfirmed` (à ajouter)
- `"Avatar uploadé avec succès"` → `t.form.success.avatarUploaded` (à ajouter)
- `"Profil uploadé sur IPFS"` → `t.form.success.profileUploaded` (à ajouter)

**Messages d'erreur d'upload :**
- `"Échec de l'upload de l'avatar"` → `t.form.errors.avatarUploadFailed` (à ajouter)
- `"Échec de l'upload du profil"` → `t.form.errors.profileUploadFailed` (à ajouter)

**Textes de progression :**
- `"Transaction blockchain..."` → `t.form.progress.transaction` (à ajouter)
- `"Transaction..."` → `t.form.progress.transactionShort` (à ajouter)

---

### 4. components/profile/confirmation-modal.tsx

**Textes à traduire :**

- `"Confirmer la sauvegarde du profil"` → `t.modal.confirmSave.title` (à ajouter)
- `"Cette action va créer une transaction sur la blockchain Ethereum."` → `t.modal.confirmSave.description` (à ajouter)
- `"Vous allez :"` → `t.modal.confirmSave.youWill` (à ajouter)
- `"Uploader votre profil sur IPFS (décentralisé)"` → `t.modal.confirmSave.uploadIPFS` (à ajouter)
- `"Enregistrer l'URI sur la blockchain"` → `t.modal.confirmSave.saveURI` (à ajouter)
- `"Payer les frais de transaction (gas)"` → `t.modal.confirmSave.payGas` (à ajouter)
- `"Estimation du coût en cours..."` → `t.modal.confirmSave.estimating` (à ajouter)
- `"Gas estimé :"` → `t.modal.confirmSave.estimatedGas` (à ajouter)
- `"Coût estimé :"` → `t.modal.confirmSave.estimatedCost` (à ajouter)
- `"L'estimation du coût n'est pas disponible."` → `t.modal.confirmSave.estimationUnavailable` (à ajouter)
- `"Annuler"` → `t.common.cancel`
- `"Confirmation..."` → `t.modal.confirmSave.confirming` (à ajouter)
- `"Confirmer"` → `t.modal.confirmSave.confirm` (à ajouter)

---

## 📋 Résumé

**Total de fichiers à traduire :** 4 fichiers

**Total de nouvelles clés de traduction à ajouter :** ~50+ clés

**Priorité :**
1. 🔴 **Haute** - Pages publiques (app/u/[address]/page.tsx, app/directory/page.tsx)
2. 🟡 **Moyenne** - Composants de formulaire (components/profile/profile-form.tsx, confirmation-modal.tsx)

---

## 🎯 Prochaines étapes

1. Ajouter toutes les clés de traduction manquantes dans `lib/i18n.ts`
2. Mettre à jour les fichiers pour utiliser `useI18n()`
3. Tester toutes les traductions dans les 6 langues supportées
4. Vérifier que tous les textes sont traduits
