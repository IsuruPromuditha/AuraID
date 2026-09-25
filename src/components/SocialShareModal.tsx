import React, { useRef, useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Share2,
  FileText,
  Disc3,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { Track } from '../types';

interface SocialShareModalProps {
  track: Track | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  track,
  isOpen,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen || !track) return null;

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/#track=${track.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadImage = () => {
    setIsExporting(true);
    // Draw canvas image card
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1350);
    bgGrad.addColorStop(0, '#0B0F19');
    bgGrad.addColorStop(0.5, '#080A0F');
    bgGrad.addColorStop(1, '#05070B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Accent glow
    const glow = ctx.createRadialGradient(540, 400, 50, 540, 400, 600);
    glow.addColorStop(0, 'rgba(0, 240, 255, 0.2)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 1350);

    // Brand logo text
    ctx.fillStyle = '#00F0FF';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('AURA ID · PROGRESSIVE RADAR', 90, 110);

    // Track Title & Artist
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px sans-serif';
    ctx.fillText(track.title, 90, 950);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '36px sans-serif';
    ctx.fillText(track.artist + (track.version ? ` (${track.version})` : ''), 90, 1010);

    // Label & Harmonic Info
    ctx.fillStyle = '#00F0FF';
    ctx.font = '30px monospace';
    ctx.fillText(`${track.recordLabel.toUpperCase()} · ${track.musicalKey} · ${track.bpm} BPM`, 90, 1070);

    // Set Context
    if (track.playedInSets?.[0]) {
      ctx.fillStyle = '#64748B';
      ctx.font = '28px sans-serif';
      ctx.fillText(`Played at: ${track.playedInSets[0].event} (${track.playedInSets[0].location})`, 90, 1130);
    }

    // Export image
    const imgUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = `AuraID_${track.title.replace(/\s+/g, '_')}_ShareCard.png`;
    a.click();
    setIsExporting(false);
  };

  const handleDownloadM3U = () => {
    const m3uContent = `#EXTM3U\n#EXTINF:${track.durationSeconds || 360},${track.artist} - ${track.title} [Key: ${track.musicalKey}, BPM: ${track.bpm}, Label: ${track.recordLabel}]\n${track.platforms?.[0]?.url || 'https://beatport.com'}\n`;
    const blob = new Blob([m3uContent], { type: 'audio/x-mpegurl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${track.title.replace(/\s+/g, '_')}_rekordbox.m3u8`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0D121F] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[#1A2234] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#00F0FF]" />
            <h2 className="text-sm font-bold text-white font-display">
              Social Share & DJ Setlist Export
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#64748B] hover:text-white hover:bg-[#1A2234] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Visual Story Card Preview */}
          <div
            ref={cardRef}
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden p-6 bg-gradient-to-b from-[#10172A] via-[#0B0F19] to-[#080A0F] border border-[#1E293B] shadow-2xl flex flex-col justify-between mb-5"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#00F0FF]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#00F0FF] text-black font-extrabold text-[10px] flex items-center justify-center font-display">
                  A
                </div>
                <span className="text-xs font-bold tracking-wider text-white font-display">
                  AURA ID
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-full border border-[#00F0FF]/20">
                VERIFIED ID
              </span>
            </div>

            {/* Central Artwork */}
            <div className="my-auto flex flex-col items-center z-10">
              <div className="w-44 h-44 rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-4 bg-black">
                <img
                  src={track.coverImage}
                  alt={track.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Audio Waveform Lines */}
              <div className="flex items-center gap-1 h-5 w-44 justify-center">
                {[12, 18, 14, 20, 16, 22, 15, 19, 13, 21, 17, 14, 22, 18].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#00F0FF] rounded-full opacity-80"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Card Footer Details */}
            <div className="z-10 bg-[#080A0F]/80 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <h3 className="text-base font-bold text-white font-display truncate">
                {track.title}
              </h3>
              <p className="text-xs text-[#94A3B8] truncate mb-2">
                {track.artist} {track.version && `(${track.version})`}
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span className="text-[#00F0FF] font-semibold">
                  {track.recordLabel}
                </span>
                <span>
                  {track.musicalKey} · {track.bpm} BPM
                </span>
              </div>
            </div>
          </div>

          {/* Export Actions Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="py-2.5 px-3 rounded-xl bg-[#00F0FF] text-black font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#00F0FF]/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Generating...' : 'Download Card'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-xl bg-[#141C2E] border border-[#1E293B] text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#1E293B] active:scale-95 transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Copy Track Link'}</span>
            </button>
          </div>

          {/* Export DJ Setlist / M3U */}
          <div className="pt-3 border-t border-[#1A2234] flex items-center justify-between text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#7928CA]" />
              <span>Export for Rekordbox / Traktor / Engine DJ (.m3u8)</span>
            </div>
            <button
              onClick={handleDownloadM3U}
              className="text-[#00F0FF] hover:underline font-mono text-[11px]"
            >
              Export M3U8
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
