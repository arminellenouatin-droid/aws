# PROMPT ANTIGRAVITY — « AWS : Africa World Saving »

> À coller tel quel dans Antigravity (mode Planning). Si le prompt est trop long pour un seul message, enregistre ce fichier à la racine du projet sous `docs/BRIEF.md` et donne à l'agent la consigne : « Lis intégralement docs/BRIEF.md, puis produis un plan avant de coder. »

---

## 0. RÔLE ET MODE DE TRAVAIL

Tu es une équipe senior complète : architecte logiciel, lead front-end créatif 3D (WebGL), ingénieur back-end/sécurité, expert SEO, expert conversion (CRO), UX/UI designer, juriste-conformité (RGPD / protection des données), et DevOps.

Ta mission : concevoir et livrer **de bout en bout** un site de spiritualité premium, 3D animé, rapide, sécurisé et très convertissant, nommé **« AWS : Africa World Saving »**.

**Méthode obligatoire :**
1. **Avant tout code** : lis ce brief en entier, installe les skills listés en section 3, puis produis un **plan d'implémentation** (artifact) découpé en phases (section 17) et attends ma validation.
2. Travaille **phase par phase**. À la fin de chaque phase : lance lint + typecheck + tests + build, corrige tout, fais un commit Git clair (Conventional Commits), puis résume ce qui est fait, ce qui reste, et les décisions prises.
3. **N'invente jamais** une API, un endpoint, une option de bibliothèque ou un lien. Si tu as un doute, **lis la documentation officielle** (liens en section 3 et 4) avant d'écrire le code. En particulier pour **Chariow** : lis https://chariow.dev avant toute intégration.
4. Si une information manque (clé API, nom de domaine, texte juridique, prix, contenus), **crée un placeholder clairement marqué `TODO_CLIENT`** et liste-le dans `docs/TODO_CLIENT.md`. Ne bloque pas le projet.
5. Aucun secret en dur dans le code ou dans Git. Jamais.
6. Tout le code est en **TypeScript strict**. Code propre, commenté quand nécessaire, modulaire, testé.

---

## 1. VISION DU PRODUIT

