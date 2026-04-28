import { ProgressState } from "../game/simulation/types";
import {
  PROGRESS_STORAGE_KEY,
  PROGRESS_VERSION,
  defaultProgressState,
} from "../game/simulation/state";

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage kan vaere utilgjengelig (privat modus e.l.)
  }
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return defaultProgressState();
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== PROGRESS_VERSION) return defaultProgressState();
    return parsed;
  } catch {
    return defaultProgressState();
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch {
    // ignorer
  }
}
