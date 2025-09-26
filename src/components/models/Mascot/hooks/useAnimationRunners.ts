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
  const { fadeToAction, restoreToIdle, isAnimating, getCurrentAction } = useFadeAction(actions);
  const { createFinishedListener, cleanupFinishedListeners } = useFinishedListeners(mixer, restoreToIdle, emoteAnimations);
  const { runAnimationSequence } = useSequenceRunner(actions, mixer, fadeToAction, restoreToIdle);

  const playEmote = useCallback(
    (animationName: AnimationKeyType, customCallback?: () => void) => {
      if (!actions || !mixer) {
        logError(`Cannot play emote "${animationName}"`);
        return;
      }
      const success = fadeToAction(animationName, ANIMATION_CONFIG[animationName]?.duration || 0.2);
      if (success) createFinishedListener(customCallback);
    },
    [actions, mixer, fadeToAction, createFinishedListener]
  );

  const stopAllAnimations = useCallback(() => {
    if (actions) {
      Object.values(actions).forEach((a) => a?.stop());
      cleanupFinishedListeners();
      logInfo("All animations stopped");
    }
  }, [actions, cleanupFinishedListeners]);

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
      cleanupFinishedListeners();
      Object.values(actions).forEach((a) => a?.stop());
    };
  }, [actions, mixer, cleanupFinishedListeners]);

  return {
    runAnimationSequence,
    playEmote,
    isAnimating,
    getCurrentAction,
    stopAllAnimations,
    pauseAnimations,
    resumeAnimations,
  };
};
