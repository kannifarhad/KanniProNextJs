"use client";
import * as THREE from "three";
import React, { useRef, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { mergeRefs } from "@/helpers/common";

interface IpadProps {
  [key: string]: unknown; // Allow other props to be passed
}

const Ipad: React.FC<IpadProps> = React.forwardRef<THREE.Group, IpadProps>((props, ref) => {
  const group = useRef<THREE.Group>(null);
  const pencilGroup = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/models/ipad.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 10) / 4, 0.1);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-10 + Math.sin(t)) / 3, 0.1);
    }

    // Pencil drawing animation
    if (pencilGroup.current) {
      // Create a smooth circular/elliptical drawing pattern
      const speed = 0.3;
      const time = t * speed;

      // Small offsets from the original position (0.4, 0.01, 0.7)
      const offsetX = Math.sin(time) * 0.08; // Small horizontal movement
      const offsetZ = Math.cos(time) * 0.06; // Small vertical movement

      // Position pencil on the screen surface with small movements
      pencilGroup.current.position.set(0.4 + offsetX, 0.01, 0.7 + offsetZ);

      // Smooth rotation that follows the drawing motion
      pencilGroup.current.rotation.set(-0.25 + Math.sin(time) * 0.05, Math.PI - 0.47 + Math.cos(time) * 0.05, 0);
    }
  });

  return (
    <group ref={mergeRefs([group, ref])} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={8}>
        <group name="iPad_Pro_2020">
          <mesh geometry={(nodes.iPad_Pro_2020_Body_0 as THREE.Mesh).geometry} material={materials.Body} />
          <mesh geometry={(nodes.iPad_Pro_2020_screen_0 as THREE.Mesh).geometry} material={materials.screen} />
          <mesh geometry={(nodes.iPad_Pro_2020_bezel_0 as THREE.Mesh).geometry} material={materials.bezel} />
          <mesh geometry={(nodes.camera_module_Body_0 as THREE.Mesh).geometry} material={materials.Body} />
          <mesh geometry={(nodes.camera_module_glass_0 as THREE.Mesh).geometry} material={materials.glass} />
          <mesh geometry={(nodes.camera_module2_camera2_0 as THREE.Mesh).geometry} material={materials.camera2} />
          <mesh
            geometry={(nodes.camera_cameraframe_and_logo_0 as THREE.Mesh).geometry}
            material={materials.cameraframe_and_logo}
          />
          <mesh geometry={(nodes.camera_glass_0 as THREE.Mesh).geometry} material={materials.glass} />
          <mesh geometry={(nodes.camera1_camera1_0 as THREE.Mesh).geometry} material={materials.camera1} />
          <mesh geometry={(nodes["camera1_camera1(2)_0"] as THREE.Mesh).geometry} material={materials.camera12} />
          <mesh geometry={(nodes.camera2_camera2_0 as THREE.Mesh).geometry} material={materials.camera2} />
          <mesh geometry={(nodes.LiDar_LiDar_0 as THREE.Mesh).geometry} material={materials.LiDar} />
          <mesh geometry={(nodes.camera1001_camera1_0 as THREE.Mesh).geometry} material={materials.camera1} />
          <mesh geometry={(nodes["camera1001_camera1(2)_0"] as THREE.Mesh).geometry} material={materials.camera12} />
          <mesh
            geometry={(nodes.camera_module2001_camera2001_0 as THREE.Mesh).geometry}
            material={materials["camera2.001"]}
          />
          <mesh
            geometry={(nodes.camera_module2001_Camera_Flash_0 as THREE.Mesh).geometry}
            material={materials.Camera_Flash}
          />
          <mesh geometry={(nodes.camera_module2001_Mic_0 as THREE.Mesh).geometry} material={materials.material} />
          <mesh
            geometry={(nodes.Apple_logo_cameraframe_and_logo_0 as THREE.Mesh).geometry}
            material={materials.cameraframe_and_logo}
          />
          <mesh geometry={(nodes.Connector__0 as THREE.Mesh).geometry} material={materials.material_12} />
          <mesh
            geometry={(nodes.Front_camera_front_camera_0 as THREE.Mesh).geometry}
            material={materials.front_camera}
          />
          <mesh geometry={(nodes["Front_camera_camera1(2)_0"] as THREE.Mesh).geometry} material={materials.camera12} />
          <mesh geometry={(nodes.Front_camera_glass_0 as THREE.Mesh).geometry} material={materials.glass} />
          <mesh geometry={(nodes.Speakers_Mic_0 as THREE.Mesh).geometry} material={materials.material} />
          <mesh geometry={(nodes.Speakers_Body_0 as THREE.Mesh).geometry} material={materials.Body} />
          <mesh geometry={(nodes.power_button_Body_0 as THREE.Mesh).geometry} material={materials.Body} />
          <mesh geometry={(nodes.Volume_button_Body_0 as THREE.Mesh).geometry} material={materials.Body} />
        </group>
        <group name="pencil" ref={pencilGroup}>
          <mesh
            geometry={(nodes.Apple_Pencil_apple_pencil_0 as THREE.Mesh).geometry}
            material={materials.apple_pencil}
          />
          <mesh
            geometry={(nodes.Apple_logo001_apple_pencil001_0 as THREE.Mesh).geometry}
            material={materials["apple_pencil.001"]}
          />
          <mesh
            geometry={(nodes.Text_apple_pencil001_0 as THREE.Mesh).geometry}
            material={materials["apple_pencil.001"]}
          />
        </group>
      </group>
    </group>
  );
});

useGLTF.preload("/models/ipad.glb");
Ipad.displayName = "Ipad";

export default memo(Ipad);
