"use client";

import React, { useState, useCallback } from "react";
import { StyledHero3D } from "./styled";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import RenderModel from "@/components/ui/ThreeJS/RenderModel";
import { useAppDispatch } from "@/store";
import { addHint } from "@/store/reducers/common";
import dynamic from "next/dynamic";
import InfoBoxes from "./InfoBoxes";
import { classNames } from "@/helpers/classNames";
import { ModelsTypes } from "./constants";

const Laptop = dynamic(() => import("@/components/models/Laptop"), {
  ssr: false,
});

const Iphone = dynamic(() => import("@/components/models/Iphoone"), {
  ssr: false,
});

const Ipad = dynamic(() => import("@/components/models/Ipad"), {
  ssr: false,
});

const Cloud = dynamic(() => import("@/components/models/Cloud"), {
  ssr: false,
});

const ThreeScene: React.FC = () => {
  const [openPopUp, setOpenPopup] = useState<ModelsTypes | null>(null);
  const [hover, setHover] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleHoverOn = useCallback(() => {
    setHover(true);
    dispatch(addHint("Click for more info 🤙"));
  }, [dispatch]);

  const handleHoverOut = useCallback(() => {
    setHover(false);
    dispatch(addHint(null));
  }, [dispatch]);

  return (
    <StyledHero3D className="col-span-5 max-[900px]:hidden">
      <div className={classNames({ hero3d: true, pointerCursor: hover })}>
        <InfoBoxes open={openPopUp} handleClose={() => setOpenPopup(null)} />
        <RenderModel
          className=""
          canvasProps={{
            camera: { position: [-5, 0, 20], fov: 55 },
          }}
        >
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Cloud rotation={[0, 0, 0]} position={[-1.5, 6, 1]} />

          <Laptop
            rotation={[0, Math.PI, 0]}
            position={[-2, 1, 1]}
            onClick={() => setOpenPopup(ModelsTypes.DEVELOPMENT)}
            focused={openPopUp === ModelsTypes.DEVELOPMENT}
            onPointerOver={handleHoverOn}
            onPointerOut={handleHoverOut}
            onPointerUp={handleHoverOut}
          />

          <Iphone
            rotation={[0, Math.PI, 2]}
            position={[-8.5, -10, 2]}
            onClick={() => setOpenPopup(ModelsTypes.MOBILE)}
            focused={openPopUp === ModelsTypes.MOBILE}
            onPointerOver={handleHoverOn}
            onPointerOut={handleHoverOut}
            onPointerUp={handleHoverOut}
          />

          <Ipad
            rotation={[0, Math.PI, 0]}
            position={[6, 0, 1]}
            scale={0.18}
            onClick={() => setOpenPopup(ModelsTypes.UIUX)}
            focused={openPopUp === ModelsTypes.UIUX}
            onPointerOver={handleHoverOn}
            onPointerOut={handleHoverOut}
            onPointerUp={handleHoverOut}
          />

          <ContactShadows
            position={[0, -4.5, 0]}
            scale={20}
            blur={3}
            far={4.5}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 2.2}
          />
        </RenderModel>
      </div>
    </StyledHero3D>
  );
};

export default ThreeScene;