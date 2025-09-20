import Person from "../Person";
import Info from "./Info";
import ThreeJs from "./ThreeJsNext";

const Hero = () => {
  return (
    <>
      <div className="hero-block fullwidth grid grid-cols-8 max-[900px]:grid-cols-1" style={{ position: "relative" }}>
        <ThreeJs />
        <Info />
        <Person />
      </div>
      <div className="anotherBlock"></div>
    </>
  );
};

export default Hero;
