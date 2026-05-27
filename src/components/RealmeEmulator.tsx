import React from 'react';
import { Wifi, Battery, ShieldAlert, Key, Terminal as TerminalIcon, BarChart2, Radio, Smartphone, Activity, KeySquare, Home, GitBranch, Database, Shield, Sliders, Play, Settings, Flame } from 'lucide-react';
import { SystemConfig, SystemStatus, ApiKeys, StoryPush as StoryPushType, PlayerMetric, RailwayDev, GitHubRepo, SupabaseTable } from '../types';
import LoginScreen from './LoginScreen';
import OverviewDashboard from './OverviewDashboard';
import ApiKeyManager from './ApiKeyManager';
import StoryPush from './StoryPush';
import AdvancedAnalytics from './AdvancedAnalytics';
import RailwayControl from './RailwayControl';
import GitHubManager from './GitHubManager';
import SupabaseManager from './SupabaseManager';
import NetworkManager from './NetworkManager';
import SettingsScreen from './SettingsScreen';
import HellProtocol from './HellProtocol';

interface RealmeEmulatorProps {
  isAuthenticated: boolean;
  onLogin: (username: string) => void;
  onLogout: () => void;
  activeScreen: 'hub' | 'overview' | 'apiKeys' | 'railway' | 'github' | 'supabase' | 'storyPush' | 'network' | 'analytics' | 'settings' | 'hellProtocol';
  setActiveScreen: (screen: 'hub' | 'overview' | 'apiKeys' | 'railway' | 'github' | 'supabase' | 'storyPush' | 'network' | 'analytics' | 'settings' | 'hellProtocol') => void;
  config: SystemConfig;
  updateConfig: (updater: Partial<SystemConfig>) => void;
  status: SystemStatus;
  onRefreshStatus: () => void;
  keys: ApiKeys;
  onSaveKeys: (updatedKeys: ApiKeys) => void;
  history: StoryPushType[];
  onAddPush: (newPush: Omit<StoryPushType, 'id' | 'created_at' | 'active'>) => void;
  metrics: PlayerMetric[];
  railway: RailwayDev;
  onUpdateEnv: (key: string, value: string) => void;
  onAddEnv: (key: string, value: string) => void;
  onDeploy: () => void;
  github: GitHubRepo;
  onCommitPush: (msg: string) => void;
  onPull: () => void;
  supabaseTables: SupabaseTable[];
  onExecuteSql: (query: string) => void;
  onToggleOffline: (offline: boolean) => void;
  onToggleCellular: (type: '5G' | 'WiFi') => void;
}

