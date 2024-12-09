"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { easing } from "maath";

export function Ipad({ focused, ...props }) {
  const group = useRef();

  const { nodes, materials } = useGLTF("/models/ipad.glb");
  const { camera } = useThree();

  const targetPosition = new THREE.Vector3(); // Reusable vector for target position
  const lookAtTarget = new THREE.Vector3(6, 1, 1); // Reusable vector for look-at target
  const offset = new THREE.Vector3(0, 7.5, 7.5); // Offset to position the camera relative to the object

  useFrame((state, delta) => {
    if (!focused) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t / 10) / 4,
        0.1
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        (-10 + Math.sin(t)) / 3,
        0.1
      );
    } else {
      // Get the world position of the screen
      group.current.getWorldPosition(targetPosition);

      // Offset the target position to position the camera correctly
      targetPosition.add(offset);

      // Smoothly move the camera to the target position
      easing.damp3(camera.position, targetPosition, 0.6, delta);
      // Get the look-at target from the screen's world position
      // Smoothly rotate the camera to look at the object
      camera.lookAt(lookAtTarget);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.5}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            geometry={nodes.iPad_Pro_2020_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            geometry={nodes.iPad_Pro_2020_screen_0.geometry}
            material={materials.screen}
          />
          <mesh
            geometry={nodes.iPad_Pro_2020_bezel_0.geometry}
            material={materials.bezel}
          />
          <mesh
            geometry={nodes.camera_module_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            geometry={nodes.camera_module_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            geometry={nodes.camera_module2_camera2_0.geometry}
            material={materials.camera2}
          />
          <mesh
            geometry={nodes.camera_cameraframe_and_logo_0.geometry}
            material={materials.cameraframe_and_logo}
          />
          <mesh
            geometry={nodes.camera_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            geometry={nodes.camera1_camera1_0.geometry}
            material={materials.camera1}
          />
          <mesh
            geometry={nodes["camera1_camera1(2)_0"].geometry}
            material={materials.camera12}
          />
          <mesh
            geometry={nodes.camera2_camera2_0.geometry}
            material={materials.camera2}
          />
          <mesh
            geometry={nodes.LiDar_LiDar_0.geometry}
            material={materials.LiDar}
          />
          <mesh
            geometry={nodes.camera1001_camera1_0.geometry}
            material={materials.camera1}
          />
          <mesh
            geometry={nodes["camera1001_camera1(2)_0"].geometry}
            material={materials.camera12}
          />
          <mesh
            geometry={nodes.camera_module2001_camera2001_0.geometry}
            material={materials["camera2.001"]}
          />
          <mesh
            geometry={nodes.camera_module2001_Camera_Flash_0.geometry}
            material={materials.Camera_Flash}
          />
          <mesh
            geometry={nodes.camera_module2001_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Apple_logo_cameraframe_and_logo_0.geometry}
            material={materials.cameraframe_and_logo}
          />
          <mesh
            geometry={nodes.Connector__0.geometry}
            material={materials.material_12}
          />
          <mesh
            geometry={nodes.Front_camera_front_camera_0.geometry}
            material={materials.front_camera}
          />
          <mesh
            geometry={nodes["Front_camera_camera1(2)_0"].geometry}
            material={materials.camera12}
          />
          <mesh
            geometry={nodes.Front_camera_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            geometry={nodes.Speakers_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            geometry={nodes.Speakers_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            geometry={nodes.power_button_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            geometry={nodes.Volume_button_Body_0.geometry}
            material={materials.Body}
          />
          <group
            rotation={[-0.25, Math.PI - 0.47, 0]}
            position={[0.4, 0.01, 0.7]}
          >
            <mesh
              geometry={nodes.Apple_Pencil_apple_pencil_0.geometry}
              material={materials.apple_pencil}
            />
            <mesh
              geometry={nodes.Apple_logo001_apple_pencil001_0.geometry}
              material={materials["apple_pencil.001"]}
            />
            <mesh
              geometry={nodes.Text_apple_pencil001_0.geometry}
              material={materials["apple_pencil.001"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

export default Ipad;
useGLTF.preload("/models/ipad.glb");
