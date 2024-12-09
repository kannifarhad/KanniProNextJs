import React from "react";
import CustomIcon, { IconProps } from "../CustomIcon";
import { StyledBlockHead } from "./styled";

export type BlockHeadingProps = {
  title: string;
  subTitle?: string;
  icon?: IconProps;
};

const BlockHeading: React.FC<BlockHeadingProps> = ({
  title,
  subTitle,
  icon,
}) => {
  return (
    <StyledBlockHead className="block-heading">
      <div className="icon">{icon && <CustomIcon {...icon} />}</div>
      <div className="title">
        <h3>{title}</h3>
        {subTitle && <p>{subTitle}</p>}
      </div>
    </StyledBlockHead>
  );
};

export default BlockHeading;
