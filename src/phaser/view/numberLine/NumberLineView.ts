import * as Phaser from "phaser";
import { NumberLineConfig } from "../../../game/simulation/types";

export interface NumberLineLayout {
  x: number;
  y: number;
  width: number;
  tickSpacing: number;
  tickCount: number;
}

const TICK_HEIGHT = 28;
const TICK_COLOR = 0x5a3a00;
const LINE_COLOR = 0x5a3a00;
const LABEL_COLOR = "#3a2a00";
const HIGHLIGHT_COLOR = 0xf0c030;
const HARE_TICK_COLOR = 0xd44000;

export class NumberLineView {
  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics;
  private labels: Phaser.GameObjects.Text[] = [];
  private config: NumberLineConfig;
  layout: NumberLineLayout;

  constructor(scene: Phaser.Scene, config: NumberLineConfig, x: number, y: number, width: number) {
    this.scene = scene;
    this.config = config;
    const ticks = Math.round((config.end - config.start) / config.step);
    this.layout = {
      x,
      y,
      width,
      tickSpacing: ticks > 0 ? width / ticks : width,
      tickCount: ticks + 1,
    };
    this.graphics = scene.add.graphics();
    this.draw();
  }

  private draw(hareTick?: number): void {
    const { graphics, config, layout } = this;
    graphics.clear();
    this.labels.forEach((l) => l.destroy());
    this.labels = [];

    const { x, y, width, tickSpacing, tickCount } = layout;

    // Shadow line
    graphics.lineStyle(6, 0x000000, 0.12);
    graphics.beginPath();
    graphics.moveTo(x, y + 3);
    graphics.lineTo(x + width, y + 3);
    graphics.strokePath();

    // Main line
    graphics.lineStyle(5, LINE_COLOR, 1);
    graphics.beginPath();
    graphics.moveTo(x, y);
    graphics.lineTo(x + width, y);
    graphics.strokePath();

    // Ticks and labels
    for (let i = 0; i < tickCount; i++) {
      const tx = x + i * tickSpacing;
      const val = config.start + i * config.step;
      const isHighlighted = config.highlightTicks.includes(val);
      const isHare = hareTick !== undefined && val === hareTick;

      if (isHighlighted) {
        graphics.fillStyle(HIGHLIGHT_COLOR, 1);
        graphics.fillCircle(tx, y, 16);
      }
      if (isHare) {
        graphics.lineStyle(4, HARE_TICK_COLOR, 1);
        graphics.strokeCircle(tx, y, 20);
      }

      graphics.lineStyle(isHighlighted || isHare ? 4 : 3, isHare ? HARE_TICK_COLOR : TICK_COLOR, 1);
      graphics.beginPath();
      graphics.moveTo(tx, y - TICK_HEIGHT / 2);
      graphics.lineTo(tx, y + TICK_HEIGHT / 2);
      graphics.strokePath();

      if (config.showLabels) {
        const label = this.scene.add.text(tx, y + TICK_HEIGHT / 2 + 8, String(val), {
          fontSize: "18px",
          color: isHare ? "#d44000" : LABEL_COLOR,
          fontStyle: isHare ? "bold" : "normal",
          fontFamily: "Segoe UI, Tahoma, Verdana, sans-serif",
        });
        label.setOrigin(0.5, 0);
        this.labels.push(label);
      }
    }
  }

  redraw(hareTick?: number): void {
    this.draw(hareTick);
  }

  updateConfig(config: NumberLineConfig): void {
    this.config = config;
    const ticks = Math.round((config.end - config.start) / config.step);
    this.layout = {
      ...this.layout,
      tickSpacing: ticks > 0 ? this.layout.width / ticks : this.layout.width,
      tickCount: ticks + 1,
    };
    this.draw();
  }

  tickXPosition(value: number): number {
    const { x, tickSpacing } = this.layout;
    const index = Math.round((value - this.config.start) / this.config.step);
    return x + index * tickSpacing;
  }

  valueAtX(worldX: number): number | null {
    const { x, tickSpacing, tickCount } = this.layout;
    const { start, step } = this.config;
    const closest = Math.round((worldX - x) / tickSpacing);
    if (closest < 0 || closest >= tickCount) return null;
    return start + closest * step;
  }

  setInteractive(onClick: (value: number) => void): void {
    const { x, y, width } = this.layout;
    const zone = this.scene.add.zone(x + width / 2, y, width, 80).setInteractive();
    zone.on("pointerdown", (ptr: Phaser.Input.Pointer) => {
      const val = this.valueAtX(ptr.x);
      if (val !== null) onClick(val);
    });
  }

  destroy(): void {
    this.graphics.destroy();
    this.labels.forEach((l) => l.destroy());
  }
}
