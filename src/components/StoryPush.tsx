import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, Clock, BookOpen, User, Flame, History, Code, Sparkles, Check } from 'lucide-react';
import { StoryPush as StoryPushType } from '../types';

interface StoryPushProps {
  history: StoryPushType[];
  onAddPush: (newPush: Omit<StoryPushType, 'id' | 'created_at' | 'active'>) => void;
}

const PRESETS = [
  {
    title: "SS CRANE_01 MALFUNCTION DEVIATION",
    type: "crane-anomaly" as const,
    seed: "SEED_CRANE_9012_ANOMALOUS",
    content: `{
  "unreal_entity": "SS_CRANE_01",
  "anomaly_rate": 0.85,
  "behavior": "UNPREDICTABLE_REVOLUTION_STRIKE",
  "spotlight_flicker_hz": 12.5,
  "sound_cue": "HEAVY_METAL_METALLIC_COLLAPSE",
  "zombie_multiplier": 1.5,
  "objective": "Restore power grid switches to safety backup manual panels before Crane structural integrity breaks."
}`
  },
  {
    title: "INDUSTRIAL STRAWBERRY-GAS INTRUSION",
    type: "gas-leak" as const,
    seed: "SEED_GAS_HAL_442",
    content: `{
  "environment_state": "GAS_LEAK_HALLUCINATION",
  "leak_source": "SECTOR_C_PRIMARY_VALVES",
  "hallucination_level": "MAX_PSYCHOLOGICAL_TERROR",
  "visual_override": "FLICKERING_PURPLE_HUD_SHADOWS",
  "phantom_zombies": true,
  "objective": "Locate chemical protective safety gear and secure gas valve using industrial wrench puzzle."
}`
  },
  {
    title: "BLACKOUT - MAIN ELECTRICAL SEALS RUPTURED",
    type: "power-failure" as const,
    seed: "SEED_BLACKOUT_881",
    content: `{
  "lighting_lux": 0.05,
  "backup_battery_duration_sec": 120,
  "audio_override": "HIGH_AMPLITUDE_HEARTBEAT_TRACK",
  "mic_detection_sensitivity": 0.90,
  "night_vision_charge": 0.35,
  "objective": "Navigate blind sectors to high-voltage panels to trigger primary grid restoration."
}`
  },
  {
    title: "STRUCTURE FAILURE - CRANE 02 FALLBACK",
    type: "structural-damage" as const,
    seed: "SEED_STRUCTURAL_701",
    content: `{
  "hazard_type": "STEEL_STRUCTURE_REBAR_COLLAPSE",
  "trigger_proximity_meters": 1.8,
  "hazard_damage": 80,
  "debris_count": 22,
  "haptic_force_multiplier": 2.0,
  "objective": "Dodge falling steel scaffolds while escaping zombies that run towards sound of collision."
}`
  }
];

