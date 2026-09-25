import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Laptop,
  Radio,
  Check,
  RefreshCw,
  QrCode,
  Link,
  ShieldCheck,
  X,
  Plus,
  Battery,
  CloudOff,
  Cloud,
} from 'lucide-react';
import { SyncedDevice } from '../types';

interface LibrarySyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: SyncedDevice[];
  setDevices: React.Dispatch<React.SetStateAction<SyncedDevice[]>>;
}

export const LibrarySyncModal: React.FC<LibrarySyncModalProps> = ({
  isOpen,
  onClose,
  devices,
  setDevices,
}) => {
  const [spotifyConnected, setSpotifyConnected] = useState(true);
  const [appleConnected, setAppleConnected] = useState(true);
  const [autoSyncPlaylists, setAutoSyncPlaylists] = useState(true);
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState(true);
  const [pairCode, setPairCode] = useState('AUR-914');
  const [isPairing, setIsPairing] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');

  if (!isOpen) return null;

  const handlePairDevice = async () => {
    if (!newDeviceName.trim()) return;
    setIsPairing(true);

    try {
      const res = await fetch('/api/sync/pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceName: newDeviceName,
          type: 'mobile_ios',
        }),
      });
      const data = await res.json();
      if (data.success && data.allDevices) {
        setDevices(data.allDevices);
        setNewDeviceName('');
      }
    } catch (e) {
      console.error('Pairing error', e);
    } finally {
      setIsPairing(false);
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop_web':
        return <Laptop className="w-4 h-4 text-[#00F0FF]" />;
      case 'mobile_ios':
      case 'mobile_android':
        return <Smartphone className="w-4 h-4 text-[#10B981]" />;
      case 'carplay':
        return <Radio className="w-4 h-4 text-[#7928CA]" />;
      default:
        return <Smartphone className="w-4 h-4 text-[#00F0FF]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0D121F] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-[#1A2234] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              Cross-Platform Sync & Streaming Accounts
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Keep identified tracks, festival IDs, and playlists synchronized across all your devices.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-white hover:bg-[#1A2234] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Section 1: Streaming Platform Integration */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] font-mono mb-3">
              Linked Music Streaming Accounts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Spotify Account */}
              <div className="p-4 rounded-xl bg-[#080A0F] border border-[#1A2234] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center font-bold text-xs font-mono">
                    SP
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Spotify Account</div>
                    <div className="text-[11px] text-[#94A3B8]">
                      {spotifyConnected ? 'isurupromuditha · Premium' : 'Disconnected'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSpotifyConnected(!spotifyConnected)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    spotifyConnected
                      ? 'bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/40 hover:bg-[#1DB954]/30'
                      : 'bg-[#141C2E] text-white border border-[#1E293B]'
                  }`}
                >
                  {spotifyConnected ? 'Connected' : 'Connect'}
                </button>
              </div>

              {/* Apple Music Account */}
              <div className="p-4 rounded-xl bg-[#080A0F] border border-[#1A2234] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FA243C]/20 text-[#FA243C] flex items-center justify-center font-bold text-xs font-mono">
                    AM
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Apple Music</div>
                    <div className="text-[11px] text-[#94A3B8]">
                      {appleConnected ? 'iCloud Music Library Active' : 'Disconnected'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setAppleConnected(!appleConnected)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    appleConnected
                      ? 'bg-[#FA243C]/20 text-[#FA243C] border border-[#FA243C]/40 hover:bg-[#FA243C]/30'
                      : 'bg-[#141C2E] text-white border border-[#1E293B]'
                  }`}
                >
                  {appleConnected ? 'Connected' : 'Connect'}
                </button>
              </div>
            </div>

            {/* Auto-Sync Preferences */}
            <div className="mt-3 p-3 bg-[#0A0E18] rounded-xl border border-[#141C2E] flex items-center justify-between text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Automatically sync new identified progressive tracks to playlists</span>
              </div>
              <input
                type="checkbox"
                checked={autoSyncPlaylists}
                onChange={(e) => setAutoSyncPlaylists(e.target.checked)}
                className="w-4 h-4 rounded text-[#00F0FF] bg-[#080A0F] border-[#1E293B]"
              />
            </div>
          </div>

          {/* Section 2: Paired Devices & Active Cloud Session */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] font-mono">
                Active Paired Devices ({devices.length})
              </h3>
              <span className="text-[11px] text-[#10B981] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Cloud Sync Active
              </span>
            </div>

            <div className="space-y-2">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="p-3.5 rounded-xl bg-[#080A0F] border border-[#1A2234] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#141C2E]">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <span>{device.name}</span>
                        {device.isCurrent && (
                          <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-1.5 py-0.5 rounded">
                            This Device
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#64748B] font-mono">
                        {device.lastActive} · {device.syncedTracksCount} tracks synced
                      </div>
                    </div>
                  </div>

                  {device.batteryLevel && (
                    <div className="flex items-center gap-1 text-[11px] text-[#64748B] font-mono">
                      <Battery className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{device.batteryLevel}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Pair Companion Mobile Device via QR or Sync Code */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#0F1527] to-[#0A0D18] border border-[#1E293B]">
            <h4 className="text-xs font-bold text-white font-display mb-1 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#00F0FF]" />
              <span>Pair Mobile Companion or In-Car Scanner</span>
            </h4>
            <p className="text-xs text-[#94A3B8] mb-3">
              Scan from your mobile camera or enter your 6-digit session pairing code to handoff live listening.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="px-4 py-2 bg-[#080A0F] border border-[#00F0FF]/30 rounded-xl text-sm font-mono font-bold tracking-widest text-[#00F0FF]">
                {pairCode}
              </div>

              <div className="flex-1 flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  placeholder="e.g. iPad Pro Studio or Pixel 9"
                  className="flex-1 px-3 py-2 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white placeholder-[#64748B] focus:border-[#00F0FF] focus:outline-none"
                />
                <button
                  onClick={handlePairDevice}
                  disabled={isPairing || !newDeviceName.trim()}
                  className="px-3.5 py-2 rounded-xl bg-[#00F0FF] text-black text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap"
                >
                  {isPairing ? 'Pairing...' : 'Add Device'}
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Offline Underground Club Mode */}
          <div className="p-3.5 bg-[#080A0F] rounded-xl border border-[#141C2E] flex items-center justify-between text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2.5">
              <Cloud className="w-4 h-4 text-[#00F0FF]" />
              <div>
                <div className="text-white font-medium">Offline Underground Queue</div>
                <div className="text-[11px] text-[#64748B]">
                  Stores acoustic fingerprints during low cell service at festivals (Tulum, Burning Man, Space Miami) and syncs once online.
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded">
              Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
