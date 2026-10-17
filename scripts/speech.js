// ==========================================================================
// GigSaathi AI - Web Speech API Multilingual Voice Engine
// Native browser SpeechSynthesis with full multilingual voices,
// audio waveform visualizer, and accessible playback controls.
// ==========================================================================

class WebSpeechVoiceEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.currentText = "";
    this.currentLang = "hi";
    this.currentSpeed = 1.0;
    this.onStateChangeCallbacks = [];
    this.visualizerInterval = null;
    this.audioContext = null;
    this.voices = [];

    // Load voices
    if (this.synth) {
      this.voices = this.synth.getVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.voices = this.synth.getVoices();
        };
      }
    }
  }

  getVoices() {
    if (!this.synth) return [];
    if (!this.voices || this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  registerStateListener(cb) {
    this.onStateChangeCallbacks.push(cb);
  }

  notifyState(state) {
    this.isPlaying = state.playing || false;
    this.isPaused = state.paused || false;
    this.onStateChangeCallbacks.forEach(cb => cb(state));
  }

  setSpeed(speed) {
    this.currentSpeed = parseFloat(speed) || 1.0;
    // If speaking, restart with new rate
    if (this.isPlaying && this.currentText) {
      const text = this.currentText;
      const lang = this.currentLang;
      this.stop();
      this.speak(text, lang, this.currentSpeed);
    }
  }

  setPersona(persona) {
    // Retained for UI compatibility
  }

  speak(text, lang = "hi", speed = null) {
    if (!this.synth) {
      console.warn("Web Speech API (speechSynthesis) is not supported in this browser.");
      return;
    }

    if (!text || text.trim() === "") return;

    this.stop();

    this.currentText = text.trim();
    this.currentLang = lang || this.currentLang;
    if (speed) this.currentSpeed = parseFloat(speed);

    // Clean markdown/symbols for smooth speech
    const cleanText = this.currentText
      .replace(/[*#_`~>\[\]()|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Map language code to standard speech locale
    const langMap = {
      hi: "hi-IN",
      en: "en-US",
      hinglish: "hi-IN",
      ta: "ta-IN",
      te: "te-IN",
      bn: "bn-IN",
      mr: "mr-IN",
      kn: "kn-IN",
      gu: "gu-IN"
    };

    const targetLangCode = langMap[this.currentLang] || "hi-IN";
    utterance.lang = targetLangCode;
    utterance.rate = this.currentSpeed;
    utterance.pitch = 1.0;

    // Pick best matching installed voice
    const voices = this.getVoices();
    if (voices.length > 0) {
      const langPrefix = targetLangCode.split("-")[0];
      const match = voices.find(v => v.lang === targetLangCode) ||
                    voices.find(v => v.lang.startsWith(langPrefix));
      if (match) {
        utterance.voice = match;
      }
    }

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.startVisualizer();
      this.notifyState({
        playing: true,
        paused: false,
        text: cleanText.slice(0, 80) + "...",
        lang: this.currentLang,
        speed: this.currentSpeed
      });
    };

    utterance.onpause = () => {
      this.isPlaying = false;
      this.isPaused = true;
      this.stopVisualizer();
      this.notifyState({
        playing: false,
        paused: true,
        text: cleanText.slice(0, 80) + "..."
      });
    };

    utterance.onresume = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.startVisualizer();
      this.notifyState({
        playing: true,
        paused: false,
        text: cleanText.slice(0, 80) + "..."
      });
    };

    utterance.onend = () => {
      this.stop();
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      this.stop();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPlaying = false;
      this.isPaused = true;
      this.stopVisualizer();
      this.notifyState({
        playing: false,
        paused: true,
        text: this.currentText.slice(0, 80) + "..."
      });
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPlaying = true;
      this.isPaused = false;
      this.startVisualizer();
      this.notifyState({
        playing: true,
        paused: false,
        text: this.currentText.slice(0, 80) + "..."
      });
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.stopVisualizer();
    this.notifyState({
      playing: false,
      paused: false,
      stopped: true
    });
  }

  // Real-time audio waveform equalizer animation
  startVisualizer() {
    this.stopVisualizer();
    const bars = document.querySelectorAll(".swave-bar");
    if (!bars || bars.length === 0) return;

    this.visualizerInterval = setInterval(() => {
      bars.forEach((bar) => {
        const rand = Math.floor(Math.random() * 18) + 4;
        bar.style.height = `${rand}px`;
      });
    }, 80);
  }

  stopVisualizer() {
    if (this.visualizerInterval) {
      clearInterval(this.visualizerInterval);
      this.visualizerInterval = null;
    }
    const bars = document.querySelectorAll(".swave-bar");
    bars.forEach(bar => {
      bar.style.height = "6px";
    });
  }

  // Synthetic tone generator (Chime & SOS alarm)
  playAudioCue(type = "chime") {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;
      if (!this.audioContext) this.audioContext = new AudioCtxClass();
      const ctx = this.audioContext;
      if (ctx.state === "suspended") ctx.resume();

      if (type === "chime") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === "sos") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(960, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.25);
        osc.frequency.linearRampToValueAtTime(960, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.7);
      }
    } catch (e) {
      console.warn("Audio cue error:", e);
    }
  }
}

// Global Web Speech Voice Engine Instance
const webSpeechVoiceEngine = new WebSpeechVoiceEngine();
const voiceEngine = webSpeechVoiceEngine;
const genAIVoiceEngine = webSpeechVoiceEngine; // Alias for backward compatibility
