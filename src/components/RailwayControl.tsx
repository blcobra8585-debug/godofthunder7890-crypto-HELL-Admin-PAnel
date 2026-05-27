import React, { useState } from 'react';
import { Server, Play, RotateCw, Trash2, Save, Terminal as TermIcon, FileCode, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';
import { RailwayDev } from '../types';

interface RailwayControlProps {
  railway: RailwayDev;
  onUpdateEnv: (key: string, value: string) => void;
  onAddEnv: (key: string, value: string) => void;
  onDeploy: () => void;
}

export default function RailwayControl({ railway, onUpdateEnv, onAddEnv, onDeploy }: RailwayControlProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [localEnv, setLocalEnv] = useState<Record<string, string>>({ ...railway.envVars });

  const handleUpdate = (key: string, val: string) => {
    setLocalEnv(prev => ({ ...prev, [key]: val }));
    onUpdateEnv(key, val);
  };

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;
    onAddEnv(newKey, newValue);
    setLocalEnv(prev => ({ ...prev, [newKey]: newValue }));
    setNewKey('');
    setNewValue('');
    setSuccessMsg("ENV VARIABLE ADDED TO ACTIVE STAGE!");
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleManualRedeploy = () => {
    setIsDeploying(true);
    // Play structural gear sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(180, audioCtx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {}

    setTimeout(() => {
      onDeploy();
      setIsDeploying(false);
      setSuccessMsg("CONTAINER BOOTED & STANDBY SECURE!");
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-4 px-4 py-4 max-h-full overflow-y-auto">
      {/* Header Panel */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold font-bold">RAILWAY ENGINE</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">CONTAINER MIDDLEWARE</h2>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-green"></span>
          <span className="text-[9px] font-mono text-emerald-400 font-extrabold uppercase">PORT 3000 RUNTIME</span>
        </div>
      </div>

      {/* Deploy Actions */}
      <div className="bg-zinc-950 p-3 rounded border border-zinc-900 space-y-3">
        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">CONTROL ACTIONS</label>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleManualRedeploy}
            disabled={isDeploying}
            className={`py-2 px-2.5 rounded border text-[10px] font-display font-extrabold tracking-widest uppercase cursor-pointer flex items-center justify-center space-x-1.5 transition-all ${
              isDeploying
                ? 'border-purple-500 text-purple-400 bg-purple-950/15'
                : 'border-red-500 text-neon-red bg-black hover:bg-zinc-900 shadow-[0_0_8px_rgba(255,0,51,0.15)]'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isDeploying ? 'animate-spin' : ''}`} />
            <span>{isDeploying ? 'REDEPLOYING...' : 'REBOOT SERVER'}</span>
          </button>

          <button
            onClick={() => {
              // Beep
              try {
                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.2);
              } catch {}
              alert("Purged all Railway cache files. Next compile will perform cold starts.");
            }}
            className="py-2 px-2.5 rounded border border-zinc-800 text-[10px] font-display font-extrabold tracking-widest uppercase cursor-pointer text-zinc-400 bg-black hover:border-zinc-700 hover:text-zinc-200"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1 inline" />
            <span>PURGE CACHE</span>
          </button>
        </div>

        {successMsg && (
          <div className="p-2 bg-emerald-950/10 border border-emerald-500/25 rounded text-emerald-400 font-mono text-[9px] uppercase tracking-wider text-center animate-pulse">
            {successMsg}
          </div>
        )}
      </div>

      {/* Env Vars Editor */}
      <div className="bg-black/80 rounded border border-zinc-900 p-3.5 relative space-y-3">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-850 text-[8px] font-mono text-red-500 tracking-widest font-extrabold uppercase">
          RAILWAY ECO env_vars COMPONENT
        </span>

        <form onSubmit={handleAddKey} className="pt-2 grid grid-cols-2 gap-2 pb-2.5 border-b border-zinc-900">
          <input
            type="text"
            required
            placeholder="ADD NEW KEY (e.g. PORT)"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value.toUpperCase())}
            className="text-[10px] font-mono bg-zinc-950 text-zinc-250 p-2 rounded border border-zinc-850 focus:outline-none focus:border-red-500"
          />
          <div className="flex space-x-1.5">
            <input
              type="text"
              required
              placeholder="VALUE"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="text-[10px] font-mono bg-zinc-950 text-cyan-400 p-2 rounded border border-zinc-850 focus:outline-none focus:border-cyan-500 flex-1 min-w-0"
            />
            <button
              type="submit"
              className="px-2.5 bg-red-950/10 border border-red-500 text-neon-red hover:bg-zinc-950 rounded cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="space-y-3 pt-1">
          {Object.entries(localEnv).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">{key}</span>
                <span className="text-[8px] font-mono text-red-650 tracking-wider">LIVE SECURE</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleUpdate(key, e.target.value)}
                  className="flex-1 text-[10px] font-mono bg-zinc-950 text-zinc-300 px-2 py-1.5 rounded border border-zinc-900 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const keys = { ...localEnv };
                    delete keys[key];
                    setLocalEnv(keys);
                    setSuccessMsg(`ENV KEY ${key} DELETED`);
                    setTimeout(() => setSuccessMsg(null), 2000);
                  }}
                  className="px-2 bg-red-950/20 border border-red-900 text-red-500 rounded cursor-pointer hover:bg-red-950/40 text-[9px] font-mono uppercase"
                >
                  PURGE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Log Logs Feed */}
      <div className="space-y-1.5">
        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">RAILWAY PLATFORM CONTAINER LOG SUMMARY</label>
        <div className="bg-zinc-950 border border-zinc-900/60 rounded p-2.5 max-h-36 overflow-y-auto space-y-1">
          {railway.logs.map((log, index) => (
            <p key={index} className="text-[9px] font-mono text-purple-400 hover:text-zinc-200 transition-colors">
              <span className="text-zinc-600 mr-1 select-none">»</span>
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
