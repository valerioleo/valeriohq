import { MiniDial } from "./mini-dial"

// Per-post live teasers for the homepage's featured interactive card, keyed
// by slug. A post appears in that slot on its `interactive: true` flag alone;
// registering a teaser here is optional polish, not a requirement — without
// one the card renders as text.
export const postTeasers: Record<string, React.ComponentType> = {
  "asyncwrapper-anonymous-on-ramp": MiniDial,
}
