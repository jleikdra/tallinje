import { describe, expect, it } from "vitest";
import { advanceMission, awardStar, countErrors, defaultProgressState, recordError } from "./state";

describe("progress state helpers", () => {
  it("creates the default prototype progress state", () => {
    const state = defaultProgressState();

    expect(state.version).toBe(1);
    expect(state.currentPackId).toBe("pack1");
    expect(state.currentMissionIndex).toBe(0);
    expect(state.packs.pack1.completed).toBe(false);
  });

  it("awards a star and clears mission-specific history", () => {
    const baseState = defaultProgressState();
    const withErrors = recordError(recordError(baseState, "mission-1"), "mission-1");
    const withHintLikeState = {
      ...withErrors,
      usedHints: ["mission-1", "mission-2"],
    };

    const updated = awardStar(withHintLikeState, "mission-1");

    expect(updated.packs.pack1.stars).toBe(1);
    expect(updated.usedHints).toEqual(["mission-2"]);
    expect(updated.recentErrors).toEqual([]);
  });

  it("tracks repeated errors for the same mission", () => {
    const baseState = defaultProgressState();
    const updated = recordError(recordError(baseState, "mission-1"), "mission-1");

    expect(countErrors(updated, "mission-1")).toBe(2);
  });

  it("advances inside a pack until the final mission", () => {
    const state = defaultProgressState();
    const updated = advanceMission(state, 3);

    expect(updated.currentMissionIndex).toBe(1);
    expect(updated.packs.pack1.completed).toBe(false);
  });

  it("marks the pack complete on the final mission", () => {
    const state = {
      ...defaultProgressState(),
      currentMissionIndex: 2,
    };

    const updated = advanceMission(state, 3);

    expect(updated.currentMissionIndex).toBe(0);
    expect(updated.packs.pack1.completed).toBe(true);
  });
});
