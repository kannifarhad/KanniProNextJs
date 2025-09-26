import { RefObject } from "react";
import { ANIMATION_CONFIG, ANIMATIONS } from "./constants";
import { MascotGroupRef } from "./MascotGroup";
import { AnimationKeyType, SequenceStep } from "./types";

// Memoized animation lists
export const getAnimationsList = () => {
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
};

// Enhanced error handling and logging
export const logError = (message: string, error?: unknown) => {
  console.error(`[PersonModel] ${message}`, error);
};

export const logInfo = (message: string, data?: unknown) => {
  console.log(`[PersonModel] ${message}`, data);
};

export const generateInitPersonScenario = (mascotRef: RefObject<MascotGroupRef>): SequenceStep[] => {
  return [
    {
      type: "function",
      fn: () => {
        mascotRef.current?.hide();
        mascotRef.current?.open({ hide: "above" });
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
      runBefore: () => mascotRef.current?.show(),
      duration: 0,
    },
    {
      type: "function",
      fn: () => {
        mascotRef.current?.show();
      },
      name: "Show mascot",
    },
    {
      type: "function",
      fn: () => {
        mascotRef.current?.close();
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
};

export const generateFallScenario = (mascotRef: RefObject<MascotGroupRef>): SequenceStep[] => {
  return [
    {
      type: "function",
      fn: () => {
        mascotRef.current?.hide();
        mascotRef.current?.open({ position: [0, 5.1, 0], size: 10, rotation: [Math.PI / 2.3, 0, 0], hide: "above" });
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
        mascotRef.current?.show();
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
        mascotRef.current?.close();
      },
      name: "Close portal",
    },
    {
      type: "animation",
      animation: ANIMATIONS.StandUp,
      duration: 0.2,
    },
  ];
};
