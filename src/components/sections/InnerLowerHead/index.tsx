import React, { memo, ReactNode } from "react";
import { StyledLowerHead } from "./styled";
import CustomImage from "@/components/ui/CustomImage";

interface InnerLowerHeadProps {
  title: string;
  subhead?: string;
  image?: string;
  children?: ReactNode;
  contentBottom?: boolean
}

const InnerLowerHead: React.FC<InnerLowerHeadProps> = ({
  title,
  subhead,
  children,
  image,
  contentBottom,
}) => {
  return (
    <StyledLowerHead className="innerHead">
      <div className="flex head gap-4">
        {image && (
          <div className="coverImage">
            <CustomImage src={image} />
          </div>
        )}
        <div className="flex flex-col gap-2 headtitles">
          <h2>{title}</h2>
          <h6>{subhead}</h6>
          {!contentBottom && <div className="content">{children}</div>}
        </div>
      </div>
      {contentBottom && <div className="content">{children}</div>}
    </StyledLowerHead>
  );
};

export default memo(InnerLowerHead);
