import Navigation from "./Navigation";
import { memo } from "react";
import { StyledHeader } from "./styled";

const Header = () => {
  return (
    <StyledHeader className="home-header max[9000px]:mt-2">
      <Navigation />
    </StyledHeader>
  );
};

export default memo(Header);
