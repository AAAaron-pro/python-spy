/**
 * Python 特務：滿分計畫 - 內建 Web Audio API 音效合成器
 * 100% 本地即時音頻合成，不依賴任何外部音效檔，零延遲且可離線遊玩
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("sound_muted") === "true";
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("sound_muted", this.muted);
    return this.muted;
  }

  playTone(freq, type, duration, gainStart = 0.15, gainEnd = 0.001) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainStart, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainEnd, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback issue:", e);
    }
  }

  // 答對音效：清脆向上大三和弦 (C5 -> E5 -> G5)
  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "sine", 0.2, 0.18, 0.001);
      }, idx * 75);
    });
  }

  // 答錯音效：低音沉悶警示音
  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    this.playTone(180, "sawtooth", 0.25, 0.2, 0.01);
    setTimeout(() => {
      this.playTone(130, "sawtooth", 0.35, 0.25, 0.01);
    }, 120);
  }

  // 連擊 Combo 獎勵音效（音調隨連擊數升高）
  playCombo(streak = 1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const baseFreq = 440; // A4
    const semitones = Math.min(streak * 2, 24);
    const freq = baseFreq * Math.pow(2, semitones / 12);

    this.playTone(freq, "triangle", 0.25, 0.2, 0.001);
    setTimeout(() => {
      this.playTone(freq * 1.25, "sine", 0.3, 0.15, 0.001);
    }, 80);
  }

  // 升級特務軍階號角
  playLevelUp() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const fanfare = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.45 } // C6
    ];

    fanfare.forEach((note, idx) => {
      setTimeout(() => {
        this.playTone(note.f, "sine", note.d, 0.25, 0.001);
      }, idx * 120);
    });
  }

  // 按鈕點擊反饋音
  playClick() {
    this.playTone(800, "sine", 0.04, 0.05, 0.001);
  }
}

window.soundFX = new SoundEffects();
