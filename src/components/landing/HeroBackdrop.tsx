/**
 * Ambient hero depth — static grid, aurora, and soft accent blooms only.
 * CSS `.hero-aurora` respects prefers-reduced-motion; no Framer on this layer.
 */
export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-navy-wash absolute inset-0" />
      <div className="hero-graphite-veil absolute inset-0" />
      <div className="hero-grid hero-backdrop-layer absolute inset-0" />
      <div className="hero-mesh hero-backdrop-layer absolute inset-0" />
      <div className="hero-scanlines hero-backdrop-layer absolute inset-0" />
      <div className="hero-bloom-head hero-backdrop-layer absolute left-[-6%] top-[8%] h-[min(55vh,420px)] w-[min(70vw,520px)] rounded-full blur-3xl" />
      <div className="hero-bloom-instrument hero-backdrop-layer" />
      <div className="hero-aurora hero-backdrop-layer absolute -right-[12%] top-0 h-[min(92%,580px)] w-[min(92vw,820px)] rounded-full blur-3xl" />
      <div className="hero-backdrop-orb hero-backdrop-layer absolute right-[6%] top-[14%] h-48 w-48 rounded-full blur-2xl" />
      <div className="hero-backdrop-orb hero-backdrop-layer absolute bottom-[4%] left-[2%] h-36 w-64 rounded-full blur-2xl" />
      <div className="hero-vignette absolute inset-0" />
    </div>
  );
}
