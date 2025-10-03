"use client";
import React from "react";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import RenderModel from "@/components/ui/ThreeJS/RenderModel";
import { StyledHero3D } from "./styled";
import InfoBoxes from "./InfoBoxes";
import { classNames } from "@/helpers/classNames";
import ElementsGroup from "./ElementsGroup";
import dynamic from "next/dynamic";

const Cloud = dynamic(() => import("@/components/models/Cloud"), {
  ssr: false,
});

const ThreeScene: React.FC = () => {
  return (
    <StyledHero3D className="col-span-5 max-[900px]:hidden">
      <div className={classNames({ hero3d: true, pointerCursor: false })}>
        <InfoBoxes />
        <RenderModel
          className=""
          canvasProps={{
            camera: { position: [0, 5, 35], fov: 30 },
            onCreated: (state) => {
              state.camera.lookAt(0, 0, 0);
            },
          }}
        >
          <Cloud rotation={[0, 0, 0]} position={[-1.5, 6, 1]} />
          <ElementsGroup />

          <pointLight position={[10, 10, 10]} intensity={1} />
          <ContactShadows position={[0, -4.5, 0]} scale={20} blur={3} far={4.5} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 2.2}
          />
        </RenderModel>
      </div>
    </StyledHero3D>
  );
};

export default ThreeScene;
