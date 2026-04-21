import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const PartnerCTA = () => (
  <section className="relative py-24 md:py-36 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-terracotta" />
    <div className="absolute inset-0 grain pointer-events-none" />

    <div className="container relative z-10 text-center max-w-4xl mx-auto text-primary-foreground">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="text-xs uppercase tracking-[0.3em] opacity-80">Partner with us</span>
        <h2 className="mt-6 font-display text-4xl md:text-6xl xl:text-7xl leading-[1.02] text-balance">
          Bring your brand to <em className="italic">Bahrain</em>,<br className="hidden md:block" />
          with a partner who knows the market.
        </h2>
        <p className="mt-8 text-lg md:text-xl opacity-90 max-w-2xl mx-auto text-pretty">
          We're always looking for exceptional food and beverage producers who share
          our commitment to provenance, quality and craft.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 items-center justify-center">
          <Link
            to="/partner"
            className="group inline-flex items-center gap-3 rounded-full bg-background px-7 py-4 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="mailto:info@chtaura.co"
            className="inline-flex items-center gap-2 px-3 py-4 text-sm font-medium border-b border-primary-foreground hover:opacity-80 transition-opacity"
          >
            info@chtaura.co
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);
