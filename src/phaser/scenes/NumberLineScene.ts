import * as Phaser from "phaser";
import { generateTicks } from "../../game/simulation/rules/numberLineRules";
import { Mission } from "../../game/simulation/types";

type Point = {
  x: number;
  y: number;
};

export class NumberLineScene extends Phaser.Scene {
  private currentMission: Mission | null = null;
  private lineGraphics!: Phaser.GameObjects.Graphics;
  private hare!: Phaser.GameObjects.Container;
  private hareShadow!: Phaser.GameObjects.Ellipse;
  private tickLabels: Phaser.GameObjects.Text[] = [];
  private readyCallbacks: Array<() => void> = [];
  private lineStart = 120;
  private lineEnd = 840;
  private lineY = 340;

  constructor() {
    super("number-line-scene");
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0xbfe9ff);
    this.addBackground();

    this.lineGraphics = this.add.graphics();
    this.hareShadow = this.add.ellipse(160, 380, 78, 24, 0x87bf8f, 0.35);
    this.hare = this.createHare();

    if (this.currentMission) {
      this.drawMission(this.currentMission);
    }

    for (const callback of this.readyCallbacks) {
      callback();
    }

    this.readyCallbacks = [];
  }

  onReady(callback: () => void): void {
    if (this.sys.isActive()) {
      callback();
      return;
    }

    this.readyCallbacks.push(callback);
  }

  setMission(mission: Mission): void {
    this.currentMission = mission;

    if (!this.lineGraphics) {
      return;
    }

    this.drawMission(mission);
  }

  moveHareToValue(value: number): void {
    const x = this.getXForValue(value);

    this.tweens.killTweensOf(this.hare);
    this.tweens.killTweensOf(this.hareShadow);

    this.tweens.add({
      targets: this.hare,
      x,
      y: 236,
      duration: 340,
      ease: "Quad.easeOut",
      yoyo: true,
      hold: 90,
      onUpdate: () => {
        this.hareShadow.x = this.hare.x;
        this.hareShadow.scaleX = 0.88 + Math.max(0, (this.hare.y - 236) / 520);
      },
      onComplete: () => {
        this.hareShadow.x = x;
        this.hareShadow.scaleX = 1;
      },
    });
  }

  private addBackground(): void {
    const skyGlow = this.add.graphics();
    skyGlow.fillGradientStyle(0xd9f4ff, 0xd9f4ff, 0xfefae6, 0xfefae6, 1);
    skyGlow.fillRect(0, 0, 960, 540);

    const hill = this.add.graphics();
    hill.fillStyle(0xcbe7b0, 1);
    hill.fillRoundedRect(0, 360, 960, 200, 60);

    const cloudPoints: Point[][] = [
      [
        { x: 90, y: 84 },
        { x: 140, y: 64 },
        { x: 204, y: 84 },
        { x: 166, y: 110 },
      ],
      [
        { x: 700, y: 104 },
        { x: 748, y: 78 },
        { x: 822, y: 98 },
        { x: 774, y: 124 },
      ],
    ];

    for (const points of cloudPoints) {
      const cloud = this.add.graphics();
      cloud.fillStyle(0xffffff, 0.86);
      cloud.fillCircle(points[0].x, points[0].y, 26);
      cloud.fillCircle(points[1].x, points[1].y, 30);
      cloud.fillCircle(points[2].x, points[2].y, 24);
      cloud.fillCircle(points[3].x, points[3].y, 22);
    }
  }

  private createHare(): Phaser.GameObjects.Container {
    const body = this.add.ellipse(160, 0, 96, 74, 0xf4a261, 1);
    const belly = this.add.ellipse(160, 8, 40, 34, 0xffe1c4, 1);
    const head = this.add.circle(200, -34, 30, 0xf4a261, 1);
    const innerEar1 = this.add.ellipse(187, -94, 14, 58, 0xffe1c4, 1);
    const ear1 = this.add.ellipse(187, -94, 22, 72, 0xf4a261, 1);
    const innerEar2 = this.add.ellipse(216, -88, 14, 54, 0xffe1c4, 1);
    const ear2 = this.add.ellipse(216, -88, 22, 68, 0xf4a261, 1);
    const eye = this.add.circle(210, -42, 4, 0x2f4354, 1);
    const tail = this.add.circle(116, -8, 12, 0xfff3e9, 1);
    const feet = this.add.graphics();
    feet.fillStyle(0xe07b39, 1);
    feet.fillRoundedRect(148, 26, 18, 10, 5);
    feet.fillRoundedRect(176, 26, 18, 10, 5);

    return this.add.container(0, 236, [
      tail,
      ear1,
      innerEar1,
      ear2,
      innerEar2,
      body,
      belly,
      head,
      eye,
      feet,
    ]);
  }

  private drawMission(mission: Mission): void {
    this.lineGraphics.clear();

    for (const label of this.tickLabels) {
      label.destroy();
    }

    this.tickLabels = [];

    const ticks = generateTicks(mission.numberLine);
    const baseY = this.lineY;

    this.lineGraphics.lineStyle(12, 0x8ebc76, 1);
    this.lineGraphics.beginPath();
    this.lineGraphics.moveTo(this.lineStart, baseY);
    this.lineGraphics.lineTo(this.lineEnd, baseY);
    this.lineGraphics.strokePath();

    this.lineGraphics.fillStyle(0xfefaf1, 1);
    this.lineGraphics.fillRoundedRect(90, 80, 252, 70, 24);
    this.lineGraphics.lineStyle(3, 0xe6d5b8, 1);
    this.lineGraphics.strokeRoundedRect(90, 80, 252, 70, 24);

    for (const tick of ticks) {
      const x = this.getXForValue(tick);
      const isHighlight = mission.numberLine.highlightTicks.includes(tick);

      this.lineGraphics.lineStyle(4, isHighlight ? 0xf48b57 : 0x4f6f7d, 1);
      this.lineGraphics.beginPath();
      this.lineGraphics.moveTo(x, baseY - (isHighlight ? 44 : 28));
      this.lineGraphics.lineTo(x, baseY + 28);
      this.lineGraphics.strokePath();

      const label = this.add.text(x, baseY + 44, String(tick), {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: isHighlight ? "28px" : "24px",
        color: isHighlight ? "#d26833" : "#28485f",
      });

      label.setOrigin(0.5, 0.5);
      this.tickLabels.push(label);
    }

    this.hare.setPosition(this.getXForValue(mission.numberLine.start), 236);
    this.hareShadow.setPosition(this.hare.x, 380);
  }

  private getXForValue(value: number): number {
    if (!this.currentMission) {
      return this.lineStart;
    }

    const { start, end } = this.currentMission.numberLine;
    const ratio = (value - start) / (end - start);
    return this.lineStart + ratio * (this.lineEnd - this.lineStart);
  }
}
