import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Disc3,
  ExternalLink,
  Play,
  Square,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  Layers,
  User,
  Music,
} from 'lucide-react';
import { RECORD_LABELS, PROGRESSIVE_TRACKS } from '../data/progressiveCatalog';
import { Track, RecordLabel, PlatformType, SubGenre } from '../types';
import { audioEngine } from '../utils/audioFingerprinter';

interface LabelArtistFilterProps {
  onSelectTrack: (track: Track) => void;
  onOpenShareModal: (track: Track) => void;
}

export const LabelArtistFilter: React.FC<LabelArtistFilterProps> = ({
  onSelectTrack,
  onOpenShareModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<string>('all');
  const [selectedArtist, setSelectedArtist] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedSubGenre, setSelectedSubGenre] = useState<string>('all');
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  // Extract all unique artists across the labels and tracks
  const allArtists = useMemo(() => {
    const set = new Set<string>();
    PROGRESSIVE_TRACKS.forEach((t) => set.add(t.artist));
    RECORD_LABELS.forEach((l) => l.featuredArtists.forEach((a) => set.add(a)));
    return Array.from(set).sort();
  }, []);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return PROGRESSIVE_TRACKS.filter((track) => {
      // Search matching title, artist, label, catalogId, or Beatport ID
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q) ||
        track.recordLabel.toLowerCase().includes(q) ||
        (track.version && track.version.toLowerCase().includes(q)) ||
        (track.catalogId && track.catalogId.toLowerCase().includes(q)) ||
        (track.beatportTrackId && (track.beatportTrackId.includes(q) || q.includes(track.beatportTrackId))) ||
        (track.isrc && track.isrc.toLowerCase().includes(q));

      // Label filter
      const matchesLabel =
        selectedLabel === 'all' ||
        track.recordLabel.toLowerCase() === selectedLabel.toLowerCase();

      // Artist filter
      const matchesArtist =
        selectedArtist === 'all' ||
        track.artist.toLowerCase().includes(selectedArtist.toLowerCase());

      // Platform filter
      const matchesPlatform =
        selectedPlatform === 'all' ||
        track.platforms.some((p) => p.platform === selectedPlatform && p.available);

      // Subgenre filter
      const matchesSubGenre =
        selectedSubGenre === 'all' || track.subGenre === selectedSubGenre;

      return matchesSearch && matchesLabel && matchesArtist && matchesPlatform && matchesSubGenre;
    });
  }, [searchQuery, selectedLabel, selectedArtist, selectedPlatform, selectedSubGenre]);

  // Audio preview playback simulation
  const handleTogglePreview = async (track: Track) => {
    if (playingTrackId === track.id) {
      audioEngine.stopAll();
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(track.id);
      let style: any = 'melodic_techno';
      if (track.subGenre === 'Deep Progressive') style = 'deep_progressive';
      if (track.subGenre === 'Organic House') style = 'organic_house';
      if (track.recordLabel === 'Pryda Recordings') style = 'pryda_anthem';

      await audioEngine.playTestProgressivePattern(style);
    }
  };

  const getActiveLabelInfo = RECORD_LABELS.find(
    (l) => l.name.toLowerCase() === selectedLabel.toLowerCase()
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Editorial Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
          Record Labels & Signed Artists Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
          Filter and cross-reference releases across Beatport, Bandcamp, SoundCloud, Mixcloud, Spotify, and Apple Music.
        </p>
      </div>

      {/* Multi-Dimensional Filter Controls Grid */}
      <div className="bg-[#0D121F] border border-[#1A2234] rounded-2xl p-5 mb-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by track, artist, or label..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white placeholder-[#64748B] focus:border-[#00F0FF] focus:outline-none transition-colors"
            />
          </div>

          {/* Record Label Dropdown */}
          <div className="md:col-span-3">
            <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1">
              Record Label
            </label>
            <select
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              className="w-full py-2 px-3 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white focus:border-[#00F0FF] focus:outline-none"
            >
              <option value="all">All Record Labels</option>
              {RECORD_LABELS.map((label) => (
                <option key={label.id} value={label.name}>
                  {label.name} ({label.catalogCount}+)
                </option>
              ))}
            </select>
          </div>

          {/* Signed Artist Dropdown */}
          <div className="md:col-span-3">
            <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1">
              Signed Artist
            </label>
            <select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
              className="w-full py-2 px-3 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white focus:border-[#00F0FF] focus:outline-none"
            >
              <option value="all">All Signed Artists</option>
              {allArtists.map((artist) => (
                <option key={artist} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter Dropdown */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1">
              Platform Source
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full py-2 px-3 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white focus:border-[#00F0FF] focus:outline-none"
            >
              <option value="all">All Platforms</option>
              <option value="beatport">Beatport</option>
              <option value="bandcamp">Bandcamp</option>
              <option value="soundcloud">SoundCloud</option>
              <option value="mixcloud">Mixcloud</option>
              <option value="spotify">Spotify</option>
              <option value="apple_music">Apple Music</option>
            </select>
          </div>
        </div>

        {/* Quick Sub-genre Segmented Tab Controls (Interactive Buttons) */}
        <div className="mt-4 pt-3 border-t border-[#141C2E] flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-[#64748B] mr-2">Sub-Genre:</span>
          {[
            'all',
            'Melodic House & Techno',
            'Progressive House',
            'Deep Progressive',
            'Organic House',
            'Melodic Trance',
          ].map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedSubGenre(genre)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${
                selectedSubGenre === genre
                  ? 'bg-[#00F0FF] text-black font-semibold'
                  : 'bg-[#080A0F] text-[#94A3B8] hover:text-white border border-[#1A2234]'
              }`}
            >
              {genre === 'all' ? 'All Sub-Genres' : genre}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Label Showcase Spotlight (if filtered by a specific label) */}
      {getActiveLabelInfo && (
        <div className="bg-gradient-to-r from-[#0F1527] to-[#0A0D18] border border-[#1E293B] rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-bold text-white font-display">
                  {getActiveLabelInfo.name}
                </span>
                <span className="text-xs font-mono text-[#00F0FF] border-l border-[#1E293B] pl-2">
                  Founded by {getActiveLabelInfo.founder}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] max-w-2xl">
                {getActiveLabelInfo.description}
              </p>
            </div>

            {/* Official Store Links for this label */}
            <div className="flex items-center gap-2">
              {getActiveLabelInfo.officialPlatforms.beatport && (
                <a
                  href={getActiveLabelInfo.officialPlatforms.beatport}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#00FF85]/10 text-[#00FF85] border border-[#00FF85]/30 text-xs font-mono font-bold hover:bg-[#00FF85]/20 transition-colors"
                >
                  Beatport Store
                </a>
              )}
              {getActiveLabelInfo.officialPlatforms.bandcamp && (
                <a
                  href={getActiveLabelInfo.officialPlatforms.bandcamp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#629AA9]/10 text-[#629AA9] border border-[#629AA9]/30 text-xs font-mono font-bold hover:bg-[#629AA9]/20 transition-colors"
                >
                  Bandcamp Vinyl
                </a>
              )}
              {getActiveLabelInfo.officialPlatforms.soundcloud && (
                <a
                  href={getActiveLabelInfo.officialPlatforms.soundcloud}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/30 text-xs font-mono font-bold hover:bg-[#FF5500]/20 transition-colors"
                >
                  SoundCloud
                </a>
              )}
              {getActiveLabelInfo.officialPlatforms.mixcloud && (
                <a
                  href={getActiveLabelInfo.officialPlatforms.mixcloud}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#5000FF]/10 text-[#5000FF] border border-[#5000FF]/30 text-xs font-mono font-bold hover:bg-[#5000FF]/20 transition-colors"
                >
                  Mixcloud Sets
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Catalog Results Grid */}
      <div className="flex items-center justify-between text-xs text-[#64748B] font-mono mb-4">
        <span>Showing {filteredTracks.length} verified progressive releases</span>
        <span>Lossless & Radio Set Cue Points Available</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            className="bg-[#0D121F] border border-[#1A2234] hover:border-[#334155] rounded-xl p-4 flex flex-col justify-between transition-all group shadow-lg"
          >
            <div>
              {/* Artwork & Quick Play */}
              <div className="relative w-full h-44 rounded-lg overflow-hidden mb-3 bg-[#080A0F]">
                <img
                  src={track.coverImage}
                  alt={track.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Key & BPM Badge */}
                <div className="absolute top-2 left-2 bg-[#080A0F]/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-[#00F0FF] border border-[#00F0FF]/30">
                  {track.musicalKey} · {track.bpm} BPM
                </div>

                {/* Label stamp */}
                <div className="absolute top-2 right-2 bg-[#080A0F]/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-white border border-white/20">
                  {track.recordLabel}
                </div>

                {/* Audio preview play trigger */}
                <button
                  onClick={() => handleTogglePreview(track)}
                  className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#7928CA] text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                >
                  {playingTrackId === track.id ? (
                    <Square className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>
              </div>

              {/* Title & Artist */}
              <h3 className="text-sm font-bold text-white font-display truncate">
                {track.title}
              </h3>
              <p className="text-xs text-[#94A3B8] truncate mb-2">
                {track.artist}
                {track.remixer && <span> (remix: {track.remixer})</span>}
              </p>

              {/* Sub-genre info */}
              <div className="text-[11px] text-[#64748B] font-mono mb-3">
                {track.subGenre}
              </div>
            </div>

            {/* Platform Direct Actions */}
            <div>
              <div className="flex items-center gap-1.5 pt-3 border-t border-[#141C2E]">
                {track.platforms.slice(0, 4).map((plat, idx) => (
                  <a
                    key={idx}
                    href={plat.url}
                    target="_blank"
                    rel="noreferrer"
                    title={`${plat.platform.toUpperCase()} - ${plat.label || ''}`}
                    className="p-1.5 rounded-lg bg-[#080A0F] hover:bg-[#1A2234] border border-[#1A2234] transition-colors text-[10px] font-mono text-[#94A3B8] hover:text-white flex items-center gap-1"
                  >
                    <span>{plat.platform.slice(0, 2).toUpperCase()}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ))}

                <button
                  onClick={() => onSelectTrack(track)}
                  className="ml-auto text-xs text-[#00F0FF] hover:underline font-mono"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
