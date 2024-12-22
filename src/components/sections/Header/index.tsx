import Navigation from "@/components/sections/Navigation";
import { memo } from "react";
import { StyledHeader } from "./styled";

const Header = () => {
  return (
    <StyledHeader className="home-header min-[900px]:mt-2">
      <Navigation />
    </StyledHeader>
  );
};

export default memo(Header);
