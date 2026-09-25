import React from 'react';
import { Radio, RefreshCw, Smartphone, Monitor, Music2, Share2, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'identify' | 'catalog' | 'curate' | 'community' | 'sync';
  setActiveTab: (tab: 'identify' | 'catalog' | 'curate' | 'community' | 'sync') => void;
  isListening: boolean;
  onQuickListen: () => void;
  isMobileView: boolean;
  setIsMobileView: (val: boolean | ((prev: boolean) => boolean)) => void;
  syncedDevicesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isListening,
  onQuickListen,
  isMobileView,
  setIsMobileView,
  syncedDevicesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0D13]/90 backdrop-blur-md border-b border-[#1A2234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark adhering to top bar contract */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('identify');
            }}
            className="text-xl font-bold tracking-tight text-white hover:text-[#00F0FF] transition-colors flex items-center gap-2 font-display"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00F0FF] to-[#7928CA] flex items-center justify-center shadow-lg shadow-[#00F0FF]/15">
              <Radio className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <span>AURA ID</span>
          </a>
          <span className="hidden lg:inline text-xs text-[#64748B] font-mono border-l border-[#1E293B] pl-3">
            PROGRESSIVE RADAR
          </span>
        </div>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#94A3B8]">
          <button
            onClick={() => setActiveTab('identify')}
            className={`transition-colors hover:text-white pb-1 relative ${
              activeTab === 'identify' ? 'text-[#00F0FF] font-semibold' : ''
            }`}
          >
            Identify
            {activeTab === 'identify' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`transition-colors hover:text-white pb-1 relative ${
              activeTab === 'catalog' ? 'text-[#00F0FF] font-semibold' : ''
            }`}
          >
            Labels & Artists
            {activeTab === 'catalog' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('curate')}
            className={`transition-colors hover:text-white pb-1 relative ${
              activeTab === 'curate' ? 'text-[#00F0FF] font-semibold' : ''
            }`}
          >
            Harmonic Flow
            {activeTab === 'curate' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`transition-colors hover:text-white pb-1 relative ${
              activeTab === 'community' ? 'text-[#00F0FF] font-semibold' : ''
            }`}
          >
            Drop Radar & IDs
            {activeTab === 'community' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`transition-colors hover:text-white pb-1 relative flex items-center gap-1.5 ${
              activeTab === 'sync' ? 'text-[#00F0FF] font-semibold' : ''
            }`}
          >
            <span>Sync Hub</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            {activeTab === 'sync' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Mobile View Toggle */}
          <button
            onClick={() => setIsMobileView((prev) => !prev)}
            title={isMobileView ? 'Switch to Desktop Layout' : 'Preview Mobile Companion Mode'}
            className="p-2 rounded-lg border border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#131A29] transition-colors"
          >
            {isMobileView ? (
              <Monitor className="w-4 h-4 text-[#00F0FF]" />
            ) : (
              <Smartphone className="w-4 h-4" />
            )}
          </button>

          {/* Quick Listen Button */}
          <button
            onClick={onQuickListen}
            className={`h-9 px-3.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-2 transition-all whitespace-nowrap ${
              isListening
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                : 'bg-gradient-to-r from-[#00F0FF] to-[#0070F3] text-black hover:opacity-95 shadow-md shadow-[#00F0FF]/20 active:scale-95'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isListening ? 'animate-spin' : ''}`} />
            <span>{isListening ? 'Listening...' : 'Identify ID'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
