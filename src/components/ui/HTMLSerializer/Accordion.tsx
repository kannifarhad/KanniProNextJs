"use client";
import { classNames } from "@/helpers/classNames";
import { StyledAccordion } from "./styled";
import { useState } from "react";
import Icon from "../CustomIcon";

interface AccordionProps {
  children: React.ReactNode;
  type?: string;
  title: string | React.ReactNode;
  toolbar?: React.ReactNode;
  className?: string;
}

// Accordion component factory
// eslint-disable-next-line react/display-name
const Accordion = ({
  children,
  className = "",
  title,
  type = "warning",
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <StyledAccordion
      className={classNames({
        [className]: true,
        [type]: true,
        isOpen: isOpen,
      })}
    >
      <div
        className="title pointerCursor"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="arrow">
          <Icon name="Arrow" style={{ width: "12px", height: "12px" }} />
        </span>
        <span>{title}</span>
      </div>
      <div className="content">{children}</div>
    </StyledAccordion>
  );
};
// Set the display name for better debugging and to resolve the ESLint warning
Accordion.displayName = "Accordion";
export default Accordion;
