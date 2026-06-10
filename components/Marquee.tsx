import { Chevron } from "./Logo";

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-brand-blue py-6">
      {[0, 1].map((dup) => (
        <div
          key={dup}
          className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10"
          aria-hidden={dup === 1}
        >
          {row.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-lg font-extrabold uppercase tracking-wide2 text-white"
            >
              {item}
              <Chevron className="h-4 w-3 text-white/60" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
