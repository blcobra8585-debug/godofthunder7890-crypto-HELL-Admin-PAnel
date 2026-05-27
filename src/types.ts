export interface SystemConfig {
  micZombieDetection: boolean;
  ghostTrace: boolean;
  weatherAi: boolean;
  maxAmmo: number;
  hapticFeedback: boolean;
  activeAi: 'gemini' | 'claude' | 'groq';
  amoledHighHz: boolean; // 120Hz Realme GT 6T screen optimizations
  hdrRenderEngine: boolean; // High-fidelity color grading
}

export interface ApiKeys {
  gemini: string;
  claude: string;
  groq: string;
  whisper: string;
  elevenLabs: string;
}

export interface StoryPush {
  id: string;
  title: string;
  content: string;
  seed: string;
  type: 'gas-leak' | 'power-failure' | 'structural-damage' | 'crane-anomaly' | 'custom';
  pushed_by: string;
  active: boolean;
  created_at: string;
}

export interface PlayerMetric {
  day: string;
  activePlayers: number;
  tokenUsage: number;
  horrorIntensity: number;
}

export interface SystemStatus {
  flaskStatus: 'online' | 'offline' | 'error';
  supabaseStatus: 'online' | 'offline' | 'error';
  geminiLatency: number;
  claudeLatency: number;
  groqLatency: number;
  networkMode: 'online' | 'offline';
  cellularMode: '5G' | 'WiFi';
}

export interface RailwayDev {
  envVars: Record<string, string>;
  deployments: Array<{ id: string; status: 'success' | 'building' | 'failed'; timestamp: string; commit: string }>;
  logs: string[];
}

export interface GitHubRepo {
  branch: string;
  commits: Array<{ sha: string; message: string; author: string; time: string }>;
  repoName: string;
}

export interface SupabaseTable {
  name: string;
  rowsCount: number;
  columnsList: string[];
}
