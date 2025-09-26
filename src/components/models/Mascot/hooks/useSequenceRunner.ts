import { useCallback } from "react";
import * as THREE from "three";
import { ANIMATION_CONFIG } from "../constants";
import { SequenceStep, AnimationKeyType } from "../types";
import { logError, logInfo } from "../helpers";

export const useSequenceRunner = (
  actions: { [x: string]: THREE.AnimationAction | null },
  mixer: THREE.AnimationMixer | null,
  fadeToAction: (name: AnimationKeyType, duration?: number) => boolean,
  restoreToIdle: () => void
) => {
  const runAnimationSequence = useCallback(
    (sequence: SequenceStep[], sequenceName = "Animation Sequence") => {
      if (!sequence?.length) {
        logError(`Cannot run ${sequenceName}: sequence is empty`);
        return;
      }
      logInfo(`Starting ${sequenceName}`, { steps: sequence.length });

      const executeStep = (i: number) => {
        if (i >= sequence.length) {
          logInfo(`${sequenceName} completed - returning to idle`);
          restoreToIdle();
          return;
        }

        const step = sequence[i];
        const stepNumber = i + 1;

        try {
          if (step.type === "animation") {
            if (!actions || !mixer) {
              logError(`Cannot execute animation step in ${sequenceName}`);
              return;
            }

            const { animation, duration } = step;
            const stepDuration = duration ?? ANIMATION_CONFIG[animation]?.duration ?? 0.2;

            logInfo(`${sequenceName} - Step ${stepNumber}: Animation ${animation}`, { duration: stepDuration });

            if (!fadeToAction(animation, stepDuration)) {
              logError(`${sequenceName} failed at step ${stepNumber}: ${animation}`);
              restoreToIdle();
              return;
            }

            const stepListener = (e: { action?: THREE.AnimationAction }) => {
              if (!e?.action || e.action.getClip().name !== animation) return;
              mixer.removeEventListener("finished", stepListener);
              logInfo(`${sequenceName} - Step ${stepNumber} completed: ${animation}`);
              executeStep(i + 1);
            };
            if (step.runBefore) step.runBefore();
            mixer.addEventListener("finished", stepListener);
          }

          if (step.type === "function") {
            const result = step.fn();
            if (result instanceof Promise) {
              result
                .then(() => executeStep(i + 1))
                .catch((e) => {
                  logError(`${sequenceName} failed at step ${stepNumber}`, e);
                  restoreToIdle();
                });
            } else {
              executeStep(i + 1);
            }
          }

          if (step.type === "delay") {
            setTimeout(() => executeStep(i + 1), step.duration);
          }
        } catch (e) {
          logError(`${sequenceName} - Step ${stepNumber} failed`, e);
          restoreToIdle();
        }
      };

      executeStep(0);
    },
    [actions, mixer, fadeToAction, restoreToIdle]
  );

  return { runAnimationSequence };
};
