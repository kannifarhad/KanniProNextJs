"use client";
import InnerLowerHead from "@/components/sections/InnerLowerHead";
import LastFromBlogCarousel from "@/components/sections/LastFromBlogCarousel";
import RenderModel from "@/components/ui/ThreeJS/RenderModel";
import Catronaut from "@/components/models/Error";
import { StyledNotFoundContainer } from "./styled";
import { OrbitControls } from "@react-three/drei";

const page404 = () => {
  return (
    <StyledNotFoundContainer className="page404">
      <InnerLowerHead
        title="ERROR 404: Well, This is Awkward…"
        subhead="The page you looking for has vanished into the digital void. But hey, my portfolio’s still here!"
      >
        <div className="catsronaut">
          <RenderModel
            canvasProps={{
              camera: { position: [-5, 0, 30], fov: 37 },
            }}
          >
            <Catronaut
              focused={false}
              rotation={[0, -1.8, 0]}
              position={[-2, -5, 0]}
            />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minPolarAngle={Math.PI / 2.2}
              maxPolarAngle={Math.PI / 2.2}
            />
          </RenderModel>
        </div>
      </InnerLowerHead>
      <LastFromBlogCarousel />
    </StyledNotFoundContainer>
  );
};

export default page404;
