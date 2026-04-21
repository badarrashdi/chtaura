import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import retail from "@/assets/retail-store.jpg";
import oil from "@/assets/olive-oil.jpg";
import pasta from "@/assets/pasta.jpg";

export const RetailExperience = () => (
  <section className="relative py-24 md:py-36 bg-background overflow-hidden">
    <div className="container grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 relative h-[600px] md:h-[680px]">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          src={retail}
          loading="lazy"
          width={1600}
          height={1200}
          alt="Chtaura retail store interior"
          className="absolute inset-0 w-full h-full object-cover shadow-elegant"
        />
        <motion.img
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          src={oil}
          loading="lazy"
          width={1200}
          height={1500}
          alt="Olive oil being poured"
          className="hidden md:block absolute -bottom-8 -right-8 w-48 h-60 object-cover shadow-warm border-8 border-background"
        />
        <motion.img
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          src={pasta}
          loading="lazy"
          width={1200}
          height={1500}
          alt="Artisan pasta varieties"
          className="hidden md:block absolute -top-8 -left-8 w-40 h-52 object-cover shadow-warm border-8 border-background"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="lg:col-span-5"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Retail experience</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] text-balance">
          A pantry you can <em>walk into</em>.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground text-pretty">
          Step inside our flagship gourmet boutique — wooden shelves laden with
          the same imported treasures we distribute to Bahrain's best kitchens.
          Discover, taste, and bring a piece of the Mediterranean home.
        </p>
        <Link
          to="/retail"
          className="mt-8 inline-flex items-center gap-3 text-sm font-medium border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
        >
          Visit the retail experience <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);
