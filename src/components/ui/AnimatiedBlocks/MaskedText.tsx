"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MaskedText({ text }: { text: string }) {
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <div className="overflow-hidden">
      <motion.h1 
        ref={ref} initial={{ y: "100%" }} animate={inView ? { y: 0 } : { y: "100%" }} transition={{ duration: 0.7, ease: "easeOut" }}>
        {text}
      </motion.h1>
    </div>
  );
}
