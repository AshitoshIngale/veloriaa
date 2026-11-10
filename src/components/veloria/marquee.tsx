const ITEMS = [
  "Hand-strung, bead by bead",
  "Made to order",
  "Bracelets, pearls & charms",
  "Keychains & phone candy",
  "Matching sets for favourite people",
  "Ships across India",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-display text-lg sm:text-xl italic text-ivory/90">
            {item}
          </span>
          <span
            aria-hidden
            className="size-1.5 rotate-45 bg-clay-soft/80 shrink-0"
          />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="marquee-track relative overflow-hidden border-y border-ink bg-ink py-4"
      aria-label="Brand values"
    >
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
