"use client";
import * as THREE from "three";
import React, { useImperativeHandle, forwardRef, useRef, memo, useCallback } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { MascotGroup, MascotGroupRef } from "./MascotGroup";
import { PersonControls, PersonProps, SequenceStep } from "./types";
import { ANIMATIONS, GLTF_PATH } from "./constants";
import { generateFallScenario, generateInitPersonScenario, logInfo } from "./helpers";
import { useAnimationRunners } from "./hooks/useAnimationRunners";
export * from "./types";

// Preload the model
useGLTF.preload(GLTF_PATH);

const PersonModel = forwardRef<PersonControls, PersonProps>(({ defaultVisibile = false ,...props}, ref) => {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF(GLTF_PATH);
  const { actions, mixer } = useAnimations(gltf.animations, group);

  // Animation state management
  const mascotRef = useRef<MascotGroupRef>(null);

  const { runAnimationSequence, isAnimating, stopAllAnimations, pauseAnimations, resumeAnimations, playEmote, getCurrentAction } = useAnimationRunners({
    actions,
    mixer,
  });
  // Clean up event listeners

  // Simplified sequence definitions using the enhanced reusable function
  const initPerson = useCallback(() => {
    const sequence: SequenceStep[] = generateInitPersonScenario(mascotRef);
    runAnimationSequence(sequence, "initPerson");
  }, [runAnimationSequence]);

  const initFallScenario = useCallback(() => {
    const sequence: SequenceStep[] = generateFallScenario(mascotRef);
    runAnimationSequence(sequence, "initFallScenario");
  }, [runAnimationSequence]);

  // Utility methods
  const setTimeScale = useCallback(
    (scale: number) => {
      if (mixer) {
        mixer.timeScale = Math.max(0, scale); // Ensure non-negative
        logInfo(`Time scale set to ${scale}`);
      }
    },
    [mixer]
  );

  // Imperative handle with all controls
  useImperativeHandle(
    ref,
    () => ({
      // Specific emote methods
      runWave: () => playEmote(ANIMATIONS.Wave),
      sitDown: () => playEmote(ANIMATIONS.IdleSit),
      dance: () => playEmote(ANIMATIONS.Dance),
      thumbsUp: () => playEmote(ANIMATIONS.ThumbsUp),
      fallImpact: () => playEmote(ANIMATIONS.FallImpact),
      showBackground: () => playEmote(ANIMATIONS.ShowBackground),
      climbToTop: () => playEmote(ANIMATIONS.ClimbToTop),
      standUp: () => playEmote(ANIMATIONS.StandUp),
      falling: () => playEmote(ANIMATIONS.Falling),
      hide: () => mascotRef.current?.hide(),
      show: () => mascotRef.current?.show(),

      // Animation sequences
      initPerson,
      initFallScenario,
      runAnimationSequence,

      // General controls
      setTimeScale,
      getCurrentAction,
      isAnimating,
      stopAllAnimations,
      pauseAnimations,
      resumeAnimations,
    }),
    [playEmote, initPerson, initFallScenario, runAnimationSequence, setTimeScale, getCurrentAction, isAnimating, stopAllAnimations, pauseAnimations, resumeAnimations]
  );

  return (
    <group ref={group} {...props}>
      <MascotGroup ref={mascotRef} gltf={gltf} defaultVisibile={defaultVisibile} />
    </group>
  );
});

PersonModel.displayName = "PersonModel";
export default memo(PersonModel);
