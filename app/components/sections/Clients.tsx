"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  { name: "Lulu Hypermarket",       logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=200" },
  { name: "Al Jazira Supermarket",  logo: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=200" },
  { name: "Alosra Supermarket",     logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=200" },
  { name: "Gulf Hotel",             logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200" },
  { name: "The Ritz-Carlton Bahrain", logo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=200" },
];

export const Clients = () => (
  <section className="py-24 md:py-32 bg-surface-elevated">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-primary/60" />
          <span className="text-xs uppercase tracking-[0.35em] text-primary/80 font-medium">Our Clients</span>
          <span className="h-px w-8 bg-primary/60" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight text-balance">
          Trusted by leading retailers, hotels, and restaurants across Bahrain
        </h2>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden">
        {clients.map((client, i) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="bg-surface-elevated flex flex-col items-center justify-center gap-3 p-6 md:p-8"
          >
            <div className="relative w-full h-14">
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain grayscale"
              />
            </div>
            <span className="text-sm font-medium text-foreground text-center leading-snug">
              {client.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
