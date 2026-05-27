import React, { useState } from 'react';
import { Shield, Key, Eye, EyeOff, Radio, Terminal as TerminalIcon } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('suhanshaikh78957@gmail.com');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<'none' | 'email' | 'password'>('none');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setErrorStatus(null);
    
    // Play industrial sound effect via speech synthesis or beep simulation
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // Audio not supported or blocked
    }

    setTimeout(() => {
      setIsAuthenticating(false);
      onLoginSuccess('SUHAN');
    }, 1200);
  };

  const handleFingerprintScan = () => {
    setIsAuthenticating(true);
    // Beep sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch { }

    setTimeout(() => {
      setIsAuthenticating(false);
      onLoginSuccess('SUHAN');
    }, 1000);
  };

  return (
    <div className="relative min-h-full flex flex-col justify-center items-center bg-black px-4 py-8 overflow-hidden select-none select-none">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-40"></div>
      
      {/* Absolute hazard indicator lines */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-repeating-linear bg-[linear-gradient(45deg,#FF0033_25%,#000_25%,#000_50%,#FF0033_50%,#FF0033_75%,#000_75%,#000)] bg-[size:20px_20px] opacity-80"></div>
      
      {/* Immersive animated sparks / back glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-950/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Login Frame */}
      <div className={`relative w-full max-w-sm transition-all duration-500 rounded-lg p-6 bg-black/85 border backdrop-blur-xl ${
        isFocused === 'email' 
          ? 'border-cyan-500/80 shadow-[0_0_25px_rgba(0,191,255,0.35)]' 
          : isFocused === 'password'
          ? 'border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.35)]'
          : 'border-red-600/50 shadow-[0_0_20px_rgba(255,0,51,0.2)]'
      }`}>
        
        {/* Lock Screen Sub-header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse-red rounded-full" />
            <span className="text-[10px] font-mono tracking-widest text-red-500 font-bold uppercase">SECURE LINK ESTABLISHED</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">HELL_OS v3.0</span>
        </div>

        {/* Corporate / Studio Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-zinc-950 neon-border-red mb-3">
            <Shield className="w-8 h-8 text-red-500 animate-flicker" />
          </div>
          <h1 className="text-sm font-display font-black tracking-widest text-zinc-100 uppercase mb-1">
            SS ENGINEERING
          </h1>
          <p className="text-[11px] font-mono tracking-widest text-red-500/80 uppercase">
            ACCESS CONTROL UNIT
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase flex items-center space-x-1">
              <span>ADMIN PRIVILEGE EMAIL</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                className="w-full text-sm font-mono bg-zinc-950/90 text-zinc-100 placeholder-zinc-700 px-3 py-2.5 rounded border border-zinc-800 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all tracking-wide"
                placeholder="suhan@ssengineering.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused('none')}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500 opacity-60">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              </span>
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase flex items-center justify-between">
              <span>CRYPTOGRAPHIC KEYS SEQUENCE</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full text-sm font-mono bg-zinc-950/90 text-zinc-100 placeholder-zinc-700 px-3 py-2.5 rounded border border-zinc-800 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all tracking-wide"
                placeholder="PASSWORD CODE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused('none')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full mt-4 bg-zinc-950 hover:bg-zinc-900 border border-red-500 text-neon-red py-3 rounded text-xs font-display font-extrabold tracking-widest shadow-[0_0_15px_rgba(255,0,51,0.2)] hover:shadow-[0_0_25px_rgba(255,0,51,0.5)] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            {isAuthenticating ? (
              <>
                <div className="w-4.5 h-4.5 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></div>
                <span>DECRYPTING HELL_OS SECURITY...</span>
              </>
            ) : (
              <>
                <TerminalIcon className="w-4 h-4 text-red-500 animate-pulse" />
                <span>INITIALIZE CONSOLE SYSTEM</span>
              </>
            )}
          </button>
        </form>

        {/* Biometrics Override Button */}
        <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-col items-center">
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-3">REALME GT CLEARWAY SCANNER</span>
          <button
            onClick={handleFingerprintScan}
            disabled={isAuthenticating}
            className="w-16 h-16 rounded-full bg-zinc-950 border border-cyan-500/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:neon-border-blue hover:scale-105 active:scale-95 group"
          >
            <div className="relative w-10 h-10 rounded-full bg-cyan-950/20 border border-cyan-700/50 flex items-center justify-center group-hover:border-cyan-500">
              <span className="absolute inset-0 bg-cyan-400/10 rounded-full animate-ping opacity-60"></span>
              {/* Custom high-tech glowing fingerprint graphic symbol */}
              <svg className="w-6 h-6 text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0-1.125-.45-2.125-1.125-2.875M16.5 12c0-2.485-2.015-4.5-4.5-4.5S7.5 9.515 7.5 12m11.25 0c0-3.728-3.022-6.75-6.75-6.75S5.25 8.272 5.25 12m13.5 0A9 9 0 113 12" />
              </svg>
            </div>
          </button>
          <span className="text-[8px] font-mono text-cyan-500 tracking-wider mt-2 animate-pulse uppercase">BIOMETRIC ENGAGEMENT BYPASS</span>
        </div>
      </div>

      {/* Corporate disclaimer statement */}
      <div className="mt-8 text-center max-w-xs px-4">
        <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider leading-relaxed">
          AUTHORIZED FOR COMMANDER SUHAN ONLY. CRITICAL GAME ENGINE SYNCHRONIZATION ESTABLISHED VIA CLOUD RE-ROUTING.
        </p>
      </div>
    </div>
  );
}
