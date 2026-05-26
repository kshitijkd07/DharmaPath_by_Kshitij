# Dharma Path — UI Changelog

This document summarizes the frontend UI work completed for **Dharma Path**: what changed, how it was implemented, and what was intentionally left untouched (backend, APIs, auth, database).

---

## Overview

| Before | After |
|--------|--------|
| Orange/cream “generic spiritual” look | **Dark-first premium** UI: deep navy/charcoal, gold accents, glass cards |
| One-off styles per page | **Shared design system** via CSS variables + reusable components |
| Basic motion usage | **Central motion presets** + page transitions, stagger, haptics on Jaap |
| No real light/dark strategy | **ThemeProvider** + toggle switch + light-mode tokens for home & nav |
| Simple bottom bar | **5-tab aligned nav** (Home, Jaap, Astro, Puja, Profile) |

**Approach:** New design tokens in `src/index.css`, a `ThemeProvider`, and a component library under `src/components/ui/` plus feature folders (`home/`, `jaap/`, `palm/`, `ambient/`). Backend logic, Gemini integration, SQLite, and authentication flow were preserved.

---

## Design system foundation

### CSS design tokens (`src/index.css`)

- Variables for backgrounds, text, gold accent, borders, shadows, navigation, home cards, muhurat rows, and modal overlay.
- **Dark mode** is the default (`:root`).
- **Light mode** applies via `.light` on `<html>` with cream base, stronger contrast, and adjusted nav/home cards.
- Utility classes include: `spirit-card`, `home-glass-card`, `app-bottom-nav`, `btn-jaap-primary`, `gold-text`, `muhurat-green`, `muhurat-rose`, and others.

### Theme (`src/context/ThemeContext.tsx`, `src/components/ui/ThemeToggle.tsx`)

- Persists `light` / `dark` in `localStorage`.
- Profile includes an iOS-style switch (moon / sun icons).

### Motion (`src/motion/presets.ts`, `src/motion/PageTransition.tsx`)

- Shared springs, fades, and stagger animations for lists and cards.
- Page-level transitions where appropriate (e.g. Home screen stagger).

### Reusable UI components (`src/components/ui/`)

| Component | Purpose |
|-----------|---------|
| `Button` | Primary, secondary, ghost, gold, danger variants |
| `GlassCard` | Glassmorphism surfaces with optional glow |
| `Badge` | Labels (gold, success, muted) |
| `ScreenHeader` | Title + sparkle + subtitle (Jaap-style screens) |
| `Modal` | Settings, mantra picker, logout confirmation |
| `StatsRow` | Three-column stat strip (Home, Jaap, Puja, etc.) |
| `FeatureTile` | 2×2 grid tiles with icon, status, chevron |
| `Skeleton` / `PageLoader` | Initial app loading state |
| `ThemeToggle` | Light/dark switch |
| `AnimatedCounter` | Animated numeric displays (Profile) |

### Ambient layer (`src/components/ambient/`)

- `AmbientBackground` — theme-aware gradients, mandala, particles.
- Replaced the previous `LiveBackground.tsx` (orange gradient orbs).

### User profile on UI (`src/hooks/useUserProfile.ts`)

- Reads `name`, `city`, and `state` from `userPreferences` in `localStorage`.
- Default display name **Kshitij** (replacing placeholder “Seeker”).
- Onboarding collects **name**, city, and deity.

---

## Screen-by-screen changes

### Onboarding & Login

- Glass cards, gold primary CTA, staggered feature grid on onboarding.
- Login uses the same visual language; OTP flow is unchanged (client-side simulation).

### Home

Redesigned to match the premium home mockup.

**Layout:**

- **Header:** Rotating sun glyph, “Dharma Path” + lotus accent, time-based greeting + date, notification bell with pulse indicator.
- **Profile strip:** Gold avatar ring, purple “Namaste”, user **name**, location, gradient **Begin Jaap** button.
- **Stats row:** Streak · Total Jaap · Tithi (Ekadashi / Shukla Paksha).
- **Panchang card:** LIVE badge, tithi/nakshatra, sunrise/sunset, SVG **moon illustration**, Abhijit & Rahu rows with chevrons.
- **Quick actions:** Four circular orbs — Mantra Library, Daily Puja, Calendar, Astro Insights.

**Implementation:** `src/pages/Home.tsx`, `src/components/home/HomeHeader.tsx`, `MoonIllustration.tsx`, `QuickActionOrb.tsx`, plus `home-glass-card` styles in CSS.

### Jaap (Jaap Mala)

Redesigned to match the Jaap Mala reference mockup.

- **Current mantra card** with ॐ ring and **Change** action.
- **Double-ring progress** with gold progress bead, `count / goal`, “Mala X of Y”.
- **Start / Reset** circular controls with labels.
- **Stats row:** Target count · Completed · Time elapsed (live timer).
- **2×2 feature grid:** Reminder, Stats, Mantras, Focus Mode (modals).
- **Focus mode:** Minimal full-screen counter experience.
- Session history and streak tracking via `useJaapStorage`.
- Haptic feedback on tap where supported.

**Implementation:** `src/pages/Jaap.tsx`, `src/components/jaap/JaapProgressRing.tsx`, `src/hooks/useJaapSession.ts`.

### AI Palm Reading

