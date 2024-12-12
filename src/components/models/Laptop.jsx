import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { easing } from "maath";

function Laptop({ focused, ...props }) {
  const group = useRef();
  const screenRef = useRef();
  const { nodes, materials } = useGLTF("./models/mac-draco.glb");
  const { camera } = useThree();

  const targetPosition = new THREE.Vector3(); // Reusable vector for target position
  const lookAtTarget = new THREE.Vector3(-2, 0, 0); // Reusable vector for look-at target
  const offset = new THREE.Vector3(0, 0, 7.5); // Offset to position the camera relative to the object

  useFrame((state, delta) => {
    if (!focused) {
      // Floating animation when not focused
      const t = state.clock.getElapsedTime();
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        Math.cos(t / 2) / 30 + 0.25,
        0.1
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t / 4) / 30,
        0.1
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        Math.sin(t / 8) / 30,
        0.1
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        (-4 + Math.cos(t / 2)) / 2.5,
        0.1
      );
    } else {
      // Get the world position of the screen
      screenRef.current.getWorldPosition(targetPosition);

      // Offset the target position to position the camera correctly
      targetPosition.add(offset);

      // Smoothly move the camera to the target position
      easing.damp3(camera.position, targetPosition, 0.6, delta);
      easing.damp3(group.current.rotation, [0, 0, 0], 0.6, delta);

      // Get the look-at target from the screen's world position
      // screenRef.current.getWorldPosition(lookAtTarget);
      // console.log(lookAtTarget)

      // Smoothly rotate the camera to look at the object
      camera.lookAt(lookAtTarget);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.3} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh
            material={materials["screen.001"]}
            geometry={nodes["Cube008_2"].geometry}
            ref={screenRef}
          />
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}
export default Laptop;
