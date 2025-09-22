"use client";
import dynamic from "next/dynamic";
import RenderModel from "@/components/ui/ThreeJS/RenderModel";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useCallback, useRef, useState } from "react";
import { useAppDispatch } from "@/store";
import { addHint } from "@/store/reducers/common";
import { classNames } from "@/helpers/classNames";
import { PersonControls } from "@/components/models/Person";

const PersonModel = dynamic(() => import("@/components/models/Person"), {
  ssr: false,
});

const Person = () => {
  const [hover, setHover] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const mascotRef = useRef<PersonControls>(null);

  const handleHoverOn = useCallback(() => {
    if (!hover) {
      mascotRef.current?.runWave();
      setHover(true);
      dispatch(addHint("Yo! I can’t dance yet, but Farhad’s cooking up some magic for me. Stay tuned 🚀"));
    }
  }, [dispatch, hover]);

  const handleHoverOut = useCallback(() => {
    setHover(false);
    dispatch(addHint(null));
  }, [dispatch]);

  return (
    <div
      className="person"
      style={{
        width: "300px",
        height: "300px",
        position: "absolute",
        bottom: "10px",
        left: "750px",
        zIndex: 5,
        //  border: "1px solid #fff"
      }}
    >
      <RenderModel
        canvasProps={{
          camera: { position: [0, 5, 5], fov: 50 },
        }}
        ligtpreset="city"
        className={classNames({ hero3d: true, pointerCursor: hover })}
      >
        <directionalLight castShadow position={[5, 10, 5]} intensity={1.2} />

        <group position={[0, -2, 0]} scale={0.8} onPointerOver={handleHoverOn} onPointerOut={handleHoverOut}>
          <PersonModel ref={mascotRef} castShadow onPointerOver={handleHoverOn} onPointerOut={handleHoverOut} onPointerUp={handleHoverOut} />
        </group>

        <OrbitControls enablePan={false} enableZoom minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
        <ContactShadows position={[0, -2, 0]} scale={10} blur={2} opacity={0.6} far={4} />
      </RenderModel>
    </div>
  );
};

export default Person;
