import * as Phaser from "phaser";
import { Mission, BuildLineInput } from "../../game/simulation/types";
import {
  evaluateMission,
  shouldShowHint,
  getSimplifiedChoices,
} from "../../game/simulation/rules/missionRules";
import { getMissionsForPack } from "../../game/content/missions/index";
import { loadProgress, saveProgress, clearProgress } from "../../storage/progress";
import {
  awardStar,
  recordError,
  recordHintUsed,
  advanceMission,
  switchPack,
  countErrors,
} from "../../game/simulation/state";
import { NumberLineView } from "../view/numberLine/NumberLineView";
import { HareView } from "../view/hare/HareView";
import { spawnStars } from "../view/effects/StarEffect";
import { SceneBridge } from "../adapters/sceneBridge";
import { HudOverlay } from "../../ui/hud/HudOverlay";
import { ParentPanel } from "../../ui/overlays/ParentPanel";

interface PlaySceneData {
  packId: string;
  missionIndex: number;
}

export class PlayScene extends Phaser.Scene {
  private packId = "pack1";
  private missionIndex = 0;
  private missions: Mission[] = [];

  private numberLineView: NumberLineView | null = null;
  private hareView: HareView | null = null;
  private bridge: SceneBridge | null = null;
  private hud: HudOverlay | null = null;
  private parentPanel: ParentPanel | null = null;

  private answerLocked = false;
  private backBtn: Phaser.GameObjects.Text | null = null;

  constructor() {
    super({ key: "PlayScene" });
  }

  init(data: PlaySceneData): void {
    this.packId = data.packId ?? "pack1";
    this.missionIndex = data.missionIndex ?? 0;
  }

  create(): void {
    const { width, height } = this.cameras.main;
    this.missions = getMissionsForPack(this.packId);

    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x7ab548, 0x7ab548, 0x4a8c2a, 0x4a8c2a, 1);
    bg.fillRect(0, 0, width, height);

    // Ground strip
    const ground = this.add.graphics();
    ground.fillStyle(0x5a8030, 1);
    ground.fillRect(0, height * 0.62, width, height * 0.38);

    this.hud = new HudOverlay();
    this.bridge = new SceneBridge(this.hud);
    this.parentPanel = new ParentPanel();

    this.bridge.onAnswer((answer) => {
      if (!this.answerLocked) this.handleAnswer(answer);
    });

    this.bridge.onSpeak(() => {
      const mission = this.currentMission();
      if (mission && this.parentPanel?.speechEnabled) {
        this.speak(mission.promptText);
      }
    });

    this.parentPanel.onReset(() => {
      clearProgress();
      this.scene.start("MenuScene");
    });

    // Back to menu button
    this.backBtn = this.add.text(16, 16, "← Meny", {
      fontSize: "16px",
      color: "#fffdf5",
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: { x: 10, y: 6 },
      fontFamily: "Segoe UI, Tahoma, Verdana, sans-serif",
    });
    this.backBtn.setInteractive({ useHandCursor: true });
    this.backBtn.on("pointerdown", () => {
      this.cleanupDOM();
      this.scene.start("MenuScene");
    });

