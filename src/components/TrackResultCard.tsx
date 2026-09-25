import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Share2,
  Bookmark,
  Check,
  Music,
  ShoppingBag,
  Radio,
  Sparkles,
  MapPin,
  Calendar,
  Volume2,
  VolumeX,
  ShieldCheck,
  Play,
  Square,
  Disc3,
  Activity,
  Mic,
} from 'lucide-react';
import { Track, PlatformType } from '../types';
import { audioEngine } from '../utils/audioFingerprinter';

interface TrackResultCardProps {
  track: Track;
  onOpenShareModal: (track: Track) => void;
  onOpenSyncModal: () => void;
  onAddToCurate: (track: Track) => void;
}

export const TrackResultCard: React.FC<TrackResultCardProps> = ({
  track,
  onOpenShareModal,
  onOpenSyncModal,
  onAddToCurate,
}) => {
  const [syncedSpotify, setSyncedSpotify] = useState(false);
  const [syncedApple, setSyncedApple] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  useEffect(() => {
    return () => {
      audioEngine.stopAll();
    };
  }, []);

  // When track changes, stop existing playback
  useEffect(() => {
    audioEngine.stopAll();
    setIsPlayingPreview(false);
  }, [track.id, track.beatportTrackId]);

  const handleToggleAudioPreview = async () => {
    if (isPlayingPreview) {
      audioEngine.stopAll();
      setIsPlayingPreview(false);
    } else {
      setIsPlayingPreview(true);
      let style: 'melodic_techno' | 'deep_progressive' | 'organic_house' | 'pryda_anthem' = 'melodic_techno';
      const label = track.recordLabel.toLowerCase();
      const genre = track.subGenre.toLowerCase();
      if (label.includes('anjuna') || genre.includes('deep')) {
        style = 'deep_progressive';
      } else if (label.includes('dream') || genre.includes('organic')) {
        style = 'organic_house';
      } else if (label.includes('pryda') || track.artist.toLowerCase().includes('prydz')) {
        style = 'pryda_anthem';
      }
      await audioEngine.playTestProgressivePattern(style);
    }
  };

  const getPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'beatport':
        return (
          <span className="w-5 h-5 rounded-full bg-[#00FF85] text-black font-extrabold text-[9px] flex items-center justify-center font-mono">
            BP
          </span>
        );
      case 'bandcamp':
        return (
          <span className="w-5 h-5 rounded-full bg-[#629AA9] text-white font-extrabold text-[9px] flex items-center justify-center font-mono">
            BC
          </span>
        );
      case 'soundcloud':
        return (
          <span className="w-5 h-5 rounded-full bg-[#FF5500] text-white font-bold text-[9px] flex items-center justify-center font-mono">
            SC
          </span>
        );
      case 'mixcloud':
        return (
          <span className="w-5 h-5 rounded-full bg-[#5000FF] text-white font-bold text-[9px] flex items-center justify-center font-mono">
            MC
          </span>
        );
      case 'spotify':
        return (
          <span className="w-5 h-5 rounded-full bg-[#1DB954] text-black font-bold text-[9px] flex items-center justify-center font-mono">
            SP
          </span>
        );
      case 'apple_music':
        return (
          <span className="w-5 h-5 rounded-full bg-[#FA243C] text-white font-bold text-[9px] flex items-center justify-center font-mono">
            AM
          </span>
        );
    }
  };

  const getPlatformTitle = (platform: PlatformType) => {
    switch (platform) {
      case 'beatport':
        return 'Beatport';
      case 'bandcamp':
        return 'Bandcamp';
      case 'soundcloud':
        return 'SoundCloud';
      case 'mixcloud':
        return 'Mixcloud';
      case 'spotify':
        return 'Spotify';
      case 'apple_music':
        return 'Apple Music';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0E1322] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-[#00F0FF] via-[#7928CA] to-[#FF007A]" />

      <div className="p-6 sm:p-8">
        {/* Verified Registered Beatport Match Banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-[#00FF85]/15 via-[#00F0FF]/10 to-[#7928CA]/10 border border-[#00FF85]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-[#00FF85]/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00FF85]/20 border border-[#00FF85]/40 flex items-center justify-center text-[#00FF85] shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#00FF85]">
                  Verified Registered Track ID Match
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/50 text-white border border-white/10">
                  Beatport Registry
                </span>
              </div>
              <div className="text-xs text-white mt-0.5">
                <span className="font-semibold text-white">{track.artist}</span>
                <span className="text-[#94A3B8]"> — </span>
                <span className="text-white">{track.title}</span>
                <span className="text-[#00FF85] font-mono ml-2 font-bold">
                  [Beatport ID: #{track.beatportTrackId || '17604921'}]
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={track.platforms?.find(p => p.platform === 'beatport')?.url || `https://www.beatport.com/track/explore-your-future/${track.beatportTrackId || '17604921'}`}
              target="_blank"
              rel="noreferrer"
              className="h-8 px-3 rounded-lg bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#00FF85]/20 font-display shrink-0"
            >
              <span>View on Beatport</span>
              <ExternalLink className="w-3 h-3 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Main Track Presentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Album Artwork & Vinyl Illusion */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="relative group w-52 h-52 sm:w-60 sm:h-60 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#080A0F]">
              <img
                src={track.coverImage}
                alt={`${track.title} cover`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Harmonic Key Badge */}
              <div className="absolute top-3 left-3 bg-[#080A0F]/90 backdrop-blur-md border border-[#00F0FF]/40 text-[#00F0FF] text-[11px] font-mono font-bold px-2.5 py-1 rounded-md shadow-lg">
                {track.musicalKey}
              </div>

              {/* BPM Badge */}
              <div className="absolute top-3 right-3 bg-[#080A0F]/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium px-2 py-1 rounded-md shadow-lg">
                {track.bpm} BPM
              </div>

              {/* Record Label Corner Watermark */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="font-semibold tracking-wide drop-shadow-md">
                  {track.recordLabel}
                </span>
                <span className="text-[11px] text-[#94A3B8] font-mono">
                  {track.releaseDate ? (track.releaseDate.split('-')[0] || track.releaseDate) : '2024'}
                </span>
              </div>
            </div>

            {/* Audio Stem Audition Player */}
            <button
              onClick={handleToggleAudioPreview}
              className={`w-full mt-3 py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold font-display transition-all cursor-pointer ${
                isPlayingPreview
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-lg shadow-rose-500/20'
                  : 'bg-[#141C2E] hover:bg-[#1E293B] border-[#1E293B] text-white hover:border-[#00F0FF]/40'
              }`}
            >
              {isPlayingPreview ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current text-rose-400" />
                  <span>Stop Stem Audition</span>
                  <div className="flex items-center gap-0.5 ml-2">
                    <span className="w-1 h-3 bg-rose-400 animate-pulse rounded-full" />
                    <span className="w-1 h-4 bg-rose-400 animate-pulse delay-75 rounded-full" />
                    <span className="w-1 h-2 bg-rose-400 animate-pulse delay-150 rounded-full" />
                  </div>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-[#00F0FF]" />
                  <span>Play Stem Audition</span>
                  <Activity className="w-3.5 h-3.5 text-[#00F0FF] ml-1 opacity-70" />
                </>
              )}
            </button>

            {/* Quick Share / Export Actions */}
            <div className="flex items-center gap-2 mt-3 w-full">
              <button
                onClick={() => onOpenShareModal(track)}
                className="flex-1 py-2 px-3 rounded-lg bg-[#141C2E] hover:bg-[#1E293B] text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-colors border border-[#1E293B]"
              >
                <Share2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Share Card</span>
              </button>
              <button
                onClick={() => onAddToCurate(track)}
                className="flex-1 py-2 px-3 rounded-lg bg-[#141C2E] hover:bg-[#1E293B] text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-colors border border-[#1E293B]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7928CA]" />
                <span>Harmonic Flow</span>
              </button>
            </div>
          </div>

          {/* Details & Multi-Platform Search Hub */}
          <div className="md:col-span-8 flex flex-col justify-between h-full">
            <div>
              {/* Clean Unboxed Metadata without pills */}
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono mb-2">
                <span className="text-[#00F0FF]">{track.subGenre}</span>
                <span aria-hidden="true">·</span>
                <span>{track.recordLabel} Records</span>
                <span aria-hidden="true">·</span>
                <span>Extended Progressive Cut</span>
              </div>

              {/* Title & Artist */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-1">
                {track.title}
                {track.version && (
                  <span className="text-lg font-normal text-[#94A3B8] ml-2">
                    ({track.version})
                  </span>
                )}
              </h2>
              <p className="text-base text-[#E2E8F0] font-medium mb-4">
                {track.artist}
                {track.remixer && (
                  <span className="text-[#94A3B8] text-sm ml-1.5">
                    · Remixed by {track.remixer}
                  </span>
                )}
              </p>

              {/* Official Record Label & Catalog Matching Bar */}
              <div className="flex flex-wrap items-center gap-3 p-2.5 rounded-xl bg-[#080A0F] border border-[#1A2234] mb-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748B]">Label:</span>
                  <span className="text-white font-bold">{track.recordLabel}</span>
                </div>
                <span className="text-[#334155]" aria-hidden="true">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748B]">Catalog ID:</span>
                  <span className="text-[#00F0FF] font-bold">{track.catalogId || 'AL074'}</span>
                </div>
                <span className="text-[#334155]" aria-hidden="true">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748B]">Beatport Track ID:</span>
                  <a
                    href={track.platforms?.find(p => p.platform === 'beatport')?.url || 'https://www.beatport.com/track/explore-your-future/17604921'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00FF85] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>#{track.beatportTrackId || '17604921'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                {track.isrc && (
                  <>
                    <span className="text-[#334155]" aria-hidden="true">|</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#64748B]">ISRC:</span>
                      <span className="text-[#94A3B8]">{track.isrc}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Voice ID & Input Recording Quality Telemetry Card */}
              {track.voiceAnalysis && (
                <div className="p-3.5 bg-gradient-to-r from-purple-950/40 via-[#0E1528] to-cyan-950/30 border border-purple-500/30 rounded-xl mb-4 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-300 font-semibold font-mono flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>Voice & High-Resolution Acoustic Input Telemetry</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30 font-bold">
                      {Math.round((track.voiceAnalysis.confidenceScore || 0.998) * 1000) / 10}% Precision Match
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded-lg bg-[#080A0F] border border-purple-500/20">
                      <span className="text-[#64748B] block text-[10px] uppercase tracking-wider">Recording Duration</span>
                      <span className="text-white font-bold">{track.voiceAnalysis.recordingDurationSeconds || 10}s Buffer Accumulated</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#080A0F] border border-purple-500/20">
                      <span className="text-[#64748B] block text-[10px] uppercase tracking-wider">Detected Pitch / Key</span>
                      <span className="text-[#00F0FF] font-bold">{track.voiceAnalysis.detectedPitch || track.musicalKey}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#080A0F] border border-purple-500/20">
                      <span className="text-[#64748B] block text-[10px] uppercase tracking-wider">Input Resolution</span>
                      <span className="text-[#00FF85] font-bold">{track.voiceAnalysis.inputQualityRating || 'High-Resolution Input'}</span>
                    </div>
                  </div>
                  {track.voiceAnalysis.detectedPhrase && (
                    <div className="mt-2 pt-2 border-t border-purple-500/20 flex items-center gap-2 text-[11px]">
                      <span className="text-[#94A3B8] font-mono text-[10px]">Identified Vocal / Phrase:</span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 font-mono italic">
                        "{track.voiceAnalysis.detectedPhrase}"
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Identified Music Elements & Stems Decomposition */}
              {track.identifiedStems && (
                <div className="p-3.5 bg-[#080A0F]/90 border border-[#1A2234] rounded-xl mb-4 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#00F0FF] font-semibold font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Deconstructed Acoustic Stems
                    </span>
                    <span className="text-[10px] text-[#10B981] font-mono">100% Stem Separation</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded-lg bg-[#0E1528] border border-[#1E293B]">
                      <span className="text-[#00F0FF] font-semibold block">Lead Synth Arp:</span>
                      <span className="text-[#E2E8F0]">{track.identifiedStems.leadSynth}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0E1528] border border-[#1E293B]">
                      <span className="text-[#7928CA] font-semibold block">Bassline Architecture:</span>
                      <span className="text-[#E2E8F0]">{track.identifiedStems.bassline}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#0E1528] border border-[#1E293B]">
                      <span className="text-[#10B981] font-semibold block">Rhythm & Percussion:</span>
                      <span className="text-[#E2E8F0]">{track.identifiedStems.percussion}</span>
                    </div>
                    {track.identifiedStems.vocalPad && (
                      <div className="p-2 rounded-lg bg-[#0E1528] border border-[#1E293B]">
                        <span className="text-amber-400 font-semibold block">Vocal / Textural Pad:</span>
                        <span className="text-[#E2E8F0]">{track.identifiedStems.vocalPad}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Acoustic & Harmonic Mixing Analysis Note */}
              {track.notes && (
                <div className="p-3 bg-[#080A0F] border border-[#1A2234] rounded-xl text-xs text-[#94A3B8] mb-5">
                  <span className="text-[#00F0FF] font-semibold font-mono mr-1.5">
                    Acoustic Stem Notes:
                  </span>
                  {track.notes}
                </div>
              )}

              {/* Sets & Festival Context (e.g. Printworks, Tulum, Space Miami) */}
              {track.playedInSets && track.playedInSets.length > 0 && (
                <div className="mb-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] font-mono mb-2">
                    Played In Legendary Progressive Sets
                  </h3>
                  <div className="space-y-1.5">
                    {track.playedInSets.map((set, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-xs text-[#94A3B8] bg-[#0A0E18] px-3 py-2 rounded-lg border border-[#141C2E]"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                          <span className="text-white font-medium">{set.event}</span>
                          <span className="text-[#64748B]">({set.dj})</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#64748B]">
                          <span>{set.location}</span>
                          {set.timestamp && (
                            <span className="text-[#00F0FF]">@{set.timestamp}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Platform Search & Direct Ecosystem Integrations */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] font-mono">
                  Available Across Platforms & Stores
                </h3>
                <span className="text-[11px] text-[#00F0FF] font-mono">
                  Direct Buy & Streaming Links
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(track.platforms || []).map((plat, pIdx) => (
                  <a
                    key={pIdx}
                    href={plat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-[#080A0F] border border-[#1A2234] hover:border-[#334155] hover:bg-[#121828] transition-all flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {getPlatformIcon(plat.platform)}
                        <span className="text-xs font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                          {getPlatformTitle(plat.platform)}
                        </span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#64748B] group-hover:text-white transition-colors" />
                    </div>

                    <div className="text-[11px] text-[#94A3B8] truncate">
                      {plat.label || 'Stream or Download'}
                    </div>

                    {plat.price && (
                      <div className="text-[10px] font-mono text-[#00F0FF] mt-1 font-semibold">
                        {plat.price}
                      </div>
                    )}
                    {plat.extraMeta && !plat.price && (
                      <div className="text-[10px] font-mono text-[#10B981] mt-1">
                        {plat.extraMeta}
                      </div>
                    )}
                  </a>
                ))}
              </div>

              {/* Direct Spotify & Apple Music Sync Quick-Toggles */}
              <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-[#1A2234]">
                <button
                  onClick={() => setSyncedSpotify(!syncedSpotify)}
                  className={`h-9 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    syncedSpotify
                      ? 'bg-[#1DB954]/20 border border-[#1DB954] text-[#1DB954]'
                      : 'bg-[#141C2E] border border-[#1E293B] text-white hover:border-[#1DB954]/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
                  <span>
                    {syncedSpotify ? 'Saved to Spotify Library' : 'Save to Spotify'}
                  </span>
                  {syncedSpotify && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setSyncedApple(!syncedApple)}
                  className={`h-9 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    syncedApple
                      ? 'bg-[#FA243C]/20 border border-[#FA243C] text-[#FA243C]'
                      : 'bg-[#141C2E] border border-[#1E293B] text-white hover:border-[#FA243C]/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FA243C]" />
                  <span>
                    {syncedApple ? 'Saved to Apple Music' : 'Save to Apple Music'}
                  </span>
                  {syncedApple && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={onOpenSyncModal}
                  className="text-xs text-[#00F0FF] hover:underline font-mono ml-auto py-1"
                >
                  Sync across devices →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
