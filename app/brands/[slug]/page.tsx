import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { brands, getBrandBySlug } from "@/data/brands";
import { AnimatedBrandHeader } from "@/components/AnimatedBrandHeader";
import { AnimatedProductArticle } from "@/components/AnimatedProductArticle";

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = slug ? getBrandBySlug(slug) : undefined;

  if (!brand) {
    notFound();
  }

  const related = brands.filter((b) => b.origin === brand.origin && b.slug !== brand.slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-surface-elevated border-b border-border">
        <div className="container pt-24 pb-14 md:pt-28 md:pb-16">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all brands
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] items-center">
            <div className="rounded-2xl border border-border bg-background p-8 md:p-10 flex items-center justify-center min-h-[220px]">
              <img
                src={brand.image}
                alt={brand.name}
                className="max-h-44 md:max-h-56 max-w-full object-contain"
                width={900}
                height={500}
              />
            </div>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>{brand.origin}</span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>{brand.category}</span>
              </div>

              <AnimatedBrandHeader>{brand.name}</AnimatedBrandHeader>
              <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">{brand.description}</p>

              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 px-6 h-12 rounded-full bg-foreground text-background text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Visit supplier website <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

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
            <p className="text-sm text-muted-foreground max-w-xs">{brand.products.length} products currently listed on our live catalog.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {brand.products.map((product, i) => (
              <AnimatedProductArticle key={product.name} index={i}>
                <div className="aspect-square overflow-hidden bg-surface-elevated mb-4 rounded-xl border border-border p-4">
                  <img
                    src={product.image ?? "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    width={800}
                    height={800}
                  />
                </div>
                <h3 className="font-display text-base md:text-lg leading-snug">{product.name}</h3>
                {product.size && <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{product.size}</p>}
              </AnimatedProductArticle>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border py-20 md:py-24 bg-surface-elevated">
          <div className="container">
            <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                More from <em>{brand.origin}</em>
              </h2>
              <Link
                href="/brands"
                className="text-sm border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                Browse all brands
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              {related.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="group bg-background hover:bg-surface-elevated transition-colors p-6 md:p-8 aspect-square flex flex-col justify-between"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{b.origin}</div>
                  <div>
                    <div className="mb-3 h-14 flex items-center">
                      <img src={b.image} alt={b.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors">{b.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
