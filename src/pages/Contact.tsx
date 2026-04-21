import { PageHero } from "@/components/PageHero";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message received. We'll reply soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's <em>talk food</em>.</>}
        description="Whether you're a retailer, restaurateur, hotelier, brand owner, or simply curious — we'd love to hear from you."
      />

      <section className="py-24 md:py-32">
        <div className="container grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-10">
            <ContactItem icon={MapPin} title="Headquarters" body={"Salmabad Industrial Area\nKingdom of Bahrain"} />
            <ContactItem icon={Phone} title="Call us" body="+973 1753 5075" href="tel:+97317535075" />
            <ContactItem icon={Mail} title="Email" body="info@chtaura.co" href="mailto:info@chtaura.co" />
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-7 bg-surface-elevated border border-border p-8 md:p-10">
            <h2 className="font-display text-3xl md:text-4xl mb-8">Send a message</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <Field name="name" label="Name" required />
              <Field name="email" label="Email" type="email" required />
              <Field name="company" label="Company" />
              <Field name="phone" label="Phone" />
            </div>
            <div className="mt-5">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Message *</label>
              <textarea name="message" rows={5} required className="w-full rounded-md bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <button disabled={submitting} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:shadow-warm transition-all disabled:opacity-60">
              {submitting ? "Sending…" : <>Send message <Send className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

const ContactItem = ({ icon: Icon, title, body, href }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string; href?: string }) => {
  const inner = <p className="text-lg whitespace-pre-line text-muted-foreground hover:text-primary transition-colors">{body}</p>;
  return (
    <div className="border-t border-border pt-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-display text-xl">{title}</h3>
      </div>
      {href ? <a href={href}>{inner}</a> : inner}
    </div>
  );
};

const Field = ({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) => (
  <div>
    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}{required && " *"}</label>
    <input name={name} type={type} required={required} className="w-full h-11 rounded-md bg-background border border-border px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
  </div>
);

export default Contact;
