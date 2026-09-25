import React from 'react';
import { Radio, Disc3, Sparkles, Flame, RefreshCw, X, ChevronDown, Check } from 'lucide-react';
import { Track } from '../types';

interface MobileCompanionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'identify' | 'catalog' | 'curate' | 'community' | 'sync';
  setActiveTab: (tab: 'identify' | 'catalog' | 'curate' | 'community' | 'sync') => void;
  isListening: boolean;
  onToggleMic: () => void;
  recentTrack: Track | null;
}

export const MobileCompanionSheet: React.FC<MobileCompanionSheetProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  isListening,
  onToggleMic,
  recentTrack,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      {/* Mobile Device Frame Container (390px iPhone width) */}
      <div className="relative w-full max-w-[400px] h-[820px] max-h-[92vh] bg-[#080A0F] border-[4px] border-[#1E293B] rounded-[44px] shadow-2xl overflow-hidden flex flex-col justify-between">
        {/* Top Phone Speaker / Dynamic Island Simulation */}
        <div className="pt-3 pb-2 px-6 flex items-center justify-between text-xs text-[#94A3B8] font-mono border-b border-[#141C2E] bg-[#0B0D13]">
          <span className="font-semibold text-white">9:41</span>
          <div className="w-20 h-4 bg-black rounded-full mx-auto" />
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#10B981]">5G</span>
            <button
              onClick={onClose}
              className="p-1 text-[#64748B] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Main Body Content Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
          <div className="text-center pt-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#00F0FF] mb-1">
              Mobile Companion Engine
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              AURA ID Mobile
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Optimized for one-handed club and festival identification
            </p>
          </div>

          {/* Central Mobile Listening Sphere */}
          <div className="my-auto flex flex-col items-center">
            <button
              onClick={onToggleMic}
              className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl relative ${
                isListening
                  ? 'bg-gradient-to-tr from-rose-600 to-indigo-800 scale-105 shadow-rose-500/40 animate-pulse'
                  : 'bg-gradient-to-tr from-[#00F0FF] to-[#7928CA] shadow-[#00F0FF]/30 active:scale-95'
              }`}
            >
              <div className="w-36 h-36 rounded-full bg-[#080A0F] flex flex-col items-center justify-center gap-1 text-center p-2">
                <Disc3
                  className={`w-9 h-9 text-[#00F0FF] ${
                    isListening ? 'animate-spin' : ''
                  }`}
                />
                <span className="text-xs font-bold text-white font-display">
                  {isListening ? 'Listening...' : 'Tap to ID'}
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">
                  {isListening ? 'Matching stems' : 'Club Mic'}
                </span>
              </div>
            </button>
          </div>

          {/* Recent Match Card */}
          {recentTrack && (
            <div className="p-3 bg-[#0E1322] border border-[#1E293B] rounded-2xl flex items-center justify-between mb-3 shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  src={recentTrack.coverImage}
                  alt={recentTrack.title}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white truncate max-w-[170px]">
                    {recentTrack.title}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] truncate max-w-[170px]">
                    {recentTrack.artist}
                  </div>
                  <div className="text-[10px] text-[#00F0FF] font-mono flex items-center gap-1.5">
                    <span>{recentTrack.musicalKey}</span>
                    <span>·</span>
                    <span>{recentTrack.recordLabel}</span>
                    {recentTrack.beatportTrackId && (
                      <>
                        <span>·</span>
                        <span className="text-[#00FF85]">#{recentTrack.beatportTrackId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-[#10B981] font-mono bg-[#10B981]/15 px-2 py-1 rounded">
                Synced
              </span>
            </div>
          )}
        </div>

        {/* Ergonomic Mobile Bottom Tab Bar (Pattern 1 from references/10_mobile_touch_apps.md) */}
        <div className="h-16 bg-[#0B0D13] border-t border-[#1A2234] grid grid-cols-5 items-center px-2 z-20">
          <button
            onClick={() => setActiveTab('identify')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-[10px] font-medium transition-colors ${
              activeTab === 'identify' ? 'text-[#00F0FF]' : 'text-[#64748B]'
            }`}
          >
            <Radio className="w-5 h-5 mb-0.5" />
            <span>ID</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-[10px] font-medium transition-colors ${
              activeTab === 'catalog' ? 'text-[#00F0FF]' : 'text-[#64748B]'
            }`}
          >
            <Disc3 className="w-5 h-5 mb-0.5" />
            <span>Labels</span>
          </button>

          <button
            onClick={() => setActiveTab('curate')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-[10px] font-medium transition-colors ${
              activeTab === 'curate' ? 'text-[#00F0FF]' : 'text-[#64748B]'
            }`}
          >
            <Sparkles className="w-5 h-5 mb-0.5" />
            <span>Harmonic</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-[10px] font-medium transition-colors ${
              activeTab === 'community' ? 'text-[#00F0FF]' : 'text-[#64748B]'
            }`}
          >
            <Flame className="w-5 h-5 mb-0.5" />
            <span>Drops</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-[10px] font-medium transition-colors ${
              activeTab === 'sync' ? 'text-[#00F0FF]' : 'text-[#64748B]'
            }`}
          >
            <RefreshCw className="w-5 h-5 mb-0.5" />
            <span>Sync</span>
          </button>
        </div>

        {/* iPhone Home Indicator bar */}
        <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mb-1.5" />
      </div>
    </div>
  );
};
