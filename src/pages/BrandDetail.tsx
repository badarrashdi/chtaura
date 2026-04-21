import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { brands, getBrandBySlug } from "@/data/brands";
import productPlaceholder from "@/assets/product-placeholder.jpg";
import heroPantry from "@/assets/brand-hero-pantry.jpg";
import heroCoffee from "@/assets/brand-hero-coffee.jpg";
import heroDairy from "@/assets/brand-hero-dairy.jpg";
import heroSpice from "@/assets/brand-hero-spice.jpg";

const heroFor = (category: string): string => {
  const c = category.toLowerCase();
  if (c.includes("coffee") || c.includes("tea")) return heroCoffee;
  if (c.includes("dairy") || c.includes("water")) return heroDairy;
  if (c.includes("spice") || c.includes("sweet") || c.includes("snack") || c.includes("condiment")) return heroSpice;
  return heroPantry;
};

const BrandDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? getBrandBySlug(slug) : undefined;

  if (!brand) return <Navigate to="/brands" replace />;

  const related = brands.filter((b) => b.origin === brand.origin && b.slug !== brand.slug).slice(0, 4);
  const hero = heroFor(brand.category);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-foreground text-background">
        <img
          src={hero}
          alt={`${brand.name} — ${brand.category}`}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/10" />
        <div className="container relative pt-32 pb-16 md:pt-40 md:pb-20">
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-background/70 hover:text-background mb-8 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all brands
          </Link>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-xs uppercase tracking-[0.3em] text-background/70">
              <span>{brand.origin}</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>{brand.category}</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl md:text-7xl xl:text-8xl leading-[0.95] text-balance"
            >
              {brand.name}
            </motion.h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-background/80 leading-relaxed">{brand.about ?? brand.description}</p>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 px-6 h-12 rounded-full bg-background text-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Visit supplier website <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-12 md:mb-16 gap-6 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Selection</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl leading-tight">
                Products from <em>{brand.name}</em>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {brand.products.length} references stocked in our Bahrain warehouse. Contact us for full pricing & availability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {brand.products.map((product, i) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
                className="group"
              >
                <div className="aspect-square overflow-hidden bg-surface-elevated mb-4">
                  <img
                    src={productPlaceholder}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    width={800}
                    height={800}
                  />
                </div>
                <h3 className="font-display text-base md:text-lg leading-snug">{product.name}</h3>
                {product.size && (
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{product.size}</p>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Related from same origin */}
      {related.length > 0 && (
        <section className="border-t border-border py-20 md:py-24 bg-surface-elevated">
          <div className="container">
            <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                More from <em>{brand.origin}</em>
              </h2>
              <Link
                to="/brands"
                className="text-sm border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                Browse all brands
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              {related.map((b) => (
                <Link
                  key={b.slug}
                  to={`/brands/${b.slug}`}
                  className="group bg-background hover:bg-surface-elevated transition-colors p-6 md:p-8 aspect-square flex flex-col justify-between"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{b.origin}</div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors">
                      {b.name}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{b.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BrandDetail;
