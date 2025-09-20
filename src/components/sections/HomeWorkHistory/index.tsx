/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { memo, useState } from "react";
import JobListItem from "./JobListItem";
import JobInfo from "./JobInfo";
import { workHistoryList } from "./constants";
import { WorkHistoryWrapper } from "./styled";
import { useScrollTo } from "@/helpers/useScrollTo";
import MaskedText from "@/components/ui/AnimatiedBlocks/MaskedText";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const infoVariants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WorkHistory = () => {
  const [selected, setSelected] = useState(0);
  const scrollTo = useScrollTo();
  const handleSelect = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.dataset?.index) {
      setSelected(Number(target?.dataset?.index));
      if (window?.innerWidth < 860) {
        scrollTo("#fullstoryWrapper");
      }
    }
  };
  return (
    <>
      <h2 className="sectionHead">
        <MaskedText text="Work Experience" />
      </h2>
      <WorkHistoryWrapper className="work-history gap-4 mt-2 min-[900px]:grid-cols-8 min-[900px]:grid ">
        <motion.div
          id="fullstoryWrapper"
          style={{
            filter: "url(#goo)",
          }}
          className="fullstoryWrapper min-[900px]:col-span-5"
          variants={infoVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          {workHistoryList.map((job, index) => (
            <JobInfo {...job} key={job.name} isSelected={index === selected} />
          ))}
        </motion.div>
        <motion.div
          className="works-list min-[900px]:col-span-3 gap-2 flex flex-col"
          onClick={handleSelect}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
        >
          {workHistoryList.map(({ fullstory: _, ...rest }, index) => (
            <motion.div key={rest.name} variants={listItemVariants}>
              <JobListItem {...rest} index={index} isSelected={index === selected} />
            </motion.div>
          ))}
        </motion.div>
      </WorkHistoryWrapper>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: "none" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -7.3" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default memo(WorkHistory);
