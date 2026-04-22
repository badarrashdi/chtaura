"use client";

import { PageHero } from "@/components/PageHero";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const reasons = [
  { n: "01", title: "Market expertise", body: "30 years of decoding Bahrain's retail, hospitality and food-service landscape." },
  { n: "02", title: "Curated portfolio", body: "Your brand keeps company with houses like Mutti, Giuseppe Giusti and Pasta Rummo." },
  { n: "03", title: "Full-service partner", body: "From customs to merchandising to in-store activation — we handle every detail." },
  { n: "04", title: "Long-term thinking", body: "We don't list brands, we build them. Many of our partnerships span decades." },
];

export default function PartnerPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thank you. We'll be in touch within 2 business days.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <>
      <PageHero
        eyebrow="Partner With Us"
        title={<>Your brand, <em>at home in Bahrain</em>.</>}
        description="If you produce exceptional food or beverages and you're looking for a serious distribution partner in the Kingdom, we should talk."
      />

      <section className="py-24 md:py-32">
        <div className="container grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-balance">Why brands choose Chtaura.</h2>
            <div className="mt-12 space-y-10">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border-t border-border pt-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-primary text-xl">{r.n}</span>
                    <h3 className="font-display text-2xl">{r.title}</h3>
                  </div>
                  <p className="mt-3 text-muted-foreground text-pretty pl-10">{r.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-32 self-start">
            <form
              onSubmit={onSubmit}
              className="bg-surface-elevated border border-border p-8 md:p-10 shadow-soft"
            >
              <h3 className="font-display text-3xl mb-2">Tell us about your brand.</h3>
              <p className="text-muted-foreground text-sm mb-8">A short note is enough — we'll reply within 2 business days.</p>

              <div className="grid gap-5">
                <Field name="name" label="Your name" required />
                <Field name="brand" label="Brand / company" required />
                <Field name="email" label="Email" type="email" required />
                <Field name="country" label="Country of origin" />
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Tell us a little</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-md bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <button
                  disabled={submitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:shadow-warm transition-all disabled:opacity-60"
                >
                  {submitting ? "Sending…" : <>Send enquiry <Send className="h-4 w-4" /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const Field = ({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) => (
  <div>
    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}{required && " *"}</label>
    <input
      name={name}
      type={type}
      required={required}
      className="w-full h-11 rounded-md bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
    />
  </div>
);
