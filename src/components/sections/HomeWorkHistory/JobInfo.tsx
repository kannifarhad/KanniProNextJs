import React, { ReactNode } from "react";
import { JobHistoryItemType } from "./JobListItem";
import { StyledFullStory } from "./styled";
import Tag from "@/components/ui/Tag";
import { classNames } from "@/helpers/classNames";

export type JobInfoProps = {
  fullstory: ReactNode;
  technologiesUsed?: string[];
  isSelected: boolean;
} & Omit<JobHistoryItemType, "isSelected">;

const JobInfo: React.FC<JobInfoProps> = ({
  fullstory,
  technologiesUsed,
  isSelected,
}) => {
  return (
    <StyledFullStory
      className={classNames({ flex: true, "flex-col": true, hidden: !isSelected })}
    >
      <div className="fullStoryContent">
        <h4>Responsibilities:</h4>
        <div className="fullStoryText">{fullstory}</div>
        {technologiesUsed && (
          <div className="technicalSkils">
            <h4>Technologies used:</h4>
            <div className="gap-1 inline-flex flex-wrap">
              {technologiesUsed.map((tag, index) => (
                <Tag key={tag + index} title={tag} />
              ))}
            </div>
          </div>
        )}
      </div>
    </StyledFullStory>
  );
};

export default JobInfo;
