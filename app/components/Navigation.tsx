"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/distribution", label: "Distribution" },
  { to: "/brands", label: "Brands" },
  { to: "/partner", label: "Partner With Us" },
  { to: "/retail", label: "Retail Experience" },
  { to: "/contact", label: "Contact" },
];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden md:block bg-secondary text-secondary-foreground text-xs">
        <div className="container flex h-9 items-center justify-between">
          <span className="tracking-wide uppercase opacity-90">Importers · Distributors · Wholesalers · Bahrain since 1994</span>
          <div className="flex items-center gap-6 opacity-90">
            <a href="tel:+97317535075" className="hover:opacity-100">+973 1753 5075</a>
            <a href="mailto:info@chtaura.co" className="hover:opacity-100">info@chtaura.co</a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft" : "bg-background/40 backdrop-blur-sm",
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                    isActive ? "text-primary" : "text-foreground/75 hover:text-foreground",
                    "after:absolute after:left-4 after:right-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
                    isActive && "after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-warm transition-all hover:shadow-elegant hover:translate-y-[-1px]"
            >
              <ShoppingBag className="h-4 w-4" />
              E-Shop
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden border-t border-border transition-[max-height,opacity] duration-500",
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    "px-3 py-3 text-base font-medium border-b border-border/50",
                    isActive ? "text-primary" : "text-foreground/80",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="#"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              <ShoppingBag className="h-4 w-4" /> Visit E-Shop
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};
