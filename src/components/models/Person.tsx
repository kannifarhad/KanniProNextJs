/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="@react-three/fiber" />
import React, { useEffect, useRef } from "react";
import { Group, SkinnedMesh, Bone, MeshStandardMaterial } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Arm_left: SkinnedMesh;
    Arm_Right: SkinnedMesh;
    Hand_left: SkinnedMesh;
    Hand_right: SkinnedMesh;
    Circle003: SkinnedMesh;
    Circle003_1: SkinnedMesh;
    Circle012: SkinnedMesh;
    Circle012_1: SkinnedMesh;
    Circle012_2: SkinnedMesh;
    Circle008: SkinnedMesh;
    Circle008_1: SkinnedMesh;
    Circle008_2: SkinnedMesh;
    Circle014: SkinnedMesh;
    Circle014_1: SkinnedMesh;
    Circle014_2: SkinnedMesh;
    Circle013: SkinnedMesh;
    Circle013_1: SkinnedMesh;
    Circle013_2: SkinnedMesh;
    Circle011: SkinnedMesh;
    Circle011_1: SkinnedMesh;
    mixamorigHips: Bone;
    // allow extra keys without breaking the typed shape
    // [key: string]: any;
  };
  materials: {
    ["Material.001"]: MeshStandardMaterial;
    ["Material.002"]: MeshStandardMaterial;
    ["Material.003"]: MeshStandardMaterial;
    ["Material.004"]: MeshStandardMaterial;
    ["Material.005"]: MeshStandardMaterial;
    ["Material.007"]: MeshStandardMaterial;
    // [key: string]: any;
  };
};

// type ModelProps = JSX.IntrinsicElements["group"];

const Person = (props: any) => {
  const group = useRef<Group>(null);
  // cast through unknown to avoid TS complaining about incompatible shapes
  const gltf = useGLTF("./models/person.glb") as unknown as GLTFResult;
  const { nodes, materials, animations } = gltf;
  // useAnimations expects a ref; keep as-is but allow loose typing
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first available animation when loaded
    if (actions) {
      const firstAction = Object.values(actions)[0];
      if (firstAction) {
        firstAction.reset().fadeIn(0.5).play();
      }
    }

    // Optional cleanup to stop animations on unmount
    return () => {
      Object.values(actions || {}).forEach((action) => action?.stop());
    };
  }, [actions]);
  return (
    <group ref={group} dispose={null} {...props}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, 0]}
          // position={[0, 0, 0]}
          // //
          // scale={0.02}
        >
          <skinnedMesh name="Arm_left" geometry={nodes.Arm_left.geometry} material={materials["Material.001"]} skeleton={nodes.Arm_left.skeleton} />
          <skinnedMesh name="Arm_Right" geometry={nodes.Arm_Right.geometry} material={materials["Material.001"]} skeleton={nodes.Arm_Right.skeleton} />
          <skinnedMesh name="Hand_left" geometry={nodes.Hand_left.geometry} material={materials["Material.005"]} skeleton={nodes.Hand_left.skeleton} />
          <skinnedMesh name="Hand_right" geometry={nodes.Hand_right.geometry} material={materials["Material.005"]} skeleton={nodes.Hand_right.skeleton} />
          <group name="Head">
            <skinnedMesh name="Circle003" geometry={nodes.Circle003.geometry} material={materials["Material.005"]} skeleton={nodes.Circle003.skeleton} />
            <skinnedMesh name="Circle003_1" geometry={nodes.Circle003_1.geometry} material={materials["Material.007"]} skeleton={nodes.Circle003_1.skeleton} />
          </group>
          <group name="Leg_left">
            <skinnedMesh name="Circle012" geometry={nodes.Circle012.geometry} material={materials["Material.001"]} skeleton={nodes.Circle012.skeleton} />
            <skinnedMesh name="Circle012_1" geometry={nodes.Circle012_1.geometry} material={materials["Material.005"]} skeleton={nodes.Circle012_1.skeleton} />
            <skinnedMesh name="Circle012_2" geometry={nodes.Circle012_2.geometry} material={materials["Material.003"]} skeleton={nodes.Circle012_2.skeleton} />
          </group>
          <group name="Leg_right">
            <skinnedMesh name="Circle008" geometry={nodes.Circle008.geometry} material={materials["Material.001"]} skeleton={nodes.Circle008.skeleton} />
            <skinnedMesh name="Circle008_1" geometry={nodes.Circle008_1.geometry} material={materials["Material.005"]} skeleton={nodes.Circle008_1.skeleton} />
            <skinnedMesh name="Circle008_2" geometry={nodes.Circle008_2.geometry} material={materials["Material.003"]} skeleton={nodes.Circle008_2.skeleton} />
          </group>
          <group name="Shoe_left">
            <skinnedMesh name="Circle014" geometry={nodes.Circle014.geometry} material={materials["Material.003"]} skeleton={nodes.Circle014.skeleton} />
            <skinnedMesh name="Circle014_1" geometry={nodes.Circle014_1.geometry} material={materials["Material.002"]} skeleton={nodes.Circle014_1.skeleton} />
            <skinnedMesh name="Circle014_2" geometry={nodes.Circle014_2.geometry} material={materials["Material.004"]} skeleton={nodes.Circle014_2.skeleton} />
          </group>
          <group name="Shoe_right">
            <skinnedMesh name="Circle013" geometry={nodes.Circle013.geometry} material={materials["Material.003"]} skeleton={nodes.Circle013.skeleton} />
            <skinnedMesh name="Circle013_1" geometry={nodes.Circle013_1.geometry} material={materials["Material.002"]} skeleton={nodes.Circle013_1.skeleton} />
            <skinnedMesh name="Circle013_2" geometry={nodes.Circle013_2.geometry} material={materials["Material.004"]} skeleton={nodes.Circle013_2.skeleton} />
          </group>
          <group name="Torso">
            <skinnedMesh name="Circle011" geometry={nodes.Circle011.geometry} material={materials["Material.001"]} skeleton={nodes.Circle011.skeleton} />
            <skinnedMesh name="Circle011_1" geometry={nodes.Circle011_1.geometry} material={materials["Material.005"]} skeleton={nodes.Circle011_1.skeleton} />
          </group>
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("./models/person.glb");

export default Person;
