import CopyRight from "@/components/sections/Footer/CopyRight";
import { memo } from "react";
import { StyledFooter } from "./styled";

const Footer = () => {
  return (
    <StyledFooter className="footer mb-2">
      <CopyRight />
    </StyledFooter>
  );
};

export default memo(Footer);
