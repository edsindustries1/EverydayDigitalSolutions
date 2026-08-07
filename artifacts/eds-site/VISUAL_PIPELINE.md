# EDS Visual Pipeline — stills → motion → site

How to get the reference look onto the site, end to end. Written so no 3D or
maths knowledge is needed at any step.

---

## 0 · The recommendation, ranked honestly

| # | Route | Quality ceiling | Effort on you | Verdict |
|---|---|---|---|---|
| **1** | **Still render → AI image-to-video → looping background video** | **Identical to reference** | Low — two prompts per shot | **Do this.** |
| 2 | Still render → depth map → 2.5D camera move in After Effects | Identical, perfect loops | Medium, needs AE | Do this if route 1 drifts |
| 3 | Build the scene in Blender or Spline | Highest, fully interactive | High, real 3D skill | Only if this becomes a long-term brand system |
| 4 | Composited prop layers in the browser (already built) | Limited by prop art | Low | Keep as the mobile / reduced-motion fallback |

Route 1 wins because the video model never has to *invent* the look — it
inherits it from a still that already looks exactly right. That is why it holds
quality where everything else compromises.

Route 4 is what is currently on `/preview/motion`. It stays, because a 2 MB
video has no business loading on a phone on mobile data — but it is the
fallback now, not the main event.

---

## 1 · Generate the still

### The master prompt

Everything in square brackets gets swapped per shot. Everything else stays
**exactly as written** — that block is what makes fifteen images look like one
photoshoot.

```
A miniature 3D diorama rendered in soft matte white plastic, viewed from a high
three-quarter angle with a real perspective camera and a long lens.

[SUBJECT]

The elements are linked by glowing emissive orange tubes with softly rounded
corners that cast a warm bloom onto the white surface around them, with small
glowing junction nodes where they meet. Softly bevelled edges catching a faint
rim highlight, gentle ambient occlusion where objects meet the ground. Bright
airy studio lighting from the upper left, large very soft shadows, no hard
shadows. Pure white and light warm grey palette with a single vivid orange
accent (#F5821F) used only on the icons and the glowing connectors. Shallow
depth of field — the far background and the nearest foreground objects fall
softly out of focus. Clean and minimal with generous empty space in the
[upper right] of the frame. Cinema 4D, Octane render, physically based,
tilt-shift miniature, 8k
```

**Negative prompt**
```
isometric, flat illustration, vector, 2D, hard shadows, dark background, black,
multiple colours, blue, green, purple, chrome, glossy, metallic, reflective,
cluttered, busy, text, letters, words, watermark, logo, deep focus, everything
in focus, wide angle, fisheye, distorted
```

### Why each clause is there

Four of these are doing almost all the work. If a render comes back looking
papery or fake, one of these got dropped:

- **miniature diorama / tilt-shift** — the single biggest one. Without it you
  get a flat icon illustration.
- **glowing emissive tubes ... cast a warm bloom** — the connectors are the hero
  element and they must *emit* light onto the surface, not be drawn on it.
- **shallow depth of field** — this is what reads as "photographed", and it is
  why `isometric` and `sharp focus, 8k` had to come out. They fight it directly.
- **softly bevelled edges catching a faint rim highlight** + **ambient
  occlusion** — the difference between a render and a shape.

### Aspect ratios

| Use | Ratio | Notes |
|---|---|---|
| Homepage hero background | **16:9** | Empty space upper right, all objects in the lower-left two thirds |
| Service page header | **3:2** | Empty space on one side for the heading |
| Section break | **2:1** | Objects centred, air both sides |
| Social / OG card | **1.91:1** | Objects centred |

Always generate at the largest size the tool offers. Downscaling is free;
upscaling is not.

### Tool settings

| Tool | Settings |
|---|---|
| Midjourney | `--ar 16:9 --style raw --stylize 250 --v 7` |
| Flux | Guidance 3.0–3.5 |
| Nano Banana / Gemini | Paste the master prompt whole |
| Ideogram | "Realistic" style, not "Design" |

> **Accent swap:** if we go gold instead of orange, replace `#F5821F` with
> `#C08E1A` and "vivid orange" with "warm champagne gold" throughout. Nothing
> else changes.

---

## 2 · The shots

Swap each `[SUBJECT]` into the master prompt above.

### `hero.mp4` — homepage
```
A miniature white model of a modern salon storefront sits at the back left with
warm light glowing from its windows. In front of it, a smartphone stands on a
low rounded pedestal displaying a clean appointment booking app. Glowing orange
tubes run from the phone down to five small rounded pedestal tiles arranged in
a loose grid, each carrying a simple orange icon: a microphone, an envelope, a
speech bubble, a calendar, and a bar chart. A small potted plant and a coffee
mug sit softly out of focus in the near foreground.
```

### `svc-mobile-apps` — /services/mobile-app-development
```
Two smartphones stand upright on low rounded white pedestals showing a booking
app, side by side. A glowing orange tube runs from them up to a small rounded
tile carrying an upload arrow icon, and onward to a miniature app store card
floating above.
```

