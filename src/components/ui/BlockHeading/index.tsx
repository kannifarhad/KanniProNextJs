import React from "react";
import styles from "./BlockHeading.module.css";
import CustomIcon, { CustomIconProps } from "../CustomIcon";

export type BlockHeadingProps = {
  title: string;
  subTitle?: string;
  icon?: CustomIconProps;
};

const BlockHeading: React.FC<BlockHeadingProps> = ({
  title,
  subTitle,
  icon,
}) => {
  return (
    <div className={`block-heading ${styles.blochead}`}>
      <div className={styles.icon}>{icon && <CustomIcon {...icon} />}</div>
      <div className={styles.title}>
        <h3>{title}</h3>
        {subTitle && <p>{subTitle}</p>}
      </div>
    </div>
  );
};

export default BlockHeading;
