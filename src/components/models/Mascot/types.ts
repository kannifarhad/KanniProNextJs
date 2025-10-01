import { ANIMATIONS } from "./constants";

export type PersonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  defaultVisibile?: boolean;
};

type ControlCallBackType = () => void;

export type PersonControls = {
  wave: (callback?: ControlCallBackType) => void;
  scared: (callback?: ControlCallBackType) => void;
  victory: (callback?: ControlCallBackType) => void;
  defeated: (callback?: ControlCallBackType) => void;
  sitDown: (callback?: ControlCallBackType) => void;
  dance: (callback?: ControlCallBackType) => void;
  talking: (callback?: ControlCallBackType) => void;
  thumbsUp: (callback?: ControlCallBackType) => void;
  fallImpact: (callback?: ControlCallBackType) => void;
  showBackground: (callback?: ControlCallBackType) => void;
  climbToTop: (callback?: ControlCallBackType) => void;
  standUp: (callback?: ControlCallBackType) => void;
  test: (callback?: ControlCallBackType) => void;
  hide: () => void;
  show: () => void;
  initPerson: () => void;
  initFallScenario: () => void;
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
