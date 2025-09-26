import { useCallback, useRef } from "react";
import * as THREE from "three";
import { logInfo } from "../helpers";
import { AnimationKeyType } from "../types";

export const useFinishedListeners = (mixer: THREE.AnimationMixer | null, restoreToIdle: () => void, emoteAnimations: AnimationKeyType[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finishedListenersRef = useRef<Set<(e: any) => void>>(new Set());

  const createFinishedListener = useCallback(
    (customCallback?: () => void) => {
      const listener = (e: { action?: THREE.AnimationAction }) => {
        if (!e?.action) return;
        const actionName = e.action.getClip().name as AnimationKeyType;

        logInfo("Animation finished", { actionName });
        customCallback?.();

        if (mixer) {
          mixer.removeEventListener("finished", listener);
          finishedListenersRef.current.delete(listener);
        }

        if (emoteAnimations.includes(actionName)) {
          restoreToIdle();
        }
      };

      if (mixer) {
        mixer.addEventListener("finished", listener);
        finishedListenersRef.current.add(listener);
      }
      return listener;
    },
    [mixer, restoreToIdle, emoteAnimations]
  );

  const cleanupFinishedListeners = useCallback(() => {
    if (mixer && finishedListenersRef.current.size > 0) {
      finishedListenersRef.current.forEach((listener) => mixer.removeEventListener("finished", listener));
      finishedListenersRef.current.clear();
    }
  }, [mixer]);

  return { createFinishedListener, cleanupFinishedListeners };
};