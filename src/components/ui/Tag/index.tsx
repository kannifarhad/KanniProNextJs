import React, { memo, ReactNode } from "react";
import styles from "./Tag.module.css";

export type TagProps = {
  title: string;
  tooltip?: ReactNode | string;
};

const CustomIcon: React.FC<TagProps> = ({ title, tooltip }) => {
  return (
    <div className={`tagItem ${styles.tagItem}`}>
      {title}
      {tooltip && <div className={styles.tagTooltip}>{tooltip}</div>}
    </div>
  );
};

export default memo(CustomIcon);
