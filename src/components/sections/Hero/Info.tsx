"use client";
import { useAppDispatch } from "@/store";
import { addHint } from "@/store/reducers/common";
import { StyledHeroInfo } from "./styled";

const Hero = () => {
  const dispatch = useAppDispatch();

  return (
    <StyledHeroInfo
      className="hero-info col-span-3 max-[900px]:col-span-1"
      style={{ backgroundImage: "url('/images/portrait.png')" }}
    >
      <div
        className="heading"
        onMouseEnter={() => dispatch(addHint("Hi there..👋"))}
        onMouseLeave={() => dispatch(addHint(null))}
      >
        <h4>Who IM?</h4>
        <h3 className="title">FARHAD ALIYEV</h3>
        <div className="shortInfo">
          Senior Software Engineer <br />
          Software Architect
        </div>
      </div>
    </StyledHeroInfo>
  );
};

export default Hero;
