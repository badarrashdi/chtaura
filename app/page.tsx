import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { BrandsShowcase } from "@/components/sections/BrandsShowcase";
import { Distribution } from "@/components/sections/Distribution";
import { RetailExperience } from "@/components/sections/RetailExperience";
import { Clients } from "@/components/sections/Clients";
import { PartnerCTA } from "@/components/sections/PartnerCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <BrandsShowcase />
      <Distribution />
      <RetailExperience />
      <Clients />
      <PartnerCTA />
    </>
  );
}