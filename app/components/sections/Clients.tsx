"use client";

import { motion } from "framer-motion";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, clientName: string) => {
  const target = e.target as HTMLImageElement;
  target.src = `https://via.placeholder.com/200x80/8B4513/FFFFFF?text=${encodeURIComponent(clientName)}`;
};

const clients = [
  {
    name: "Lulu Hypermarket",
    logo: "/assets/clients/lulu.png",
    category: "Retail"
  },
  {
    name: "Al Jazira Supermarket",
    logo: "/assets/clients/aljazira.png",
    category: "Retail"
  },
  {
    name: "Alosra Supermarket", 
    logo: "/assets/clients/alosra.jpg",
    category: "Retail"
  },
  {
    name: "The Ritz-Carlton",
    logo: "/assets/clients/Ritz-Carlton.png",
    category: "Hospitality"
  },
  {
    name: "Gulf Hotel",
    logo: "/assets/clients/gulfhotel.png",
    category: "Hospitality"
  },
];

export const Clients = () => (
  <section className="py-24 md:py-32 bg-surface-elevated">
    <div className="container">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Our Clients</span>
          <span className="h-px w-10 bg-primary" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
          Trusted by Bahrain's most <em>discerning retailers, hotels & restaurants</em>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          From premium hospitality to leading retail chains, we're proud to serve those who demand excellence
        </p>
      </div>

      {/* All Clients Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {clients.map((client, i) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="bg-background rounded-lg p-6 md:p-8 h-40 md:h-44 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 md:h-20 flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  onError={(e) => handleImageError(e, client.name)}
                />
              </div>
              <h3 className="font-medium text-sm md:text-base text-foreground/80 leading-tight">
                {client.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Statement */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-20 text-center"
      >
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join these industry leaders who trust Chtaura for premium Mediterranean food products
        </p>
      </motion.div>
    </div>
  </section>
);
