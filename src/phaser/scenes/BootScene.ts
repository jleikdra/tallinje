import * as Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload(): void {
    // Draw a minimal loading bar using the Graphics API
    const { width, height } = this.cameras.main;
    const barW = 400;
    const barH = 20;
    const barX = (width - barW) / 2;
    const barY = height / 2 - barH / 2;

    const bg = this.add.graphics();
    bg.fillStyle(0xf5f0e8, 1);
    bg.fillRect(0, 0, width, height);

    const barBg = this.add.graphics();
    barBg.fillStyle(0xd0c090, 1);
    barBg.fillRoundedRect(barX, barY, barW, barH, 8);

    const bar = this.add.graphics();

    const titleText = this.add.text(width / 2, height / 2 - 60, "Harehopp på Tallinja", {
      fontSize: "28px",
      color: "#3a2a00",
      fontFamily: "Segoe UI, Tahoma, Verdana, sans-serif",
      fontStyle: "bold",
    });
    titleText.setOrigin(0.5);

    this.load.on("progress", (value: number) => {
      bar.clear();
      bar.fillStyle(0xc8a020, 1);
      bar.fillRoundedRect(barX, barY, barW * value, barH, 8);
    });

    // No real assets to load yet, but we set up the structure for future use.
    // Load a dummy item so the progress callback fires.
  }

  create(): void {
    this.scene.start("MenuScene");
  }
}
