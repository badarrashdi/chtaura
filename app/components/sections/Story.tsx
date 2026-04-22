"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "30+", label: "Years of trade" },
  { value: "70+", label: "Premium brands" },
  { value: "700+", label: "Products" },
  { value: "100%", label: "Island-wide reach" },
];

export const Story = () => (
  <section className="relative py-24 md:py-36 overflow-hidden bg-surface-elevated">
    <div className="container grid lg:grid-cols-12 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-5"
      >
        <div className="relative">
          <img
            src="/assets/warehouse.jpg"
            alt="Chtaura warehouse — premium imported food shelves"
            loading="lazy"
            width={1600}
            height={1200}
            className="w-full h-[520px] object-cover shadow-elegant"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-primary text-primary-foreground p-6 max-w-[220px] shadow-warm">
            <p className="font-display italic text-2xl leading-tight">"From farm to your table — uncompromised."</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-7 lg:pl-12"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Our story</span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] text-balance">
          Three decades of bringing the world's pantry to{" "}
          <em className="text-primary">Bahrain</em>.
        </h2>

        <p className="mt-8 text-lg text-muted-foreground max-w-xl text-pretty">
          Founded in 1994, Chtaura CO. W.L.L is one of Bahrain's leading importers,
          distributors and wholesalers of premium food and beverages. We connect
          carefully selected brands from the Mediterranean and beyond with the
          retailers, hotels, restaurants and home kitchens that demand the best.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 border-t border-border pt-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <div className="font-display text-4xl md:text-5xl text-primary">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
