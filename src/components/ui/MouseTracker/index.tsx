"use client";

import React, { useRef, useEffect, ReactNode, useState, memo } from "react";
import { createPortal } from "react-dom";

interface MouseTrackerProps {
  className?: string;
  children: ReactNode;
}

export const MouseTracker: React.FC<MouseTrackerProps> = ({
  className = "",
  children,
}) => {
  const element = useRef<HTMLDivElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    // Ensure the portal is created only on the client
    setPortalContainer(document.body);

    const offset = { x: 15, y: 20 };

    function handler(e: MouseEvent) {
      if (element.current) {
        const x = e.clientX + offset.x;
        const y = e.clientY + offset.y;
        element.current.style.transform = `translate(${x}px, ${y}px)`;
        element.current.style.visibility = "visible";
      }
    }

    document.addEventListener("mousemove", handler);
    return () => {
      document.removeEventListener("mousemove", handler);
    };
  }, []);

  // Return null during the SSR phase
  if (!portalContainer) return null;

  return createPortal(
    <div className={`mouse-tracker ${className}`} ref={element}>
      {children}
    </div>,
    portalContainer
  );
};

export default memo(MouseTracker);