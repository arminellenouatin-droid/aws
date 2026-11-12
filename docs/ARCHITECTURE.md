# Architecture Technique — AWS : Africa World Saving

Ce document décrit l'architecture globale, les choix techniques structurants et les flux de données de la plateforme **AWS : Africa World Saving**.

---

## 1. Vue d'Ensemble du Système

AWS est conçu selon une architecture moderne fullstack Serverless sur **Next.js 15 (App Router)** et **Neon PostgreSQL**, optimisée pour le déploiement sur **Vercel** et l'infrastructure cloud haute disponibilité.

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Web / Mobile                    │
│   (Next.js 15 App Router, React 19, Three.js / R3F, Lenis)  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / WSS
┌──────────────────────────────▼──────────────────────────────┐
│                  Vercel Edge & Serverless API               │
│  - next-intl i18n Middleware (FR/EN)                        │
│  - Rate Limiter (Token bucket & Upstash Redis)              │
│  - Security Headers (CSP, HSTS, X-Frame-Options)            │
└──────┬──────────────────┬───────────────────┬───────────────┘
       │                  │                   │
┌──────▼──────┐   ┌───────▼────────┐  ┌───────▼────────┐
│ Server DAL  │   │ Auth & Session │  │ Chariow / Pay  │
│  (Database) │   │  (Better Auth) │  │  (Webhooks)    │
└──────┬──────┘   └───────┬────────┘  └───────┬────────┘
       │                  │                   │
┌──────▼──────────────────▼───────────────────▼───────────────┐
│                   Neon Serverless PostgreSQL                │
│             36 Tables Migrées (Drizzle ORM + RLS)           │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Couche d'Accès aux Données (Server DAL)

Pour garantir une étanchéité absolue et respecter le principe du moindre privilège, **aucun composant client n'interroge directement la base de données**.

Toutes les requêtes sont orchestrées par des modules DAL dédiés dans `src/server/dal/` :
- `auth.ts` : Gestion des sessions, rôles (`client`, `practitioner`, `admin`, `super_admin`) et permissions.
- `consultations.ts` : Moteur de créneaux multi-fuseaux horaires, réservation avec verrouillage anti-concurrence.
- `forum.ts` : Gestion des discussions communautaires, pagination par curseur, compteurs atomiques de réponses et réactions.
- `dashboard.ts` : Agrégation des indicateurs clients (séances, téléchargements, journal) et administratifs (recettes Chariow, signalements, audit logs).

---

## 3. Charte Graphique & Système Visuel

Conformément aux directives de design :
- **Atmosphère :** Sanctuaire lumineux pur, aéré et prestigieux. **Aucun fond sombre.**
- **Fond de page :** Blanc pur (`#ffffff` / `bg-white`) avec alternance de nappes célestes très douces (`#f8fafc` / `#f0f7ff`).
- **Typographie :** Noir profond haute lisibilité (`#09090b` / `text-slate-950`), assurant un contraste AAA selon WCAG 2.2.
- **Accents & Auras :** Bleu Ciel (`#38bdf8`, `#0ea5e9`, `#e0f2fe`) pour les reflets célestes, les lueurs 3D et les badges d'accompagnement.
- **Actions Prioritaires :** Bleu Pure (`#0052ff` / `#2563eb`) pour les boutons principaux, le panier, les validations d'achat et le sceau de marque.

---

## 4. Pipeline de Paiement Chariow (Mobile Money & Cartes)

```
[Client clique sur Payer]
       │
       ▼
[Route POST /api/checkout/chariow]
  ├── Vérification du Rate Limiting
  ├── Calcul des montants sur le serveur (depuis le catalogue certifié)
  ├── Création de la commande en statut 'pending'
  └── Appel API Chariow pour générer l'URL de paiement sécurisée
       │
       ▼
[Redirection vers le checkout Chariow (MTN, Moov, Orange, Wave, Carte)]
       │
       ▼ (Paiement effectué)
[Webhook entrant POST /api/webhooks/chariow]
  ├── Validation de la signature HMAC-SHA256 (x-chariow-signature)
  ├── Vérification de l'idempotence (aucun double traitement)
  ├── Transaction SQL atomique :
  │     ├── Commande marquée 'paid'
  │     ├── Génération du jeton de téléchargement numérique
  │     └── Confirmation du créneau de consultation
  └── Réponse HTTP 200 OK immédiate
```

---

## 5. Télécommunications & Consultations Live (LiveKit)

- **Protocole WebRTC sécurisé :** Flux audio et vidéo chiffrés de bout en bout hébergés sur LiveKit Cloud.
- **Génération de Tokens Serveur :** Route `/api/consultations/[id]/livekit-token` délivrant des jetons d'accès éphémères restreints aux seuls participants vérifiés (client et praticien titulaire).
- **Notes & Messagerie Chiffrée :** Enregistrement des intentions spirituelles et des comptes-rendus de séance avec restriction stricte d'accès aux deux parties.

---

## 6. Sécurité en Profondeur (Defense in Depth)

1. **Validation Zod & Sanitization :** Toutes les requêtes entrantes sont validées par Zod et nettoyées via DOMPurify (`isomorphic-dompurify`).
2. **Protection Anti-Bot :** Honeypot invisible et Cloudflare Turnstile sur les formulaires publics.
3. **Audit Logging :** Tracé systématique des actions sensibles (paiements, accès aux notes, modérations) dans la table `audit_logs`.
4. **Conformité APDP / RGPD :** Endpoints opérationnels pour l'export complet de données personnelles et la purge de compte.
