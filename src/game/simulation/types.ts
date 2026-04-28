export interface NumberLineConfig {
  start: number;
  end: number;
  step: number;
  showLabels: boolean;
  highlightTicks: number[];
}

export type MissionType =
  | "move_hare"
  | "predict_jump"
  | "fill_missing"
  | "build_line"
  | "spot_error";

export interface Mission {
  id: string;
  type: MissionType;
  promptText: string;
  promptAudioKey: string;
  numberLine: NumberLineConfig;
  target: number | null;
  choices: number[];
  errorTicks?: number[];
  hint: string;
  reward: { stars: number };
}

export interface BuildLineInput {
  start: number;
  end: number;
  step: number;
}

export interface MissionResult {
  correct: boolean;
  explanation: string;
}

export interface PackProgress {
  id: string;
  stars: number;
  completed: boolean;
}

export interface ProgressState {
  version: number;
  currentPackId: string;
  currentMissionIndex: number;
  packs: Record<string, PackProgress>;
  recentErrors: string[];
  usedHints: string[];
}
