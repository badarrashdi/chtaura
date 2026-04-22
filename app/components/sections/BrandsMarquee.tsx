import { brands } from "@/data/brands";

const row = brands.map((b) => `${b.name} · ${b.origin}`);
const items = [...row, ...row];

export const BrandsMarquee = () => (
  <section className="border-y border-border bg-secondary text-secondary-foreground py-6 overflow-hidden">
    <div className="flex marquee whitespace-nowrap gap-12">
      {items.map((label, i) => (
        <div key={i} className="flex items-center gap-12 shrink-0">
          <span className="font-display italic text-2xl md:text-3xl opacity-90">{label}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
        </div>
      ))}
    </div>
  </section>
);
