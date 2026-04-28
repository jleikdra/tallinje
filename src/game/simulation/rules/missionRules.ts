import { Mission, MissionResult, BuildLineInput } from "../types";
import { validateBuildLineInput, hasEvenSpacing } from "./numberLineRules";

export function evaluateMission(mission: Mission, answer: number | BuildLineInput): MissionResult {
  switch (mission.type) {
    case "move_hare":
    case "predict_jump":
    case "fill_missing":
      return evaluateNumberAnswer(mission, answer as number);
    case "build_line":
      return evaluateBuildLine(mission, answer as BuildLineInput);
    case "spot_error":
      return evaluateSpotError(mission, answer as number);
    default:
      return { correct: false, explanation: "Ukjent oppdragstype." };
  }
}

function evaluateNumberAnswer(mission: Mission, answer: number): MissionResult {
  if (answer === mission.target) {
    const { step } = mission.numberLine;
    const hareStart = mission.numberLine.highlightTicks[0] ?? mission.numberLine.start;
    const explanation = buildPositiveExplanation(mission.type, answer, hareStart, step);
    return { correct: true, explanation };
  }
  return {
    correct: false,
    explanation: mission.hint,
  };
}

function buildPositiveExplanation(
  type: string,
  answer: number,
  start: number,
  step: number
): string {
  if (type === "predict_jump") {
    return `Bra! Haren landet pa ${answer} fordi vi hopper ${step} om gangen fra ${start}.`;
  }
  if (type === "fill_missing") {
    return `Riktig! ${answer} passer her fordi hoppene er ${step} om gangen.`;
  }
  return `Bra! Haren er pa ${answer}.`;
}

function evaluateBuildLine(mission: Mission, input: BuildLineInput): MissionResult {
  const result = validateBuildLineInput(input, mission.numberLine);
  return { correct: result.valid, explanation: result.feedback };
}

function evaluateSpotError(mission: Mission, answerIndex: number): MissionResult {
  if (answerIndex === mission.target) {
    return {
      correct: true,
      explanation: `Riktig! Tallet pa plass ${answerIndex + 1} passer ikke. Hoppene skal vaere like store.`,
    };
  }
  const errorTicks = mission.errorTicks ?? [];
  if (errorTicks.length > 0) {
    return {
      correct: false,
      explanation: `Ikke heilt. Se noyere pa hvert hopp mellom tallene. Er alle hoppene like store?`,
    };
  }
  return { correct: false, explanation: mission.hint };
}

export function shouldShowHint(errorCount: number): boolean {
  return errorCount >= 2;
}

export function getSimplifiedChoices(original: number[], target: number): number[] {
  if (original.includes(target)) return [...original].sort((a, b) => a - b);
  const simplified = [target];
  for (const c of original) {
    if (c !== target && simplified.length < 3) simplified.push(c);
  }
  return simplified.sort((a, b) => a - b);
}

export function hasEvenSpacingWrapper(ticks: number[]): boolean {
  return hasEvenSpacing(ticks);
}
