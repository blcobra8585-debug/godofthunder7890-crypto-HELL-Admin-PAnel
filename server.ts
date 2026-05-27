import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let db: Database | null = null;
  try {
    db = await open({
      filename: path.join(process.cwd(), "local_game_data.sqlite"),
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS game_config (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hell_mode_enabled BOOLEAN DEFAULT 0,
        mic_zombies_enabled BOOLEAN DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS game_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        level TEXT,
        message TEXT
      );
    `);

    const configRow = await db.get("SELECT COUNT(*) as count FROM game_config");
    if (configRow && configRow.count === 0) {
      await db.run("INSERT INTO game_config (hell_mode_enabled, mic_zombies_enabled) VALUES (0, 1)");
    }
    console.log("Local SQLite database initialized.");
  } catch (err) {
    console.error("Failed to initialize SQLite database:", err);
  }

  // API route matching Flask game-init endpoint
  app.post("/api/v1/game-init", async (req, res) => {
    try {
      let configData: any = null;
      let geminiKey: string | undefined = process.env.GEMINI_API_KEY;

      // Check if Supabase env parameters are set in project
      const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        try {
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          // Fetch configurations and API keys from Supabase
          const { data: config, error: configError } = await supabase
            .from("game_config")
            .select("*")
            .single();
            
          if (!configError && config) {
            configData = config;
          }

          const { data: keys, error: keysError } = await supabase
            .from("api_keys")
            .select("gemini_key")
            .single();
            
          if (!keysError && keys && keys.gemini_key) {
            geminiKey = keys.gemini_key;
          }
        } catch (dbErr) {
          console.warn("Supabase operational connection failed, falling back to local credentials:", dbErr);
        }
      }

      // Determine the active configurations and fallback to offline SQLite
      let hellMode = false;
      let micZombiesEnabled = true;

      if (configData) {
        hellMode = configData.hell_mode_enabled ?? false;
        micZombiesEnabled = configData.mic_zombies_enabled ?? true;
      } else if (db) {
        try {
          const localConfig = await db.get("SELECT * FROM game_config ORDER BY id DESC LIMIT 1");
          if (localConfig) {
            hellMode = Boolean(localConfig.hell_mode_enabled);
            micZombiesEnabled = Boolean(localConfig.mic_zombies_enabled);
          }
        } catch (sqliteErr) {
          console.error("Local SQLite config read failed:", sqliteErr);
        }
      }

      if (db) {
        await db.run("INSERT INTO game_logs (level, message) VALUES (?, ?)", ["INFO", `Game Init requested. HellMode: ${hellMode}`]);
      }

      // Call server-side Gemini API using correct @google/genai SDK
      const apiKey = geminiKey || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          status: "error",
          message: "GEMINI_API_KEY is not defined in the workspace Secrets, .env, or Supabase credentials table."
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Generate a terrifying 2-line industrial horror mission objective involving SS CRANE failures."
      });

      const storyText = geminiResponse.text || "SS CRANE electromagnetic couplers disrupted. Emergency shutdown coils are non-responsive in Sector D.";

      return res.status(200).json({
        status: "success",
        story_seed: storyText,
        hell_mode: hellMode,
        mic_zombies_enabled: micZombiesEnabled
      });

    } catch (error: any) {
      console.error("Game Init Route Error:", error);
      return res.status(500).json({
        status: "error",
        message: error.message || "An internal error occurred during game-init sequence."
      });
    }
  });

  // Vite middleware for development vs static asset delivery for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-Stack Express server now listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to bootstrap server instance:", error);
  process.exit(1);
});
