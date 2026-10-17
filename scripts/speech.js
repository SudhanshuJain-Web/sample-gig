// ==========================================================================
// GigSaathi AI - GenAI Text-To-Speech (TTS) & Neural Audio Engine
// Generates and streams realistic neural speech audio via GenAI Neural TTS API
// with real-time audio spectrum analyzer and accessible playback controls.
// ==========================================================================

class GenAITextToSpeechEngine {
  constructor() {
    this.currentAudio = null;
    this.audioContext = null;
    this.analyser = null;
    this.sourceNode = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentText = "";
    this.currentLang = "hi";
    this.currentPersona = "dost"; // 'dost' (friendly), 'didi' (supportive sister), 'adhikari' (formal)
    this.currentSpeed = 1.0;
    this.onStateChangeCallbacks = [];
    this.visualizerInterval = null;

    // Initialize Web Audio Context on first interaction
    this.initAudioContext();
  }

  initAudioContext() {
    if (!this.audioContext) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioContext = new AudioCtxClass();
      }
    }
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
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.currentSpeed;
    }
    this.notifyState({
      playing: this.isPlaying,
      paused: this.isPaused,
      speed: this.currentSpeed,
      text: this.currentText
    });
  }

  setPersona(persona) {
    this.currentPersona = persona || "dost";
  }

  // Synthesize and play GenAI Neural Voice
  async speak(text, lang = "hi", persona = null, speed = null) {
    if (!text || text.trim() === "") return;

    this.stop();
    this.initAudioContext();

    if (this.audioContext && this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    this.currentText = text.trim();
    this.currentLang = lang || this.currentLang;
    if (persona) this.currentPersona = persona;
    if (speed) this.currentSpeed = parseFloat(speed);

    // Notify UI that GenAI is synthesizing voice
    this.notifyState({
      loading: true,
      playing: false,
      text: this.currentText.slice(0, 75) + "...",
      lang: this.currentLang,
      speed: this.currentSpeed,
      persona: this.currentPersona
    });

    try {
      // Call GenAI TTS Neural Endpoint
      const response = await fetch("/api/genai-tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: this.currentText,
          lang: this.currentLang,
          persona: this.currentPersona,
          speed: this.currentSpeed
        })
      });

      if (!response.ok) {
        throw new Error(`GenAI TTS HTTP error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.audioUrl) {
        throw new Error("No audioUrl returned by GenAI TTS");
      }

      // Play synthesized audio
      this.playAudioUrl(data.audioUrl);

    } catch (err) {
      console.warn("GenAI TTS server error, using resilient client synthesis fallback:", err);
      this.fallbackSpeechSynthesis(this.currentText, this.currentLang, this.currentSpeed);
    }
  }

  playAudioUrl(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.playbackRate = this.currentSpeed;
    this.currentAudio = audio;

    // Connect to Web Audio Analyser for real-time frequency bars
    try {
      if (this.audioContext) {
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64;
        this.sourceNode = this.audioContext.createMediaElementSource(audio);
        this.sourceNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
      }
    } catch (e) {
      // Audio element already connected or cross-origin
    }

    audio.onplay = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.startVisualizer();
      this.notifyState({
        playing: true,
        paused: false,
        text: this.currentText.slice(0, 80) + "...",
        lang: this.currentLang,
        speed: this.currentSpeed,
        persona: this.currentPersona
      });
    };

    audio.onpause = () => {
      if (this.currentAudio && !this.currentAudio.ended) {
        this.isPlaying = false;
        this.isPaused = true;
        this.stopVisualizer();
        this.notifyState({
          playing: false,
          paused: true,
          text: this.currentText.slice(0, 80) + "..."
        });
      }
    };

    audio.onended = () => {
      this.stop();
    };

    audio.onerror = (e) => {
      console.warn("Audio playback error:", e);
      this.stop();
    };

    audio.play().catch(e => {
      console.warn("Autoplay policy or playback blocked:", e);
      this.fallbackSpeechSynthesis(this.currentText, this.currentLang, this.currentSpeed);
    });
  }

  pause() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }
  }

  resume() {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play();
    }
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.stopVisualizer();
    this.notifyState({
      playing: false,
      paused: false,
      stopped: true
    });
  }

  // Real-time audio waveform animation
  startVisualizer() {
    this.stopVisualizer();
    const bars = document.querySelectorAll(".swave-bar");
    if (!bars || bars.length === 0) return;

    this.visualizerInterval = setInterval(() => {
      if (this.analyser) {
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(dataArray);
        bars.forEach((bar, idx) => {
          const val = dataArray[idx % dataArray.length] || 50;
          const height = Math.max(4, (val / 255) * 22);
          bar.style.height = `${height}px`;
        });
      } else {
        // Organic pulse if analyser not connected
        bars.forEach((bar) => {
          const rand = Math.floor(Math.random() * 18) + 4;
          bar.style.height = `${rand}px`;
        });
      }
    }, 75);
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

  // Client-side fallback if server disconnected
  fallbackSpeechSynthesis(text, lang, speed) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[*#_`~>\[\]()]/g, " ").replace(/\s+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
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
    utterance.lang = langMap[lang] || "hi-IN";
    utterance.rate = speed || 1.0;

    utterance.onstart = () => {
      this.isPlaying = true;
      this.startVisualizer();
      this.notifyState({
        playing: true,
        paused: false,
        text: cleanText.slice(0, 80) + "...",
        lang: lang,
        speed: speed
      });
    };

    utterance.onend = () => {
      this.stop();
    };

    utterance.onerror = () => {
      this.stop();
    };

    window.speechSynthesis.speak(utterance);
  }

  // Audio cue tones (chime or SOS siren)
  playAudioCue(type = "chime") {
    try {
      this.initAudioContext();
      const ctx = this.audioContext;
      if (!ctx) return;
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

// Global GenAI TTS Instance
const genAIVoiceEngine = new GenAITextToSpeechEngine();
const voiceEngine = genAIVoiceEngine; // Backwards compatibility alias
