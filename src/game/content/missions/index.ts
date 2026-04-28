import { Mission } from "../../simulation/types";
import { pack1Missions } from "./pack1";
import { pack2Missions } from "./pack2";
import { pack3Missions } from "./pack3";
import { pack4Missions } from "./pack4";

export const allMissions: Record<string, Mission[]> = {
  pack1: pack1Missions,
  pack2: pack2Missions,
  pack3: pack3Missions,
  pack4: pack4Missions,
};

export function getMissionsForPack(packId: string): Mission[] {
  return allMissions[packId] ?? [];
}
