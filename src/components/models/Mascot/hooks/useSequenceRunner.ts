import { useCallback, useRef } from "react";
import * as THREE from "three";
import { ANIMATION_CONFIG } from "../constants";
import { SequenceStep, AnimationKeyType } from "../types";
import { logError, logInfo } from "../helpers";

export const useSequenceRunner = (
  actions: { [x: string]: THREE.AnimationAction | null },
  mixer: THREE.AnimationMixer | null,
  fadeToAction: (name: AnimationKeyType, duration?: number) => Promise<void>,
  restoreToIdle: () => Promise<void>,
  createFinishedListener: (animationName: AnimationKeyType, customCallback?: () => void) => void,
  cleanupFinishedListeners: () => void
) => {
  const isSequenceRunningRef = useRef(false);
  const sequenceAbortController = useRef<AbortController | null>(null);

  const cancelSequence = useCallback(() => {
    if (sequenceAbortController.current) {
      sequenceAbortController.current.abort();
      sequenceAbortController.current = null;
      isSequenceRunningRef.current = false;
      logInfo("Animation sequence cancelled");
    }
  }, []);

  const runAnimationSequence = useCallback(
    async (sequence: SequenceStep[], sequenceName = "Animation Sequence", fallback?: () => void): Promise<void> => {
      if (!sequence?.length) {
        const error = `Cannot run ${sequenceName}: sequence is empty`;
        logError(error);
        throw new Error(error);
      }

      if (isSequenceRunningRef.current) {
        logInfo("Cancelling previous sequence");
        cancelSequence();
      }

      isSequenceRunningRef.current = true;
      const abortController = new AbortController();
      sequenceAbortController.current = abortController;

      logInfo(`Starting ${sequenceName}`, { steps: sequence.length });

      try {
        for (let i = 0; i < sequence.length; i++) {
          if (abortController.signal.aborted) {
            throw new Error("Sequence aborted");
          }

          const step = sequence[i];
          const stepNumber = i + 1;
          logInfo(`${sequenceName} next step`, step);

          switch (step.type) {
            case "animation": {
              if (!actions || !mixer) {
                throw new Error(`Cannot execute animation step in ${sequenceName}`);
              }

              const { animation, duration } = step;
              const stepDuration = duration ?? ANIMATION_CONFIG[animation]?.duration ?? 0.2;

              logInfo(`${sequenceName} - Step ${stepNumber}: Animation ${animation}`, { duration: stepDuration });

              if (step.runBefore) {
                const result = step.runBefore();
                if (result instanceof Promise) {
                  await result;
                }
              }

              // Cleanup any old listeners before creating new one
              cleanupFinishedListeners();
              
              // Create the finished listener BEFORE calling fadeToAction
              createFinishedListener(animation);
              
              await fadeToAction(animation, stepDuration);

              logInfo(`${sequenceName} - Step ${stepNumber} completed: ${animation}`);
              break;
            }

            case "function": {
              logInfo(`${sequenceName} - Step ${stepNumber}: Function`);
              const result = step.fn();
              if (result instanceof Promise) {
                await result;
              }
              logInfo(`${sequenceName} - Step ${stepNumber} completed: Function`);
              break;
            }

            case "delay": {
              logInfo(`${sequenceName} - Step ${stepNumber}: Delay ${step.duration}ms`);

              await new Promise<void>((resolve, reject) => {
                const timeout = setTimeout(resolve, step.duration);
                const abortHandler = () => {
                  clearTimeout(timeout);
                  reject(new Error("Sequence aborted during delay"));
                };
                abortController.signal.addEventListener("abort", abortHandler, { once: true });
              });

              logInfo(`${sequenceName} - Step ${stepNumber} completed: Delay`);
              break;
            }

            default: {
              const error = `Unknown step type`;
              logError(error);
              throw new Error(error);
            }
          }

          if (abortController.signal.aborted) {
            throw new Error("Sequence aborted");
          }
        }

        logInfo(`${sequenceName} completed - returning to idle`);
        await restoreToIdle();

        isSequenceRunningRef.current = false;
        sequenceAbortController.current = null;
      } catch (error: unknown) {
        // Check if WE were cancelled BEFORE clearing state
        const wasCancelledByNewSequence = sequenceAbortController.current !== abortController;
        const anotherSequenceIsRunning = isSequenceRunningRef.current && wasCancelledByNewSequence;
        
        // Only clear running state if we're still the active sequence
        if (sequenceAbortController.current === abortController) {
          isSequenceRunningRef.current = false;
          sequenceAbortController.current = null;
        }

        if (error instanceof Error && (error.message === "Sequence aborted" || error.message.includes("cancelled"))) {
          logInfo(`${sequenceName} was cancelled`);
          
          // DON'T do anything if another sequence is running
          if (anotherSequenceIsRunning) {
            throw new Error(`${sequenceName} cancelled`);
          }
          
          // Only run cleanup if no other sequence took over
          if (fallback) {
            try {
              fallback();
            } catch (fallbackError) {
              logError("Fallback function failed", fallbackError);
            }
          }
          
          try {
            await restoreToIdle();
          } catch (restoreError) {
            logError("Failed to restore to idle after cancellation", restoreError);
          }
          
          throw new Error(`${sequenceName} cancelled`);
        }

        const normalizedError = error instanceof Error ? error : new Error(String(error));
        logError(`${sequenceName} failed at execution`, normalizedError);

        // Only cleanup if another sequence isn't running
        if (!anotherSequenceIsRunning) {
          try {
            if (fallback) {
              fallback();
            }
            await restoreToIdle();
          } catch (restoreError) {
            logError("Failed to restore to idle after sequence error", restoreError);
          }
        }

        throw normalizedError;
      }
    },
    [actions, mixer, fadeToAction, restoreToIdle, cancelSequence, createFinishedListener, cleanupFinishedListeners]
  );

  return { 
    runAnimationSequence,
    cancelSequence,
    isSequenceRunning: () => isSequenceRunningRef.current,
  };
};