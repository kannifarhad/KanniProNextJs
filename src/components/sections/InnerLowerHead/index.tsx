import React, { memo, ReactNode } from "react";
import { StyledLowerHead } from "./styled";
import CustomImage from "@/components/ui/CustomImage";

interface InnerLowerHeadProps {
  title: string;
  subhead?: string;
  image?: string;
  children?: ReactNode;
}

const InnerLowerHead: React.FC<InnerLowerHeadProps> = ({
  title,
  subhead,
  children,
  image,
}) => {
  return (
    <StyledLowerHead className="innerHead">
      <div className="flex head gap-4">
        {image && (
          <div className="coverImage">
            <CustomImage src={image} />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h2>{title}</h2>
          <h6>{subhead}</h6>
        </div>
      </div>
      <div className="content">{children}</div>
    </StyledLowerHead>
  );
};

export default memo(InnerLowerHead);