export default function RealmeEmulator({
  isAuthenticated,
  onLogin,
  onLogout,
  activeScreen,
  setActiveScreen,
  config,
  updateConfig,
  status,
  onRefreshStatus,
  keys,
  onSaveKeys,
  history,
  onAddPush,
  metrics,
  railway,
  onUpdateEnv,
  onAddEnv,
  onDeploy,
  github,
  onCommitPush,
  onPull,
  supabaseTables,
  onExecuteSql,
  onToggleOffline,
  onToggleCellular
}: RealmeEmulatorProps) {

  const triggerBeep = (freq: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch {}
  };

  const handleAppLaunch = (screen: 'hub' | 'overview' | 'apiKeys' | 'railway' | 'github' | 'supabase' | 'storyPush' | 'network' | 'analytics' | 'settings' | 'hellProtocol') => {
    triggerBeep(380);
    setActiveScreen(screen);
  };

  return (
    <div className="relative mx-auto flex flex-col items-center select-none" style={{ width: '360px', height: '760px' }}>
      
      {/* Dynamic light refraction reflection overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[44px] pointer-events-none z-40 opacity-40 mix-blend-overlay"></div>
      
      {/* Outer Phone Bezel modeling with neon laser-red side-glowing borders */}
      <div className="absolute inset-0 rounded-[44px] bg-black border-4 border-zinc-900 pointer-events-none z-30 shadow-[0_0_35px_rgba(255,0,51,0.25)] ring-1 ring-zinc-800"></div>
      
      {/* Screen container: Force 19.5:9 aspect ratio standard of realme GT 6T */}
      <div className="absolute inset-[8px] bg-black rounded-[38px] overflow-hidden flex flex-col z-20">
        
        {/* Top Status Bar Grid Area */}
        <div className="h-9 px-6 bg-black flex justify-between items-center z-40 relative shrink-0">
          {/* Punch-hole camera simulator */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80"></div>
          </div>

          {/* Leftside Status Bar Indicators */}
          <span className="text-[10px] font-mono text-zinc-400 font-bold tracking-wider">23:17 UTC</span>
          
          {/* Rightside Status Bar Indicators */}
          <div className="flex items-center space-x-1.5 text-zinc-400">
            <span className="text-[8px] font-mono font-bold tracking-tight bg-zinc-900 px-1 py-0.2 rounded text-cyan-400 border border-cyan-500/20">
              {status.cellularMode || '5G'}
            </span>
            <Wifi className="w-3.5 h-3.5 text-zinc-400" />
            <div className="flex items-center space-x-0.5">
              <span className="text-[8px] font-mono">100%</span>
              <Battery className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            </div>
          </div>
        </div>

        {/* Dynamic Warning Notification Banner of security level inside the OS */}
        <div className="bg-repeating-linear bg-[linear-gradient(45deg,#FF0033_10%,#000_10%,#000_20%,#FF0033_20%,#FF0033_30%,#000_30%,#000)] h-1 w-full shrink-0"></div>

        {/* Main Display screen viewport */}
        <div className="flex-1 min-h-0 bg-black relative flex flex-col">
          {!isAuthenticated ? (
            <LoginScreen onLoginSuccess={onLogin} />
          ) : (
            <>
              {/* Authenticated header app bar with logo & quick logout */}
              <div className="h-12 bg-zinc-950/90 border-b border-zinc-900/60 px-4 shrink-0 flex items-center justify-between">
                <button
                  onClick={() => handleAppLaunch('hub')}
                  className="flex items-center space-x-2 text-left cursor-pointer active:scale-95 transition-all"
                >
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
                  <div>
                    <h1 className="text-[10px] font-display font-extrabold tracking-widest text-zinc-150 uppercase">HELL SUITE</h1>
                    <span className="text-[8px] font-mono text-cyan-400 block -mt-0.5">
                      {activeScreen === 'hub' ? 'APP DRAWER HOME' : `RUNNING: ${activeScreen.toUpperCase()}`}
                    </span>
                  </div>
                </button>
                
                {/* Admin Switch Mode button / simulated Logoff */}
                <div className="flex items-center space-x-1.5">
                  {activeScreen !== 'hub' && (
                    <button
                      onClick={() => handleAppLaunch('hub')}
                      className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-300 font-mono font-bold uppercase rounded cursor-pointer hover:border-zinc-700"
                    >
                      MENU
                    </button>
                  )}
                  <button
                    onClick={onLogout}
                    className="px-2 py-1 bg-red-950/10 border border-red-950 hover:border-red-500/50 text-[8px] text-red-500 font-mono font-bold uppercase rounded cursor-pointer transition-colors active:scale-95 shadow-sm"
                  >
                    DE-AUTH
                  </button>
                </div>
              </div>

              {/* Subcontent screens container based on active bottom selection tab */}
              <div className="flex-1 min-h-0 relative select-none">
                {activeScreen === 'hub' && (
                  <div className="absolute inset-0 px-4.5 py-4 overflow-y-auto space-y-4">
                    {/* Device Widget Block */}
                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-900 relative shadow-inner overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-950/10 rounded-full blur-xl"></div>
                      <span className="text-[8px] font-mono text-zinc-550 uppercase block font-bold tracking-widest">REALME ENGINE AGENT</span>
                      <h4 className="text-sm font-display font-black text-red-550 mt-1 uppercase tracking-wider">GAME SUITE ACTIVE</h4>
                      <p className="text-[8.5px] font-mono text-zinc-400 mt-1 leading-normal uppercase">
                        TAP ANY CRYPTOGRAPHIC ICON TO ACCESS DECLASSIFIED BACKGROUND TOOLS
                      </p>
                    </div>

                    {/* HELL PROTOCOL FLAGSHIP ACCESS WIDGET */}
                    <button
                      onClick={() => handleAppLaunch('hellProtocol')}
                      className="w-full relative group overflow-hidden rounded-lg p-3 bg-black border border-red-500 hover:border-red-400 transition-all active:scale-[0.98] cursor-pointer shadow-[0_0_12px_rgba(255,0,51,0.25)] flex items-center justify-between"
                    >
                      {/* Pulsing grid accent */}
                      <div className="absolute inset-0 bg-red-950/5 group-hover:bg-red-950/10 transition-colors"></div>
                      <div className="flex items-center space-x-3.5 relative z-10 text-left">
                        <div className="p-2 rounded bg-red-950/30 text-red-500 border border-red-500/20 group-hover:shadow-[0_0_8px_#FF0033] transition-all">
                          <Flame className="w-5 h-5 animate-pulse" />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[9px] font-mono font-bold text-red-500 tracking-widest uppercase animate-pulse">
                              FLAGSHIP SHELL
                            </span>
                          </div>
                          <h4 className="text-xs font-black text-zinc-100 uppercase tracking-widest font-mono">
                            HELL PROTOCOL RED-TEAM
                          </h4>
                          <span className="text-[8px] font-mono text-zinc-500 block leading-none mt-0.5">
                            SCADA OVERRIDES & PENETRATION RADAR
                          </span>
                        </div>
                      </div>
                      <div className="text-red-500 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform relative z-10">
                        LAUNCH »
                      </div>
                    </button>

                    {/* Glowing App Tiles Grid */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1.5">
                      {/* Tile 1: Overview */}
                      <button
                        onClick={() => handleAppLaunch('overview')}
                        className={`flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border ${(activeScreen as string) === 'overview' ? 'border-red-500 bg-red-950/10' : 'border-zinc-900'} rounded-lg hover:border-red-500 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md`}
                      >
                        <div className="p-2 rounded bg-red-950/20 text-red-500 self-center">
                          <Activity className="w-5 h-5 animate-pulse" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">DASHBOARD</span>
                      </button>

                      {/* Tile 2: Api Vault */}
                      <button
                        onClick={() => handleAppLaunch('apiKeys')}
                        className="flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border border-zinc-900 rounded-lg hover:border-cyan-500 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md"
                      >
                        <div className="p-2 rounded bg-cyan-950/20 text-cyan-400 self-center">
                          <KeySquare className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">API VAULT</span>
                      </button>

                      {/* Tile 3: Railway */}
                      <button
                        onClick={() => handleAppLaunch('railway')}
                        className="flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border border-zinc-900 rounded-lg hover:border-purple-500 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md"
                      >
                        <div className="p-2 rounded bg-purple-950/20 text-purple-400 self-center">
                          <Database className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">RAILWAY</span>
                      </button>

                      {/* Tile 4: GitHub */}
                      <button
                        onClick={() => handleAppLaunch('github')}
                        className="flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border border-zinc-900 rounded-lg hover:border-zinc-400 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md"
                      >
                        <div className="p-2 rounded bg-zinc-900 text-zinc-300 self-center">
                          <GitBranch className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">GITHUB</span>
                      </button>

                      {/* Tile 5: Supabase */}
                      <button
                        onClick={() => handleAppLaunch('supabase')}
                        className="flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border border-zinc-900 rounded-lg hover:border-emerald-500 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md"
                      >
                        <div className="p-2 rounded bg-emerald-950/20 text-emerald-450 self-center">
                          <Shield className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">SUPABASE</span>
                      </button>

                      {/* Tile 6: Story seeds */}
                      <button
                        onClick={() => handleAppLaunch('storyPush')}
                        className="flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border border-zinc-900 rounded-lg hover:border-orange-500 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md"
                      >
                        <div className="p-2 rounded bg-amber-950/20 text-amber-550 self-center">
                          <TerminalIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">STORY PUSH</span>
                      </button>

                      {/* Tile 7: Network */}
                      <button
                        onClick={() => handleAppLaunch('network')}
                        className="flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border border-zinc-900 rounded-lg hover:border-cyan-400 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md"
                      >
                        <div className="p-2 rounded bg-cyan-950/20 text-cyan-400 self-center">
                          <Sliders className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">NETWORK</span>
                      </button>

                      {/* Tile 8: Analytics */}
                      <button
                        onClick={() => handleAppLaunch('analytics')}
                        className="flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border border-zinc-900 rounded-lg hover:border-amber-400 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md"
                      >
                        <div className="p-2 rounded bg-amber-950/20 text-amber-400 self-center">
                          <BarChart2 className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">ANALYTICS</span>
                      </button>

                      {/* Tile 9: Settings */}
                      <button
                        onClick={() => handleAppLaunch('settings')}
                        className="flex flex-col items-center justify-center p-2.5 bg-zinc-950/95 border border-zinc-900 rounded-lg hover:border-zinc-500 cursor-pointer active:scale-95 transition-all text-center space-y-1.5 shadow-md"
                      >
                        <div className="p-2 rounded bg-zinc-900 text-zinc-400 self-center">
                          <Settings className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-zinc-350 uppercase tracking-tight block">SETTINGS</span>
                      </button>
                    </div>

                    {/* Developer Credit banner box inside the App launcher */}
                    <div className="p-2 border border-zinc-900/40 rounded bg-black/60 text-center">
                      <span className="text-[8px] font-mono text-zinc-650 tracking-wider block uppercase">SS ENGINEERING DEVIATION TEAM</span>
                    </div>
                  </div>
                )}
                {activeScreen === 'overview' && (
                  <OverviewDashboard
                    status={status}
                    config={config}
                    updateConfig={updateConfig}
                    onRefresh={onRefreshStatus}
                  />
                )}
                {activeScreen === 'apiKeys' && (
                  <ApiKeyManager
                    keys={keys}
                    onSaveKeys={onSaveKeys}
                  />
                )}
                {activeScreen === 'railway' && (
                  <RailwayControl
                    railway={railway}
                    onUpdateEnv={onUpdateEnv}
                    onAddEnv={onAddEnv}
                    onDeploy={onDeploy}
                  />
                )}
                {activeScreen === 'github' && (
                  <GitHubManager
                    repo={github}
                    onCommitPush={onCommitPush}
                    onPull={onPull}
                  />
                )}
                {activeScreen === 'supabase' && (
                  <SupabaseManager
                    tables={supabaseTables}
                    onExecuteSql={onExecuteSql}
                  />
                )}
                {activeScreen === 'storyPush' && (
                  <StoryPush
                    history={history}
                    onAddPush={onAddPush}
                  />
                )}
                {activeScreen === 'network' && (
                  <NetworkManager
                    status={status}
                    onToggleOffline={onToggleOffline}
                    onToggleCellular={onToggleCellular}
                  />
                )}
                {activeScreen === 'analytics' && (
                  <AdvancedAnalytics
                    metrics={metrics}
                    config={config}
                    updateConfig={updateConfig}
                  />
                )}
                {activeScreen === 'settings' && (
                  <SettingsScreen
                    config={config}
                    onUpdateConfig={updateConfig}
                    onLogout={onLogout}
                  />
                )}
                {activeScreen === 'hellProtocol' && (
                  <HellProtocol />
                )}
              </div>

              {/* Virtual Android 3-Button Navigation Dock on Realme GT 6T UI */}
              <div className="h-11 bg-zinc-950 border-t border-zinc-930 shrink-0 flex items-center justify-around px-8 z-30">
                {/* 1. Back button (Triangular indicator) */}
                <button
                  onClick={() => {
                    triggerBeep(300);
                    if (activeScreen !== 'hub') {
                      setActiveScreen('hub');
                    } else {
                      onLogout();
                    }
                  }}
                  className="flex items-center justify-center p-2 text-zinc-500 hover:text-zinc-300 active:scale-90 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 transform -rotate-90 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 2. Home button (Circle gesture index) */}
                <button
                  onClick={() => {
                    triggerBeep(340);
                    setActiveScreen('hub');
                  }}
                  className={`flex items-center justify-center p-2 rounded-full border transition-all cursor-pointer ${
                    activeScreen === 'hub' ? 'border-red-500 text-red-500 bg-red-950/10' : 'border-zinc-700 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Home className="w-4.5 h-4.5" />
                </button>

                {/* 3. System App overview tab (Square indicator) */}
                <button
                  onClick={() => {
                    triggerBeep(320);
                    // Quick modal / alert of running tasks counts
                    alert("System Task Manager: 10 APK micro modules stored in direct system buffer cache memory.");
                  }}
                  className="flex items-center justify-center p-2 text-zinc-500 hover:text-zinc-300 active:scale-90 transition-all cursor-pointer"
                >
                  <div className="w-3.5 h-3.5 border-2 border-zinc-500 rounded-sm"></div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom Virtual Android gesture bar representing Realme GT 6T UI */}
        <div className="h-5 bg-black w-full flex items-center justify-center pb-2 z-40 shrink-0">
          <div className="w-24 h-1 rounded-full bg-zinc-750"></div>
        </div>
      </div>
    </div>
  );
}

