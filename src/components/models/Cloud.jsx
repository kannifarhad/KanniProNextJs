"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Cloud(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/cloud.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // group.current.rotation.x = THREE.MathUtils.lerp(
    //   group.current.rotation.x,
    //   Math.cos(t / 10) / 10 + 0.25,
    //   0.1
    // );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      (15 + Math.sin(t / 2)) / 2.5,
      0.1
    );
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes["Plane001_08_-_Default_0"].geometry}
        material={materials["08_-_Default"]}
        position={[-0.787, 0, -5.259]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <mesh
        geometry={nodes["Plane001_08_-_Default_0"].geometry}
        material={materials["08_-_Default"]}
        position={[1, 1, 3.4]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
      />
    </group>
  );
}
export default Cloud;
useGLTF.preload("/models/cloud.glb");
