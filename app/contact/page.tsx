"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const branches = [
  {
    name: "Chtaura Dairies Company W.L.L. (Saar Greens)",
    address: "Building 22, Shop 62, Road 7501, Block 575, Al Janabiyah, Kingdom of Bahrain",
    phone: "+973 77927075",
    whatsapp: "97377927075",
    mapUrl: "https://maps.app.goo.gl/zdYmEVMN53xfPqCH6",
  },
  {
    name: "Chraura Dairies Company W.L.L. (Gudaibya)",
    address: "Building 47, Road 359, Block 321, Kingdom of Bahrain",
    phone: "+973 17716427",
    whatsapp: "97317716427",
    mapUrl: "https://maps.google.com/?q=26.225847,50.594204",
  },
  {
    name: "Accounts & Sales Office",
    address: "Office 0021, Building B0044, Block 321, Kingdom of Bahrain",
    phone: "+973 17740424",
    whatsapp: null,
    mapUrl: null,
  },
  {
    name: "Head Office & Warehouse",
    address: "Sitra — the central hub of Chtaura's operations, supporting distribution and logistics across Bahrain.",
    phone: null,
    whatsapp: null,
    mapUrl: null,
    note: "Not open to the public",
  },
    {
    name: "Chtaura Dairies Company W.L.L. (Moda Mall)",
    address: "164 Bahrain World Trade Center, Manama, Kingdom of Bahrain",
    phone: "+973 1753 5075",
    whatsapp: "97317535075",
    mapUrl: "https://maps.app.goo.gl/URYUsvEWe57dwyAH8",
  }
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        description="Visit us at one of our branches or get in touch."
      />

      <section className="py-24 md:py-32">
        <div className="container space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="overflow-hidden border border-border rounded-xl hover:border-primary/30 transition-all hover:shadow-lg group"
              >
                <div className="bg-primary/5 border-b border-border group-hover:bg-primary/10 transition-colors px-6 py-4 flex items-center gap-2 text-primary">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-display text-lg">{branch.name}</h3>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Address</p>
                      <p className="text-foreground leading-relaxed">{branch.address}</p>
                      {branch.mapUrl && (
                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm font-medium hover:underline mt-2 inline-flex items-center gap-1"
                        >
                          View on map <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {branch.phone && (
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Phone</p>
                        <a href={`tel:${branch.phone}`} className="text-primary font-bold hover:underline">
                          {branch.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {"note" in branch && branch.note && (
                    <span className="text-xs uppercase tracking-wider text-muted-foreground/50 border border-border rounded-full px-3 py-1 self-start inline-block">
                      {branch.note}
                    </span>
                  )}

                  {branch.whatsapp && (
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-lg shrink-0">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">WhatsApp</p>
                        <a
                          href={`https://wa.me/${branch.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 font-bold hover:underline"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h2 className="font-display text-3xl md:text-4xl text-primary">Get in Touch</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Have questions about our products or services? Our team is here to provide you with the support you need.
                </p>
                <div className="flex items-center gap-3 justify-center md:justify-start text-primary font-medium">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:info@chtaura.co" className="hover:underline">info@chtaura.co</a>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[280px]">
                <a
                  href="https://wa.me/97317535075"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl font-bold"
                >
                  <MessageCircle className="w-6 h-6" />
                  WhatsApp
                </a>
                <a
                  href="tel:+97317535075"
                  className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl font-bold"
                >
                  <Phone className="w-6 h-6" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
