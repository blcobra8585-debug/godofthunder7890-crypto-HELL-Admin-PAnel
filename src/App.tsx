/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import RealmeEmulator from './components/RealmeEmulator';
import { SystemConfig, SystemStatus, ApiKeys, StoryPush as StoryPushType, PlayerMetric, RailwayDev, GitHubRepo, SupabaseTable } from './types';
import { Smartphone, Terminal as TerminalIcon, ShieldAlert, Cpu } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'hub' | 'overview' | 'apiKeys' | 'railway' | 'github' | 'supabase' | 'storyPush' | 'network' | 'analytics' | 'settings' | 'hellProtocol'>('hub');

  // Interactive Game configurations
  const [config, setConfig] = useState<SystemConfig>({
    micZombieDetection: true,
    ghostTrace: false,
    weatherAi: true,
    maxAmmo: 12,
    hapticFeedback: true,
    activeAi: 'gemini',
    amoledHighHz: true,
    hdrRenderEngine: true
  });

  const [status, setStatus] = useState<SystemStatus>({
    flaskStatus: 'online',
    supabaseStatus: 'online',
    geminiLatency: 120,
    claudeLatency: 145,
    groqLatency: 89,
    networkMode: 'online',
    cellularMode: '5G'
  });

  const [railway, setRailway] = useState<RailwayDev>({
    envVars: {
      PORT: "3000",
      DATABASE_URL: "postgresql://suhan_postgres:HELL52_SECURE_PASS@supabase.sg-1.db.supabase.co:5432/hell",
      DEBUG: "true",
      GHOST_ZOMBIE_TRACE: "true"
    },
    deployments: [
      { id: "dep_9105", status: "success", timestamp: "5 MINS AGO", commit: "patch: optimization for amoled 120hz scaling" },
      { id: "dep_8891", status: "success", timestamp: "3 HOURS AGO", commit: "feat: add secure credential locks system" }
    ],
    logs: [
      "[SYSTEM] BOOTED SG-01 MIDDLEWARE CLUSTER SUCCESSFUL",
      "[REBOOT] CONTAINER RE-ROUTED PORT BINDINGS TO 3000",
      "[DB] CONNECTED SECURE COILS PROTOCOLS ASYNC",
      "[ZOMBIES] TELEMETRY DISPATCH THREAD ACTIVE"
    ]
  });

  const [github, setGithub] = useState<GitHubRepo>({
    branch: "main",
    repoName: "hell-game-app-apk",
    commits: [
      { sha: "d4e83f2", message: "patch: optimize 120hz frame rendering loops", author: "suhanshaikh78957@gmail.com", time: "10 MINS AGO" },
      { sha: "8e30b1c", message: "feat: secure lockscreen credentials biometric checks", author: "suhanshaikh78957@gmail.com", time: "3 HOURS AGO" },
      { sha: "bc4102d", message: "initial commit: build cyberpunk industrial portal UI", author: "suhanshaikh78957@gmail.com", time: "1 DAY AGO" }
    ]
  });

  const [supabaseTables] = useState<SupabaseTable[]>([
    { name: "api_keys", rowsCount: 1, columnsList: ["gemini", "claude", "groq", "created_at"] },
    { name: "story_pushes", rowsCount: 3, columnsList: ["id", "title", "content", "pushed_by", "created_at"] },
    { name: "level_configs", rowsCount: 12, columnsList: ["level_number", "title", "horror_intensity", "zombie_count", "weather"] },
    { name: "player_events", rowsCount: 1540, columnsList: ["id", "player_ref", "action_code", "timestamp"] }
  ]);


  const [keys, setKeys] = useState<ApiKeys>({
    gemini: 'AIzaSyA8b6_GEMINI_HELL52_SECURE_...',
    claude: 'sk-ant-sid01-CLAUDE_FALLBACK_...',
    groq: 'gsk_GROQ_LLAMA3_SPEED_FAILOVER_...',
    whisper: 'sk-gpt-WHISPER_MIC_AUDIO_CAPTURE_...',
    elevenLabs: 'el_keys_ELEVENLABS_ANIME_GUIDE_...'
  });

  // Supabase model-like stories push history tracking state
  const [history, setHistory] = useState<StoryPushType[]>([
    {
      id: 'push_1042',
      title: "FALLEN MECHANICAL ENTITY - CRANE 01 DEVIATION",
      seed: "SEED_CRANE_9012_ANOMALOUS",
      type: 'crane-anomaly',
      content: `{
  "unreal_entity": "SS_CRANE_01",
  "anomaly_rate": 0.85,
  "behavior": "UNPREDICTABLE_REVOLUTION_STRIKE",
  "sound_cue": "HEAVY_METAL_METALLIC_COLLAPSE",
  "objective": "Restore power grid switches to safety backup manual panels."
}`,
      pushed_by: "LEAD_DEV: SUHAN",
      active: true,
      created_at: "2 HOURS AGO"
    },
    {
      id: 'push_0989',
      title: "INDUSTRIAL STRAWBERRY-GAS INTRUSION EXCEL RATE",
      seed: "SEED_GAS_HAL_442",
      type: 'gas-leak',
      content: `{
  "environment_state": "GAS_LEAK_HALLUCINATION",
  "leak_source": "SECTOR_C_PRIMARY_VALVES",
  "phantom_zombies": true,
  "objective": "Locate chemical protective safety gear and secure gas valve."
}`,
      pushed_by: "LEAD_DEV: SUHAN",
      active: false,
      created_at: "1 DAY AGO"
    },
    {
      id: 'push_0814',
      title: "BLACKOUT SEQUENCE SECTOR D COILS",
      seed: "SEED_BLACKOUT_881",
      type: 'power-failure',
      content: `{
  "lighting_lux": 0.05,
  "backup_battery_duration_sec": 120,
  "objective": "Navigate blind sectors to high-voltage panels to trigger primary grid."
}`,
      pushed_by: "SYSTEM_ROUTER",
      active: false,
      created_at: "3 DAYS AGO"
    }
  ]);

  const [metrics] = useState<PlayerMetric[]>([
    { day: 'MON', activePlayers: 1420, tokenUsage: 45, horrorIntensity: 62 },
    { day: 'TUE', activePlayers: 1540, tokenUsage: 55, horrorIntensity: 75 },
    { day: 'WED', activePlayers: 1390, tokenUsage: 42, horrorIntensity: 50 },
    { day: 'THU', activePlayers: 1810, tokenUsage: 68, horrorIntensity: 85 },
    { day: 'FRI', activePlayers: 2240, tokenUsage: 89, horrorIntensity: 95 },
    { day: 'SAT', activePlayers: 2540, tokenUsage: 94, horrorIntensity: 98 },
    { day: 'SUN', activePlayers: 2120, tokenUsage: 82, horrorIntensity: 80 }
  ]);

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const updateConfig = (updater: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...updater }));
  };

  const saveKeys = (updatedKeys: ApiKeys) => {
    setKeys(updatedKeys);
  };

  const handleUpdateEnv = (key: string, val: string) => {
    setRailway(prev => ({
      ...prev,
      envVars: { ...prev.envVars, [key]: val },
      logs: [`[ENV_UPDATE] KEY '${key}' SET TO '${val}'`, ...prev.logs.slice(0, 8)]
    }));
  };

  const handleAddEnv = (key: string, val: string) => {
    setRailway(prev => ({
      ...prev,
      envVars: { ...prev.envVars, [key]: val },
      logs: [`[ENV_ADD] ADDED '${key}' WITH '${val}'`, ...prev.logs.slice(0, 8)]
    }));
  };

  const handleDeploy = () => {
    setRailway(prev => ({
      ...prev,
      deployments: [
        { id: `dep_${Math.floor(1000 + Math.random() * 9000)}`, status: 'success', timestamp: "JUST NOW", commit: "hot_reload: forced deploy by lead admin" },
        ...prev.deployments
      ],
      logs: [
        `[CD_HOOK] MANUAL REBOOT DISPATCH INITIATED`,
        `[CD_HOOK] SHUTTING DOWN PENDING SYSTEM COILS...`,
        `[CD_HOOK] BOOTING NEW PHYSICAL INSTANCES COMPILATION DECK`,
        `[CD_HOOK] PORT BINDING SUCCESSFUL ON 3000: STANDBY ACTIVE`,
        ...prev.logs.slice(0, 8)
      ]
    }));
  };

  const handleCommitPush = (msg: string) => {
    const newSha = Math.random().toString(16).substring(2, 9);
    setGithub(prev => ({
      ...prev,
      commits: [
        { sha: newSha, message: msg, author: "suhanshaikh78957@gmail.com", time: "JUST NOW" },
        ...prev.commits
      ]
    }));
    handleDeploy();
  };

  const handlePull = () => {
    setRailway(prev => ({
      ...prev,
      logs: [`[GIT_PULL] CONSOLIDATED REPO ORIGIN WITH LOCAL CACHE`, ...prev.logs.slice(0, 8)]
    }));
  };

  const handleExecuteSql = (query: string) => {
    setRailway(prev => ({
      ...prev,
      logs: [`[SQL_EXEC] TRANSLATION: ${query}`, ...prev.logs.slice(0, 8)]
    }));
  };

  const handleToggleOffline = (offline: boolean) => {
    setStatus(prev => ({
      ...prev,
      networkMode: offline ? 'offline' : 'online',
      flaskStatus: offline ? 'offline' : 'online'
    }));
  };

  const handleToggleCellular = (type: '5G' | 'WiFi') => {
    setStatus(prev => ({
      ...prev,
      cellularMode: type
    }));
  };

  // Push new story seedslive to server
  const handleAddPush = (newPush: Omit<StoryPushType, 'id' | 'created_at' | 'active'>) => {
    const pushedItem: StoryPushType = {
      ...newPush,
      id: `push_${Math.floor(1000 + Math.random() * 9000)}`,
      created_at: "JUST NOW",
      active: true
    };

    // De-activate previous pushes to respect "latest active seed overrides"
    setHistory(prev => [
      pushedItem,
      ...prev.map(p => ({ ...p, active: false }))
    ]);
  };

  const handleRefreshStatus = () => {
    // Simulate refreshing latencies
    setStatus(prev => ({
      ...prev,
      geminiLatency: 110 + Math.floor(Math.random() * 20),
      claudeLatency: 135 + Math.floor(Math.random() * 25),
      groqLatency: 80 + Math.floor(Math.random() * 15)
    }));
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center font-sans tracking-wide selection:bg-red-500 selection:text-white relative w-full h-full">
      {/* Absolute hazard indicator lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-repeating-linear bg-[linear-gradient(45deg,#FF0033_25%,#000_25%,#000_50%,#FF0033_50%,#FF0033_75%,#000_75%,#000)] bg-[size:10px_10px] opacity-40 z-50"></div>
      
      {/* Subtle outer ambient vignette lines */}
      <div className="absolute inset-0 scanlines opacity-5 pointer-events-none z-0"></div>

      <div className="w-full h-full flex justify-center z-10 w-full h-[100dvh]">
        <RealmeEmulator
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          config={config}
          updateConfig={updateConfig}
          status={status}
          onRefreshStatus={handleRefreshStatus}
          keys={keys}
          onSaveKeys={saveKeys}
          history={history}
          onAddPush={handleAddPush}
          metrics={metrics}
          railway={railway}
          onUpdateEnv={handleUpdateEnv}
          onAddEnv={handleAddEnv}
          onDeploy={handleDeploy}
          github={github}
          onCommitPush={handleCommitPush}
          onPull={handlePull}
          supabaseTables={supabaseTables}
          onExecuteSql={handleExecuteSql}
          onToggleOffline={handleToggleOffline}
          onToggleCellular={handleToggleCellular}
        />
      </div>
    </div>
  );
}
