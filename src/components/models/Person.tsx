"use client";
import * as THREE from "three";
import React, { useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { AnimationAction } from "three";
import { MascotGroup } from "./MascotGroup";

export type PersonControls = {
  runWave: () => void;
};

const Person = forwardRef<PersonControls>((_, ref) => {
  const group = useRef<THREE.Group>(null);

  // Load model with animations
  const gltf = useGLTF("./models/mascot.glb");

  // Hook into animations
  const { actions, mixer } = useAnimations(gltf.animations, group);

  // Refs to store animations
  const idleRef = useRef<AnimationAction | null>(null);
  const waveRef = useRef<AnimationAction | null>(null);

  useEffect(() => {
    if (!actions) return;

    idleRef.current = actions["IdleHappy"] || null;
    waveRef.current = actions["Wave"] || null;

    idleRef.current?.reset().fadeIn(0.5).play();

    return () => {
      Object.values(actions).forEach((a) => a?.stop());
    };
  }, [actions]);

  const runWave = () => {
    const idle = idleRef.current;
    const wave = waveRef.current;
    if (!wave) return;

    idle?.fadeOut(0.3);

    wave.reset();
    wave.setLoop(THREE.LoopOnce, 1);
    wave.clampWhenFinished = true;
    wave.fadeIn(0.3).play();

    const onFinished = (e: { action?: AnimationAction }) => {
      if (e?.action === wave) {
        wave.fadeOut(0.3);
        idle?.reset().fadeIn(0.5).play();
        mixer.removeEventListener("finished", onFinished);
      }
    };
    mixer.addEventListener("finished", onFinished);
  };

  useImperativeHandle(ref, () => ({
    runWave,
  }));

  return (
    <group ref={group}>
      <MascotGroup gltf={gltf} />
    </group>
  );
});

Person.displayName = "Person";
export default Person;
useGLTF.preload("./models/mascot.glb");
