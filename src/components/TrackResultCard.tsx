import React, { useState } from 'react';
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
} from 'lucide-react';
import { Track, PlatformType } from '../types';

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

            {/* Quick Share / Export Actions */}
            <div className="flex items-center gap-2 mt-4 w-full">
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
