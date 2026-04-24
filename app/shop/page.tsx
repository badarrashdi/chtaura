"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search, SlidersHorizontal, X, ChevronDown,
  Tag, Package, CheckCircle, XCircle, ShoppingCart, Eye, Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/PageHero";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 24;

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
  isFeatured: boolean;
  sku: string;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  sortOrder?: number;
}

type SortKey = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
];

function imgSrc(url: string) {
  if (!url) return "";
  return `/api/image?url=${encodeURIComponent(url)}`;
}

function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    },
    retry: 2,
  });
}

function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    },
    retry: 2,
  });
}

// Memoised so the grid doesn't re-render cards that haven't changed
const ProductCard = memo(function ProductCard({
  product,
  category,
}: {
  product: Product;
  category?: Category;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!product.inStock) return;
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
        categoryName: category?.name,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    },
    [product, category, addItem],
  );

  return (
    <div className="group relative bg-background border border-border hover:border-primary/30 hover:shadow-warm transition-all duration-300 flex flex-col animate-fade-in">
      {product.isFeatured && (
        <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.2em] font-medium bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
          Featured
        </span>
      )}

      <Link href={`/shop/${product.id}`} className="block relative aspect-square bg-surface-warm overflow-hidden">
        {product.image ? (
          <img
            src={imgSrc(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
            <Eye className="h-3.5 w-3.5" /> View Details
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2">
        {category && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {category.name}
          </span>
        )}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-display text-base leading-tight hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
        )}

        <div className="mt-auto pt-3 border-t border-border space-y-3">
          <div className="flex items-end justify-between gap-2">
            <div>
              <span className="font-display text-xl text-foreground">
                {product.price > 0 ? `BD ${product.price.toFixed(3)}` : "—"}
              </span>
              {product.unit && (
                <span className="ml-1 text-xs text-muted-foreground">/ {product.unit}</span>
              )}
            </div>
            <span
              className={cn(
                "flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium shrink-0",
                product.inStock ? "text-secondary" : "text-destructive/70",
              )}
            >
              {product.inStock
                ? <><CheckCircle className="h-3 w-3" />In Stock</>
                : <><XCircle className="h-3 w-3" />Out of Stock</>}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={cn(
              "w-full h-9 rounded-full flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider transition-all duration-200",
              product.inStock
                ? added
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {added ? "Added!" : product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
});

function FilterPill({
  label, active, onClick,
}: {
  label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 px-3 h-8 rounded-full text-xs uppercase tracking-wider border transition-colors",
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50",
      )}
    >
      {label}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-background border border-border animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-3 w-3/4 bg-muted rounded" />
        <div className="pt-3 border-t border-border space-y-2">
          <div className="flex justify-between">
            <div className="h-5 w-16 bg-muted rounded" />
            <div className="h-3 w-14 bg-muted rounded" />
          </div>
          <div className="h-9 w-full bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}

function ActiveTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 h-7 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
      {label}
      <button onClick={onRemove} className="hover:text-primary/60 transition-colors">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

export default function ShopPage() {
  const { data: products = [], isLoading, error } = useProducts();
  const { data: categories = [] } = useCategories();

  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "instock">("all");
  const [sort, setSort] = useState<SortKey>("default");
  const [showFilters, setShowFilters] = useState(false);

  const maxPrice = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.price), 0)),
    [products],
  );
  const [priceRange, setPriceRange] = useState(9999);
  useEffect(() => { if (maxPrice > 0) setPriceRange(maxPrice); }, [maxPrice]);

  // ── Infinite scroll state ──────────────────────────────────────────────────
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = products.filter((p) => {
      const cat = categories.find((c) => c.id === p.categoryId);
      return (
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          cat?.name.toLowerCase().includes(q)) &&
        (activeCategoryId === "all" || p.categoryId === activeCategoryId) &&
        (stockFilter === "all" || p.inStock) &&
        p.price <= priceRange
      );
    });
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "name-asc": return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc": return [...list].sort((a, b) => b.name.localeCompare(a.name));
      default: return [...list].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }
  }, [products, categories, query, activeCategoryId, stockFilter, sort, priceRange]);

  // Reset to first page whenever the filtered list changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filtered]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Observe the sentinel and load next page when visible
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((n) => Math.min(n + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, filtered.length]);

  const hasActiveFilters =
    activeCategoryId !== "all" || stockFilter !== "all" || !!query || priceRange < maxPrice;

  const clearFilters = useCallback(() => {
    setActiveCategoryId("all");
    setStockFilter("all");
    setQuery("");
    setPriceRange(maxPrice);
  }, [maxPrice]);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);

  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title={<>Shop <em>Premium</em> Foods</>}
        description="Browse our curated selection of Mediterranean and international products — sourced from the world's finest producers."
      />

      {/* Sticky toolbar */}
      <div className="sticky top-20 z-30 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container py-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, SKU…"
              className="w-full h-11 rounded-full border border-border bg-background pl-11 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none h-10 pl-4 pr-9 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className={cn(
                "md:hidden flex items-center gap-2 h-10 px-4 rounded-full border text-sm transition-colors",
                showFilters || hasActiveFilters
                  ? "bg-foreground text-background border-foreground"
                  : "border-border",
              )}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
              {hasActiveFilters && (
                <span className="h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
                  !
                </span>
              )}
            </button>

            <span className="hidden sm:block text-sm text-muted-foreground whitespace-nowrap">
              {isLoading ? "…" : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
            </span>
          </div>
        </div>

        {/* Category pills */}
        <div className="container pb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            <FilterPill
              label={`All (${products.length})`}
              active={activeCategoryId === "all"}
              onClick={() => setActiveCategoryId("all")}
            />
            {categories
              .slice()
              .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
              .map((cat) => (
                <FilterPill
                  key={cat.id}
                  label={`${cat.name} (${products.filter((p) => p.categoryId === cat.id).length})`}
                  active={activeCategoryId === cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">
        <div className="flex gap-10 items-start">
          {/* Sidebar — desktop */}
          <aside className="w-60 shrink-0 hidden md:flex flex-col gap-7 sticky top-56">
            <Sidebar
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              priceRange={priceRange}
              priceMax={maxPrice}
              setPriceRange={setPriceRange}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="md:hidden fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
                  onClick={() => setShowFilters(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-background shadow-elegant overflow-y-auto"
                >
                  <div className="p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl">Filters</span>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="h-9 w-9 flex items-center justify-center rounded-full border border-border"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <Sidebar
                      stockFilter={stockFilter}
                      setStockFilter={setStockFilter}
                      priceRange={priceRange}
                      priceMax={maxPrice}
                      setPriceRange={setPriceRange}
                      hasActiveFilters={hasActiveFilters}
                      clearFilters={clearFilters}
                    />
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full h-12 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                    >
                      Show {filtered.length} products
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {activeCategoryId !== "all" && (
                  <ActiveTag label={activeCategory?.name ?? ""} onRemove={() => setActiveCategoryId("all")} />
                )}
                {stockFilter === "instock" && (
                  <ActiveTag label="In Stock Only" onRemove={() => setStockFilter("all")} />
                )}
                {query && <ActiveTag label={`"${query}"`} onRemove={() => setQuery("")} />}
                {priceRange < maxPrice && (
                  <ActiveTag label={`≤ BD ${priceRange.toFixed(3)}`} onRemove={() => setPriceRange(maxPrice)} />
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-28 text-center">
                <Tag className="h-10 w-10 mx-auto mb-4 text-muted-foreground/40" />
                <p className="text-muted-foreground">No products match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-primary underline underline-offset-2"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      category={categories.find((c) => c.id === product.categoryId)}
                    />
                  ))}
                </div>

                {/* Progress + sentinel */}
                <div className="mt-8 flex flex-col items-center gap-3">
                  {/* progress bar */}
                  <div className="w-full max-w-xs h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((visibleCount / filtered.length) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} products
                  </p>

                  {hasMore ? (
                    /* Sentinel div — IO fires when this enters viewport */
                    <div ref={sentinelRef} className="py-4 flex items-center gap-2 text-muted-foreground text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading more…
                    </div>
                  ) : (
                    filtered.length > PAGE_SIZE && (
                      <p className="py-4 text-xs text-muted-foreground">You've seen all {filtered.length} products</p>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Sidebar({
  stockFilter, setStockFilter, priceRange, priceMax, setPriceRange, hasActiveFilters, clearFilters,
}: {
  stockFilter: "all" | "instock";
  setStockFilter: (v: "all" | "instock") => void;
  priceRange: number;
  priceMax: number;
  setPriceRange: (v: number) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}) {
  return (
    <>
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          <X className="h-3.5 w-3.5" /> Clear all filters
        </button>
      )}

      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">Availability</h4>
        <div className="flex flex-col gap-2.5">
          {(["all", "instock"] as const).map((v) => (
            <label
              key={v}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setStockFilter(v)}
            >
              <div className={cn(
                "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                stockFilter === v ? "border-primary bg-primary" : "border-border group-hover:border-primary/50",
              )}>
                {stockFilter === v && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>
              <span className={cn(
                "text-sm transition-colors",
                stockFilter === v ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground",
              )}>
                {v === "all" ? "All Products" : "In Stock Only"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {priceMax > 0 && (
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">Max Price</h4>
          <input
            type="range" min={0} max={priceMax} step={0.001} value={priceRange}
            onChange={(e) => setPriceRange(parseFloat(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>BD 0</span>
            <span className="font-medium text-foreground">BD {priceRange.toFixed(3)}</span>
            <span>BD {priceMax.toFixed(3)}</span>
          </div>
        </div>
      )}
    </>
  );
}
