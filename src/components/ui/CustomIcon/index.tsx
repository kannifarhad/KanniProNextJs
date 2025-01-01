/* eslint-disable react/prop-types */
"use client";
import React from "react";
import Download from "./icons/download";
import Close from "./icons/close";
import Linkedin from "./icons/linkedin";
import Github from "./icons/github";
import Facebook from "./icons/facebook";
import Whatsapp from "./icons/whatsapp";
import Paperplane from "./icons/paperplane";
import Handshake from "./icons/handshake";
import Email from "./icons/email";
import Loaction from "./icons/loaction";
import Bag from "./icons/bag";
import Calendar from "./icons/calendar";
import Pen from "./icons/pen";
import Copy from "./icons/copy";
import Telephone from "./icons/telephone";
import Filledpaper from "./icons/filledpaper";

const iconMap = {
  Close,
  Download,
  Linkedin,
  Github,
  Facebook,
  Whatsapp,
  Paperplane,
  Handshake,
  Email,
  Loaction,
  Bag,
  Calendar,
  Pen,
  Copy,
  Telephone,
  Filledpaper
};

type IconName = keyof typeof iconMap;

// Props for the Icon component
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName; // Icon name must be one of the keys in iconMap
  color?: string; // Optional color for the icon
  size?: number; // Optional size for the icon (applied to both width and height)
}

const Icon = ({
  name,
  color = "#ccc",
  size = 20,
  className,
  ...rest
}: IconProps) => {
  // Get the corresponding SVG component from the iconMap
  const SelectedIcon = iconMap[name];
  // Ensure SelectedIcon exists
  if (!SelectedIcon) {
    // eslint-disable-next-line no-console
    console.warn("couldnt found an icon with name", name);
    return <></>;
  }

  // Render the selected icon with customizable color and size
  return (
    <SelectedIcon
      width={size}
      height={size}
      fill={color}
      className={`svgicon ${className} `}
      {...rest}
    />
  );
};

export default Icon;
