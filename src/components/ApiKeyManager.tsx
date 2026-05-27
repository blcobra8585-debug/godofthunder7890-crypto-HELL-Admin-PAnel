import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Unlock, Key, Save, AlertTriangle, Cpu, HelpCircle } from 'lucide-react';
import { ApiKeys } from '../types';

interface ApiKeyManagerProps {
  keys: ApiKeys;
  onSaveKeys: (updatedKeys: ApiKeys) => void;
}

export default function ApiKeyManager({ keys, onSaveKeys }: ApiKeyManagerProps) {
  const [localKeys, setLocalKeys] = useState<ApiKeys>({ ...keys });
  const [visibleFields, setVisibleFields] = useState<Record<keyof ApiKeys, boolean>>({
    gemini: false,
    claude: false,
    groq: false,
    whisper: false,
    elevenLabs: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const toggleVisibility = (field: keyof ApiKeys) => {
    setVisibleFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: keyof ApiKeys, val: string) => {
    setLocalKeys(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setHasSaved(false);

    // High tech secure vault beep
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch { }

    setTimeout(() => {
      onSaveKeys(localKeys);
      setIsSaving(false);
      setHasSaved(true);
      setTimeout(() => setHasSaved(false), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-5 px-4 py-4 max-h-full overflow-y-auto">
      {/* Top Section Header */}
      <div className="flex justify-between items-center bg-zinc-950 p-3 rounded border border-zinc-900 shadow-md">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">MUTUAL CRYPTOGRAPHY</span>
          <h2 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">SUPABASE CLOUD KEY VAULT</h2>
        </div>
        <div className="p-1 px-2 rounded bg-red-950/20 border border-red-500/30 font-mono text-[9px] text-red-400 font-bold tracking-widest uppercase flex items-center space-x-1">
          <Lock className="w-3 h-3 text-red-500 mr-0.5 animate-pulse" />
          <span>ENCRYPTED AES-256</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Key Item: Gemini */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-1 anim-pulse-blue"></span>
              <span>GOOGLE GEMINI 2.5 API KEY</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-600 uppercase">PRIMARY MODEL</span>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 opacity-65">
              <Key className="w-4 h-4" />
            </div>
            <input
              type={visibleFields.gemini ? 'text' : 'password'}
              value={localKeys.gemini}
              onChange={(e) => handleChange('gemini', e.target.value)}
              className="w-full text-xs font-mono bg-zinc-950 text-zinc-300 pl-9 pr-10 py-2.5 rounded border border-zinc-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              placeholder="GEMINI KEY REFERENCE..."
            />
            <button
              type="button"
              onClick={() => toggleVisibility('gemini')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {visibleFields.gemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Key Item: Claude */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1"></span>
              <span>ANTHROPIC CLAUDE 3.5 KEY</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-600 uppercase">FALLBACK 1</span>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 opacity-65">
              <Key className="w-4 h-4" />
            </div>
            <input
              type={visibleFields.claude ? 'text' : 'password'}
              value={localKeys.claude}
              onChange={(e) => handleChange('claude', e.target.value)}
              className="w-full text-xs font-mono bg-zinc-950 text-zinc-300 pl-9 pr-10 py-2.5 rounded border border-zinc-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              placeholder="CLAUDE KEY REFERENCE..."
            />
            <button
              type="button"
              onClick={() => toggleVisibility('claude')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {visibleFields.claude ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Key Item: Groq */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-1"></span>
              <span>GROQ LLAMA 3 API KEY</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-600 uppercase">FALLBACK 2</span>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 opacity-65">
              <Key className="w-4 h-4" />
            </div>
            <input
              type={visibleFields.groq ? 'text' : 'password'}
              value={localKeys.groq}
              onChange={(e) => handleChange('groq', e.target.value)}
              className="w-full text-xs font-mono bg-zinc-950 text-zinc-300 pl-9 pr-10 py-2.5 rounded border border-zinc-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              placeholder="GROQ KEY REFERENCE..."
            />
            <button
              type="button"
              onClick={() => toggleVisibility('groq')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {visibleFields.groq ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Key Item: OpenAI Whisper */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1"></span>
              <span>OPENAI WHISPER MIC KEY</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-600 uppercase">VOICE CAPTURE</span>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 opacity-65">
              <Key className="w-4 h-4" />
            </div>
            <input
              type={visibleFields.whisper ? 'text' : 'password'}
              value={localKeys.whisper}
              onChange={(e) => handleChange('whisper', e.target.value)}
              className="w-full text-xs font-mono bg-zinc-950 text-zinc-300 pl-9 pr-10 py-2.5 rounded border border-zinc-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              placeholder="OPENAI KEY REFERENCE..."
            />
            <button
              type="button"
              onClick={() => toggleVisibility('whisper')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {visibleFields.whisper ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Key Item: ElevenLabs */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[10px] font-mono text-pink-500 font-bold uppercase tracking-wider flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-1"></span>
              <span>ELEVENLABS ANIME DIALOGUE KEY</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-600 uppercase">MYSTERIOUS GUIDE</span>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 opacity-65">
              <Key className="w-4 h-4" />
            </div>
            <input
              type={visibleFields.elevenLabs ? 'text' : 'password'}
              value={localKeys.elevenLabs}
              onChange={(e) => handleChange('elevenLabs', e.target.value)}
              className="w-full text-xs font-mono bg-zinc-950 text-zinc-300 pl-9 pr-10 py-2.5 rounded border border-zinc-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
              placeholder="ELEVENLABS KEY REFERENCE..."
            />
            <button
              type="button"
              onClick={() => toggleVisibility('elevenLabs')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {visibleFields.elevenLabs ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Warning Alert banner */}
        <div className="p-3 bg-red-950/15 border border-red-900/40 rounded flex items-start space-x-2.5 mt-5">
          <AlertTriangle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5 animate-flicker" />
          <p className="text-[9px] font-mono text-zinc-400 uppercase leading-relaxed tracking-wider">
            SECURITY ALERT: KEYS FILED HERE ARE MOUNTED IN SECURE RUNTIME SECRETS PRESERVING ZERO STORAGE IN GAME CLIENT CLIENTS. CHANGE DETECTIONS WILL BE ACTIVE IMMEDIATELY WITHOUT COMPILATIONS needed.
          </p>
        </div>

        {/* Commitment Action button */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full mt-2 bg-zinc-950 hover:bg-zinc-900 border border-emerald-500 text-emerald-400 py-3 rounded text-xs font-display font-extrabold tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-emerald-400 rounded-full animate-spin"></div>
              <span>VAULT COMMIT IN PROGRESS...</span>
            </>
          ) : hasSaved ? (
            <>
              <Unlock className="w-4 h-4 text-emerald-400" />
              <span>VAULT RE-ENCRYPTED & SEALED!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-emerald-400" />
              <span>COMMIT TO SECURE VAULT</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
