"use client";
import dynamic from "next/dynamic";
import RenderModel from "@/components/ui/ThreeJS/RenderModel";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useCallback, useRef, useState } from "react";
import { useAppDispatch } from "@/store";
import { addHint } from "@/store/reducers/common";
import { classNames } from "@/helpers/classNames";
import { PersonControls } from "@/components/models/Mascot";
import useThrottle from "@/hooks/useThrottle";
// import * as THREE from "three";

const PersonModel = dynamic(() => import("@/components/models/Mascot"), {
  ssr: false,
});

// const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

const Person = () => {
  const [hover, setHover] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const mascotRef = useRef<PersonControls>(null);

  // throttle the animation trigger
  const waveAction = useThrottle(() => {
    // mascotRef.current?.runWave();
  }, 2000);

  const handleHoverOn = useCallback(() => {
    waveAction();
    setHover(true);
    dispatch(addHint("Yo! I can’t dance yet, but Farhad’s cooking up some magic for me. Stay tuned 🚀"));
  }, [dispatch, waveAction]);

  const handleHoverOut = useCallback(() => {
    setHover(false);
    dispatch(addHint(null));
  }, [dispatch]);

  return (
    <div
      className="person"
      style={{
        width: "400px",
        height: "400px",
        position: "absolute",
        bottom: "-50px",
        left: "600px",
        zIndex: 5,
        //  border: "1px solid #fff"
      }}
    >
      <div>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.runWave()}>
          Wave
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.sitDown()}>
          Sit down
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.dance()}>
          Dance
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.showBackground()}>
          SHow
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.climbToTop()}>
          Climb
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.fallImpact()}>
          Fall
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.thumbsUp()}>
          Thumbs
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.initPerson()}>
          Init
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.standUp()}>
          standUp
        </button>
        <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.initFallScenario()}>
          Init fall
        </button>
      </div>

      <RenderModel
        canvasProps={{
          camera: { position: [0, 20, 5], fov: 30 },
          gl: { localClippingEnabled: true }, // 👈 enable clipping
        }}
        ligtpreset="city"
        className={classNames({ hero3d: true, pointerCursor: hover })}
      >
        <directionalLight castShadow position={[5, 10, 5]} intensity={1.2} />

        <group position={[0, 0, 0]} scale={0.8}>
          <PersonModel
            ref={mascotRef}
            castShadow
            onPointerOver={handleHoverOn}
            onPointerOut={handleHoverOut}
            onPointerUp={handleHoverOut}
            // material-clippingPlanes={[new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)]} // 👈 hide below y=0
            // material-clipShadows={true} // keep shadows correct
          />
        </group>

        <OrbitControls enablePan={false} enableZoom minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
        <ContactShadows position={[0, 0, 0]} scale={10} blur={2} opacity={0.6} far={4} />
      </RenderModel>
    </div>
  );
};

export default Person;
