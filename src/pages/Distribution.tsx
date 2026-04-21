import { PageHero } from "@/components/PageHero";
import { Distribution as DistributionSection } from "@/components/sections/Distribution";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const capabilities = [
  "Temperature-controlled warehousing (ambient, chilled, frozen)",
  "Daily island-wide delivery fleet",
  "Demand planning & inventory management for clients",
  "Customs clearance and import documentation",
  "In-store merchandising and category management",
  "Promotional planning and trade marketing",
];

const Distribution = () => (
  <>
    <PageHero
      eyebrow="Distribution & Logistics"
      title={<>An end-to-end supply chain, <em>built for premium food</em>.</>}
      description="From the producer's gate to your shelf, we own every link in the chain — because that's the only way to guarantee a 30-year balsamic still tastes like one when it arrives."
    />

    <DistributionSection />

    <section className="py-24 md:py-32">
      <div className="container grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-balance">Capabilities at a glance.</h2>
          <p className="mt-6 text-muted-foreground text-pretty">
            Whether you are an international brand looking for a Bahraini partner or a
            local retailer needing reliable supply, our infrastructure is at your service.
          </p>
        </div>
        <ul className="space-y-5">
          {capabilities.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex gap-4 items-start text-lg border-b border-border pb-5"
            >
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
              <span>{c}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default Distribution;
