import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const dataDir = path.join(__dirname, "data");

fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "hm-studios.db");
const db = new Database(dbPath);

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

const seedDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      plan TEXT NOT NULL,
      email TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      transaction_id TEXT NOT NULL,
      amount TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS consultations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      preferred_day TEXT NOT NULL,
      preferred_time TEXT NOT NULL,
      transaction_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      source TEXT NOT NULL,
      note TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const adminExists = db.prepare("SELECT 1 FROM users WHERE email = ?").get("admin@hmstudios.tech");
  if (!adminExists) {
    const passwordHash = bcrypt.hashSync("admin123", 10);
    db.prepare(
      "INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)",
    ).run(crypto.randomUUID(), "admin@hmstudios.tech", passwordHash, "admin");
  }
};

seedDatabase();

const getUserFromToken = (token) => {
  if (!token) return null;
  const session = db.prepare("SELECT user_id FROM sessions WHERE token = ?").get(token);
  if (!session) return null;
  return db.prepare("SELECT id, email, role FROM users WHERE id = ?").get(session.user_id);
};

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const user = getUserFromToken(token);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = user;
  next();
};

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    provider: aiClient ? "openai" : "fallback",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    database: "sqlite",
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(String(email).trim().toLowerCase());
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const passwordMatches = bcrypt.compareSync(String(password), user.password);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  db.prepare("INSERT INTO sessions (id, user_id, token) VALUES (?, ?, ?)").run(
    crypto.randomUUID(),
    user.id,
    token,
  );

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

app.post("/api/auth/logout", requireAuth, (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
  res.json({ success: true });
});

app.get("/api/admin/summary", requireAuth, (req, res) => {
  const orders = db.prepare("SELECT COUNT(*) as count, COALESCE(SUM(CAST(REPLACE(REPLACE(amount, '$',''), 'PKR ','') AS REAL)), 0) as revenue FROM orders").get();
  const consultations = db.prepare("SELECT COUNT(*) as count FROM consultations").get();
  const leads = db.prepare("SELECT COUNT(*) as count FROM leads").get();
  const revenue = Number(orders.revenue || 0);

  res.json({
    stats: [
      { label: "Revenue", value: `$${revenue.toFixed(1)}K`, change: "+12.8%", tone: "emerald" },
      { label: "Orders", value: String(orders.count || 0), change: "+19.3%", tone: "cyan" },
      { label: "Consultations", value: String(consultations.count || 0), change: "+8.4%", tone: "violet" },
      { label: "Leads", value: String(leads.count || 0), change: "+24.6%", tone: "amber" },
    ],
  });
});

app.get("/api/admin/orders", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT 10").all();
  res.json({ orders: rows });
});

app.get("/api/admin/consultations", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM consultations ORDER BY created_at DESC LIMIT 10").all();
  res.json({ consultations: rows });
});

app.get("/api/admin/leads", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 10").all();
  res.json({ leads: rows });
});

app.post("/api/admin/leads", requireAuth, (req, res) => {
  const { name, email, source, note } = req.body || {};
  if (!name || !email || !source) {
    return res.status(400).json({ error: "Name, email, and source are required." });
  }

  const id = crypto.randomUUID();
  db.prepare(
    "INSERT INTO leads (id, name, email, source, note, status) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(id, String(name), String(email), String(source), String(note || ""), "new");

  res.status(201).json({ success: true, id });
});

app.post("/api/ai/generate", requireAuth, async (req, res) => {
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

app.post("/api/orders", (req, res) => {
  const { plan, email, paymentMethod, transactionId, amount } = req.body || {};
  if (!plan || !email || !transactionId) {
    return res.status(400).json({ error: "Plan, email, and transaction ID are required." });
  }

  const id = crypto.randomUUID();
  db.prepare(
    "INSERT INTO orders (id, plan, email, payment_method, transaction_id, amount) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(id, String(plan), String(email), String(paymentMethod || "EasyPaisa"), String(transactionId), String(amount || "$0"));

  res.status(201).json({ success: true, id });
});

app.post("/api/consultations", (req, res) => {
  const { name, email, day, time, transactionId } = req.body || {};
  if (!name || !email || !day || !time || !transactionId) {
    return res.status(400).json({ error: "All consultation fields are required." });
  }

  const id = crypto.randomUUID();
  db.prepare(
    "INSERT INTO consultations (id, name, email, preferred_day, preferred_time, transaction_id) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(id, String(name), String(email), String(day), String(time), String(transactionId));

  res.status(201).json({ success: true, id });
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
