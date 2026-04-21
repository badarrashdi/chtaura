import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { BrandsMarquee } from "@/components/sections/BrandsMarquee";
import { BrandsShowcase } from "@/components/sections/BrandsShowcase";
import { Distribution } from "@/components/sections/Distribution";
import { RetailExperience } from "@/components/sections/RetailExperience";
import { Clients } from "@/components/sections/Clients";
import { PartnerCTA } from "@/components/sections/PartnerCTA";

const Index = () => (
  <>
    <Hero />
    <Story />
    <BrandsMarquee />
    <BrandsShowcase />
    <Distribution />
    <RetailExperience />
    <Clients />
    <PartnerCTA />
  </>
);

export default Index;
