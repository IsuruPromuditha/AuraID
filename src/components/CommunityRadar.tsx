import React, { useState, useEffect } from 'react';
import {
  Radio,
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  CheckCircle,
  HelpCircle,
  Plus,
  Send,
  Sparkles,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { GlobalDrop, IDRequestPost, Track } from '../types';
import { INITIAL_GLOBAL_DROPS, INITIAL_ID_REQUESTS } from '../data/progressiveCatalog';

interface CommunityRadarProps {
  onSelectTrackByTitle: (title: string) => void;
}

export const CommunityRadar: React.FC<CommunityRadarProps> = ({
  onSelectTrackByTitle,
}) => {
  const [drops, setDrops] = useState<GlobalDrop[]>(INITIAL_GLOBAL_DROPS);
  const [requests, setRequests] = useState<IDRequestPost[]>(INITIAL_ID_REQUESTS);
  const [activeSubTab, setActiveSubTab] = useState<'radar' | 'hunt'>('radar');
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  // Form states for new ID request
  const [reqTitle, setReqTitle] = useState('');
  const [reqContext, setReqContext] = useState('');
  const [reqDesc, setReqDesc] = useState('');

  // Fetch initial updates
  useEffect(() => {
    fetch('/api/community/drops')
      .then((res) => res.json())
      .then((data) => {
        if (data.drops) setDrops(data.drops);
      })
      .catch((e) => console.log('drops fetch err', e));

    fetch('/api/community/id-requests')
      .then((res) => res.json())
      .then((data) => {
        if (data.requests) setRequests(data.requests);
      })
      .catch((e) => console.log('requests fetch err', e));
  }, []);

  const handleUpvote = async (id: string) => {
    try {
      const res = await fetch('/api/community/id-requests/upvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, upvotes: data.upvotes } : r))
        );
      }
    } catch (e) {
      console.log('upvote err', e);
    }
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim()) return;

    try {
      const res = await fetch('/api/community/id-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: reqTitle,
          eventContext: reqContext || 'Recent Progressive DJ Set',
          audioSnippetDescription: reqDesc || 'Unreleased progressive sequence',
        }),
      });
      const data = await res.json();
      if (data.success && data.request) {
        setRequests((prev) => [data.request, ...prev]);
        setReqTitle('');
        setReqContext('');
        setReqDesc('');
        setIsSubmittingNew(false);
      }
    } catch (e) {
      console.log('create request err', e);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Toggle Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Drop Radar & Unreleased ID Hunting
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Real-time live identification stream across legendary progressive clubs and community crowd-sourced ID hunts.
          </p>
        </div>

        {/* Segmented Sub-Nav Controls */}
        <div className="flex items-center gap-1 p-1 bg-[#0D121F] rounded-xl border border-[#1E293B]">
          <button
            onClick={() => setActiveSubTab('radar')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'radar'
                ? 'bg-[#00F0FF] text-black shadow-md shadow-[#00F0FF]/15'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Live Drop Radar</span>
          </button>

          <button
            onClick={() => setActiveSubTab('hunt')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'hunt'
                ? 'bg-[#00F0FF] text-black shadow-md shadow-[#00F0FF]/15'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Unreleased ID Hunt ({requests.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Live Drop Radar Feed */}
      {activeSubTab === 'radar' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-mono">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              Broadcasting global live acoustic IDs
            </span>
            <span>Refreshed continuously</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drops.map((drop) => (
              <div
                key={drop.id}
                className="p-4 rounded-xl bg-[#0D121F] border border-[#1A2234] hover:border-[#334155] transition-all flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#080A0F] border border-white/10 shrink-0">
                    <img
                      src={drop.coverImage}
                      alt={drop.trackTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00F0FF] mb-0.5">
                      <span>{drop.recordLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{drop.musicalKey}</span>
                      <span aria-hidden="true">·</span>
                      <span>{drop.bpm} BPM</span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-display">
                      {drop.trackTitle}
                    </h3>
                    <p className="text-xs text-[#94A3B8]">{drop.artist}</p>

                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#64748B] font-mono">
                      <span className="flex items-center gap-1 text-white">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {drop.venueOrFestival}, {drop.city}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{drop.identifiedAgo}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTrackByTitle(drop.trackTitle)}
                  className="px-3 py-1.5 rounded-lg bg-[#141C2E] hover:bg-[#1E293B] text-xs font-mono text-[#00F0FF] border border-[#1E293B] transition-colors whitespace-nowrap"
                >
                  View ID
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: The Unreleased ID Hunt Forum */}
      {activeSubTab === 'hunt' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#94A3B8] max-w-xl">
              Heard an unreleased gem at a festival set? Post acoustic details, key, and timestamp for the progressive community to identify.
            </p>
            <button
              onClick={() => setIsSubmittingNew(!isSubmittingNew)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#7928CA] text-black text-xs font-bold font-display hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-lg shadow-[#00F0FF]/15"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit ID Inquiry</span>
            </button>
          </div>

          {/* New ID Request Submission Form */}
          {isSubmittingNew && (
            <form
              onSubmit={handleCreateRequest}
              className="p-5 rounded-2xl bg-[#0D121F] border border-[#00F0FF]/30 space-y-3.5 animate-in fade-in"
            >
              <h3 className="text-sm font-bold text-white font-display">
                Post an Unreleased Progressive ID Request
              </h3>

              <div>
                <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1">
                  Track / ID Working Title
                </label>
                <input
                  type="text"
                  required
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                  placeholder="e.g. Anyma x Tale of Us Unreleased Intro ID @ Zamna Tulum"
                  className="w-full px-3 py-2 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white focus:border-[#00F0FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1">
                    Event / Festival & DJ Context
                  </label>
                  <input
                    type="text"
                    value={reqContext}
                    onChange={(e) => setReqContext(e.target.value)}
                    placeholder="e.g. Forja Cordoba · Hernan Cattaneo Marathon Set"
                    className="w-full px-3 py-2 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase mb-1">
                    Acoustic Characteristics (BPM, Key, Synth Sound)
                  </label>
                  <input
                    type="text"
                    value={reqDesc}
                    onChange={(e) => setReqDesc(e.target.value)}
                    placeholder="e.g. 125 BPM, minor chord progression, rolling bassline"
                    className="w-full px-3 py-2 bg-[#080A0F] border border-[#1E293B] rounded-xl text-xs text-white focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmittingNew(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#94A3B8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#00F0FF] text-black text-xs font-semibold hover:opacity-95"
                >
                  Post Request
                </button>
              </div>
            </form>
          )}

          {/* List of ID Requests */}
          <div className="space-y-3.5">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-[#0D121F] border border-[#1A2234] hover:border-[#334155] transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.userAvatar}
                      alt={req.submittedBy}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {req.submittedBy}
                        </span>
                        <span className="text-[11px] text-[#64748B] font-mono">
                          {req.timestamp}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#00F0FF] font-mono">
                        {req.eventContext}
                      </div>
                    </div>
                  </div>

                  {/* Solved Status Indicator */}
                  <div>
                    {req.hasBeenSolved ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xs font-mono font-semibold flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        ID SOLVED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        HUNTING ID
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1.5">
                  {req.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mb-4">
                  {req.audioSnippetDescription}
                </p>

                {/* If Solved, show solved track banner */}
                {req.hasBeenSolved && req.solvedTrack && (
                  <div className="p-3 bg-[#080A0F] border border-[#10B981]/30 rounded-xl flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0">
                        <img
                          src={req.solvedTrack.coverImage}
                          alt={req.solvedTrack.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {req.solvedTrack.title} — {req.solvedTrack.artist}
                        </div>
                        <div className="text-[11px] text-[#10B981] font-mono">
                          Confirmed Release on {req.solvedTrack.recordLabel} Records
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectTrackByTitle(req.solvedTrack!.title)}
                      className="text-xs text-[#00F0FF] hover:underline font-mono"
                    >
                      View Full ID →
                    </button>
                  </div>
                )}

                {/* Interaction Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[#141C2E] text-xs text-[#64748B] font-mono">
                  <button
                    onClick={() => handleUpvote(req.id)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>{req.upvotes} upvotes</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#7928CA]" />
                    <span>{req.repliesCount} DJ comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
