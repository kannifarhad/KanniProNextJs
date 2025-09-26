/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as THREE from "three";
import React, { useEffect, useImperativeHandle, forwardRef, useRef, memo, useCallback, useMemo } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { PortalWithMascot as MascotGroup, PortalRef as MascotGroupRef } from "./MascotGroup";
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

type AnimationStep = {
  type: "animation";
  animation: AnimationKeyType;
  duration?: number;
  runBefore?: () => void | Promise<void>;
};

type FunctionStep = {
  type: "function";
  fn: () => void | Promise<void>;
  name?: string;
};

type DelayStep = {
  type: "delay";
  duration: number;
  name?: string;
};

type SequenceStep = AnimationStep | FunctionStep | DelayStep;

export type PersonControls = {
  runWave: () => void;
  sitDown: () => void;
  dance: () => void;
  thumbsUp: () => void;
  fallImpact: () => void;
  showBackground: () => void;
  climbToTop: () => void;
  standUp: () => void;
  falling: () => void;
  hide: () => void;
  show: () => void;
  initPerson: () => void;
  initFallScenario: () => void;
  runAnimationSequence: (sequence: SequenceStep[], sequenceName?: string) => void;
  fadeToAction: (name: AnimationKeyType, duration?: number) => void;
  setTimeScale: (scale: number) => void;
  getCurrentAction: () => string | null;
  getAvailableActions: () => string[];
  isAnimating: () => boolean;
  stopAllAnimations: () => void;
  pauseAnimations: () => void;
  resumeAnimations: () => void;
};

// Animation configuration with metadata
const ANIMATION_CONFIG = {
  [ANIMATIONS.IdleHappy]: { type: "state", loop: true, duration: 0.5 },
  [ANIMATIONS.Wave]: { type: "emote", loop: false, duration: 0.2 },
  [ANIMATIONS.IdleSit]: { type: "emote", loop: false, duration: 0.5 },
  [ANIMATIONS.Dance]: { type: "emote", loop: false, duration: 0.7 },
  [ANIMATIONS.ShowBackground]: { type: "emote", loop: false, duration: 0.2 },
  [ANIMATIONS.ClimbToTop]: { type: "emote", loop: false, duration: 0.2 },
  [ANIMATIONS.Falling]: { type: "emote", loop: false, duration: 0.2 },
  [ANIMATIONS.FallImpact]: { type: "emote", loop: false, duration: 0.2 },
  [ANIMATIONS.StandUp]: { type: "emote", loop: false, duration: 0.3 },
  [ANIMATIONS.ThumbsUp]: { type: "emote", loop: false, duration: 0.2 },
} as const;

const DEFAULT_IDLE = ANIMATIONS.IdleHappy;
const GLTF_PATH = "./models/mascot1.glb";
const DEFAULT_FADE_DURATION = 0.5;

// Preload the model
useGLTF.preload(GLTF_PATH);