- Screen header with scan/upload card.
- Upload flow with **scan overlay** animation during analysis.
- Lazy-loaded **Lottie** analysis loader.
- Markdown results in a glass card.
- “How it works” insight grid when no image is loaded.

**Implementation:** `src/components/palm/ScanOverlay.tsx`, `AnalysisLoader.tsx`, `src/hooks/usePalmReading.ts` (includes `resetReading` fix).

### Puja & Puja Detail

- Search, verified filter, stats row, category chips, elevated list cards.
- Detail page: tabbed overview / samagri / vidhi, timeline steps, interactive samagri checklist.

### Profile & Subscription

- Spiritual journey stats, milestone chips, preference rows.
- Dedicated **theme toggle** card with switch control.
- **Logout confirmation** modal before signing out.
- Subscription plans with monthly/annual toggle.

---

## Navigation evolution

| Iteration | Description |
|-----------|-------------|
| Initial redesign | Floating glass pill bar with five items |
| Mockup pass | Curved bar with center **ॐ FAB** linking to Jaap |
| **Current** | Flat bar with **five equal-width tabs**, no center FAB |

**Final tabs:** Home · Jaap · **Astro** (→ `/palm-reading`) · Puja · Profile

- All items share the same layout: `nav-icon-slot` (40×40) + label.
- Active state: gold highlight for most tabs; **purple glow for Astro** on palm reading routes.

**Implementation:** `src/components/Layout.tsx`, nav styles in `src/index.css` (`app-bottom-nav`, `nav-icon-active`, `nav-icon-astro-active`).

---

## UI features added (client-side)

| Feature | Location | Storage / mechanism |
|---------|----------|---------------------|
| User name & location | Home, Profile, Onboarding | `localStorage` → `userPreferences` |
| Jaap streak & session history | Home, Jaap, Profile | `useJaapStorage` → `localStorage` |
| Session timer | Jaap | `useJaapSession` |
| Daily reminder toggle + time | Jaap | `jaapSessionPrefs` in `localStorage` |
| Mantra list / picker | Jaap | Modal + saved mantras in prefs |
| Focus mode | Jaap | React component state |
| Light / dark theme | App-wide | `ThemeContext` + `ThemeToggle` |
| Logout confirmation | Profile | `Modal` before `onLogout` |
| Haptic feedback | Jaap counter tap | `navigator.vibrate` |

---

## Dependencies added for UI

| Package | Purpose |
|---------|---------|
| `lottie-react` | Palm analysis loading animation (lazy-loaded) |
| `motion` (Framer Motion v12) | Page transitions, gestures, micro-interactions |

**Fonts** (via `index.html`): Cormorant Garamond (display), Inter (UI).

**Build optimization:** Vite `manualChunks` for `vendor-motion` and `vendor-lottie` in `vite.config.ts`.

---

## Frontend file structure (UI-related)

```
src/
├── index.css                 # Design tokens, light/dark, component utilities
├── main.tsx                  # ThemeProvider wrapper
├── App.tsx                   # Routes + auth gates (logic unchanged)
├── context/
│   └── ThemeContext.tsx
├── motion/
│   ├── presets.ts
│   └── PageTransition.tsx
├── hooks/
│   ├── useUserProfile.ts
│   ├── useJaapStorage.ts
│   ├── useJaapSession.ts
│   └── usePalmReading.ts
├── components/
│   ├── Layout.tsx            # Bottom navigation
│   ├── ui/                   # Shared design system
│   ├── home/                 # Home screen components
│   ├── jaap/                 # Jaap progress / mala visuals
│   ├── palm/                 # Scan + analysis loader
│   └── ambient/              # App background
└── pages/                    # All route screens (restyled)
```

---

## Intentionally unchanged

The following were **not** modified as part of the UI redesign:

- Express server (`server.ts`) and route structure
- `POST /api/palm-reading` and `PalmReadingController`
- `AiService` / Google Gemini integration
- SQLite schema and `ReadingModel`
- Authentication gates in `App.tsx` (`isAuthenticated`, `hasCompletedOnboarding`)
- Puja ritual content (still mock data in frontend components)
- Core route paths (`/home`, `/jaap`, `/palm-reading`, `/puja`, `/profile`, `/subscription`)

---

## Repository hygiene

- Added `.gitignore` with `node_modules/`, `dist/`, `.env`, logs, editor files, and `database.sqlite`.

---

## How to preview

```bash
npm install
# Set GEMINI_API_KEY in .env
npm run db:setup   # optional, for palm reading persistence
npm run dev
```

Open `http://localhost:3000`, complete onboarding (set your name and city), then explore Home, Jaap, Astro (bottom nav → palm reading), Puja, and Profile (theme toggle and logout confirmation).

---

## Typography & visual language (quick reference)

- **Display / headings:** Cormorant Garamond (`font-display`)
- **Body / UI:** Inter (`font-sans`)
- **Primary accent:** Gold (`--accent`)
- **Secondary accents:** Purple (astro/streak), green (jaap complete), blue (calendar/time), pink (insights)
- **Surfaces:** Layered glass cards on deep navy (dark) or warm cream (light)

---

*Last updated: May 2026 — reflects UI work through navigation alignment, light mode fixes, logout confirmation, and theme toggle.*
