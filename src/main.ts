import * as Phaser from "phaser";
import { BootScene } from "./phaser/scenes/BootScene";
import { MenuScene } from "./phaser/scenes/MenuScene";
import { PlayScene } from "./phaser/scenes/PlayScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "game-container",
  backgroundColor: "#4a8c2a",
  scene: [BootScene, MenuScene, PlayScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);
