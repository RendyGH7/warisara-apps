/**
 * WARISARA — Story Audio & Soundscape Engine
 * Pure Web Audio API Synthesizer & Speech Synthesis for Interactive Storybook
 * Zero external audio file dependencies, 100% instant & offline-capable.
 */

(function () {
  'use strict';

  class StoryAudioEngine {
    constructor() {
      this.ctx = null;
      this.isAmbiencePlaying = false;
      this.ambienceNodes = [];
      this.isMuted = false;
      this.isSpeaking = false;
      this.currentUtterance = null;
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // 1. Realistic Book Page Flip / Paper Rustle Sound
    playPageFlip() {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1A. Noise Buffer for realistic paper texture friction
      const bufferSize = this.ctx.sampleRate * 0.18;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      // Bandpass filter for crisp paper flutter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.18);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      // 1B. Low-frequency whoosh air puff
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

      oscGain.gain.setValueAtTime(0.12, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      osc.start(now);
      whiteNoise.stop(now + 0.18);
      osc.stop(now + 0.15);
    }

    // 2. Book Open Sound (Thump & Creak)
    playBookOpen() {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Leather Thump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);

      // Followed by slight page flutter
      setTimeout(() => this.playPageFlip(), 80);
    }

    // 3. Book Close Sound (Satisfying Soft Slap)
    playBookClose() {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.22);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    }

    // 4. Bookmark / Gold Seal Shimmer Chime
    playChime() {
      if (this.isMuted) return;
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const frequencies = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 Pentatonic Gold Chime

      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.15, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.85);
      });
    }

    // 5. Traditional Nusantara Ambient Meditation Drone (Slendro & Siter Harmony)
    toggleAmbience(forceState) {
      this.initContext();
      if (!this.ctx) return false;

      const target = typeof forceState === 'boolean' ? forceState : !this.isAmbiencePlaying;

      if (!target) {
        this.stopAmbience();
        return false;
      } else {
        this.startAmbience();
        return true;
      }
    }

    startAmbience() {
      this.stopAmbience();
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseFreqs = [146.83, 220.0, 293.66, 369.99, 440.0]; // D3, A3, D4, F#4, A4 (Warm Heritage Drone)

      this.ambienceMasterGain = this.ctx.createGain();
      this.ambienceMasterGain.gain.setValueAtTime(0.01, now);
      this.ambienceMasterGain.gain.linearRampToValueAtTime(0.12, now + 2.0); // Gentle fade-in
      this.ambienceMasterGain.connect(this.ctx.destination);

      baseFreqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle breathing pulsation (LFO)
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.15 + i * 0.05, now);
        lfoGain.gain.setValueAtTime(0.02, now);

        lfo.connect(oscGain.gain);
        oscGain.gain.setValueAtTime(0.05 / baseFreqs.length, now);

        osc.connect(oscGain);
        oscGain.connect(this.ambienceMasterGain);

        osc.start(now);
        lfo.start(now);

        this.ambienceNodes.push(osc, lfo, oscGain, lfoGain);
      });

      this.isAmbiencePlaying = true;
    }

    stopAmbience() {
      if (!this.isAmbiencePlaying) return;
      const now = this.ctx ? this.ctx.currentTime : 0;

      if (this.ambienceMasterGain && this.ctx) {
        this.ambienceMasterGain.gain.cancelScheduledValues(now);
        this.ambienceMasterGain.gain.setValueAtTime(this.ambienceMasterGain.gain.value, now);
        this.ambienceMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.2);
        setTimeout(() => {
          this.ambienceNodes.forEach((node) => {
            try {
              if (node.stop) node.stop();
              if (node.disconnect) node.disconnect();
            } catch (e) {}
          });
          this.ambienceNodes = [];
          this.isAmbiencePlaying = false;
        }, 220);
      } else {
        this.ambienceNodes.forEach((node) => {
          try {
            if (node.stop) node.stop();
            if (node.disconnect) node.disconnect();
          } catch (e) {}
        });
        this.ambienceNodes = [];
        this.isAmbiencePlaying = false;
      }
    }

    // 6. Natural Indonesian Text-to-Speech (TTS) Story Narrator
    speakStory(text, onStart, onEnd, onBoundary) {
      if (!('speechSynthesis' in window)) {
        alert('Fitur narator suara tidak didukung di browser ini.');
        return false;
      }

      window.speechSynthesis.cancel();

      // Clean HTML tags from content
      const cleanText = text.replace(/<\/?[^>]+(>|$)/g, ' ');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.92; // Calm, respectful storytelling cadence
      utterance.pitch = 1.0;

      // Prefer Indonesian natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID') || v.name.includes('Indonesian'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      if (onBoundary) {
        utterance.onboundary = (e) => {
          if (e.name === 'word') onBoundary(e.charIndex);
        };
      }

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    }

    stopSpeaking() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.isSpeaking = false;
    }
  }

  window.WARISARA_STORY_AUDIO = new StoryAudioEngine();
})();
