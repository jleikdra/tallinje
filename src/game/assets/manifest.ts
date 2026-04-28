export interface AssetEntry {
  key: string;
  path: string;
}

export const SOUNDS: AssetEntry[] = [
  { key: "correct", path: "assets/sounds/correct.ogg" },
  { key: "wrong", path: "assets/sounds/wrong.ogg" },
  { key: "hop", path: "assets/sounds/hop.ogg" },
  { key: "star", path: "assets/sounds/star.ogg" },
];

export const MUSIC: AssetEntry[] = [{ key: "bgm", path: "assets/music/bgm.ogg" }];
