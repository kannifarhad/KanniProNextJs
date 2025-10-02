"use client";
import dynamic from "next/dynamic";
import RenderModel from "@/components/ui/ThreeJS/RenderModel";
import {
  ContactShadows,
  // OrbitControls
} from "@react-three/drei";
import { useCallback, useEffect, useRef } from "react";
import { classNames } from "@/helpers/classNames";
import { PersonControls } from "@/components/models/Mascot";
import useThrottle from "@/hooks/useThrottle";
import { usePersonStore } from "../SectionsObserver/personStore";
import PersonSpeech, { suggestDance, askDanceFeedBack, PersonSpeechRef, contactMe } from "./PersonSpeech";

const PersonModel = dynamic(() => import("@/components/models/Mascot"), {
  ssr: false,
});

const CanvasWidth = 400;
const CanvasHeight = 300;

const Person = () => {
  const mascotRef = useRef<PersonControls>(null);
  const personCont = useRef<HTMLDivElement>(null);
  const speechRef = useRef<PersonSpeechRef>(null);

  const isInitalAnimationRun = useRef<boolean>(false);
  const activeSection = usePersonStore((s) => s.activeSection);
  const sectionsLayout = usePersonStore((s) => s.sectionsLayout);

  // throttle the animation trigger
  const waveAction = useThrottle(() => {
    if (mascotRef.current?.isAnimating()) return;
    danceScenario();
    mascotRef.current?.wave().catch(console.log);
  }, 2000);

  const danceScenario = () => {
    speechRef.current?.addBubble(
      suggestDance(() => {
        speechRef.current?.resetBubble();
        mascotRef.current?.dance().then(() =>
          speechRef.current?.addBubble(
            askDanceFeedBack({
              onDislikeClick: () => {
                speechRef.current?.resetBubble();
                mascotRef.current?.defeated();
              },
              onLikeClick: () => {
                speechRef.current?.resetBubble();
                mascotRef.current?.victory();
              },
            })
          )
        );
      })
    );
  };

  const handleHoverOn = useCallback(() => {
    if (mascotRef.current?.isAnimating()) return;
    waveAction();
  }, [waveAction]);

  const handleHoverOut = useCallback(() => {
    speechRef.current?.resetBubble();
  }, []);

  // Initialize person
  useEffect(() => {
    const layout = sectionsLayout?.header;
    if (personCont.current && layout && !isInitalAnimationRun.current) {
      isInitalAnimationRun.current = true;
      const center = layout.width / 2 - CanvasWidth / 2;
      personCont.current.style.left = `${center + CanvasWidth / 4}px`;
      personCont.current.style.top = `${layout.offsetTop + layout.height - CanvasHeight * 0.8}px`;

      setTimeout(() => {
        mascotRef.current?.initPerson();
        // mascotRef.current?.show();
        // mascotRef.current?.wave();
      }, 1000);
    }
  }, [sectionsLayout]);

  useEffect(() => {
    const layout = activeSection && sectionsLayout[activeSection];
    speechRef.current?.resetBubble();

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
          mascotRef.current?.initFallScenario().then(() => {
            speechRef.current?.addBubble(contactMe());
          });

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
      <Controls mascotRef={mascotRef} />

      <div
        className="person"
        ref={personCont}
        style={{
          width: `${CanvasWidth}px`,
          height: `${CanvasHeight}px`,
          position: "absolute",
          zIndex: 3,
          // border: "1px solid #f00",
        }}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOut}
      >
        <PersonSpeech ref={speechRef} />
        <RenderModel
          canvasProps={{
            camera: { position: [0, 5, 15], fov: 30 },
            gl: { localClippingEnabled: true },
            onCreated: (state) => {
              state.camera.lookAt(0, 0, 0);
            },
            style: {
              pointerEvents: "none",
            },
          }}
          ligtpreset="city"
          className={classNames({ hero3d: true })}
        >
          <directionalLight castShadow position={[5, 10, 5]} intensity={1.2} />

          <group position={[0, -2, 0]} scale={0.8}>
            <PersonModel ref={mascotRef} castShadow defaultVisibile={false} />
          </group>

          {/* <OrbitControls enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} /> */}
          <ContactShadows position={[0, -2, 0]} scale={10} blur={3} opacity={0.6} far={10} layers={0} />
        </RenderModel>
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Controls = ({ mascotRef }: any) => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0 }}>
      <button
        type="submit"
        className="btn p-2"
        onClick={() => {
          mascotRef.current?.wave();
        }}
      >
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
      <button type="submit" className="btn p-2" onClick={() => mascotRef.current?.test()}>
        TEST
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
  );
};
export default Person;
