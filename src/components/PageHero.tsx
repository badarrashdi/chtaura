import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

export const PageHero = ({ eyebrow, title, description, children }: Props) => (
  <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden bg-gradient-sunset border-b border-border">
    <div className="absolute inset-0 grain pointer-events-none" />
    <div className="container relative z-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">{eyebrow}</span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl xl:text-7xl leading-[0.95] text-balance">{title}</h1>
        {description && <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">{description}</p>}
        {children}
      </motion.div>
    </div>
  </section>
);
