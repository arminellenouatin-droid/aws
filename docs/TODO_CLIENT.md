# TODO CLIENT — AWS : Africa World Saving

Ce document répertorie l'ensemble des éléments, clés d'API, configurations tierces et contenus à fournir ou valider par le client.

---

## 1. Identifiants & Clés d'API

| Service | Variable d'environnement | Statut | Instructions |
|---|---|---|---|
| **Base de données Neon** | `DATABASE_URL`, `DATABASE_URL_UNPOOLED` | Fourni | Vérifié et opérationnel. |
| **Neon S3 Storage** | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3` | Fourni | Prêt pour les uploads et assets. |
| **Chariow** | `CHARIOW_API_KEY`, `CHARIOW_WEBHOOK_SECRET` | `TODO_CLIENT` | À générer depuis le dashboard développeur Chariow (`https://chariow.dev`). |
| **LiveKit** | `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` | `TODO_CLIENT` | Pour les consultations audio/visio. |
| **Ably** | `ABLY_API_KEY` | `TODO_CLIENT` | Pour la messagerie et le chat en temps réel. |
| **Resend** | `RESEND_API_KEY` | `TODO_CLIENT` | Pour l'envoi d'emails transactionnels. |
| **Cloudflare Turnstile** | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | `TODO_CLIENT` | Pour la protection anti-bot des formulaires. |
| **Upstash Redis** | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | `TODO_CLIENT` | Pour le rate limiting distribué. |
| **Google OAuth** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | `TODO_CLIENT` | Optionnel pour la connexion via compte Google. |
| **Sentry** | `SENTRY_DSN` | `TODO_CLIENT` | Pour le monitoring d'erreurs en production. |

---

## 2. Validation Juridique & Textes Réglementaires

> Les textes fournis par défaut dans l'application sont complets mais doivent être validés par un conseiller juridique avant exploitation publique.

- [ ] Validation des **Mentions Légales** (Raison sociale, siège, immatriculation, directeur de publication).
- [ ] Validation des **Conditions Générales de Vente (CGV)** et **Conditions Générales d'Utilisation (CGU)**.
- [ ] Validation de la **Politique de Confidentialité** selon le Code du Numérique du Bénin (déclaration APDP) et le RGPD.
- [ ] Validation de l'**Avertissement Spirituel** (clarification sur la nature de guidance personnelle, non substitution médicale/juridique, absence de promesse de résultat absolu).

---

## 3. Ressources & Contenus Métier

- [ ] Liste officielle des types de consultations, praticiens initiaux et grilles tarifaires en FCFA (XOF).
- [ ] Catalogue initial des produits physiques et numériques (e-books, méditations audio) de la boutique.
- [ ] Archive zip personnelle de sécurité (« règles d'ingénierie et de sécurité » mentionnée dans le brief si disponible).
