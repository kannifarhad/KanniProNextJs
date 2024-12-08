import React, { memo, ReactNode } from "react";
import styles from "./RoundBlock.module.css";
import BlockHeading, { BlockHeadingProps } from "../BlockHeading";

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
    <div className={`block-item ${styles.block} ${className}`}>
      {heading && <BlockHeading {...heading} />}
      <div className={`blockContent ${styles.blockContent}`}>{children}</div>
    </div>
  );
};

export default memo(RoundBlock);
