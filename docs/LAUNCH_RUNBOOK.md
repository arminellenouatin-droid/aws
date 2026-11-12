# Launch Runbook & Procédures d'Exploitation — AWS : Africa World Saving

Ce runbook décrit la procédure complète de mise en production, les tests de recette post-lancement, la stratégie de sauvegarde/restauration et le plan de continuité d'activité pour **AWS : Africa World Saving**.

---

## 1. Calendrier & Check-list Pré-Lancement

### J-7 : Préparation des Infrastructures et Comptes Tiers
- [ ] Créer le projet de production sur **Vercel** et lier le dépôt GitHub `https://github.com/arminellenouatin-droid/aws.git`.
- [ ] Créer la branche de production `main` et activer les protections de branche (revue requise, CI verte obligatoire).
- [ ] Vérifier la branche `production` sur Neon PostgreSQL avec backups automatiques et Point-In-Time-Recovery (PITR) activé.
- [ ] Configurer les variables d'environnement dans Vercel (Section 2).
- [ ] Valider le compte marchand **Chariow** en mode Live (`https://chariow.dev`) et obtenir les clés de production.
- [ ] Provisionner le projet **LiveKit Cloud** pour les consultations vidéo/audio chiffrées.
- [ ] Configurer le domaine d'envoi et les templates dans **Resend** (SPF, DKIM, DMARC valides).

### J-1 : Répétition Générale (Staging / Preview)
- [ ] Exécuter un test de bout en bout sur l'environnement de Preview Vercel :
  - Inscription d'un utilisateur de test.
  - Réservation d'une consultation (vérification de la disponibilité et du fuseau horaire).
  - Achat d'un produit dans la boutique via Chariow Sandbox.
  - Vérification de la réception du webhook Chariow et passage de la commande à `paid`.
  - Téléchargement du produit numérique avec jeton sécurisé.
  - Publication d'un sujet sur le forum communautaire.
  - Complétion du quiz spirituel et réception du code promo.
  - Test d'export et d'effacement de données personnelles (RGPD/APDP).

---

## 2. Configuration des Variables d'Environnement en Production (Vercel)

Dans la console Vercel (**Settings** > **Environment Variables**), configurer pour l'environnement **Production** :

| Variable | Exemple / Format | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://africaworldsaving.com` | URL canonique du site |
| `DATABASE_URL` | `postgresql://aws_user:***@ep-***-pooler.us-east-2.aws.neon.tech/aws_prod?sslmode=require` | Chaîne de connexion Neon poolée |
| `DATABASE_URL_UNPOOLED` | `postgresql://aws_user:***@ep-***.us-east-2.aws.neon.tech/aws_prod?sslmode=require` | Chaîne de migration directe |
| `BETTER_AUTH_SECRET` | Chaîne aléatoire de 64 caractères hexadécimaux | Clé de signature des sessions |
| `BETTER_AUTH_URL` | `https://africaworldsaving.com` | Origine pour l'authentification |
| `CHARIOW_API_KEY` | `ch_live_***` | Clé API secrète Chariow de production |
| `CHARIOW_WEBHOOK_SECRET` | `whsec_***` | Clé de signature du webhook Chariow |
| `CHARIOW_API_URL` | `https://api.chariow.com/v1` | Point d'accès de l'API Chariow |
| `LIVEKIT_URL` | `wss://aws-spiritual-***.livekit.cloud` | URL WebSocket LiveKit |
| `LIVEKIT_API_KEY` | `API***` | Clé API LiveKit |
| `LIVEKIT_API_SECRET` | `secret***` | Clé secrète LiveKit |
| `RESEND_API_KEY` | `re_***` | Clé API transactionnelle Resend |
| `UPSTASH_REDIS_REST_URL` | `https://***.upstash.io` | URL REST du cluster Redis Upstash |
| `UPSTASH_REDIS_REST_TOKEN` | `***` | Jeton d'accès Upstash |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `0x4AAAAAA***` | Clé publique Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | `0x4AAAAAA***` | Clé secrète Cloudflare Turnstile |
| `SENTRY_DSN` | `https://***@o***.ingest.sentry.io/***` | DSN de reporting d'erreurs |

---

## 3. Configuration du Webhook Chariow en Production

1. Se connecter à l'espace marchand Chariow : `https://chariow.dev`.
2. Accéder à l'onglet **Développeurs** > **Webhooks** (Pulse).
3. Cliquer sur **Ajouter un point de terminaison** :
   - **URL du webhook :** `https://africaworldsaving.com/api/webhooks/chariow`
   - **Événements écoutés :**
     - `checkout.completed`
     - `payment.succeeded`
     - `payment.failed`
     - `subscription.created`
     - `subscription.cancelled`
