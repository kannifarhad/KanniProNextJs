export type PersonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const ANIMATIONS = {
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

export const ANIMATION_CONFIG = {
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

export const DEFAULT_IDLE = ANIMATIONS.IdleHappy;
export const GLTF_PATH = "./models/mascot1.glb";
export const DEFAULT_FADE_DURATION = 0.5;
