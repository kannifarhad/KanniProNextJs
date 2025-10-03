"use client";
import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import dynamic from "next/dynamic";
import { easing } from "maath";
import { useAppDispatch, useAppSelector } from "@/store";
import { addHint, selectInfoBox, setInfoBox } from "@/store/reducers/common";
import { ModelsTypes } from "./constants";
import { useFrame, useThree } from "@react-three/fiber";

const Laptop = dynamic(() => import("@/components/models/Laptop"), {
  ssr: false,
});

const Iphone = dynamic(() => import("@/components/models/Iphone"), {
  ssr: false,
});

const Ipad = dynamic(() => import("@/components/models/Ipad"), {
  ssr: false,
});

const ElementsGroup: React.FC = () => {
  const dispatch = useAppDispatch();
  const openPopUp = useAppSelector(selectInfoBox);
  const prevOpenPopup = useRef<ModelsTypes | null>(null);

  const laptopRef = useRef<THREE.Group>(null);
  const iphoneRef = useRef<THREE.Group>(null);
  const ipadRef = useRef<THREE.Group>(null);
  const { camera, controls } = useThree();

  const initialCamPos = useRef(new THREE.Vector3(0, 5, 35));
  const initialLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const isAnimating = useRef(false);

  useEffect(() => {
    camera.position.copy(initialCamPos.current);
    camera.lookAt(initialLookAt.current);
  }, [camera]);

  const handleOpenPopUp = useCallback(
    (type: ModelsTypes) => {
      dispatch(setInfoBox(type));
    },
    [dispatch]
  );

  useFrame((state, delta) => {
    // Only trigger animation when popup state changes
    if (openPopUp !== prevOpenPopup.current) {
      isAnimating.current = true;
    }

    // If not animating, do nothing - let OrbitControls handle everything
    if (!isAnimating.current) return;

    if (!laptopRef.current || !iphoneRef.current || !ipadRef.current) {
      isAnimating.current = false;
      prevOpenPopup.current = openPopUp;
      return;
    }

    let targetPos: THREE.Vector3;
    let targetLookAt: THREE.Vector3;

    switch (openPopUp) {
      case ModelsTypes.DEVELOPMENT:
        const worldPos = new THREE.Vector3();
        laptopRef.current.getWorldPosition(worldPos);
        targetPos = worldPos.clone().add(new THREE.Vector3(0, 0, 20));
        targetLookAt = worldPos.clone();
        break;

      case ModelsTypes.MOBILE:
        targetLookAt = new THREE.Vector3(-8.7, -0.4, 3);
        targetPos = targetLookAt.clone().add(new THREE.Vector3(0, 0, 10));
        break;

      case ModelsTypes.UIUX:
        targetLookAt = new THREE.Vector3(6.5, 0.3, 1);
        targetPos = targetLookAt.clone().add(new THREE.Vector3(0, 0, 12));
        break;

      case null:
        // Reset to initial position when popup closes
        targetPos = initialCamPos.current.clone();
        targetLookAt = initialLookAt.current.clone();
        break;

      default:
        isAnimating.current = false;
        prevOpenPopup.current = openPopUp;
        return;
    }

    // Update prevOpenPopup after determining targets
    prevOpenPopup.current = openPopUp;

    // Animate camera position
    easing.damp3(camera.position, targetPos, 0.25, delta);

    // Check if we're close enough to stop
    const distance = camera.position.distanceTo(targetPos);

    if (distance < 0.05) {
      // Animation complete
      isAnimating.current = false;
      camera.position.copy(targetPos);
      camera.lookAt(targetLookAt);

      // Update OrbitControls target
      if (controls && "target" in controls) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orbitControls = controls as any;
        orbitControls.target.copy(targetLookAt);
        orbitControls.update();
      }
    } else {
      // Still animating - update lookAt
      camera.lookAt(targetLookAt);
    }
  });

  return (
    <group
      onPointerOver={() => {
        document.body.style.cursor = "var(--custom-pointer)";
        dispatch(addHint("Click for more info 🤙"));
      }}
      onPointerOut={() => {
        dispatch(addHint(null));
        document.body.style.cursor = "var(--auto-pointer)";
      }}
    >
      <Laptop
        position={[-2, 1, 1]}
        onClick={() => handleOpenPopUp(ModelsTypes.DEVELOPMENT)}
        ref={laptopRef}
      />

      <Iphone
        position={[-8.5, 0, 2]}
        onClick={() => handleOpenPopUp(ModelsTypes.MOBILE)}
        ref={iphoneRef}
      />

      <Ipad
        position={[6, 0, 1]}
        onClick={() => handleOpenPopUp(ModelsTypes.UIUX)}
        ref={ipadRef}
      />
    </group>
  );
};

export default ElementsGroup;