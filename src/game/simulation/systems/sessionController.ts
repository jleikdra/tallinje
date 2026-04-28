import { getMissionByIndex } from "../../content/missions/packMissions";
import { evaluateMission, shouldShowHint } from "../rules/missionRules";
import { advanceMission, awardStar, countErrors, recordError } from "../state";
import { Mission, MissionResult, ProgressState } from "../types";

export type MissionSubmission = {
  state: ProgressState;
  result: MissionResult;
  nextMission?: Mission;
  packCompleted: boolean;
  showHint: boolean;
};

export function submitMissionAnswer(
  state: ProgressState,
  mission: Mission,
  answer: number,
  packMissionCount: number
): MissionSubmission {
  const result = evaluateMission(mission, answer);

  if (!result.correct) {
    const updatedState = recordError(state, mission.id);
    const errorCount = countErrors(updatedState, mission.id);

    return {
      state: updatedState,
      result,
      nextMission: mission,
      packCompleted: false,
      showHint: shouldShowHint(errorCount),
    };
  }

  const rewardedState = awardStar(state, mission.id);
  const advancedState = advanceMission(rewardedState, packMissionCount);
  const packCompleted = advancedState.currentMissionIndex === 0;

  return {
    state: advancedState,
    result,
    nextMission: getMissionByIndex(advancedState.currentPackId, advancedState.currentMissionIndex),
    packCompleted,
    showHint: false,
  };
}