    this.loadMission();
  }

  private loadMission(): void {
    const { width, height } = this.cameras.main;
    const mission = this.currentMission();
    if (!mission) {
      this.showPackComplete();
      return;
    }

    // Destroy previous views
    this.numberLineView?.destroy();
    this.hareView?.destroy();

    const lineY = height * 0.52;
    const lineX = 80;
    const lineWidth = width - 160;

    this.numberLineView = new NumberLineView(this, mission.numberLine, lineX, lineY, lineWidth);

    const startX = this.numberLineView.tickXPosition(mission.numberLine.start);
    this.hareView = new HareView(this, startX, lineY - 60);

    this.bridge!.loadMission(mission);
    this.answerLocked = false;

    // For move_hare: clicking on ticks answers the question
    if (mission.type === "move_hare") {
      this.numberLineView.setInteractive((value) => {
        if (!this.answerLocked) this.handleAnswer(value);
      });
    }

    // For spot_error: show choices as tick labels
    if (mission.type === "spot_error" && mission.choices.length > 0) {
      this.hud!.showChoices(mission.choices.map((_, idx) => idx));
    }

    // Auto-speak
    const progress = loadProgress();
    if (this.parentPanel?.speechEnabled) {
      this.time.delayedCall(400, () => this.speak(mission.promptText));
    }

    // Show hint if error threshold met
    const progress2 = loadProgress();
    const errors = countErrors(progress2, mission.id);
    if (shouldShowHint(errors)) {
      this.bridge!.showFeedback(mission.hint, false);
    }

    // Update hare to start position (on the line)
    this.hareView.moveTo(startX, lineY - 60);

    // Draw number line with hare position
    this.numberLineView.redraw(mission.numberLine.start);

    void progress;
  }

  private handleAnswer(
    answer: number | BuildLineInput | { start: number; end: number; step: number }
  ): void {
    const mission = this.currentMission();
    if (!mission) return;

    let evalAnswer: number | BuildLineInput;
    if (typeof answer === "object") {
      evalAnswer = answer as BuildLineInput;
    } else {
      evalAnswer = answer as number;
    }

    const result = evaluateMission(mission, evalAnswer);
    this.answerLocked = true;

    let progress = loadProgress();

    if (result.correct) {
      progress = awardStar(progress, mission.id);
      saveProgress(progress);

      // Move hare to target
      const target = mission.target;
      if (target !== null && this.numberLineView && this.hareView) {
        const targetX = this.numberLineView.tickXPosition(target);
        const lineY = this.cameras.main.height * 0.52;
        this.hareView.hopTo(targetX, lineY - 60, () => {
          this.hareView!.celebrate();
          spawnStars(this, targetX, lineY - 80);
          this.numberLineView!.redraw(target);
        });
      } else if (this.hareView) {
        this.hareView.celebrate();
        spawnStars(this, this.cameras.main.width / 2, this.cameras.main.height * 0.4);
      }

      this.bridge!.showFeedback(result.explanation, true);

      this.time.delayedCall(2000, () => {
        progress = loadProgress();
        progress = advanceMission(progress, this.missions.length);
        saveProgress(progress);
        this.missionIndex = progress.currentMissionIndex;

        if (progress.packs[this.packId]?.completed && this.missionIndex === 0) {
          this.showPackComplete();
        } else {
          this.loadMission();
        }
      });
    } else {
      progress = recordError(progress, mission.id);
      const errors = countErrors(progress, mission.id);
      if (shouldShowHint(errors)) {
        progress = recordHintUsed(progress, mission.id);
        saveProgress(progress);
        this.bridge!.showFeedback(mission.hint, false);
      } else {
        saveProgress(progress);
        this.bridge!.showFeedback(result.explanation, false);
      }

      // Re-enable choices after short delay
      this.time.delayedCall(1200, () => {
        const fresh = loadProgress();
        const freshErrors = countErrors(fresh, mission.id);
        const simplified =
          freshErrors >= 3
            ? getSimplifiedChoices(mission.choices, mission.target ?? 0)
            : mission.choices;
        if (mission.choices.length > 0 && mission.type !== "move_hare") {
          this.hud!.showChoices(simplified);
        }
        this.answerLocked = false;
      });
    }
  }

  private showPackComplete(): void {
    const { width, height } = this.cameras.main;
    this.numberLineView?.destroy();
    this.hareView?.destroy();
    this.bridge?.clearFeedback();
    this.hud?.clearChoices();

    const panel = this.add.graphics();
    panel.fillStyle(0xfffdf5, 0.95);
    panel.fillRoundedRect(width / 2 - 240, height / 2 - 120, 480, 240, 20);
    panel.lineStyle(4, 0xc8a850, 1);
    panel.strokeRoundedRect(width / 2 - 240, height / 2 - 120, 480, 240, 20);

    this.add
      .text(width / 2, height / 2 - 70, "🎉 Pakke fullført!", {
        fontSize: "28px",
        color: "#3a2a00",
        fontFamily: "Segoe UI, Tahoma, Verdana, sans-serif",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 - 20, "Veldig bra jobbet!", {
        fontSize: "20px",
        color: "#5a4a10",
        fontFamily: "Segoe UI, Tahoma, Verdana, sans-serif",
      })
      .setOrigin(0.5);

    spawnStars(this, width / 2, height / 2, 12);

    const menuBtn = this.add.text(width / 2, height / 2 + 60, "Tilbake til meny", {
      fontSize: "20px",
      color: "#fffdf5",
      backgroundColor: "#4a8c2a",
      padding: { x: 20, y: 10 },
      fontFamily: "Segoe UI, Tahoma, Verdana, sans-serif",
    });
    menuBtn.setOrigin(0.5);
    menuBtn.setInteractive({ useHandCursor: true });
    menuBtn.on("pointerdown", () => {
      this.cleanupDOM();
      this.scene.start("MenuScene");
    });
  }

  private currentMission(): Mission | null {
    return this.missions[this.missionIndex] ?? null;
  }

  private speak(text: string): void {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "nb-NO";
    utt.rate = 0.9;
    speechSynthesis.speak(utt);
  }

  private cleanupDOM(): void {
    const hud = document.getElementById("hud");
    if (hud) {
      const taskBubble = document.getElementById("task-bubble");
      if (taskBubble) taskBubble.textContent = "";
      const feedbackBox = document.getElementById("feedback-box");
      if (feedbackBox) feedbackBox.className = "feedback-box";
      const choices = document.getElementById("choices");
      if (choices) choices.innerHTML = "";
      const buildControls = document.getElementById("build-controls");
      if (buildControls) buildControls.classList.remove("visible");
    }
  }

  shutdown(): void {
    this.cleanupDOM();
    speechSynthesis?.cancel();
    // Update progress with current pack
    let progress = loadProgress();
    progress = switchPack(progress, this.packId);
    saveProgress(progress);
  }
}
