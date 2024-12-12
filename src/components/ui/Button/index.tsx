"use client";
import React, { MouseEvent } from "react";
import { ColorsEnum } from "@/types/common";
import Icon, { IconProps } from "../CustomIcon";
import { StyledButton } from "./styled";
import { classNames } from "@/helpers/classNames";

type ButtonVariants = "outlined" | "standard" | "text";

type ButtonProps = {
  handleClick: () => void;
  icon?: IconProps;
  title?: string;
  variant?: ButtonVariants;
  color?: ColorsEnum;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  handleClick,
  title,
  icon,
  variant = "standard",
  color = "primary",
  className,
  ...rest
}) => {
  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const span = button.querySelector("span");
    if (span) {
      const { left, top } = button.getBoundingClientRect();
      const relX = e.clientX - left;
      const relY = e.clientY - top;
      span.style.top = `${relY}px`;
      span.style.left = `${relX}px`;
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const span = button.querySelector("span");
    if (span) {
      const { left, top } = button.getBoundingClientRect();
      const relX = e.clientX - left;
      const relY = e.clientY - top;
      span.style.top = `${relY}px`;
      span.style.left = `${relX}px`;
    }
  };
  return (
    <StyledButton
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames({
        [variant]: true,
        [color]: true,
        [className ?? ""]: true,
        hasTitle: Boolean(title),
      })}
      {...rest}
    >
      <span></span>
      {icon && <Icon style={{ marginRight: "15px" }} {...icon} />}
      {title && <div className="title">{title}</div>}
    </StyledButton>
  );
};

export default Button;
