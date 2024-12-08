"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";

export function InfoBoxesCircle({ open }) {
  const ref = useRef();

  useFrame(({ viewport, camera, pointer }, delta) => {
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3])
    easing.damp3(ref.current.position, [0 , 0, 20], open ? 0 : 0.1, delta)
    easing.damp3(ref.current.scale, open ? 10 : 0.01, open ? 2 : 0.2, delta)
    easing.dampC(ref.current.material.color, open ? '#f0f0f0' : '#ccc', 0.1, delta)
  })

  return (
    <mesh ref={ref}>
      <circleGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        samples={16}
        resolution={512}
        anisotropicBlur={0.1}
        thickness={0.1}
        roughness={0.4}
        toneMapped={true}
      />
    </mesh>
  );
}
export default InfoBoxesCircle;
