"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Package, Truck, Store, CreditCard,
  Banknote, Minus, Plus, Trash2, ArrowLeft, Loader2,
  CheckCircle, AlertCircle, User, Phone, MapPin, FileText,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const DELIVERY_FEE = 2.0;
const MIN_ORDER = 15.0;

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

type DeliveryType = "delivery" | "pickup";
type PaymentMethod = "cod";

function imgSrc(url: string) {
  if (!url) return "";
  return `/api/image?url=${encodeURIComponent(url)}`;
}

function Field({
  label, icon: Icon, error, ...props
}: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label: string;
  icon: React.ElementType;
  error?: string;
  as?: "textarea";
}) {
  const { as: Tag = "input", ...rest } = props as typeof props & { as?: "textarea" };
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        {Tag === "textarea" ? (
          <textarea
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={cn(
              "w-full rounded-lg border bg-background pl-11 pr-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
              error ? "border-destructive" : "border-border",
            )}
          />
        ) : (
          <input
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            className={cn(
              "w-full h-12 rounded-lg border bg-background pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
              error ? "border-destructive" : "border-border",
            )}
          />
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [paymentMethod] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState<OrderForm>({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Partial<OrderForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const deliveryFee = deliveryType === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  // Redirect if cart empty
  useEffect(() => {
    if (items.length === 0) router.replace("/shop");
  }, [items.length, router]);

  function validate(): boolean {
    const e: Partial<OrderForm> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[\d\s+()-]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (deliveryType === "delivery" && !form.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError("");

    const payload = {
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      total,
      status: "new",
      customerName: form.name,
      customerPhone: form.phone,
      customerAddress: form.address,
      customerNotes: form.notes,
      deliveryType,
      paymentMethod,
      paymentStatus: "pending",
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message ?? `Error ${res.status}`);
      }

      const order = await res.json();
      clearCart();
      router.push(`/checkout/success?orderId=${order.id}&total=${total.toFixed(3)}`);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface-warm">
        <div className="container py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Checkout</span>
        </div>
      </div>

      <div className="container py-10 md:py-14 max-w-6xl">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
          <span className="h-px flex-1 bg-border" />
          <h1 className="font-display text-2xl md:text-3xl">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
            {/* Left: Form */}
            <div className="space-y-8">
              {/* Delivery method */}
              <section className="border border-border rounded-sm p-6 space-y-4">
                <h2 className="font-display text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" /> Delivery Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {([
                    { value: "delivery", label: "Home Delivery", sub: `BD ${DELIVERY_FEE.toFixed(3)} fee · Across Bahrain`, icon: Truck },
                    { value: "pickup", label: "Store Pickup", sub: "Free · Pick up from our store", icon: Store },
                  ] as const).map(({ value, label, sub, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setDeliveryType(value)}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-sm border-2 text-left transition-all",
                        deliveryType === value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80",
                      )}
                    >
                      <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                        deliveryType === value ? "border-primary bg-primary" : "border-border"
                      )}>
                        {deliveryType === value && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium text-sm">{label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Customer details */}
              <section className="border border-border rounded-sm p-6 space-y-5">
                <h2 className="font-display text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Your Details
                </h2>

                <Field
                  label="Full Name *"
                  icon={User}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: (e.target as HTMLInputElement).value })}
                  error={errors.name}
                />

                <Field
                  label="Phone Number *"
                  icon={Phone}
                  type="tel"
                  placeholder="+973 XXXX XXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: (e.target as HTMLInputElement).value })}
                  error={errors.phone}
                />

                <AnimatePresence>
                  {deliveryType === "delivery" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <Field
                        label="Delivery Address *"
                        icon={MapPin}
                        placeholder="Block, Road, Building, Area"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: (e.target as HTMLInputElement).value })}
                        error={errors.address}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                    Notes (optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <textarea
                      rows={3}
                      placeholder="Special instructions, gate code, etc."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background pl-11 pr-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section className="border border-border rounded-sm p-6 space-y-4">
                <h2 className="font-display text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" /> Payment Method
                </h2>
                <div
                  className="flex items-start gap-3 p-4 rounded-sm border-2 border-primary bg-primary/5"
                >
                  <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      <span className="font-medium text-sm">Cash on Delivery</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Pay in cash when your order arrives</p>
                  </div>
                </div>
              </section>

              {/* API error */}
              <AnimatePresence>
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 rounded-sm border border-destructive/30 bg-destructive/5 text-destructive text-sm"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {apiError}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Order summary */}
            <div className="space-y-4">
              <div className="border border-border rounded-sm overflow-hidden sticky top-28">
                {/* Items */}
                <div className="p-5 border-b border-border">
                  <h2 className="font-display text-lg mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Order Summary
                    <span className="text-sm text-muted-foreground font-sans font-normal ml-auto">
                      {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
                    </span>
                  </h2>

                  <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="h-16 w-16 shrink-0 bg-surface-warm border border-border overflow-hidden rounded-sm">
                          {item.image ? (
                            <img src={imgSrc(item.image)} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-5 w-5 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2 leading-snug">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.unit}</p>
                          <div className="flex items-center justify-between mt-1.5">
                            <div className="flex items-center gap-1 border border-border rounded-full h-6">
                              <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                              <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-display text-sm">BD {(item.price * item.quantity).toFixed(3)}</span>
                              <button type="button" onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>BD {subtotal.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryFee > 0 ? `BD ${deliveryFee.toFixed(3)}` : "Free"}</span>
                  </div>

                  {subtotal < MIN_ORDER && (
                    <div className="flex items-center gap-2 p-3 rounded-sm bg-accent/15 border border-accent/30 text-xs">
                      <AlertCircle className="h-3.5 w-3.5 text-accent-foreground shrink-0" />
                      <span>Min. order BD {MIN_ORDER.toFixed(3)} — add BD {(MIN_ORDER - subtotal).toFixed(3)} more</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-3 flex justify-between items-baseline">
                    <span className="font-medium">Total</span>
                    <span className="font-display text-2xl">BD {total.toFixed(3)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || subtotal < MIN_ORDER}
                    className={cn(
                      "w-full h-13 rounded-full flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wider transition-all duration-200",
                      submitting || subtotal < MIN_ORDER
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground shadow-warm hover:shadow-elegant hover:-translate-y-0.5",
                    )}
                  >
                    {submitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Placing Order…</>
                    ) : (
                      <><CheckCircle className="h-4 w-4" /> Place Order · BD {total.toFixed(3)}</>
                    )}
                  </button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    By placing your order you agree to our terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
