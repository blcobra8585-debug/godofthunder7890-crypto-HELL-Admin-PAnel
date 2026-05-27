import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, ShieldAlert, Cpu, Heart, Check, Monitor, Eye, Key } from 'lucide-react';
import { SystemConfig } from '../types';

interface SettingsScreenProps {
  config: SystemConfig;
  onUpdateConfig: (updated: Partial<SystemConfig>) => void;
  onLogout: () => void;
}

export default function SettingsScreen({ config, onUpdateConfig, onLogout }: SettingsScreenProps) {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const triggerBeep = (freq: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {}
  };

  const notifyChange = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  return (
    <div className="space-y-4 px-4 py-4 max-h-full overflow-y-auto">
      {/* Header Panel */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">SYSTEM OVERLAYS</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">REALME GT 6T AMOLED INTERFACE</h2>
        </div>
        <div className="p-1 px-1.5 rounded bg-red-950/20 border border-red-900/40 text-[9px] text-neon-red font-mono uppercase font-bold">
          ADMIN CONFIDENTIAL
        </div>
      </div>

      {/* AMOLED Display Engine Controls */}
      <div className="bg-black border border-zinc-900 p-3.5 rounded relative space-y-3.5">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-850 text-[8px] font-mono text-purple-400 tracking-widest font-extrabold uppercase flex items-center space-x-1">
          <Monitor className="w-3 h-3 mr-1 text-purple-400" />
          <span>AMOLED HIGH-FIDELITY OPTIMIZATION</span>
        </span>

        <p className="text-[9px] font-mono text-zinc-500 pt-1 leading-normal uppercase">
          Configure display spectrum rates for the Realme GT 6T 1.5K LTPO AMOLED display node:
        </p>

        {/* 120Hz Force Mode */}
        <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-300 uppercase block">FORCE 120HZ FRAME ROUTE</span>
            <span className="text-[8.5px] font-mono text-zinc-500 uppercase">Accelerates interactive CSS and hardware matrix loops</span>
          </div>
          <button
            onClick={() => {
              triggerBeep(config.amoledHighHz ? 400 : 700);
              onUpdateConfig({ amoledHighHz: !config.amoledHighHz });
              notifyChange(`DISPLAY FRAME-RATE MODE SWAPPED`);
            }}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {config.amoledHighHz ? (
              <ToggleRight className="w-9 h-9 text-neon-red drop-shadow-[0_0_5px_rgba(255,0,51,0.5)]" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-zinc-700" />
            )}
          </button>
        </div>

        {/* HDR Render Engine */}
        <div className="flex justify-between items-center transition-colors">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-300 uppercase block">HDR COLOR GRADING OPTIMIZER</span>
            <span className="text-[8.5px] font-mono text-zinc-500 uppercase">Forces ultra high-contrast neon matrix glow shading</span>
          </div>
          <button
            onClick={() => {
              triggerBeep(config.hdrRenderEngine ? 400 : 700);
              onUpdateConfig({ hdrRenderEngine: !config.hdrRenderEngine });
              notifyChange(`HDR OPTION STATE SHIFTED`);
            }}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {config.hdrRenderEngine ? (
              <ToggleRight className="w-9 h-9 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-zinc-700" />
            )}
          </button>
        </div>
      </div>

      {/* Sound & Haptic Profiles */}
      <div className="bg-zinc-950 border border-zinc-900 rounded p-3.5 space-y-3.5">
        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">PHYSICAL FEEDBACK MODULATION</label>

        {/* Touch Haptic feedback */}
        <div className="flex justify-between items-center pb-2 border-b border-zinc-900/60">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-350 uppercase block">MOBILE TACTILE HAPTICS</span>
            <span className="text-[8.5px] font-mono text-zinc-550 uppercase">Dispatches micro electromagnetic vibrations on press</span>
          </div>
          <button
            onClick={() => {
              triggerBeep(550);
              onUpdateConfig({ hapticFeedback: !config.hapticFeedback });
              notifyChange(`TACTILE HARNESS SWITCHED`);
            }}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {config.hapticFeedback ? (
              <ToggleRight className="w-9 h-9 text-purple-400" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-zinc-750" />
            )}
          </button>
        </div>

        {/* Micro Zombie AI Track */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-350 uppercase block">ULTRASONIC ZOMBIE MATRIX</span>
            <span className="text-[8.5px] font-mono text-zinc-550 uppercase">Funnels dynamic acoustic waves matching game events</span>
          </div>
          <button
            onClick={() => {
              triggerBeep(320);
              onUpdateConfig({ micZombieDetection: !config.micZombieDetection });
              notifyChange(`ZOMBIE FREQUENCY SPECTRUM UPDATED`);
            }}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {config.micZombieDetection ? (
              <ToggleRight className="w-9 h-9 text-neon-red" />
            ) : (
              <ToggleLeft className="w-9 h-9 text-zinc-750" />
            )}
          </button>
        </div>
      </div>

      {/* Notifications Alert Container */}
      {successMsg && (
        <div className="p-2 bg-zinc-950 border border-green-500/30 rounded flex items-center justify-center space-x-1.5 animate-pulse text-green-400 font-mono text-[9px] uppercase tracking-widest font-extrabold">
          <Check className="w-3.5 h-3.5 mr-1" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Root Access Controls */}
      <div className="bg-zinc-950 border border-zinc-900 rounded p-3.5 space-y-3.5">
        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">SYSTEM ACCOUNT TERMINAL</label>
        
        <div className="flex justify-between items-center bg-black/60 p-2.5 rounded border border-zinc-900">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-zinc-550" />
            <div className="leading-snug">
              <span className="text-[10px] font-mono font-bold text-zinc-300 block">suhanshaikh78957@gmail.com</span>
              <span className="text-[8px] font-mono text-zinc-500 uppercase">LEAD REEVE AUTHORIZED ACCESS</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            triggerBeep(250);
            onLogout();
          }}
          className="w-full py-2 bg-red-950/15 border border-red-500/40 text-red-400 rounded text-[10px] font-display font-black tracking-widest uppercase cursor-pointer hover:bg-neon-red hover:text-black hover:border-red-500 active:scale-95 transition-all"
        >
          LOGOUT FROM SYSTEM ACCESS
        </button>
      </div>
    </div>
  );
}
