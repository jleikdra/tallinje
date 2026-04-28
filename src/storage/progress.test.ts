import { describe, it, expect, beforeEach } from "vitest";
import {
  awardStar,
  recordError,
  recordHintUsed,
  advanceMission,
  switchPack,
  countErrors,
  defaultProgressState,
} from "../game/simulation/state";

describe("defaultProgressState", () => {
  it("starts with pack1 as currentPackId", () => {
    const s = defaultProgressState();
    expect(s.currentPackId).toBe("pack1");
    expect(s.currentMissionIndex).toBe(0);
  });

  it("has all 4 packs with 0 stars", () => {
    const s = defaultProgressState();
    expect(s.packs.pack1.stars).toBe(0);
    expect(s.packs.pack4.stars).toBe(0);
  });
});

describe("awardStar", () => {
  it("increments stars for current pack", () => {
    let s = defaultProgressState();
    s = awardStar(s, "mission-1");
    expect(s.packs.pack1.stars).toBe(1);
  });

  it("clears the mission from usedHints and recentErrors", () => {
    let s = defaultProgressState();
    s = recordError(s, "m1");
    s = recordHintUsed(s, "m1");
    s = awardStar(s, "m1");
    expect(s.recentErrors).not.toContain("m1");
    expect(s.usedHints).not.toContain("m1");
  });
});

describe("recordError", () => {
  it("adds mission id to recentErrors", () => {
    let s = defaultProgressState();
    s = recordError(s, "m1");
    expect(s.recentErrors).toContain("m1");
  });

  it("keeps at most 10 recent errors", () => {
    let s = defaultProgressState();
    for (let i = 0; i < 15; i++) {
      s = recordError(s, `m${i}`);
    }
    expect(s.recentErrors.length).toBeLessThanOrEqual(10);
  });
});

describe("recordHintUsed", () => {
  it("adds mission id to usedHints", () => {
    let s = defaultProgressState();
    s = recordHintUsed(s, "m1");
    expect(s.usedHints).toContain("m1");
  });

  it("does not duplicate entries", () => {
    let s = defaultProgressState();
    s = recordHintUsed(s, "m1");
    s = recordHintUsed(s, "m1");
    expect(s.usedHints.filter((h) => h === "m1").length).toBe(1);
  });
});

describe("advanceMission", () => {
  it("increments missionIndex", () => {
    let s = defaultProgressState();
    s = advanceMission(s, 5);
    expect(s.currentMissionIndex).toBe(1);
  });

  it("wraps to 0 and marks pack completed when reaching the end", () => {
    let s = defaultProgressState();
    s = { ...s, currentMissionIndex: 4 };
    s = advanceMission(s, 5);
    expect(s.currentMissionIndex).toBe(0);
    expect(s.packs.pack1.completed).toBe(true);
  });
});

describe("switchPack", () => {
  it("changes currentPackId and resets index", () => {
    let s = defaultProgressState();
    s = advanceMission(s, 5);
    s = switchPack(s, "pack2");
    expect(s.currentPackId).toBe("pack2");
    expect(s.currentMissionIndex).toBe(0);
  });
});

describe("countErrors", () => {
  let s = defaultProgressState();
  beforeEach(() => {
    s = defaultProgressState();
  });

  it("returns 0 when no errors recorded", () => {
    expect(countErrors(s, "m1")).toBe(0);
  });

  it("counts repeated errors for same mission", () => {
    s = recordError(s, "m1");
    s = recordError(s, "m1");
    expect(countErrors(s, "m1")).toBe(2);
  });
});
