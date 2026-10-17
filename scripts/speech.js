// ==========================================================================
// GigSaathi AI - Speech Synthesis (TTS) & Web Speech Voice Engine
// Provides multilingual audio reading of pages, section readouts, and tone generation.
// ==========================================================================

class VoiceSpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.onStateChangeCallbacks = [];
    this.audioCtx = null;

    // Load available voices
    if (this.synth) {
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.getVoices();
      }
    }
  }

  getVoices() {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  registerStateListener(cb) {
    this.onStateChangeCallbacks.push(cb);
  }

  notifyState(speaking, textSnippet = "") {
    this.isSpeaking = speaking;
    this.onStateChangeCallbacks.forEach(cb => cb(speaking, textSnippet));
  }

  // Speak plain text in target language
  speak(text, langCode = "hi-IN", rate = 1.0) {
    if (!this.synth) {
      console.warn("SpeechSynthesis not supported on this browser.");
      return;
    }

    // Cancel existing playback
    this.stop();

    if (!text || text.trim() === "") return;

    // Clean markdown/symbols
    const cleanText = text
      .replace(/[*#_`~>\[\]()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode;
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Attempt to match installed voice for language
    const voices = this.getVoices();
    if (voices.length > 0) {
      const langPrefix = langCode.split("-")[0];
      const match = voices.find(v => v.lang === langCode || v.lang.startsWith(langPrefix));
      if (match) {
        utterance.voice = match;
      }
    }

    utterance.onstart = () => {
      this.notifyState(true, cleanText.slice(0, 80) + "...");
    };

    utterance.onend = () => {
      this.notifyState(false);
      this.currentUtterance = null;
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      this.notifyState(false);
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  // Stop currently playing speech
  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
    this.notifyState(false);
    this.currentUtterance = null;
  }

  // Play synthetic tone (Chime or Alarm) via Web Audio API
  playAudioCue(type = "chime") {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) this.audioCtx = new AudioContext();

      const ctx = this.audioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === "chime") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === "sos") {
        // High-low European police siren effect
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(960, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.25);
        osc.frequency.linearRampToValueAtTime(960, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.7);
      }
    } catch (e) {
      console.warn("Audio cue error:", e);
    }
  }
}

// Global Voice Engine Instance
const voiceEngine = new VoiceSpeechEngine();