**Nom :** AWS : Africa World Saving
**Positionnement :** plateforme spirituelle africaine de référence : consultations en ligne (payantes ou gratuites), boutique de produits et services spirituels, communauté (forum), contenus (blog, méditations, formations).
**Promesse :** accompagnement spirituel sérieux, rassurant, accessible depuis un téléphone, partout en Afrique et dans la diaspora.
**Ton :** chaleureux, respectueux, mystique mais crédible, enraciné dans les traditions africaines, ouvert à toutes les sensibilités. Jamais agressif, jamais manipulateur.
**Cibles :** Afrique francophone (Bénin, Togo, Côte d'Ivoire, Sénégal, Cameroun, Congo, RDC, etc.) + diaspora (France, Belgique, Canada, USA). Majorité de trafic **mobile, connexions 3G/4G instables, téléphones d'entrée de gamme**.
**Langues :** français (par défaut) + anglais dès la v1, architecture i18n prête pour d'autres langues (portugais, langues locales).
**Devises :** XOF (FCFA) par défaut, EUR et USD affichés selon la zone, selon ce que Chariow supporte (à vérifier dans la doc).

### Direction artistique (à proposer puis valider)
- Univers : cosmos africain, terre, feu, eau, esprit. Palette sombre profonde (indigo nuit / noir-violet) + or / ambre + touches terre cuite et vert sacré. Très bon contraste (AA minimum).
- Typographies : un serif élégant pour les titres (ex. Cormorant Garamond ou Playfair Display) + un sans-serif très lisible pour le texte (ex. Inter ou Manrope). Auto-hébergées via `next/font`.
- Motifs : inspirations africaines subtiles (adinkra, bogolan, kuba) en SVG, sans cliché ni appropriation caricaturale.
- Expérience 3D (voir section 8) mise au service de l'émotion et de la conversion, jamais au détriment de la vitesse.

---

## 2. STACK TECHNIQUE (OBLIGATOIRE)

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | **Next.js (App Router) + React + TypeScript** (dernières versions stables) | React + SSR/SSG/ISR = SEO et rapidité |
| 3D | **three** + **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing** | 3D déclarative, performante |
| Animations | **GSAP + ScrollTrigger** (@gsap/react), **Motion** (ex Framer Motion), **Lenis** (smooth scroll) | Transitions et scroll cinématiques |
| UI | **Tailwind CSS** + **shadcn/ui** (Radix) + **lucide-react** | Design system rapide, accessible |
| État / données | **Zustand**, **TanStack Query**, **react-hook-form** + **zod** | État léger, validation partagée client/serveur |
| Base de données | **Neon** (PostgreSQL serverless) via `@neondatabase/serverless` + ORM **Drizzle** (`drizzle-orm`, `drizzle-kit`) | Postgres serverless, branches de DB par preview, PITR |
| Authentification | **Better Auth** (`better-auth`, adaptateur Drizzle : email/mot de passe, lien magique, Google, 2FA TOTP, rôles) | Neon fournit la base, pas l'auth : auth hébergée dans l'app |
| Temps réel (chat consultation, forum, notifications) | **Ably** (`ably`) ou Pusher Channels | Neon n'a pas de realtime intégré |
| Stockage de fichiers | **Vercel Blob** en accès **privé** (`@vercel/blob`) + URLs signées | Fichiers, pièces jointes, produits numériques |
| Paiement | **Chariow** (API REST `https://api.chariow.com/v1` + webhooks « Pulses ») | Exigé par le client |
| Visio / audio | **LiveKit** (`livekit-client`, `@livekit/components-react`) | Consultations vidéo/audio en ligne |
| Emails | **Resend** + **React Email** | Transactionnel + séquences |
| Anti-abus | **Cloudflare Turnstile** (`@marsidev/react-turnstile`) + **Upstash Ratelimit** (`@upstash/ratelimit`, `@upstash/redis`) | Anti-bot et rate limiting |
| Éditeur forum | **Tiptap** (`@tiptap/react`) + **isomorphic-dompurify** | Texte riche sécurisé |
| i18n | **next-intl** | FR/EN, SEO hreflang |
| SEO | Metadata API Next.js + **next-sitemap** + JSON-LD (`schema-dts`) | Référencement |
| Monitoring | **Sentry** (`@sentry/nextjs`), **Vercel Analytics + Speed Insights**, **PostHog** ou **Plausible** (analytics respectueux de la vie privée) | Erreurs, perf, conversion |
| PWA | **Serwist** (`@serwist/next`) | Installable, offline partiel, push |
| Tests | **Vitest**, **Testing Library**, **Playwright** (E2E), **axe-core** (a11y) | Qualité |
| Qualité | **ESLint**, **Prettier**, **Husky + lint-staged**, **commitlint** | Discipline |
| Hébergement | **Vercel** (front + API routes), **Neon** (DB) | Intégration native Vercel ↔ Neon |
| Code source et CI/CD | **GitHub** (dépôt privé, GitHub Actions, Dependabot, secret scanning, protection de branches) + déploiement Git → Vercel | Workflow PR → preview → production |
| Compression 3D | **@gltf-transform/cli**, **gltfpack**, Draco / KTX2 | Modèles légers |

> Si tu juges qu'un choix doit changer (ex. LiveKit vs autre), **propose l'alternative dans le plan avec justification**, ne change pas silencieusement.

---

## 3. SKILLS ANTIGRAVITY À INSTALLER AVANT DE COMMENCER

Les skills s'installent comme dossiers contenant un `SKILL.md`, dans `<projet>/.agent/skills/` (portée projet) ou dans le dossier global de skills d'Antigravity. **Vérifie le chemin exact dans la documentation Antigravity de ta version** avant d'installer.

**Skills à installer (clone puis copie des dossiers de skills voulus) :**

1. **Mes règles d'ingénierie et de sécurité (skill personnel, déjà créé)** : le skill Antigravity « problèmes d'ingénieur + sécurité/scalabilité » (concurrence, idempotence, résilience, scalabilité, contrôle d'accès/IDOR, migrations sans coupure, synchro hors ligne, IA fiable, systèmes distribués). Il est fourni en archive zip dans mon projet : **applique-le à ce site en priorité.** S'il est absent du workspace, demande-le-moi.
2. **Skills officiels Anthropic (dont `frontend-design`)** : https://github.com/anthropics/skills
   ```bash
   git clone https://github.com/anthropics/skills.git /tmp/anthropic-skills
   # copier les skills utiles (ex. frontend-design) vers .agent/skills/
   ```
3. **Skills Vercel (bonnes pratiques React/Next.js, règles web design)** : https://github.com/vercel-labs/agent-skills
   ```bash
   git clone https://github.com/vercel-labs/agent-skills.git /tmp/vercel-skills
   ```
4. **Ressources Neon / Postgres** : serveur MCP Neon (gestion des projets, branches et migrations par l'agent) : https://github.com/neondatabase/mcp-server-neon ; documentation IA de Neon : https://neon.com/docs. Vérifie dans la doc Neon s'il existe des skills officiels pour agents et installe-les le cas échéant. **Si tu actives le MCP Neon, limite-le à la branche de développement, jamais à la production.**
5. **Skills Three.js / React Three Fiber** : cherche dans GitHub un dépôt de skills Three.js/R3F maintenu (ex. `threejs-skills`), **vérifie sa fiabilité** (étoiles, dernière mise à jour, contenu du SKILL.md) avant d'installer. À défaut, utilise la doc officielle ci-dessous.

> **Règle de sécurité sur les skills :** lis le contenu de chaque `SKILL.md` et des scripts associés avant de les activer. N'exécute aucun script téléchargé sans l'avoir relu.

Ressources de design à consulter (inspiration et patterns, pas de copie) : https://www.awwwards.com (sites 3D/immersifs), https://threejs.org/examples, https://drei.docs.pmnd.rs, https://tympanus.net/codrops (démos WebGL/GSAP).

---

## 4. BIBLIOTHÈQUES, DÉPÔTS ET INSTALLATION

### 4.1 Initialisation
```bash
npx create-next-app@latest aws-africa-world-saving --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd aws-africa-world-saving
```
Doc : https://nextjs.org/docs

### 4.2 3D et animations
```bash
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing maath
npm i -D @types/three
npm i gsap @gsap/react motion lenis
```
- three : https://threejs.org / https://github.com/mrdoob/three.js
- React Three Fiber : https://r3f.docs.pmnd.rs / https://github.com/pmndrs/react-three-fiber
- Drei : https://github.com/pmndrs/drei
- Postprocessing : https://github.com/pmndrs/postprocessing
- GSAP : https://gsap.com/docs
- Motion : https://motion.dev
- Lenis : https://github.com/darkroomengineering/lenis
- Optimisation modèles : `npm i -D @gltf-transform/cli` → https://gltf-transform.dev

### 4.3 UI
```bash
npx shadcn@latest init
npm i lucide-react class-variance-authority clsx tailwind-merge
```
- shadcn/ui : https://ui.shadcn.com
- Tailwind : https://tailwindcss.com/docs
- Lucide : https://lucide.dev

### 4.4 Données, formulaires, état
```bash
npm i zustand @tanstack/react-query react-hook-form zod @hookform/resolvers
npm i @neondatabase/serverless drizzle-orm better-auth
npm i -D drizzle-kit
npm i ably @vercel/blob
npm i next-intl
```
- Neon + Next.js / Vercel : https://neon.com/docs/guides/nextjs ; intégration Vercel : https://vercel.com/marketplace/neon
- Drizzle ORM + Neon : https://orm.drizzle.team/docs/connect-neon
- Better Auth : https://www.better-auth.com/docs (plugins 2FA, magic link, admin/roles)
- Ably : https://ably.com/docs ; Vercel Blob : https://vercel.com/docs/storage/vercel-blob
- next-intl : https://next-intl.dev
- Zod : https://zod.dev

### 4.5 Temps réel, visio, emails
```bash
npm i livekit-client @livekit/components-react livekit-server-sdk
npm i resend @react-email/components
```
- LiveKit : https://docs.livekit.io
- Resend : https://resend.com/docs
- React Email : https://react.email

### 4.6 Sécurité et anti-abus
```bash
npm i @upstash/ratelimit @upstash/redis @marsidev/react-turnstile isomorphic-dompurify
```
- Upstash Ratelimit : https://github.com/upstash/ratelimit-js
- Turnstile : https://developers.cloudflare.com/turnstile
- DOMPurify : https://github.com/cure53/DOMPurify

### 4.7 Forum / contenu
```bash
npm i @tiptap/react @tiptap/pm @tiptap/starter-kit
```
- Tiptap : https://tiptap.dev

### 4.8 SEO, PWA, monitoring
```bash
npm i next-sitemap schema-dts @serwist/next serwist
npm i @sentry/nextjs @vercel/analytics @vercel/speed-insights
npx @sentry/wizard@latest -i nextjs
```
- next-sitemap : https://github.com/iamvishnusankar/next-sitemap
- Serwist : https://serwist.pages.dev
- Sentry : https://docs.sentry.io/platforms/javascript/guides/nextjs
- PostHog (option) : https://posthog.com/docs

### 4.9 Qualité et tests
```bash
npm i -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
npm i -D @playwright/test @axe-core/playwright
npm i -D prettier husky lint-staged @commitlint/cli @commitlint/config-conventional
npx playwright install
```
- Vitest : https://vitest.dev
- Playwright : https://playwright.dev
- axe : https://github.com/dequelabs/axe-core

### 4.10 Chariow (paiement)
- Portail développeur : **https://chariow.dev** (authentification, API Reference, webhooks, licences, MCP)
- Base URL API : `https://api.chariow.com/v1`
- Centre d'aide développeur : https://help.chariow.com/fr/articles/259-documentation-developpeur-and-api
- **Lis d'abord toute la doc** (Quick Start, Authentification, produits, ventes/checkout, webhooks) avant d'écrire le moindre code de paiement. Ne devine aucun nom de champ ni d'endpoint.

> **Vérification obligatoire :** avant d'installer, contrôle chaque paquet sur npm (nom exact, date de dernière publication, mainteneur) pour éviter le typosquatting. Épingle les versions (`package-lock.json` commité), `npm audit` à chaque phase.

---

## 5. ARCHITECTURE DU PROJET

```
src/
  app/
    [locale]/
      (public)/          # pages marketing, blog, boutique, praticiens
      (auth)/            # connexion, inscription, reset, 2FA
      (client)/          # espace client
      (praticien)/       # espace praticien
      (admin)/           # back-office administrateur
      forum/
    api/
      webhooks/chariow/  # réception des événements Chariow
      ...
  components/
    three/               # scènes, modèles, effets (lazy-loaded)
    ui/                  # shadcn
    sections/            # blocs de pages
  lib/
    db/ auth/ chariow/ security/ seo/ email/ livekit/ i18n/
  server/                # services métier, uniquement côté serveur
  hooks/ stores/ types/
public/
  models/ (glb compressés)  textures/ (ktx2/webp)  fonts/
drizzle/
  migrations/  seed/  policies/   # migrations Drizzle, seed, politiques RLS en SQL
docs/
  BRIEF.md  TODO_CLIENT.md  ARCHITECTURE.md  SECURITY.md  RUNBOOK.md
tests/
```

Principes : logique métier **côté serveur** (Server Actions / Route Handlers / services), composants client minimaux, **aucune clé secrète côté client**, validation `zod` partagée.

---

## 5 bis. WORKFLOW NEON + GITHUB + VERCEL (OBLIGATOIRE)

1. **GitHub** : dépôt **privé** `aws-africa-world-saving`. Branche `main` protégée (PR obligatoire, CI verte requise, revue, pas de push direct, historique linéaire), `CODEOWNERS`, **secret scanning + push protection** activés, **Dependabot** activé, 2FA sur tous les comptes.
2. **GitHub Actions** (`.github/workflows/ci.yml`) : `npm ci` → lint → typecheck → tests unitaires → build → `npm audit` → scan de secrets → E2E Playwright sur la preview. Les secrets de CI sont stockés dans GitHub Secrets, jamais dans le dépôt.
3. **Vercel** : projet relié au dépôt GitHub (déploiement automatique : PR → **preview**, `main` → **production**). Previews protégées. Variables d'environnement séparées Development / Preview / Production.
4. **Neon** : installer l'**intégration Neon pour Vercel** (https://vercel.com/marketplace/neon) pour injecter `DATABASE_URL` et créer **une branche de base de données par preview** ; la production utilise la branche principale de Neon. Les données de production **ne sont jamais copiées** vers les previews sans anonymisation. Activer la restauration à un instant donné (PITR) et documenter la procédure de restauration. Action GitHub possible pour une branche Neon par PR : https://github.com/neondatabase/create-branch-action (vérifier la doc avant usage).
5. **Migrations** : Drizzle (`drizzle-kit generate` puis `migrate`) exécutées **en CI/déploiement via `DATABASE_URL_UNPOOLED`**, jamais depuis le client ; migrations **sans coupure** (expand/contract) ; revue obligatoire des migrations en PR.
6. **Connexions** : utiliser le driver serverless Neon (`@neondatabase/serverless`) adapté au runtime (HTTP pour requêtes simples, WebSocket/Pool pour les transactions). Gérer les démarrages à froid (cold starts) de la base avec timeouts et retries.

---

## 6. RÔLES ET COMPTES

Rôles (RBAC strict, appliqué **côté serveur (couche d'accès aux données) ET par RLS Postgres en défense en profondeur**) :
- `visiteur` (non connecté)
- `client` (membre)
- `membre_premium` (abonné)
- `praticien` (voyant / guide / consultant)
- `moderateur` (forum)
- `support`
- `admin`
- `super_admin`

### Compte administrateur (impératif)
- **Aucun mot de passe par défaut dans le code.** Création du premier `super_admin` via un **script de seed sécurisé** (`npm run seed:admin`) qui lit l'email et un mot de passe temporaire depuis les variables d'environnement, force le changement de mot de passe à la première connexion.
- **2FA TOTP obligatoire** pour `admin`, `super_admin` et `praticien` (apps d'authentification), codes de secours.
- Route admin non indexée (`noindex`), protégée par middleware + vérification de rôle serveur à chaque action, **journal d'audit** immuable (qui, quoi, quand, IP hachée).
- Sessions admin courtes, ré-authentification pour les actions sensibles (remboursement, suppression, changement de rôle, export de données).
- Le `super_admin` peut créer/suspendre des admins ; un admin ne peut pas s'élever lui-même.

---

## 7. PAGES À CRÉER

### 7.1 Pages publiques (SEO, ultra-optimisées)
1. **Accueil** : héro 3D immersif, promesse claire, CTA principaux (« Consulter maintenant », « Consultation gratuite »), preuves sociales, offres vedettes, praticiens, témoignages vérifiés, FAQ, newsletter.
2. **À propos / Notre mission** : histoire, valeurs, éthique, équipe.
3. **Consultations** (liste) + **page par type de consultation** (voyance, guidance, retour d'affection, prospérité et chance, protection spirituelle, déblocage, purification, spiritualité et travail, etc. : intitulés à valider par moi, sans promesses garanties).
4. **Praticiens** (liste) + **fiche praticien** (bio, spécialités, langues, disponibilités, avis, tarifs).
5. **Réservation / Prise de rendez-vous** (tunnel court).
6. **Consultation gratuite / découverte** (page dédiée de conversion, quotas anti-abus).
7. **Boutique** : catégories, liste produits, **fiche produit**, panier, checkout via Chariow. Produits physiques (bougies, encens, bains, objets rituels, talismans) et **numériques** (e-books, audios de méditation, formations, rituels guidés).
8. **Services spirituels** (prestations à la demande avec formulaire de demande).
9. **Abonnements / Cercle premium** (avantages, tarifs, comparatif).
10. **Formations / Académie** (cours vidéo/audio, progression).
11. **Blog / Magazine spirituel** (articles SEO, catégories, tags, auteur, temps de lecture, articles liés).
12. **Forum** (public en lecture, inscription pour participer) : accueil, catégories, sujet, profil membre.
13. **Quiz / Test spirituel** (ex. « Quel est ton blocage spirituel ? ») : lead magnet qui mène vers une offre.
14. **Témoignages / Résultats** (preuves sociales vérifiées, avec consentement).
15. **FAQ** (balisage FAQPage).
16. **Contact** (formulaire sécurisé + WhatsApp).
17. **Programme de parrainage / affiliation**.
18. **Pages légales** : Mentions légales, CGU, CGV, Politique de confidentialité, Politique cookies, Politique de remboursement, **Avertissement spirituel** (voir section 12), Charte de la communauté.
19. **Pages d'erreur** : 404, 500, maintenance, hors-ligne (PWA).
20. **Plan du site HTML** + `sitemap.xml` + `robots.txt`.

### 7.2 Authentification
Inscription, connexion (email + mot de passe, **lien magique**, option Google), vérification d'email, mot de passe oublié, 2FA, gestion des sessions/appareils, suppression de compte (droit à l'effacement).

### 7.3 Espace client
- Tableau de bord (prochaines consultations, rappels, recommandations)
- **Mes consultations** (à venir, passées, annuler/reprogrammer selon règles, compte rendu, notes)
- **Salle de consultation** (chat texte, audio, visio, partage de fichiers, minuteur)
- **Mes commandes** (suivi, statut, factures/reçus PDF, téléchargements numériques sécurisés)
- **Mes abonnements** (statut, renouvellement, annulation)
- **Mes formations** (progression)
- **Journal spirituel** privé (notes, intentions, rituels suivis)
- **Message / horoscope / citation du jour** (rétention)
- **Favoris** (praticiens, produits)
- **Messagerie** avec praticien (avant/après consultation)
- **Notifications** (email, push web, WhatsApp opt-in) et préférences
- **Parrainage** (lien, gains, historique)
- **Profil et confidentialité** (infos, langue, fuseau horaire, export de mes données, suppression du compte)

### 7.3 bis Espace praticien
Tableau de bord, **calendrier de disponibilités** (fuseaux horaires, congés), demandes de consultation, salle de consultation, revenus et reversements, avis reçus, profil public, ressources internes, messagerie.

### 7.4 Espace administrateur (back-office)
- Tableau de bord KPI : revenus, conversions, panier moyen, LTV, rétention, trafic, consultations, taux de remplissage, tickets, remboursements
- Gestion **utilisateurs et rôles**, praticiens (validation, KYC léger, suspension)
- Gestion **consultations** (types, tarifs, durées, plannings, litiges)
- Gestion **boutique** (produits, stocks, variantes, prix multi-devises, commandes, expéditions, remboursements) + synchronisation Chariow
- Gestion **abonnements et codes promo**
- Gestion **blog/CMS** (éditeur riche, planification, SEO par page)
- **Modération forum** (signalements, file d'attente, bannissements, mots interdits)
- **Avis et témoignages** (validation)
- **Emails et campagnes** (séquences, templates)
- **Paramètres** (SEO global, bannière, maintenance, devises, taxes, pages légales éditables)
- **Journal d'audit**, journal des webhooks Chariow, santé du système
- **Exports** (CSV) protégés et journalisés
- Gestion du **consentement et demandes RGPD** (accès, effacement)

---

## 8. EXPÉRIENCE 3D ET ANIMATIONS (ULTRA SOIGNÉES MAIS LÉGÈRES)

### Scènes à concevoir (R3F + drei + postprocessing)
- **Héro d'accueil** : cosmos africain vivant (champ d'étoiles en particules GPU, aurores / nébuleuse en shader, orbe lumineuse ou masque/symbole sacré stylisé flottant, réaction douce au curseur / gyroscope mobile).
- **Transitions de page** : passage fluide entre pages (rideau de particules, fondu de lumière, morph de formes), via GSAP + Motion, sans écran blanc.
- **Scroll cinématique** : GSAP ScrollTrigger + Lenis ; la caméra 3D avance au fil du scroll (« voyage spirituel ») sur l'accueil et la page à propos.
- **Sections 3D contextuelles** : cartes de consultations avec tilt 3D, cristaux/éléments (feu, eau, terre, air) animés sur les catégories, produits 3D inspectables (drei `Stage`, `OrbitControls` limités) pour la boutique.
- **Micro-interactions** : boutons magnétiques, curseur personnalisé (desktop), ripple lumineux, compteurs animés, révélations au scroll, skeletons élégants.

### Règles de performance 3D (non négociables)
- Canvas **chargé en lazy** (`next/dynamic`, `ssr: false`) **après** le LCP ; contenu textuel et CTA visibles immédiatement, indépendants de la 3D.
- **Détection de capacité** : `PerformanceMonitor` + `AdaptiveDpr` de drei, DPR plafonné (≤ 2), qualité adaptative (désactiver postprocessing, réduire particules sur appareil faible, connexion lente via `navigator.connection.saveData`, ou batterie faible).
- **Fallback sans WebGL / `prefers-reduced-motion` / mode économie de données** : image/vidéo légère ou animation CSS, aucune perte de fonctionnalité.
- Modèles `.glb` **compressés** (Draco/Meshopt, textures KTX2/WebP), objectif **< 2 Mo cumulés** pour la scène d'accueil, géométries instanciées, `frameloop="demand"` quand la scène est statique, pause hors viewport (IntersectionObserver), nettoyage mémoire (dispose) au démontage.
- Une seule instance Canvas persistante si possible (portails drei `View`) pour éviter les recréations de contexte WebGL.
- Respecter `prefers-reduced-motion` partout (GSAP, Lenis, Motion).
- Budget : 60 fps sur mobile moyen de gamme ; sinon dégrader automatiquement.

---

## 9. FONCTIONNALITÉS MÉTIER DÉTAILLÉES

### 9.1 Consultations (payantes et gratuites)
- **Formats :** chat texte, appel audio, visio (LiveKit), consultation **par écrit** (réponse différée, formulaire détaillé).
- **Réservation :** disponibilités des praticiens, gestion des **fuseaux horaires** (Afrique/Europe/Amérique), créneaux, tampon entre séances, annulation/reprogrammation selon règles, rappels email + push + WhatsApp (opt-in) 24 h / 1 h avant.
- **Tarification :** tarif par type/durée/praticien, **forfaits et packs**, codes promo, offre **première consultation gratuite ou découverte** avec **quotas et anti-abus** (1 par personne vérifiée, vérification email/téléphone, Turnstile, détection de comptes multiples, limitation par IP/appareil).
- **Paiement avant confirmation** : le créneau n'est confirmé qu'après réception du **webhook Chariow validé** (voir 10). Réservation temporaire (hold) de 10–15 min avec libération automatique.
- **Salle de consultation :** chat temps réel (Ably, canaux privés authentifiés par jeton serveur), audio/visio (LiveKit, jetons serveur à durée courte), minuteur, prolongation payante, partage de fichiers (type/poids limités, scan), fin automatique, **compte rendu** et avis post-séance.
- **Confidentialité :** aucune session enregistrée sans consentement explicite ; transcriptions chiffrées, accès limité au client et au praticien concerné (couche d'accès + RLS).

### 9.2 Boutique
- Produits **physiques** (variantes, stock, livraison, suivi manuel de statut) et **numériques** (téléchargement par **URL signée expirante**, clés/licences si utile via Chariow).
- Panier persistant, codes promo, **ventes additionnelles** (upsell/cross-sell, « souvent acheté avec »), bundles, avis vérifiés.
- Pages produit ultra-convertissantes : galerie + vue 3D, bénéfices, mode d'emploi, preuves sociales, garantie, FAQ produit, CTA collant sur mobile.

### 9.3 Forum
- Catégories (guidance, rêves, rituels, prospérité, témoignages, questions aux praticiens, etc.), sujets, réponses imbriquées, éditeur Tiptap **assaini côté serveur**, likes, citations, recherche plein texte (Postgres FTS), tags, épinglage, verrouillage.
- **Pseudonymes** (pas d'identité réelle exposée), avatars, niveaux/badges d'ancienneté.
- **Modération :** signalement, file d'attente, mots interdits, anti-spam (rate limit, Turnstile, liens limités pour nouveaux comptes), bannissement/suspension, journal de modération.
- **Charte** acceptée à l'inscription : pas de haine, pas de conseils médicaux dangereux, pas de démarchage, pas de partage de données personnelles.
- Zones **réservées aux membres premium**. Notifications de réponses. SEO : fils publics indexables, `DiscussionForumPosting` en JSON-LD, pagination propre, canonical.

### 9.4 Contenus et rétention
- **Blog** SEO, **newsletter** (double opt-in), **message/horoscope du jour**, **journal spirituel**, **séries de rituels** (7/21/40 jours) avec rappels et **streaks**, **points de fidélité**, **parrainage** à double bénéfice, emails de **bienvenue**, **panier abandonné**, **réactivation**, **anniversaire**, **post-consultation** (avis + recommandation), notifications **push web** (opt-in), lien communautaire WhatsApp/Telegram.

### 9.5 Conversion (CRO)
- Parcours **court** (≤ 3 étapes jusqu'au paiement), **invité possible** (création de compte après paiement).
- Preuves sociales **vérifiées** (jamais fabriquées), badges de confiance (paiement sécurisé, confidentialité, praticiens vérifiés), garanties **honnêtes** (satisfaction/remboursement conforme à la politique, sans promesse de résultat).
- CTA collants sur mobile, bouton WhatsApp, **quiz lead magnet**, exit-intent discret, urgence **réelle uniquement** (créneaux restants réels).
- **A/B testing** prêt (PostHog feature flags ou équivalent), événements d'analytics sur tout l'entonnoir (vue → ajout panier → checkout → paiement → consultation réalisée → avis → réachat).
- Éthique : aucune manipulation (pas de fausse rareté, pas d'exploitation de la détresse, pas de pression).

### 9.6 Marketing
- Tracking propre (UTM, referrer), **pixels** (Meta, TikTok, Google) chargés **uniquement après consentement**, événements serveur (conversions API) quand possible.
- Pages d'atterrissage par campagne, partage social (OG images dynamiques), programme d'affiliation, codes promo par influenceur, **flux social proof** temps réel (anonymisé).

---

## 10. INTÉGRATION CHARIOW (PAIEMENT)

**Obligation : lire https://chariow.dev avant d'implémenter. Ne rien supposer.**

Principes d'architecture :
1. **Source de vérité = base de données serveur + confirmation Chariow par webhook (« Pulse »).** Une redirection de retour vers le site n'est **jamais** une preuve de paiement.
2. **Clés API Chariow uniquement côté serveur** (variables d'environnement, jamais exposées au client).
3. **Création de commande** côté serveur : calcul des prix **sur le serveur** à partir de la base (jamais depuis le client), création d'une commande `pending` avec identifiant interne unique, puis création/redirection vers le checkout Chariow selon la doc.
4. **Webhook** `POST /api/webhooks/chariow` :
   - vérifier l'**authenticité** de la requête selon le mécanisme documenté par Chariow (signature/secret) ; **rejeter** sinon ;
   - **idempotence** : stocker l'identifiant d'événement, ignorer les doublons ;
   - traiter les événements utiles (vente réussie, paiement échoué, abonnement créé/annulé/renouvelé, remboursement) selon la liste documentée ;
   - **vérifier montant, devise et référence de commande** avant de valider ;
   - transactions SQL atomiques (commande → payée, créneau → confirmé, accès numérique ouvert, email envoyé) ;
   - répondre vite (2xx) et déporter le travail lourd en tâche asynchrone ; **retries** tolérés ;
   - journaliser dans une table `webhook_events` (payload brut chiffré/minimisé, statut, erreurs).
5. **Réconciliation** : tâche planifiée qui compare les commandes `pending` avec l'état réel chez Chariow (appel API) pour rattraper tout webhook manqué.
6. **Abonnements** (cercle premium) : synchroniser statut/renouvellement/annulation via webhooks ; accès membre premium lié au statut réel.
7. **Remboursements/litiges** : workflow admin, mise à jour des droits d'accès, traçabilité.
8. **Reçus/factures** PDF générés côté serveur.
9. **Mode test (sandbox)** si disponible dans Chariow ; tests automatisés avec payloads de webhook simulés (signature valide/invalide, doublon, montant altéré).
10. Ne **jamais** stocker de données de carte/mobile money : tout passe par Chariow. Conformité PCI déléguée.
11. Si Chariow ne couvre pas un besoin (ex. produits physiques avec livraison, multi-vendeurs/reversements praticiens), **dis-le dans le plan** et propose une solution (suivi de commande en interne, reversements manuels tracés).

Variables d'environnement attendues (noms indicatifs, à adapter à la doc) : `CHARIOW_API_KEY`, `CHARIOW_WEBHOOK_SECRET`, `CHARIOW_API_URL=https://api.chariow.com/v1`.

---

## 11. SÉCURITÉ — RÈGLES OBLIGATOIRES (À RESPECTER DE BOUT EN BOUT)

Appliquer aussi le skill personnel « règles d'ingénierie et de sécurité ». En cas de conflit, **la règle la plus stricte gagne.** Chaque phase doit passer la check-list de la section 16.

### 11.1 Secrets
- Aucun secret dans le code, les commits, les logs, les messages d'erreur ni le client. `.env*` dans `.gitignore`, `.env.example` sans valeurs réelles.
- Secrets uniquement dans les variables d'environnement Vercel (et GitHub Actions secrets pour la CI) ; séparation **dev / preview / production** ; rotation documentée.
- Seules les variables préfixées `NEXT_PUBLIC_` sont publiques, et ne contiennent **que** des données non sensibles.
- Scanner les secrets (gitleaks / secret scanning GitHub) en CI.

### 11.2 Contrôle d'accès (côté serveur, toujours)
- **Ne jamais faire confiance au client.** Chaque Server Action / Route Handler vérifie : authentification, rôle, **propriété de la ressource** (anti-IDOR).
- **Neon n'impose pas d'auth ni de RLS automatique : la sécurité d'accès est de ta responsabilité.** Toute lecture/écriture passe par une **couche d'accès aux données (DAL) serveur** unique (`src/server/`) qui vérifie session, rôle et propriété de la ressource. Aucune requête SQL directe depuis un composant ou une route sans passer par la DAL.
- **RLS Postgres en défense en profondeur** sur toutes les tables sensibles (consultations, messages, notes, journal, commandes, paiements, données personnelles) : l'application se connecte avec un **rôle Postgres non propriétaire** (pas `neon_owner`), et chaque transaction positionne l'utilisateur courant via `set_config('app.current_user_id', ..., true)` ; politiques « deny by default ». Tester chaque politique (tests SQL / E2E avec différents rôles).
- Deux chaînes de connexion : `DATABASE_URL` (poolée, rôle applicatif limité) pour l'app, `DATABASE_URL_UNPOOLED` (rôle migration) **uniquement** pour les migrations en CI. Jamais exposées au client.
- Principe du moindre privilège pour chaque rôle et chaque clé.

### 11.3 Authentification et mots de passe
- Hachage fort (scrypt ou Argon2id via Better Auth ; vérifier la configuration), politique de mots de passe (longueur ≥ 12, vérification de mots de passe compromis si possible), pas de limite stupide de caractères.
- **2FA** obligatoire pour admin/praticien, proposée aux clients. Verrouillage progressif après échecs, notifications de connexion suspecte.
- Réinitialisation par lien à usage unique et expirant vite ; messages d'erreur génériques (pas d'énumération de comptes).

### 11.4 Sessions et cookies
- Cookies `HttpOnly`, `Secure`, `SameSite=Lax/Strict`, durées courtes pour les rôles sensibles, rotation des tokens, révocation à la déconnexion et au changement de mot de passe.
- Protection **CSRF** (Server Actions + vérification d'origine, tokens pour les routes sensibles).

### 11.5 Base de données
- Requêtes **paramétrées** uniquement (pas de SQL concaténé), validation de schéma stricte.
- Migrations versionnées **sans coupure** (expand/contract), sauvegardes automatiques chiffrées + test de restauration, point-in-time recovery.
- Données sensibles (consultations, notes, journal spirituel) : minimisation, accès restreint, chiffrement au repos (et champ-à-champ pour les plus sensibles).
- Contraintes d'intégrité (FK, unique, check), transactions pour les opérations multi-étapes, **verrous / contraintes uniques** contre les doubles réservations et doubles paiements (concurrence).

### 11.6 Entrées utilisateur
- Validation **zod côté serveur** pour toute entrée (body, query, params, headers, fichiers).
- Assainissement du HTML riche (DOMPurify côté serveur), échappement par défaut de React, interdiction de `dangerouslySetInnerHTML` sans assainissement.
- **Uploads** : liste blanche de types MIME vérifiés par signature, taille max, noms aléatoires, stockage privé, URL signées, scan antivirus si possible, pas d'exécution.

### 11.7 Réseau et en-têtes
- **HTTPS partout**, HSTS (preload), redirection HTTP→HTTPS.
- En-têtes : `Content-Security-Policy` stricte (nonces, pas de `unsafe-inline` si possible ; autoriser explicitement Ably, LiveKit, Chariow, Vercel Blob, analytics), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictive, `X-Frame-Options`/`frame-ancestors` (clickjacking), COOP/CORP si compatible.
- **CORS** restreint aux origines nécessaires. **Rate limiting** (Upstash) sur login, inscription, reset, formulaire de contact, paiement, forum, API publiques ; **Turnstile** sur les formulaires publics sensibles.
- Anti-SSRF si le serveur appelle des URLs fournies par l'utilisateur ; ne jamais proxifier d'URL arbitraire.

### 11.8 Résilience et idempotence
- **Idempotency keys** sur création de commande/paiement ; webhooks idempotents ; retries avec backoff ; timeouts ; circuit breakers ; dégradation gracieuse si un service tiers tombe (ex. LiveKit/Chariow).
- Files/tâches asynchrones pour emails, notifications, réconciliation.

### 11.9 Déploiement et chaîne logicielle
- CI : lint, typecheck, tests, `npm audit`, scan de dépendances (Dependabot/Renovate), scan secrets, build. **Aucun déploiement si la CI échoue.**
- Dépendances **épinglées**, revues avant mise à jour majeure, pas de paquets douteux ; `npm ci` en CI.
- Environnements séparés, protection des previews (mot de passe/Vercel Auth), variables distinctes, accès restreints aux projets Vercel, Neon et au dépôt GitHub, 2FA sur tous les comptes d'infrastructure.
- Logs **sans données personnelles ni secrets**, Sentry avec scrubbing, alertes sur anomalies (pics d'erreurs, échecs de paiement, tentatives de connexion).
- **Journal d'audit** des actions sensibles. Plan de réponse à incident documenté (`docs/SECURITY.md`) : détection, confinement, notification (APDP/utilisateurs si requis), post-mortem.

### 11.10 Sécurité spécifique à ce métier
- Les utilisateurs partagent des **informations intimes et vulnérables** : confidentialité maximale, aucune revente/partage de données, séparation stricte praticien/client.
- Lutte contre la **fraude** : faux comptes pour la gratuité, chargebacks, usurpation de praticiens (vérification d'identité des praticiens), **arnaques** (interdire toute demande d'argent hors plateforme, bannir tout contact direct hors cadre dans la messagerie pour les nouveaux comptes, signalement visible).

---

## 12. LÉGAL, ÉTHIQUE ET CONFORMITÉ

> Je ne suis pas juriste : **produis des textes de base complets et clairement marqués « à faire valider par un juriste »** avant publication.

- **Protection des données :** conformité au cadre applicable au Bénin (**Code du numérique**, **APDP** — Autorité de protection des données personnelles) **et** au **RGPD** pour la diaspora/UE. Registre des traitements, base légale, durées de conservation, **consentement explicite** pour les données sensibles (convictions, vie privée), droits d'accès/rectification/effacement/portabilité (fonction « exporter mes données » et « supprimer mon compte » **réellement opérationnelles**), DPO/contact, sous-traitants listés (Neon, Vercel, GitHub, Ably, Chariow, Resend, LiveKit…), transferts hors UE/Afrique encadrés.
- **Cookies :** bannière de consentement granulaire (nécessaires / mesure / marketing), **aucun traceur non essentiel avant consentement**, preuve du consentement, retrait facile.
- **Consommateur :** CGV claires (prix TTC/HT, devises, délais, livraison, rétractation selon droit applicable, remboursements, litiges), CGU, mentions légales complètes, information précontractuelle avant paiement.
- **Avertissement spirituel (visible partout où pertinent) :** les consultations ont une vocation de **guidance spirituelle et de développement personnel**, **ne remplacent pas** un avis médical, psychologique, juridique ou financier ; **aucun résultat n'est garanti** ; pas de promesse de guérison, de gain d'argent ou de retour d'affection assuré. Ces formulations sont à appliquer aussi dans les textes marketing (importantes aussi pour les règles des régies publicitaires Meta/Google/TikTok).
- **Public :** services réservés aux **18 ans et plus** (case de confirmation + CGU). Procédure de détection/réaction en cas de **détresse** de l'utilisateur (ex. propos suicidaires) : message d'orientation vers des ressources d'aide et alerte modération/praticien.
- **Modération et contenu illicite :** procédure de signalement, retrait rapide, conservation des preuves selon la loi.
- **Praticiens :** contrat/charte (éthique, pas d'abus de faiblesse, pas de demande d'argent hors plateforme, confidentialité), vérification d'identité.
- **Propriété intellectuelle :** utiliser uniquement des assets libres de droits ou créés (modèles 3D, images, sons) ; tenir `docs/CREDITS.md` avec licences.
- **Accessibilité :** viser **WCAG 2.2 AA** (contrastes, navigation clavier, focus visibles, labels ARIA, textes alternatifs, sous-titres/transcriptions audio-vidéo, respect de `prefers-reduced-motion`).

---

## 13. SEO

- **Rendu** : SSG/ISR pour pages marketing/blog/boutique, SSR où nécessaire ; contenu textuel présent dans le HTML initial (la 3D ne doit pas masquer le contenu indexable).
- **Technique :** Metadata API (title/description uniques par page), canonical, **hreflang** FR/EN, Open Graph + Twitter Cards avec **images OG dynamiques** (`next/og`), `sitemap.xml` (dynamique), `robots.txt` (bloquer admin/espaces privés/panier), URL propres et stables, fil d'Ariane, pagination correcte, 301 gérées, 404 utiles.
- **Données structurées JSON-LD** : `Organization`, `WebSite` (+ SearchAction), `Service`/`ProfessionalService`, `Product` + `Offer` + `AggregateRating` (avis **réels** seulement), `Person` (praticiens), `Article`/`BlogPosting`, `FAQPage`, `BreadcrumbList`, `DiscussionForumPosting`, `Course`.
- **Contenu :** architecture en silos (piliers + clusters), maillage interne, blog avec intentions de recherche (ex. « consultation spirituelle en ligne Bénin », « voyant sérieux Afrique », « rituel de protection »), titres H1–H3 propres, images optimisées avec `alt`, E-E-A-T (pages auteurs/praticiens, transparence, mentions, avis).
- **Local/Afrique :** pages par pays si pertinent (contenu réellement utile, pas de doublons), vitesse sur réseaux lents.
- **Suivi :** Google Search Console + Bing Webmaster (vérification via `TODO_CLIENT`), rapport de Core Web Vitals.

---

## 14. PERFORMANCE (OBJECTIFS CHIFFRÉS)

- **Mobile Lighthouse ≥ 90** (Performance, Accessibilité, Bonnes pratiques, SEO) sur accueil, consultation, produit, blog.
- **LCP < 2,5 s, INP < 200 ms, CLS < 0,1** (réseau 4G simulé, appareil moyen).
- JS initial < ~200 Ko gzip (hors chunk 3D chargé en différé), images `next/image` (AVIF/WebP, tailles responsives), `next/font`, `loading="lazy"`, préconnexions ciblées, pas de bibliothèques inutiles (tree-shaking, `next/dynamic`, analyse `@next/bundle-analyzer`).
- Cache : ISR + `stale-while-revalidate`, CDN Vercel, cache des requêtes TanStack Query, index SQL adaptés, requêtes N+1 interdites, pagination partout.
- **PWA (Serwist)** : installable, page hors-ligne, mise en cache des assets, notifications push (opt-in).
- Mode **économie de données** (désactive 3D lourde, vidéo auto, images haute définition).

---

## 15. MODÈLE DE DONNÉES (SCHÉMA DRIZZLE + MIGRATIONS DANS `drizzle/migrations`)

Tables principales (toutes avec `created_at`/`updated_at`, clés UUID, accès via la DAL, RLS sur les tables sensibles ; y inclure les tables d'auth de Better Auth : `user`, `session`, `account`, `verification`, `twoFactor`) :
`profiles`, `roles`/`user_roles`, `practitioners`, `practitioner_availability`, `consultation_types`, `consultations` (statut, créneau, format, prix, paiement), `consultation_messages`, `consultation_notes`, `reviews`, `products`, `product_variants`, `product_files`, `carts`, `orders`, `order_items`, `payments` (réf. Chariow), `subscriptions`, `coupons`, `referrals`, `courses`/`lessons`/`enrollments`, `journal_entries`, `forum_categories`/`threads`/`posts`/`reactions`/`reports`, `blog_posts`, `notifications`, `push_subscriptions`, `webhook_events`, `audit_logs`, `consents`, `data_requests`, `feature_flags`, `settings`.

Exigences : contraintes uniques contre les doubles réservations (practitioner + créneau), index sur toutes les clés de recherche, soft delete + purge conforme aux durées légales, fonctions SQL sécurisées (`SECURITY DEFINER` avec `search_path` fixé et usage minimal).

---

## 16. CHECK-LISTE « DEFINITION OF DONE » (À PASSER À CHAQUE PHASE)

- [ ] Lint, typecheck, tests unitaires, E2E, `npm audit` : **tous verts**
- [ ] Aucun secret dans le code ni l'historique Git
- [ ] Accès via la DAL + RLS testée sur chaque nouvelle table sensible ; test IDOR sur chaque nouvelle route
- [ ] Entrées validées côté serveur ; sorties échappées/assainies
- [ ] Rate limiting et anti-bot sur les nouveaux formulaires
- [ ] Accessibilité : axe sans erreur critique, navigation clavier OK
- [ ] Lighthouse mobile ≥ 90, Core Web Vitals dans les budgets
- [ ] Fallback sans WebGL / reduced-motion testé
- [ ] Responsive vérifié : 320, 375, 768, 1024, 1440+ px
- [ ] Textes FR/EN complets (aucune chaîne en dur)
- [ ] Documentation mise à jour (`docs/`)
- [ ] Commit(s) propres et résumé de phase

---

## 17. PLAN PAR PHASES (LIVRABLES)

**Phase 1 — Fondations** : projet Next.js, TypeScript strict, Tailwind/shadcn, i18n, structure, lint/tests/CI, design tokens, direction artistique validée (moodboard + maquettes clés), en-têtes de sécurité, Sentry, environnements.
**Phase 2 — Base de données et authentification** : connexion Neon + Drizzle, schéma + migrations + RLS + seed, Better Auth (email, lien magique, Google), 2FA, rôles, compte `super_admin` sécurisé, journal d'audit.
**Phase 3 — Design system et 3D** : composants UI, scène héro 3D, transitions de page, scroll cinématique, fallbacks, optimisation modèles.
**Phase 4 — Pages publiques et SEO** : accueil, à propos, listes/fiches consultations et praticiens, blog, FAQ, contact, pages légales, JSON-LD, sitemap, OG images, bannière cookies.
**Phase 5 — Consultations** : réservation, disponibilités, fuseaux horaires, consultation gratuite (anti-abus), salle chat/audio/visio, rappels, avis, compte rendu.
**Phase 6 — Boutique et Chariow** : produits, panier, checkout Chariow, webhooks, réconciliation, commandes, téléchargements sécurisés, abonnements, reçus.
**Phase 7 — Forum et communauté** : catégories, sujets, modération, anti-spam, notifications, parrainage.
**Phase 8 — Espaces client, praticien et admin** : tableaux de bord complets, KPI, CMS, modération, paramètres, exports, RGPD.
**Phase 9 — Rétention et marketing** : séquences email, push, quiz lead magnet, journal, rituels/streaks, pixels sous consentement, A/B testing.
**Phase 10 — Durcissement et lancement** : audit sécurité complet (checklist section 11), tests de charge, accessibilité, perf, sauvegardes/restauration, runbook, monitoring/alertes, déploiement Vercel (production + previews protégées), documentation finale, `docs/TODO_CLIENT.md` à jour.

---

## 18. VARIABLES D'ENVIRONNEMENT (`.env.example`, SANS VALEURS RÉELLES)

```
NEXT_PUBLIC_SITE_URL=
DATABASE_URL=                         # Neon, chaîne poolée, rôle applicatif limité, serveur uniquement
DATABASE_URL_UNPOOLED=                # Neon, rôle migration, CI/migrations uniquement
BETTER_AUTH_SECRET=                   # serveur uniquement
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=                 # serveur uniquement
ABLY_API_KEY=                         # serveur uniquement
BLOB_READ_WRITE_TOKEN=                # serveur uniquement
CHARIOW_API_KEY=                      # serveur uniquement
CHARIOW_WEBHOOK_SECRET=               # serveur uniquement
CHARIOW_API_URL=https://api.chariow.com/v1
LIVEKIT_URL=
LIVEKIT_API_KEY=                      # serveur uniquement
LIVEKIT_API_SECRET=                   # serveur uniquement
RESEND_API_KEY=                       # serveur uniquement
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=             # serveur uniquement
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=                 # serveur uniquement
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
ADMIN_SEED_EMAIL=                     # utilisé une seule fois par le script de seed
ADMIN_SEED_PASSWORD=                  # temporaire, changement forcé à la 1re connexion
```

---

## 19. RÈGLES FINALES POUR L'AGENT

1. **Plan d'abord, validation ensuite, code après.**
2. **Qualité avant vitesse** : pas de raccourcis sur la sécurité, l'accessibilité ou le légal.
3. **Pas de données factices en production** (témoignages, avis, compteurs) : uniquement des jeux de données de démo clairement identifiés et désactivés en production.
4. **Toute décision structurante est documentée** dans `docs/ARCHITECTURE.md`.
5. **En cas de doute sur une API ou une bibliothèque : lis la doc officielle, ne devine pas.**
6. À la fin : fournis un **rapport final** (ce qui est livré, comment lancer/tester/déployer, check-liste sécurité cochée, liste `TODO_CLIENT`, risques restants, recommandations).

**Commence maintenant : lis ce brief, installe les skills de la section 3, puis présente le plan d'implémentation détaillé de la Phase 1 à 10 pour validation.**
