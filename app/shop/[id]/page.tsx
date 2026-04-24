"use client";

import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Package, CheckCircle, XCircle, ShoppingCart,
  Plus, Minus, Tag, ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import type { Product, Category } from "@/shop/page";

function imgSrc(url: string) {
  if (!url) return "";
  return `/api/image?url=${encodeURIComponent(url)}`;
}

function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((r) => r.json()),
  });
}

function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/categories").then((r) => r.json()),
  });
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const { addItem, openCart } = useCart();

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);
  const category = categories.find((c) => c.id === product?.categoryId);

  // Related products — same category, exclude current
  const related = products
    .filter((p) => p.categoryId === product?.categoryId && p.id !== id)
    .slice(0, 4);

  function handleAdd() {
    if (!product || !product.inStock) return;
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
        categoryName: category?.name,
      });
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  }

  if (isLoading) {
    return (
      <div className="container py-32 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="aspect-square bg-muted rounded" />
          <div className="space-y-4 pt-6">
            <div className="h-3 w-24 bg-muted rounded" />
            <div className="h-8 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="h-10 w-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-40 text-center">
        <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
        <p className="text-muted-foreground mb-4">Product not found.</p>
        <Link href="/shop" className="text-primary underline underline-offset-2 text-sm">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface-warm">
        <div className="container py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="hover:text-foreground transition-colors cursor-pointer">{category.name}</span>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-square bg-surface-warm border border-border overflow-hidden rounded-sm">
              {product.image ? (
                <img
                  src={imgSrc(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-20 w-20 text-muted-foreground/20" />
                </div>
              )}
            </div>

            {product.isFeatured && (
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-full">
                Featured
              </span>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Category + SKU */}
            <div className="flex items-center gap-3 mb-4">
              {category && (
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">{category.name}</span>
              )}
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground font-mono">{product.sku}</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-muted-foreground mb-6">{product.description}</p>
            )}

            {/* Stock */}
            <div className={cn(
              "inline-flex items-center gap-2 text-sm font-medium mb-6",
              product.inStock ? "text-secondary" : "text-destructive/70",
            )}>
              {product.inStock
                ? <><CheckCircle className="h-4 w-4" /> In Stock</>
                : <><XCircle className="h-4 w-4" /> Out of Stock</>}
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl md:text-5xl">
                  {product.price > 0 ? `BD ${product.price.toFixed(3)}` : "—"}
                </span>
                {product.unit && (
                  <span className="text-sm text-muted-foreground">per {product.unit}</span>
                )}
              </div>
            </div>

            {/* Qty + Add to cart */}
            {product.inStock ? (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-full h-12">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="h-12 w-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium text-lg">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="h-12 w-12 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={cn(
                    "flex-1 h-12 rounded-full flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wider transition-all duration-300",
                    added
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground shadow-warm hover:shadow-elegant hover:-translate-y-0.5",
                  )}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            ) : (
              <div className="h-12 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground mb-6">
                Currently Unavailable
              </div>
            )}

            {/* Total for qty > 1 */}
            {qty > 1 && product.price > 0 && (
              <p className="text-sm text-muted-foreground mb-6">
                Total: <span className="font-medium text-foreground">BD {(product.price * qty).toFixed(3)}</span>
              </p>
            )}

            {/* Meta */}
            <div className="border-t border-border pt-6 space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="text-muted-foreground w-28 shrink-0">Unit</span>
                <span>{product.unit || "—"}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-muted-foreground w-28 shrink-0">SKU</span>
                <span className="font-mono">{product.sku}</span>
              </div>
              {category && (
                <div className="flex gap-3">
                  <span className="text-muted-foreground w-28 shrink-0">Category</span>
                  <span>{category.name}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20 md:mt-28">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl md:text-3xl">More from {category?.name}</h2>
              <span className="h-px flex-1 bg-border" />
              <Link href="/shop" className="text-sm text-primary hover:underline underline-offset-2 flex items-center gap-1">
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId);
                return (
                  <Link
                    key={p.id}
                    href={`/shop/${p.id}`}
                    className="group border border-border hover:border-primary/30 hover:shadow-warm transition-all duration-300 bg-background"
                  >
                    <div className="aspect-square bg-surface-warm overflow-hidden">
                      {p.image ? (
                        <img
                          src={imgSrc(p.image)}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Tag className="h-8 w-8 text-muted-foreground/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground mb-0.5">{cat?.name}</p>
                      <p className="text-sm font-medium line-clamp-2 leading-snug group-hover:text-primary transition-colors">{p.name}</p>
                      <p className="mt-1.5 font-display text-base">
                        {p.price > 0 ? `BD ${p.price.toFixed(3)}` : "—"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
