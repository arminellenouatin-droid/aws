# TODO CLIENT — AWS : Africa World Saving
> Guide d'actions et check-list exhaustive pour le propriétaire et l'équipe administrative d'AWS avant le lancement public officiel.

---

## 1. Identifiants, Clés d'API & Variables d'Environnement

Configurez ces variables dans la console **Vercel** (**Settings** > **Environment Variables** en mode Production) :

| Service | Variables requises | Statut | Action client requise |
|---|---|---|---|
| **Base de Données Neon** | `DATABASE_URL`, `DATABASE_URL_UNPOOLED` | Configuré | Vérifier le quota de stockage et activer le Point-In-Time-Recovery (PITR). |
| **Neon S3 Storage** | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3` | Configuré | Créer les buckets privés `aws-sacred-downloads` et `aws-user-avatars`. |
| **Chariow Paiements** | `CHARIOW_API_KEY`, `CHARIOW_WEBHOOK_SECRET` | **Action requise** | Créer un compte marchand sur `https://chariow.dev`, passer en mode Live, et renseigner l'URL de webhook : `https://votredomaine.com/api/webhooks/chariow`. |
| **LiveKit Cloud** | `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` | **Action requise** | Créer un projet sur `https://cloud.livekit.io` pour les consultations vidéo/audio chiffrées. |
| **Resend Emails** | `RESEND_API_KEY` | **Action requise** | Créer un compte sur `https://resend.com`, ajouter et valider votre domaine d'expédition (`contact@votredomaine.com`). |
| **Cloudflare Turnstile** | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | **Action requise** | Créer un widget Turnstile (mode géré) sur `https://dash.cloudflare.com` pour protéger les formulaires contre les robots. |
| **Upstash Redis** | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Optionnel | Créer une base Redis serverless gratuite sur `https://upstash.com` pour le rate limiting distribué. |
| **Google OAuth** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Optionnel | Créer un projet Google Cloud Console avec écran de consentement OAuth si vous souhaitez proposer la connexion Google en un clic. |
| **Sentry Monitoring** | `SENTRY_DSN` | Optionnel | Créer un projet Next.js sur `https://sentry.io` pour recevoir les alertes d'erreurs en production. |

---

## 2. Configuration du Nom de Domaine & DNS

Associez votre nom de domaine personnalisé (ex. `africaworldsaving.com`) sur Vercel :

- [ ] **Enregistrement A :** Pointe vers `76.76.21.21` (Vercel Anycast IP).
- [ ] **Enregistrement CNAME `www` :** Pointe vers `cname.vercel-dns.com`.
- [ ] **Enregistrements Email Resend (SPF / DKIM / DMARC) :**
  - `TXT` pour SPF : `v=spf1 include:amazonses.com ~all`
  - `CNAME` pour DKIM : 3 entrées fournies par la console Resend.
  - `TXT` pour DMARC : `v=DMARC1; p=quarantine; rua=mailto:dmarc@votredomaine.com`.

---

## 3. Démarches Réglementaires & Juridiques

### 3.1 Déclaration APDP Bénin (Obligation Légale)
Conformément au **Livre V du Code du Numérique de la République du Bénin** :
- [ ] Déposer une déclaration préalable de traitement de données à caractère personnel auprès de l'**APDP (Autorité de Protection des Données Personnelles du Bénin)** située à Cotonou (`https://apdp.bj`).
- [ ] Préciser la nature des données traitées : données d'identification (nom, email, téléphone), données de paiement (transmises à Chariow), et données sensibles relatives aux convictions et intentions spirituelles (protégées par consentement explicite).
- [ ] Désigner formellement un Référent / Délégué à la Protection des Données (DPO).

### 3.2 Conformité RGPD pour les Utilisateurs de la Diaspora (Europe / International)
- [ ] Valider que les fonctions d'exportation de données (`/api/dashboard/gdpr`) et de suppression de compte sont actives pour les clients résidant dans l'UE.
- [ ] Tenir à jour le registre des sous-traitants techniques (Neon, Vercel, Chariow, Resend, LiveKit).

### 3.3 Validation par un Conseiller Juridique
- [ ] Valider les **Conditions Générales de Vente (CGV)** (`src/app/[locale]/terms/page.tsx`).
- [ ] Valider la **Politique de Confidentialité** (`src/app/[locale]/privacy/page.tsx`).
- [ ] Valider la mention d'avertissement spirituel (précisant la vocation de guidance personnelle sans substitution aux diagnostics médicaux, juridiques ou financiers).

---

## 4. Onboarding Marchand & Reversements Chariow

- [ ] Fournir à Chariow les pièces d'identité de l'entreprise (IFU béninois, RCCM, ou équivalent international).
- [ ] Configurer les comptes de reversement (compte bancaire ou compte Mobile Money MTN / Moov / Wave) pour encaisser les recettes des consultations et de la boutique.
- [ ] Définir la périodicité des virements des honoraires reversés aux praticiens spirituels partenaires.

---

## 5. Recrutement, Éthique & Onboarding des Praticiens

- [ ] Faire signer la **Charte Déontologique AWS** à chaque praticien (interdiction de solliciter des paiements hors plateforme, obligation de secret et de bienveillance).
- [ ] Vérifier la pièce d'identité et les références traditionnelles de chaque praticien avant de valider son compte dans le Dashboard Admin (`/fr/dashboard/admin`).
- [ ] Définir pour chaque praticien ses plages horaires de disponibilité hebdomadaires.

---

## 6. Validation de l'Identité Visuelle Lumineuse

- [ ] Valider la charte graphique moderne mise en place :
  - **Bleu Ciel** (auras célestes, badges raffinés, reflets sacrés).
  - **Noir** (typographie prestigieuse haute lisibilité WCAG 2.2 AAA).
  - **Blanc** (sanctuaire épuré, fond lumineux immaculé, aucune obscurité).
  - **Bleu Pure** (boutons d'action prioritaires, sceau de la marque, liens interactifs).
