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
            src="/assets/about-img.jpeg"
            alt="Chtaura warehouse — premium imported food shelves"
            loading="lazy"
            width={1600}
            height={1200}
            className="w-full h-[520px] object-cover shadow-elegant"
          />
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
          Welcome to Chtaura CO. W.L.L

        </h2>

        <p className="mt-8 text-lg text-muted-foreground max-w-xl text-pretty">
        A leading importers, distributors and wholesales of food and beverages. Since inception in 1994 we have been supplying retailers, restaurants, hotels and businesses with food products from around the world. As food distributors we represent and connect the best food brands to Bahrain's market with an extensive list of customers and suppliers, as can be seen from our portfolio.


        </p>


      </motion.div>
    </div>
  </section>
);
