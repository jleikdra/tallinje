import { Mission } from "../../simulation/types";

const pack1Missions: Mission[] = [
  {
    id: "pack1-move-3",
    type: "move_hare",
    promptText: "Flytt haren til 3.",
    promptAudioKey: "mission-pack1-move-3",
    numberLine: {
      start: 0,
      end: 10,
      step: 1,
      showLabels: true,
      highlightTicks: [3],
    },
    target: 3,
    choices: [1, 3, 5, 7],
    hint: "Se pa tallene fra venstre mot hoyre. Hvor ligger 3?",
    reward: { stars: 1 },
  },
  {
    id: "pack1-move-7",
    type: "move_hare",
    promptText: "Flytt haren til 7.",
    promptAudioKey: "mission-pack1-move-7",
    numberLine: {
      start: 0,
      end: 10,
      step: 1,
      showLabels: true,
      highlightTicks: [7],
    },
    target: 7,
    choices: [4, 6, 7, 9],
    hint: "Tell rolig bortover tallinja til du finner 7.",
    reward: { stars: 1 },
  },
  {
    id: "pack1-move-10",
    type: "move_hare",
    promptText: "Flytt haren helt til 10.",
    promptAudioKey: "mission-pack1-move-10",
    numberLine: {
      start: 0,
      end: 10,
      step: 1,
      showLabels: true,
      highlightTicks: [10],
    },
    target: 10,
    choices: [8, 9, 10, 11],
    hint: "Se pa siste tallet ytterst til hoyre. Det er 10.",
    reward: { stars: 1 },
  },
];

const missionMap: Record<string, Mission[]> = {
  pack1: pack1Missions,
};

export function getPackMissions(packId: string): Mission[] {
  return missionMap[packId] ?? [];
}

export function getMissionByIndex(packId: string, index: number): Mission | undefined {
  return getPackMissions(packId)[index];
}
