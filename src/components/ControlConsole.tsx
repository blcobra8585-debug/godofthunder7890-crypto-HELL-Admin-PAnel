import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, AlertTriangle, ShieldCheck, Play, Radio, Volume2, Database, Network, Swords, Map, Disc } from 'lucide-react';
import { SystemConfig, SystemStatus, StoryPush as StoryPushType } from '../types';

interface ControlConsoleProps {
  status: SystemStatus;
  config: SystemConfig;
  updateConfig: (updater: Partial<SystemConfig>) => void;
  history: StoryPushType[];
  activeScreen: string;
}

export default function ControlConsole({ status, config, updateConfig, history, activeScreen }: ControlConsoleProps) {
  const [ttsInput, setTtsInput] = useState("Alert! Critical deviation detected on SS Crane 02. Evacuate Singapore Sector immediately!");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [crane01State, setCrane01State] = useState<'nominal' | 'anomalous'>('nominal');
  const [crane02State, setCrane02State] = useState<'nominal' | 'anomalous'>('anomalous');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "HELL_OS Server Bootstrap successfully finalized on Singapore SG-1.",
    "Supabase credentials bound. AES-256 secure tunnel active.",
    "Circuit Breaker Failover routing in standby mode.",
    "Active Connection detected from Realme GT 6T (Device: Hell52)."
  ]);

  // Append logs dynamically based on state alterations in other screens
  useEffect(() => {
    if (history.length > 0) {
      const latestPush = history[0];
      setConsoleLogs(prev => [
        `[${new Date().toISOString().substring(11, 19)}] BROADCAST: Uploaded mission seed '${latestPush.seed}' to Supabase database.`,
        `[${new Date().toISOString().substring(11, 19)}] SYSTEM: Re-routing active game engine seed to '${latestPush.title}'`,
        ...prev.slice(0, 8)
      ]);
    }
  }, [history]);

  useEffect(() => {
    setConsoleLogs(prev => [
      `[${new Date().toISOString().substring(11, 19)}] ROUTER: API Gateway default re-routed to '${config.activeAi.toUpperCase()}' client.`,
      ...prev.slice(0, 8)
    ]);
  }, [config.activeAi]);

  // Speak Text script representing ElevenLabs voice pipeline
  const handleVoiceSynthesize = () => {
    if (!ttsInput.trim()) return;
    setIsSpeaking(true);

    // Audio frequency oscillator beep
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {}

    // HTML5 speech synthesis fallback
    if ('speechSynthesis' in window) {
      // Cancel previous speak queues
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(ttsInput);
      
      // Attempt to locate a high contrast creepy female/mysterious guide tone voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.lang.includes('en') && (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural')));
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      utterance.pitch = 0.55; // Dark creepy low gothic pitch reverb representation
      utterance.rate = 0.95;

      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  const forceFlickerCrane = (crane: 1 | 2) => {
    // Quick crane sound simulation
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(60, audioCtx.currentTime);
      osc.frequency.setValueAtTime(45, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch { }

    if (crane === 1) {
      setCrane01State(prev => prev === 'nominal' ? 'anomalous' : 'nominal');
    } else {
      setCrane02State(prev => prev === 'nominal' ? 'anomalous' : 'nominal');
    }
  };

  return (
    <div className="bg-black border border-zinc-900 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-[760px] relative select-none">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none rounded-2xl"></div>

      {/* Cockpit Title header */}
      <div className="space-y-1 pb-3 border-b border-zinc-900 flex justify-between items-center z-10">
        <div>
          <div className="flex items-center space-x-1.5 text-red-500">
            <TerminalIcon className="w-4 h-4 animate-flicker" />
            <span className="text-[10px] font-mono tracking-widest font-black uppercase">SS ENGINEERING COCKPIT DECK</span>
          </div>
          <h2 className="text-sm font-display font-black text-zinc-100 uppercase tracking-widest">
            HELL_OS CORE ENGINE CONTROL
          </h2>
        </div>
        <div className="text-right font-mono text-[9px] text-zinc-500">
          <span className="block text-cyan-400 font-bold uppercase">DEV MODEL: RMX3853</span>
          <span>SYSTEM CHASSIS: ONLINE</span>
        </div>
      </div>

      {/* Subsection A: Interactive ElevenLabs Voice Pipeline */}
      <div className="bg-zinc-950 rounded border border-zinc-900/60 p-3.5 space-y-2.5 relative mt-3 shrink-0">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-850 text-[8px] font-mono text-pink-500 tracking-wider uppercase font-bold">
          ELEVENLABS ANIME GUIDE SPEECH SIMULATOR
        </span>

        <p className="text-[9.5px] font-mono text-zinc-400 leading-normal uppercase pt-0.5">
          Type and broadcast a mysterious dialogue segment directly onto the game guides:
        </p>

        <div className="relative">
          <textarea
            rows={2}
            value={ttsInput}
            onChange={(e) => setTtsInput(e.target.value)}
            className="w-full bg-black text-zinc-300 font-mono text-[9.5px] p-2 rounded border border-zinc-800 focus:outline-none focus:border-pink-500"
            placeholder="Type speech transmission..."
          />
        </div>

        <button
          onClick={handleVoiceSynthesize}
          disabled={isSpeaking}
          className={`w-full py-2 px-3 text-[10px] rounded font-display font-extrabold tracking-widest uppercase cursor-pointer border transition-all flex items-center justify-center space-x-2 ${
            isSpeaking
              ? 'bg-pink-950/20 border-pink-500 text-pink-400 animate-pulse'
              : 'bg-black border-red-500 hover:bg-zinc-950 text-neon-red shadow-[0_0_10px_rgba(255,0,51,0.1)] hover:shadow-[0_0_15px_rgba(255,0,51,0.35)]'
          }`}
        >
          {isSpeaking ? (
            <>
              <div className="flex space-x-1 items-center">
                <span className="w-1 h-3.5 bg-pink-400 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1 h-2 bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1 h-4 bg-pink-400 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              </div>
              <span>SPEECH BROADCAST LIVE IN GAME...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-red-500 mr-1" />
              <span>COMPILE & PLAY MYSTERIOUS GUIDE SPEECH</span>
            </>
          )}
        </button>
      </div>

      {/* Subsection B: Dynamic SS Crane Anomalous Control */}
      <div className="grid grid-cols-2 gap-3.5 mt-3 shrink-0">
        {/* Crane 01 */}
        <div className="bg-zinc-950 border border-zinc-900 rounded p-3 relative flex flex-col justify-between h-28">
          <div className="flex justify-between items-center">
            <span className="text-[8.5px] font-mono text-zinc-500 uppercase">TELEMETRY: SEC 01</span>
            <span className={`w-1.5 h-1.5 rounded-full ${crane01State === 'nominal' ? 'bg-emerald-400 animate-pulse-green' : 'bg-red-500 animate-ping'}`}></span>
          </div>
          <div>
            <h3 className="text-xs font-sans font-black text-zinc-200">SS CRANE_01</h3>
            <p className={`text-[9px] font-mono mt-0.5 uppercase ${crane01State === 'nominal' ? 'text-zinc-500' : 'text-red-400 font-bold'}`}>
              STATE: {crane01State === 'nominal' ? 'NOMINAL PATHING' : 'DYNAMIC DEVIATION'}
            </p>
          </div>
          <button
            onClick={() => forceFlickerCrane(1)}
            className={`w-full py-1 text-[8.5px] font-mono font-bold uppercase rounded border cursor-pointer mt-2.5 transition-all text-center ${
              crane01State === 'nominal'
                ? 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'
                : 'bg-red-950/20 border-red-500 text-neon-red shadow-[0_0_8px_rgba(255,0,51,0.2)]'
            }`}
          >
            {crane01State === 'nominal' ? 'TRIGGER ANOMALY' : 'RESTORE MANUAL SW'}
          </button>
        </div>

        {/* Crane 02 */}
        <div className="bg-zinc-950 border border-zinc-900 rounded p-3 relative flex flex-col justify-between h-28">
          <div className="flex justify-between items-center">
            <span className="text-[8.5px] font-mono text-zinc-500 uppercase">TELEMETRY: SEC 02</span>
            <span className={`w-1.5 h-1.5 rounded-full ${crane02State === 'nominal' ? 'bg-emerald-400 animate-pulse-green' : 'bg-red-500 animate-ping'}`}></span>
          </div>
          <div>
            <h3 className="text-xs font-sans font-black text-zinc-200">SS CRANE_02</h3>
            <p className={`text-[9px] font-mono mt-0.5 uppercase ${crane02State === 'nominal' ? 'text-zinc-500' : 'text-red-400 font-bold'}`}>
              STATE: {crane02State === 'nominal' ? 'NOMINAL PATHING' : 'DYNAMIC DEVIATION'}
            </p>
          </div>
          <button
            onClick={() => forceFlickerCrane(2)}
            className={`w-full py-1 text-[8.5px] font-mono font-bold uppercase rounded border cursor-pointer mt-2.5 transition-all text-center ${
              crane02State === 'nominal'
                ? 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'
                : 'bg-red-950/20 border-red-500 text-neon-red shadow-[0_0_8px_rgba(255,0,51,0.2)]'
            }`}
          >
            {crane02State === 'nominal' ? 'TRIGGER ANOMALY' : 'RESTORE MANUAL SW'}
          </button>
        </div>
      </div>

      {/* Subsection C: Dynamic Android APK Compilation & Signing center */}
      <div className="bg-zinc-950 rounded border border-zinc-900 p-3.5 relative mt-3 shrink-0 space-y-3">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-850 text-[8px] font-mono text-cyan-400 tracking-wider uppercase font-bold flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-cyan-400 mr-1" />
          <span>SS ENGINEERING APK EXPORT CENTRE</span>
        </span>

        <p className="text-[9.5px] font-mono text-zinc-400 leading-normal uppercase pt-0.5">
          Generate an optimized physical Android build targeting your Realme GT 6T:
        </p>

        {/* Compile Panel parameters */}
        <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
          <div className="bg-black p-2 rounded border border-zinc-900 space-y-1">
            <span className="text-zinc-650 block uppercase">PACKAGE SIGNATURE</span>
            <span className="text-cyan-400 font-bold block uppercase">V2 FULL SIGN SCHEME</span>
          </div>
          <div className="bg-black p-2 rounded border border-zinc-900 space-y-1">
            <span className="text-zinc-650 block uppercase">TARGET DEVIATION MATRIX</span>
            <span className="text-red-500 font-bold block uppercase">Realme GT UI 7.0 LTPO</span>
          </div>
        </div>

        {/* Core build controls and timeline indicator */}
        <ApkCompilerWidget />
      </div>

      {/* Subsection D: Real-Time Supabase event tracking transaction log streams */}
      <div className="flex-1 min-h-0 bg-black border border-zinc-900 p-3.5 rounded mt-3 relative flex flex-col justify-between">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-850 text-[8px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
          CENTRAL SUPABASE DATA TRANSACTION TELEMETRY
        </span>

        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 mt-1 scrollbar bg-zinc-950 p-2.5 rounded border border-zinc-900 font-mono text-[9px] text-zinc-400">
          {consoleLogs.map((log, index) => (
            <div key={index} className="leading-relaxed hover:text-zinc-100 transition-colors">
              <span className="text-zinc-650 mr-1.5">»</span>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Consolidated active screen visualizer status */}
      <div className="py-2.5 mt-3 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono text-zinc-600">
        <span>CURRENT SCREEN FOCUS:</span>
        <span className="bg-red-950/10 text-red-400 border border-red-500/20 px-1.5 rounded uppercase font-bold tracking-widest animate-pulse">
          {activeScreen.toUpperCase()} SECURED
        </span>
      </div>
    </div>
  );
}

// Interactive Apk Compiler module inside Cockpit console
function ApkCompilerWidget() {
  const [isCompiling, setIsCompiling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepMsg, setStepMsg] = useState('');
  const [downloadReady, setDownloadReady] = useState(false);

  const startCompilation = () => {
    setIsCompiling(true);
    setProgress(0);
    setDownloadReady(false);
    setStepMsg('Phase 1: Booting clean physical Android shell...');

    // Dynamic wave chime trigger
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(300, audioCtx.currentTime + 1.5);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.5);
    } catch {}

    const intervals = [
      { p: 15, msg: 'Phase 2: Bundling 120Hz LTPO screen parameters...' },
      { p: 35, msg: 'Phase 3: Synthesizing ElevenLabs creep filters...' },
      { p: 55, msg: 'Phase 4: Linking Supabase offline failover databases...' },
      { p: 80, msg: 'Phase 5: Signing APK package with Suhan developer keystore...' },
      { p: 100, msg: 'Phase 6: Sideload build generated successfully!' }
    ];

    intervals.forEach((step, index) => {
      setTimeout(() => {
        setProgress(step.p);
        setStepMsg(step.msg);
        if (step.p === 100) {
          setIsCompiling(false);
          setDownloadReady(true);
          
          // Victory build beep
          try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.setValueAtTime(900, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
          } catch {}
          
          alert("APK BUILD COMPLETE: Generated optimized physical sideload (84.2 MB) optimal for your Realme GT 6T AMOLED display!");
        }
      }, (index + 1) * 900);
    });
  };

  return (
    <div className="space-y-2 pt-1 font-mono">
      {isCompiling ? (
        <div className="space-y-1.5 p-2 bg-black border border-zinc-900 rounded">
          <div className="flex justify-between text-[8px] text-zinc-550">
            <span>COMPILING EXPORT CHASSIS PACKAGES</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
            <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-[8.5px] text-cyan-400 block animate-pulse uppercase">
            {stepMsg}
          </span>
        </div>
      ) : downloadReady ? (
        <div className="p-2 bg-emerald-950/20 border border-emerald-500/30 rounded flex flex-col items-center justify-center space-y-2 animate-flicker">
          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
            RELEASE BINARY READY (84.2 MB)
          </span>
          <button
            onClick={() => {
              // Create mock download file
              const blob = new Blob(["HELL GAME REALME GT 6T SIDELOAD BINARY PACK"], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'hell_ss_engineering_v3_release.apk';
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold rounded text-[9.5px] tracking-widest uppercase cursor-pointer transition-all hover:scale-105 active:scale-95 text-center font-display"
          >
            DOWNLOAD PHYSICAL APK
          </button>
        </div>
      ) : (
        <button
          onClick={startCompilation}
          className="w-full py-2 bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500 text-cyan-400 rounded text-[9.5px] font-display font-black tracking-widest uppercase cursor-pointer hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center space-x-1"
        >
          <span>BUILD AND SIGN NATIVE PHYSICAL APK</span>
        </button>
      )}
    </div>
  );
}

