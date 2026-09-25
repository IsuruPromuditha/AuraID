/**
 * Audio Fingerprinting & Web Audio Analysis Engine
 * Real-time FFT spectral peak picking, landmark constellation generation,
 * and authentic progressive electronic synth generator.
 */

export interface SpectralAnalysis {
  rms: number; // Volume level 0..1
  spectralCentroid: number; // Center of mass frequency
  energyBands: [number, number, number, number, number]; // [sub, bass, lowMid, highMid, high]
  peakFrequencies: number[];
  constellationHashes: string[];
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private synthGain: GainNode | null = null;
  private isSynthesizing: boolean = false;
  private synthInterval: any = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private recordingStartTime: number = 0;
  private accumulatedHashes: Set<string> = new Set();
  private speechRecognition: any = null;

  public async getAudioContext(): Promise<AudioContext> {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Start live microphone input for listening and acoustic fingerprinting.
   * If mic permission is denied or unavailable (e.g. inside an iframe or browser restriction),
   * seamlessly falls back to the Progressive Club Audio Scanner so identification never crashes.
   */
  public async startMicrophone(): Promise<{ analyser: AnalyserNode; isFallback: boolean }> {
    const ctx = await this.getAudioContext();
    this.stopAll();
    this.accumulatedHashes.clear();
    this.recordedChunks = [];
    this.recordingStartTime = Date.now();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported on this device/environment');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      this.micStream = stream;

      // Start MediaRecorder if supported for raw high-resolution audio upload to Gemini
      if (typeof MediaRecorder !== 'undefined') {
        try {
          const supportedType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : MediaRecorder.isTypeSupported('audio/mp4')
            ? 'audio/mp4'
            : '';
          const options = supportedType ? { mimeType: supportedType } : undefined;
          this.mediaRecorder = new MediaRecorder(stream, options);
          this.mediaRecorder.ondataavailable = (evt) => {
            if (evt.data && evt.data.size > 0) {
              this.recordedChunks.push(evt.data);
            }
          };
          this.mediaRecorder.start(200); // 200ms slice
        } catch (recErr) {
          console.warn('MediaRecorder init fallback:', recErr);
        }
      }

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.85;

      source.connect(analyser);
      this.analyser = analyser;
      return { analyser, isFallback: false };
    } catch (err: any) {
      console.warn('Microphone permission denied or unavailable. Engaging Progressive Acoustic Radar Simulation:', err?.message || err);
      // Fallback: Generate real-time progressive club acoustic spectrum via Web Audio oscillator
      const analyser = await this.startSimulatedAcousticScanner();
      return { analyser, isFallback: true };
    }
  }

  /**
   * Stop microphone recording and export audio as base64 string
   */
  public async stopMicrophoneAndGetAudio(): Promise<{
    base64Audio: string | null;
    mimeType: string;
    durationSeconds: number;
  }> {
    const duration = (Date.now() - (this.recordingStartTime || Date.now())) / 1000;
    let mimeType = 'audio/webm';

    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.stopAll();
        return resolve({
          base64Audio: null,
          mimeType,
          durationSeconds: Math.max(1, Math.round(duration * 10) / 10),
        });
      }

