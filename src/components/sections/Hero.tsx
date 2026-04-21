import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroPantry from "@/assets/hero-pantry.jpg";
import heroTable from "@/assets/hero-table.jpg";
import heroGrove from "@/assets/hero-grove.jpg";
import heroArtisan from "@/assets/hero-artisan.jpg";

const slides = [
  {
    image: heroPantry,
    alt: "Mediterranean pantry: olive oil, tomatoes, parmigiano, basil and pasta",
    caption: "The pantry",
  },
  {
    image: heroTable,
    alt: "Rustic Mediterranean table with burrata, tomatoes, bread and olive oil",
    caption: "The table",
  },
  {
    image: heroGrove,
    alt: "Ancient olive grove at golden hour",
    caption: "The grove",
  },
  {
    image: heroArtisan,
    alt: "Artisan hands kneading fresh pasta dough",
    caption: "The craft",
  },
];

const ROTATE_MS = 5500;

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-foreground">
      {/* Rotating image layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 7, ease: "easeOut" } }}
            className="absolute inset-0"
          >
            <img
              src={slides[index].image}
              alt={slides[index].alt}
              className="h-full w-full object-cover"
              width={1920}
              height={1280}
            />
          </motion.div>
        </AnimatePresence>

        {/* Readability gradient — stronger on the upper-left */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/40 to-foreground/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      </div>

      {/* Decorative serif est. 1994 */}
      <div className="absolute bottom-10 right-6 lg:right-12 z-10 text-background/20 select-none pointer-events-none">
        <span className="font-display italic text-[14vw] lg:text-[8vw] leading-none tracking-tighter">est. 1994</span>
      </div>

      {/* Text content — upper left */}
      <div className="container relative z-20 flex min-h-[92vh] flex-col justify-start pt-36 md:pt-40 lg:pt-44 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-background"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">
              A Bahraini house of fine food
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl leading-[0.95] text-balance">
            The art of <em className="text-primary not-italic font-display">intelligent</em>{" "}
            <span className="italic">eating.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-background/85 font-body max-w-xl text-pretty">
            For three decades, Chtaura has imported, distributed and curated the
            Mediterranean's most considered food and beverage brands — bringing them
            to the tables, shelves and kitchens of Bahrain.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link
              to="/brands"
              className="group inline-flex items-center gap-3 rounded-full bg-background px-7 py-4 text-sm font-medium text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-warm"
            >
              Explore the brands
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/partner"
              className="inline-flex items-center gap-2 px-3 py-4 text-sm font-medium border-b border-background/70 text-background hover:border-primary hover:text-primary transition-colors"
            >
              Partner with us
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide indicators — bottom left */}
      <div className="absolute bottom-10 left-6 lg:left-12 z-30 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.caption}
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}: ${s.caption}`}
              className="group flex flex-col items-start gap-2"
            >
              <span
                className={`block h-px transition-all duration-500 ${
                  i === index ? "w-12 bg-primary" : "w-6 bg-background/40 group-hover:bg-background/70"
                }`}
              />
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={slides[index].caption}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.4 }}
            className="font-display italic text-background/80 text-sm"
          >
            {slides[index].caption}
          </motion.span>
        </AnimatePresence>
      </div>
    </section>
  );
};
