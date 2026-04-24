"use client";

import { use } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Home, Phone, Package } from "lucide-react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const total = params.get("total");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="h-24 w-24 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="h-12 w-12 text-secondary" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Order Confirmed</span>
            <span className="h-px w-8 bg-primary" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-3">
            Thank you!
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Your order has been placed successfully. We'll be in touch shortly.
          </p>
        </motion.div>

        {/* Order details card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border border-border rounded-sm bg-surface-warm p-6 mb-8 text-left space-y-4"
        >
          {orderId && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">Order ID</span>
              </div>
              <span className="font-mono text-sm font-medium text-right break-all">
                #{orderId.slice(0, 8).toUpperCase()}
              </span>
            </div>
          )}
          {total && (
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total Paid</span>
              <span className="font-display text-xl">BD {total}</span>
            </div>
          )}

          <div className="border-t border-border pt-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              Payment via <span className="font-medium text-foreground">Cash on Delivery</span> — please have the exact amount ready.
            </p>
            <p className="text-xs text-muted-foreground">
              Our team will call you to confirm delivery details.
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/shop"
            className="flex-1 h-12 rounded-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium shadow-warm hover:shadow-elegant hover:-translate-y-0.5 transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 h-12 rounded-full flex items-center justify-center gap-2 border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </motion.div>

        {/* Help */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-xs text-muted-foreground"
        >
          Questions?{" "}
          <a href="tel:+97317535075" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-2">
            <Phone className="h-3 w-3" />
            +973 1753 5075
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