      this.mediaRecorder.onstop = async () => {
        try {
          const blobType = this.mediaRecorder?.mimeType || 'audio/webm';
          mimeType = blobType.split(';')[0];
          const blob = new Blob(this.recordedChunks, { type: blobType });
          const reader = new FileReader();
          reader.onloadend = () => {
            const resultStr = reader.result as string;
            const base64Data = resultStr ? resultStr.split(',')[1] : null;
            this.stopAll();
            resolve({
              base64Audio: base64Data,
              mimeType,
              durationSeconds: Math.max(1, Math.round(duration * 10) / 10),
            });
          };
          reader.onerror = () => {
            this.stopAll();
            resolve({
              base64Audio: null,
              mimeType,
              durationSeconds: Math.max(1, Math.round(duration * 10) / 10),
            });
          };
          reader.readAsDataURL(blob);
        } catch (e) {
          this.stopAll();
          resolve({
            base64Audio: null,
            mimeType,
            durationSeconds: Math.max(1, Math.round(duration * 10) / 10),
          });
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch (e) {
        this.stopAll();
        resolve({
          base64Audio: null,
          mimeType,
          durationSeconds: Math.max(1, Math.round(duration * 10) / 10),
        });
      }
    });
  }

  /**
   * Start live speech/vocal recognition during recording
   */
  public startVoiceTranscription(onTranscript: (phrase: string) => void): () => void {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return () => {};
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          onTranscript(transcript.trim());
        }
      };

      recognition.onerror = () => {
        // Silently ignore speech recognition errors
      };

      recognition.start();
      this.speechRecognition = recognition;

      return () => {
        try {
          recognition.stop();
        } catch (e) {
          // ignore
        }
        this.speechRecognition = null;
      };
    } catch (e) {
      return () => {};
    }
  }

  /**
   * Real-time vocal / synth pitch detection using autocorrelation & harmonic peak analysis
   */
  public detectVoicePitch(): {
    frequency: number;
    note: string;
    camelot: string;
    clarity: number;
  } {
    if (!this.analyser || !this.ctx) {
      return { frequency: 440, note: 'A4', camelot: '8A', clarity: 0 };
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const timeData = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(timeData);

    // Autocorrelation to estimate pitch
    let bestR = 0;
    let bestOffset = -1;
    const sampleRate = this.ctx.sampleRate;
    const minOffset = Math.floor(sampleRate / 800); // 800 Hz (soprano/high synth)
    const maxOffset = Math.floor(sampleRate / 65);  // 65 Hz (bass/male low hum)

    for (let offset = minOffset; offset < maxOffset; offset += 2) {
      let correlation = 0;
      for (let i = 0; i < bufferLength - offset; i += 4) {
        const val1 = (timeData[i] - 128) / 128;
        const val2 = (timeData[i + offset] - 128) / 128;
        correlation += val1 * val2;
      }
      if (correlation > bestR) {
        bestR = correlation;
        bestOffset = offset;
      }
    }

    const frequency = bestOffset > 0 ? Math.round(sampleRate / bestOffset) : 220;
    const clarity = Math.min(1, Math.max(0, bestR / 50));

    // Convert frequency to musical note & Camelot key
    const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const midiNum = Math.round(12 * (Math.log2(frequency / 440)) + 69);
    const noteName = noteStrings[(midiNum % 12 + 12) % 12];
    const octave = Math.floor(midiNum / 12) - 1;
    const note = `${noteName}${octave}`;

    // Camelot mapping
    const camelotMap: Record<string, string> = {
      'A': '8A (A min)',
      'A#': '3A (Bb min)',
      'B': '10A (B min)',
      'C': '5A (C min)',
      'C#': '12A (Db min)',
      'D': '7A (D min)',
      'D#': '2A (Eb min)',
      'E': '9A (E min)',
      'F': '4A (F min)',
      'F#': '11A (F# min)',
      'G': '6A (G min)',
      'G#': '1A (Ab min)',
    };

    return {
      frequency,
      note,
      camelot: camelotMap[noteName] || '8A (A min)',
      clarity,
    };
  }

  public getAccumulatedLandmarkCount(): number {
    return this.accumulatedHashes.size;
  }

  /**
   * Simulated Progressive Club Audio Scanner
   * Provides real audio node processing and FFT data even if user denies mic permission
   */
  public async startSimulatedAcousticScanner(): Promise<AnalyserNode> {
    const ctx = await this.getAudioContext();
    this.stopAll();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime); // Inaudible or subtle so it doesn't disturb user

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.85;

    // Create an audio simulation signal (pink noise + resonant melodic peak)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(440, ctx.currentTime);
    filter.Q.setValueAtTime(3.0, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(analyser);

    whiteNoise.start();

    this.analyser = analyser;
    this.synthGain = masterGain;
    this.isSynthesizing = true;

    return analyser;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  /**
   * Extract spectral landmarks and acoustic features from active analyser
   */
  public analyzeFrame(): SpectralAnalysis {
    if (!this.analyser || !this.ctx) {
      return {
        rms: 0,
        spectralCentroid: 0,
        energyBands: [0, 0, 0, 0, 0],
        peakFrequencies: [],
        constellationHashes: [],
      };
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const freqData = new Uint8Array(bufferLength);
    const timeData = new Uint8Array(bufferLength);

    this.analyser.getByteFrequencyData(freqData);
    this.analyser.getByteTimeDomainData(timeData);

    // RMS Calculation
    let sumSquares = 0;
    for (let i = 0; i < bufferLength; i++) {
      const normalized = (timeData[i] - 128) / 128;
      sumSquares += normalized * normalized;
    }
    const rms = Math.min(1, Math.sqrt(sumSquares / bufferLength) * 2.5);

    // Energy distribution across 5 subbands
    // Nyquist is ctx.sampleRate / 2 (typically 24000 or 22050 Hz)
    const nyquist = this.ctx.sampleRate / 2;
    const hzPerBin = nyquist / bufferLength;

    let subSum = 0, subCount = 0;
    let bassSum = 0, bassCount = 0;
    let lowMidSum = 0, lowMidCount = 0;
    let highMidSum = 0, highMidCount = 0;
    let highSum = 0, highCount = 0;

    let weightedSum = 0;
    let totalMagnitude = 0;

    const peaks: { freq: number; mag: number }[] = [];

    for (let i = 0; i < bufferLength; i++) {
      const freq = i * hzPerBin;
      const mag = freqData[i] / 255;

      weightedSum += freq * mag;
      totalMagnitude += mag;

      if (freq >= 20 && freq < 80) {
        subSum += mag;
        subCount++;
      } else if (freq >= 80 && freq < 250) {
        bassSum += mag;
        bassCount++;
      } else if (freq >= 250 && freq < 1000) {
        lowMidSum += mag;
        lowMidCount++;
      } else if (freq >= 1000 && freq < 4000) {
        highMidSum += mag;
        highMidCount++;
      } else if (freq >= 4000) {
        highSum += mag;
        highCount++;
      }

      // Local peak detection
      if (i > 2 && i < bufferLength - 2) {
        if (
          freqData[i] > 110 &&
          freqData[i] > freqData[i - 1] &&
          freqData[i] > freqData[i + 1] &&
          freqData[i] > freqData[i - 2] &&
          freqData[i] > freqData[i + 2]
        ) {
          peaks.push({ freq: Math.round(freq), mag });
        }
      }
    }

    // Sort peaks by magnitude descending
    peaks.sort((a, b) => b.mag - a.mag);
    const topPeaks = peaks.slice(0, 6).map((p) => p.freq);

    const spectralCentroid = totalMagnitude > 0 ? Math.round(weightedSum / totalMagnitude) : 0;

    const sub = subCount > 0 ? subSum / subCount : 0;
    const bass = bassCount > 0 ? bassSum / bassCount : 0;
    const lowMid = lowMidCount > 0 ? lowMidSum / lowMidCount : 0;
    const highMid = highMidCount > 0 ? highMidSum / highMidCount : 0;
    const high = highCount > 0 ? highSum / highCount : 0;

    // Constellation hashes (e.g. "F1:F2:dt" landmark pairs)
    const hashes: string[] = [];
    for (let j = 0; j < topPeaks.length - 1; j++) {
      const p1 = topPeaks[j];
      const p2 = topPeaks[j + 1];
      const hashStr = `${Math.floor(p1 / 10)}_${Math.floor(p2 / 10)}`;
      hashes.push(hashStr);
      this.accumulatedHashes.add(hashStr);
    }

    return {
      rms,
      spectralCentroid,
      energyBands: [sub, bass, lowMid, highMid, high],
      peakFrequencies: topPeaks,
      constellationHashes: hashes,
    };
  }

  /**
   * Built-in Progressive Electronic Synthesizer Generator
   * Generates melodic progressive sequences to test real-time listening & fingerprinting
   */
  public async playTestProgressivePattern(
    style: 'melodic_techno' | 'deep_progressive' | 'organic_house' | 'pryda_anthem'
  ): Promise<AnalyserNode> {
    const ctx = await this.getAudioContext();
    this.stopAll();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.4, ctx.currentTime);

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.85;

    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    this.analyser = analyser;
    this.synthGain = masterGain;
    this.isSynthesizing = true;

    // Define chord arpeggios per style
    let bpm = 124;
    let notes: number[] = []; // MIDI note frequencies

    if (style === 'melodic_techno') {
      // Anyma / Afterlife vibe: A minor arp (A2, C3, E3, G3, B3, A3, E3, C3)
      bpm = 125;
      notes = [110.0, 130.81, 164.81, 196.0, 246.94, 220.0, 164.81, 130.81];
    } else if (style === 'deep_progressive') {
      // Ben Böhmer / Anjunadeep vibe: D minor / F Major (D3, F3, A3, C4, D4, C4, A3, F3)
      bpm = 122;
      notes = [146.83, 174.61, 220.0, 261.63, 293.66, 261.63, 220.0, 174.61];
    } else if (style === 'organic_house') {
      // All Day I Dream vibe: G minor warm kalimba pentatonic
      bpm = 121;
      notes = [196.0, 233.08, 261.63, 293.66, 349.23, 293.66, 261.63, 233.08];
    } else {
      // Pryda stadium anthem: F minor soaring supersaw
      bpm = 126;
      notes = [174.61, 207.65, 261.63, 311.13, 349.23, 415.3, 349.23, 261.63];
    }

    const stepDuration = 60 / bpm / 2; // 8th notes
    let stepIndex = 0;

    const playStep = () => {
      if (!this.isSynthesizing || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentFreq = notes[stepIndex % notes.length];

      // 1. Kick on every quarter note (step 0, 2, 4, 6)
      if (stepIndex % 2 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(140, now);
        kickOsc.frequency.exponentialRampToValueAtTime(38, now + 0.12);
        kickGain.gain.setValueAtTime(0.7, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        kickOsc.connect(kickGain);
        kickGain.connect(masterGain);
        kickOsc.start(now);
        kickOsc.stop(now + 0.25);
      }

      // 2. Progressive Lead Arpeggio
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const noteGain = this.ctx.createGain();

      osc.type = style === 'melodic_techno' || style === 'pryda_anthem' ? 'sawtooth' : 'triangle';
      osc2.type = 'sawtooth';
      osc.frequency.setValueAtTime(currentFreq, now);
      // Slight detune for thick analog chorus
      osc2.frequency.setValueAtTime(currentFreq * 1.008, now);

      filter.type = 'lowpass';
      const cutoff = 800 + Math.sin(stepIndex * 0.15) * 600;
      filter.frequency.setValueAtTime(cutoff, now);
      filter.Q.setValueAtTime(4, now);

      noteGain.gain.setValueAtTime(0.3, now);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 1.8);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + stepDuration * 2);
      osc2.stop(now + stepDuration * 2);

      // 3. Deep progressive bass on offbeat
      if (stepIndex % 2 === 1) {
        const bassOsc = this.ctx.createOscillator();
        const bassFilter = this.ctx.createBiquadFilter();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(currentFreq / 2, now);
        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(220, now);
        bassGain.gain.setValueAtTime(0.35, now);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + stepDuration);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + stepDuration);
      }

      stepIndex++;
    };

    // Schedule ticker
    const intervalMs = stepDuration * 1000;
    this.synthInterval = setInterval(playStep, intervalMs);
    playStep();

    return analyser;
  }

  /**
   * Play any curated progressive track with its authentic key, BPM, and subgenre arrangement
   */
  public async playHarmonicTrack(
    track: { title: string; bpm?: number; musicalKey?: string; subGenre?: string; recordLabel?: string }
  ): Promise<AnalyserNode> {
    const ctx = await this.getAudioContext();
    this.stopAll();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.42, ctx.currentTime);

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.85;

    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    this.analyser = analyser;
    this.synthGain = masterGain;
    this.isSynthesizing = true;

    const bpm = track.bpm && track.bpm >= 115 && track.bpm <= 135 ? track.bpm : 124;
    const keyStr = (track.musicalKey || '').toUpperCase();
    const genre = (track.subGenre || '').toLowerCase();
    const label = (track.recordLabel || '').toLowerCase();

    // Map musical key or label to root frequencies
    let rootFreq = 220.0; // Default A3 (8A)
    if (keyStr.includes('7A') || keyStr.includes('D MIN')) rootFreq = 146.83; // D3
    else if (keyStr.includes('8A') || keyStr.includes('A MIN')) rootFreq = 220.0; // A3
    else if (keyStr.includes('9A') || keyStr.includes('E MIN')) rootFreq = 164.81; // E3
    else if (keyStr.includes('10A') || keyStr.includes('B MIN')) rootFreq = 246.94; // B3
    else if (keyStr.includes('11A') || keyStr.includes('F# MIN')) rootFreq = 185.0; // F#3
    else if (keyStr.includes('11B') || keyStr.includes('A MAJ')) rootFreq = 220.0; // A3 Major
    else if (keyStr.includes('4A') || keyStr.includes('F MIN')) rootFreq = 174.61; // F3
    else if (keyStr.includes('2A') || keyStr.includes('EB MIN') || keyStr.includes('D# MIN')) rootFreq = 155.56; // Eb3
    else if (keyStr.includes('6A') || keyStr.includes('G MIN')) rootFreq = 196.0; // G3

    // Determine scale intervals (Minor or Major pentatonic/arpeggio)
    const isMajor = keyStr.includes('B') || keyStr.includes('MAJ');
    const scaleRatios = isMajor
      ? [1, 1.125, 1.25, 1.5, 1.667, 2, 1.5, 1.25] // Major
      : [1, 1.2, 1.333, 1.5, 1.778, 2, 1.5, 1.2]; // Minor

    const notes = scaleRatios.map((r) => rootFreq * r);

    // Instrument style selection based on genre/label
    const isEthereal = genre.includes('organic') || label.includes('all day i dream') || label.includes('cercle');
    const isHeavySaw = genre.includes('techno') || label.includes('afterlife') || label.includes('pryda');

    const stepDuration = 60 / bpm / 2; // 8th note
    let stepIndex = 0;

    const playStep = () => {
      if (!this.isSynthesizing || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentFreq = notes[stepIndex % notes.length];

      // 1. Kick on every quarter beat (steps 0, 2, 4, 6)
      if (stepIndex % 2 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(130, now);
        kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.11);
        kickGain.gain.setValueAtTime(0.65, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        kickOsc.connect(kickGain);
        kickGain.connect(masterGain);
        kickOsc.start(now);
        kickOsc.stop(now + 0.25);
      }

      // 2. Progressive Lead Arpeggio
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const noteGain = this.ctx.createGain();

      osc.type = isEthereal ? 'sine' : isHeavySaw ? 'sawtooth' : 'triangle';
      osc2.type = isEthereal ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(currentFreq, now);
      osc2.frequency.setValueAtTime(currentFreq * 1.006, now); // Chorused detune

      filter.type = 'lowpass';
      const cutoff = isEthereal
        ? 1200 + Math.sin(stepIndex * 0.2) * 400
        : 900 + Math.sin(stepIndex * 0.15) * 700;
      filter.frequency.setValueAtTime(cutoff, now);
      filter.Q.setValueAtTime(isEthereal ? 2 : 4.5, now);

      noteGain.gain.setValueAtTime(isEthereal ? 0.28 : 0.32, now);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 1.7);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + stepDuration * 1.8);
      osc2.stop(now + stepDuration * 1.8);

      // 3. Progressive Sub-Bass on offbeat (steps 1, 3, 5, 7)
      if (stepIndex % 2 === 1) {
        const bassOsc = this.ctx.createOscillator();
        const bassFilter = this.ctx.createBiquadFilter();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(rootFreq / 2, now);
        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(180, now);
        bassGain.gain.setValueAtTime(0.38, now);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + stepDuration);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(masterGain);
        bassOsc.start(now);
        bassOsc.stop(now + stepDuration);
      }

      stepIndex++;
    };

    const intervalMs = stepDuration * 1000;
    this.synthInterval = setInterval(playStep, intervalMs);
    playStep();

    return analyser;
  }

  /**
   * Stop all audio synthesis, recording, and mic streams
   */
  public stopAll() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.speechRecognition) {
      try {
        this.speechRecognition.stop();
      } catch (e) {
        // ignore
      }
      this.speechRecognition = null;
    }
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        // ignore
      }
      this.mediaRecorder = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      this.micStream = null;
    }
    if (this.synthGain) {
      try {
        this.synthGain.disconnect();
      } catch (e) {
        // ignore
      }
      this.synthGain = null;
    }
  }
}

export const audioEngine = new AudioEngine();
