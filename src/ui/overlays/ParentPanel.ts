import { ProgressState } from "../../game/simulation/types";
import { packMetas } from "../../game/content/progression/packs";

type ResetCallback = () => void;

export class ParentPanel {
  private panel: HTMLElement;
  private soundToggle: HTMLButtonElement;
  private speechToggle: HTMLButtonElement;
  private packOverview: HTMLElement;
  private resetCallback: ResetCallback | null = null;
  private gearPressStart = 0;
  private gearTimer: ReturnType<typeof setTimeout> | null = null;

  soundEnabled = true;
  speechEnabled = true;

  constructor() {
    this.panel = document.getElementById("parent-panel")!;
    this.soundToggle = document.getElementById("sound-toggle") as HTMLButtonElement;
    this.speechToggle = document.getElementById("speech-toggle") as HTMLButtonElement;
    this.packOverview = document.getElementById("pack-overview")!;

    document.getElementById("close-panel-btn")!.addEventListener("click", () => this.hide());
    document.getElementById("reset-progress-btn")!.addEventListener("click", () => {
      if (confirm("Er du sikker på at du vil nullstille all fremgang?")) {
        this.resetCallback?.();
        this.hide();
      }
    });

    this.soundToggle.addEventListener("click", () => {
      this.soundEnabled = !this.soundEnabled;
      this.soundToggle.classList.toggle("on", this.soundEnabled);
      this.soundToggle.setAttribute("aria-pressed", String(this.soundEnabled));
    });

    this.speechToggle.addEventListener("click", () => {
      this.speechEnabled = !this.speechEnabled;
      this.speechToggle.classList.toggle("on", this.speechEnabled);
      this.speechToggle.setAttribute("aria-pressed", String(this.speechEnabled));
    });

    this.setupGearButton();
  }

  private setupGearButton(): void {
    const gear = document.getElementById("gear-btn")!;
    gear.addEventListener("pointerdown", () => {
      this.gearPressStart = Date.now();
      this.gearTimer = setTimeout(() => this.show(null), 1200);
    });
    gear.addEventListener("pointerup", () => {
      if (this.gearTimer) clearTimeout(this.gearTimer);
    });
    gear.addEventListener("pointerleave", () => {
      if (this.gearTimer) clearTimeout(this.gearTimer);
    });
  }

  show(progress: ProgressState | null): void {
    if (progress) {
      this.packOverview.innerHTML =
        "<strong>Fremgang:</strong><br>" +
        packMetas
          .map((m) => {
            const p = progress.packs[m.id];
            return `${m.title}: ${"⭐".repeat(p?.stars ?? 0)} ${p?.completed ? "✓" : ""}`;
          })
          .join("<br>");
    }
    this.panel.classList.add("visible");
  }

  hide(): void {
    this.panel.classList.remove("visible");
  }

  onReset(cb: ResetCallback): void {
    this.resetCallback = cb;
  }
}
