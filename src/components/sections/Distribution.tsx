import { motion } from "framer-motion";
import { Building2, ChefHat, Hotel, ShoppingBasket, Truck, Warehouse } from "lucide-react";

const services = [
  { icon: Truck, title: "Island-wide logistics", body: "Refrigerated and ambient distribution to every corner of Bahrain, daily." },
  { icon: Warehouse, title: "Cold-chain warehousing", body: "State-of-the-art storage facilities preserving quality from origin to shelf." },
  { icon: ShoppingBasket, title: "Modern & traditional retail", body: "Hypermarkets, supermarkets and neighbourhood grocers across the kingdom." },
  { icon: Hotel, title: "Hotels & resorts", body: "Trusted partner to Bahrain's leading hospitality brands." },
  { icon: ChefHat, title: "Restaurants & cafés", body: "From café-bistros to fine dining, we supply the kitchens that matter." },
  { icon: Building2, title: "Institutional supply", body: "Catering, airlines and corporate clients with reliable, scalable service." },
];

export const Distribution = () => (
  <section className="relative py-24 md:py-36 bg-surface-warm overflow-hidden">
    <div className="container">
      <div className="grid lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Distribution & logistics</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.05] text-balance">
            From the warehouse to the <em>last mile</em>.
          </h2>
        </div>
        <p className="lg:col-span-6 lg:pt-16 text-lg text-muted-foreground text-pretty max-w-xl">
          Our integrated supply chain is built for the realities of premium food:
          climate-controlled at every step, responsive to the rhythms of retail and
          restaurants, and grounded in three decades of relationships across Bahrain.
        </p>
      </div>

      <div className="grid gap-px bg-border border border-border md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="bg-background p-8 md:p-10 hover:bg-surface-elevated transition-colors group"
          >
            <s.icon className="h-8 w-8 text-primary mb-6 transition-transform group-hover:scale-110" strokeWidth={1.5} />
            <h3 className="font-display text-2xl mb-3">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
