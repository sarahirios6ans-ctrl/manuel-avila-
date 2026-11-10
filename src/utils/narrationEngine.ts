/**
 * Narration & Audio Synthesizer Engine
 * Coordinates Web Speech API spoken voiceover with Web Audio API vintage documentary atmosphere
 */

class SoundAtmosphere {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private isPlaying = false;
  private volume = 0.22;
  private vintageFilter = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setVintage(enabled: boolean) {
    this.vintageFilter = enabled;
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 1. Subtle warm ambient chord (D minor / A solemn drone)
      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

      // Low foundation
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'triangle';
      this.droneOsc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2

      // Gentle fifth
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(450, this.ctx.currentTime);

      this.droneOsc1.connect(lowpass);
      this.droneOsc2.connect(lowpass);
      lowpass.connect(droneGain);
      droneGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();

      // 2. Vintage Vinyl / Archival Gramophone Crackle
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // sporadic dust ticks + soft pink noise
        const isTick = Math.random() < 0.0004;
        output[i] = isTick ? (Math.random() * 2 - 1) * 0.45 : (Math.random() * 2 - 1) * 0.008;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start();
      this.noiseNode = whiteNoise;
      this.isPlaying = true;
    } catch {
      // Audio autoplay gracefully handled
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    try {
      if (this.droneOsc1) {
        this.droneOsc1.stop();
        this.droneOsc1.disconnect();
        this.droneOsc1 = null;
      }
      if (this.droneOsc2) {
        this.droneOsc2.stop();
        this.droneOsc2.disconnect();
        this.droneOsc2 = null;
      }
      if (this.noiseNode && 'stop' in this.noiseNode) {
        (this.noiseNode as AudioScheduledSourceNode).stop();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      if (this.masterGain) {
        this.masterGain.disconnect();
        this.masterGain = null;
      }
    } catch {
      // ignore teardown errors
    }
    this.isPlaying = false;
  }
}

export const documentaryAtmosphere = new SoundAtmosphere();

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
}

export class SpeechNarrationEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private playbackRate = 1.0;
  private isVoiceMuted = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public getAvailableSpanishVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    const voices = this.synth.getVoices();
    const spanishVoices = voices.filter(v => v.lang.startsWith('es') || v.lang.includes('spa'));
    if (spanishVoices.length > 0) return spanishVoices;
    return voices;
  }

  public setVoice(voice: SpeechSynthesisVoice | null) {
    this.selectedVoice = voice;
  }

  public setRate(rate: number) {
    this.playbackRate = rate;
  }

  public setMuted(muted: boolean) {
    this.isVoiceMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public speak(
    text: string,
    onBoundary?: (charIndex: number) => void,
    onEnd?: () => void,
    onError?: (err: unknown) => void
  ) {
    if (!this.synth || this.isVoiceMuted) return;

    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.playbackRate;
      utterance.pitch = 0.98; // slightly dignified, lower authoritative cadence

      // Pick Spanish voice if available
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      } else {
        const spanish = this.getAvailableSpanishVoices();
        const preferred =
          spanish.find(v => v.lang.includes('es-MX') || v.lang.includes('es_MX')) ||
          spanish.find(v => v.lang.startsWith('es')) ||
          null;
        if (preferred) utterance.voice = preferred;
      }

      utterance.onboundary = (e) => {
        if (onBoundary) onBoundary(e.charIndex);
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        if (onError) onError(e);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (e) {
      if (onError) onError(e);
    }
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }
}

export const speechNarrationEngine = new SpeechNarrationEngine();
