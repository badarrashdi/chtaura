"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const slides = [
  { src: "/assets/hero/warehouse-main.jpg",      alt: "Chtaura warehouse main aisle" },
  { src: "/assets/hero/warehouse-beverages.jpg", alt: "Chtaura warehouse — beverages stock" },
  { src: "/assets/hero/warehouse-forklift.jpg",  alt: "Chtaura warehouse — operations" },
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

      {/* Dot indicators */}
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

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Welcome to <em>Chtaura Co. W.L.L.</em></>}
        description="A leading importer, distributor, and wholesaler of food and beverages in Bahrain — established in 1994."
      />

      {/* Main about section */}
      <section className="py-24 md:py-32">
        <div className="container grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — image slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:sticky lg:top-32"
          >
            <ImageSlider />
          </motion.div>

          {/* Right — real content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="space-y-6 text-lg text-muted-foreground text-pretty"
          >
            <p>
              Chtaura is a subsidiary of <strong className="text-foreground">Almaz Company</strong>, a family business founded in 1952 — reflecting a long-standing heritage of quality and trust.
            </p>
            <p>
              We supply retailers, restaurants, hotels, and businesses with carefully selected food products from around the world, supported by a strong network of customers and long-standing supplier partnerships.
            </p>
            <p>
              With over <strong className="text-foreground">30 years of experience</strong>, backed by a heritage dating back to 1952, Chtaura has built a reputation for reliability, consistency, and product quality. Our roots are grounded in Middle Eastern heritage — reflected in our name, inspired by the town of Chtaura in Lebanon.
            </p>
            <p>
              Today, we specialise in Mediterranean and international products, representing a diverse portfolio of premium brands from across global cuisines.
            </p>
            <p>
              At Chtaura, we are committed to carefully selecting products that meet our clients' needs, with a focus on quality ingredients and healthy living.
            </p>

            {/* Vision & Mission */}
            <div className="pt-8 grid sm:grid-cols-2 gap-6">
              <div className="border-t border-border pt-6">
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-2">Our Vision</p>
                <p className="text-foreground font-medium text-base">To lead with quality and trust.</p>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-2">Our Mission</p>
                <p className="text-foreground font-medium text-base">To deliver with consistency and care.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Locations */}
      <section className="py-24 md:py-32 bg-surface-elevated">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Our Locations</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-balance">
              Visit us at one of our <em>branches</em>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Moda Mall",
                address: "164 Bahrain World Trade Center, Manama, Kingdom of Bahrain",
                phone: "+973 1753 5075",
                mapUrl: "https://maps.app.goo.gl/URYUsvEWe57dwyAH8",
              },
              {
                name: "Saar Greens",
                address: "Building 22, Shop 62, Road 7501, Block 575, Al Janabiyah, Kingdom of Bahrain",
                phone: "+973 77927075",
                mapUrl: "https://maps.app.goo.gl/zdYmEVMN53xfPqCH6",
              },
              {
                name: "Gudaibya",
                address: "Building 47, Road 359, Block 321, Kingdom of Bahrain",
                phone: "+973 17716427",
                mapUrl: "https://maps.google.com/?q=26.225847,50.594204",
              },
              {
                name: "Accounts & Sales Office",
                address: "Office 0021, Building B0044, Block 321, Kingdom of Bahrain",
                phone: "+973 17740424",
                mapUrl: null,
              },
              {
                name: "Head Office & Warehouse",
                address: "Sitra — the central hub of Chtaura's operations, supporting distribution and logistics across Bahrain.",
                phone: null,
                mapUrl: null,
                note: "Not open to the public",
              },
            ].map((branch, i) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background border border-border rounded-xl p-7 flex flex-col gap-4"
              >
                <h3 className="font-display text-xl text-foreground">{branch.name}</h3>

                <div className="flex gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-pretty">{branch.address}</span>
                </div>

                {branch.phone && (
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <a href={`tel:${branch.phone}`} className="hover:text-foreground transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                )}

                {branch.note && (
                  <span className="text-xs uppercase tracking-wider text-muted-foreground/50 border border-border rounded-full px-3 py-1 self-start">
                    {branch.note}
                  </span>
                )}

                {branch.mapUrl && (
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-xs font-medium text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors self-start"
                  >
                    View on map
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key facts strip */}
      <section className="py-16 bg-surface-elevated border-y border-border">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "1994", label: "Year established" },
            { value: "1952", label: "Family heritage since" },
            { value: "30+",  label: "Years of experience" },
            { value: "70+",  label: "Premium brands" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-display text-4xl md:text-5xl text-foreground">{s.value}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
