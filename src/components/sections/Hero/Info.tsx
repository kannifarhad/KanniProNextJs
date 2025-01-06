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
        <h2 className="title">FARHAD ALIYEV</h2>
        <div className="shortInfo">
          <h1>
            Senior Software Engineer <br />
            Software Architect
          </h1>
        </div>
      </div>
    </StyledHeroInfo>
  );
};

export default Hero;
