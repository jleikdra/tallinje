import * as Phaser from "phaser";

export class HareView {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private body: Phaser.GameObjects.Graphics;
  private currentX: number;
  private currentY: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.currentX = x;
    this.currentY = y;
    this.body = scene.add.graphics();
    this.container = scene.add.container(x, y, [this.body]);
    this.drawHare(false);
  }

  private drawHare(jumping: boolean): void {
    const g = this.body;
    g.clear();

    const earColor = 0xf5d0b0;
    const bodyColor = 0xf5e8c8;
    const eyeColor = 0x3a2a00;
    const noseColor = 0xf08080;

    // Ears
    g.fillStyle(earColor, 1);
    g.fillEllipse(-10, jumping ? -54 : -50, 12, 30);
    g.fillEllipse(10, jumping ? -58 : -54, 12, 30);

    // Inner ears
    g.fillStyle(0xf0a8a8, 1);
    g.fillEllipse(-10, jumping ? -54 : -50, 6, 18);
    g.fillEllipse(10, jumping ? -58 : -54, 6, 18);

    // Body
    g.fillStyle(bodyColor, 1);
    g.fillEllipse(0, jumping ? -5 : 0, 40, 36);

    // Head
    g.fillStyle(bodyColor, 1);
    g.fillCircle(0, jumping ? -30 : -28, 18);

    // Eye
    g.fillStyle(eyeColor, 1);
    g.fillCircle(7, jumping ? -32 : -30, 3);

    // Eye shine
    g.fillStyle(0xffffff, 1);
    g.fillCircle(8, jumping ? -33 : -31, 1);

    // Nose
    g.fillStyle(noseColor, 1);
    g.fillCircle(10, jumping ? -28 : -26, 2);

    // Tail
    g.fillStyle(0xffffff, 1);
    g.fillCircle(-16, jumping ? 6 : 8, 7);

    // Front legs
    g.fillStyle(bodyColor, 1);
    g.fillEllipse(-8, jumping ? 14 : 16, 10, 16);
    g.fillEllipse(8, jumping ? 14 : 16, 10, 16);
  }

  hopTo(targetX: number, lineY: number, onComplete?: () => void): void {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      this.container.setPosition(targetX, lineY);
      this.currentX = targetX;
      this.currentY = lineY;
      onComplete?.();
      return;
    }

    this.drawHare(true);

    const midY = lineY - 80;

    this.scene.tweens.add({
      targets: this.container,
      x: { value: targetX, ease: "Sine.easeInOut" },
      y: { value: midY, ease: "Quad.easeOut", yoyo: true, duration: 250 },
      duration: 500,
      onComplete: () => {
        this.container.setPosition(targetX, lineY);
        this.currentX = targetX;
        this.currentY = lineY;
        this.drawHare(false);
        onComplete?.();
      },
    });

    this.scene.tweens.add({
      targets: this.container,
      x: targetX,
      ease: "Sine.easeInOut",
      duration: 500,
    });
  }

  moveTo(x: number, y: number): void {
    this.container.setPosition(x, y);
    this.currentX = x;
    this.currentY = y;
  }

  celebrate(): void {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    this.scene.tweens.add({
      targets: this.container,
      y: this.currentY - 30,
      yoyo: true,
      duration: 200,
      repeat: 2,
    });
  }

  getX(): number {
    return this.currentX;
  }

  destroy(): void {
    this.container.destroy();
  }
}
