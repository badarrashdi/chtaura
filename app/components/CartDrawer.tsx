"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, totalItems, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-elegant flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl">Your Cart</h2>
                {totalItems > 0 && (
                  <span className="h-6 px-2 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
                <div className="h-20 w-20 rounded-full bg-surface-warm flex items-center justify-center">
                  <ShoppingBag className="h-9 w-9 text-muted-foreground/40" />
                </div>
                <div>
                  <p className="font-display text-xl mb-1">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">Add products from the shop to get started.</p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4"
                      >
                        {/* Image */}
                        <div className="h-20 w-20 shrink-0 rounded-lg border border-border bg-surface-warm overflow-hidden">
                          {item.image ? (
                            <img
                              src={`/api/image?url=${encodeURIComponent(item.image)}`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          {item.categoryName && (
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
                              {item.categoryName}
                            </p>
                          )}
                          <p className="text-sm font-medium line-clamp-2 leading-snug">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.unit}</p>

                          <div className="flex items-center justify-between mt-2">
                            {/* Qty stepper */}
                            <div className="flex items-center gap-1 border border-border rounded-full h-7">
                              <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-display text-base">
                                BD {(item.price * item.quantity).toFixed(3)}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="h-6 w-6 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="border-t border-border px-6 py-5 space-y-4 bg-background">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Delivery fee</span>
                    <span>BD 2.000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="font-display text-2xl">BD {subtotal.toFixed(3)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Min. order BD 15.000 · Delivery added at checkout</p>

                  {subtotal >= 15 ? (
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="w-full h-13 rounded-full flex items-center justify-center gap-2 text-sm font-medium bg-primary text-primary-foreground shadow-warm hover:shadow-elegant hover:-translate-y-0.5 transition-all"
                    >
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <div className="w-full h-13 rounded-full flex items-center justify-center gap-2 text-sm font-medium bg-muted text-muted-foreground cursor-not-allowed">
                      Add BD {(15 - subtotal).toFixed(3)} more to checkout
                    </div>
                  )}

                  <button
                    onClick={clearCart}
                    className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors text-center"
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
