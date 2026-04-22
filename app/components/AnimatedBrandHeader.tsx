"use client";

import { motion } from "framer-motion";

interface AnimatedBrandHeaderProps {
  children: React.ReactNode;
}

export const AnimatedBrandHeader = ({ children }: AnimatedBrandHeaderProps) => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="font-display text-5xl md:text-7xl xl:text-8xl leading-[0.95] text-balance"
  >
    {children}
  </motion.h1>
);