const PersonModel = forwardRef<PersonControls, PersonProps>((props, ref) => {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF(GLTF_PATH);
  const { actions, mixer } = useAnimations(gltf.animations, group);

  // Animation state management
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  const macotRef = useRef<MascotGroupRef>(null);
  const previousActionRef = useRef<THREE.AnimationAction | null>(null);
  const currentStateRef = useRef<AnimationKeyType>(DEFAULT_IDLE);
  const isAnimatingRef = useRef<boolean>(false);
  const finishedListenersRef = useRef<Set<(e: any) => void>>(new Set());

  // Memoized animation lists
  const { emoteAnimations, stateAnimations } = useMemo(() => {
    const emotes: AnimationKeyType[] = [];
    const states: AnimationKeyType[] = [];

    Object.entries(ANIMATION_CONFIG).forEach(([name, config]) => {
      if (config.type === "emote") {
        emotes.push(name as AnimationKeyType);
      } else {
        states.push(name as AnimationKeyType);
      }
    });

    return { emoteAnimations: emotes, stateAnimations: states };
  }, []);

  // Enhanced error handling and logging
  const logError = useCallback((message: string, error?: any) => {
    console.error(`[PersonModel] ${message}`, error);
  }, []);

  const logInfo = useCallback((message: string, data?: any) => {
    console.log(`[PersonModel] ${message}`, data);
  }, []);

  // Clean up event listeners
  const cleanupFinishedListeners = useCallback(() => {
    if (mixer && finishedListenersRef.current.size > 0) {
      finishedListenersRef.current.forEach((listener) => {
        mixer.removeEventListener("finished", listener);
      });
      finishedListenersRef.current.clear();
    }
  }, [mixer]);

  // Enhanced fade to action with better error handling
  const fadeToAction = useCallback(
    (name: AnimationKeyType, duration: number = DEFAULT_FADE_DURATION) => {
      if (!actions || !actions[name]) {
        logError(`Animation "${name}" not found in available actions`);
        return false;
      }

      try {
        const newAction = actions[name];
        const oldAction = activeActionRef.current;
        const config = ANIMATION_CONFIG[name];

        logInfo(`Fading to animation: ${name}`, { duration, config });

        // Clean crossfade if there's an active action
        if (oldAction && oldAction !== newAction && oldAction.enabled) {
          oldAction.crossFadeTo(newAction, duration, false);
        }

        // Configure new action
        newAction.reset();
        newAction.enabled = true;
        newAction.setEffectiveTimeScale(1);
        newAction.setEffectiveWeight(1);

        // Set loop mode based on configuration
        if (config.type === "emote") {
          newAction.clampWhenFinished = true;
          newAction.loop = THREE.LoopOnce;
        } else {
          newAction.loop = THREE.LoopRepeat;
        }

        newAction.play();

        // Update references
        previousActionRef.current = oldAction;
        activeActionRef.current = newAction;
        isAnimatingRef.current = true;

        // Update current state if it's a state animation
        if (stateAnimations.includes(name)) {
          currentStateRef.current = name;
        }

        return true;
      } catch (error) {
        logError(`Failed to fade to animation "${name}"`, error);
        return false;
      }
    },
    [actions, stateAnimations, logError, logInfo]
  );

  // Restore to default idle state
  const restoreToIdle = useCallback(() => {
    if (!mixer || !actions) return;

    logInfo("Restoring to idle state");
    isAnimatingRef.current = false;
    currentStateRef.current = DEFAULT_IDLE;
    fadeToAction(DEFAULT_IDLE, 0.2);
  }, [mixer, actions, fadeToAction, logInfo]);

  // Create a finished event listener with cleanup
  const createFinishedListener = useCallback(
    (customCallback?: () => void) => {
      const listener = (e: { action?: THREE.AnimationAction }) => {
        if (!e?.action) return;

        logInfo("Animation finished", { actionName: e.action.getClip().name });

        // Execute custom callback if provided
        customCallback?.();

        // Clean up this listener
        if (mixer) {
          mixer.removeEventListener("finished", listener);
          finishedListenersRef.current.delete(listener);
        }

        // Restore to idle if it was an emote
        const actionName = e.action.getClip().name as AnimationKeyType;
        if (emoteAnimations.includes(actionName)) {
          restoreToIdle();
        }
      };

      // Add to mixer and track for cleanup
      if (mixer) {
        mixer.addEventListener("finished", listener);
        finishedListenersRef.current.add(listener);
      }

      return listener;
    },
    [mixer, emoteAnimations, restoreToIdle, logInfo]
  );

  // Reusable animation sequence runner
  const runAnimationSequence = useCallback(
    (sequence: SequenceStep[], sequenceName: string = "Animation Sequence") => {
      if (!sequence || sequence.length === 0) {
        logError(`Cannot run ${sequenceName}: sequence is empty`);
        return;
      }

      logInfo(`Starting ${sequenceName}`, { steps: sequence.length });

      const executeStep = (stepIndex: number) => {
        if (stepIndex >= sequence.length) {
          logInfo(`${sequenceName} completed - returning to idle`);
          restoreToIdle();
          return;
        }

        const step = sequence[stepIndex];
        const stepNumber = stepIndex + 1;
        const totalSteps = sequence.length;

        try {
          if (step.type === "animation") {
            // Handle animation steps
            if (!actions || !mixer) {
              logError(`Cannot execute animation step in ${sequenceName}: actions or mixer not available`);
              return;
            }

            const { animation, duration } = step;
            const stepDuration = duration ?? ANIMATION_CONFIG[animation]?.duration ?? 0.2;

            logInfo(`${sequenceName} - Step ${stepNumber}/${totalSteps}: Animation ${animation}`, {
              duration: stepDuration,
            });

            const success = fadeToAction(animation, stepDuration);
            if (!success) {
              logError(`${sequenceName} failed at step ${stepNumber}: ${animation}`);
              restoreToIdle();
              return;
            }

            const stepListener = (e: { action?: THREE.AnimationAction }) => {
              if (!e?.action || e.action.getClip().name !== animation) return;

              // Clean up current listener
              mixer.removeEventListener("finished", stepListener);
              finishedListenersRef.current.delete(stepListener);

              logInfo(`${sequenceName} - Step ${stepNumber} completed: ${animation}`);

              // Execute next step
              executeStep(stepIndex + 1);
            };
            if (step.runBefore) {
              step.runBefore();
            }
            mixer.addEventListener("finished", stepListener);
            finishedListenersRef.current.add(stepListener);
          } else if (step.type === "function") {
            // Handle function steps (sync or async)
            const stepName = step.name || "Function";
            logInfo(`${sequenceName} - Step ${stepNumber}/${totalSteps}: ${stepName}`);

            try {
              const result = step.fn();

              if (result instanceof Promise) {
                // Async function - wait for it to complete
                result
                  .then(() => {
                    logInfo(`${sequenceName} - Step ${stepNumber} completed: ${stepName} (async)`);
                    executeStep(stepIndex + 1);
                  })
                  .catch((error) => {
                    logError(`${sequenceName} - Step ${stepNumber} failed: ${stepName} (async)`, error);
                    restoreToIdle();
                  });
              } else {
                // Sync function - continue immediately
                logInfo(`${sequenceName} - Step ${stepNumber} completed: ${stepName} (sync)`);
                executeStep(stepIndex + 1);
              }
            } catch (error) {
              logError(`${sequenceName} - Step ${stepNumber} failed: ${stepName}`, error);
              restoreToIdle();
              return;
            }
          } else if (step.type === "delay") {
            // Handle delay steps
            const stepName = step.name || `Delay ${step.duration}ms`;
            logInfo(`${sequenceName} - Step ${stepNumber}/${totalSteps}: ${stepName}`);

            setTimeout(() => {
              logInfo(`${sequenceName} - Step ${stepNumber} completed: ${stepName}`);
              executeStep(stepIndex + 1);
            }, step.duration);
          } else {
            logError(`${sequenceName} - Step ${stepNumber}: Unknown step type`, step);
            executeStep(stepIndex + 1); // Skip unknown steps
          }
        } catch (error) {
          logError(`${sequenceName} - Step ${stepNumber} failed`, error);
          restoreToIdle();
        }
      };

      // Start the sequence
      executeStep(0);
    },
    [actions, mixer, fadeToAction, restoreToIdle, logError, logInfo]
  );

  // Simplified sequence definitions using the enhanced reusable function
  const initPerson = useCallback(() => {
    const sequence: SequenceStep[] = [
      {
        type: "function",
        fn: () => {
          macotRef.current?.hide();
          macotRef.current?.open({ hide: "above" });
        },
        name: "Hide mascot and open portal",
      },
      {
        type: "delay",
        duration: 500,
        name: "Initial delay",
      },
      {
        type: "animation",
        animation: ANIMATIONS.ClimbToTop,
        runBefore: () => macotRef.current?.show(),
        duration: 0,
      },
      {
        type: "function",
        fn: () => {
          macotRef.current?.show();
        },
        name: "Show mascot",
      },
      {
        type: "function",
        fn: () => {
          macotRef.current?.close();
        },
        name: "Close portal",
      },
      {
        type: "animation",
        animation: ANIMATIONS.Wave,
        duration: 0.2,
      },
      {
        type: "animation",
        animation: ANIMATIONS.ShowBackground,
        duration: 0.2,
      },
    ];
    runAnimationSequence(sequence, "initPerson");
  }, [runAnimationSequence]);

  const initFallScenario = useCallback(() => {
    const sequence: SequenceStep[] = [
      {
        type: "function",
        fn: () => {
          macotRef.current?.hide();
          macotRef.current?.open({ position: [0, 5.1, 0], size: 10, rotation: [Math.PI / 2.3, 0, 0], hide: "above" });
        },
        name: "Hide mascot and open portal with config",
      },
      {
        type: "delay",
        duration: 500,
        name: "Initial delay",
      },
      {
        type: "function",
        fn: () => {
          macotRef.current?.show();
        },
        name: "Show mascot",
      },
      {
        type: "animation",
        animation: ANIMATIONS.FallImpact,
        duration: 0,
      },
      {
        type: "function",
        fn: () => {
          macotRef.current?.close();
        },
        name: "Close portal",
      },
      {
        type: "animation",
        animation: ANIMATIONS.StandUp,
        duration: 0.2,
      },
    ];
    runAnimationSequence(sequence, "initFallScenario");
  }, [runAnimationSequence]);

  // Initialize actions with better error handling
  useEffect(() => {
    if (!actions || !mixer) {
      logError("Actions or mixer not available");
      return;
    }

    try {
      logInfo("Initializing animations", {
        availableActions: Object.keys(actions),
        configuredAnimations: Object.keys(ANIMATION_CONFIG),
      });

      // Configure all actions
      Object.entries(actions).forEach(([name, action]) => {
        if (!action) return;

        const config = ANIMATION_CONFIG[name as AnimationKeyType];
        if (config?.type === "emote") {
          action.clampWhenFinished = true;
          action.loop = THREE.LoopOnce;
        }
      });

      // Start with idle animation
      const initialAction = actions[DEFAULT_IDLE];
      if (initialAction) {
        activeActionRef.current = initialAction;
        currentStateRef.current = DEFAULT_IDLE;
        initialAction.play();
        logInfo("Started with idle animation");
      } else {
        logError(`Default idle animation "${DEFAULT_IDLE}" not found`);
      }
    } catch (error) {
      logError("Failed to initialize animations", error);
    }

    return () => {
      cleanupFinishedListeners();
      Object.values(actions).forEach((action) => action?.stop());
    };
  }, [actions, mixer, cleanupFinishedListeners, logError, logInfo]);

  // Animation control methods
  const playEmote = useCallback(
    (animationName: AnimationKeyType, customCallback?: () => void) => {
      if (!actions || !mixer) {
        logError(`Cannot play emote "${animationName}": actions or mixer not available`);
        return;
      }

      const success = fadeToAction(animationName, ANIMATION_CONFIG[animationName]?.duration || 0.2);
      if (success) {
        createFinishedListener(customCallback);
      }
    },
    [actions, mixer, fadeToAction, createFinishedListener, logError]
  );

  // Utility methods
  const setTimeScale = useCallback(
    (scale: number) => {
      if (mixer) {
        mixer.timeScale = Math.max(0, scale); // Ensure non-negative
        logInfo(`Time scale set to ${scale}`);
      }
    },
    [mixer, logInfo]
  );

  const getCurrentAction = useCallback((): string | null => {
    return currentStateRef.current;
  }, []);

  const getAvailableActions = useCallback((): string[] => {
    return actions ? Object.keys(actions) : [];
  }, [actions]);

  const isAnimating = useCallback((): boolean => {
    return isAnimatingRef.current;
  }, []);

  const stopAllAnimations = useCallback(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action?.stop());
      cleanupFinishedListeners();
      isAnimatingRef.current = false;
      logInfo("All animations stopped");
    }
  }, [actions, cleanupFinishedListeners, logInfo]);

  const pauseAnimations = useCallback(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) action.paused = true;
      });
      logInfo("All animations paused");
    }
  }, [actions, logInfo]);

  const resumeAnimations = useCallback(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) action.paused = false;
      });
      logInfo("All animations resumed");
    }
  }, [actions, logInfo]);

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
      hide: () => macotRef.current?.hide(),
      show: () => macotRef.current?.show(),

      // Animation sequences
      initPerson,
      initFallScenario,
      runAnimationSequence,

      // General controls
      fadeToAction,
      setTimeScale,
      getCurrentAction,
      getAvailableActions,
      isAnimating,
      stopAllAnimations,
      pauseAnimations,
      resumeAnimations,
    }),
    [
      playEmote,
      initPerson,
      initFallScenario,
      runAnimationSequence,
      fadeToAction,
      setTimeScale,
      getCurrentAction,
      getAvailableActions,
      isAnimating,
      stopAllAnimations,
      pauseAnimations,
      resumeAnimations,
    ]
  );

  return (
    <group ref={group} {...props}>
      <MascotGroup ref={macotRef} gltf={gltf} />
    </group>
  );
});

PersonModel.displayName = "PersonModel";
export default memo(PersonModel);
