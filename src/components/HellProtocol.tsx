import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, ToggleLeft, ToggleRight, Radio, Eye, Lock, Unlock, 
  Terminal, ShieldAlert, Cpu, Copy, Check, Sparkles, Sliders, 
  Volume2, Trash2, HelpCircle, Code, Play, RefreshCw 
} from 'lucide-react';
import { FLUTTER_CODE_SNIPPET } from './FlutterCodeSnippet';

export default function HellProtocol() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'exporter' | 'unreal'>('simulation');
  const [isCopied, setIsCopied] = useState(false);

  // 1. SCADA Control Swappings
  const [scada, setScada] = useState([
    { id: 1, name: 'Remote SS Crane Control', active: false, hex: '0xE791' },
    { id: 2, name: 'Magnetic Brake Disconnect', active: true, hex: '0xFA02' },
    { id: 3, name: 'Plant Grid Blackout', active: false, hex: '0xBB81' },
    { id: 4, name: 'Generator Fuel Bleed Simulation', active: false, hex: '0x0D0E' },
    { id: 5, name: 'Boiler Pressure Override', active: true, hex: '0xD991' },
    { id: 6, name: 'Transformer Trip Logic', active: false, hex: '0xC21B' },
    { id: 7, name: 'PLC Gate Inversion', active: false, hex: '0x88EF' },
    { id: 8, name: 'Conveyor Reverse Override', active: false, hex: '0x442D' },
    { id: 9, name: 'Siren Array Trigger', active: true, hex: '0x10AA' },
    { id: 10, name: 'Ventilation Shutoff', active: false, hex: '0xDF93' },
  ]);

  // Rotate/update hex streams dynamically to look lively
  useEffect(() => {
    const timer = setInterval(() => {
      setScada(prev => prev.map(item => {
        if (item.active) {
          const randHex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
          return { ...item, hex: `0x${randHex}` };
        }
        return item;
      }));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // 2. Surveillance Telemetries
  const [surveillance, setSurveillance] = useState([
    { name: 'CCTV Stream Intercept', status: 'INTERCEPTED', active: true },
    { name: 'Biometric Feedback Spoofing', status: 'SPOOF_ACTIVE', active: true },
    { name: 'Thermal Signature Tracker', status: 'CALIBRATING', active: false },
    { name: 'Motion Sensor Inversion', status: 'INVERTED', active: true },
    { name: 'Proximity Ping Flood', status: 'STANDBY', active: false },
    { name: 'Flashlight Battery Load Simulator', status: 'LOAD_OPTIMAL', active: true },
  ]);

  const toggleSurveillance = (name: string) => {
    setSurveillance(prev => prev.map(item => {
      if (item.name === name) {
        const nextActive = !item.active;
        return {
          ...item,
          active: nextActive,
          status: nextActive ? 'FORCE_ON_SEC' : 'DISENGAGED'
        };
      }
      return item;
    }));
    addLog(`[SURVEILLANCE] Toggled spoof target: ${name}`);
  };

  // 3. Cognitive AI Dialogue states
  const [activeAi, setActiveAi] = useState<'gemini' | 'claude' | 'groq'>('gemini');
  const [aiLog, setAiLog] = useState('MITM_ROUTING: Standby for prompt injection interception...');
  const [pitchMultiplier, setPitchMultiplier] = useState(1.0);
  const [fallbackEnabled, setFallbackEnabled] = useState(true);

  // States for real full-stack game initialization endpoint tester
  const [apiLoading, setApiLoading] = useState(false);
  const [apiResult, setApiResult] = useState<{
    status: string;
    story_seed: string;
    hell_mode: boolean;
    mic_zombies_enabled: boolean;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const testGameInitApi = async () => {
    setApiLoading(true);
    setApiError(null);
    setApiResult(null);
    triggerAudioSynth(440, 0.15);
    addLog("[API_GATEWAY] Dispatching POST call to local master route: /api/v1/game-init");

    try {
      const res = await fetch("/api/v1/game-init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `HTTP error ${res.status}`);
      }

      setApiResult(data);
      addLog(`[API_GATEWAY] Success! Handshook with Express endpoint. Root seed: "${data.story_seed.substring(0, 32)}..."`);
      triggerAudioSynth(660, 0.25);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Failed to contact local Express server.");
      addLog(`[API_GATEWAY_ERROR] Connection failure: ${err.message}`);
      triggerAudioSynth(150, 0.4);
    } finally {
      setApiLoading(false);
    }
  };

  // 4. Dynamic Threat controls
  const [zombieAggression, setZombieAggression] = useState(78.5);
  const [hapticFreq, setHapticFreq] = useState(4.0);
  const [inventoryFreeze, setInventoryFreeze] = useState(true);
  const [weatherVector, setWeatherVector] = useState('TOXIC_RAIN');
  const [isGlitching, setIsGlitching] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);

  // 5. System Terminal Commands interface
  const [terminalInput, setTerminalInput] = useState('');
  const [kernelLogs, setKernelLogs] = useState<string[]>([
    '[SYSTEM] BOOTED SG-01 MIDDLEWARE COILS SUCCESSFUL',
    '[NETWORK] PORT 3000 CONSOLE INGRESS READY',
    '[SECURE] biometric_cleared = suhanshaikh78957@gmail.com',
    '[DATABASE] SUPABASE STRAWBERRY FAILOVER POOL ONLINE',
    '[ZOMBIES] TELEMETRY DISPATCH THREAD INITIALIZED',
    '[HELL] SYS_MUTATION_ALIVE: ENABLING HELL... SUCCESS',
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Custom wave drawing painter hook inside React Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    let animationId: number;
    let offset = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width = canvas.parentElement?.clientWidth || 280;
      const height = canvas.height = 50;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Draw three symmetrical overlapping waves
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(255, 0, 51, ${0.8 - wave * 0.25})`;

        const amplitude = (height / 2.2) * (1.0 - wave * 0.3);
        const freq = (0.01 + wave * 0.008);

        for (let x = 0; x < width; x += 2) {
          // Symmetrical damping envelope
          const normalizedX = x / width;
          const envelope = Math.sin(normalizedX * Math.PI);

          const y = (height / 2) + Math.sin(x * freq - offset) * amplitude * envelope;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      offset += 0.08;
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Smooth scroll the logs inside the emulator shell
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [kernelLogs]);

  // Synthesize audial frequency beep on change/adjust to elevate immersion
  const triggerAudioSynth = (freq: number, duration: number) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context denied / unsupported in sandboxed mode
    }
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setKernelLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    setTerminalInput('');

    setKernelLogs(prev => [...prev, `HELL_ROOT$ ${cmd}`]);

    setTimeout(() => {
      if (cmd === 'help') {
        setKernelLogs(prev => [
          ...prev,
          '[HELP] COMPATIBLE SCADA COMMANDS:',
          '  override all   - Trigger all switches to ACTIVE state',
          '  purge cache    - Clear dialogue buffers',
          '  trigger radar  - Echo sonar diagnostic pulses to port 3000',
          '  clear          - Wipe console logs'
        ]);
        triggerAudioSynth(400, 0.15);
      } else if (cmd === 'override all') {
        setScada(prev => prev.map(item => ({ ...item, active: true })));
        setKernelLogs(prev => [...prev, '[OVERRIDE] FORCE COILS SYSTEM BYPASS - ALL PLC RECONVECTED']);
        triggerAudioSynth(600, 0.3);
      } else if (cmd === 'purge cache') {
        setAiLog('MITM_ROUTING: Purged cache buffers. Listening dynamically on port 3000 again...');
        setKernelLogs(prev => [...prev, '[PURGE] AI cognitive dialogue cache wiped.']);
        triggerAudioSynth(250, 0.2);
      } else if (cmd === 'trigger radar') {
        setKernelLogs(prev => [...prev, '[RADAR] Ultrasonic feedback echo transmitted to system. Grid clear.']);
        triggerAudioSynth(800, 0.4);
      } else if (cmd === 'clear') {
        setKernelLogs(['[CONSOLE WIPE COMPLETE - SYSTEM LISTENING]']);
      } else {
        setKernelLogs(prev => [...prev, `[COMMAND_ERROR] Direct injection signature rejected: '${cmd}'`]);
        triggerAudioSynth(150, 0.25);
      }
    }, 150);
  };

  const triggerHapticBurst = () => {
    setIsVibrating(true);
    triggerAudioSynth(100 + hapticFreq * 80, 0.3);
    if (navigator.vibrate) {
      navigator.vibrate([150, 50, 150]);
    }
    addLog(`[HAPTIC] Triggered physical burst at ${hapticFreq.toFixed(1)}Hz frequency`);
    setTimeout(() => setIsVibrating(false), 600);
  };

  const triggerScreenGlitch = () => {
    setIsGlitching(true);
    triggerAudioSynth(40, 0.5);
    addLog('[THREAT] Screen Glitch Pulse override triggered - emulating electromagnetic interference');
    setTimeout(() => setIsGlitching(false), 900);
  };

  const copyFlutterCode = () => {
    navigator.clipboard.writeText(FLUTTER_CODE_SNIPPET);
    setIsCopied(true);
    triggerAudioSynth(750, 0.15);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Modern Expansion tiles setup
  const [expandedSections, setExpandedSections] = useState({
    scada: true,
    surveillance: true,
    aiPanel: true,
    dynamicThreat: true,
    terminal: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    triggerAudioSynth(500, 0.05);
  };

  return (
    <div className={`h-full flex flex-col bg-black text-white font-mono select-none overflow-hidden relative ${isGlitching ? 'animate-scanner-jitters' : ''}`}>
      {/* Glitch Overlay to emulate physical AMOLED EMP interference */}
      {isGlitching && (
        <div className="absolute inset-0 bg-red-900/10 pointer-events-none z-50 overflow-hidden mix-blend-color-dodge">
          <div className="w-full h-0.5 bg-red-500/45 animate-glitch-line"></div>
          <div className="w-full h-1 bg-cyan-500/25 absolute top-1/3 animate-glitch-line-delayed"></div>
          <div className="absolute inset-0 bg-black opacity-35 animate-flicker pointer-events-none"></div>
        </div>
      )}

      {/* Screen Heading */}
      <div className="bg-zinc-950 p-3.5 border-b border-red-500/20 shrink-0 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-black border border-red-500 text-red-500 shadow-[0_0_8px_#FF0033]">
              <Flame className="w-4 h-4 animate-pulse" />
            </span>
            <div>
              <h1 className="text-xs font-black tracking-widest text-red-500">HELL PROTOCOL console</h1>
              <span className="text-[8px] text-zinc-500 block uppercase tracking-wider">PROJECT REF: SS ENGINEERING</span>
            </div>
          </div>

          <div className="text-[9px] text-cyan-400 border border-cyan-500/20 bg-cyan-950/20 px-1.5 py-0.5 rounded uppercase font-bold animate-pulse">
            LTPO 120Hz
          </div>
        </div>

        {/* Triple Tab bar Switch */}
        <div className="grid grid-cols-3 gap-1 pt-1">
          <button
            onClick={() => { setActiveTab('simulation'); triggerAudioSynth(400, 0.05); }}
            className={`py-1 rounded text-[8px] font-bold uppercase transition-all tracking-wider border cursor-pointer ${
              activeTab === 'simulation' 
                ? 'bg-red-950/20 text-red-500 border-red-500 shadow-[0_0_8px_#FF0033]' 
                : 'bg-black text-zinc-550 border-zinc-900 hover:text-zinc-300'
            }`}
          >
            🔴 LIVE PORTAL
          </button>
          <button
            onClick={() => { setActiveTab('exporter'); triggerAudioSynth(400, 0.05); }}
            className={`py-1 rounded text-[8px] font-bold uppercase transition-all tracking-wider border cursor-pointer ${
              activeTab === 'exporter' 
                ? 'bg-cyan-950/20 text-cyan-400 border-cyan-500 shadow-[0_0_8px_#22d3ee]' 
                : 'bg-black text-zinc-550 border-zinc-900 hover:text-zinc-300'
            }`}
          >
            📂 FLUTTER
          </button>
          <button
            onClick={() => { setActiveTab('unreal'); triggerAudioSynth(400, 0.05); }}
            className={`py-1 rounded text-[8px] font-bold uppercase transition-all tracking-wider border cursor-pointer ${
              activeTab === 'unreal'
                ? 'bg-amber-950/25 text-amber-550 border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                : 'bg-black text-zinc-555 border-zinc-900 hover:text-zinc-305'
            }`}
          >
            🎮 UE5 BLUEPRINTS
          </button>
        </div>
      </div>

      {/* Primary Scrollable Screen Frame */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 max-w-full">
        {activeTab === 'simulation' ? (
          <>
            {/* ==========================================
                1. SCADA & PLC OVERRIDE SIMULATOR Section
                ========================================== */}
            <div className="border border-red-500/40 bg-black rounded shadow-[0_0_10px_rgba(255,0,51,0.06)] overflow-hidden">
              <button 
                onClick={() => toggleSection('scada')}
                className="w-full px-3 py-2.5 bg-zinc-950 flex items-center justify-between border-b border-red-500/20"
              >
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] text-red-500 font-black tracking-wider uppercase">
                    1. INDUSTRIAL SCADA OVERRIDE
                  </span>
                </div>
                <span className="text-[9px] text-zinc-500">{expandedSections.scada ? '▼' : '▲'}</span>
              </button>

              {expandedSections.scada && (
                <div className="p-3 space-y-2.5 max-h-96 overflow-y-auto scrollbar bg-black">
                  <p className="text-[8px] text-zinc-500 uppercase leading-relaxed">
                    CRITICAL WARNING: MANUAL SWITCH INTERACTION GENERATES DIRECT COILS SOLENOID TRIGGER LOGIC IN PIPES
                  </p>
                  
                  <div className="space-y-2 divide-y divide-zinc-900">
                    {scada.map(ctrl => (
                      <div key={ctrl.id} className="flex items-center justify-between pt-2">
                        <div className="text-left max-w-[70%]">
                          <span className={`text-[10px] font-bold block ${ctrl.active ? 'text-zinc-100' : 'text-zinc-650'}`}>
                            {ctrl.id}. {ctrl.name}
                          </span>
                          <span className={`text-[7.5px] block font-mono ${ctrl.active ? 'text-red-500/80 animate-pulse' : 'text-zinc-700'}`}>
                            EXPLOIT STATUS: <span className="font-bold font-mono">{ctrl.hex}</span> [STREAMING]
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setScada(prev => prev.map(item => item.id === ctrl.id ? { ...item, active: !item.active } : item));
                            addLog(`[SCADA] Toggled override on block ${ctrl.id}: ${ctrl.name}`);
                            triggerAudioSynth(ctrl.active ? 300 : 450, 0.1);
                          }}
                          className="focus:outline-none"
                        >
                          {ctrl.active ? (
                            <ToggleRight className="w-7 h-7 text-red-500 cursor-pointer hover:scale-105 active:scale-95 transition-all" />
                          ) : (
                            <ToggleLeft className="w-7 h-7 text-zinc-800 cursor-pointer hover:scale-105 active:scale-95 transition-all" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ==========================================
                2. SURVEILLANCE & PACKET ANALYSIS Section
                ========================================== */}
            <div className="border border-red-500/40 bg-black rounded shadow-[0_0_10px_rgba(255,0,51,0.06)] overflow-hidden">
              <button 
                onClick={() => toggleSection('surveillance')}
                className="w-full px-3 py-2.5 bg-zinc-950 flex items-center justify-between border-b border-red-500/20"
              >
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] text-red-500 font-black tracking-wider uppercase">
                    2. SURVEILLANCE & PACKET ANALYSIS
                  </span>
                </div>
                <span className="text-[9px] text-zinc-500">{expandedSections.surveillance ? '▼' : '▲'}</span>
              </button>

              {expandedSections.surveillance && (
                <div className="p-3 space-y-3 bg-black">
                  <div>
                    <span className="text-[8px] text-zinc-500 block uppercase tracking-wider mb-1.5">
                      MITM COGNITIVE AUDIO PACKET SNIFFER MATRIX:
                    </span>
                    <div className="border border-red-500/20 bg-black rounded p-1">
                      <canvas ref={canvasRef} className="w-full block h-11 bg-black rounded-sm" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[8.5px] text-zinc-400 block uppercase font-bold">
                      TELEMETRY DECRYPTORS & SPOOF SITES:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {surveillance.map(item => (
                        <button
                          key={item.name}
                          onClick={() => toggleSurveillance(item.name)}
                          className={`p-2 rounded border text-left cursor-pointer transition-all hover:border-red-500/50 flex flex-col justify-between h-14 ${
                            item.active 
                              ? 'bg-red-950/15 border-red-500/50 shadow-[0_0_5px_rgba(255,0,51,0.15)]' 
                              : 'bg-black border-zinc-900 text-zinc-500'
                          }`}
                        >
                          <span className="text-[8.5px] font-bold uppercase leading-tight line-clamp-2">
                            {item.name}
                          </span>
                          <span className={`text-[7.5px] font-mono leading-none ${
                            item.active ? 'text-red-500 font-black' : 'text-zinc-650'
                          }`}>
                            {item.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ==========================================
                3. COGNITIVE AI DIALOGUE CORRUPTION PANEL
                ========================================== */}
            <div className="border border-red-500/40 bg-black rounded shadow-[0_0_10px_rgba(255,0,51,0.06)] overflow-hidden">
              <button 
                onClick={() => toggleSection('aiPanel')}
                className="w-full px-3 py-2.5 bg-zinc-950 flex items-center justify-between border-b border-red-500/20"
              >
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] text-red-500 font-black tracking-wider uppercase">
                    3. COGNITIVE AI DIALOGUE CORRUPTION
                  </span>
                </div>
                <span className="text-[9px] text-zinc-500">{expandedSections.aiPanel ? '▼' : '▲'}</span>
              </button>

              {expandedSections.aiPanel && (
                <div className="p-3 space-y-3 bg-black text-left">
                  <div className="flex items-center justify-between bg-zinc-950 p-1.5 rounded border border-zinc-920">
                    <span className="text-[8px] text-zinc-450 uppercase font-black">AI COGNITIVE HUB:</span>
                    <div className="flex space-x-1">
                      {(['gemini', 'claude', 'groq'] as const).map(p => (
                        <button
                          key={p}
                          onClick={() => {
                            setActiveAi(p);
                            setAiLog(`MITM_ROUTING_REALLOCATED: Target rerouters connected dynamically onto ${p.toUpperCase()}`);
                            addLog(`[AI] Shifted active MITM simulation layer to ${p.toUpperCase()}`);
                            triggerAudioSynth(500, 0.1);
                          }}
                          className={`px-1.5 py-0.5 rounded text-[7.5px] uppercase font-bold border cursor-pointer ${
                            activeAi === p 
                              ? 'bg-red-500 text-black border-red-500' 
                              : 'bg-black text-zinc-600 border-zinc-900 hover:text-zinc-400'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Intercept Monitor panel */}
                  <div className="p-2 border border-red-500/15 bg-black rounded space-y-1">
                    <span className="text-[7.5px] text-red-500/80 uppercase block font-bold tracking-widest font-mono">
                      [DIALOGUE INTERCEPT LOG]
                    </span>
                    <p className="text-[8.5px] text-zinc-400 font-mono leading-relaxed uppercase break-all">
                      {aiLog}
                    </p>
                  </div>

                  {/* Action row commands */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => {
                        setAiLog('OVERFLOW_TRIGGERED: Target vector injected! Prompt overflow active payload loading into cache sequence [0xFF71]...');
                        addLog('[AI] Emulate Token Overflow prompt injection attack');
                        triggerAudioSynth(150, 0.6);
                      }}
                      className="py-1.5 bg-black border border-red-500 text-red-500 rounded text-[8px] font-black uppercase tracking-wider hover:bg-red-950/20 active:scale-95 transition-all text-center cursor-pointer"
                    >
                      TOKEN OVERFLOW SIM
                    </button>
                    <button
                      onClick={() => {
                        setAiLog('MITM_ROUTING: Dialogue buffer purged. Re-establishing secure listener sockets.');
                        addLog('[AI] Flushed dialogue interception memory buffer');
                        triggerAudioSynth(300, 0.3);
                      }}
                      className="py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded text-[8px] font-black uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all text-center cursor-pointer"
                    >
                      MEMORY FLUSHER
                    </button>
                  </div>

                  {/* Pitch shifter voice frequency slider */}
                  <div className="space-y-1 pt-1 bg-zinc-950/60 p-2 rounded border border-zinc-950">
                    <div className="flex justify-between items-center text-[8.5px] font-mono text-zinc-400">
                      <span>ELEVENLABS VOICE PITCH:</span>
                      <span className="text-red-500 font-bold">{pitchMultiplier.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range"
                      min="0.4"
                      max="2.2"
                      step="0.1"
                      value={pitchMultiplier}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setPitchMultiplier(val);
                        triggerAudioSynth(220 * val, 0.08);
                      }}
                      className="w-full accent-red-500 cursor-pointer h-1 bg-zinc-900 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Real Game Init POST Endpoint Console */}
                  <div className="pt-2.5 mt-2 border-t border-zinc-900 space-y-2">
                    <span className="text-[8.2px] text-zinc-400 font-extrabold uppercase block font-mono flex items-center space-x-1.5">
                      <Sparkles className="w-3 h-3 text-red-500 animate-pulse" />
                      <span>LIVE BACKEND ROUTE INTEGRATION</span>
                    </span>

                    <div className="bg-black border border-red-500/20 p-2.5 rounded space-y-2">
                      <div className="flex justify-between items-center text-[8px] font-mono">
                        <span className="text-zinc-550">ENDPOINT:</span>
                        <span className="text-red-400 font-bold bg-zinc-950 px-1 py-0.5 rounded border border-red-500/10">POST /api/v1/game-init</span>
                      </div>

                      <p className="text-[8px] text-zinc-500 uppercase leading-normal">
                        MIMICS SUHAN'S SERVER-SIDE HORROR PROTOCOLS TO QUERY SUPABASE AND GEMINI-3.5-FLASH FOR OFF-SCREEN SEED SECURES.
                      </p>

                      {/* Display server response result if available */}
                      {apiResult && (
                        <div className="p-2 bg-red-950/20 border border-red-500/30 rounded font-mono text-[8px] space-y-1.5 animate-scanner-jitters">
                          <div className="text-emerald-400 font-bold uppercase flex items-center justify-between">
                            <span>» RECEIVED RESPONSE (200 OK)</span>
                            <span className="bg-emerald-950/45 text-emerald-400 border border-emerald-500/20 px-1 rounded text-[7px]">SECURE</span>
                          </div>
                          
                          <div className="text-zinc-300 bg-black/50 p-1.5 border border-zinc-900 rounded select-text leading-normal max-h-20 overflow-y-auto">
                            <span className="text-cyan-400 font-bold">story_seed: </span> 
                            {apiResult.story_seed}
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 pt-1 text-zinc-400 select-none">
                            <div>
                              <span>hell_mode: </span>
                              <span className={`font-bold ${apiResult.hell_mode ? 'text-red-500' : 'text-zinc-500'}`}>
                                {apiResult.hell_mode ? "ACTIVE" : "FALSE"}
                              </span>
                            </div>
                            <div>
                              <span>mic_zombies: </span>
                              <span className={`font-bold ${apiResult.mic_zombies_enabled ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                {apiResult.mic_zombies_enabled ? "ACTIVE" : "FALSE"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Display error if there is one */}
                      {apiError && (
                        <div className="p-2 bg-red-950 border border-red-500/40 rounded text-red-500 font-mono text-[8px] leading-relaxed uppercase select-text">
                          <span className="font-bold block">» ENDPOINT FAIL (500 ERROR)</span>
                          {apiError}
                        </div>
                      )}

                      {/* Trigger button */}
                      <button
                        type="button"
                        onClick={testGameInitApi}
                        disabled={apiLoading}
                        className={`w-full py-1.5 rounded text-[8.5px] font-black uppercase tracking-widest cursor-pointer border flex items-center justify-center space-x-1.5 transition-all text-center ${
                          apiLoading
                            ? "bg-zinc-950 border-red-500/20 text-red-500 animate-pulse"
                            : "bg-red-950/20 border-red-500 text-red-500 hover:bg-red-950/40 active:scale-97 shadow-[0_0_8px_rgba(255,0,51,0.1)]"
                        }`}
                      >
                        {apiLoading ? (
                          <>
                            <RefreshCw className="w-3 h-3 text-red-500 animate-spin" />
                            <span>HANDSHAKING SYSTEM DECK...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 text-red-500 animate-pulse" />
                            <span>RUN TRANSPILED /game-init ROUTE</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ==========================================
                4. DYNAMIC THREAT ENVIRONMENT ENGINE
                ========================================== */}
            <div className="border border-red-500/40 bg-black rounded shadow-[0_0_10px_rgba(255,0,51,0.06)] overflow-hidden">
              <button 
                onClick={() => toggleSection('dynamicThreat')}
                className="w-full px-3 py-2.5 bg-zinc-950 flex items-center justify-between border-b border-red-500/20"
              >
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] text-red-500 font-black tracking-wider uppercase">
                    4. DYNAMIC THREAT ENVIRONMENT
                  </span>
                </div>
                <span className="text-[9px] text-zinc-500">{expandedSections.dynamicThreat ? '▼' : '▲'}</span>
              </button>

              {expandedSections.dynamicThreat && (
                <div className="p-3 space-y-3.5 bg-black text-left">
                  {/* Aggression slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] text-zinc-400 font-black">
                      <span>ZOMBIE AGGRESSION OVERRIDE:</span>
                      <span className="text-red-500">{zombieAggression.toFixed(1)}%</span>
                    </div>
                    <input 
                      type="range"
                      min="10.0"
                      max="100.0"
                      value={zombieAggression}
                      onChange={(e) => {
                        setZombieAggression(parseFloat(e.target.value));
                        triggerAudioSynth(300 + parseFloat(e.target.value) * 3, 0.05);
                      }}
                      className="w-full accent-red-500 cursor-pointer h-1 bg-zinc-900 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Haptics controller slider with play trigger button */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] text-zinc-400 font-black">
                      <span>HAPTIC BURST ENGINE FREQ:</span>
                      <span className="text-zinc-100">{hapticFreq.toFixed(1)}Hz</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={hapticFreq}
                        onChange={(e) => setHapticFreq(parseFloat(e.target.value))}
                        className="flex-1 accent-white cursor-pointer h-1 bg-zinc-900 rounded-lg appearance-none"
                      />
                      <button
                        onClick={triggerHapticBurst}
                        className={`p-2 border border-red-500 text-red-500 rounded bg-black hover:bg-red-500/10 cursor-pointer text-center text-[8.5px] font-bold uppercase transition-all ${
                          isVibrating ? 'animate-bounce shadow-[0_0_10px_#FF0033]' : ''
                        }`}
                      >
                        BURST
                      </button>
                    </div>
                  </div>

                  {/* Glitch & Ammo Freeze block */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={triggerScreenGlitch}
                      className="px-3 py-2 bg-black border border-red-500 text-red-550 rounded text-[8.5px] font-bold uppercase hover:bg-red-950/20 active:scale-95 transition-all text-center cursor-pointer"
                    >
                      SCREEN GLITCH PULSE
                    </button>

                    <div className="flex items-center space-x-2 bg-zinc-950 px-2.5 py-1.5 rounded border border-zinc-900">
                      <span className="text-[8px] text-zinc-400 font-bold uppercase">AMMO FREEZE:</span>
                      <button
                        onClick={() => {
                          setInventoryFreeze(!inventoryFreeze);
                          addLog(`[INVENTORY] Ammo freeze state: ${!inventoryFreeze ? 'LOCKED' : 'UNLOCKED'}`);
                          triggerAudioSynth(inventoryFreeze ? 600 : 400, 0.08);
                        }}
                        className="focus:outline-none cursor-pointer"
                      >
                        {inventoryFreeze ? (
                          <Lock className="w-3.5 h-3.5 text-red-500" />
                        ) : (
                          <Unlock className="w-3.5 h-3.5 text-zinc-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Weather Manipulation Dropper */}
                  <div className="space-y-1 bg-zinc-950 p-2 rounded border border-zinc-900 flex items-center justify-between">
                    <span className="text-[8px] text-zinc-450 uppercase font-black">WEATHER MANIP VECTOR:</span>
                    <select
                      value={weatherVector}
                      onChange={(e) => {
                        const nextWeather = e.target.value;
                        setWeatherVector(nextWeather);
                        addLog(`[CLIMATE] Injected geo-engineering vector: ${nextWeather}`);
                        triggerAudioSynth(650, 0.2);
                      }}
                      className="bg-black text-[9px] text-red-500 font-bold border border-red-500/20 rounded px-1.5 py-0.5 focus:outline-none"
                    >
                      <option value="TOXIC_RAIN">TOXIC ACID RAIN</option>
                      <option value="ZOMBIE_FOG">ZOMBIE SPORE FOG</option>
                      <option value="GLITCH_ECLIPSE">ECLIPSE INTERFERENCE</option>
                      <option value="SOLAR_BURST">SOLAR ELECTROMAGNETIC FLARE</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* ==========================================
                5. SYSTEM TERMINAL INTERFACE Section
                ========================================== */}
            <div className="border border-red-500/40 bg-black rounded shadow-[0_0_10px_rgba(255,0,51,0.06)] overflow-hidden">
              <button 
                onClick={() => toggleSection('terminal')}
                className="w-full px-3 py-2.5 bg-zinc-950 flex items-center justify-between border-b border-red-500/20"
              >
                <div className="flex items-center space-x-2 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[10px] text-red-500 font-black tracking-wider uppercase">
                    5. SYSTEM TERMINAL SHELL
                  </span>
                </div>
                <span className="text-[9px] text-zinc-500">{expandedSections.terminal ? '▼' : '▲'}</span>
              </button>

              {expandedSections.terminal && (
                <div className="p-3 space-y-2.5 bg-black">
                  {/* Console log display screen */}
                  <div className="h-28 overflow-y-auto scrollbar-thin bg-black border border-red-500/20 p-2 text-left rounded space-y-1.5 font-mono text-[8.5px]">
                    {kernelLogs.map((log, index) => (
                      <div key={index} className="text-red-500 leading-tight">
                        <span className="text-[7.5px] select-none text-red-500/40 mr-1">»</span>
                        {log}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Shell terminal Input Form */}
                  <form onSubmit={handleCommandSubmit} className="flex items-center space-x-1.5">
                    <span className="text-[9.5px] font-bold text-red-500 shrink-0">HELL_ROOT$</span>
                    <input 
                      type="text"
                      className="flex-1 bg-black text-[9.5px] text-zinc-150 font-mono border border-zinc-850 px-2 py-1.5 rounded focus:outline-none focus:border-red-500/80 transition-colors placeholder:text-zinc-700"
                      placeholder="TYPE COMMAND (e.g. override all / help / clear)"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                    />
                  </form>
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'exporter' ? (
          /* ==========================================
              FLUTTER CONTAINER SOURCE EXPORTER DOCK
             ========================================== */
          <div className="text-left space-y-3 p-1 animate-fadeIn">
            <div className="p-3 bg-cyan-950/15 border border-cyan-500/30 rounded">
              <span className="text-[8px] text-cyan-400 uppercase font-black tracking-wider block">
                FLUTTER DEV DIAGNOSTICS DECK
              </span>
              <h4 className="text-xs font-black text-zinc-200 uppercase mt-1">HELL PROTOCOL COMPONENT WIDGET</h4>
              <p className="text-[8.5px] text-zinc-400 mt-1 leading-normal uppercase">
                THIS FLUTTER Dart WIDGET CONSTRUCTS THE ENTIRE BLACK-HAT CYBERPUNK THREAT DESCRIPTOR UI SPECIFICATION, OPTIMIZED FOR THE 1.5K AMOLED REALME GT 6T LAYOUT. IT FEATURES ADVANCED StatefulWidgets, EXPANDABLE CYBER-TERMINALS, CUSTOM SINE SMMYETRIC AUDIO WAVEFORM PAINTERS, HAPTIC SYSTEMS INJECTION AND EXTENDED SHELL SYSTEM TERMINALS.
              </p>
            </div>

            {/* Code Output Text Box */}
            <div className="relative">
              <div className="absolute right-2.5 top-2.5 z-10 flex space-x-2">
                <button
                  onClick={copyFlutterCode}
                  className="px-2.5 py-1 bg-cyan-950/80 border border-cyan-500 text-cyan-400 hover:text-white rounded text-[8px] font-bold uppercase transition-all flex items-center space-x-1 cursor-pointer active:scale-95 hover:bg-cyan-600 hover:text-black"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>COPIED SOURCE!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY SOURCE</span>
                    </>
                  )}
                </button>
              </div>

              <div className="h-[28rem] overflow-y-auto border border-zinc-850 bg-black rounded p-3 text-[8.5px] leading-relaxed text-zinc-350 scrollbar-thin select-text">
                <pre className="font-mono text-zinc-400 block whitespace-pre overflow-x-auto select-all">
                  {FLUTTER_CODE_SNIPPET}
                </pre>
              </div>
            </div>

            {/* Architecture guidelines advice alerts block */}
            <div className="p-3 border border-zinc-900 bg-zinc-950 rounded space-y-1.5 text-[8.5px] leading-relaxed">
              <span className="text-amber-500 font-bold block uppercase tracking-wider">
                SENIOR ARCHITECT SPECIFICATIONS FOR COMPILING:
              </span>
              <div className="space-y-1 text-zinc-500 font-mono">
                <div>• Add <code className="text-cyan-400">flutter/services.dart</code> to reference physical device biometric and tactile feedback coils engines.</div>
                <div>• Ensure your target pubspec.yaml includes a monospace sans font such as <code className="text-cyan-450">RobotoMono</code> to display code streams symmetrically.</div>
                <div>• Pure pitch-black canvas hexadecimal colors (<code className="text-cyan-400">0xFF000000</code>) unlock sub-pixel absolute contrast and lower battery decay.</div>
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
              UNREAL ENGINE 5 BLUEPRINTS GUIDE DOCK
             ========================================== */
          <div className="text-left space-y-4 p-1 animate-fadeIn">
            {/* Architectural overview */}
            <div className="p-3 bg-amber-950/10 border border-amber-500/30 rounded-md">
              <span className="text-[8px] text-amber-500 uppercase font-black tracking-widest block mb-0.5">
                [TECHNICAL SPECIFICATION DISPATCH]
              </span>
              <h3 className="text-[11px] font-black text-zinc-100 uppercase tracking-wide">
                UE5 BLUEPRINT LOGIC: HELL API INTEGRATION
              </h3>
              <p className="text-[8.5px] text-zinc-400 mt-1 uppercase leading-relaxed font-mono">
                COMPREHENSIVE STEP-BY-STEP FLOW MAP FOR IMPLEMENTING REST COGNITIVE PACKETS INTEGRATION WITHIN UNREAL ENGINE 5 USING THE FREE <code className="text-amber-400 font-bold">VaREST Plugin</code>. THIS ENABLES REAL-TIME SEED RETRIEVAL AND ENVELOPES LEVEL MUTATIONS TAILORED FOR SNAPDRAGON 7+ GEN 3 DRIVERS.
              </p>
            </div>

            {/* BLUEPRINT SECTION 1 */}
            <div className="border border-zinc-900 bg-black rounded overflow-hidden">
              <div className="bg-gradient-to-r from-red-950/40 to-zinc-950/90 px-3 py-2 border-b border-zinc-900 flex justify-between items-center">
                <span className="text-[9.5px] font-black text-amber-500 uppercase tracking-wider">
                  1. CUSTOM EVENT: InitGameSession_API
                </span>
                <span className="text-[7.5px] text-zinc-550 font-bold bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded">
                  BACKGROUND THREAD
                </span>
              </div>
              
              <div className="p-3 space-y-3 font-mono">
                <p className="text-[8px] text-zinc-400 uppercase leading-normal">
                  RUNS ON THE BACKGROUND STAGE OF YOUR MAIN GM (GAMEMODE) OR GE (GAMEENGINE) BASE TO INITIALIZE THE DYNAMIC HELL MUTATOR PACKETS.
                </p>

                {/* Flow Simulation Mockup */}
                <div className="space-y-2.5">
                  <div className="bg-zinc-950 border border-red-500/10 p-2.5 rounded text-[8px] space-y-2 shadow-inner">
                    <div className="text-red-500 font-bold uppercase flex items-center space-x-1.5 border-b border-zinc-900 pb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-550 animate-pulse"></span>
                      <span>Event Graph - Custom Event "InitGameSession_API"</span>
                    </div>

                    {/* Nodes block styling */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                      {/* Node A */}
                      <div className="bg-zinc-900 border border-red-500/20 rounded p-1.5 shadow">
                        <div className="bg-red-800 text-white font-black p-0.5 text-center text-[7.5px] rounded-sm truncate uppercase">
                          CUSTOM EVENT: InitGameSession_API
                        </div>
                        <div className="pt-1.5 flex justify-between">
                          <span className="text-[7px] text-zinc-500">Inputs: none</span>
                          <span className="text-white font-bold text-[7.5px] flex items-center">
                            Exec (Output) <span className="ml-1 text-white">▷</span>
                          </span>
                        </div>
                      </div>

                      {/* Node B */}
                      <div className="bg-zinc-900 border border-blue-500/20 rounded p-1.5 shadow">
                        <div className="bg-blue-800 text-white font-black p-0.5 text-center text-[7.5px] rounded-sm truncate uppercase">
                          Sequence
                        </div>
                        <div className="pt-1.5 flex justify-between space-y-0.5 flex-col">
                          <div className="flex justify-between">
                            <span className="text-white mr-1 text-[7.5px]">▷ Exec</span>
                            <span className="text-white text-[7.5px]">Then 0 ▷</span>
                          </div>
                          <div className="flex justify-end">
                            <span className="text-white text-[7.5px]">Then 1 ▷</span>
                          </div>
                        </div>
                      </div>

                      {/* Node C */}
                      <div className="bg-zinc-900 border border-blue-500/20 rounded p-1.5 shadow">
                        <div className="bg-blue-800 text-white font-black p-0.5 text-center text-[7.5px] rounded-sm truncate uppercase">
                          Construct JSON Object
                        </div>
                        <div className="pt-1.5 flex justify-between">
                          <span className="text-white text-[7.5px]">▷ In</span>
                          <span className="text-cyan-400 text-[7px]">Return Value ◯</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wiring connections text documentation */}
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-900 space-y-1.5">
                    <span className="text-[8px] text-zinc-350 font-black block uppercase tracking-wider">
                      » NODE-BY-NODE WIRING PROTOCOL:
                    </span>
                    <ul className="text-[8px] text-zinc-450 space-y-1.5 divide-y divide-zinc-905">
                      <li className="pt-1">
                        <strong className="text-amber-500 font-bold uppercase">[STEP 1]</strong> Search for <strong className="text-zinc-200">Custom Event</strong> in the search drawer. Name it <code className="text-red-400">"InitGameSession_API"</code>.
                      </li>
                      <li className="pt-1">
                        <strong className="text-amber-500 font-bold uppercase">[STEP 2]</strong> Drag the white triangle <code className="text-zinc-300">Exec</code> pin from <code className="text-red-400">InitGameSession_API</code> and connect to the <code className="text-zinc-300">Exec In</code> of a <strong className="text-zinc-200">Sequence</strong> node.
                      </li>
                      <li className="pt-1">
                        <strong className="text-amber-500 font-bold uppercase">[STEP 3]</strong> From <code className="text-zinc-300">Sequence node's "Then 0"</code> Exec pin, drag wire and connect to <strong className="text-zinc-200">Construct VaREST JSON Object</strong>.
                      </li>
                      <li className="pt-1">
                        <strong className="text-amber-500 font-bold uppercase">[STEP 4]</strong> From <code className="text-zinc-300 font-bold">Sequence's "Then 1"</code> Exec pin, drag wire and drop on <strong className="text-zinc-200">Call URL</strong> node.
                      </li>
                      <li className="pt-1">
                        <strong className="text-amber-500 font-bold uppercase">[STEP 5]</strong> Configure the <strong className="text-zinc-200">Call URL</strong> Parameters:
                        <ul className="pl-3.5 mt-1 list-disc space-y-1 text-zinc-500">
                          <li><strong>URL Pin (String):</strong> <code className="text-cyan-400 select-all">"https://your-hell-server.railway.app/api/v1/game-init"</code> (Or paste your dynamic local test instance address)</li>
                          <li><strong>Verb Pin (Enum Selector):</strong> Set dropdown selection directly to <code className="text-amber-400">POST</code></li>
                          <li><strong>Request Object:</strong> Link the cyan colored <code className="text-cyan-400">Return Value</code> circle pin of <code className="text-zinc-300">Construct JSON Object</code> to the <code className="text-cyan-400">Request Object</code> Input socket.</li>
                        </ul>
                      </li>
                      <li className="pt-1">
                        <strong className="text-amber-500 font-bold uppercase">[STEP 6]</strong> Drag wire off the <strong className="text-zinc-200">On Request Complete</strong> Delegate pin. Drop onto the grid and type <code className="text-zinc-200">"Create Event"</code>. On the dropdown selection, select <code className="text-amber-400">"On_API_Response_Success"</code>. This binds the custom handler to the payload dispatch.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* BLUEPRINT SECTION 2 */}
            <div className="border border-zinc-900 bg-black rounded overflow-hidden">
              <div className="bg-gradient-to-r from-teal-950/40 to-zinc-950/90 px-3 py-2 border-b border-zinc-900 flex justify-between items-center">
                <span className="text-[9.5px] font-black text-teal-400 uppercase tracking-wider">
                  2. CUSTOM EVENT: On_API_Response_Success
                </span>
                <span className="text-[7.5px] text-zinc-550 font-bold bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded">
                  RESPONSE PARSER
                </span>
              </div>

              <div className="p-3 space-y-3 font-mono">
                <p className="text-[8px] text-zinc-400 uppercase leading-normal">
                  ACTS AS THE LIVE DECODER INTERCEPTOR TO DECOMPRESS THE INCOMING JSON CONFIGURATION STREAM INTO INSTANCED SYSTEM VARIABLES.
                </p>

                {/* Flow Simulation Mockup */}
                <div className="space-y-2.5">
                  <div className="bg-zinc-950 border border-teal-500/10 p-2.5 rounded text-[8px] space-y-2 shadow-inner">
                    <div className="text-teal-400 font-bold uppercase flex items-center space-x-1.5 border-b border-zinc-900 pb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-550 animate-pulse"></span>
                      <span>Event Graph - Custom Event "On_API_Response_Success"</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                      {/* Event node */}
                      <div className="bg-zinc-900 border border-teal-500/20 rounded p-1.5 shadow">
                        <div className="bg-red-800 text-white font-black p-0.5 text-center text-[7.5px] rounded-sm truncate uppercase">
                          On_API_Response_Success
                        </div>
                        <div className="pt-1.5 flex flex-col space-y-1">
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Inputs:</span>
                            <span className="text-white">▷ Exec Out</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-cyan-400">◯ Request Object (Ref)</span>
                            <span className="text-zinc-500"></span>
                          </div>
                        </div>
                      </div>

                      {/* Parse Nodes */}
                      <div className="bg-zinc-900 border border-zinc-800 rounded p-1.5 shadow space-y-1.5">
                        <div className="bg-zinc-800 p-0.5 text-center text-zinc-300 text-[7px] font-black uppercase">
                          GET RESPONSE OBJECT (VaREST)
                        </div>
                        <div className="flex justify-between text-[7px]">
                          <span className="text-cyan-400">◯ Self Request</span>
                          <span className="text-cyan-300">Return Object (JSON) ◯</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wiring connections text documentation */}
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-900 space-y-1.5">
                    <span className="text-[8px] text-zinc-350 font-black block uppercase tracking-wider">
                      » NODE-BY-NODE WIRING PROTOCOL:
                    </span>
                    <ul className="text-[8px] text-zinc-450 space-y-1.5 divide-y divide-zinc-905">
                      <li className="pt-1">
                        <strong className="text-cyan-400 font-bold uppercase">[STEP 1]</strong> Locate the input parameter of <code className="text-teal-400">"On_API_Response_Success"</code> named <strong className="text-zinc-200">"Request" (VaREST Request reference object)</strong>.
                      </li>
                      <li className="pt-1">
                        <strong className="text-cyan-400 font-bold uppercase">[STEP 2]</strong> Drag a wire from that <code className="text-cyan-400">Request Object</code> value pin and connect it to a <strong className="text-zinc-200">"Get Response Object"</strong> node. This returns the raw JSON container.
                      </li>
                      <li className="pt-1">
                        <strong className="text-cyan-400 font-bold uppercase">[STEP 3]</strong> For <strong className="text-zinc-200">"story_seed" Text Sync</strong>:
                        <ul className="pl-3.5 mt-1 list-disc space-y-1 text-zinc-500">
                          <li>Drag wire from the JSON output of <code className="text-zinc-300">Get Response Object</code> (colored cyan) and call <strong className="text-zinc-200">"Get String Field"</strong>.</li>
                          <li>Type <code className="text-pink-400">"story_seed"</code> exactly into the Field Name text parameter.</li>
                          <li>On the My Blueprint tab, create a Global String Variable named <code className="text-cyan-400">"CurrentMissionText"</code>. Drag it into the grid and select <strong className="text-zinc-200">"SET"</strong>.</li>
                          <li>Link the execution wire from the Event header through this SET node, and plug the violet String Output pin from <code className="text-zinc-300">Get String Field</code> directly into the input of the <code className="text-cyan-400">CurrentMissionText</code> SET.</li>
                        </ul>
                      </li>
                      <li className="pt-1">
                        <strong className="text-cyan-400 font-bold uppercase">[STEP 4]</strong> For <strong className="text-zinc-200">"hell_mode" Overrides</strong>:
                        <ul className="pl-3.5 mt-1 list-disc space-y-1 text-zinc-500">
                          <li>From the same JSON return object pin, drag out wire and call <strong className="text-zinc-200">"Get Boolean Field"</strong>.</li>
                          <li>Type <code className="text-red-400">"hell_mode"</code> exactly into its Field Name parameter input.</li>
                          <li>Create a Global Boolean variable named <code className="text-red-400">"IsHellModeActive"</code>, drag to graph as a <strong className="text-zinc-200">"SET "</strong>.</li>
                          <li>Connect execution flow through this SET node, and plug the red output boolean pin of <code className="text-zinc-300">Get Boolean Field</code> into it.</li>
                        </ul>
                      </li>
                      <li className="pt-1">
                        <strong className="text-cyan-400 font-bold uppercase">[STEP 5]</strong> For <strong className="text-zinc-200">"mic_zombies_enabled" Switch</strong>:
                        <ul className="pl-3.5 mt-1 list-disc space-y-1 text-zinc-500">
                          <li>From the JSON output block, drag wire and construct a third <strong className="text-zinc-200">"Get Boolean Field"</strong>. Type <code className="text-red-400">"mic_zombies_enabled"</code> on the Field Name pin.</li>
                          <li>Create a Boolean variable <code className="text-red-400">"IsMicSensingActive"</code>. Drag into Graph, set it as a <strong className="text-zinc-200">"SET"</strong>.</li>
                          <li>Link both execution wire and red values wire to lock configuration.</li>
                        </ul>
                      </li>
                      <li className="pt-1">
                        <strong className="text-cyan-400 font-bold uppercase">[STEP 6]</strong> Hook the final execution wire of this chain to a new custom execution chain function: <code className="text-amber-400">"Apply_HellMode_Overrides"</code>.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* BLUEPRINT SECTION 3 */}
            <div className="border border-zinc-900 bg-black rounded overflow-hidden">
              <div className="bg-gradient-to-r from-red-950/40 to-zinc-950/90 px-3 py-2 border-b border-zinc-900 flex justify-between items-center">
                <span className="text-[9.5px] font-black text-rose-500 uppercase tracking-wider">
                  3. EXECUTION CHAIN: Apply_HellMode_Overrides
                </span>
                <span className="text-[7.5px] text-zinc-550 font-bold bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded">
                  MUTATION CONTROLLER
                </span>
              </div>

              <div className="p-3 space-y-3 font-mono">
                <p className="text-[8px] text-zinc-400 uppercase leading-normal">
                  DYNAMCALLY MUTATES IN-GAME ENVIRONMENT SHADERS, PHYSICAL ASSETS (SS CRANE SHIFTING SPEED/HEX GLOW COILS), AND POST-PROCESSING OVERRIDES.
                </p>

                {/* Flow Simulation Mockup */}
                <div className="space-y-2.5">
                  <div className="bg-zinc-950 border border-rose-500/10 p-2.5 rounded text-[8px] space-y-2 shadow-inner">
                    <div className="text-rose-450 font-bold uppercase flex items-center space-x-1.5 border-b border-zinc-900 pb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-550 animate-pulse"></span>
                      <span>Execution Frame - "Apply_HellMode_Overrides"</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-mono">
                      {/* Branch Node */}
                      <div className="bg-zinc-900 border border-zinc-850 rounded p-1.5">
                        <div className="bg-zinc-850 text-zinc-350 p-0.5 text-center text-[7px] font-black uppercase">
                          BRANCH
                        </div>
                        <div className="pt-1 space-y-1 text-[7px]">
                          <div className="flex justify-between">
                            <span className="text-red-400">◯ Condition (IsHellModeActive)</span>
                            <span className="text-white">True ▷</span>
                          </div>
                          <div className="text-right text-zinc-500">False ▷</div>
                        </div>
                      </div>

                      {/* Actor Getter */}
                      <div className="bg-zinc-900 border border-blue-500/10 rounded p-1.5">
                        <div className="bg-blue-900 text-white p-0.5 text-center text-[7px] font-black uppercase">
                          Get All Actors of Class
                        </div>
                        <div className="pt-1 text-[7px] space-y-1 text-zinc-400">
                          <div>Class: BP_SS_Crane_Entity</div>
                          <div className="text-right text-teal-400">Out Actors [] ◯</div>
                        </div>
                      </div>

                      {/* For Each loop */}
                      <div className="bg-zinc-900 border border-zinc-850 p-1.5 rounded">
                        <div className="bg-zinc-800 text-zinc-350 p-0.5 text-center text-[7px] font-black uppercase">
                          For Each Loop
                        </div>
                        <div className="pt-1 text-[7px] space-y-1">
                          <div className="flex justify-between">
                            <span className="text-teal-400">◯ Input Array</span>
                            <span className="text-white font-bold">Loop Body ▷</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wiring connections text documentation */}
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-900 space-y-1.5">
                    <span className="text-[8px] text-zinc-350 font-black block uppercase tracking-wider">
                      » NODE-BY-NODE WIRING PROTOCOL:
                    </span>
                    <ul className="text-[8px] text-zinc-450 space-y-1.5 divide-y divide-zinc-905">
                      <li className="pt-1">
                        <strong className="text-rose-500 font-bold uppercase">[STEP 1]</strong> Spawn a <strong className="text-zinc-200">"Branch"</strong> logic gateway. Drag the red <code className="text-red-400">"IsHellModeActive"</code> boolean variable onto the conditions parameter in.
                      </li>
                      <li className="pt-1">
                        <strong className="text-rose-500 font-bold uppercase">[STEP 2]</strong> On the <strong className="text-emerald-400">"True ▷"</strong> execute socket, pull a wire out and connect to a <strong className="text-zinc-200">"Get All Actors of Class"</strong> (Select Class Dropdown: <code className="text-cyan-400">BP_SS_Crane_Entity</code>).
                      </li>
                      <li className="pt-1">
                        <strong className="text-rose-500 font-bold uppercase">[STEP 3]</strong> Connect the execution pin from that node to a <strong className="text-zinc-200">"For Each Loop"</strong> node, and connect the teal colored <code className="text-teal-400">"Out Actors"</code> array pin to the <code className="text-teal-400">"Input Array"</code> pin of that For Each.
                      </li>
                      <li className="pt-1">
                        <strong className="text-rose-500 font-bold uppercase">[STEP 4]</strong> From the <strong className="text-zinc-200">"Loop Body ▷"</strong> Exec, pull wire out and search for <strong className="text-zinc-350">"Set_Anomalous_Aggression_Mode"</strong> (A Custom function of your Crane Entity). This custom function increases rotation constraints and triggers extreme materials mutation (glowing hazard warning shader parameters).
                      </li>
                      <li className="pt-1">
                        <strong className="text-rose-500 font-bold uppercase">[STEP 5]</strong> Connect the loop output object reference <code className="text-cyan-450">"Array Element"</code> directly to the <code className="text-cyan-400">"Target"</code> pin of <code className="text-zinc-300">"Set_Anomalous_Aggression_Mode"</code>.
                      </li>
                      <li className="pt-1">
                        <strong className="text-rose-500 font-bold uppercase">[STEP 6]</strong> On the loop <strong className="text-zinc-250">"Completed ▷"</strong> pin, drag wire to another <strong className="text-zinc-200">"Get All Actors of Class"</strong> set specifically to <code className="text-cyan-400">"PostProcessVolume"</code>.
                      </li>
                      <li className="pt-1">
                        <strong className="text-rose-500 font-bold uppercase">[STEP 7]</strong> Run another For Each. From the array element of the PP Volume, pull a wire called <strong className="text-zinc-200">"Set Settings"</strong>. Inside its nested properties drawer, expand and configure:
                        <ul className="pl-3.5 mt-1 list-disc space-y-1 text-zinc-500">
                          <li><strong>Chromatic Aberration Intensity:</strong> Toggle override and set to <code className="text-amber-400">1.8</code> (simulating critical Snapdragon AMOLED hardware glitching)</li>
                          <li><strong>Vignette Intensity:</strong> Toggle and set to <code className="text-amber-400">0.85</code> and input a deep blood-red vector into color settings.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* BLUEPRINT SECTION 4 */}
            <div className="border border-zinc-900 bg-black rounded overflow-hidden">
              <div className="bg-gradient-to-r from-purple-950/40 to-zinc-950/90 px-3 py-2 border-b border-zinc-900 flex justify-between items-center">
                <span className="text-[9.5px] font-black text-purple-400 uppercase tracking-wider">
                  4. VOICE DETECTION LOGIC: Mic_Audio_Sensing_Loop
                </span>
                <span className="text-[7.5px] text-zinc-550 font-bold bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded">
                  HAPTICS & AI PATHS
                </span>
              </div>

              <div className="p-3 space-y-3 font-mono">
                <p className="text-[8px] text-zinc-400 uppercase leading-normal">
                  COMPUTES LIVE MICROPHONE INPUT AUDIO GAIN FROM THE REALME GT 6T DRIVER HARDWARE. REAL PLAYERS SCREAMING DISPATCHES NEIGHBORING ZOMBIES PATHFINDING RADIAL DIRECTLY TO USER VECTOR location.
                </p>

                {/* Flow Simulation Mockup */}
                <div className="space-y-2.5">
                  <div className="bg-zinc-950 border border-purple-500/10 p-2.5 rounded text-[8px] space-y-2 shadow-inner">
                    <div className="text-purple-450 font-bold uppercase flex items-center space-x-1.5 border-b border-zinc-900 pb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-550 animate-pulse"></span>
                      <span>Execution Frame - "Mic_Audio_Sensing_Loop"</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                      {/* Sensing Node */}
                      <div className="bg-zinc-900 border border-purple-500/20 rounded p-1.5 shadow space-y-1">
                        <div className="bg-purple-900 text-white font-black p-0.5 text-center text-[7.5px] rounded-sm truncate uppercase">
                          Set Timer by Event
                        </div>
                        <div className="text-[7.5px] text-zinc-400">
                          <div>Time: 0.1 sec</div>
                          <div className="text-amber-400">Looping: TRUE ◯</div>
                        </div>
                      </div>

                      {/* Envelope getter */}
                      <div className="bg-zinc-900 border border-zinc-800 rounded p-1.5 shadow">
                        <div className="bg-zinc-850 text-zinc-200 p-0.5 text-center text-[7px] font-black uppercase">
                          Get Submix Envelope Info
                        </div>
                        <div className="pt-1 text-[7px] space-y-1">
                          <span className="text-green-400">Return Value (Float) ◯</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wiring connections text documentation */}
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-900 space-y-1.5">
                    <span className="text-[8px] text-zinc-350 font-black block uppercase tracking-wider">
                      » NODE-BY-NODE WIRING PROTOCOL:
                    </span>
                    <ul className="text-[8px] text-zinc-450 space-y-1.5 divide-y divide-zinc-905">
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 1]</strong> On the completion of your level loaded sequence or game start parameters, add a <strong className="text-zinc-200">"Branch"</strong> testing if <code className="text-red-400">"IsMicSensingActive"</code> variable is set to <strong className="text-zinc-200">TRUE</strong>.
                      </li>
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 2]</strong> On <strong className="text-emerald-450">"True ▷"</strong>, drag wire out and search for <strong className="text-zinc-200">"Set Timer by Event"</strong> node. Set parameter <code className="text-green-400">Time = 0.1</code> and check its <code className="text-red-400">"Looping"</code> checkbox wrapper to TRUE.
                      </li>
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 3]</strong> From its <code className="text-zinc-350 font-bold">Event (Input Block Delegate)</code> pin, pull wire backwards and release. Create matching <strong className="text-zinc-200">Custom Event</strong> and title it: <code className="text-purple-400">"Scream_Check_Ticker"</code>.
                      </li>
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 4]</strong> Connect this custom event to <strong className="text-zinc-200">"Get Submix Envelope Value"</strong> (Assumes you have bound your physical hardware microphone input to a Submix receiver asset). Let this return the live player decimal volume.
                      </li>
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 5]</strong> Connect the float output value to a <strong className="text-zinc-200">"Greater Than (&gt;)"</strong> math operator comparison node.
                      </li>
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 6]</strong> Drag your float threshold variable <code className="text-green-400">"ScreamThreshold"</code> (Recommend calibrating value to <code className="text-purple-400">0.45</code> for Realme GT 6T physical speaker filters) and plug to bottom comparison socket of Greater than.
                      </li>
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 7]</strong> Wire this math boolean output pin into a new <strong className="text-zinc-250">Branch</strong> check.
                      </li>
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 8]</strong> On this second branch's <strong className="text-emerald-450">"True ▷"</strong> hook, call <strong className="text-zinc-200">"Get All Actors of Class"</strong> set specifically to <code className="text-cyan-400">"BP_Industrial_Zombie"</code>.
                      </li>
                      <li className="pt-1">
                        <strong className="text-purple-400 font-bold uppercase">[STEP 9]</strong> Run a For Each loop. For each array element reference target, spawn a <strong className="text-zinc-200">"AI Move To"</strong> function logic node:
                        <ul className="pl-3.5 mt-1 list-disc space-y-1 text-zinc-500">
                          <li>Get <code className="text-cyan-400">AI Controller</code> for each zombie item. Plug it to the <strong className="text-zinc-200">"Pawn" / "Controller"</strong> Target socket.</li>
                          <li>Right click in empty space and search for <strong className="text-zinc-200">"Get Player Character"</strong>. Fetch its return reference node.</li>
                          <li>On Get Player Character, search for <strong className="text-zinc-200">"Get Actor Location"</strong>.</li>
                          <li>Wire this Yellow vector pin directly into the <strong className="text-zinc-205">"Destination"</strong> yellow coordinate input slot on the <strong className="text-zinc-200">AI Move To</strong> node.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Compiled successfully confirmation logs */}
            <div className="p-3 border border-zinc-900 bg-zinc-950 rounded space-y-1.5 text-[8.5px] leading-relaxed">
              <span className="text-green-400 font-bold block uppercase tracking-wider">
                TECHNICAL NOTE FROM DIGITAL DIRECTORS COILS:
              </span>
              <p className="text-zinc-500">
                • THE VaREST MODULE PERFORMS ALL RESPONSE THREAD BINDINGS ASYNCHRONOUSLY. SO ALL CALLS ARE PROTECTED FROM COILS HANGS AND LATENCY RETRIES. YOUR APP CONSOLE IN THE SIMULATION TAB MIMICS THESE SAME PACKET RECEPTORS LOCALLY OVER OUR EXPRESS MASTER CORED MIDDLEWARE LAYER ON PORT 3000!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cyber footer info block */}
      <div className="p-2.5 bg-black border-t border-zinc-930 text-center shrink-0">
        <span className="text-[7.5px] text-zinc-550 block uppercase tracking-widest font-mono">
          SS_ENG SECURE TUNNEL BINDING | CLOCK CONSOLIDATED AT PORT 3000
        </span>
      </div>
    </div>
  );
}
