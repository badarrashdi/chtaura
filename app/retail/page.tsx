"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  { src: "/assets/hero/store111.jpg",      alt: "Chtaura warehouse main aisle" },
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

const Info = ({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) => (
  <div className="border-t border-border pt-8">
    <Icon className="h-7 w-7 text-primary mb-4" />
    <h3 className="font-display text-2xl mb-2">{title}</h3>
    {lines.map((l) => <p key={l} className="text-muted-foreground">{l}</p>)}
  </div>
);

export default function RetailPage() {
  const features = [
  {
    n: "01",
    title: "Strong Partnerships",
    body: "Built on trust and results",
  },
  {
    n: "02",
    title: "Market Growth",
    body: "Expanding your brand reach",
  },
  {
    n: "03",
    title: "Quality Assured",
    body: "Strict quality standards",
  },
  {
    n: "04",
    title: "Wide Network",
    body: "Retail & hospitality coverage",
  },
];
  return (
  <>
    <PageHero
      eyebrow="Retail Experience"
      title={<>Connecting Global Food Brands to the Bahrain Market.</>}
      description=""
    />

    <section className="py-20 md:py-28">
      <div className="container">
            <section className="">
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
                      Chtaura Co., Bahrain partners with international food brands to successfully enter, position, and grow within the Kingdom’s dynamic market. With over three decades of experience, we combine strong distribution capabilities, retail presence, and deep market insight to deliver reliable supply, effective brand placement, and sustainable growth across retail, HoReCa, and institutional channels.
                    </p>
                    <div className="mt-12 grid sm:grid-cols-2 gap-6">
  {features.map((f, i) => (
    <motion.div
      key={f.n}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="group relative border border-border rounded-xl p-6 bg-background hover:shadow-soft transition-all"
    >
      {/* Number */}
      <span className="text-primary font-display text-sm tracking-wider">
        {f.n}
      </span>

      {/* Title */}
      <h3 className="font-display text-xl mt-2 mb-2 group-hover:text-primary transition">
        {f.title}
      </h3>

      {/* Body */}
      <p className="text-sm text-muted-foreground">
        {f.body}
      </p>

      {/* subtle hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-primary/5" />
    </motion.div>
  ))}
</div>
        

                  </motion.div>
        
                </div>
              </section>




      </div>
    </section>
  </>
  );
}
