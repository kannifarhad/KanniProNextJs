import { useCallback, useRef } from "react";
import * as THREE from "three";
import { logInfo } from "../helpers";
import { AnimationKeyType } from "../types";

export const useFinishedListeners = (
  mixer: THREE.AnimationMixer | null,
  resolveCurrentAnimation: () => void,
  emoteAnimations: AnimationKeyType[]
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finishedListenersRef = useRef<Set<(e: any) => void>>(new Set());

  const createFinishedListener = useCallback(
    (animationName: AnimationKeyType, customCallback?: () => void) => {
      let hasResolved = false; // Prevent double resolution
      
      const listener = (e: { action?: THREE.AnimationAction }) => {
        if (!e?.action || hasResolved) return;
        const actionName = e.action.getClip().name as AnimationKeyType;

        // Only handle the animation this listener was created for
        if (actionName !== animationName) return;

        logInfo("Animation finished", { actionName });

        if (mixer) {
          mixer.removeEventListener("finished", listener);
          finishedListenersRef.current.delete(listener);
        }

        if (emoteAnimations.includes(actionName)) {
          hasResolved = true;
          
          // Resolve the promise first
          resolveCurrentAnimation();
          
          // Then execute custom callback if provided
          customCallback?.();
        }
      };

      if (mixer) {
        mixer.addEventListener("finished", listener);
        finishedListenersRef.current.add(listener);
      }
      return listener;
    },
    [mixer, resolveCurrentAnimation, emoteAnimations]
  );

  const cleanupFinishedListeners = useCallback(() => {
    if (mixer && finishedListenersRef.current.size > 0) {
      finishedListenersRef.current.forEach((listener) => mixer.removeEventListener("finished", listener));
      finishedListenersRef.current.clear();
    }
  }, [mixer]);

  return { createFinishedListener, cleanupFinishedListeners };
};