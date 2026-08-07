# EDS Render Style Guide & Prompt Pack

Everything needed to generate the site's 3D art so that every image looks like it
came out of the same studio on the same afternoon.

Two rules matter more than the prompts themselves:

1. **Never change the STYLE ANCHOR.** Paste it verbatim on every single render.
   Consistency across assets is what reads as "expensive"; a beautiful image in a
   slightly different light is worse than a plain one that matches.
2. **Generate props separately, on pure white.** One big scene can only move as
   one piece. Separate props composite in the browser with
   `mix-blend-mode: multiply`, which drops the white to transparent and keeps the
   soft shadows — giving real per-object parallax with no cutout work.

---

## 0 · Where the depth actually comes from

Worth reading before generating anything, because getting this wrong wastes a
lot of renders.

The reference sheets do **not** look deep because of their background. They look
deep because of three things, in this order:

1. **Shading inside each object** — ray-traced ambient occlusion pooling in every
   crevice, rounded bevels catching a highlight along each edge, light bouncing
   between adjacent surfaces. This is most of the effect.
2. **Context props that establish scale** — the model house, the van, the potted
   plant, the notebook, the coffee mug. They turn a diagram into a *place*.
   Without them the composition reads as a flowchart no matter how well lit.
3. **The studio environment** — an infinity cove where the floor meets a
   backdrop, one key light pooling on that floor, edge falloff, lens blur.

**The environment (3) is built in code**, in `PropScene`'s `StageDef` — a cove
gradient, key pool, warm wire spill, floor falloff and depth-of-field, all
responding to scroll. So renders must **not** bake in a background gradient,
vignette or floor tone. A prop carrying its own grey backdrop will show that
backdrop as a plate once it composites, and will fight the stage lighting.

So: **flat white *background*, maximum shading *inside* the object.** Those are
not in tension — they are different parts of the frame.

---

## 1 · The style anchor

Append this to **every** prompt, unchanged:

```
isometric three-quarter view, matte white clay material with soft rounded
bevelled edges catching a bright rim highlight, deep ambient occlusion in every
crease and where objects meet, subtle light bounce between adjacent white
surfaces, pure flat white seamless background with no gradient and no vignette,
high-key soft-box lighting from upper left, one large very soft contact shadow,
monochrome white and light warm grey palette with exactly one accent colour —
vivid orange #F5821F — used only for glowing connector lines, active UI
highlights and thin emissive strips at object bases, physically based render,
octane, ray traced, product visualisation, extremely clean, sharp focus, 8k
```

The clauses doing the heavy lifting are **bevelled edges catching a bright rim
highlight**, **deep ambient occlusion**, and **light bounce**. Those three are
the difference between a render and a flat illustration — if a result looks
papery, they are what got dropped.

### Negative prompt

```
text, letters, words, watermark, logo, dark background, black background,
gradient background, multiple colours, blue, green, purple, red, chrome, metal,
glass reflections, glossy, cluttered, busy, noisy, grainy, low contrast, drop
shadow, hard shadow, vignette, tilt-shift, fisheye
```

### Tool settings

| Tool | Settings |
|---|---|
| Midjourney | `--ar 1:1 --style raw --stylize 150 --v 7` (props) · `--ar 4:3` (scenes) |
| Flux / Ideogram | Guidance 3.5–4.0, 1536 px shortest edge |
| Nano Banana / Gemini | Paste anchor as a style instruction, then the subject line |
| DALL·E | Prepend "A 3D product visualisation render." then subject, then anchor |

**Always render bigger than needed and downscale** — the build pipeline
(`build-scripts/optimize-images.mjs`) handles WebP conversion and sizing.

> **Accent swap:** if we land on gold instead of orange, replace `#F5821F` with
> `#C08E1A` everywhere in this document. Nothing else changes.

---

## 2 · Props — the priority set

These are the ones that get composited and animated. **Square, 1:1, pure white
background, single object, object occupying ~70% of frame, centred, plenty of
margin.** File naming matters: the scene manifest reads these paths directly.

Save to `public/renders/props/`.

### `dashboard.png`
```
A single floating computer monitor displaying a clean analytics dashboard with a
rising line chart, a donut chart and a list of rows, standing on a low rounded
rectangular pedestal with a thin glowing orange strip where it meets the ground
```

### `phone.png`
```
A single smartphone lying flat and slightly tilted on a low rounded rectangular
pedestal, screen showing a minimal appointment booking app with three list rows
and one orange button, a thin glowing orange strip at the pedestal base
```

### `conveyor.png`
```
A short conveyor belt section with cylindrical rollers carrying three small
sealed cardboard boxes, mounted on a long low rounded pedestal with a thin
glowing orange strip along its base
```

### `robot-arm.png`
```
A small articulated robotic arm with a gripper claw, mounted on a cylindrical
base on a low rounded square pedestal, arm curved gracefully, thin glowing
orange ring at the base of the arm
```

### `tile-voice.png` · `tile-mail.png` · `tile-chat.png` · `tile-calendar.png`
One file each. Swap only the bracketed word:
```
A single small rounded-square pedestal tile with a simple orange [microphone /
envelope / speech bubble / calendar] icon embossed on its top face, thin glowing
orange strip around its base
```

### `stack.png`
```
A neat stack of white cardboard boxes arranged on a wooden pallet, each box with
a small orange label strip, sitting on a low rounded pedestal
```

### `server.png`
```
A small rounded server or router unit with a row of thin orange indicator lights
on its front face, on a low rounded pedestal with a glowing orange base strip
```

