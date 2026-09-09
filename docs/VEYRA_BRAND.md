# Veyra Brand — Design system (locked)

**Status:** Locked for consumer app **and** hardware terminal UI.  
**Code:** `mobile/src/theme/colors.ts`, `mobile/src/theme/typography.ts`

## Mode decision (psychology)

**Soft-dark charcoal** — not pure black, not light gray.

| Option | Verdict |
|--------|---------|
| Light (gris muy claro) | Better for long forms / KYC anxiety, but splits brand from a living terminal agent and weakens the green “signal” in store ambient light. |
| Soft-dark (gris carbón) | **Chosen.** Premium identity/security products read as focused devices; ambient agent states (listen/speak/approve) pop; same canvas works on phone and hardware without a second system. |
| Pure black `#000` | Rejected — harsh contrast, “void” feeling, OLED smear; feels severe rather than trustworthy. |
| Pure white `#FFF` | Rejected — glare, clinical, fights the agent aura. |

**Psychology summary:** Soft-dark lowers arousal vs pure black while keeping “secure device” cues. The green signal on charcoal reads as *authorization / live presence*, which is the product core (`Presence → Identity → Authorization → Action`).

## Tone

Premium, high-tech, uncluttered. Soft charcoal canvas, one signal color, glass/pill chrome. Formal biometric trust — not playful fintech.

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display / titles | Outfit Bold | 700 |
| Body | Outfit Regular | 400 |
| Labels / captions | Outfit Medium / SemiBold | 500–600 |
| Buttons | Outfit Bold | 700 |

**Intent:** Lufga-like geometric sans. **Shipped:** Outfit (OFL).

## Colors (locked)

| Token | Hex | Role |
|------|-----|------|
| `background` | `#141414` | App / terminal canvas |
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
| `accent` | `#1A6B5C` | Brand teal |
| `accentGlow` / `cta` | `#22C55E` | Signal / CTA / live |
| `accentSoft` | `rgba(34,197,94,0.16)` | Soft fills |
| `ctaForeground` | `#0A1A12` | Text on green CTA |
| `agent` | `#D4AF37` | Gold agent accent (sparingly) |
| `danger` | `#FF6B5A` | Destructive / decline |
| `success` | `#22C55E` | Approved |

## Chrome patterns

- Floating **pill** bottom nav (glass / blur on charcoal)
- Circular primary actions in `accentGlow`
- Soft outer **glow** on CTAs (not aggressive pulse)
- Wizard / register / wallet: same canvas — **no light “form island”**
- No progress bars in onboarding by default
- Hardware terminal: same tokens for IDLE → LISTENING → SPEAKING → APPROVED / DECLINED

## Hardware note

Terminal UI must reuse these tokens. Agent orb / aura uses `accentGlow` + soft mist; never introduce a second light theme for the device shell.
