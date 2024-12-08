"use client";
import React from "react";
import { StyledheroInfoBox } from "./styled";
import { classNames } from "@/helpers/classNames";
import Button from "@/components/ui/Button";
// import CustomIcon from "@/components/ui/CustomIcon";
import CustomImage from "@/components/ui/CustomImage";

const InfoBoxes = ({ open, handleClose }) => {
  if (!open) return null;
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
              src="/images/software.png"
              alt="software"
              width={400}
              height={400}
            />
          </div>
          <div className="infoBlock flex flex-row  justify-center">
            <h2 className="element">
              FullStack <br />
              Development
            </h2>

            <p className="element">
              <div>
                <strong>Backend Development</strong> - <span>9 years</span>
              </div>
              <div>
                <strong>Frontend Development</strong>- <span>12 years</span>
              </div>
            </p>
            <p className="element">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
              autem, doloribus nulla aspernatur quibusdam modi repellendus velit
              eaque atque nesciunt veniam voluptas iusto. Recusandae perferendis
              blanditiis inventore ducimus, eius aliquam?
            </p>

            <p className="element">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
              autem, doloribus nulla aspernatur quibusdam modi repellendus velit
              eaque atque nesciunt veniam voluptas iusto. Recusandae perferendis
              blanditiis inventore ducimus, eius aliquam?
            </p>
          </div>
        </div>
      </div>
    </StyledheroInfoBox>
  );
};

export default InfoBoxes;
