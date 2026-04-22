"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { brands } from "@/data/brands";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BrandsPage() {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState<string>("All");

  const origins = useMemo(() => ["All", ...Array.from(new Set(brands.map((b) => b.origin)))].sort(), []);

  const filtered = brands.filter((b) => {
    const matchesQ = b.name.toLowerCase().includes(query.toLowerCase()) || b.category.toLowerCase().includes(query.toLowerCase());
    const matchesO = origin === "All" || b.origin === origin;
    return matchesQ && matchesO;
  });

  return (
    <>
      <PageHero
        eyebrow="Brands We Represent"
        title={<>{brands.length} houses, <em>one curated table</em>.</>}
        description="A portfolio shaped by 30 years of relationships with the producers we believe in. Search, filter, and discover the brands that fill Bahrain's best pantries."
      />

      <section className="sticky top-20 z-30 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="container py-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand or category…"
              className="w-full h-11 rounded-full border border-border bg-background pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2">
            {origins.map((o) => (
              <button
                key={o}
                onClick={() => setOrigin(o)}
                className={cn(
                  "shrink-0 px-4 h-9 rounded-full text-xs uppercase tracking-wider border transition-colors",
                  origin === o ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50",
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          {filtered.length === 0 ? (
            <p className="text-center py-20 text-muted-foreground">No brands match your search.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
              {filtered.map((b, i) => (
                <motion.div
                  key={b.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.4) }}
                >
                  <Link
                    href={`/brands/${b.slug}`}
                    className="group bg-background hover:bg-surface-elevated transition-colors p-8 flex flex-col justify-between aspect-square cursor-pointer relative h-full"
                  >
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{b.origin}</div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-primary transition-colors">{b.name}</h3>
                      <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{b.category}</p>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{b.description}</p>
                    </div>
                    <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
