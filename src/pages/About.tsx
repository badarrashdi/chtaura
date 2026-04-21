import { PageHero } from "@/components/PageHero";
import warehouse from "@/assets/warehouse.jpg";
import { motion } from "framer-motion";

const values = [
  { title: "Provenance", body: "Every product traces back to a producer we know, a region we trust, a story we believe in." },
  { title: "Patience", body: "Slow-aged balsamics, traditional pasta, single-estate olive oils. Quality cannot be rushed." },
  { title: "Partnership", body: "Long-term relationships with brands and clients — not transactions, but trust." },
  { title: "Precision", body: "Cold chains kept, temperatures logged, deliveries on time. The unromantic part of romance." },
];

const About = () => (
  <>
    <PageHero
      eyebrow="About Chtaura"
      title={<>A house built on <em>good food</em>, since 1994.</>}
      description="Chtaura CO. W.L.L is one of Bahrain's leading importers, distributors and wholesalers of premium food and beverages. We are a family business with a portfolio that spans the Mediterranean and beyond."
    />

    <section className="py-24 md:py-32">
      <div className="container grid lg:grid-cols-12 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-6"
        >
          <img src={warehouse} alt="Chtaura warehouse" loading="lazy" width={1600} height={1200} className="w-full h-[520px] object-cover shadow-elegant" />
        </motion.div>
        <div className="lg:col-span-6 lg:pl-8 space-y-6 text-lg text-muted-foreground text-pretty">
          <p>Founded in 1994 by a family with deep Levantine roots, Chtaura began with a simple conviction: that the food we eat should be made with intention — by people who care, in places that matter.</p>
          <p>Three decades on, we represent some of the world's most respected food and beverage houses — from Modena's centuries-old balsamic vinegar producers to Greek olive oil estates, Italian pasta artisans, and Turkish heritage producers.</p>
          <p>Our headquarters and distribution centre in Salmabad serves every modern trade outlet, traditional grocer, hotel and restaurant in the kingdom — quietly, reliably, day after day.</p>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 bg-surface-elevated">
      <div className="container">
        <h2 className="font-display text-4xl md:text-5xl mb-16 max-w-2xl text-balance">What we believe in.</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t border-border pt-8"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-display text-primary text-xl">0{i + 1}</span>
                <h3 className="font-display text-3xl">{v.title}</h3>
              </div>
              <p className="text-muted-foreground text-pretty pl-10">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
