"use client";

import { motion } from "framer-motion";

const clients = [
  "Lulu Hypermarket",
  "Al Jazira Supermarket",
  "Alosra Supermarket",
  "Gulf Hotel",
  "The Ritz-Carlton",
  "Four Seasons",
  "Jasmis",
  "Carrefour",
];

export const Clients = () => (
  <section className="py-24 md:py-32 bg-surface-elevated">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Our Clients
</span>
          <span className="h-px w-10 bg-primary" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-balance">
          Trusted by Bahrain's most discerning <em>retailers, hotels & restaurants</em>.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
        {clients.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-background h-32 md:h-40 grid place-items-center px-6 hover:bg-surface-warm transition-colors"
          >
            <p className="font-display text-xl md:text-2xl text-center text-foreground/70">{c}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
