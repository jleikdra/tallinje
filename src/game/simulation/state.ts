import { ProgressState, PackProgress } from "./types";

export const PROGRESS_STORAGE_KEY = "tallinje_progress_v1";
export const PROGRESS_VERSION = 1;

export function defaultProgressState(): ProgressState {
  return {
    version: PROGRESS_VERSION,
    currentPackId: "pack1",
    currentMissionIndex: 0,
    packs: {
      pack1: { id: "pack1", stars: 0, completed: false },
      pack2: { id: "pack2", stars: 0, completed: false },
      pack3: { id: "pack3", stars: 0, completed: false },
      pack4: { id: "pack4", stars: 0, completed: false },
    },
    recentErrors: [],
    usedHints: [],
  };
}

export function getPackProgress(state: ProgressState, packId: string): PackProgress {
  return state.packs[packId] ?? { id: packId, stars: 0, completed: false };
}

export function awardStar(state: ProgressState, missionId: string): ProgressState {
  const pack = state.packs[state.currentPackId];
  if (!pack) return state;
  const newPack = { ...pack, stars: pack.stars + 1 };
  return {
    ...state,
    usedHints: state.usedHints.filter((h) => h !== missionId),
    recentErrors: state.recentErrors.filter((e) => e !== missionId),
    packs: { ...state.packs, [state.currentPackId]: newPack },
  };
}

export function recordError(state: ProgressState, missionId: string): ProgressState {
  const errors = [...state.recentErrors, missionId];
  return { ...state, recentErrors: errors.slice(-10) };
}

export function recordHintUsed(state: ProgressState, missionId: string): ProgressState {
  if (state.usedHints.includes(missionId)) return state;
  return { ...state, usedHints: [...state.usedHints, missionId] };
}

export function advanceMission(state: ProgressState, packMissionCount: number): ProgressState {
  const next = state.currentMissionIndex + 1;
  if (next >= packMissionCount) {
    const pack = state.packs[state.currentPackId];
    const updatedPack = pack ? { ...pack, completed: true } : pack;
    return {
      ...state,
      currentMissionIndex: 0,
      packs: { ...state.packs, [state.currentPackId]: updatedPack },
    };
  }
  return { ...state, currentMissionIndex: next };
}

export function switchPack(state: ProgressState, packId: string): ProgressState {
  return { ...state, currentPackId: packId, currentMissionIndex: 0 };
}

export function countErrors(state: ProgressState, missionId: string): number {
  return state.recentErrors.filter((e) => e === missionId).length;
}
