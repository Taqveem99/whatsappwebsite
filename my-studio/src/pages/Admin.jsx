import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  BrainCircuit,
  BriefcaseBusiness,
  LayoutDashboard,
  MessageSquareText,
  Package,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wand2,
} from "lucide-react";

const defaultStats = [
  { label: "Revenue", value: "", change: "+0%", tone: "emerald" },
  { label: "Orders", value: "0", change: "+0%", tone: "cyan" },
  { label: "Consultations", value: "0", change: "+0%", tone: "violet" },
  { label: "Leads", value: "0", change: "+0%", tone: "amber" },
];

const defaultLeads = [
  { name: "No leads yet", service: "Waiting for intake", status: "new", value: "" },
];

const templates = [
  "Draft a customer reply for a WhatsApp order confirmation",
  "Write a premium product description for HM DeepScan",
  "Summarize the key support issues in this week",
  "Generate a short promo message for the 90-day recovery package",
];

const chartBars = [46, 62, 58, 82, 70, 94, 88, 100, 92, 86, 98, 75];

function buildAiReply(prompt) {
  const lower = prompt.toLowerCase();

  if (lower.includes("product") || lower.includes("description")) {
    return "HM DeepScan v1.0 is a premium Android and WhatsApp forensic recovery suite engineered for deleted media restoration, Crypt14 decryption, and EXIF metadata extraction. It is built for privacy-first recovery workflows and offline evidence handling.";
  }

  if (lower.includes("reply") || lower.includes("whatsapp") || lower.includes("message")) {
    return "Hi! Thanks for your interest in Taqveem Ulhaq. I have confirmed your package request and will send the next steps, payment details, and delivery instructions in the next message. You can also book a private consultation if you need guidance.";
  }

  if (lower.includes("support") || lower.includes("issue") || lower.includes("summary")) {
    return "Top issues this week: data recovery delays, WhatsApp media loss, and license delivery confirmation. Recommended actions: improve onboarding, answer FAQs, and collect transaction IDs before support responses.";
  }

  if (lower.includes("promo") || lower.includes("sale") || lower.includes("marketing")) {
    return "Launch a limited-time promotion for the Deep Sector Recovery plan and highlight its advanced WhatsApp decryption, deep carve capabilities, and VIP consultation access. Emphasize privacy, speed, and technical expertise.";
  }

  return "Here is an AI-generated action plan: review the latest customer intake, confirm package viability, respond in the next 15 minutes, and add follow-up reminders for consultations and support tickets.";
}

