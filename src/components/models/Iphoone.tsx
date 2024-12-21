"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { easing } from "maath";

interface IPhoneProps {
  focused: boolean;
  [key: string]: unknown; // Allow other props to be passed
}

const IPhone: React.FC<IPhoneProps> = ({ focused, ...props }) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/models/iphone.gltf");
  const { camera } = useThree();

  const targetPosition = new THREE.Vector3(); // Reusable vector for target position
  const lookAtTarget = new THREE.Vector3(-8, -1, 2); // Reusable vector for look-at target
  const offset = new THREE.Vector3(-1, -10, 6); // Offset to position the camera relative to the object

  useFrame((state, delta) => {
    if (!focused) {
      const t = state.clock.getElapsedTime();
      if (group.current) {
        group.current.rotation.x = THREE.MathUtils.lerp(
          group.current.rotation.x,
          Math.sin(t / 2) / 20 + 0.25,
          0.1
        );
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          Math.cos(t / 4) / 20,
          0.2
        );
        group.current.rotation.z = THREE.MathUtils.lerp(
          group.current.rotation.z,
          Math.sin(t / 8) / 20,
          0.1
        );
        group.current.position.y = THREE.MathUtils.lerp(
          group.current.position.y,
          (-3 + Math.sin(t / 2)) / 1.8 - 2,
          0.1
        );
      }
    } else {
      if (group.current) {
        // Get the world position of the screen
        group.current.getWorldPosition(targetPosition);

        // Offset the target position to position the camera correctly
        targetPosition.add(offset);

        // Smoothly move the camera to the target position
        easing.damp3(camera.position, targetPosition, 0.6, delta);

        // Smoothly rotate the camera to look at the object
        camera.lookAt(lookAtTarget);
      }
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 3, 0]} scale={0.008}>
        <group rotation={[1.3, Math.PI, 0]} scale={100}>
          <mesh
            geometry={(nodes.IPHONE13_BlueGlossy_0 as THREE.Mesh).geometry}
            material={materials.BlueGlossy}
          />
          <mesh
            geometry={(nodes.IPHONE13_Red_0 as THREE.Mesh).geometry}
            material={materials.material}
          />
          <mesh
            geometry={(nodes.IPHONE13_BlueMatte_0 as THREE.Mesh).geometry}
            material={materials.BlueMatte}
          />
          <mesh
            geometry={(nodes.IPHONE13_SpeakerAndMiic_0 as THREE.Mesh).geometry}
            material={materials.SpeakerAndMiic}
          />
          <mesh
            geometry={(nodes.IPHONE13_Silver001_0 as THREE.Mesh).geometry}
            material={materials["Silver.001"]}
          />
          <mesh
            geometry={(nodes.BackCover_Blue_0 as THREE.Mesh).geometry}
            material={materials.Blue}
          />
          <mesh
            geometry={(nodes.Screen_Screen_0 as THREE.Mesh).geometry}
            material={materials.Screen}
          />
          <mesh
            geometry={(nodes.CameraModuleBlack_BlackGlossy_0 as THREE.Mesh).geometry}
            material={materials.BlackGlossy}
          />
          <mesh
            geometry={(nodes.CameraModuleBlack_SpeakerAndMiic_0 as THREE.Mesh).geometry}
            material={materials.SpeakerAndMiic}
          />
          <mesh
            geometry={(nodes.Bezel_BezelAndNotch_0 as THREE.Mesh).geometry}
            material={materials.BezelAndNotch}
          />
          <mesh
            geometry={(nodes.Bezel_SpeakerAndMiic_0 as THREE.Mesh).geometry}
            material={materials.SpeakerAndMiic}
          />
          <mesh
            geometry={(nodes.Bezel_CameraGray_0 as THREE.Mesh).geometry}
            material={materials.CameraGray}
          />
          <mesh
            geometry={(nodes.Bezel_FrontCameraGlass_0 as THREE.Mesh).geometry}
            material={materials.FrontCameraGlass}
          />
          <mesh
            geometry={(nodes.PowerButton_BlueGlossy_0 as THREE.Mesh).geometry}
            material={materials.BlueGlossy}
          />
          <mesh
            geometry={(nodes.Volume_Button_BlueGlossy_0 as THREE.Mesh).geometry}
            material={materials.BlueGlossy}
          />
          <mesh
            geometry={(nodes.MuteButton_BlueGlossy_0 as THREE.Mesh).geometry}
            material={materials.BlueGlossy}
          />
          <mesh
            geometry={(nodes.Camera1_CameraBlack_0 as THREE.Mesh).geometry}
            material={materials.CameraBlack}
          />
          <mesh
            geometry={(nodes.Camera1_CameraMetal_0 as THREE.Mesh).geometry}
            material={materials.CameraMetal}
          />
          <mesh
            geometry={(nodes.Camera1_CameraGray_0 as THREE.Mesh).geometry}
            material={materials.CameraGray}
          />
          <mesh
            geometry={(nodes.Sphere_Lens_0 as THREE.Mesh).geometry}
            material={materials.Lens}
          />
          <mesh
            geometry={(nodes.Camera2_CameraBlack_0 as THREE.Mesh).geometry}
            material={materials.CameraBlack}
          />
          <mesh
            geometry={(nodes.Camera2_CameraMetal_0 as THREE.Mesh).geometry}
            material={materials.CameraMetal}
          />
          <mesh
            geometry={(nodes.Camera2_CameraGray_0 as THREE.Mesh).geometry}
            material={materials.CameraGray}
          />
          <mesh
            geometry={(nodes.Sphere002_Lens_0 as THREE.Mesh).geometry}
            material={materials.Lens}
          />
          <mesh
            geometry={(nodes.Camera3_CameraBlack_0 as THREE.Mesh).geometry}
            material={materials.CameraBlack}
          />
          <mesh
            geometry={(nodes.Camera3_CameraMetal_0 as THREE.Mesh).geometry}
            material={materials.CameraMetal}
          />
          <mesh
            geometry={(nodes.Camera3_CameraGray_0 as THREE.Mesh).geometry}
            material={materials.CameraGray}
          />
          <mesh
            geometry={(nodes.Sphere001_Lens_0 as THREE.Mesh).geometry}
            material={materials.Lens}
          />
          <mesh
            geometry={(nodes.LiDar_LiDar_0 as THREE.Mesh).geometry}
            material={materials.LiDar}
          />
          <mesh
            geometry={(nodes.Flash_Silver_0 as THREE.Mesh).geometry}
            material={materials.Silver}
          />
          <mesh
            geometry={(nodes.Flash_Flash_0 as THREE.Mesh).geometry}
            material={materials.Flash}
          />
          <mesh
            geometry={(nodes.CameraModuleGlass_Glass_0 as THREE.Mesh).geometry}
            material={materials.Glass}
          />
          <mesh
            geometry={(nodes.FrontCam_Lens_0 as THREE.Mesh).geometry}
            material={materials.Lens}
          />
          <mesh
            geometry={(nodes.Apple_Logo_AppleLogo_0 as THREE.Mesh).geometry}
            material={materials.AppleLogo}
          />
        </group>
      </group>
    </group>
  );
};

export default IPhone;

useGLTF.preload("/models/iphone.gltf");