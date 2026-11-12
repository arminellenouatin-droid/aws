# Politique et Architecture de Sécurité — AWS : Africa World Saving

Ce document décrit en détail les mécanismes de sécurité, le modèle de menaces, les politiques d'accès, la gestion des secrets et la procédure de réponse à incident pour la plateforme **AWS : Africa World Saving**.

---

## 1. Modèle de Menaces et Spécificités Métier

### 1.1 Données spirituelles et intimes hautement sensibles
Les utilisateurs d'AWS partagent des informations profondément personnelles :
- Intentions spirituelles, motifs de consultations (santé, deuil, blocages familiaux, projets).
- Notes de séances et comptes-rendus rédigés par les praticiens.
- Journal spirituel privé et rituels pratiqués.

**Garanties appliquées :**
- Cloisonnement strict entre les espaces praticiens, clients et administrateurs.
- Aucun partage ni exploitation commerciale ou publicitaire de ces données.
- Minimisation des données collectées (pseudonymat supporté, consultations sans obligation de révéler son patronyme réel).
- Chiffrement en transit (TLS 1.3 obligatoire) et au repos sur Neon PostgreSQL.

### 1.2 Prévention de la Fraude et Pratiques Non-Éthiques
- **Interdiction formelle de sollicitation financière externe :** Aucun praticien ne peut demander de paiement par transfert direct (Wave, MTN MoMo, virement) hors de la plateforme. Tout numéro de compte ou lien externe partagé dans les messages privés déclenche une alerte de sécurité.
- **Vérification d'identité des praticiens :** Les praticiens sont audités et vérifiés manuellement par l'administrateur avant toute activation sur la plateforme.
- **Protection contre les faux comptes pour la gratuité :** L'éligibilité à la consultation découverte gratuite de 15 minutes est vérifiée côté serveur par hachage d'email et de numéro de téléphone.

---

## 2. Contrôle d'Accès et Couche d'Accès aux Données (DAL)

### 2.1 Authentification Forte
- Implémentée avec **Better Auth** (`src/lib/auth.ts`) utilisant un hachage de mot de passe résistant (Argon2id/scrypt).
- Authentification à deux facteurs (2FA) obligatoire pour les comptes `admin` et `practitioner`.
- Sessions chiffrées stockées dans des cookies `HttpOnly`, `Secure`, `SameSite=Lax`.
- Pas d'énumération de comptes : messages d'erreur génériques en cas d'échec d'authentification.

### 2.2 Couche d'Accès aux Données Serveur (Server DAL)
Aucun composant client n'exécute de requêtes SQL directement. Toute interaction avec la base de données passe par les modules de la DAL :
- `src/server/dal/auth.ts` : validation des sessions et des rôles.
- `src/server/dal/consultations.ts` : gestion sécurisée des réservations avec vérification anti-concurrence.
- `src/server/dal/forum.ts` : gestion des discussions et modération.
- `src/server/dal/dashboard.ts` : accès restreint aux espaces utilisateurs et aux demandes RGPD.

### 2.3 RLS (Row Level Security) Postgres en Défense en Profondeur
- Les tables sensibles (`consultations`, `consultation_messages`, `consultation_notes`, `journal_entries`, `orders`, `data_requests`) disposent de politiques RLS restrictives par défaut.
- Deux chaînes de connexion Neon :
  - `DATABASE_URL` (poolée) : rôle applicatif aux privilèges minimaux pour le trafic web.
  - `DATABASE_URL_UNPOOLED` : rôle de migration utilisé exclusivement lors des déploiements CI/CD.

---

## 3. Sécurité Réseau, En-têtes et Protection Anti-Abus

### 3.1 En-têtes HTTP de Sécurité (`next.config.ts`)
- **Content-Security-Policy (CSP)** : stricte, limitant les origines de scripts, images, polices et connexions (Neon, Chariow, LiveKit, Ably, Cloudflare Turnstile).
- **Strict-Transport-Security (HSTS)** : `max-age=63072000; includeSubDomains; preload`.
- **X-Frame-Options** : `DENY` (anti-clickjacking).
- **X-Content-Type-Options** : `nosniff`.
- **Referrer-Policy** : `strict-origin-when-cross-origin`.
- **Permissions-Policy** : `camera=(self), microphone=(self), geolocation=()`.
- **X-Permitted-Cross-Domain-Policies** : `none`.

