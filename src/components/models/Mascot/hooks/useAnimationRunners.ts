import { useEffect, useCallback } from "react";
import * as THREE from "three";
import { getAnimationsList, logError, logInfo } from "../helpers";
import { useFadeAction } from "./useFadeAction";
import { useFinishedListeners } from "./useFinishedListeners";
import { useSequenceRunner } from "./useSequenceRunner";
import { ANIMATION_CONFIG } from "../constants";
import { AnimationKeyType } from "../types";

type HookPropType = {
  actions: { [x: string]: THREE.AnimationAction | null };
  mixer: THREE.AnimationMixer | null;
};

const { emoteAnimations } = getAnimationsList();

export const useAnimationRunners = ({ actions, mixer }: HookPropType) => {
  const {
    fadeToAction,
    restoreToIdle,
    isAnimating,
    getCurrentAction,
    cancelCurrentAnimation,
    resolveCurrentAnimation,
  } = useFadeAction(actions);

  const { createFinishedListener, cleanupFinishedListeners } = useFinishedListeners(
    mixer,
    resolveCurrentAnimation,
    emoteAnimations
  );

  const { runAnimationSequence, cancelSequence, isSequenceRunning } = useSequenceRunner(
    actions,
    mixer,
    fadeToAction,
    restoreToIdle,
    createFinishedListener
  );

  const playEmote = useCallback(
    async (animationName: AnimationKeyType, customCallback?: () => void): Promise<void> => {
      if (!actions || !mixer) {
        const error = `Cannot play emote "${animationName}"`;
        logError(error);
        throw new Error(error);
      }

      try {
        createFinishedListener(customCallback);
        await fadeToAction(animationName, ANIMATION_CONFIG[animationName]?.duration || 0.2);
        logInfo(`Emote "${animationName}" completed`);

        // Restore to idle after emote completes
        await restoreToIdle();
      } catch (error) {
        logError(`Failed to play emote "${animationName}"`, error);
        throw error;
      }
    },
    [actions, mixer, fadeToAction, createFinishedListener, restoreToIdle]
  );

  const stopAllAnimations = useCallback(() => {
    if (actions) {
      cancelCurrentAnimation();
      cancelSequence();
      Object.values(actions).forEach((a) => a?.stop());
      cleanupFinishedListeners();
      logInfo("All animations stopped");
    }
  }, [actions, cleanupFinishedListeners, cancelCurrentAnimation, cancelSequence]);

  const pauseAnimations = useCallback(() => {
    if (actions) {
      Object.values(actions).forEach((a) => a && (a.paused = true));
      logInfo("All animations paused");
    }
  }, [actions]);

  const resumeAnimations = useCallback(() => {
    if (actions) {
      Object.values(actions).forEach((a) => a && (a.paused = false));
      logInfo("All animations resumed");
    }
  }, [actions]);

  useEffect(() => {
    if (!actions || !mixer) return;

    try {
      Object.entries(actions).forEach(([name, action]) => {
        if (!action) return;
        const config = ANIMATION_CONFIG[name as AnimationKeyType];
        if (config?.type === "emote") {
          action.clampWhenFinished = true;
          action.loop = THREE.LoopOnce;
        }
      });
    } catch (error) {
      logError("Failed to initialize animations", error);
    }

    return () => {
      cancelCurrentAnimation();
      cancelSequence();
      cleanupFinishedListeners();
      Object.values(actions).forEach((a) => a?.stop());
    };
  }, [actions, mixer, cleanupFinishedListeners, cancelCurrentAnimation, cancelSequence]);

  return {
    runAnimationSequence,
    playEmote,
    isAnimating,
    getCurrentAction,
    stopAllAnimations,
    pauseAnimations,
    resumeAnimations,
    cancelSequence,
    isSequenceRunning,
  };
};
