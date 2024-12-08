"use client";
import { memo } from "react";
import { lampsList } from "./constants";
import { StyledLampsContainer } from "./styled";
const Lamps = () => {
  return (
    <StyledLampsContainer id="lamps">
      <div className="lampscont">
        {lampsList.map((lamp, index) => (
          <div className={lamp.className} key={index} style={lamp.style}>
            {lamp.image}
          </div>
        ))}
      </div>
    </StyledLampsContainer>
  );
};

export default memo(Lamps);
