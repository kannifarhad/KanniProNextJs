import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";

export function Ipad({ screenHTML, ...props }) {
  const group = useRef();

  const { nodes, materials } = useGLTF("/models/ipad.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // group.current.rotation.x = THREE.MathUtils.lerp(
    //   group.current.rotation.x,
    //   Math.cos(t / 10) / 10 + 0.25,
    //   0.1
    // );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 10) / 4,
      0.1
    );
    // group.current.rotation.z = THREE.MathUtils.lerp(
    //   group.current.rotation.z,
    //   Math.sin(t / 10) / 10,
    //   0.1
    // );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      (-10 + Math.sin(t)) / 3,
      0.1
    );
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
          >
            <Html
              className="content"
              rotation={[Math.PI / 2, 0, 0]}
              position={[-0.15, -0.0009, 0.7]}
              scale={0.1}
              transform
              occlude
            >
              <div
                className="wrapper"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {screenHTML}
              </div>
            </Html>
          </mesh>
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
          <group rotation={[-0.25, Math.PI - 0.47, 0]} position={[0.4, 0.01, 0.7]}>
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
