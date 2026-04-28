export type GameAction =
  | { type: "TICK_SELECTED"; tick: number }
  | { type: "CHOICE_SELECTED"; value: number }
  | { type: "BUILD_SUBMITTED"; start: number; end: number; step: number }
  | { type: "NEXT_MISSION" }
  | { type: "OPEN_PACK"; packId: string };
