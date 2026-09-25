import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AudioRadar } from './components/AudioRadar';
import { TrackResultCard } from './components/TrackResultCard';
import { LabelArtistFilter } from './components/LabelArtistFilter';
import { LibrarySyncModal } from './components/LibrarySyncModal';
import { SocialShareModal } from './components/SocialShareModal';
import { CommunityRadar } from './components/CommunityRadar';
import { PersonalizedPlaylists } from './components/PersonalizedPlaylists';
import { MobileCompanionSheet } from './components/MobileCompanionSheet';
import { PROGRESSIVE_TRACKS, INITIAL_SYNCED_DEVICES } from './data/progressiveCatalog';
import { Track, SyncedDevice } from './types';
import { audioEngine } from './utils/audioFingerprinter';

export default function App() {
  const [activeTab, setActiveTab] = useState<'identify' | 'catalog' | 'curate' | 'community' | 'sync'>('identify');
  const [isListening, setIsListening] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track>(PROGRESSIVE_TRACKS[0]);
  const [devices, setDevices] = useState<SyncedDevice[]>(INITIAL_SYNCED_DEVICES);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [trackToShare, setTrackToShare] = useState<Track | null>(PROGRESSIVE_TRACKS[0]);
  const [isMobileView, setIsMobileView] = useState(false);

  // When a track is successfully identified via mic, synth, or file
  const handleTrackIdentified = (track: any, source: 'live_mic' | 'uploaded_file' | 'synth_test') => {
    // Check if it matches an existing catalog track first
    const catalogMatch = PROGRESSIVE_TRACKS.find(
      (t) =>
        t.title.toLowerCase().includes(track.title?.toLowerCase() || '') ||
        (track.title && track.title.toLowerCase().includes(t.title.toLowerCase()))
    );

    if (catalogMatch) {
      setActiveTrack(catalogMatch);
    } else {
      // Build a robust complete Track object with guaranteed fallbacks
      const normalizedTrack: Track = {
        id: track.id || `trk-${Date.now()}`,
        title: track.title || 'Identified Progressive Track',
        version: track.version || 'Extended Mix',
        artist: track.artist || 'Underground Progressive Artist',
        remixer: track.remixer,
        recordLabel: track.recordLabel || 'Afterlife Recordings',
        releaseDate: track.releaseDate || '2024-03-15',
        bpm: track.bpm || 124,
        musicalKey: track.musicalKey || '8A (A minor)',
        subGenre: track.subGenre || 'Melodic House & Techno',
        coverImage: track.coverImage || PROGRESSIVE_TRACKS[0].coverImage,
        durationSeconds: track.durationSeconds || 360,
        notes: track.acousticNotes || track.notes || 'Identified via acoustic landmark matching and frequency centroid tracking.',
        platforms: track.platforms && track.platforms.length > 0 ? track.platforms : [
          {
            platform: 'beatport',
            url: `https://www.beatport.com/search?q=${encodeURIComponent(`${track.artist || ''} ${track.title || ''}`)}`,
            label: 'Beatport Extended Mix',
            price: '$2.49',
            available: true,
            extraMeta: 'Lossless Available',
          },
          {
            platform: 'bandcamp',
            url: `https://bandcamp.com/search?q=${encodeURIComponent(`${track.artist || ''} ${track.title || ''}`)}`,
            label: 'Direct Artist Bandcamp',
            price: '£2.00',
            available: true,
          },
          {
            platform: 'soundcloud',
            url: `https://soundcloud.com/search?q=${encodeURIComponent(`${track.artist || ''} ${track.title || ''}`)}`,
            label: 'SoundCloud Stream',
            available: true,
          },
          {
            platform: 'mixcloud',
            url: `https://www.mixcloud.com/search/?q=${encodeURIComponent(`${track.artist || ''} ${track.title || ''}`)}`,
            label: 'Mixcloud Radio Sets',
            available: true,
          },
          {
            platform: 'spotify',
            url: `https://open.spotify.com/search/${encodeURIComponent(`${track.artist || ''} ${track.title || ''}`)}`,
            label: 'Spotify Stream',
            available: true,
          },
          {
            platform: 'apple_music',
            url: `https://music.apple.com/us/search?term=${encodeURIComponent(`${track.artist || ''} ${track.title || ''}`)}`,
            label: 'Apple Music Lossless',
            available: true,
          },
        ],
        acousticSignature: track.acousticSignature || {
          spectralCentroid: 1350,
          energyDistribution: [0.32, 0.30, 0.20, 0.12, 0.06],
          dominantFreq: 440,
          harmonicPurity: 0.94,
        },
        playedInSets: track.playedInSets || (track.setContext ? [
          {
            event: track.setContext,
            dj: track.artist || 'Resident DJ',
            location: 'Global Stage',
            date: '2024',
          }
        ] : PROGRESSIVE_TRACKS[0].playedInSets),
      };
      setActiveTrack(normalizedTrack);
    }
    setActiveTab('identify');
  };

  const handleOpenShare = (track: Track) => {
    setTrackToShare(track);
    setIsShareModalOpen(true);
  };

  const handleSelectTrackByTitle = (title: string) => {
    const match = PROGRESSIVE_TRACKS.find(
      (t) => t.title.toLowerCase() === title.toLowerCase()
    );
    if (match) {
      setActiveTrack(match);
      setActiveTab('identify');
    }
  };

  const handleQuickListen = () => {
    setActiveTab('identify');
    if (isListening) {
      audioEngine.stopAll();
      setIsListening(false);
    } else {
      setIsListening(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#F3F4F6] flex flex-col selection:bg-[#00F0FF]/20 selection:text-[#00F0FF]">
      {/* 3-Zone Navigation Header adhering strictly to design constitution */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'sync') {
            setIsSyncModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        isListening={isListening}
        onQuickListen={handleQuickListen}
        isMobileView={isMobileView}
        setIsMobileView={setIsMobileView}
        syncedDevicesCount={devices.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">
        {activeTab === 'identify' && (
          <div className="px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-200">
            {/* Listening Radar & Web Audio Synthesizer */}
            <AudioRadar
              onTrackIdentified={handleTrackIdentified}
              isListening={isListening}
              setIsListening={setIsListening}
              recentTrack={activeTrack}
            />

            {/* Hero Identified Track Presentation */}
            {activeTrack && (
              <div className="pt-2">
                <div className="max-w-4xl mx-auto mb-3 flex items-center justify-between text-xs font-mono text-[#64748B]">
                  <span className="text-[#00F0FF] font-semibold">
                    Current Identified Match
                  </span>
                  <span>Harmonically Matched & Verified</span>
                </div>
                <TrackResultCard
                  track={activeTrack}
                  onOpenShareModal={handleOpenShare}
                  onOpenSyncModal={() => setIsSyncModalOpen(true)}
                  onAddToCurate={(trk) => {
                    setActiveTrack(trk);
                    setActiveTab('curate');
                  }}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="animate-in fade-in duration-200">
            <LabelArtistFilter
              onSelectTrack={(trk) => {
                setActiveTrack(trk);
                setActiveTab('identify');
              }}
              onOpenShareModal={handleOpenShare}
            />
          </div>
        )}

        {activeTab === 'curate' && (
          <div className="animate-in fade-in duration-200">
            <PersonalizedPlaylists
              seedTrack={activeTrack}
              onSelectTrackByTitle={handleSelectTrackByTitle}
            />
          </div>
        )}

        {activeTab === 'community' && (
          <div className="animate-in fade-in duration-200">
            <CommunityRadar onSelectTrackByTitle={handleSelectTrackByTitle} />
          </div>
        )}
      </main>

      {/* Cross-Platform Sync & Streaming Accounts Modal */}
      <LibrarySyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        devices={devices}
        setDevices={setDevices}
      />

      {/* Social Story Share & DJ Setlist Modal */}
      <SocialShareModal
        track={trackToShare}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Mobile Touch Companion Simulation Sheet */}
      <MobileCompanionSheet
        isOpen={isMobileView}
        onClose={() => setIsMobileView(false)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'sync') {
            setIsSyncModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        isListening={isListening}
        onToggleMic={handleQuickListen}
        recentTrack={activeTrack}
      />

      {/* Clean Editorial Footer */}
      <footer className="border-t border-[#141C2E] py-8 px-4 sm:px-6 text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-display">AURA ID</span>
            <span>· Progressive Music Discovery & Acoustic Recognition</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Beatport</span>
            <span>Bandcamp</span>
            <span>SoundCloud</span>
            <span>Mixcloud</span>
            <span>Spotify</span>
            <span>Apple Music</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
