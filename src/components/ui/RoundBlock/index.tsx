import React, { memo, ReactNode } from "react";
import BlockHeading, { BlockHeadingProps } from "../BlockHeading";
import { StyledRoundBlock } from "./styled";

export type RoundBlockProps = {
  heading?: BlockHeadingProps;
  children?: ReactNode;
  className?: string;
};

const RoundBlock: React.FC<RoundBlockProps> = ({
  heading,
  children,
  className,
}) => {
  return (
    <StyledRoundBlock className={`block-item ${className}`}>
      {heading && <BlockHeading {...heading} />}
      <div className="blockContent">{children}</div>
    </StyledRoundBlock>
  );
};

export default memo(RoundBlock);
