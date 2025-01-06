"use client";
import React, { memo, useRef, useState } from "react";
import JobListItem from "./JobListItem";
import JobInfo from "./JobInfo";
import { workHistoryList } from "./constants";
import { WorkHistoryWrapper } from "./styled";
import { useScrollTo } from "@/helpers/useScrollTo";

const WorkHistory = () => {
  const [selected, setSelected] = useState(0);
  const workhistoryRef = useRef();
  const scrollTo = useScrollTo();
  const handleSelect = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.dataset?.index) {
      setSelected(Number(target?.dataset?.index));
      scrollTo("#fullstoryWrapper");
    }
  };
  return (
    <>
      <h2 className="sectionHead">
        <span>Work Experience</span>
      </h2>
      <WorkHistoryWrapper className="work-history gap-4 mt-2 min-[900px]:grid-cols-8 min-[900px]:grid ">
        <div
          className="fullstoryWrapper min-[900px]:col-span-5"
          id="fullstoryWrapper"
          ref={workhistoryRef.current}
        >
          {workHistoryList.map((job, index)=><JobInfo {...job} key={job.name} isSelected={index === selected} />)}
          
        </div>
        <div
          className="works-list min-[900px]:col-span-3 gap-2 flex flex-col"
          onClick={handleSelect}
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            workHistoryList.map(({ fullstory: _, ...rest }, index) => (
              <JobListItem
                key={rest.name}
                {...rest}
                index={index}
                isSelected={index === selected}
              />
            ))
          }
        </div>
      </WorkHistoryWrapper>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: "none" }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -7.3"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default memo(WorkHistory);
