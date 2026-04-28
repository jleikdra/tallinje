import * as Phaser from "phaser";
import { MenuOverlay } from "../../ui/menus/MenuOverlay";
import { ParentPanel } from "../../ui/overlays/ParentPanel";
import { loadProgress, saveProgress, clearProgress } from "../../storage/progress";

export class MenuScene extends Phaser.Scene {
  private menuOverlay!: MenuOverlay;
  private parentPanel!: ParentPanel;

  constructor() {
    super({ key: "MenuScene" });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x4a8c2a, 0x4a8c2a, 0x2d5a1b, 0x2d5a1b, 1);
    bg.fillRect(0, 0, width, height);

    // Decorative number line
    this.drawDecorativeLine(width, height);

    this.menuOverlay = new MenuOverlay();
    this.parentPanel = new ParentPanel();

    const progress = loadProgress();
    this.menuOverlay.show(progress);

    this.menuOverlay.onPackSelect((packId) => {
      this.menuOverlay.hide();
      this.scene.start("PlayScene", { packId, missionIndex: 0 });
    });

    this.parentPanel.onReset(() => {
      clearProgress();
      const fresh = loadProgress();
      saveProgress(fresh);
      this.menuOverlay.show(fresh);
    });
  }

  private drawDecorativeLine(width: number, height: number): void {
    const g = this.add.graphics();
    const y = height * 0.75;
    g.lineStyle(4, 0xf5e8c8, 0.3);
    g.beginPath();
    g.moveTo(40, y);
    g.lineTo(width - 40, y);
    g.strokePath();

    for (let i = 0; i <= 10; i++) {
      const x = 40 + ((width - 80) / 10) * i;
      g.lineStyle(3, 0xf5e8c8, 0.3);
      g.beginPath();
      g.moveTo(x, y - 12);
      g.lineTo(x, y + 12);
      g.strokePath();

      this.add
        .text(x, y + 18, String(i), {
          fontSize: "14px",
          color: "rgba(255,253,245,0.4)",
          fontFamily: "Segoe UI, Tahoma, Verdana, sans-serif",
        })
        .setOrigin(0.5, 0);
    }
  }
}
