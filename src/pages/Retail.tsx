import { PageHero } from "@/components/PageHero";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import retail from "@/assets/retail-store.jpg";
import oil from "@/assets/olive-oil.jpg";
import pasta from "@/assets/pasta.jpg";

const Retail = () => (
  <>
    <PageHero
      eyebrow="Retail Experience"
      title={<>A pantry you can <em>walk into</em>.</>}
      description="Step inside our flagship gourmet boutique — where the same imported treasures we distribute to Bahrain's best kitchens line wooden shelves, wait in jars, and rest under warm pendant light."
    />

    <section className="py-20 md:py-28">
      <div className="container">
        <motion.img
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          src={retail}
          alt="Chtaura retail boutique"
          loading="lazy"
          width={1600}
          height={1200}
          className="w-full h-[60vh] object-cover shadow-elegant"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Info icon={MapPin} title="Visit us" lines={["Salmabad Industrial Area", "Kingdom of Bahrain"]} />
          <Info icon={Clock} title="Open hours" lines={["Saturday – Thursday", "9:00 AM – 8:00 PM"]} />
          <Info icon={Phone} title="Call ahead" lines={["+973 1753 5075", "info@chtaura.co"]} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <motion.img initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} src={oil} alt="Olive oil tasting" loading="lazy" width={1200} height={1500} className="w-full h-[480px] object-cover" />
          <motion.img initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} src={pasta} alt="Artisan pasta" loading="lazy" width={1200} height={1500} className="w-full h-[480px] object-cover" />
        </div>
      </div>
    </section>
  </>
);

const Info = ({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) => (
  <div className="border-t border-border pt-8">
    <Icon className="h-7 w-7 text-primary mb-4" />
    <h3 className="font-display text-2xl mb-2">{title}</h3>
    {lines.map((l) => <p key={l} className="text-muted-foreground">{l}</p>)}
  </div>
);

export default Retail;
