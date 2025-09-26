/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect, memo, useCallback } from "react";
import * as THREE from "three";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { PortalMaterial } from "./PortalMaterial";

extend({ PortalMaterial });

export interface MascotGroupRef {
  open: (cfg?: PortalConfig) => void;
  close: () => void;
  hide: () => void;
  show: () => void;
  toggle: () => void;
}

export interface PortalConfig {
  position?: [number, number, number];
  rotation?: [number, number, number]; // Euler XYZ radians
  size?: number; // world units
  color?: string; // hex, e.g. "#00ff00"
  hide?: "above" | "below";
}

const DEFAULT: Required<PortalConfig> = {
  position: [0, 0, -3.5],
  rotation: [-Math.PI / 2, 0, 0],
  size: 7,
  color: "#00ff04",
  hide: "below",
};
const DURATION = 0.45;

export const MascotGroup = forwardRef<MascotGroupRef, { gltf: any; defaultVisibile: boolean }>(({ gltf, defaultVisibile }, ref) => {
  const { nodes } = gltf;
  const { gl, camera } = useThree();
  const portalMeshRef = useRef<THREE.Mesh | null>(null);
  const portalMatRef = useRef<any>(null);
  const mascotGroupRef = useRef<THREE.Group | null>(null);

  const planeRef = useRef<THREE.Plane | null>(null);
  const modifiedMaterials = useRef<Set<THREE.Material>>(new Set());
  const cfgRef = useRef<Required<PortalConfig>>(DEFAULT);
  const animState = useRef<"opening" | "closing" | null>(null);
  const animTime = useRef(0);
  camera.layers.enable(1);

  useEffect(() => {
    gl.localClippingEnabled = true;
    return () => {
      gl.clippingPlanes = [];
      gl.localClippingEnabled = false;
    };
  }, [gl]);

  const applyPlaneToMascotMaterials = useCallback((plane: THREE.Plane) => {
    modifiedMaterials.current.clear();
    if (!mascotGroupRef.current) return;

    mascotGroupRef.current.traverse((child: any) => {
      if (child.isMesh || child.isSkinnedMesh) {
        const mesh = child as THREE.Mesh;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat: THREE.Material | null) => {
          if (!mat) return;
          modifiedMaterials.current.add(mat);
          (mat as any).clippingPlanes = [plane];
          (mat as any).clipShadows = false;
          mat.needsUpdate = true;
        });
      }
    });
  }, []);

  const removeClippingFromMaterials = useCallback(() => {
    modifiedMaterials.current.forEach((mat) => {
      if (!mat) return;
      try {
        (mat as any).clippingPlanes = [];
        (mat as any).clipShadows = false;
        mat.needsUpdate = true;
      } catch {}
    });
    modifiedMaterials.current.clear();
    planeRef.current = null;
  }, []);

  useImperativeHandle(ref, () => ({
    hide: () => {
      if (mascotGroupRef.current) mascotGroupRef.current.visible = false;
    },
    show: () => {
      if (mascotGroupRef.current) mascotGroupRef.current.visible = true;
    },
    toggle: () => {
      if (mascotGroupRef.current) mascotGroupRef.current.visible = !mascotGroupRef.current.visible;
    },
    open: (cfg?: PortalConfig) => {
      const merged: Required<PortalConfig> = { ...DEFAULT, ...(cfg ?? {}) };
      cfgRef.current = merged;

      if (portalMeshRef.current) {
        portalMeshRef.current.position.set(...merged.position);
        portalMeshRef.current.rotation.set(...merged.rotation);
        portalMeshRef.current.scale.set(merged.size, merged.size, 1);
        portalMeshRef.current.visible = true;
        portalMeshRef.current!.layers.set(1);
      }

      const normalWorld = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(...merged.rotation)).normalize();
      if (merged.hide === "below") normalWorld.negate();

      const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(normalWorld, new THREE.Vector3(...merged.position));
      planeRef.current = plane;
      applyPlaneToMascotMaterials(plane);

      if (portalMatRef.current) {
        const c = new THREE.Color(merged.color);
        portalMatRef.current.uColor = [c.r, c.g, c.b];
      }

      animState.current = "opening";
      animTime.current = 0;
    },
    close: () => {
      animState.current = "closing";
      animTime.current = 0;
    },
  }));

  useFrame((_, delta) => {
    if (portalMatRef.current) portalMatRef.current.time = (portalMatRef.current.time || 0) + delta;

    if (portalMatRef.current && animState.current) {
      animTime.current += delta;
      const tRaw = Math.min(animTime.current / DURATION, 1);
      const ease = tRaw < 0.5 ? 2 * tRaw * tRaw : -1 + (4 - 2 * tRaw) * tRaw;

      if (animState.current === "opening") {
        const bounce = tRaw > 0.75 ? Math.sin((tRaw - 0.75) * Math.PI * 6) * 0.04 * (1 - tRaw) : 0;
        portalMatRef.current.uRadius = ease * 0.95 + bounce;
        if (tRaw >= 1) animState.current = null;
      } else {
        portalMatRef.current.uRadius = (1 - ease) * 0.95;
        if (tRaw >= 1) {
          animState.current = null;
          if (portalMeshRef.current) portalMeshRef.current.visible = false;
          removeClippingFromMaterials();
        }
      }
    }

    if (planeRef.current && portalMeshRef.current) {
      const worldPos = new THREE.Vector3();
      portalMeshRef.current.getWorldPosition(worldPos);
      const worldQuat = new THREE.Quaternion();
      portalMeshRef.current.getWorldQuaternion(worldQuat);
      const normalWorld = new THREE.Vector3(0, 0, 1).applyQuaternion(worldQuat).normalize();
      if (cfgRef.current.hide === "below") normalWorld.negate();
      planeRef.current.setFromNormalAndCoplanarPoint(normalWorld, worldPos);
    }
  });

  return (
    <group>
      <mesh ref={portalMeshRef} castShadow={false} receiveShadow={false} visible={false}>
        <planeGeometry args={[1, 1, 128, 128]} />
        {/* @ts-expect-error extended shader material */}
        <portalMaterial ref={portalMatRef} uRadius={0} uColor={[0, 1, 0]} depthWrite={true} />
      </mesh>

      <group ref={mascotGroupRef} name="Scene" visible={defaultVisibile}>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
          {Object.values(nodes)
            .filter((n: any) => n.isMesh || n.isSkinnedMesh)
            .map((node: any, i) => (
              <skinnedMesh key={i} geometry={node.geometry} material={node.material} skeleton={node.skeleton} />
            ))}
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
});

MascotGroup.displayName = "MascotGroup";
export default memo(MascotGroup);