### 3.2 Limitation de Débit (Rate Limiting) & Anti-Bot
Le module `src/server/security/rate-limiter.ts` protège les points d'entrée critiques :
- **Paiements Chariow** (`/api/checkout/chariow`) : max 10 tentatives / 5 min / IP.
- **Réservations** (`/api/consultations/book`) : max 10 réservations / 10 min / IP.
- **Forum** (`/api/forum/threads`, `/api/forum/posts`) : max 5 sujets / 10 min / IP, max 15 réponses / 5 min / IP.
- **Quiz Marketing** (`/api/marketing/quiz`) : max 5 soumissions / 5 min / IP + détection Honeypot anti-spam.
- **Téléchargements numériques** (`/api/downloads/[token]`) : max 20 téléchargements / 5 min / IP.
- **Demandes RGPD** (`/api/dashboard/gdpr`) : max 5 demandes / 10 min / IP.

---

## 4. Intégration Chariow et Sécurité des Paiements

- **Source de Vérité Serveur :** Aucune commande ni consultation n'est validée sur simple redirection client. Seul le webhook authentifié (`/api/webhooks/chariow`) valide les paiements.
- **Vérification de Signature HMAC-SHA256 :** Tout webhook entrant est rejeté si la signature `x-chariow-signature` ne correspond pas au secret `CHARIOW_WEBHOOK_SECRET`.
- **Idempotence :** Les identifiants de transactions sont tracés pour empêcher tout double crédit ou rejeu.
- **Zéro donnée bancaire :** Aucune information de carte ou Mobile Money ne transite par les serveurs d'AWS ; conformité PCI-DSS déléguée à Chariow.

---

## 5. Procédure de Réponse à Incident (SecOps Runbook)

En cas de détection d'une anomalie, intrusion ou fuite de données :

```
[1. DÉTECTION] ──> [2. CONFINEMENT] ──> [3. ÉRADICATION] ──> [4. NOTIFICATION] ──> [5. POST-MORTEM]
```

### Étape 1 : Détection & Qualification
- Surveillance active des alertes Sentry, des métriques Vercel et de la table `audit_logs`.
- Qualification de la criticité :
  - **P1 - Critique :** Accès non autorisé à la base de données, fuite de données personnelles ou clé secrète compromise.
  - **P2 - Majeur :** Déni de service partiel, webhook Chariow indisponible.
  - **P3 - Mineur :** Tentative de brute-force bloquée par le rate-limiter.

### Étape 2 : Confinement Immédiat
1. **Rotation des secrets :** En cas de suspicion de fuite, régénérer immédiatement dans Vercel Dashboard :
   - `BETTER_AUTH_SECRET`
   - `CHARIOW_API_KEY` et `CHARIOW_WEBHOOK_SECRET`
   - `DATABASE_URL` (depuis la console Neon).
2. **Blocage d'accès :** Révoquer les sessions actives via Better Auth pour les utilisateurs compromis.
3. Si nécessaire, activer la page de maintenance dans Vercel Edge Middleware.

### Étape 3 : Éradication et Restauration
- Analyser la table `audit_logs` pour identifier le vecteur d'attaque et l'étendue des données consultées.
- Si corruption de données, restaurer la base de données Neon via Point-In-Time-Recovery (PITR) à la minute précédant l'incident.

### Étape 4 : Notification Réglementaire (Délai légal : 72 heures)
Conformément au **Code du Numérique de la République du Bénin** et au **RGPD** :
- **Notification à l'APDP (Bénin) :** Déclarer la violation sous 72h via le portail officiel de l'APDP avec l'analyse d'impact.
- **Notification aux utilisateurs :** Si l'incident engendre un risque élevé pour les droits des personnes (ex. notes intimes de consultation), notifier directement les utilisateurs concernés avec des recommandations claires.

### Étape 5 : Revue Post-Mortem
- Rédiger un rapport d'incident complet sous 7 jours.
- Corriger le vecteur de vulnérabilité.
- Mettre à jour les tests automatisés de régression en CI/CD.
