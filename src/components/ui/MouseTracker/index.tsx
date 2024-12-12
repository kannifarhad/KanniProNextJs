"use client";
import React, { useRef, useEffect, ReactNode, memo } from "react";
import ClientPortal from "../ClientPortal";

interface MouseTrackerProps {
  className?: string;
  children: ReactNode;
}

export const MouseTracker: React.FC<MouseTrackerProps> = ({
  className = "",
  children,
}) => {
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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

  return (
    <ClientPortal selector="myportal" show={Boolean(children)}>
      <div className={`mouse-tracker ${className}`} ref={element}>
        {children}
      </div>
    </ClientPortal>
  );
};

export default memo(MouseTracker);