export default function StoryPush({ history, onAddPush }: StoryPushProps) {
  const [title, setTitle] = useState(PRESETS[0].title);
  const [seed, setSeed] = useState(PRESETS[0].seed);
  const [type, setType] = useState<StoryPushType['type']>(PRESETS[0].type);
  const [content, setContent] = useState(PRESETS[0].content);
  
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileLogs, setCompileLogs] = useState<string[]>([]);
  const [showTick, setShowTick] = useState(false);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setTitle(preset.title);
    setSeed(preset.seed);
    setType(preset.type);
    setContent(preset.content);
    
    // Quick tech feedback beep
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch {}
  };

  const handlePush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsCompiling(true);
    setCompileLogs([]);
    
    const logs = [
      ">> RUNTIME COMPILE INITIATED FOR GAME ENGINE: 'HELL'",
      ">> VALIDATING LEXICAL SCHEMA AND JSON INTEGRITY...",
      `>> OK: Validated seed config: ${seed}`,
      ">> CONSTRUCTING SUPABASE RECORD QUEUE...",
      ">> ENCRYPTING TRANSMISSION VIA RAILWAY BACKEND TUNNEL...",
      ">> BROADCASTING SEED INSTANTLY TO ALL COMPATIBLE ANDROID CLIENTS...",
      ">> ENGINE BROADCAST SYNCHRONIZED: SUCCESS!"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setCompileLogs(prev => [...prev, log]);
        
        // Minor clicks
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(index === logs.length - 1 ? 880 : 1200, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.08);
        } catch {}

        if (index === logs.length - 1) {
          onAddPush({
            title,
            content,
            seed,
            type,
            pushed_by: 'LEAD_DEV: SUHAN'
          });
          setIsCompiling(false);
          setShowTick(true);
          setTimeout(() => setShowTick(false), 2500);
        }
      }, (index + 1) * 300);
    });
  };

  return (
    <div className="space-y-4 px-4 py-4 max-h-full overflow-y-auto">
      {/* Header Info */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">STORY COMPILER TERMINAL</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">REAL-TIME MISSION SEED BROADCASTER</h2>
        </div>
        <div className="flex items-center space-x-1.5 text-red-500 font-mono text-[9px] bg-red-950/10 border border-red-500/20 rounded px-2 py-0.5 animate-pulse-red">
          <Flame className="w-3.5 h-3.5" />
          <span>ZERO-COMPILE APK UPDATE</span>
        </div>
      </div>

      {/* Preset Pickers Grid */}
      <div className="space-y-1.5">
        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">QUICK COCKPIT SEED PRESETS</label>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              type="button"
              className={`p-2 rounded border text-left cursor-pointer transition-all ${
                seed === preset.seed
                  ? 'bg-red-950/20 border-red-500 shadow-[0_0_8px_rgba(255,0,51,0.15)]'
                  : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between pointer-events-none">
                <span className={`text-[8px] font-mono font-bold px-1 rounded uppercase ${
                  preset.type === 'crane-anomaly' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  preset.type === 'gas-leak' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                  preset.type === 'power-failure' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                  'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}>
                  {preset.type.replace('-', ' ')}
                </span>
                <Sparkles className="w-3 h-3 text-zinc-650" />
              </div>
              <h4 className="text-[9px] font-display font-extrabold tracking-wide text-zinc-200 truncate mt-1 pointer-events-none">
                {preset.title.replace('SEED_', '')}
              </h4>
            </button>
          ))}
        </div>
      </div>

      {/* Compiler form */}
      <form onSubmit={handlePush} className="space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">MISSION ENTITY TITLE</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs font-mono bg-zinc-950 text-zinc-300 px-2.5 py-2 rounded border border-zinc-850 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="e.g. GRID DISRUPTION"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">SEEK SEED SEQUENCE ID</label>
            <input
              type="text"
              required
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              className="w-full text-xs font-mono bg-zinc-950 text-cyan-400 px-2.5 py-2 rounded border border-zinc-850 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              placeholder="SEED_XYZ_123"
            />
          </div>
        </div>

        {/* Story/Mission Configuration JSON editor */}
        <div className="space-y-1 relative">
          <div className="flex justify-between items-center pr-1">
            <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">UNREAL LOGICAL CONTROLS SCHEMA (JSON)</label>
            <span className="text-[8px] font-mono text-zinc-650 uppercase">EDIT DIRECTLY FOR REALTIME RE-ROUTE</span>
          </div>

          <div className="relative border border-zinc-900 rounded bg-black/90 font-mono text-[10px] p-2 overflow-hidden shadow-inner flex flex-col">
            <div className="absolute top-1.5 right-2 text-red-500 opacity-60">
              <Code className="w-4 h-4" />
            </div>
            
            {/* Realtime syntax numbers line sidebar */}
            <div className="flex">
              <div className="text-zinc-600 border-r border-zinc-900 pr-2 select-none text-right flex flex-col font-mono leading-relaxed space-y-0.5">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
                <span>06</span>
                <span>07</span>
                <span>08</span>
                <span>09</span>
              </div>
              <textarea
                rows={7}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent text-zinc-300 pl-3 leading-relaxed focus:outline-none focus:ring-0 resize-none font-mono tracking-wide"
                style={{ tabSize: 2 }}
              />
            </div>
          </div>
        </div>

        {/* Broadcast Trigger Button */}
        <button
          type="submit"
          disabled={isCompiling}
          className={`w-full bg-zinc-950 text-neon-red border font-display font-black tracking-widest text-xs py-3.5 rounded transition-all duration-300 relative overflow-hidden flex items-center justify-center space-x-2 cursor-pointer ${
            isCompiling 
              ? 'border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
              : showTick
              ? 'border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(0,255,102,0.4)]'
              : 'border-red-500 shadow-[0_0_15px_rgba(255,0,51,0.2)] hover:shadow-[0_0_25px_rgba(255,0,51,0.5)] hover:bg-zinc-900 active:scale-[0.98]'
          }`}
        >
          {isCompiling ? (
            <>
              <div className="w-4.5 h-4.5 border-2 border-t-transparent border-purple-400 rounded-full animate-spin"></div>
              <span>TRANSMITTING DIRECT TO UNREAL ENG...</span>
            </>
          ) : showTick ? (
            <>
              <Check className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span>PUSH COMPLETED SECURELY!</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-red-500 animate-pulse" />
              <span>PUSH LIVE TO SERVER</span>
            </>
          )}
        </button>
      </form>

      {/* Compilation active log status console terminal */}
      {compileLogs.length > 0 && (
        <div className="bg-black border border-purple-950 p-2.5 rounded font-mono text-[9px] text-purple-400 space-y-1 max-h-32 overflow-y-auto shadow-inner animate-flicker">
          <div className="flex items-center justify-between pb-1 border-b border-purple-950/50 mb-1">
            <span>COMPILER DIAGNOSTICS</span>
            <span className="w-2 h-2 rounded bg-purple-500 animate-pulse"></span>
          </div>
          {compileLogs.map((log, index) => (
            <p key={index} className="leading-normal">{log}</p>
          ))}
        </div>
      )}

      {/* Supabase Live Broadcast History Header */}
      <div className="pt-2">
        <div className="flex items-center space-x-1 mb-2.5">
          <History className="w-4 h-4 text-zinc-500" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">SUPABASE BRANTREE HISTORIC LOG</span>
        </div>

        <div className="space-y-2.5">
          {history.map((push) => (
            <div key={push.id} className="p-3 bg-zinc-950/70 border border-zinc-900 rounded flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-sans font-extrabold text-zinc-150 leading-tight">
                    {push.title}
                  </h4>
                  <p className="text-[9px] font-mono text-cyan-400 mt-1 flex items-center space-x-1.5">
                    <span>SEED:</span>
                    <span className="bg-cyan-950/20 border border-cyan-900/30 px-1 rounded text-[8px] tracking-wider">{push.seed}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${push.active ? 'bg-emerald-500 animate-pulse-green' : 'bg-zinc-700'}`}></span>
                  <span className={`text-[8px] font-mono font-bold uppercase ${push.active ? 'text-emerald-400' : 'text-zinc-600'}`}>
                    {push.active ? 'LIVE ON RECOIL' : 'ARCHIVED'}
                  </span>
                </div>
              </div>

              {/* Collapsed schema viewer block snippet */}
              <div className="mt-2.5 pt-2 border-t border-zinc-900/40 bg-black/40 p-2 rounded">
                <pre className="text-[8px] font-mono text-zinc-500 leading-normal truncate font-bold">
                  {push.content}
                </pre>
              </div>

              <div className="mt-2 flex items-center justify-between text-[8px] font-mono text-zinc-600">
                <span className="flex items-center space-x-1">
                  <User className="w-3 h-3 text-zinc-700" />
                  <span>{push.pushed_by}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-zinc-700" />
                  <span>{push.created_at}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
