"use client";
import React from "react";
import { StyledheroInfoBox } from "./styled";
import { classNames } from "@/helpers/classNames";
import Button from "@/components/ui/Button";
import CustomImage from "@/components/ui/CustomImage";
import { contentInfo } from "./constants";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetInfoBox, selectInfoBox } from "@/store/reducers/common";

const InfoBoxes: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectInfoBox);

  if (!open) return null;

  const data = contentInfo[open];

  return (
    <StyledheroInfoBox className={classNames({ showInfo: !!open })}>
      <div className="infoBoxContainer">
        <div className="close">
          <Button
            handleClick={() => dispatch(resetInfoBox())}
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
            <CustomImage src={data?.image} alt="Image" width={300} height={300} />
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
