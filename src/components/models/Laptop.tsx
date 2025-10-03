import * as THREE from "three";
import React, { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { mergeRefs } from "@/helpers/common";
interface LaptopProps {
  [key: string]: unknown; // Allow other props to be passed
}

const Laptop: React.FC<LaptopProps> = React.forwardRef<THREE.Group, LaptopProps>((props, ref) => {
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null); // Ref for the screen mesh
  const { nodes, materials } = useGLTF("./models/mac-draco.glb");

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.x = Math.cos(t / 2) / 30 + 0.25;
      group.current.rotation.y = Math.sin(t / 4) / 30;
      group.current.rotation.z = Math.sin(t / 8) / 30;
      group.current.position.y = (-4 + Math.cos(t / 2)) / 2.5;
    }
  });

  return (
    <group ref={mergeRefs([group, ref])} {...props} dispose={null}>
      <group rotation-x={-0.3} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={(nodes["Cube008"] as THREE.Mesh).geometry} />
          <mesh material={materials["matte.001"]} geometry={(nodes["Cube008_1"] as THREE.Mesh).geometry} />
          <mesh
            material={materials["screen.001"]}
            geometry={(nodes["Cube008_2"] as THREE.Mesh).geometry}
            ref={screenRef}
          />
        </group>
      </group>
      <mesh material={materials.keys} geometry={(nodes.keyboard as THREE.Mesh).geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={(nodes["Cube002"] as THREE.Mesh).geometry} />
        <mesh material={materials.trackpad} geometry={(nodes["Cube002_1"] as THREE.Mesh).geometry} />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={(nodes.touchbar as THREE.Mesh).geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
});
Laptop.displayName = "Laptop";
export default memo(Laptop);