export default function Admin() {
  const [prompt, setPrompt] = useState("Write a short marketing message for the Deep Sector Recovery plan.");
  const [aiResult, setAiResult] = useState(buildAiReply("Write a short marketing message for the Deep Sector Recovery plan."));
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking");
  const [stats, setStats] = useState(defaultStats);
  const [leads, setLeads] = useState(defaultLeads);
  const [orders, setOrders] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [pipeline, setPipeline] = useState([
    { stage: "Lead capture", count: 18, amount: ".4K" },
    { stage: "Qualification", count: 11, amount: ".7K" },
    { stage: "Consultation", count: 7, amount: ".3K" },
    { stage: "Closed", count: 4, amount: ".2K" },
  ]);
  const [emailReady, setEmailReady] = useState(false);

  const token = localStorage.getItem("hm-admin-token");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [healthRes, overviewRes] = await Promise.all([
          fetch("/api/health"),
          fetch("/api/admin/overview", {
            headers: {
              Authorization: "Bearer " + token,
            },
          }),
        ]);

        const health = await healthRes.json();
        setApiStatus(health.provider || "fallback");
        setEmailReady(Boolean(health.emailReady));

        if (overviewRes.ok) {
          const payload = await overviewRes.json();
          if (payload.stats) setStats(payload.stats);
          if (payload.pipeline) setPipeline(payload.pipeline);
          if (payload.leads && payload.leads.length) {
            setLeads(payload.leads.map((lead) => ({
              name: lead.name,
              service: lead.source,
              status: lead.status,
              value: lead.note ? "$" + lead.note : "",
            })));
          }
          if (payload.orders) setOrders(payload.orders);
          if (payload.consultations) setConsultations(payload.consultations);
          if (payload.emailReady !== undefined) setEmailReady(Boolean(payload.emailReady));
        }
      } catch (error) {
        setApiStatus("fallback");
      }
    };

    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const sidebarItems = [
    { label: "Overview", icon: LayoutDashboard, active: true },
    { label: "Customers", icon: Users },
    { label: "Orders", icon: Package },
    { label: "AI Copilot", icon: BrainCircuit },
    { label: "Inbox", icon: MessageSquareText },
    { label: "Reports", icon: BarChart3 },
    { label: "Settings", icon: Settings },
  ];

  const handleAiGenerate = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setAiResult(data.text || buildAiReply(prompt));
    } catch (error) {
      setAiResult(buildAiReply(prompt));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });
    } catch (error) {
      // ignore logout failure
    } finally {
      localStorage.removeItem("hm-admin-token");
      window.location.href = "/login";
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12 text-slate-100 md:pt-16">
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="glass-card rounded-[2rem] p-5">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Admin</div>
              <div className="font-bold text-white">Taqveem Control</div>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                type="button"
                className={"flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition " + (active ? "bg-emerald-500/12 text-emerald-200 ring-1 ring-emerald-400/30" : "text-slate-300 hover:bg-slate-800/60")}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles size={16} className="text-emerald-300" />
              AI credits
            </div>
            <div className="text-3xl font-black text-white">{emailReady ? "Unlimited" : "1,280"}</div>
            <div className="mt-2 text-xs text-slate-400">{emailReady ? "Email & AI ready" : "Available this month"}</div>
          </div>
        </aside>

        <section className="space-y-6">
          <header className="glass-card rounded-[2rem] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Dashboard</div>
                <h1 className="mt-2 text-3xl font-black text-white">Business overview</h1>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="rounded-full border border-slate-700 bg-slate-900/70 p-2.5 text-slate-300">
                  <Search size={18} />
                </button>
                <button type="button" className="rounded-full border border-slate-700 bg-slate-900/70 p-2.5 text-slate-300">
                  <Bell size={18} />
                </button>
                <button type="button" onClick={handleLogout} className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200">
                  Logout
                </button>
              </div>
            </div>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, change, tone }) => (
              <div key={label} className="glass-card rounded-[1.7rem] p-5">
                <div className="text-sm text-slate-400">{label}</div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div className="text-3xl font-black text-white">{value}</div>
                  <div className={"rounded-full px-2 py-1 text-xs font-semibold " + (tone === "emerald" ? "bg-emerald-500/10 text-emerald-200" : tone === "cyan" ? "bg-cyan-500/10 text-cyan-200" : tone === "violet" ? "bg-violet-500/10 text-violet-200" : "bg-amber-500/10 text-amber-200")}>
                    {change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="glass-card rounded-[2rem] p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Performance</div>
                  <h2 className="text-xl font-bold text-white">Monthly revenue</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-200">
                  <TrendingUp size={16} />
                  +18.2%
                </div>
              </div>

              <div className="flex h-52 items-end gap-3">
                {chartBars.map((height, index) => (
                  <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-emerald-500 via-emerald-400 to-cyan-400" style={{ height: height + "%" }} />
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Sales funnel</div>
                  <h2 className="text-xl font-bold text-white">Pipeline</h2>
                </div>
                <BriefcaseBusiness size={18} className="text-emerald-300" />
              </div>

              <div className="space-y-4">
                {pipeline.map((stage) => (
                  <div key={stage.stage} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-white">{stage.stage}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{stage.amount}</div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xl font-black text-white">{stage.count}</div>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: Math.min(stage.count * 10, 100) + "%" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-card rounded-[2rem] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Leads</div>
                  <h2 className="text-xl font-bold text-white">Recent customers</h2>
                </div>
                <button type="button" className="text-sm font-semibold text-emerald-200">View all</button>
              </div>

              <div className="space-y-3">
                {leads.map(({ name, service, status, value }) => (
                  <div key={name + "-" + service} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <div>
                      <div className="font-semibold text-white">{name}</div>
                      <div className="text-xs text-slate-400">{service}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-emerald-200">{value}</div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">AI Copilot</div>
                  <h2 className="text-xl font-bold text-white">Smart content studio</h2>
                </div>
                <Wand2 size={18} className="text-emerald-300" />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {templates.map((template) => (
                  <button
                    key={template}
                    type="button"
                    onClick={() => setPrompt(template)}
                    className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 transition hover:border-emerald-400/30 hover:text-white"
                  >
                    {template}
                  </button>
                ))}
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-100 outline-none transition focus:border-emerald-400"
              />

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {apiStatus === "openai" ? "AI connected" : "Fallback mode"}
                </div>
                <button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <BrainCircuit size={16} />
                  {isGenerating ? "Generating..." : "Generate"}
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/8 p-4 text-sm leading-7 text-slate-200">
                {aiResult}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="glass-card rounded-[2rem] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Orders</div>
                  <h2 className="text-xl font-bold text-white">Recent purchases</h2>
                </div>
                <Package size={18} className="text-emerald-300" />
              </div>
              <div className="space-y-3">
                {orders.length ? orders.map((order) => (
                  <div key={order.id} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-semibold text-white">{order.plan}</div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{order.status || "new"}</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-400">{order.email} · {order.amount}</div>
                  </div>
                )) : <div className="text-sm text-slate-400">No orders yet.</div>}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Consultations</div>
                  <h2 className="text-xl font-bold text-white">Booked sessions</h2>
                </div>
                <MessageSquareText size={18} className="text-emerald-300" />
              </div>
              <div className="space-y-3">
                {consultations.length ? consultations.map((consultation) => (
                  <div key={consultation.id} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-semibold text-white">{consultation.name}</div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{consultation.status || "pending"}</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-400">{consultation.preferred_day} · {consultation.preferred_time}</div>
                  </div>
                )) : <div className="text-sm text-slate-400">No consultations yet.</div>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
