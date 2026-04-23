"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChefHat, Hotel, ShoppingBasket, Truck, Warehouse } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const slides = [
  { src: "/assets/hero/warehouse-main.jpg",      alt: "Chtaura warehouse main aisle" },
  { src: "/assets/hero/warehouse-forklift.jpg",  alt: "Chtaura warehouse operations floor" },
  { src: "/assets/hero/warehouse-beverages.jpg", alt: "Chtaura warehouse — beverages stock" },
  { src: "/assets/hero/warehouse-cold.jpg",      alt: "Chtaura cold storage facility" },
];

const features = [
  { icon: Truck,          title: "Island-wide Delivery",  subtitle: "Covering all of Bahrain" },
  { icon: Warehouse,      title: "Warehousing",           subtitle: "Temperature-controlled storage" },
  { icon: ShoppingBasket, title: "Import Logistics",      subtitle: "Global sourcing network" },
  { icon: Building2,      title: "Timely Service",        subtitle: "Reliable delivery schedules" },
];

const reach = [
  { icon: ShoppingBasket, label: "Supermarkets & hypermarkets" },
  { icon: Hotel,          label: "Hotels & resorts" },
  { icon: ChefHat,        label: "Restaurants & catering" },
  { icon: Building2,      label: "Institutional clients" },
];

const capabilities = [
  "Multi-temperature storage (ambient, chilled, frozen)",
  "Temperature-controlled delivery fleet",
  "Nationwide distribution coverage",
  "Dedicated sales and merchandising support",
];

function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-[540px] overflow-hidden bg-foreground">
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={slides[index].src}
          alt={slides[index].alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-primary" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function DistributionPage() {
  return (
    <>
      <PageHero
        eyebrow="Distribution & Logistics"
        title={<>Reliable Distribution <em>Across Bahrain</em></>}
        description="Chtaura operates a trusted distribution network, supplying premium food products across Bahrain to retail, hospitality, and institutional clients."
      />

      {/* Slider left, text right */}
      <section className="py-24 md:py-32">
        <div className="container grid lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:sticky lg:top-32"
          >
            <ImageSlider />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="space-y-8"
          >
            <div className="space-y-5 text-lg text-muted-foreground text-pretty">
              <p>
                With over <strong className="text-foreground">three decades of experience</strong>, we ensure consistent, efficient delivery while maintaining the highest standards of quality and product integrity.
              </p>
              <p>
                At Chtaura, distribution goes beyond delivery. We are committed to reliability, consistency, and ensuring that every product reaches the market in <strong className="text-foreground">optimal condition</strong>.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl mb-5">Our Capabilities</h3>
              <ul className="space-y-3">
                {capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-2xl mb-5">Our Reach</h3>
              <p className="text-muted-foreground mb-5">
                We serve a wide range of clients across Bahrain:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {reach.map((r) => (
                  <div key={r.label} className="flex items-center gap-3 text-sm text-muted-foreground border border-border rounded-lg px-4 py-3">
                    <r.icon className="h-4 w-4 text-primary shrink-0" strokeWidth={1.5} />
                    {r.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Feature cards */}
      <section className="py-20 bg-surface-elevated border-y border-border">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-surface-elevated flex flex-col gap-3 p-8"
              >
                <f.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
