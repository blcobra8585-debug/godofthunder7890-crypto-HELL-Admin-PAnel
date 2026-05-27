import React, { useState } from 'react';
import { GitBranch, GitCommit, GitPullRequest, RotateCcw, AlertTriangle, ArrowUpRight, Github, RefreshCw, Send } from 'lucide-react';
import { GitHubRepo } from '../types';

interface GitHubManagerProps {
  repo: GitHubRepo;
  onCommitPush: (msg: string) => void;
  onPull: () => void;
}

export default function GitHubManager({ repo, onCommitPush, onPull }: GitHubManagerProps) {
  const [commitMsg, setCommitMsg] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleCommitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMsg.trim()) return;

    setIsSyncing(true);
    setSyncLogs([
      `$ git status -s`,
      ` M src/components/RealmeEmulator.tsx`,
      ` M src/components/ControlConsole.tsx`,
      `$ git add .`,
      `$ git commit -m "${commitMsg}"`,
      `[main d4e83f2] ${commitMsg}`,
      `$ git push origin ${repo.branch}`,
      `Enumerating objects: 7, done.`,
      `Delta compression using up to 8 threads.`,
      `Writing objects: 100% (4/4), 482 bytes | 482.00 KiB/s, done.`,
      `To github.com:SuhanShaikh/${repo.repoName}.git`,
      `   8e30b1c..d4e83f2  ${repo.branch} -> ${repo.branch}`,
      `>> OK: WEBHOOK TRIGGER DISPATCHED LIVE TO RAILWAY BACKEND!`
    ]);

    // High tech git transmission beep
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {}

    setTimeout(() => {
      onCommitPush(commitMsg);
      setIsSyncing(false);
      setCommitMsg('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2200);
  };

  const handleFetchPull = () => {
    setIsSyncing(true);
    setSyncLogs([
      `$ git fetch origin`,
      `$ git pull origin ${repo.branch}`,
      `Already up to date.`,
      `>> Fetch & Pull diagnostic finished. Client clean.`
    ]);
    
    setTimeout(() => {
      onPull();
      setIsSyncing(false);
    }, 1000);
  };

  return (
    <div className="space-y-4 px-4 py-4 max-h-full overflow-y-auto">
      {/* Header Panel */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">OCTOPUS VERSION CONTROL</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">GITHUB PRODUCTION PIPELINE</h2>
        </div>
        <div className="p-1 px-2 rounded bg-black border border-zinc-900 font-mono text-[9px] text-zinc-400 font-bold uppercase flex items-center space-x-1">
          <Github className="w-3.5 h-3.5 text-zinc-400 mr-0.5" />
          <span>REPO: {repo.repoName}</span>
        </div>
      </div>

      {/* Git Hub Branch Selection Row */}
      <div className="grid grid-cols-2 gap-3.5 bg-zinc-950 p-3 rounded border border-zinc-900">
        <div>
          <span className="text-[8px] font-mono text-zinc-500 block uppercase">ACTIVE REPO BRANCH</span>
          <div className="flex items-center space-x-2 mt-1.5">
            <GitBranch className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-400">{repo.branch}</span>
          </div>
        </div>

        <div className="text-right flex flex-col justify-between items-end">
          <span className="text-[8px] font-mono text-zinc-500 block uppercase">CI/CD TRIGGER ACTION</span>
          <button
            onClick={handleFetchPull}
            disabled={isSyncing}
            className="mt-1 text-[9px] font-mono font-bold px-2.5 py-1 bg-black border border-zinc-800 text-zinc-400 rounded hover:border-cyan-500 hover:text-cyan-400 cursor-pointer active:scale-95 transition-all flex items-center space-x-1"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>FETCH & PULL</span>
          </button>
        </div>
      </div>

      {/* Fast Commit & Push Form */}
      <form onSubmit={handleCommitSubmit} className="bg-black border border-zinc-900 p-3.5 rounded relative space-y-3">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-850 text-[8px] font-mono text-red-500 tracking-widest font-extrabold uppercase">
          TRIGGER COMMIT & AUTO-DEPLOY HOOK
        </span>

        <div className="space-y-1.5 pt-1">
          <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">GIT COMMIT MESSAGE</label>
          <input
            type="text"
            required
            value={commitMsg}
            onChange={(e) => setCommitMsg(e.target.value)}
            className="w-full text-xs font-mono bg-zinc-950 text-zinc-300 p-2.5 rounded border border-zinc-850 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="e.g. patch: optimize 120hz frame rendering loops"
          />
        </div>

        <button
          type="submit"
          disabled={isSyncing}
          className={`w-full py-2.5 rounded border font-display font-black tracking-widest text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            isSyncing
              ? 'border-cyan-500/50 text-cyan-400 bg-cyan-950/10'
              : 'border-red-500 text-neon-red bg-zinc-950 hover:bg-zinc-900 shadow-[0_0_10px_rgba(255,0,51,0.15)] hover:shadow-[0_0_15px_rgba(255,0,51,0.4)]'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSyncing ? 'COMMIT & DEPLOYING DISPATCH...' : 'COMMIT & DISPATCH TO LIVE'}</span>
        </button>

        {success && (
          <p className="text-[9px] font-mono text-emerald-400 text-center animate-pulse uppercase tracking-wider">
            REDEPLOY DISPATCHED SUCCESSFULLY! SYSTEM ON REBOOT SEQUENCE.
          </p>
        )}
      </form>

      {/* Real-time GitHub stream logs console terminal */}
      {syncLogs.length > 0 && (
        <div className="bg-black border border-cyan-950 rounded p-2.5 font-mono text-[9.5px] text-cyan-400 space-y-1 max-h-36 overflow-y-auto shadow-inner animate-flicker">
          <div className="flex items-center justify-between pb-1 border-b border-cyan-950/40 mb-1.5">
            <span>GIT WORKSPACE DIAGNOSTICS</span>
            <span className="w-2 h-2 rounded bg-cyan-400 animate-pulse"></span>
          </div>
          {syncLogs.map((log, index) => (
            <p key={index} className="leading-snug">{log}</p>
          ))}
        </div>
      )}

      {/* Commit Logs Timeline Feed */}
      <div className="space-y-2">
        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold flex items-center space-x-1">
          <GitCommit className="w-4 h-4 text-zinc-600 mr-1" />
          <span>PRODUCTION COMMITS AUDITING LOGS</span>
        </label>

        <div className="space-y-2">
          {repo.commits.map((c, i) => (
            <div key={c.sha} className="bg-zinc-950/70 border border-zinc-900 rounded p-3 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-200">
                    {c.message}
                  </h4>
                  <p className="text-[9px] font-mono text-zinc-500 mt-1 flex items-center space-x-2">
                    <span className="bg-zinc-900 border border-zinc-800 px-1 rounded text-[8px] text-cyan-400 tracking-wider">SHA: {c.sha}</span>
                    <span>•</span>
                    <span>AUTHOR: {c.author}</span>
                  </p>
                </div>
                <span className="text-[8px] font-mono text-zinc-600 uppercase text-right shrink-0">{c.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
