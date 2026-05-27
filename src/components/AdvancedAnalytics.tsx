import React, { useState } from 'react';
import { Sliders, Shield, Ghost, CloudDrizzle, ShieldX, Skull, Radio, Volume2, TrendingDown, TrendingUp, AlertOctagon } from 'lucide-react';
import { SystemConfig, PlayerMetric } from '../types';

interface AdvancedAnalyticsProps {
  metrics: PlayerMetric[];
  config: SystemConfig;
  updateConfig: (updater: Partial<SystemConfig>) => void;
}

export default function AdvancedAnalytics({ metrics, config, updateConfig }: AdvancedAnalyticsProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(metrics[metrics.length - 1].day);
  const [testMicVolume, setTestMicVolume] = useState(42);

  const activeDayMetric = metrics.find(m => m.day === selectedDay) || metrics[metrics.length - 1];

  // Helper calculation to draw smooth custom SVG paths for full-support vector charts
  const maxActivePlayers = Math.max(...metrics.map(m => m.activePlayers));
  const minActivePlayers = Math.min(...metrics.map(m => m.activePlayers));

  const svgWidth = 320;
  const svgHeight = 120;
  const padding = 20;

  // Generate coordinates for Player Metrics line chart path
  const points = metrics.map((m, index) => {
    const x = padding + (index / (metrics.length - 1)) * (svgWidth - padding * 2);
    // Normalize y
    const normalizedY = (m.activePlayers - minActivePlayers) / (maxActivePlayers - minActivePlayers);
    const y = svgHeight - padding - normalizedY * (svgHeight - padding * 2);
    return { x, y, m };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPathD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

  const playToggleSound = (status: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(status ? 550 : 280, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(status ? 880 : 150, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {}
  };

  return (
    <div className="space-y-4.5 px-4 py-4 max-h-full overflow-y-auto">
      {/* Target Section Header */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">GAME STATISTICS</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">ADVANCED ANALYTICS & TUNES</h2>
        </div>
        <div className="p-1 px-2 rounded bg-black border border-red-500/30 text-neon-red font-mono text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1 animate-pulse-red">
          <Volume2 className="w-3.5 h-3.5" />
          <span>LIVE CONTROLS</span>
        </div>
      </div>

      {/* Global Sandbox Engine Controls Toggles */}
      <div className="bg-black/95 rounded border border-zinc-900 p-3 relative space-y-3">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-800 text-[8px] font-mono text-red-500 tracking-widest font-extrabold uppercase">
          GLOBAL GAME CONFIGURATION OVERRIDES
        </span>

        {/* Option 1: Mic Zombie Detection */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-start space-x-2.5">
            <div className={`p-1.5 rounded ${config.micZombieDetection ? 'border border-red-500/30 text-red-400 bg-red-950/10' : 'border border-zinc-805 text-zinc-650'}`}>
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-sans font-bold text-zinc-200">Mic Zombie Detection</h3>
              <p className="text-[9px] font-mono text-zinc-500">Alert nearby industrial zombies when Suhan screams on mic</p>
            </div>
          </div>
          <button
            onClick={() => {
              const newVal = !config.micZombieDetection;
              updateConfig({ micZombieDetection: newVal });
              playToggleSound(newVal);
            }}
            className={`w-11 h-5 rounded-full p-0.5 transition-all outline-none duration-300 relative cursor-pointer ${
              config.micZombieDetection ? 'bg-red-900/60 border border-red-500 shadow-[0_0_8px_rgba(255,0,51,0.3)]' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-full shadow-md transition-all duration-300 ${
              config.micZombieDetection ? 'translate-x-6 bg-red-500' : 'translate-x-0 bg-zinc-650'
            }`}></div>
          </button>
        </div>

        {/* Dynamic simulator of the mic decibel indicator if mic detection is active to look highly interactive */}
        {config.micZombieDetection && (
          <div className="bg-zinc-950/80 rounded p-2 border border-red-950/40 space-y-1.5 animate-pulse-red">
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
              <span className="flex items-center">
                <Volume2 className="w-3 h-3 text-red-400 mr-1 animate-pulse" />
                <span>REALME INPUT MIC LEVEL:</span>
              </span>
              <span className="text-red-400 font-bold">{testMicVolume} dB (THRESHOLD: 65 dB)</span>
            </div>
            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden flex">
              <div className="bg-red-500 h-full" style={{ width: `${testMicVolume}%` }}></div>
            </div>
            <p className="text-[7.5px] font-mono text-red-400/70 uppercase text-center tracking-wide">
              WARNING: HIGHER NOISE DETECTED WILL INCREASE ZOMBIE AGGRESSION
            </p>
          </div>
        )}

        {/* Option 2: Ghost Trace */}
        <div className="flex items-center justify-between border-t border-zinc-950 pt-3">
          <div className="flex items-start space-x-2.5">
            <div className={`p-1.5 rounded ${config.ghostTrace ? 'border border-cyan-500/30 text-cyan-400 bg-cyan-950/10' : 'border border-zinc-805 text-zinc-650'}`}>
              <Ghost className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-sans font-bold text-zinc-200">Ghost Trace Sync</h3>
              <p className="text-[9px] font-mono text-zinc-500">Sync previous player death coordinates onto multiplayer grids</p>
            </div>
          </div>
          <button
            onClick={() => {
              const newVal = !config.ghostTrace;
              updateConfig({ ghostTrace: newVal });
              playToggleSound(newVal);
            }}
            className={`w-11 h-5 rounded-full p-0.5 transition-all outline-none duration-300 relative cursor-pointer ${
              config.ghostTrace ? 'bg-cyan-900/60 border border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-full shadow-md transition-all duration-300 ${
              config.ghostTrace ? 'translate-x-6 bg-cyan-400' : 'translate-x-0 bg-zinc-650'
            }`}></div>
          </button>
        </div>

        {/* Option 3: Weather AI Force */}
        <div className="flex items-center justify-between border-t border-zinc-950 pt-3">
          <div className="flex items-start space-x-2.5">
            <div className={`p-1.5 rounded ${config.weatherAi ? 'border border-emerald-500/30 text-emerald-400 bg-emerald-950/10' : 'border border-zinc-805 text-zinc-650'}`}>
              <CloudDrizzle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-sans font-bold text-zinc-200">Dynamic Weather AI</h3>
              <p className="text-[9px] font-mono text-zinc-500">Ramp visibility and slippery physics on rainstorms</p>
            </div>
          </div>
          <button
            onClick={() => {
              const newVal = !config.weatherAi;
              updateConfig({ weatherAi: newVal });
              playToggleSound(newVal);
            }}
            className={`w-11 h-5 rounded-full p-0.5 transition-all outline-none duration-300 relative cursor-pointer ${
              config.weatherAi ? 'bg-emerald-900/60 border border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-zinc-900 border border-zinc-800'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-full shadow-md transition-all duration-300 ${
              config.weatherAi ? 'translate-x-6 bg-emerald-400' : 'translate-x-0 bg-zinc-650'
            }`}></div>
          </button>
        </div>

        {/* Option 4: Max Ammunition Configs */}
        <div className="border-t border-zinc-950 pt-3 flex items-center justify-between">
          <div className="flex items-start space-x-2.5">
            <div className="p-1.5 rounded border border-zinc-850 text-zinc-400">
              <Skull className="w-4 h-4 text-amber-500 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-sans font-bold text-zinc-200">Lethal Ammunition Limit</h3>
              <p className="text-[9px] font-mono text-zinc-500">Configure absolute max gun clip specs to amplify horror (1-24)</p>
            </div>
          </div>
          <div className="flex items-center space-x-2.5 bg-black border border-zinc-800 px-1.5 py-1 rounded">
            <button
              onClick={() => {
                if (config.maxAmmo > 1) {
                  updateConfig({ maxAmmo: config.maxAmmo - 1 });
                  playToggleSound(false);
                }
              }}
              className="w-5 h-5 flex items-center justify-center font-mono font-bold text-zinc-400 hover:text-zinc-100 bg-zinc-950 border border-zinc-850 rounded cursor-pointer select-none active:scale-90"
            >
              -
            </button>
            <span className="w-5 text-center text-xs font-mono font-extrabold text-red-500">{config.maxAmmo}</span>
            <button
              onClick={() => {
                if (config.maxAmmo < 24) {
                  updateConfig({ maxAmmo: config.maxAmmo + 1 });
                  playToggleSound(true);
                }
              }}
              className="w-5 h-5 flex items-center justify-center font-mono font-bold text-zinc-400 hover:text-zinc-100 bg-zinc-950 border border-zinc-850 rounded cursor-pointer select-none active:scale-90"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Sleek Custom Glowing Line Chart: Player Counts */}
      <div className="bg-zinc-950 rounded border border-zinc-900 p-3 relative">
        <h4 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">WEEKLY ACTIVE USERS</h4>
        <div className="text-xs font-display font-black text-neon-red flex items-center space-x-1.5 mb-2">
          <span>{activeDayMetric.activePlayers} ACTIVE IN HELL</span>
          <span className="text-[8px] font-mono opacity-80 text-emerald-400 font-bold tracking-tight">+18.4% GAIN</span>
        </div>

        {/* Beautiful vector SVG chart with glowing laser-red line */}
        <div className="relative">
          <svg className="w-full h-28 bg-black/50 border border-zinc-90 w-full rounded" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            <defs>
              <linearGradient id="chartGlowRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF0033" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF0033" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            
            {/* Grid Lines */}
            <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="#18181b" strokeWidth={1} strokeDasharray="3 3" />
            <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding} y2={svgHeight / 2} stroke="#18181b" strokeWidth={1} strokeDasharray="3 3" />
            <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#27272a" strokeWidth={1} />
            
            {/* Ambient Shadow Overlay under line */}
            <path d={areaPathD} fill="url(#chartGlowRed)" />

            {/* Glowing Laser line */}
            <path d={pathD} fill="none" stroke="#FF0033" strokeWidth={2.2} className="drop-shadow-[0_0_6px_rgba(255,0,51,0.8)]" />

            {/* Data Coordinates Dots */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={selectedDay === p.m.day ? 4.5 : 2}
                fill={selectedDay === p.m.day ? '#FFF' : '#FF0033'}
                stroke="#FF0033"
                strokeWidth={selectedDay === p.m.day ? 3 : 0}
                className="cursor-pointer duration-100"
                onClick={() => setSelectedDay(p.m.day)}
              />
            ))}
          </svg>

          {/* Chart label values */}
          <div className="flex justify-between px-2 pt-1.5 font-mono text-[8px] text-zinc-650">
            {metrics.map((m) => (
              <button
                key={m.day}
                onClick={() => setSelectedDay(m.day)}
                className={`cursor-pointer transition-colors ${selectedDay === m.day ? 'text-red-500 font-extrabold' : 'hover:text-zinc-300'}`}
              >
                {m.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Double stats indicators */}
      <div className="grid grid-cols-2 gap-3">
        {/* Stat Item A: AI Token usage rates */}
        <div className="bg-zinc-950 rounded border border-zinc-900 p-3.5 space-y-2">
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">AI TOKEN CONVERSION</span>
          <div className="flex justify-between items-end">
            <span className="text-lg font-display font-black text-cyan-400">
              {activeDayMetric.tokenUsage}%
            </span>
            <span className="text-[7.5px] font-mono text-zinc-500 font-bold block pb-1">SST/RPM LIMITS</span>
          </div>
          {/* Custom bar filled chart mimic */}
          <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full drop-shadow-[0_0_3px_rgba(6,182,212,0.8)]" style={{ width: `${activeDayMetric.tokenUsage}%` }}></div>
          </div>
        </div>

        {/* Stat Item B: Horror intensity outputs */}
        <div className="bg-zinc-950 rounded border border-zinc-900 p-3.5 space-y-2">
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">LEVEL HORROR INTENSITY</span>
          <div className="flex justify-between items-end">
            <span className="text-lg font-display font-black text-purple-400 animate-pulse">
              {activeDayMetric.horrorIntensity}/100
            </span>
            <span className="text-[7.5px] font-mono text-red-500 font-bold uppercase tracking-tight block pb-1">ANOMALOUS ALPHA</span>
          </div>
          {/* Custom bar filled chart mimic */}
          <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full" style={{ width: `${activeDayMetric.horrorIntensity}%` }}></div>
          </div>
        </div>
      </div>

      {/* Detailed information note on how to synchronize */}
      <div className="bg-red-950/20 border border-red-500/30 p-3.5 rounded flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[8px] font-mono text-red-500 font-black block uppercase tracking-wider">HAPTIC CRANE VIBRATOR ENGAGED</span>
          <p className="text-[8px] font-mono text-zinc-400 uppercase">REALME GT FORWARD HAPTICS ENGAGED AT LEVEL 2.0</p>
        </div>
        <div className="w-2 h-2 rounded bg-red-400 animate-ping"></div>
      </div>
    </div>
  );
}
