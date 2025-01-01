import React, { memo, ReactNode } from "react";
import { StyledChipWithIcon } from "./styled";
import Icon, { IconProps } from "../CustomIcon";

export type ChipWithIconProps = {
  title: string;
  color?: string;
  icon: IconProps;
};

const ChipWithIcon: React.FC<ChipWithIconProps> = ({ title, icon }) => {
  return (
    <StyledChipWithIcon className="ChipWithIcon flex">
      <span className="icon">
        <Icon {...icon} />
      </span>
      <span className="title">{title}</span>
    </StyledChipWithIcon>
  );
};

export const Chip: React.FC<{ title: string; icon: ReactNode }> = ({
  title,
  icon,
}) => {
  return (
    <StyledChipWithIcon className="ChipWithIcon flex">
      <span className="icon fill">{icon}</span>
      <span className="title">{title}</span>
    </StyledChipWithIcon>
  );
};

export default memo(ChipWithIcon);