4. Copier le **Secret de signature** généré et l'assigner à `CHARIOW_WEBHOOK_SECRET` dans Vercel.
5. Effectuer un envoi d'événement de test (« Ping ») depuis la console Chariow et vérifier la réponse HTTP `200 OK`.

---

## 4. Procédure de Sauvegarde et Restauration Neon (PITR)

### 4.1 Sauvegardes Automatiques
- Neon effectue une journalisation continue des transactions (WAL).
- Les snapshots et WAL sont conservés pendant 30 jours avec possibilité de restauration à la seconde près.

### 4.2 Restauration en Cas de Corruption de Données (Point-In-Time)
En cas d'incident critique ou d'erreur humaine en production :
1. Se connecter à la [Console Neon](https://console.neon.tech).
2. Sélectionner le projet **AWS : Africa World Saving** > onglet **Branches**.
3. Cliquer sur **Create Branch** > cocher **From point in time**.
4. Définir le timestamp exact (ex. : `2026-11-12 14:28:00 UTC`, 2 minutes avant l'incident).
5. Nommer la branche restaurée (ex. `recovery-20261112`).
6. Vérifier l'intégrité des données dans la branche restaurée via SQL Editor.
7. Mettre à jour la variable `DATABASE_URL` dans Vercel pour pointer vers la branche rétablie, ou fusionner les données nécessaires.

---

## 5. Plan de Recette Post-Lancement (Smoke Tests)

À l'issue du déploiement en production, exécuter dans l'ordre les 10 vérifications suivantes :

| Test | URL cible | Résultat Attendu |
|---|---|---|
| **1. Page d'Accueil** | `https://africaworldsaving.com/fr` | Scène 3D Cosmos Sacré chargée ou fallback élégant sur appareil à faible GPU, score Lighthouse ≥ 90. |
| **2. Sélecteur de Langue** | `https://africaworldsaving.com/en` | Bascule instantanée en anglais, traductions intégrales sans chaîne manquante. |
| **3. Consultation Découverte** | `/fr/consultations/decouverte-gratuite` | Formulaire accessible, sélection de créneau fluide, confirmation immédiate. |
| **4. Espace Praticiens** | `/fr/practitioners/maitre-dossou-agboville` | Profil complet, qualifications, avis authentiques affichés. |
| **5. Boutique & Panier** | `/fr/boutique` | Ajout au panier, ouverture du Drawer, persistance du panier, redirection Chariow. |
| **6. Forum Communautaire** | `/fr/forum/eveil-spiritualite` | Affichage des catégories, lecture des sujets, formulaire de réponse rapide. |
| **7. Quiz Spirituel** | `/fr/quiz` | Déroulement des 5 questions, attribution de l'archétype, code promo `BIENVENUE-AWS-15`. |
| **8. Rituels Quotidiens** | `/fr/rituels` | Calcul de la phase lunaire, validation des micro-pratiques, incrémentation du streak. |
| **9. Tableaux de Bord** | `/fr/dashboard` | Redirection selon le rôle (`client`, `praticien`, `admin`). |
| **10. En-têtes de Sécurité** | `curl -I https://africaworldsaving.com` | Présence de `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options: DENY`. |

---

## 6. Surveillance, Monitoring & Alertes

### 6.1 Seuils d'Alerte Recommandés
- **Taux d'erreur 5xx (Vercel) :** Seuil d'alerte à > 1% des requêtes sur 5 minutes.
- **Latence P95 :** Seuil d'alerte si le temps de réponse API dépasse 1500 ms.
- **Erreurs Webhook Chariow :** Alerte immédiate (Slack/Email) dès qu'un webhook Chariow retourne une réponse non-2xx.
- **Connexions Neon :** Alerte si le pool de connexions atteint 80% de saturation.

---

## 7. Procédure de Rollback d'Urgence

Si un bogue critique bloque les réservations ou les paiements après un déploiement :
1. Dans la console Vercel > onglet **Deployments**.
2. Repérer le déploiement précédent stable (vérifié avec succès).
3. Cliquer sur les trois points `...` > **Promote to Production** (Redéploiement instantané en moins de 15 secondes sans re-build).
4. Si le problème est lié à une migration SQL récente, exécuter la procédure de retour arrière sur Neon via une branche de sauvegarde.
