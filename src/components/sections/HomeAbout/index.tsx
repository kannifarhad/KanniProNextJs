import { memo } from "react";
import About from "./About";
import Skills from "./Skills";
import { StyledHomeAbout } from "./styled";

const HomeAbout = () => {
  return (
    <StyledHomeAbout className="grid mt-2 grid-cols-8 items-start max-[900px]:grid-cols-1" id="about">
      <div className="skills flex w-full gap-2 flex-col col-span-5 max-[900px]:grid-cols-1 ">
        <Skills />
      </div>

      <div className=" col-span-3">
        <About />
      </div>
    </StyledHomeAbout>
  );
};

export default memo(HomeAbout);
