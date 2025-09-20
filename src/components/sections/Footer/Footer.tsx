import CopyRight from "@/components/sections/Footer/CopyRight";
import { memo } from "react";
import { StyledFooter } from "./styled";

const Footer = () => {
  return (
    // <OpacityBottomToTop duration={0.8}>
    <StyledFooter className="footer mb-2">
      <CopyRight />
    </StyledFooter>
    // </OpacityBottomToTop>
  );
};

export default memo(Footer);
