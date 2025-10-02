import { ANIMATIONS } from "./constants";

export type PersonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  defaultVisibile?: boolean;
};

type ControlCallBackType = () => void;

export type PersonControls = {
  wave: (callback?: ControlCallBackType) => Promise<void>;
  scared: (callback?: ControlCallBackType) => Promise<void>;
  victory: (callback?: ControlCallBackType) => Promise<void>;
  defeated: (callback?: ControlCallBackType) => Promise<void>;
  sitDown: (callback?: ControlCallBackType) => Promise<void>;
  dance: (callback?: ControlCallBackType) => Promise<void>;
  talking: (callback?: ControlCallBackType) => Promise<void>;
  thumbsUp: (callback?: ControlCallBackType) => Promise<void>;
  fallImpact: (callback?: ControlCallBackType) => Promise<void>;
  showBackground: (callback?: ControlCallBackType) => Promise<void>;
  climbToTop: (callback?: ControlCallBackType) => Promise<void>;
  standUp: (callback?: ControlCallBackType) => Promise<void>;
  test: (callback?: ControlCallBackType) => Promise<void>;
  hide: () => void;
  show: () => void;
  initPerson: () => Promise<void>;
  initFallScenario: () => Promise<void>;
  runAnimationSequence: (sequence: SequenceStep[], sequenceName?: string) => void;
  setTimeScale: (scale: number) => void;
  getCurrentAction: () => string | null;
  isAnimating: () => boolean;
  stopAllAnimations: () => void;
  pauseAnimations: () => void;
  resumeAnimations: () => void;
};

export type AnimationKeyType = (typeof ANIMATIONS)[keyof typeof ANIMATIONS];

export type AnimationStep = {
  type: "animation";
  animation: AnimationKeyType;
  duration?: number;
  runBefore?: () => void | Promise<void>;
};

export type FunctionStep = {
  type: "function";
  fn: () => void | Promise<void>;
  name?: string;
};

export type DelayStep = {
  type: "delay";
  duration: number;
  name?: string;
};

export type SequenceStep = AnimationStep | FunctionStep | DelayStep;
