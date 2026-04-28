import { Mission } from "../../game/simulation/types";
import { HudOverlay } from "../../ui/hud/HudOverlay";

export type AnswerCallback = (value: number | { start: number; end: number; step: number }) => void;
export type SpeakCallback = () => void;

export class SceneBridge {
  private hud: HudOverlay;
  private answerCallback: AnswerCallback | null = null;
  private speakCallback: SpeakCallback | null = null;

  constructor(hud: HudOverlay) {
    this.hud = hud;
    hud.onChoice((value) => this.answerCallback?.(value));
    hud.onBuildSubmit((start, end, step) => this.answerCallback?.({ start, end, step }));
    hud.onSpeak(() => this.speakCallback?.());
  }

  loadMission(mission: Mission): void {
    this.hud.showMission(mission);
  }

  showFeedback(text: string, correct: boolean): void {
    this.hud.showFeedback(text, correct);
  }

  clearFeedback(): void {
    this.hud.hideFeedback();
  }

  onAnswer(cb: AnswerCallback): void {
    this.answerCallback = cb;
  }

  onSpeak(cb: SpeakCallback): void {
    this.speakCallback = cb;
  }
}
