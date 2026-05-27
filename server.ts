import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const localDbPath = path.join(process.cwd(), "local_game_data.json");
  let localDb = {
    game_config: { hell_mode_enabled: false, mic_zombies_enabled: true },
    game_logs: [] as any[]
  };

  try {
    const data = await fs.readFile(localDbPath, "utf-8");
    localDb = JSON.parse(data);
    console.log("Local JSON database initialized.");
  } catch (err: any) {
    if (err.code === "ENOENT") {
      await fs.writeFile(localDbPath, JSON.stringify(localDb, null, 2));
      console.log("Created local JSON database file.");
    } else {
      console.error("Failed to read JSON database:", err);
    }
  }

  const saveLocalDb = async () => {
    try {
      await fs.writeFile(localDbPath, JSON.stringify(localDb, null, 2));
    } catch (err) {
      console.error("Failed to save local JSON database:", err);
    }
  };

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
      } else {
        hellMode = Boolean(localDb.game_config.hell_mode_enabled);
        micZombiesEnabled = Boolean(localDb.game_config.mic_zombies_enabled);
      }

      localDb.game_logs.push({
        level: "INFO",
        message: `Game Init requested. HellMode: ${hellMode}`,
        timestamp: new Date().toISOString()
      });
      await saveLocalDb();

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
