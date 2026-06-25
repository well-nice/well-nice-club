# Well Nice App — Direction B (Soft / Tactile)

## Context
The user has a Well Nice members' community app concept designed in Cursor/Claude. The design files (`.dc.html`) show two visual directions; the user has chosen Direction B: Soft / Tactile — card-based surfaces with subtle shadows, Schibsted Grotesk + Newsreader serif, warm off-white background (`#EFEFED`), and strictly monochrome palette. The `App.tsx` is currently empty. The goal is to build a faithful, interactive React implementation of the full mobile app prototype rendered inside a phone frame.

## What to build

A single-page React app that renders the Well Nice mobile app inside a realistic iPhone frame. All navigation is client-side state (no router needed — it's a phone mockup). The app has multiple screens navigated by a bottom tab bar and in-app push/pop patterns.

### Screens

1. **Onboarding** — "A quieter kind of community." hero with CTA buttons → leads to Feed
2. **Sign In** — Email/password form with Apple/Google sign-in options
3. **Feed** (main tab) — Scrollable social feed with:
   - Logo header + notification/message/avatar icons
   - Date greeting with Newsreader serif ("Good morning, Jordan.")
   - Black concierge card ("Ask the concierge")
   - Daily ritual streak ring (interactive check-in, `+1` float animation)
   - Filter pills: Following / Drops / Wellness / Style
   - Featured post card (full-bleed image with gradient overlay, Newsreader body)
   - Event RSVP card (date block, attendee avatars, toggle button)
   - Dark quote card (black bg, italic Newsreader)
   - Poll card (interactive voting with animated bar fill)
   - Product drop card (image + Shop button)
   - Milestone card ("Theo Sand reached 50-day streak")
   - Sticky compose FAB at bottom
4. **Spaces** (tab) — List: featured hero card (The Studio), then row cards (Drops, Style, Wellness, Movement, Introductions) with Joined/Join badges
5. **Space Detail** — hero image, Joined button, Posts/About/Members tabs, post list
6. **Nice** (tab, AI chat) — conversation bubbles, product cards, suggested replies, message input
7. **You** (tab, Profile) — white card with avatar, name, stats (Posts/Spaces/Appreciated), bio, Posts/Saved/Spaces tabs, post list
8. **Notifications** — pushed from feed header icon
9. **Post Detail** — pushed from feed card tap
10. **Search** — pushed from spaces search bar

### Navigation state machine
```
type Screen = 'onboarding' | 'signin' | 'feed' | 'spaces' | 'spaceDetail' | 
              'nice' | 'profile' | 'notifications' | 'postDetail' | 'search' | 'compose'
```
Bottom tab bar shows on: feed, spaces, nice, profile screens. Active tab tracked separately from screen stack.

### Interactive state
- `streak`: number (starts 7), `justChecked`: bool — check-in button toggles, shows float `+1`
- `rsvpDone`: bool — RSVP button toggles "Going / I'm going"
- `voted`: bool + `votedOption`: 'mid'|'heavy' — poll reveals bar animations
- `activeTab`: 'feed'|'spaces'|'nice'|'you'
- Nice chat: `inputValue` string, messages array (pre-loaded with conversation)

## Design tokens to update in `theme.css`

- `--background`: `#EFEFED`
- `--foreground`: `#111111`
- `--card`: `#FFFFFF`
- `--border`: `rgba(0,0,0,0.08)`
- `--primary`: `#111111`
- `--muted`: `#F1F1EF`
- `--muted-foreground`: `#999999`

## Fonts (`fonts.css`)
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
```
Base font-family: `'Inter', Helvetica, Arial, sans-serif` — set on `html` in theme.css. Everywhere the design used Newsreader serif (greetings, quotes, featured post body), use Inter at medium weight with tight letter-spacing instead.

## CSS animations (add to `theme.css` or inline `<style>` in component)
From the prototype:
```css
@keyframes wnfade { from { transform: translateY(8px); } to { transform: none; } }
@keyframes wnfloat { 0% { transform: translateY(0); opacity: 0; } 25% { opacity: 1; } 100% { transform: translateY(-34px); opacity: 0; } }
@keyframes wnbar { from { width: 0; } to { width: var(--w, 68%); } }
@keyframes wnscalein { from { opacity: 0; transform: scale(0.82); } to { opacity: 1; transform: scale(1); } }
.wn-screen { animation: wnfade 0.32s ease; }
.wn-tap:active { transform: scale(0.97); transition: transform 0.12s ease; }
```

## File to modify

- **`src/app/App.tsx`** — replace entirely with the full implementation
- **`src/styles/fonts.css`** — add Google Fonts import
- **`src/styles/theme.css`** — update color tokens to match Direction B palette

## Implementation structure (all in App.tsx)

```tsx
// State, nav helpers, animation classes all inline
// Phone frame wrapper (404px outer, #0A0A0A bg, 56px radius, 11px pad)
// Dynamic island pill (absolute positioned)
// Status bar (9:41, signal bars, battery)
// Scrollable content area (screen-dependent)
// Bottom tab bar (conditional, icon SVGs inline)
```

No sub-files needed — the entire app fits cleanly in one `App.tsx` since it's a design mockup, not a production app.

## Key fidelity notes from design files
- Phone frame: `width:404px`, outer `border-radius:56px`, inner screen `382×826px`, inner `border-radius:46px`
- Screen background: `#EFEFED` (not pure white — that's for cards only)
- Card shadows: `box-shadow: 0 1px 3px rgba(0,0,0,0.06)` (light) or `0 6px 24px -10px rgba(0,0,0,0.18)` (featured)
- Bottom tab bar: `88px` height, white bg, SVG line icons (stroke-width 1.8), active=`#111`, inactive=`#BBB`
- Home indicator: `134×5px` black pill, `9px` from bottom, centered
- Typography: Newsreader for greetings, quotes, featured post body; Schibsted Grotesk for everything else
- All images: grayscale filter (`filter:grayscale(1)`) on avatar photos; picsum.photos for post images

## Images
- Avatar photos: `https://i.pravatar.cc/160?img=N` with `filter:grayscale(1)`
- Post/space images: `https://picsum.photos/id/N/WxH?grayscale`
- Well Nice product images: direct wellnice.com CDN URLs as used in the design files
- No local image assets needed

## Verification
1. App renders at correct 404px phone width, centered on `#EFEFED` or dark background
2. Bottom tab switching works (feed/spaces/nice/you)
3. Feed scroll shows all card types
4. Streak check-in fires `+1` float animation
5. Poll voting shows bar fill animation
6. RSVP toggle changes button state
7. Nice tab shows chat bubbles + product cards + message input
8. Space Detail opens from Spaces with back navigation
9. Post Detail opens from feed card tap with back navigation
10. Profile shows stats, bio, and posts tab