### `desk-props.png`
```
A minimal white desk vignette: a rolled architectural blueprint, a small
notebook, a pen and a coffee mug, arranged loosely, all matte white
```

---

## 2b · Context props — the ones that make it a place

**Do not skip these.** They are the single biggest difference between the
reference sheets and a flowchart, and they are the thing our current preview is
most obviously missing. They sit at the far and near edges of the frame,
establish scale, and are what makes the viewer read the composition as a scene
rather than a diagram.

Same square white-background contract. Save to `public/renders/props/`.

### `ctx-plant.png`
```
A single small potted plant with broad leaves in a simple cylindrical pot, all
matte white, viewed from slightly above
```

### `ctx-mug.png`
```
A single plain coffee mug with a handle, matte white, viewed from slightly above
```

### `ctx-notebook.png`
```
A closed notebook lying flat with a slim pen resting on top of it, matte white,
viewed from above at an angle
```

### `ctx-blueprint.png`
```
Two rolled architectural blueprint tubes lying flat side by side, matte white
with faint grey line drawings visible on the exposed edge
```

### `ctx-house.png`
```
A small architectural model of a modern two-storey house with a flat roof and a
garage, matte white, with warm light glowing from the windows
```

### `ctx-van.png`
```
A small model of a plain panel van with a roof rack, matte white, three-quarter
view
```

### `ctx-desk.png`
```
A plain rectangular desk surface corner with rounded edges, matte white, viewed
from above at an angle, nothing on it
```

Placement rule: context props go at **depth 0.05–0.15** (far, behind and above
the system) or **depth 0.9–1.0** (near, at the bottom corners of the frame).
Never in the middle band — that space belongs to the system being explained.

---

## 3 · Full scenes

**4:3, 1600×1200 minimum.** These are used where a whole illustration is wanted
rather than a composited system — section headers, social cards, the OG image.

Save to `public/renders/scenes/`.

### `hero-pipeline.png` — homepage master
```
An isometric network of white rounded pedestals connected by thin glowing orange
lines: a large analytics monitor at the back left, a smartphone on a pedestal at
the right, a conveyor belt with boxes through the centre, and four small icon
tiles in the foreground, all floating on a clean white surface with wide empty
space at the left of the frame for text
```

### `svc-mobile-apps.png`
```
Two smartphones standing upright on rounded white pedestals showing a booking
app interface, connected by a thin glowing orange line to a small app-store
upload icon tile
```

### `svc-voice-agents.png`
```
A central rounded pedestal with a glowing orange microphone icon, thin orange
lines radiating out to four small pedestal tiles showing a phone, a calendar, a
document and a chart
```

### `svc-automation.png`
```
A branching flowchart of white rounded pedestal tiles connected by thin glowing
orange lines, flowing from a single inbox tile at the top through decision tiles
to three outcome tiles at the bottom
```

### `svc-web-design.png`
```
A desktop monitor, a tablet and a phone standing on a shared white pedestal all
showing the same clean website layout, connected by a thin glowing orange line
```

### `about-studio.png`
```
An isometric miniature open-plan studio floor with white desks, monitors, a
small meeting table and two potted plants, viewed from above at an angle, thin
glowing orange lines connecting the desks
```

---

## 4 · Scenes with people

Reference sheet 2 puts real faces in the frame. It works, but it is the one place
this style can turn uncanny — so keep people **inside UI cards**, never as 3D
characters.

```
Four floating rounded white cards each containing a small realistic photographic
portrait headshot of a service professional, connected by thin glowing orange
lines to a central column of small icon tiles, leading to a monitor showing a
CRM dashboard
```

Use only portraits we have the rights to. If a render invents a face, it must not
be presented as a client or team member anywhere on the site — swap it for a real
photo before that image goes near a testimonial or an about page.

---

## 5 · Acceptance checklist

Reject and re-roll if any of these fail. Re-rolling is cheap; a mismatched asset
costs more than the time saved.

- [ ] Background is **pure white** (`#FFFFFF`) — not off-white, and with **no
      gradient, vignette or floor tone baked in**. The stage is built in code;
      a baked background composites as a visible grey plate.
- [ ] Edges are **bevelled and catch a highlight** — not flat-shaded facets
- [ ] **Ambient occlusion is visible** where the object meets its own base and
      in every crease. Squint at it: if crevices are the same value as flat
      faces, re-roll. This is the single most common failure.
- [ ] Only orange appears as an accent — no stray blues, teals or reds
- [ ] Shadow is large and soft, not a hard dark contact shadow
- [ ] No text or lettering anywhere (renders always garble it)
- [ ] Object is fully inside frame with margin on all four sides
- [ ] Lighting comes from the **upper left**, matching every other asset
- [ ] Placed beside an already-approved asset, they look like the same studio

---

## 6 · Handing files over

```
public/renders/props/*.png     — square, single object, pure white bg
public/renders/scenes/*.png    — 4:3 full illustrations
```

Drop them in and say the word — the compositing manifest lives in
`src/components/props/scenes.ts` and the build pipeline generates WebP and sizes
automatically. No renaming, resizing or background removal needed.

### Why pure white matters

Props are composited with `mix-blend-mode: multiply`. White multiplies to
transparent, so the background disappears while the soft shadow survives at full
fidelity — which is what keeps objects grounded once they start moving
independently. An off-white or gradient background leaves a visible grey plate
around every object and the trick fails.

**Consequence for dark mode:** multiply only works on a light ground, so the
composited scene sits on a light stage panel even when the rest of the page is
dark. That is a deliberate choice — it reads as a lightbox — and it means one
asset set covers both themes. Generating a second dark set is possible but
doubles the library for very little gain.
