"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

type AnimatedSectionProps = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  threshold?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export default function OpacityBottomToTop({ children, duration = 0.5, delay = 1000, threshold = 0.1, className }: AnimatedSectionProps) {
  const [animate, setAnimate] = useState(false);

  const { ref } = useInView({
    triggerOnce: false,
    threshold,
    delay,
    onChange: (inView, entry) => {
      const el = entry.target as HTMLElement;
      const elemTop = el.offsetTop;

      if (inView) {
        setAnimate(true);
      } else if (window.scrollY < elemTop) {
        if (window.scrollY < elemTop) {
          setAnimate(false);
        }
      }
    },
  });

  return (
    <motion.div className={className} ref={ref} initial={{ opacity: 1, y: 100 }} animate={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 100 }} transition={{ duration, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}
