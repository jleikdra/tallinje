import * as Phaser from "phaser";

export function spawnStars(scene: Phaser.Scene, x: number, y: number, count = 5): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < count; i++) {
    const g = scene.add.graphics();
    g.fillStyle(0xf0c030, 1);
    drawStar(g, 0, 0, 5, 12, 6);
    g.setPosition(x, y);
    g.setAlpha(1);

    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const dist = 60 + Math.random() * 40;
    const tx = x + Math.cos(angle) * dist;
    const ty = y + Math.sin(angle) * dist;

    scene.tweens.add({
      targets: g,
      x: tx,
      y: ty,
      alpha: 0,
      scaleX: 0.2,
      scaleY: 0.2,
      duration: 700,
      delay: i * 60,
      ease: "Quad.easeOut",
      onComplete: () => g.destroy(),
    });
  }
}

function drawStar(
  g: Phaser.GameObjects.Graphics,
  cx: number,
  cy: number,
  points: number,
  outerR: number,
  innerR: number
): void {
  const path: number[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    path.push(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
  }
  g.fillPoints(
    path.reduce<{ x: number; y: number }[]>((acc, v, idx) => {
      if (idx % 2 === 0) acc.push({ x: v, y: path[idx + 1] });
      return acc;
    }, []),
    true
  );
}
