"use client";
import dynamic from "next/dynamic";
import RenderModel from "@/components/ui/ThreeJS/RenderModel";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/store";
import { addHint } from "@/store/reducers/common";
import { classNames } from "@/helpers/classNames";
import { PersonControls } from "@/components/models/Mascot";
import useThrottle from "@/hooks/useThrottle";
import { usePersonStore } from "../SectionsObserver/personStore";

const PersonModel = dynamic(() => import("@/components/models/Mascot"), {
  ssr: false,
});

const enableOrbit = false;
const CanvasWidth = 300;
const CanvasHeight = 300;

const Person = () => {
  const [hover, setHover] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const mascotRef = useRef<PersonControls>(null);
  const personCont = useRef<HTMLDivElement>(null);
  const isInitalAnimationRun = useRef<boolean>(false);
  const activeSection = usePersonStore((s) => s.activeSection);
  const sectionsLayout = usePersonStore((s) => s.sectionsLayout);
  // throttle the animation trigger
  const waveAction = useThrottle(() => {
    mascotRef.current?.runWave();
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

  // Initialize person
  useEffect(() => {
    const layout = sectionsLayout?.header;
    if (personCont.current && layout && !isInitalAnimationRun.current) {
      // mascotRef.current?.show();
      isInitalAnimationRun.current = true;
      const center = layout.width / 2 - CanvasWidth / 2;
      personCont.current.style.left = `${center + CanvasWidth / 4}px`;
      personCont.current.style.top = `${layout.offsetTop + layout.height - CanvasHeight * 0.8}px`;
      setTimeout(() => mascotRef.current?.initPerson(), 1000);
    }
  }, [sectionsLayout]);

  useEffect(() => {
    const layout = activeSection && sectionsLayout[activeSection];

    if (personCont.current && layout) {
      const center = layout.width / 2 - CanvasWidth / 2;
      const topOffset = layout.offsetTop + (layout.height / 2 - CanvasHeight);
      switch (activeSection) {
        case "header":
          personCont.current.style.left = `${center + CanvasWidth / 4}px`;
          personCont.current.style.top = `${layout.offsetTop + layout.height - CanvasHeight * 0.8}px`;
          mascotRef.current?.initPerson();
          break;
        case "contact-me":
          personCont.current.style.left = `${center}px`;
          personCont.current.style.top = `${topOffset}px`;
          mascotRef.current?.initFallScenario();
          break;
        default:
          mascotRef.current?.hide();
      }
    } else {
      mascotRef.current?.hide();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <>
      {/* <div style={{ position: "fixed", top: 0, left: 0 }}>
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
      </div> */}
      <div
        className="person"
        ref={personCont}
        style={{
          width: `${CanvasWidth}px`,
          height: `${CanvasHeight}px`,
          position: "absolute",
          zIndex: 5,
        }}
      >
        <RenderModel
          canvasProps={{
            camera: { position: [0, 15, 5], fov: 30 },
            gl: { localClippingEnabled: true },
          }}
          ligtpreset="city"
          className={classNames({ hero3d: true, pointerCursor: hover })}
        >
          <directionalLight castShadow position={[5, 10, 5]} intensity={1.2} />

          <group position={[0, -2, 0]} scale={0.8}>
            <PersonModel ref={mascotRef} castShadow onPointerOver={handleHoverOn} onPointerOut={handleHoverOut} onPointerUp={handleHoverOut} />
          </group>

          <OrbitControls enablePan={false} enableZoom={enableOrbit} enableRotate={enableOrbit} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
          <ContactShadows position={[0, -2, 0]} scale={10} blur={2} opacity={0.6} far={4} layers={0} />
        </RenderModel>
      </div>
    </>
  );
};

export default Person;
