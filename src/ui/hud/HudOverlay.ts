import { Mission } from "../../game/simulation/types";

type ChoiceCallback = (value: number) => void;
type BuildSubmitCallback = (start: number, end: number, step: number) => void;
type SpeakCallback = () => void;

export class HudOverlay {
  private taskBubble: HTMLElement;
  private feedbackBox: HTMLElement;
  private choicesEl: HTMLElement;
  private buildControls: HTMLElement;
  private speakBtn: HTMLElement;

  private startVal = 0;
  private endVal = 10;
  private stepVal = 1;

  private choiceCallback: ChoiceCallback | null = null;
  private buildCallback: BuildSubmitCallback | null = null;
  private speakCallback: SpeakCallback | null = null;

  constructor() {
    this.taskBubble = document.getElementById("task-bubble")!;
    this.feedbackBox = document.getElementById("feedback-box")!;
    this.choicesEl = document.getElementById("choices")!;
    this.buildControls = document.getElementById("build-controls")!;
    this.speakBtn = document.getElementById("speak-btn")!;

    this.speakBtn.addEventListener("click", () => this.speakCallback?.());
    this.setupBuildControls();
  }

  private setupBuildControls(): void {
    const startValEl = document.getElementById("start-val")!;
    const endValEl = document.getElementById("end-val")!;
    const stepValEl = document.getElementById("step-val")!;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    document.getElementById("start-minus")!.addEventListener("click", () => {
      this.startVal = clamp(this.startVal - 1, -99, this.endVal - 1);
      startValEl.textContent = String(this.startVal);
    });
    document.getElementById("start-plus")!.addEventListener("click", () => {
      this.startVal = clamp(this.startVal + 1, -99, this.endVal - 1);
      startValEl.textContent = String(this.startVal);
    });
    document.getElementById("end-minus")!.addEventListener("click", () => {
      this.endVal = clamp(this.endVal - 1, this.startVal + 1, 99);
      endValEl.textContent = String(this.endVal);
    });
    document.getElementById("end-plus")!.addEventListener("click", () => {
      this.endVal = clamp(this.endVal + 1, this.startVal + 1, 99);
      endValEl.textContent = String(this.endVal);
    });
    document.getElementById("step-minus")!.addEventListener("click", () => {
      this.stepVal = clamp(this.stepVal - 1, 1, 10);
      stepValEl.textContent = String(this.stepVal);
    });
    document.getElementById("step-plus")!.addEventListener("click", () => {
      this.stepVal = clamp(this.stepVal + 1, 1, 10);
      stepValEl.textContent = String(this.stepVal);
    });

    document.getElementById("submit-build-btn")!.addEventListener("click", () => {
      this.buildCallback?.(this.startVal, this.endVal, this.stepVal);
    });
  }

  showMission(mission: Mission): void {
    this.taskBubble.textContent = mission.promptText;
    this.hideFeedback();

    if (mission.type === "build_line") {
      this.clearChoices();
      this.showBuildControls(
        mission.numberLine.start,
        mission.numberLine.end,
        mission.numberLine.step
      );
    } else if (mission.choices.length > 0) {
      this.hideBuildControls();
      this.showChoices(mission.choices);
    } else {
      this.clearChoices();
      this.hideBuildControls();
    }
  }

  showChoices(choices: number[]): void {
    this.clearChoices();
    choices.forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = String(c);
      btn.setAttribute("aria-label", `Svar ${c}`);
      btn.addEventListener("click", () => {
        this.disableChoices();
        this.choiceCallback?.(c);
      });
      this.choicesEl.appendChild(btn);
    });
  }

  private showBuildControls(start: number, end: number, step: number): void {
    this.startVal = start;
    this.endVal = end;
    this.stepVal = step;
    (document.getElementById("start-val") as HTMLElement).textContent = String(start);
    (document.getElementById("end-val") as HTMLElement).textContent = String(end);
    (document.getElementById("step-val") as HTMLElement).textContent = String(step);
    this.buildControls.classList.add("visible");
  }

  private hideBuildControls(): void {
    this.buildControls.classList.remove("visible");
  }

  clearChoices(): void {
    this.choicesEl.innerHTML = "";
  }

  disableChoices(): void {
    this.choicesEl.querySelectorAll<HTMLButtonElement>(".choice-btn").forEach((b) => {
      b.disabled = true;
    });
  }

  showFeedback(text: string, correct: boolean): void {
    this.feedbackBox.textContent = text;
    this.feedbackBox.className = "feedback-box visible " + (correct ? "correct" : "wrong");
    this.feedbackBox.classList.add("visible");
  }

  hideFeedback(): void {
    this.feedbackBox.className = "feedback-box";
  }

  onChoice(cb: ChoiceCallback): void {
    this.choiceCallback = cb;
  }

  onBuildSubmit(cb: BuildSubmitCallback): void {
    this.buildCallback = cb;
  }

  onSpeak(cb: SpeakCallback): void {
    this.speakCallback = cb;
  }
}
