import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Server, Database, RefreshCw, Zap, ShieldAlert, CheckCircle2, ChevronRight, Sliders } from 'lucide-react';
import { SystemStatus, SystemConfig } from '../types';

interface OverviewDashboardProps {
  status: SystemStatus;
  config: SystemConfig;
  updateConfig: (updater: Partial<SystemConfig>) => void;
  onRefresh: () => void;
}

export default function OverviewDashboard({ status, config, updateConfig, onRefresh }: OverviewDashboardProps) {
  const [latencyNoise, setLatencyNoise] = useState({
    gemini: 0,
    claude: 0,
    groq: 0
  });

  const [isPingTesting, setIsPingTesting] = useState(false);

  // Generate slight random jitter on latency to represent life network traffic!
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyNoise({
        gemini: Math.floor(Math.random() * 12 - 6),
        claude: Math.floor(Math.random() * 14 - 7),
        groq: Math.floor(Math.random() * 8 - 4)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleManualPingTest = () => {
    setIsPingTesting(true);
    // Play industrial pulse sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch { }

    setTimeout(() => {
      setIsPingTesting(false);
      onRefresh();
    }, 1000);
  };

  const getLatencyColor = (lat: number, active: boolean) => {
    if (!active) return 'text-zinc-600 border-zinc-900';
    if (lat < 100) return 'text-emerald-400 border-emerald-500/30';
    if (lat < 135) return 'text-cyan-400 border-cyan-500/30';
    return 'text-amber-400 border-amber-500/30';
  };

  return (
    <div className="space-y-5 px-4 py-4 max-h-full overflow-y-auto">
      {/* Top Section Header */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">SYSTEM OVERVIEW</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">NETWORK CONSOLE UNIT</h2>
        </div>
        <button
          onClick={handleManualPingTest}
          disabled={isPingTesting}
          className="relative px-3 py-1.5 rounded bg-black border border-red-500 text-[10px] font-mono font-bold tracking-widest text-neon-red flex items-center space-x-1 hover:bg-zinc-950 active:scale-95 duration-100 cursor-pointer shadow-[0_0_10px_rgba(255,0,51,0.15)]"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-red-500 ${isPingTesting ? 'animate-spin' : ''}`} />
          <span>{isPingTesting ? 'DIAGNOSING...' : 'FORCE PING TEST'}</span>
        </button>
      </div>

      {/* Primary Server Status */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Railway card */}
        <div className="relative bg-zinc-950 rounded border border-zinc-900 p-3 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-500/5 to-transparent rounded-tr pointer-events-none"></div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded bg-black border border-red-950">
              <Server className="w-4.5 h-4.5 text-red-500 animate-flicker" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">MIDDLEWARE</p>
              <h3 className="text-xs font-sans font-bold text-zinc-200 tracking-wide">Railway Server</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[9px] font-mono text-zinc-600 uppercase">LOCATION: SINGAPORE</span>
            <div className="flex items-center space-x-1 bg-emerald-950/20 border border-emerald-900/30 px-1.5 py-0.5 rounded animate-pulse-green">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">ACTIVE SECURE</span>
            </div>
          </div>
        </div>

        {/* Supabase card */}
        <div className="relative bg-zinc-950 rounded border border-zinc-900 p-3 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-tr pointer-events-none"></div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded bg-black border border-emerald-950">
              <Database className="w-4.5 h-4.5 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">DATABASE</p>
              <h3 className="text-xs font-sans font-bold text-zinc-200 tracking-wide">Supabase Cloud</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[9px] font-mono text-zinc-600 uppercase">SCHEMAS: 5 LIVE</span>
            <div className="flex items-center space-x-1 bg-emerald-950/20 border border-emerald-900/30 px-1.5 py-0.5 rounded animate-pulse-green">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">SYNCED</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Failover Engine Map */}
      <div className="bg-black/80 rounded border border-zinc-900 p-4 relative">
        <div className="absolute -top-2 left-4 px-2 bg-black border border-zinc-800 text-[8px] font-mono text-red-500 tracking-widest font-extrabold uppercase">
          ROUTING CONTROL & FAILOVER INTEGRAL
        </div>

        <div className="space-y-3.5 mt-2">
          {/* Gemini card */}
          <div className={`p-3 rounded border flex items-center justify-between transition-all duration-300 ${
            config.activeAi === 'gemini' 
              ? 'bg-cyan-950/10 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.15)]' 
              : 'bg-zinc-950/50 border-zinc-900 opacity-60'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-extrabold border ${
                config.activeAi === 'gemini' 
                  ? 'bg-cyan-950/40 border-cyan-400 text-cyan-400 animate-pulse' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500'
              }`}>
                PRIMARY
              </div>
              <div>
                <h4 className="text-xs font-sans font-extrabold text-zinc-100 flex items-center space-x-1.5">
                  <span>Google Gemini 2.5</span>
                  {config.activeAi === 'gemini' && (
                    <span className="px-1 text-[7px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded uppercase">ACTIVE</span>
                  )}
                </h4>
                <p className="text-[9px] font-mono text-zinc-400">Story Engine, Dialogues, Custom Level Seed Generation</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-zinc-500 block uppercase">LATENCY</span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {status.geminiLatency + latencyNoise.gemini}ms
              </span>
            </div>
          </div>

          {/* Claude card */}
          <div className={`p-3 rounded border flex items-center justify-between transition-all duration-300 ${
            config.activeAi === 'claude' 
              ? 'bg-amber-950/10 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.15)]' 
              : 'bg-zinc-950/50 border-zinc-900 opacity-60'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-extrabold border ${
                config.activeAi === 'claude' 
                  ? 'bg-amber-950/40 border-amber-500 text-amber-500 animate-pulse' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500'
              }`}>
                ALT 1
              </div>
              <div>
                <h4 className="text-xs font-sans font-extrabold text-zinc-100 flex items-center space-x-1.5">
                  <span>Anthropic Claude 3.5</span>
                  {config.activeAi === 'claude' && (
                    <span className="px-1 text-[7px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded uppercase">STANDBY ON</span>
                  )}
                </h4>
                <p className="text-[9px] font-mono text-zinc-400">Logical Reasoning, Interactive Puzzle Guides, Failover</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-zinc-500 block uppercase">LATENCY</span>
              <span className="text-xs font-mono font-bold text-amber-400">
                {status.claudeLatency + latencyNoise.claude}ms
              </span>
            </div>
          </div>

          {/* Groq card */}
          <div className={`p-3 rounded border flex items-center justify-between transition-all duration-300 ${
            config.activeAi === 'groq' 
              ? 'bg-purple-950/10 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.15)]' 
              : 'bg-zinc-950/50 border-zinc-900 opacity-60'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-extrabold border ${
                config.activeAi === 'groq' 
                  ? 'bg-purple-950/40 border-purple-500 text-purple-400 animate-pulse' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500'
              }`}>
                ALT 2
              </div>
              <div>
                <h4 className="text-xs font-sans font-extrabold text-zinc-100 flex items-center space-x-1.5">
                  <span>Groq Llama 3 v2</span>
                  {config.activeAi === 'groq' && (
                    <span className="px-1 text-[7px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded uppercase">HIGH-SPEED</span>
                  )}
                </h4>
                <p className="text-[9px] font-mono text-zinc-400">Sub-90ms Real-Time Combat Events, Lightning Queries</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-zinc-500 block uppercase">LATENCY</span>
              <span className="text-xs font-mono font-bold text-purple-400">
                {status.groqLatency + latencyNoise.groq}ms
              </span>
            </div>
          </div>
        </div>

        {/* Manual Router Override Control Grid */}
        <div className="mt-4 pt-3 border-t border-zinc-900">
          <label className="text-[9px] font-mono text-zinc-500 tracking-wider block uppercase mb-2">MANUAL OVERRIDING CIRCUIT BREAKER ROUTER</label>
          <div className="grid grid-cols-3 gap-2">
            {(['gemini', 'claude', 'groq'] as const).map((aiOption) => (
              <button
                key={aiOption}
                onClick={() => {
                  updateConfig({ activeAi: aiOption });
                  // Quick hover sound beep
                  try {
                    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(aiOption === 'gemini' ? 350 : aiOption === 'claude' ? 420 : 500, audioCtx.currentTime);
                    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start();
                    osc.stop(audioCtx.currentTime + 0.15);
                  } catch {}
                }}
                className={`py-2 px-1 rounded text-[10px] font-display font-extrabold tracking-widest text-center cursor-pointer transition-all uppercase border ${
                  config.activeAi === aiOption
                    ? 'bg-red-950/20 border-red-500 text-neon-red shadow-[0_0_10px_rgba(255,0,51,0.22)]'
                    : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800'
                }`}
              >
                FORCE {aiOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Safety warnings / diagnostics logs */}
      <div className="bg-zinc-950 rounded border border-zinc-900 p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-red-500 font-extrabold tracking-widest uppercase flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
            <span>CRITICAL LOG EVENTS - ANOMALY DETECTED</span>
          </span>
          <span className="text-[8px] font-mono text-zinc-600">HELL52_TELEMETRY</span>
        </div>
        <div className="font-mono text-[9px] space-y-1 bg-black p-2.5 rounded border border-zinc-900 max-h-24 overflow-y-auto">
          <p className="text-yellow-500/80">
            [23:17:03] WARNING: STAGE CRANE_02 ANOMALOUS PATH MOVEMENT INITIATED
          </p>
          <p className="text-zinc-500">
            [23:16:45] SYSTEM: ElevenLabs Audio buffer generated successfully (Guide: slime_anime_mysterious)
          </p>
          <p className="text-red-500 animate-pulse">
            [23:15:20] ERR_ALERT: Zombie mic volume threshold exceeded - Level 4 Alert spawned
          </p>
          <p className="text-zinc-500">
            [23:14:12] SYSTEM: Gemini API Routing optimized dynamically - 120ms roundtrip.
          </p>
        </div>
      </div>
    </div>
  );
}
