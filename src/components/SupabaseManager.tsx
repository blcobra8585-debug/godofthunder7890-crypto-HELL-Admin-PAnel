import React, { useState } from 'react';
import { Database, Terminal as TermIcon, Play, RefreshCw, Layers, Zap, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { SupabaseTable } from '../types';

interface SupabaseManagerProps {
  tables: SupabaseTable[];
  onExecuteSql: (query: string) => void;
}

export default function SupabaseManager({ tables, onExecuteSql }: SupabaseManagerProps) {
  const [sqlQuery, setSqlQuery] = useState(`SELECT * FROM level_configs WHERE horror_intensity > 80;`);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryLogs, setQueryLogs] = useState<string[]>([]);
  const [queryResult, setQueryResult] = useState<any[] | null>(null);

  const handleQueryRun = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sqlQuery.trim()) return;

    setIsExecuting(true);
    setQueryLogs([
      `>> CONNECTING TO SUPABASE CLOUD (SINGAPORE)...`,
      `>> OK: SECURE CLIENT ESTABLISHED`,
      `>> EXECUTING SQL TRANSACTION SEQUENCE...`
    ]);

    // High tech db ping beep sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, audioCtx.currentTime);
      osc.frequency.setValueAtTime(650, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {}

    setTimeout(() => {
      onExecuteSql(sqlQuery);
      setIsExecuting(false);
      setQueryLogs(prev => [
        ...prev,
        `>> OK: TRANSACTION EXECUTED (SUCCESSFUL ROWS: 2)`,
        `>> HELL_DATABASE SCHEMA SYNCHRONIZED ACROSS GAME SERVERS!`
      ]);

      // Mock level queries results based on common schema attributes
      if (sqlQuery.toLowerCase().includes('configs')) {
        setQueryResult([
          { level_number: 4, title: "SECTOR D BLACKOUT COILS", horror_intensity: 85, zombie_count: 24, weather: "RAIN" },
          { level_number: 5, title: "SS CRANE CRUSH CHAMBERS", horror_intensity: 95, zombie_count: 32, weather: "THUNDER" }
        ]);
      } else if (sqlQuery.toLowerCase().includes('keys')) {
        setQueryResult([
          { id: '1', active_ai: 'gemini', amoled_120hz_optimized: true, active_keys_count: 5 }
        ]);
      } else {
        setQueryResult([
          { status: "SUCCESS", records_affected: 2, execution_time_ms: 18 }
        ]);
      }
    }, 1500);
  };

  return (
    <div className="space-y-4 px-4 py-4 max-h-full overflow-y-auto">
      {/* Header Panel */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">POSTGRES CORE</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">SUPABASE ENGINE MANAGER</h2>
        </div>
        <div className="flex items-center space-x-1.5 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded animate-pulse-green">
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">DB SECURED</span>
        </div>
      </div>

      {/* Database Schema Tables Grid */}
      <div className="space-y-1.5">
        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">DATABASE TABLES SCHEMAS OVERVIEW</label>
        <div className="grid grid-cols-2 gap-2">
          {tables.map((tbl) => (
            <div key={tbl.name} className="p-2.5 bg-zinc-950 border border-zinc-900 rounded">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono font-bold text-zinc-350 bg-zinc-900 px-1 py-0.2 rounded border border-zinc-850 uppercase">{tbl.name}</span>
                <span className="text-[8px] font-mono text-cyan-400 font-bold">{tbl.rowsCount} ROWS</span>
              </div>
              <p className="text-[8px] font-mono text-zinc-500 mt-2 leading-relaxed uppercase">
                COLS: {tbl.columnsList.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SQL Query Editor Console Terminal */}
      <form onSubmit={handleQueryRun} className="bg-black border border-zinc-900 p-3.5 rounded relative space-y-3.5">
        <span className="absolute -top-2 left-4 px-2 bg-black border border-zinc-850 text-[8px] font-mono text-cyan-400 tracking-widest font-extrabold uppercase">
          SQL TRANSACTION INTERPRETER
        </span>

        <p className="text-[9.5px] font-mono text-zinc-400 pt-1 leading-normal uppercase">
          Enter direct query sequence to perform safe migrations:
        </p>

        <div className="relative border border-zinc-900 rounded bg-black/95 font-mono text-[9px] p-2 overflow-hidden shadow-inner flex leading-relaxed">
          <div className="text-zinc-650 pr-2 border-r border-zinc-900 select-none text-right">
            01<br />02
          </div>
          <textarea
            rows={2}
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            className="w-full bg-transparent text-emerald-400 pl-3 leading-relaxed focus:outline-none focus:ring-0 resize-none font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={isExecuting}
          className={`w-full py-2.5 rounded border font-display font-black tracking-widest text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            isExecuting
              ? 'border-emerald-500/50 text-emerald-400 bg-emerald-950/10'
              : 'border-red-500 text-neon-red bg-zinc-950 hover:bg-zinc-900 shadow-[0_0_10px_rgba(255,0,51,0.15)] hover:shadow-[0_0_15px_rgba(255,0,51,0.4)]'
          }`}
        >
          <Play className="w-3.5 h-3.5 animate-pulse" />
          <span>{isExecuting ? 'EXECUTING TRANSACTION QUERY...' : 'RUN TRANSACTION SQL COMMAND'}</span>
        </button>
      </form>

      {/* Logs Console */}
      {queryLogs.length > 0 && (
        <div className="bg-black border border-emerald-950 p-2.5 rounded font-mono text-[9px] text-emerald-400 space-y-1 max-h-32 overflow-y-auto animate-flicker shadow-inner">
          <p className="text-zinc-600 border-b border-zinc-900 pb-1 mb-1 font-bold">SQL CONSOLE STAGE LOGS</p>
          {queryLogs.map((log, index) => (
            <p key={index} className="leading-snug">{log}</p>
          ))}
        </div>
      )}

      {/* DB Records Schema Response Block */}
      {queryResult && (
        <div className="bg-zinc-950 border border-zinc-900 p-3 rounded font-mono text-[9px] text-zinc-300 space-y-2">
          <span className="text-[8px] font-mono text-cyan-400 font-bold block uppercase tracking-wider">LATEST SQL RESPONSE SCHEMAS</span>
          <div className="bg-black p-2 rounded overflow-x-auto">
            <pre className="text-[8.5px] text-zinc-400 leading-normal font-mono font-medium">
              {JSON.stringify(queryResult, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
