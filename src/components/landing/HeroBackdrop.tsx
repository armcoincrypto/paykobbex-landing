/**
 * Ambient hero depth — static grid, aurora, and soft accent blooms only.
 * CSS `.hero-aurora` respects prefers-reduced-motion; no Framer on this layer.
 */
export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-navy-wash absolute inset-0" />
      <div className="hero-grid absolute inset-0 opacity-[0.62]" />
      <div className="hero-mesh absolute inset-0" />
      <div className="hero-scanlines absolute inset-0" />
      <div className="hero-bloom-head absolute left-[-6%] top-[8%] h-[min(55vh,420px)] w-[min(70vw,520px)] rounded-full blur-3xl" />
      <div className="hero-bloom-instrument" />
      <div className="hero-aurora absolute -right-[12%] top-0 h-[min(92%,580px)] w-[min(92vw,820px)] rounded-full blur-3xl" />
      <div className="absolute right-[6%] top-[14%] h-48 w-48 rounded-full bg-accent/18 blur-2xl" />
      <div className="absolute bottom-[4%] left-[2%] h-36 w-64 rounded-full bg-[rgb(var(--token-accent-rgb)/0.1)] blur-2xl" />
      <div className="hero-vignette absolute inset-0" />
    </div>
  );
}
