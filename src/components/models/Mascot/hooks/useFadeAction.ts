import { useCallback, useRef } from "react";
import * as THREE from "three";
import { logError, logInfo } from "../helpers";
import { ANIMATION_CONFIG, DEFAULT_FADE_DURATION, DEFAULT_IDLE } from "../constants";
import { AnimationKeyType } from "../types";

type AnimationPromiseController = {
  resolve: () => void;
  reject: (reason: string) => void;
  action: THREE.AnimationAction;
};

export const useFadeAction = (actions: { [x: string]: THREE.AnimationAction | null }) => {
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  const previousActionRef = useRef<THREE.AnimationAction | null>(null);
  const isAnimatingRef = useRef(false);
  const currentPromiseController = useRef<AnimationPromiseController | null>(null);

  const cancelCurrentAnimation = useCallback(() => {
    if (currentPromiseController.current) {
      currentPromiseController.current.reject("Animation cancelled");
      currentPromiseController.current = null;
    }
  }, []);

  const fadeToAction = useCallback(
    (name: AnimationKeyType, duration: number = DEFAULT_FADE_DURATION, loop: boolean = false): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (!actions || !actions[name]) {
          const error = `Animation "${name}" not found in available actions`;
          logError(error);
          reject(error);
          return;
        }

        // Cancel any existing animation promise
        cancelCurrentAnimation();

        isAnimatingRef.current = true;

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
            newAction.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
            
            // Store promise controller for this animation
            currentPromiseController.current = {
              resolve,
              reject,
              action: newAction
            };
          } else {
            // Loop animations resolve immediately
            isAnimatingRef.current = false;
            newAction.loop = THREE.LoopRepeat;
            resolve();
          }

          newAction.play();

          previousActionRef.current = oldAction;
          activeActionRef.current = newAction;
        } catch (error) {
          const errorMsg = `Failed to fade to animation "${name}"`;
          logError(errorMsg, error);
          isAnimatingRef.current = false;
          reject(errorMsg);
        }
      });
    },
    [actions, cancelCurrentAnimation]
  );

  const restoreToIdle = useCallback((): Promise<void> => {
    logInfo("Restoring to idle state");
    isAnimatingRef.current = false;
    return fadeToAction(DEFAULT_IDLE, 0.2);
  }, [fadeToAction]);

  const resolveCurrentAnimation = useCallback(() => {
    if (currentPromiseController.current) {
      currentPromiseController.current.resolve();
      currentPromiseController.current = null;
      isAnimatingRef.current = false;
    }
  }, []);

  return {
    fadeToAction,
    restoreToIdle,
    cancelCurrentAnimation,
    resolveCurrentAnimation,
    isAnimating: () => isAnimatingRef.current,
    getCurrentAction: () => activeActionRef.current?.getClip()?.name || null,
    getCurrentPromiseController: () => currentPromiseController.current,
  };
};