---
name: feedback-tokens-and-assets
description: Rules for missing tokens, Figma "Preserved" text styles, icons and images when converting the huddling Figma components (file Sv9blI6mxeflv8HUZHMLWo)
metadata:
  type: feedback
---

Missing token handling: if the Figma value is bound to a named Figma variable but absent from @theme, add it with the Figma name in kebab-case (e.g. `--color-cover-gradient-preserved-3`, `--radius-scaled-media-16-799999237060547`) and report it. Raw (unbound) values: do not invent or approximate a token; leave the property out and report.
Icons (icon/check, icon/plus, icon/minus): first round left them as slots; user then (2026-10-15) asked for them as inline-SVG `Icon` component (stroke=currentColor, path from Figma asset SVGs fetched to scratchpad only, never PNG, never hand-drawn). Slots now default to Icon. icon/none = empty slot, not implemented. Only the Figma "Image" component's PNGs go to `public/images/` (user explicitly asked for PNG there).
Figma "Typography/Preserved/*" text styles (letter-spacing -0.16/-1/-0.42 etc.) are not tokens; they were mapped to the existing text-* token with the same size/weight and the letter-spacing left unset (reported).

**Why:** User (beginner) wants token-only Tailwind classes, no arbitrary values, and transparency about anything skipped.
**How to apply:** Any future Figma-to-code work in this repo; reuse components in src/components (Button, Label, InputField, etc.) and follow Button.tsx style (ComponentProps, class maps, join(" ")).
