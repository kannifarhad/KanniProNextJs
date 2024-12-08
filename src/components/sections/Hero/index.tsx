import Info from "./Info";
import ThreeJs from "./ThreeJsNext";

const Hero = () => {
  return (
    <>
      <div className="hero-block fullwidth grid grid-cols-8 max-[900px]:grid-cols-1">
        <ThreeJs />
        <Info />
      </div>
      <div className="anotherBlock"></div>
    </>
  );
};

export default Hero;
