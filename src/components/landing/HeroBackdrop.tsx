/**
 * Ambient hero depth — static grid, aurora, and soft accent blooms only.
 * CSS `.hero-aurora` respects prefers-reduced-motion; no Framer on this layer.
 */
export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-grid absolute inset-0 opacity-[0.5]" />
      <div className="hero-mesh absolute inset-0" />
      <div className="hero-bloom-instrument" />
      <div className="hero-aurora absolute -right-[16%] top-0 h-[min(88%,540px)] w-[min(88vw,760px)] rounded-full blur-3xl" />
      <div className="absolute right-[8%] top-[18%] h-40 w-40 rounded-full bg-accent/12 blur-2xl" />
      <div className="absolute bottom-[6%] left-[4%] h-32 w-56 rounded-full bg-[rgb(var(--token-accent-rgb)/0.08)] blur-2xl" />
      <div className="hero-vignette absolute inset-0" />
    </div>
  );
}
