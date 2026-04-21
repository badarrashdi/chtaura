import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import hero from "@/assets/hero-pantry.jpg";

export const Hero = () => (
  <section className="relative min-h-[92vh] overflow-hidden bg-background">
    {/* Editorial split layout */}
    <div className="absolute inset-0 lg:right-1/2 z-0">
      <img
        src={hero}
        alt="Mediterranean pantry: olive oil, tomatoes, parmigiano, basil and pasta"
        className="h-full w-full object-cover"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
    </div>

    {/* Decorative serif */}
    <div className="absolute top-28 left-6 lg:left-12 z-10 mix-blend-difference text-background/30 select-none pointer-events-none">
      <span className="font-display italic text-[12vw] lg:text-[7vw] leading-none tracking-tighter">est. 1994</span>
    </div>

    <div className="container relative z-20 grid min-h-[92vh] lg:grid-cols-2 items-end lg:items-center gap-12 pt-32 pb-20">
      <div className="hidden lg:block" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="lg:pl-12 max-w-xl"
      >
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">
            A Bahraini house of fine food
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl xl:text-7xl leading-[0.95] text-foreground text-balance">
          The art of <em className="text-primary not-italic font-display">intelligent</em>{" "}
          <span className="italic">eating.</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground font-body max-w-lg text-pretty">
          For three decades, Chtaura has imported, distributed and curated the
          Mediterranean's most considered food and beverage brands — bringing them
          to the tables, shelves and kitchens of Bahrain.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <Link
            to="/brands"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:bg-primary hover:shadow-warm"
          >
            Explore the brands
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 px-3 py-4 text-sm font-medium border-b border-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Partner with us
          </Link>
        </div>
      </motion.div>
    </div>

    {/* Scroll cue */}
    <div className="hidden lg:flex absolute bottom-10 right-10 z-20 items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/60">
      <span>Scroll</span>
      <span className="h-12 w-px bg-foreground/40" />
    </div>
  </section>
);
