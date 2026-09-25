export type PlatformType = 'beatport' | 'bandcamp' | 'soundcloud' | 'mixcloud' | 'spotify' | 'apple_music';

export type SubGenre =
  | 'Melodic House & Techno'
  | 'Progressive House'
  | 'Deep Progressive'
  | 'Organic House'
  | 'Peak-Time Progressive'
  | 'Melodic Trance';

export interface PlatformLink {
  platform: PlatformType;
  url: string;
  label?: string; // e.g., "Extended Mix (Lossless)", "Vinyl / Bandcamp DL", "DJ Mix 00:45:12"
  price?: string; // e.g. "$2.49", "Name Your Price"
  available: boolean;
  extraMeta?: string; // e.g., "Top 10 #1 Beatport", "DJ Set Cue Point"
}

export interface Track {
  id: string;
  title: string;
  version?: string; // e.g. "Club Mix", "Original Mix", "Patrice Bäumel Remix"
  artist: string;
  remixer?: string;
  recordLabel: string;
  releaseDate: string;
  bpm: number;
  musicalKey: string; // e.g., "8A / A minor", "11B / A Major"
  subGenre: SubGenre;
  coverImage: string;
  durationSeconds: number;
  audioPreviewUrl?: string; // sample synth audio or preview mp3
  platforms: PlatformLink[];
  acousticSignature: {
    spectralCentroid: number; // Hz
    energyDistribution: number[]; // 5 subbands [sub, bass, lowMid, highMid, highs]
    dominantFreq: number;
    harmonicPurity: number; // 0 to 1
  };
  playedInSets?: {
    event: string;
    dj: string;
    location: string;
    timestamp?: string;
    date: string;
  }[];
  notes?: string;
  isUnreleased?: boolean;
}

export interface RecordLabel {
  id: string;
  name: string;
  founder: string;
  hq: string;
  description: string;
  subGenres: SubGenre[];
  catalogCount: number;
  featuredArtists: string[];
  officialPlatforms: {
    beatport?: string;
    bandcamp?: string;
    soundcloud?: string;
    mixcloud?: string;
    spotify?: string;
    apple_music?: string;
  };
}

export interface SyncedDevice {
  id: string;
  name: string;
  type: 'mobile_ios' | 'mobile_android' | 'desktop_web' | 'carplay';
  lastActive: string;
  isCurrent: boolean;
  batteryLevel?: number;
  syncedTracksCount: number;
}

export interface IDRequestPost {
  id: string;
  title: string;
  submittedBy: string;
  userAvatar: string;
  eventContext: string; // e.g. "Tale of Us @ Printworks Closing"
  timestamp: string;
  audioSnippetDescription: string;
  upvotes: number;
  hasBeenSolved: boolean;
  solvedTrack?: Track;
  repliesCount: number;
}

export interface GlobalDrop {
  id: string;
  trackTitle: string;
  artist: string;
  recordLabel: string;
  city: string;
  venueOrFestival: string;
  identifiedAgo: string;
  userHandle: string;
  coverImage: string;
  musicalKey: string;
  bpm: number;
}

export interface IdentificationHistoryItem {
  id: string;
  track: Track;
  identifiedAt: string;
  confidence: number;
  source: 'live_mic' | 'uploaded_file' | 'synth_test';
  syncedToSpotify: boolean;
  syncedToAppleMusic: boolean;
}
