import React, { useState } from 'react';
import { Wifi, Signal, RefreshCcw, AlertTriangle, CloudOff, Globe, Shield, Radio, Activity } from 'lucide-react';
import { SystemStatus } from '../types';

interface NetworkManagerProps {
  status: SystemStatus;
  onToggleOffline: (offline: boolean) => void;
  onToggleCellular: (type: '5G' | 'WiFi') => void;
}

export default function NetworkManager({ status, onToggleOffline, onToggleCellular }: NetworkManagerProps) {
  const [testingPing, setTestingPing] = useState(false);
  const [testResults, setTestResults] = useState<{ node: string; delay: number; loss: number }[] | null>(null);

  const startPingDiagnostic = () => {
    setTestingPing(true);
    setTestResults(null);

    // Beep with incremental frequency
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {}

    setTimeout(() => {
      setTestingPing(false);
      setTestResults([
        { node: 'SINGAPORE_BACKEND_NODE', delay: Math.floor(Math.random() * 20) + 12, loss: 0 },
        { node: 'SS_CRANE_LOCAL_TELEMETRY', delay: Math.floor(Math.random() * 5) + 3, loss: 0 },
        { node: 'SUPABASE_STORAGE_BUCKETS', delay: Math.floor(Math.random() * 50) + 40, loss: 0.1 },
        { node: 'FIREBASE_AUTH_SERVERS', delay: Math.floor(Math.random() * 30) + 18, loss: 0 }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-4 px-4 py-4 max-h-full overflow-y-auto">
      {/* Header Panel */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">TELEMETRY ROUTER</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">NETWORK CONTROL GATEWAY</h2>
        </div>
        <div className={`p-1 px-2 rounded font-mono text-[9px] font-bold uppercase flex items-center space-x-1 ${
          status.networkMode === 'offline' 
            ? 'bg-red-950/20 border border-red-900/45 text-neon-red' 
            : 'bg-emerald-950/20 border border-emerald-900/30 text-emerald-400'
        }`}>
          {status.networkMode === 'offline' ? <CloudOff className="w-3 h-3 mr-0.5" /> : <Globe className="w-3 h-3 mr-0.5" />}
          <span>{status.networkMode.toUpperCase()}</span>
        </div>
      </div>

      {/* Network Offline Mode Auto Switch Switcher */}
      <div className="bg-zinc-950 border border-zinc-900 rounded p-3.5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xs font-mono font-bold text-zinc-350 uppercase">OFFLINE TELEMETRY SIMULATION</h3>
            <p className="text-[9px] font-mono text-zinc-500 leading-normal mt-1 uppercase">
              DEVIATION ROUTING CACHES & FALLBACK EMULATORS WHEN CONNECTIVITY DROP OUT
            </p>
          </div>
          <button
            onClick={() => {
              // Acoustic sound
              try {
                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = status.networkMode === 'online' ? 'triangle' : 'sine';
                osc.frequency.setValueAtTime(status.networkMode === 'online' ? 250 : 500, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.15);
              } catch {}
              onToggleOffline(status.networkMode === 'online');
            }}
            className={`px-3 py-1.5 rounded text-[9px] font-mono font-semibold relative overflow-hidden transition-all duration-300 border cursor-pointer ${
              status.networkMode === 'offline'
                ? 'border-red-500 bg-red-950/20 text-red-400 font-black shadow-[0_0_8px_rgba(255,0,51,0.2)]'
                : 'border-zinc-800 bg-black text-zinc-400 hover:border-zinc-700'
            }`}
          >
            {status.networkMode === 'offline' ? 'FORCE ONLINE MODE' : 'FORCE OFFLINE MODE'}
          </button>
        </div>

        {status.networkMode === 'offline' && (
          <div className="p-2.5 bg-red-950/10 border border-red-900/35 rounded flex items-start space-x-2 animate-pulse">
            <AlertTriangle className="w-4 h-4 text-neon-red shrink-0 mt-0.5" />
            <span className="text-[9px] font-mono text-red-400 leading-normal tracking-wide uppercase">
              WARNING: SYSTEM USING EMULATED STATISTICAL SEED DATABASES. LOCAL READS INSECURE UNTIL LIVE SYNC TRIGGERED.
            </span>
          </div>
        )}
      </div>

      {/* Cellular Connectivity Bands WiFi vs 5G */}
      <div className="bg-black border border-zinc-900 p-3.5 rounded relative space-y-3">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-850 text-[8px] font-mono text-red-500 tracking-widest font-extrabold uppercase">
          CARRIER MODULATION SELECTOR
        </span>

        <p className="text-[9px] font-mono text-zinc-400 pt-1 leading-normal uppercase">
          Toggle antenna modulation spectrum bands for Realme GT 6T AMOLED tests:
        </p>

        <div className="grid grid-cols-2 gap-2 pb-1 pt-1">
          <button
            onClick={() => {
              onToggleCellular('5G');
            }}
            className={`py-2 px-2.5 rounded border text-[10px] font-mono font-bold tracking-widest uppercase cursor-pointer flex items-center justify-center space-x-1.5 transition-all ${
              status.cellularMode === '5G'
                ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20 font-black shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                : 'border-zinc-800 text-zinc-500 bg-black hover:border-zinc-700 hover:text-zinc-300'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>MOBILE MOBILE 5G</span>
          </button>

          <button
            onClick={() => {
              onToggleCellular('WiFi');
            }}
            className={`py-2 px-2.5 rounded border text-[10px] font-mono font-bold tracking-widest uppercase cursor-pointer flex items-center justify-center space-x-1.5 transition-all ${
              status.cellularMode === 'WiFi'
                ? 'border-purple-500 text-purple-400 bg-purple-950/20 font-black shadow-[0_0_8px_rgba(168,85,247,0.2)]'
                : 'border-zinc-800 text-zinc-500 bg-black hover:border-zinc-700 hover:text-zinc-300'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>REALME WI-FI 6E</span>
          </button>
        </div>
      </div>

      {/* Diagnostic Signal Latency Tester Node */}
      <div className="bg-zinc-950 border border-zinc-900 p-3.5 rounded space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">PACKET TRANSMISSION TELEMETRY</span>
          <button
            onClick={startPingDiagnostic}
            disabled={testingPing}
            className="text-[9px] font-mono font-bold text-red-500 hover:text-red-400 flex items-center space-x-1 uppercase cursor-pointer"
          >
            <Activity className={`w-3.5 h-3.5 ${testingPing ? 'animate-pulse' : ''}`} />
            <span>{testingPing ? 'PINGING...' : 'RUN PING TEST'}</span>
          </button>
        </div>

        {testResults ? (
          <div className="space-y-1.5 pt-1">
            {testResults.map((res) => (
              <div key={res.node} className="flex justify-between items-center font-mono text-[9px] p-2 bg-black border border-zinc-900 rounded">
                <span className="text-zinc-400 font-medium">{res.node}</span>
                <div className="flex space-x-3">
                  <span className="text-emerald-400 font-bold">LATENCY: {res.delay}ms</span>
                  <span className={res.loss > 0 ? 'text-red-500 font-bold' : 'text-zinc-650'}>LOSS: {res.loss}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[9px] font-mono text-zinc-500 uppercase text-center py-2.5">
            Click Run Ping Test to measure transmission signals delays
          </p>
        )}
      </div>
    </div>
  );
}
