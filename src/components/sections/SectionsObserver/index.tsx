"use client";

import { useEffect } from "react";
import { usePersonStore } from "./personStore"; // client store

export default function SectionsObserver() {
  const setActiveSection = usePersonStore((s) => s.setActiveSection);
  const setSectionLayout = usePersonStore((s) => s.setSectionLayout);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section-id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section-id");
          if (!id) return;

          const rect = entry.target.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY; // absolute position from top
          const width = rect.width;
          const height = rect.height;

          // update layout info
          setSectionLayout(id, { offsetTop, width, height });

          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection, setSectionLayout]);

  return null;
}
