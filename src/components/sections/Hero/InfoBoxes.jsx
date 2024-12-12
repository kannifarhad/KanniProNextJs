"use client";
import React from "react";
import { StyledheroInfoBox } from "./styled";
import { classNames } from "@/helpers/classNames";
import Button from "@/components/ui/Button";
import CustomImage from "@/components/ui/CustomImage";
import { contentInfo } from "./constants";

const InfoBoxes = ({ open, handleClose }) => {
  if (!open) return null;
  const data = contentInfo[open];

  return (
    <StyledheroInfoBox className={classNames({ showInfo: open })}>
      <div className="infoBoxContainer">
        <div className="close">
          <Button
            handleClick={handleClose}
            icon={{
              name: "Close",
              style: {
                width: "15px",
              },
            }}
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="coverImage flex items-center justify-center">
            <CustomImage
              src={data?.image}
              alt={data?.title}
              width={400}
              height={400}
            />
          </div>
          <div className="infoBlock flex flex-row justify-center">
            <h2 className="element">{data?.title}</h2>
            {data?.content}
          </div>
        </div>
      </div>
    </StyledheroInfoBox>
  );
};

export default InfoBoxes;
