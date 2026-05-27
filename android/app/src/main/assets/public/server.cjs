var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_supabase_js = require("@supabase/supabase-js");
var import_genai = require("@google/genai");
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/v1/game-init", async (req, res) => {
    try {
      let configData = null;
      let geminiKey = process.env.GEMINI_API_KEY;
      const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        try {
          const supabase = (0, import_supabase_js.createClient)(supabaseUrl, supabaseKey);
          const { data: config, error: configError } = await supabase.from("game_config").select("*").single();
          if (!configError && config) {
            configData = config;
          }
          const { data: keys, error: keysError } = await supabase.from("api_keys").select("gemini_key").single();
          if (!keysError && keys && keys.gemini_key) {
            geminiKey = keys.gemini_key;
          }
        } catch (dbErr) {
          console.warn("Supabase operational connection failed, falling back to local credentials:", dbErr);
        }
      }
      const hellMode = configData ? configData.hell_mode_enabled ?? false : false;
      const micZombiesEnabled = configData ? configData.mic_zombies_enabled ?? true : true;
      const apiKey = geminiKey || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          status: "error",
          message: "GEMINI_API_KEY is not defined in the workspace Secrets, .env, or Supabase credentials table."
        });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
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
    } catch (error) {
      console.error("Game Init Route Error:", error);
      return res.status(500).json({
        status: "error",
        message: error.message || "An internal error occurred during game-init sequence."
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
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
//# sourceMappingURL=server.cjs.map
