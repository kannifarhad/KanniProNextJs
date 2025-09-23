"use client";
import * as THREE from "three";
import React, { useEffect, useImperativeHandle, forwardRef, useRef, memo } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { MascotGroup } from "./MascotGroup";

export type PersonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const ANIMATIONS = {
  IdleHappy: "IdleHappy",
  Wave: "Wave",
  IdleSit: "IdleSit",
  Dance: "Dance",
  ShowBackground: "ShowBackground",
  ClimbToTop: "ClimbToTop",
  Falling: "Falling",
  FallImpact: "FallingImpact",
  StandUp: "StandUp",
  ThumbsUp: "ThumbsUp",
} as const;

type AnimationKeyType = (typeof ANIMATIONS)[keyof typeof ANIMATIONS];

export type PersonControls = {
  runWave: () => void;
  sitDown: () => void;
  dance: () => void;
  thumbsUp: () => void;
  fallImpact: () => void;
  showBackground: () => void;
  climbToTop: () => void;
  fadeToAction: (name: AnimationKeyType, duration?: number) => void;
  setTimeScale: (scale: number) => void;
  getCurrentAction: () => string | null;
  getAvailableActions: () => string[];
};

// Define which animations are emotes (one-time actions) vs states (looping)
const emoteAnimations: AnimationKeyType[] = [
  ANIMATIONS.Wave,
  ANIMATIONS.IdleSit,
  ANIMATIONS.Dance,
  ANIMATIONS.ClimbToTop,
  ANIMATIONS.ShowBackground,
  ANIMATIONS.Falling,
  ANIMATIONS.FallImpact,
  ANIMATIONS.StandUp,
  ANIMATIONS.ThumbsUp,
]; // Add other emote animation names here
const stateAnimations: AnimationKeyType[] = [ANIMATIONS.IdleHappy]; // Add other state animation names here
const DEFAULT_IDLE = ANIMATIONS.IdleHappy;
const GLTF_PATH = "./models/mascot1.glb";

useGLTF.preload(GLTF_PATH);

const PersonModel = forwardRef<PersonControls, PersonProps>((props, ref) => {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF(GLTF_PATH);
  const { actions, mixer } = useAnimations(gltf.animations, group);

  // Store references
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  const previousActionRef = useRef<THREE.AnimationAction | null>(null);
  const currentStateRef = useRef<AnimationKeyType>(DEFAULT_IDLE);
  // const isAnimationRunning = () => currentStateRef.current !== ANIMATIONS.IdleHappy;

  // ---- Helper Functions ----
  const fadeToAction = (name: AnimationKeyType, duration: number = 0.5) => {
    if (!actions || !actions[name]) return;

    const newAction = actions[name];
    const oldAction = activeActionRef.current;

    if (oldAction !== newAction && oldAction?.enabled) {
      oldAction.crossFadeTo(newAction, duration, false);
    }

    // Always reset the new action time
    newAction.reset();
    newAction.enabled = true;
    newAction.setEffectiveTimeScale(1);
    newAction.setEffectiveWeight(1);
    newAction.play();

    previousActionRef.current = oldAction;
    activeActionRef.current = newAction;

    if (stateAnimations.includes(name)) {
      currentStateRef.current = name;
    }
  };

  const restoreState = () => {
    if (!mixer || !actions) return;

    currentStateRef.current = DEFAULT_IDLE;
    fadeToAction(DEFAULT_IDLE, 0.2);
  };

  const defaultOnFinished = (e: { action?: THREE.AnimationAction }) => {
    if (!e?.action) return;

    restoreState();
    mixer.removeEventListener("finished", defaultOnFinished);
  };

  // ---- Initialize Actions ----
  useEffect(() => {
    if (!actions || !mixer) return;
    console.log("actions", Object.entries(actions));
    // Configure animation properties
    Object.entries(actions).forEach(([name, action]) => {
      if (emoteAnimations.includes(name as AnimationKeyType) && action) {
        // Emotes: play once and stop at the end
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
      }
      // States will loop by default (THREE.LoopRepeat is default)
    });

    // Start with idle animation
    const initialAction = actions[DEFAULT_IDLE];
    if (initialAction) {
      activeActionRef.current = initialAction;
      currentStateRef.current = DEFAULT_IDLE;
      initialAction.play();
    }

    return () => {
      Object.values(actions).forEach((action) => action?.stop());
    };
  }, [actions, mixer]);

  const setTimeScale = (scale: number) => {
    if (mixer) {
      mixer.timeScale = scale;
    }
  };

  const getCurrentAction = (): string | null => {
    return currentStateRef.current;
  };

  const getAvailableActions = (): string[] => {
    return actions ? Object.keys(actions) : [];
  };

  // ---- Animation Controls ----

  useImperativeHandle(ref, () => ({
    runWave: () => {
      if (!actions || !mixer) return;

      // const waveAction = actions[ANIMATIONS.Wave];
      // if (!waveAction) return;

      fadeToAction(ANIMATIONS.Wave, 0.2);
      mixer.addEventListener("finished", defaultOnFinished);
    },
    sitDown: () => {
      if (!actions || !mixer) return;

      fadeToAction(ANIMATIONS.IdleSit, 0.5);

      // const onFinished = (e: { action?: THREE.AnimationAction }) => {
      //   if (!e?.action) return;

      //   restoreState();
      //   mixer.removeEventListener("finished", onFinished);
      // };

      mixer.addEventListener("finished", defaultOnFinished);
    },

    dance: () => {
      if (!actions || !mixer) return;
      fadeToAction(ANIMATIONS.Dance, 0.7);
      mixer.addEventListener("finished", defaultOnFinished);
    },
    showBackground: () => {
      if (!actions || !mixer) return;
      fadeToAction(ANIMATIONS.ShowBackground, 0.2);
      mixer.addEventListener("finished", defaultOnFinished);
    },
    climbToTop: () => {
      if (!actions || !mixer) return;
      fadeToAction(ANIMATIONS.ClimbToTop, 0.2);
      mixer.addEventListener("finished", defaultOnFinished);
    },

    thumbsUp: () => {
      if (!actions || !mixer) return;
      fadeToAction(ANIMATIONS.ThumbsUp, 0.2);
      mixer.addEventListener("finished", defaultOnFinished);
    },

    fallImpact: () => {
      if (!actions || !mixer) return;
      fadeToAction(ANIMATIONS.FallImpact, 0.2);
      mixer.addEventListener("finished", defaultOnFinished);
    },
    fadeToAction,
    setTimeScale,
    getCurrentAction,
    getAvailableActions,
  }));

  return (
    <group ref={group} {...props}>
      <MascotGroup gltf={gltf} />
    </group>
  );
});

PersonModel.displayName = "PersonModel";
export default memo(PersonModel);
