import { describe, it, expect } from "vitest";
import { evaluateMission, shouldShowHint, getSimplifiedChoices } from "./missionRules";
import { Mission } from "../types";

const moveMission: Mission = {
  id: "test-move",
  type: "move_hare",
  promptText: "Flytt haren til 7.",
  promptAudioKey: "test",
  numberLine: { start: 0, end: 10, step: 1, showLabels: true, highlightTicks: [] },
  target: 7,
  choices: [],
  hint: "Tell til 7.",
  reward: { stars: 1 },
};

const predictMission: Mission = {
  id: "test-predict",
  type: "predict_jump",
  promptText: "Haren hopper 2 fra 10. Hvor lander den?",
  promptAudioKey: "test",
  numberLine: { start: 0, end: 20, step: 2, showLabels: true, highlightTicks: [10] },
  target: 12,
  choices: [11, 12, 14],
  hint: "10 + 2 = ?",
  reward: { stars: 1 },
};

const buildMission: Mission = {
  id: "test-build",
  type: "build_line",
  promptText: "Bygg tallinje 10-30 steg 5.",
  promptAudioKey: "test",
  numberLine: { start: 10, end: 30, step: 5, showLabels: true, highlightTicks: [] },
  target: null,
  choices: [],
  hint: "Start 10, slutt 30, hopp 5.",
  reward: { stars: 1 },
};

const spotMission: Mission = {
  id: "test-spot",
  type: "spot_error",
  promptText: "Finn feilen.",
  promptAudioKey: "test",
  numberLine: { start: 10, end: 18, step: 2, showLabels: true, highlightTicks: [] },
  target: 3,
  choices: [10, 12, 14, 17, 18],
  errorTicks: [17],
  hint: "Se på hvert hopp.",
  reward: { stars: 1 },
};

describe("evaluateMission — move_hare", () => {
  it("returns correct for matching target", () => {
    expect(evaluateMission(moveMission, 7).correct).toBe(true);
  });

  it("returns incorrect for wrong answer", () => {
    expect(evaluateMission(moveMission, 5).correct).toBe(false);
  });

  it("explanation contains the correct number on success", () => {
    const r = evaluateMission(moveMission, 7);
    expect(r.explanation).toContain("7");
  });
});

describe("evaluateMission — predict_jump", () => {
  it("returns correct for target 12", () => {
    expect(evaluateMission(predictMission, 12).correct).toBe(true);
  });

  it("explanation mentions step and start on success", () => {
    const r = evaluateMission(predictMission, 12);
    expect(r.explanation).toContain("2");
    expect(r.explanation).toContain("10");
  });

  it("returns hint on wrong answer", () => {
    const r = evaluateMission(predictMission, 11);
    expect(r.correct).toBe(false);
    expect(r.explanation).toBe(predictMission.hint);
  });
});

describe("evaluateMission — build_line", () => {
  it("accepts correct build input", () => {
    const r = evaluateMission(buildMission, { start: 10, end: 30, step: 5 });
    expect(r.correct).toBe(true);
  });

  it("rejects wrong start", () => {
    const r = evaluateMission(buildMission, { start: 0, end: 30, step: 5 });
    expect(r.correct).toBe(false);
  });

  it("rejects uneven spacing", () => {
    const r = evaluateMission(buildMission, { start: 10, end: 30, step: 3 });
    expect(r.correct).toBe(false);
  });
});

describe("evaluateMission — spot_error", () => {
  it("returns correct when the right error index is chosen", () => {
    const r = evaluateMission(spotMission, 3);
    expect(r.correct).toBe(true);
  });

  it("returns incorrect for wrong index", () => {
    const r = evaluateMission(spotMission, 1);
    expect(r.correct).toBe(false);
  });
});

describe("shouldShowHint", () => {
  it("returns false for 0 or 1 errors", () => {
    expect(shouldShowHint(0)).toBe(false);
    expect(shouldShowHint(1)).toBe(false);
  });

  it("returns true for 2+ errors", () => {
    expect(shouldShowHint(2)).toBe(true);
    expect(shouldShowHint(5)).toBe(true);
  });
});

describe("getSimplifiedChoices", () => {
  it("always includes the target", () => {
    const r = getSimplifiedChoices([1, 3, 5], 7);
    expect(r).toContain(7);
  });

  it("returns sorted results", () => {
    const r = getSimplifiedChoices([5, 3, 1], 3);
    expect(r).toEqual([...r].sort((a, b) => a - b));
  });
});
