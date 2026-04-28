import { packMetas } from "../../game/content/progression/packs";
import { ProgressState } from "../../game/simulation/types";

type PackSelectCallback = (packId: string) => void;

export class MenuOverlay {
  private el: HTMLElement;
  private callback: PackSelectCallback | null = null;

  constructor() {
    this.el = document.getElementById("menu-overlay")!;
  }

  show(progress: ProgressState): void {
    this.el.innerHTML = "";
    this.el.classList.add("visible");

    const title = document.createElement("div");
    title.style.cssText =
      "font-size:2.2rem;font-weight:900;color:#fffdf5;text-shadow:0 2px 8px rgba(0,0,0,0.5);";
    title.textContent = "Harehopp på Tallinja";
    this.el.appendChild(title);

    const grid = document.createElement("div");
    grid.style.cssText = "display:flex;flex-wrap:wrap;gap:16px;justify-content:center;";

    packMetas.forEach((meta) => {
      const pack = progress.packs[meta.id];
      const stars = pack?.stars ?? 0;
      const completed = pack?.completed ?? false;
      const isLocked = meta.id === "pack4" && !progress.packs["pack3"]?.completed;

      const btn = document.createElement("button");
      btn.style.cssText = `
        background: ${completed ? "#c8f0c8" : isLocked ? "#ccc" : "#fffdf5"};
        border: 3px solid ${completed ? "#4caf50" : isLocked ? "#aaa" : "#c8a850"};
        border-radius: 16px;
        padding: 16px 24px;
        cursor: ${isLocked ? "not-allowed" : "pointer"};
        text-align: left;
        min-width: 200px;
        opacity: ${isLocked ? "0.6" : "1"};
      `;
      btn.innerHTML = `
        <div style="font-size:1.1rem;font-weight:700;color:#3a2a00;">${meta.title}</div>
        <div style="font-size:0.85rem;color:#555;margin-top:4px;">${meta.description}</div>
        <div style="margin-top:8px;font-size:1.1rem;">${"⭐".repeat(stars)}${isLocked ? " 🔒" : ""}</div>
      `;
      btn.setAttribute("aria-label", `${meta.title}${isLocked ? " — låst" : ""}`);
      btn.disabled = isLocked;
      btn.addEventListener("click", () => {
        if (!isLocked) this.callback?.(meta.id);
      });
      grid.appendChild(btn);
    });

    this.el.appendChild(grid);
  }

  hide(): void {
    this.el.classList.remove("visible");
    this.el.innerHTML = "";
  }

  onPackSelect(cb: PackSelectCallback): void {
    this.callback = cb;
  }
}
