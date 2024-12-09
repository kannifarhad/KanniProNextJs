import { classNames } from "@/helpers/classNames";
import React from "react";
import { StyledJobItem } from "./styled";

export type JobHistoryItemType = {
  name: string;
  dates: string;
  position: string;
  isSelected?: boolean;
};

const JobListItem: React.FC<JobHistoryItemType & { index: number }> = ({
  name,
  dates,
  isSelected,
  position,
  index,
}) => {
  return (
    <StyledJobItem
      className={classNames({
        "work-short flex flex-row items-center pointerCursor": true,
        workActive: isSelected,
      })}
      data-index={index}
    >
      <div className="shortName no-pointer flex flex-col items-start">
        <div>
          <h5>{name}</h5>
        </div>
        <span>{position}</span>
      </div>
      <span className="no-pointer">{dates}</span>
    </StyledJobItem>
  );
};

export default JobListItem;
