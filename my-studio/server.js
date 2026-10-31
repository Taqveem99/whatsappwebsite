import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const fallbackReply = (prompt) => {
  const lower = prompt.toLowerCase();

  if (lower.includes("product") || lower.includes("description")) {
    return "HM DeepScan v1.0 is a premium Android and WhatsApp forensic recovery suite engineered for deleted media restoration, Crypt14 decryption, and EXIF metadata extraction. It is built for privacy-first recovery workflows and offline evidence handling.";
  }

  if (lower.includes("reply") || lower.includes("whatsapp") || lower.includes("message")) {
    return "Hi! Thanks for your interest in HM Studios. I’ve confirmed your request and will send secure payment details, next steps, and delivery instructions. If needed, you may also book a private consultation for deeper technical guidance.";
  }

  if (lower.includes("support") || lower.includes("issue") || lower.includes("summary")) {
    return "Top issues this week: device recovery delays, WhatsApp media loss, and order confirmation follow-up. Recommended actions: improve onboarding, answer FAQs clearly, and collect transaction IDs before support responses.";
  }

  if (lower.includes("promo") || lower.includes("sale") || lower.includes("marketing")) {
    return "Launch a limited-time promotion for the Deep Sector Recovery package and highlight its advanced WhatsApp decryption, deep carve capabilities, and VIP consultation support. Emphasize speed, privacy, and technical expertise.";
  }

  return "Here’s a practical action plan: confirm the customer need, match the right plan, answer with clear payment guidance, and offer a private consultation for complex recovery cases.";
};

const createOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
};

const aiClient = createOpenAIClient();

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    provider: aiClient ? "openai" : "fallback",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  });
});

app.post("/api/ai/generate", async (req, res) => {
  const { prompt } = req.body || {};

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  if (!aiClient) {
    return res.json({ text: fallbackReply(prompt) });
  }

  try {
    const completion = await aiClient.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are the AI assistant for HM Studios. Write concise, professional, conversion-focused replies for digital forensics, Android recovery, support, and customer onboarding. Keep answers practical and clear.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const text = completion.choices?.[0]?.message?.content?.trim();
    return res.json({ text: text || fallbackReply(prompt) });
  } catch (error) {
    return res.status(500).json({
      error: "AI service failed. Falling back to local content generation.",
      text: fallbackReply(prompt),
    });
  }
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`HM Studios API running on http://localhost:${port}`);
});
