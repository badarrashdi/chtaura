import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="relative mt-32 overflow-hidden bg-foreground text-background">
    <div className="absolute inset-0 grain pointer-events-none" />
    <div className="container relative py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-background rounded-md inline-block px-3 py-2">
            <Logo className="!h-12" />
          </div>
          <p className="font-display text-3xl md:text-4xl leading-tight max-w-md text-balance">
            The art of intelligent eating, delivered to Bahrain since 1994.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="#" aria-label="Facebook" className="h-10 w-10 grid place-items-center rounded-full border border-background/20 hover:bg-primary hover:border-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="h-10 w-10 grid place-items-center rounded-full border border-background/20 hover:bg-primary hover:border-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.2em] text-background/60 mb-5">Navigate</h4>
          <ul className="space-y-3 font-body">
            {[
              ["About", "/about"],
              ["Distribution & Logistics", "/distribution"],
              ["Brands We Represent", "/brands"],
              ["Partner With Us", "/partner"],
              ["Retail Experience", "/retail"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-background/80 hover:text-primary transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-background/60 mb-5">Get in touch</h4>
          <ul className="space-y-4 font-body text-sm">
            <li className="flex gap-3"><Phone className="h-5 w-5 text-primary shrink-0" /><a href="tel:+97317535075" className="text-background/85 hover:text-primary">+973 1753 5075</a></li>
            <li className="flex gap-3"><Mail className="h-5 w-5 text-primary shrink-0" /><a href="mailto:info@chtaura.co" className="text-background/85 hover:text-primary">info@chtaura.co</a></li>
            <li className="flex gap-3"><MapPin className="h-5 w-5 text-primary shrink-0" /><span className="text-background/85">Salmabad Industrial Area, Kingdom of Bahrain</span></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-background/60">
        <p>© {new Date().getFullYear()} Chtaura CO. W.L.L. All rights reserved.</p>
        <p className="tracking-wide uppercase">Crafted with care · بحب و عناية</p>
      </div>
    </div>
  </footer>
);
