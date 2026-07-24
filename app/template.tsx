// Remounts on every navigation → the CSS enter animation replays per route.
// Zero JS: it's a server component and the motion is a CSS keyframe
// (transform + opacity only, so no layout shift; reduced-motion disables it).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>
}
