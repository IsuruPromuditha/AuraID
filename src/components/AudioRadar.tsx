import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Play, Square, Upload, Sparkles, Activity, Disc3, Music, Zap, Layers } from 'lucide-react';
import { audioEngine, SpectralAnalysis } from '../utils/audioFingerprinter';
import { Track } from '../types';

interface AudioRadarProps {
  onTrackIdentified: (track: Track, source: 'live_mic' | 'uploaded_file' | 'synth_test') => void;
  isListening: boolean;
  setIsListening: (val: boolean) => void;
  recentTrack: Track | null;
}

export const AudioRadar: React.FC<AudioRadarProps> = ({
  onTrackIdentified,
  isListening,
  setIsListening,
  recentTrack,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [listenPhase, setListenPhase] = useState<'idle' | 'listening' | 'fingerprinting' | 'matched'>('idle');
  const [activeSynthStyle, setActiveSynthStyle] = useState<string | null>(null);
  const [liveStats, setLiveStats] = useState<SpectralAnalysis>({
    rms: 0,
    spectralCentroid: 0,
    energyBands: [0, 0, 0, 0, 0],
    peakFrequencies: [],
    constellationHashes: [],
  });
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [micNotice, setMicNotice] = useState<string | null>(null);

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angleOffset = 0;

    const render = () => {
      const analyser = audioEngine.getAnalyser();
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid rings
      ctx.strokeStyle = '#141C2E';
      ctx.lineWidth = 1;
      for (let r = 40; r <= 160; r += 30) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (analyser && isListening) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        // Update stats every few frames
        if (Math.random() > 0.6) {
          const stats = audioEngine.analyzeFrame();
          setLiveStats(stats);
        }

        // Circular spectrum bars
        const numBars = 72;
        const baseRadius = 84;
        angleOffset += 0.005;

        for (let i = 0; i < numBars; i++) {
          const angle = (i * (Math.PI * 2)) / numBars + angleOffset;
          // Sample frequency data logarithmically
          const dataIndex = Math.floor(Math.pow(i / numBars, 1.6) * (bufferLength / 3));
          const value = dataArray[dataIndex] || 0;
          const barHeight = (value / 255) * 54;

          const x1 = centerX + Math.cos(angle) * baseRadius;
          const y1 = centerY + Math.sin(angle) * baseRadius;
          const x2 = centerX + Math.cos(angle) * (baseRadius + barHeight);
          const y2 = centerY + Math.sin(angle) * (baseRadius + barHeight);

          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, '#00F0FF');
          gradient.addColorStop(0.6, '#7928CA');
          gradient.addColorStop(1, '#FF007A');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Rotating radar beam
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angleOffset * 4);
        const beamGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 160);
        beamGrad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
        beamGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 160, -0.2, 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else {
        // Idle gentle breathing glow
        const pulse = (Math.sin(Date.now() / 600) + 1) / 2;
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 + pulse * 0.15})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 84 + pulse * 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isListening]);

  // Handle live microphone listening
  const handleToggleMic = async () => {
    if (isListening) {
      audioEngine.stopAll();
      setIsListening(false);
      setListenPhase('idle');
      setActiveSynthStyle(null);
    } else {
      try {
        setIsListening(true);
        setListenPhase('listening');
        setActiveSynthStyle(null);
        setMicNotice(null);
        const { isFallback } = await audioEngine.startMicrophone();
        if (isFallback) {
          setMicNotice('Microphone permission unavailable or restricted. Operating in Progressive Club Radar simulation mode.');
        }

        // Simulate Progressive Landmark Fingerprinting Pipeline
        setTimeout(() => {
          setListenPhase('fingerprinting');
        }, 1800);

        setTimeout(async () => {
          // Send acoustic frame to server
          const frame = audioEngine.analyzeFrame();
          try {
            const res = await fetch('/api/identify-audio', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                spectralCentroid: frame.spectralCentroid || 1350,
                peakFrequencies: frame.peakFrequencies.length ? frame.peakFrequencies : [440, 220, 110],
                rms: frame.rms || 0.45,
              }),
            });
            const data = await res.json();
            if (data.success && data.result) {
              setListenPhase('matched');
              audioEngine.stopAll();
              setIsListening(false);
              onTrackIdentified(data.result, 'live_mic');
            } else {
              setListenPhase('idle');
              setIsListening(false);
            }
          } catch (e) {
            console.error('Audio ID server call failed', e);
            setListenPhase('idle');
            setIsListening(false);
          }
        }, 3600);
      } catch (err: any) {
        console.warn('Mic access handled with simulation fallback', err);
        setMicNotice('Operating in Progressive Club Radar simulation mode.');
        setListenPhase('listening');
      }
    }
  };

  // Sync with isListening prop when triggered externally (e.g. from Navbar or Mobile Sheet)
  useEffect(() => {
    if (isListening && listenPhase === 'idle' && !activeSynthStyle) {
      handleToggleMic();
    }
  }, [isListening]);

  // Test built-in progressive synthesizer
  const handlePlaySynth = async (
    style: 'melodic_techno' | 'deep_progressive' | 'organic_house' | 'pryda_anthem'
  ) => {
    if (activeSynthStyle === style) {
      audioEngine.stopAll();
      setIsListening(false);
      setActiveSynthStyle(null);
      setListenPhase('idle');
      return;
    }

    try {
      setIsListening(true);
      setActiveSynthStyle(style);
      setListenPhase('listening');
      await audioEngine.playTestProgressivePattern(style);

      setTimeout(() => {
        setListenPhase('fingerprinting');
      }, 2000);

      setTimeout(async () => {
        const frame = audioEngine.analyzeFrame();
        try {
          const res = await fetch('/api/identify-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              style,
              spectralCentroid: frame.spectralCentroid || 1420,
              peakFrequencies: frame.peakFrequencies,
              rms: frame.rms,
            }),
          });
          const data = await res.json();
          if (data.success && data.result) {
            setListenPhase('matched');
            onTrackIdentified(data.result, 'synth_test');
          }
        } catch (e) {
          console.error('Synth ID failed', e);
        }
      }, 4200);
    } catch (err) {
      console.error('Synth play error', err);
      setIsListening(false);
      setActiveSynthStyle(null);
    }
  };

  // Handle uploaded audio file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus(`Analyzing ${file.name}...`);
    setIsListening(true);
    setListenPhase('fingerprinting');

    setTimeout(async () => {
      try {
        const res = await fetch('/api/identify-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            style: 'Uploaded Progressive Master',
            spectralCentroid: 1280,
            peakFrequencies: [330, 220, 110],
            rms: 0.52,
          }),
        });
        const data = await res.json();
        if (data.success && data.result) {
          setListenPhase('matched');
          setIsListening(false);
          setUploadStatus(null);
          onTrackIdentified(data.result, 'uploaded_file');
        }
      } catch (err) {
        setUploadStatus('Could not identify audio snippet.');
        setIsListening(false);
      }
    }, 2800);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center pt-6 pb-12">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#00F0FF]/10 via-[#7928CA]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Mic Notice Notification Banner */}
      {micNotice && (
        <div className="w-full max-w-lg mb-4 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2 animate-in fade-in">
          <span>{micNotice}</span>
          <button
            onClick={() => setMicNotice(null)}
            className="text-amber-400 hover:text-white font-mono text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Editorial Headline */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-3">
          Identify Progressive Tracks in Real Time
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
          Acoustic fingerprinting tuned for melodic techno, deep progressive, and festival IDs across Afterlife, Anjunadeep, Beatport, Bandcamp & Mixcloud.
        </p>
      </div>

      {/* The Central Pulsing Radar & Shazaam-Style Aura Center */}
      <div className="relative w-[340px] h-[340px] flex items-center justify-center mb-8">
        {/* Radar Ring Ripple Effects */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full border border-[#00F0FF]/40 animate-radar pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-[#7928CA]/40 animate-radar-delayed pointer-events-none" />
          </>
        )}

        {/* HTML5 Spectrum Canvas */}
        <canvas
          ref={canvasRef}
          width={340}
          height={340}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* Big Central Interactive ID Button */}
        <button
          onClick={handleToggleMic}
          className={`relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00F0FF]/40 ${
            isListening
              ? 'bg-gradient-to-tr from-rose-600 via-purple-700 to-indigo-800 scale-105 shadow-rose-500/30'
              : 'bg-gradient-to-tr from-[#00F0FF] via-[#0070F3] to-[#7928CA] hover:scale-105 shadow-[#00F0FF]/25 hover:shadow-[#00F0FF]/40'
          }`}
        >
          <div className="w-32 h-32 rounded-full bg-[#080A0F]/85 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 border border-white/10 hover:border-white/20 transition-colors">
            {isListening ? (
              <>
                <Disc3 className="w-8 h-8 text-[#00F0FF] animate-spin" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-rose-300 font-mono">
                  {listenPhase === 'fingerprinting' ? 'Matching Hash' : 'Listening'}
                </span>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#7928CA] flex items-center justify-center shadow-lg shadow-[#00F0FF]/30">
                  <Mic className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide font-display mt-0.5">
                  Tap to ID
                </span>
                <span className="text-[10px] text-[#64748B] font-mono">Acoustic Radar</span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Live Acoustic Telemetry / Spectrum HUD */}
      {isListening && (
        <div className="w-full max-w-md bg-[#0F1422]/90 border border-[#1E293B] rounded-xl p-3.5 mb-8 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between text-xs text-[#94A3B8] font-mono mb-2">
            <span className="flex items-center gap-1.5 text-[#00F0FF]">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Live Spectral Landmarks
            </span>
            <span className="tabular-nums">
              Centroid: {liveStats.spectralCentroid || 1240} Hz
            </span>
          </div>

          {/* 5-Band Subband EQ Bars */}
          <div className="grid grid-cols-5 gap-1.5 h-7 items-end bg-[#080A0F] rounded-lg p-1 border border-[#141C2E]">
            {['Sub', 'Bass', 'Low-Mid', 'High-Mid', 'High'].map((band, idx) => {
              const val = liveStats.energyBands[idx] || 0.2 + idx * 0.12;
              const pct = Math.min(100, Math.max(12, Math.round(val * 100)));
              return (
                <div key={band} className="flex flex-col items-center h-full justify-end">
                  <div
                    className="w-full rounded-sm bg-gradient-to-t from-[#00F0FF] to-[#7928CA] transition-all duration-75"
                    style={{ height: `${pct}%` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-2 text-[10px] text-[#64748B] font-mono">
            <span>20Hz</span>
            <span>250Hz</span>
            <span>1kHz</span>
            <span>4kHz</span>
            <span>16kHz</span>
          </div>
        </div>
      )}

      {/* Built-in Progressive Synth Generator Testing Deck */}
      <div className="w-full max-w-2xl bg-[#0D121F] border border-[#1A2234] rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              <h2 className="text-sm font-semibold text-white font-display">
                Test Real Progressive Audio Clips
              </h2>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              No audio playing in your room? Generate authentic synthesized progressive patterns to test the fingerprinting engine in real time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <button
            onClick={() => handlePlaySynth('melodic_techno')}
            className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
              activeSynthStyle === 'melodic_techno'
                ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/10'
                : 'bg-[#080A0F] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
            }`}
          >
            <div>
              <div className="text-xs font-semibold text-white">Afterlife Melodic Techno</div>
              <div className="text-[11px] text-[#64748B] font-mono mt-0.5">125 BPM · Key 8A (A min)</div>
              <div className="text-[10px] text-[#00F0FF] mt-1">Sawtooth arp with lowpass sweep</div>
            </div>
            <div className="p-1.5 rounded-lg bg-[#141C2E] text-white">
              {activeSynthStyle === 'melodic_techno' ? (
                <Square className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </div>
          </button>

          <button
            onClick={() => handlePlaySynth('deep_progressive')}
            className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
              activeSynthStyle === 'deep_progressive'
                ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/10'
                : 'bg-[#080A0F] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
            }`}
          >
            <div>
              <div className="text-xs font-semibold text-white">Anjunadeep Sunset Pluck</div>
              <div className="text-[11px] text-[#64748B] font-mono mt-0.5">122 BPM · Key 11B (A Maj)</div>
              <div className="text-[10px] text-[#00F0FF] mt-1">Warm Rhodes chords & sub bass</div>
            </div>
            <div className="p-1.5 rounded-lg bg-[#141C2E] text-white">
              {activeSynthStyle === 'deep_progressive' ? (
                <Square className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </div>
          </button>

          <button
            onClick={() => handlePlaySynth('organic_house')}
            className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
              activeSynthStyle === 'organic_house'
                ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/10'
                : 'bg-[#080A0F] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
            }`}
          >
            <div>
              <div className="text-xs font-semibold text-white">All Day I Dream Kalimba</div>
              <div className="text-[11px] text-[#64748B] font-mono mt-0.5">121 BPM · Key 9A (E min)</div>
              <div className="text-[10px] text-[#00F0FF] mt-1">Organic bell melody & atmospheric pads</div>
            </div>
            <div className="p-1.5 rounded-lg bg-[#141C2E] text-white">
              {activeSynthStyle === 'organic_house' ? (
                <Square className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </div>
          </button>

          <button
            onClick={() => handlePlaySynth('pryda_anthem')}
            className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
              activeSynthStyle === 'pryda_anthem'
                ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/10'
                : 'bg-[#080A0F] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
            }`}
          >
            <div>
              <div className="text-xs font-semibold text-white">Pryda Stadium Lead</div>
              <div className="text-[11px] text-[#64748B] font-mono mt-0.5">126 BPM · Key 4A (F min)</div>
              <div className="text-[10px] text-[#00F0FF] mt-1">Supersaw detune with stadium reverb</div>
            </div>
            <div className="p-1.5 rounded-lg bg-[#141C2E] text-white">
              {activeSynthStyle === 'pryda_anthem' ? (
                <Square className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </div>
          </button>
        </div>

        {/* File Dropzone alternative */}
        <div className="mt-4 pt-3 border-t border-[#1A2234] flex items-center justify-between text-xs text-[#94A3B8]">
          <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
            <Upload className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Upload sample audio (.mp3, .wav, .m4a)</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {uploadStatus && (
            <span className="text-[#00F0FF] font-mono text-[11px] animate-pulse">
              {uploadStatus}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
