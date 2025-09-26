import { useCallback, useRef } from "react";
import * as THREE from "three";
import { ANIMATION_CONFIG, DEFAULT_FADE_DURATION, DEFAULT_IDLE } from "../constants";
import { AnimationKeyType } from "../types";
import { logError, logInfo } from "../helpers";

export const useFadeAction = (actions: { [x: string]: THREE.AnimationAction | null }) => {
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  const previousActionRef = useRef<THREE.AnimationAction | null>(null);
  const isAnimatingRef = useRef(false);

  const fadeToAction = useCallback(
    (name: AnimationKeyType, duration: number = DEFAULT_FADE_DURATION) => {
      if (!actions || !actions[name]) {
        logError(`Animation "${name}" not found in available actions`);
        return false;
      }
      try {
        const newAction = actions[name]!;
        const oldAction = activeActionRef.current;
        const config = ANIMATION_CONFIG[name];

        logInfo(`Fading to animation: ${name}`, { duration, config });

        if (oldAction && oldAction !== newAction && oldAction.enabled) {
          oldAction.crossFadeTo(newAction, duration, false);
        }

        newAction.reset();
        newAction.enabled = true;
        newAction.setEffectiveTimeScale(1);
        newAction.setEffectiveWeight(1);

        if (config.type === "emote") {
          newAction.clampWhenFinished = true;
          newAction.loop = THREE.LoopOnce;
        } else {
          newAction.loop = THREE.LoopRepeat;
        }

        newAction.play();

        previousActionRef.current = oldAction;
        activeActionRef.current = newAction;
        isAnimatingRef.current = true;
        return true;
      } catch (error) {
        logError(`Failed to fade to animation "${name}"`, error);
        return false;
      }
    },
    [actions]
  );

  const restoreToIdle = useCallback(() => {
    logInfo("Restoring to idle state");
    isAnimatingRef.current = false;
    fadeToAction(DEFAULT_IDLE, 0.2);
  }, [fadeToAction]);

  return {
    fadeToAction,
    restoreToIdle,
    isAnimating: () => isAnimatingRef.current,
    getCurrentAction: () => activeActionRef.current?.getClip()?.name || null,
  };
};
