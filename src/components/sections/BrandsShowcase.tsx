import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { brands } from "@/data/brands";

const featured = brands.slice(0, 12);

export const BrandsShowcase = () => (
  <section className="relative py-24 md:py-36 bg-background">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Our portfolio</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] text-balance">
            A curated portfolio,<br />
            <em>thoughtfully sourced</em>.
          </h2>
        </div>
        <Link
          to="/brands"
          className="inline-flex items-center gap-2 text-sm font-medium border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors self-start md:self-end"
        >
          Browse all {brands.length} brands <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
        {featured.map((brand, i) => (
          <motion.div
            key={brand.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <Link
              to={`/brands/${brand.slug}`}
              className="group relative bg-background hover:bg-surface-elevated transition-colors p-8 md:p-10 aspect-square flex flex-col justify-between cursor-pointer h-full"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {brand.origin}
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">{brand.category}</p>
              </div>
              <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
