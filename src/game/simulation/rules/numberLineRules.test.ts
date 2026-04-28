import { describe, it, expect } from "vitest";
import {
  generateTicks,
  isValidNumberLine,
  validateBuildLineInput,
  predictJump,
  findMissingTicks,
  hasEvenSpacing,
} from "./numberLineRules";

describe("generateTicks", () => {
  it("generates correct ticks for 0-10 step 1", () => {
    const ticks = generateTicks({
      start: 0,
      end: 10,
      step: 1,
      showLabels: true,
      highlightTicks: [],
    });
    expect(ticks).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("generates correct ticks for 0-10 step 2", () => {
    const ticks = generateTicks({
      start: 0,
      end: 10,
      step: 2,
      showLabels: true,
      highlightTicks: [],
    });
    expect(ticks).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it("generates correct ticks for 10-30 step 5", () => {
    const ticks = generateTicks({
      start: 10,
      end: 30,
      step: 5,
      showLabels: true,
      highlightTicks: [],
    });
    expect(ticks).toEqual([10, 15, 20, 25, 30]);
  });

  it("returns empty array for invalid step", () => {
    expect(
      generateTicks({ start: 0, end: 10, step: 0, showLabels: true, highlightTicks: [] })
    ).toEqual([]);
    expect(
      generateTicks({ start: 0, end: 10, step: -1, showLabels: true, highlightTicks: [] })
    ).toEqual([]);
  });

  it("returns empty array when start > end", () => {
    expect(
      generateTicks({ start: 10, end: 5, step: 1, showLabels: true, highlightTicks: [] })
    ).toEqual([]);
  });
});

describe("isValidNumberLine", () => {
  it("accepts valid 0-10 step 1", () => {
    expect(
      isValidNumberLine({ start: 0, end: 10, step: 1, showLabels: true, highlightTicks: [] })
    ).toBe(true);
  });

  it("accepts valid 0-10 step 2", () => {
    expect(
      isValidNumberLine({ start: 0, end: 10, step: 2, showLabels: true, highlightTicks: [] })
    ).toBe(true);
  });

  it("accepts valid 10-30 step 5", () => {
    expect(
      isValidNumberLine({ start: 10, end: 30, step: 5, showLabels: true, highlightTicks: [] })
    ).toBe(true);
  });

  it("rejects uneven end — 0 to 9 step 2", () => {
    expect(
      isValidNumberLine({ start: 0, end: 9, step: 2, showLabels: true, highlightTicks: [] })
    ).toBe(false);
  });

  it("rejects step <= 0", () => {
    expect(
      isValidNumberLine({ start: 0, end: 10, step: 0, showLabels: true, highlightTicks: [] })
    ).toBe(false);
  });

  it("rejects start >= end", () => {
    expect(
      isValidNumberLine({ start: 10, end: 10, step: 1, showLabels: true, highlightTicks: [] })
    ).toBe(false);
  });
});

describe("validateBuildLineInput", () => {
  const expected = { start: 10, end: 30, step: 5, showLabels: true, highlightTicks: [] };

  it("accepts correct input", () => {
    const r = validateBuildLineInput({ start: 10, end: 30, step: 5 }, expected);
    expect(r.valid).toBe(true);
  });

  it("rejects wrong start", () => {
    const r = validateBuildLineInput({ start: 0, end: 30, step: 5 }, expected);
    expect(r.valid).toBe(false);
    expect(r.feedback).toContain("10");
  });

  it("rejects wrong end", () => {
    const r = validateBuildLineInput({ start: 10, end: 20, step: 5 }, expected);
    expect(r.valid).toBe(false);
    expect(r.feedback).toContain("30");
  });

  it("rejects wrong step", () => {
    const r = validateBuildLineInput({ start: 10, end: 30, step: 2 }, expected);
    expect(r.valid).toBe(false);
    expect(r.feedback).toContain("5");
  });

  it("rejects uneven spacing despite correct start/end/step claim", () => {
    // 0 to 10 with step 3 — not a valid end
    const r = validateBuildLineInput(
      { start: 0, end: 10, step: 3 },
      { start: 0, end: 10, step: 3, showLabels: true, highlightTicks: [] }
    );
    expect(r.valid).toBe(false);
  });
});

describe("predictJump", () => {
  it("adds step to start", () => {
    expect(predictJump(10, 2)).toBe(12);
    expect(predictJump(0, 5)).toBe(5);
    expect(predictJump(15, 5)).toBe(20);
  });
});

describe("findMissingTicks", () => {
  it("finds gap in 0, 2, 4, 7, 8", () => {
    const missing = findMissingTicks([0, 2, 4, 7, 8], 2);
    expect(missing).toContain(6);
  });

  it("returns empty for even sequence", () => {
    expect(findMissingTicks([0, 2, 4, 6, 8], 2)).toEqual([]);
  });
});

describe("hasEvenSpacing", () => {
  it("accepts evenly spaced ticks", () => {
    expect(hasEvenSpacing([0, 2, 4, 6])).toBe(true);
    expect(hasEvenSpacing([10, 15, 20, 25, 30])).toBe(true);
  });

  it("rejects unevenly spaced ticks", () => {
    expect(hasEvenSpacing([10, 12, 14, 17, 18])).toBe(false);
  });

  it("accepts single tick", () => {
    expect(hasEvenSpacing([5])).toBe(true);
  });
});
