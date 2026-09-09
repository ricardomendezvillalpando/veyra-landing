# Veyra Brand — Design system (locked · shared)

**Status:** Locked for **all** Veyra surfaces: landing, mobile, merchant, admin, api-facing UI, and hardware (`device`).  
**Canonical path:** `docs/VEYRA_BRAND.md` (this file).  
**Code consumers:**

| Package | Tokens |
|---------|--------|
| `mobile` | `mobile/src/theme/colors.ts`, `typography.ts` |
| `landing` | `landing/src/app/globals.css` |
| `merchant` / `admin` / `device` | Must import or mirror these tokens — no local palette forks |

## Shared brand rule

> One palette. One mark. One type system. Every product must feel like Veyra.

Do **not** invent a second theme (light marketing / dark app). Soft-dark is the system.

## Mode decision (psychology)

**Soft-dark charcoal** — not pure black, not light gray.

| Option | Verdict |
|--------|---------|
| Light | Better for long KYC forms only as an optional island later — not the brand default. |
| Soft-dark | **Chosen.** Premium identity/security; agent states pop; same canvas on phone + hardware. |
| Pure black `#000` | Rejected — harsh, “void”, OLED smear. |
| Pure white `#FFF` | Rejected — glare; fights agent aura. |

**Psychology:** Soft-dark = focused secure device. Green/teal on charcoal = *authorization / live presence* (`Presence → Identity → Authorization → Action`).

## Tone

Premium, high-tech, uncluttered. Formal biometric trust — not playful fintech, not Spotify entertainment green-as-everything.

## Mark / logo

| Asset | Path |
|-------|------|
| Mark (viewfinder + green dot) | `docs/brand/veyra-mark.svg` |
| App icon 1024 | `docs/brand/veyra-app-icon-1024.png` |
| Wordmark legacy SVG | `docs/brand/veyra-wordmark.svg` |
| Landing runtime | `landing/public/brand/*`, `landing/src/components/Logo.tsx` (VEYR + animated A/mark) |
| Mobile app icon | `mobile/assets/icon.png` (+ iOS/Android mipmaps) |

**Mark meaning:** four corner brackets = presence / scan frame; `#22C55E` center dot = live signal / approved.

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display / titles | Outfit Bold | 700 |
| Body | Outfit Regular | 400 |
| Labels / captions | Outfit Medium / SemiBold | 500–600 |
| Buttons | Outfit Bold | 700 |

**Shipped:** Outfit (OFL). No Inter / system UI as brand default.

## Colors (locked)

| Token | Hex | Role |
|------|-----|------|
| `background` | `#141414` | App / terminal / web canvas |
| `backgroundSoft` | `#171717` | Subtle depth |
| `surface` | `#1C1C1C` | Panels |
| `surfaceElevated` | `#242424` | Sheets / elevated chrome |
| `surfaceField` | `#2A2A2A` | Inputs / fields |
| `mist` | `#181818` | Ambient washes |
| `border` | `rgba(255,255,255,0.10)` | Hairlines |
| `borderStrong` | `rgba(255,255,255,0.18)` | Active edges |
| `textPrimary` | `#F2F2F2` | Titles / data |
| `textSecondary` | `rgba(242,242,242,0.62)` | Body |
| `textMuted` | `rgba(242,242,242,0.40)` | Meta |
| `accent` | `#1A6B5C` | Brand teal (chrome, secondary emphasis) |
| `accentGlow` / `cta` / `success` | `#22C55E` | Signal / CTA / live / approved |
| `accentSoft` | `rgba(34,197,94,0.16)` | Soft fills |
| `ctaForeground` | `#0A1A12` | Text on green CTA |
| `agent` | `#D4AF37` | Gold agent accent (sparingly) |
| `danger` | `#FF6B5A` | Destructive / decline |

### Signal vs brand teal

- **Teal `#1A6B5C`:** brand depth, gradients start, secondary chrome.
- **Signal `#22C55E`:** live presence, approved, primary CTA, agent glow.
- Do not introduce a third “marketing green.”

## Chrome patterns

- Floating **pill** bottom nav (glass / blur on charcoal)
- Circular primary actions in `accentGlow`
- Soft outer glow on CTAs (not aggressive pulse)
- Wizard / register / wallet: same canvas — **no light form island**
- Hardware terminal: same tokens for IDLE → LISTENING → SPEAKING → APPROVED / DECLINED

## Product surfaces (must share this system)

| Surface | Package |
|---------|---------|
| Marketing | `landing` |
| Consumer app | `mobile` |
| Merchant POS / console | `merchant` |
| Platform back office | `admin` |
| Terminal hardware UI | `device` |
| API docs / status UIs | `api` (if any UI) |
