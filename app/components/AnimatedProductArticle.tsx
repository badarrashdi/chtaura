"use client";

import { motion } from "framer-motion";

interface AnimatedProductArticleProps {
  children: React.ReactNode;
  index: number;
}

export const AnimatedProductArticle = ({ children, index }: AnimatedProductArticleProps) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
    className="group"
  >
    {children}
  </motion.article>
);