### `svc-voice-agents` — /services/ai-voice-agents
```
A central raised circular pedestal carries a large glowing orange microphone
icon. Glowing orange tubes radiate outward from it to four small rounded
pedestal tiles, each with a simple orange icon: a telephone handset, a
calendar, a document, and a bar chart. A miniature white desk phone rests
softly out of focus in the foreground.
```

### `svc-automation` — /services/automation-systems
```
A single rounded tile with an orange inbox icon sits at the top. Glowing orange
tubes branch downward from it through two diamond-shaped decision tiles and out
to three rounded outcome tiles carrying an envelope, a calendar and a checkmark
icon. A miniature white server unit with a row of small orange indicator lights
stands at the back.
```

### `svc-web-design` — /services/web-design-development
```
A desktop monitor, a tablet and a smartphone stand together on one long low
rounded pedestal, all displaying the same clean website layout. A single
glowing orange tube runs along the base of the pedestal linking all three. A
rolled architectural blueprint and a pen rest softly out of focus in the
foreground.
```

### `about-studio` — /about, /craft
```
A miniature open-plan studio floor seen from above at an angle, with small
white desks, monitors and two potted plants. Glowing orange tubes run between
the desks along the floor. A miniature white coffee cup and notebook sit at the
near edge, softly out of focus.
```

### `hero-salon`, `hero-clinic`, `hero-restaurant` — solution pages
Same as `hero.mp4`, swapping the storefront model:
```
...a miniature white model of a modern [dental clinic / restaurant with a
canopy / real estate office] sits at the back left...
```

---

## 3 · Turn the still into motion

Feed the approved still into an image-to-video model. **Kling**, **Runway**,
**Luma**, **Veo** and **Sora** all do this; use whichever is current and best at
subtle motion. Upload the image, then prompt:

```
Extremely slow, smooth cinematic camera push-in. The glowing orange tubes pulse
gently as small points of light travel along them. Everything else stays
completely still. No warping, no morphing, no objects changing shape. Minimal,
subtle, premium.
```

For a sideways drift instead, swap the first sentence for:
```
Extremely slow, smooth camera drift from left to right with gentle parallax.
```

### The rules that decide whether this works

1. **Ask for almost no motion.** Every AI video model degrades in proportion to
   how much movement it attempts. "Slow push-in" holds together; "camera flies
   through the scene" turns to soup.
2. **Name what must stay still.** "Everything else stays completely still" is
   the clause that stops objects breathing and morphing.
3. **Shortest clip available**, usually 5s. Longer clips drift more.
4. **Generate three, keep one.** These are cheap. Watch each at full size and
   reject any with warping — it is always more obvious on a big screen.

---

## 4 · Make it loop, then compress it

A raw 5-second clip visibly jumps when it restarts. This step fixes that and
gets the file small enough to ship. Copy-paste, no understanding required —
install ffmpeg first (`brew install ffmpeg`).

### Perfect loop, every time

Play the clip forward, then backward. The end always matches the start, because
it *is* the start. A slow push-in becomes a slow push-in-and-out, which looks
deliberate and expensive.

```bash
ffmpeg -i raw.mp4 -filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[out]" \
  -map "[out]" -an pingpong.mp4
```

### Encode for the web

```bash
# Chrome / Firefox / Edge — AV1, smallest file
ffmpeg -i pingpong.mp4 -c:v libsvtav1 -crf 40 -preset 6 -an \
  -vf "scale=1920:-2" hero.webm

# Safari / iOS — HEVC
ffmpeg -i pingpong.mp4 -c:v libx265 -crf 30 -tag:v hvc1 -an \
  -vf "scale=1920:-2" hero.mp4

# Universal fallback — H.264
ffmpeg -i pingpong.mp4 -c:v libx264 -crf 25 -profile:v high -pix_fmt yuv420p -an \
  -vf "scale=1600:-2" hero-h264.mp4

# Poster frame — shown before the video loads, and instead of it on mobile
ffmpeg -i pingpong.mp4 -vframes 1 -q:v 2 hero-poster.jpg
```

Target under **1.5 MB** for `hero.webm`. If it comes in heavier, raise `-crf`
(42, then 44). These scenes are mostly flat white, so they compress extremely
well — expect 600 KB–1.2 MB.

> Drop the `-an` and you ship a silent audio track that wastes bandwidth and can
> block autoplay on some browsers. Keep it.

---

## 5 · Where the files go

```
public/videos/hero/hero.webm          AV1
public/videos/hero/hero.mp4           HEVC
public/videos/hero/hero-h264.mp4      H.264 fallback
public/videos/hero/hero-poster.jpg    poster frame
```

`VideoHero` picks the right source per browser, holds the poster until the video
can play, and falls back to the poster permanently on mobile, on save-data, and
under `prefers-reduced-motion`. Nothing else to wire up.

---

## 6 · Order of work

Do **not** batch-generate. One shot, all the way through, first.

1. Generate `hero` stills until one is genuinely right. Send it over — I will
   confirm the prompt is landing before you spend anything else.
2. Animate that one still. Check for warping at full size.
3. Loop and encode it with the commands above.
4. Drop the four files in. We look at it live on the homepage.
5. Only then generate the remaining shots.

Step 1 is the one that matters. If the still is right, everything after it is
mechanical.
