import { NumberLineConfig, BuildLineInput } from "../types";

export function generateTicks(config: NumberLineConfig): number[] {
  const ticks: number[] = [];
  const { start, end, step } = config;
  if (step <= 0 || start > end) return ticks;
  let current = start;
  while (current <= end + 0.0001) {
    ticks.push(Math.round(current));
    current += step;
  }
  return ticks;
}

export function isValidNumberLine(config: NumberLineConfig): boolean {
  const { start, end, step } = config;
  if (step <= 0) return false;
  if (start >= end) return false;
  const tickCount = Math.round((end - start) / step);
  const reconstructedEnd = start + tickCount * step;
  return Math.abs(reconstructedEnd - end) < 0.0001;
}

export function validateBuildLineInput(
  input: BuildLineInput,
  expected: NumberLineConfig
): { valid: boolean; feedback: string } {
  if (input.start !== expected.start) {
    return {
      valid: false,
      feedback: `Tallinja skal starte pa ${expected.start}, ikke ${input.start}.`,
    };
  }
  if (input.end !== expected.end) {
    return {
      valid: false,
      feedback: `Tallinja skal slutte pa ${expected.end}, ikke ${input.end}.`,
    };
  }
  if (input.step !== expected.step) {
    return {
      valid: false,
      feedback: `Hoppene skal vaere ${expected.step} om gangen, ikke ${input.step}.`,
    };
  }
  if (!isValidNumberLine({ ...expected, start: input.start, end: input.end, step: input.step })) {
    return {
      valid: false,
      feedback: `Na ble hoppene ulike. Proev igjen sa hvert hopp blir like stort.`,
    };
  }
  return { valid: true, feedback: "Riktig! Tallinja ser bra ut." };
}

export function predictJump(start: number, step: number): number {
  return start + step;
}

export function findMissingTicks(ticks: number[], step: number): number[] {
  const missing: number[] = [];
  for (let i = 1; i < ticks.length; i++) {
    const expected = ticks[i - 1] + step;
    if (Math.abs(ticks[i] - expected) > 0.0001) {
      missing.push(expected);
    }
  }
  return missing;
}

export function hasEvenSpacing(ticks: number[]): boolean {
  if (ticks.length < 2) return true;
  const step = ticks[1] - ticks[0];
  for (let i = 2; i < ticks.length; i++) {
    const diff = ticks[i] - ticks[i - 1];
    if (Math.abs(diff - step) > 0.0001) return false;
  }
  return true;
}
