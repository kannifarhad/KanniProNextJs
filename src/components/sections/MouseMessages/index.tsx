"use client";
import React, { memo } from "react";
import { Chip } from "@/components/ui/Chip";
import CustomImage from "@/components/ui/CustomImage";
import MouseTracker from "@/components/ui/MouseTracker";
import { StyledHomeMouse } from "./styled";
import { useSelector } from "react-redux";
import { selectHint } from "@/store/reducers/common";

export const HomeMouse: React.FC = () => {
  const text = useSelector(selectHint);

  return (
    <MouseTracker>
      {text && (
        <StyledHomeMouse>
          <Chip title={text} icon={<CustomImage src="/images/photo.jpg" />} />
        </StyledHomeMouse>
      )}
    </MouseTracker>
  );
};

export default memo(HomeMouse);
