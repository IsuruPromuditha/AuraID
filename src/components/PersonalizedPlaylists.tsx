import React, { useState } from 'react';
import {
  Sparkles,
  Music,
  Share2,
  ExternalLink,
  Download,
  Check,
  Disc3,
  Sliders,
  Layers,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { Track } from '../types';

interface CuratedTrack {
  title: string;
  artist: string;
  recordLabel: string;
  musicalKey: string;
  bpm: number;
  subGenre: string;
  reasoning?: string;
}

interface CuratedJourney {
  playlistTitle: string;
  curatorNote: string;
  harmonicFlowDescription: string;
  tracks: CuratedTrack[];
}

interface PersonalizedPlaylistsProps {
  seedTrack: Track | null;
  onSelectTrackByTitle: (title: string) => void;
}

export const PersonalizedPlaylists: React.FC<PersonalizedPlaylistsProps> = ({
  seedTrack,
  onSelectTrackByTitle,
}) => {
  const [targetVibe, setTargetVibe] = useState('Peak-Time Melodic to Deep Sunrise');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([
    'Afterlife',
    'Anjunadeep',
    'Lost & Found',
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [journey, setJourney] = useState<CuratedJourney | null>(null);
  const [exportedSpotify, setExportedSpotify] = useState(false);
  const [exportedApple, setExportedApple] = useState(false);

  const availableLabels = [
    'Afterlife',
    'Anjunadeep',
    'Bedrock Records',
    'Lost & Found',
    'Innervisions',
    'Cercle Records',
    'All Day I Dream',
    'Pryda Recordings',
    'Sudbeat Music',
    'Monstercat Silk',
  ];

  const handleToggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleGenerateJourney = async () => {
    setIsLoading(true);
    setExportedSpotify(false);
    setExportedApple(false);

    try {
      const res = await fetch('/api/curate-progressive-journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seedTrackTitle: seedTrack
            ? `${seedTrack.title} by ${seedTrack.artist} (${seedTrack.recordLabel})`
            : 'Explore Your Future by Anyma (Afterlife)',
          targetVibe,
          preferredLabels: selectedLabels,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setJourney(data.data);
      }
    } catch (e) {
      console.error('Curate failed', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportSpotify = () => {
    setExportedSpotify(true);
    setTimeout(() => {
      window.open('https://open.spotify.com', '_blank');
    }, 400);
  };

  const handleExportApple = () => {
    setExportedApple(true);
    setTimeout(() => {
      window.open('https://music.apple.com', '_blank');
    }, 400);
  };

  const handleDownloadM3U = () => {
    if (!journey) return;
    const lines = ['#EXTM3U', `#PLAYLIST:${journey.playlistTitle}`];
    journey.tracks.forEach((t) => {
      lines.push(`#EXTINF:360,${t.artist} - ${t.title} [Key: ${t.musicalKey}, ${t.bpm} BPM, ${t.recordLabel}]`);
      lines.push(`https://www.beatport.com/search?q=${encodeURIComponent(`${t.artist} ${t.title}`)}`);
    });
    const blob = new Blob([lines.join('\n')], { type: 'audio/x-mpegurl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${journey.playlistTitle.replace(/\s+/g, '_')}.m3u8`;
    a.click();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
          Harmonic Flow & AI Playlist Curation
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
          Construct mathematically harmonic progressive DJ journeys using Camelot wheel key progressions (8A → 9A → 10A) and your identified sound profile.
        </p>
      </div>

      {/* Curation Configuration Panel */}
      <div className="bg-[#0D121F] border border-[#1A2234] rounded-2xl p-6 mb-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Seed Track Context */}
          <div className="md:col-span-4">
            <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5">
              Seed Inspiration Track
            </label>
            <div className="p-3.5 bg-[#080A0F] border border-[#1E293B] rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#00F0FF] to-[#7928CA] flex items-center justify-center font-bold text-black text-sm shrink-0">
                <Disc3 className="w-5 h-5 animate-spin" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">
                  {seedTrack ? seedTrack.title : 'Explore Your Future (Extended Mix)'}
                </div>
                <div className="text-[11px] text-[#94A3B8] font-mono truncate">
                  {seedTrack ? `${seedTrack.artist} · ${seedTrack.musicalKey}` : 'Anyma · Key 8A · 125 BPM'}
                </div>
              </div>
            </div>

            {/* Target Set Vibe */}
            <div className="mt-4">
              <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1.5">
                Target Journey Arc
              </label>
              <select
                value={targetVibe}
                onChange={(e) => setTargetVibe(e.target.value)}
                className="w-full py-2 px-3 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white focus:border-[#00F0FF] focus:outline-none"
              >
                <option value="Peak-Time Melodic to Deep Sunrise">
                  Peak-Time Melodic to Deep Sunrise (Afterlife → Anjunadeep)
                </option>
                <option value="Hypnotic Underground Marathon">
                  Hypnotic Underground Marathon (Guy J / Lost & Found style)
                </option>
                <option value="Stadium Progressive Anthems">
                  Stadium Progressive Anthems (Eric Prydz / Pryda style)
                </option>
                <option value="Sunset Organic Daydream">
                  Sunset Organic Daydream (All Day I Dream / Cercle style)
                </option>
              </select>
            </div>
          </div>

          {/* Preferred Record Labels Selector */}
          <div className="md:col-span-8">
            <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-2">
              Select Record Labels for Harmonic Matching:
            </label>
            <div className="flex flex-wrap gap-2 mb-5">
              {availableLabels.map((lbl) => {
                const active = selectedLabels.includes(lbl);
                return (
                  <button
                    key={lbl}
                    onClick={() => handleToggleLabel(lbl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]'
                        : 'bg-[#080A0F] text-[#94A3B8] border border-[#1E293B] hover:text-white'
                    }`}
                  >
                    {lbl}
                  </button>
                );
              })}
            </div>

            {/* Generate Trigger */}
            <button
              onClick={handleGenerateJourney}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] via-[#0070F3] to-[#7928CA] text-black font-bold text-xs uppercase tracking-wider font-display flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg shadow-[#00F0FF]/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{isLoading ? 'Synthesizing Harmonic Flow...' : 'Generate Progressive Journey'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Journey Showcase */}
      {journey && (
        <div className="bg-[#0D121F] border border-[#1A2234] rounded-2xl p-6 mb-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#1A2234]">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#00F0FF]" />
                <h2 className="text-xl font-bold text-white font-display">
                  {journey.playlistTitle}
                </h2>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
                {journey.curatorNote}
              </p>
              <div className="text-[11px] text-[#00F0FF] font-mono mt-1">
                {journey.harmonicFlowDescription}
              </div>
            </div>

            {/* Export Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportSpotify}
                className="px-3.5 py-2 rounded-xl bg-[#1DB954] text-black text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 transition-opacity"
              >
                {exportedSpotify ? <Check className="w-3.5 h-3.5" /> : null}
                <span>Export to Spotify</span>
              </button>

              <button
                onClick={handleExportApple}
                className="px-3.5 py-2 rounded-xl bg-[#FA243C] text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 transition-opacity"
              >
                {exportedApple ? <Check className="w-3.5 h-3.5" /> : null}
                <span>Export to Apple Music</span>
              </button>

              <button
                onClick={handleDownloadM3U}
                className="px-3.5 py-2 rounded-xl bg-[#141C2E] border border-[#1E293B] text-white text-xs font-mono hover:bg-[#1E293B] flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>DJ M3U</span>
              </button>
            </div>
          </div>

          {/* Ordered Track List with Camelot progression */}
          <div className="space-y-3">
            {journey.tracks.map((t, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#080A0F] border border-[#1A2234] hover:border-[#334155] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#141C2E] text-xs font-mono font-bold text-[#00F0FF] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-white font-display">
                        {t.title}
                      </h3>
                      <span className="text-[11px] text-[#94A3B8]">— {t.artist}</span>
                    </div>
                    {t.reasoning && (
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {t.reasoning}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-[#94A3B8]">{t.recordLabel}</span>
                  <span className="px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] font-bold">
                    {t.musicalKey}
                  </span>
                  <span className="text-[#64748B]">{t.bpm} BPM</span>
                  <button
                    onClick={() => onSelectTrackByTitle(t.title)}
                    className="text-xs text-[#00F0FF] hover:underline font-mono"
                  >
                    View ID →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Camelot Wheel Harmonic Reference Guide */}
      <div className="p-5 rounded-2xl bg-[#080A0F] border border-[#141C2E]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-mono mb-2">
          DJ Harmonic Mixing & Camelot Wheel Principle
        </h3>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          Mixing tracks within the same Camelot key (e.g. 8A to 8A) or adjacent keys (8A to 9A, or relative major 8A to 8B) ensures smooth harmonic transitions without clashing frequencies or discordant dissonances, fundamental to Afterlife and Anjunadeep sets.
        </p>
      </div>
    </div>
  );
};
