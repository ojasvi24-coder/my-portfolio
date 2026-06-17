// Vercel serverless function.
// Lives at the project ROOT in /api (not under src/) — this is Vercel's
// required convention for serverless functions, so it must stay here.
//
// Responsibility: hold the Anthropic API key server-side and proxy chat
// requests from the "Ask My AI" widget in index.html to Claude.
// The key never reaches the browser.

const SYSTEM_PROMPT = `You are an AI assistant embedded in Ojasvi Shrivastava's portfolio. Your ONLY job is to answer questions about Ojasvi accurately and helpfully. Be concise (3-5 sentences), direct, and technically credible. Always ground answers in the facts below. Never fabricate or embellish.

FACTS ABOUT OJASVI:
- Name: Ojasvi Shrivastava
- UC Berkeley, B.A. Data Science, Aug 2025–May 2027
- Transfer from LA Pierce College with A.S. Mathematics, A.S. Physics, A.S. Computer Science, A.A. General Studies (Jan 2023–Jul 2025)
- Headline from resume: "Data Science @UC Berkeley | Machine Learning · Generative AI · Data Science | Building AI-Powered Solutions"
- Strong math foundation (calculus, linear algebra, probability, physics)
- Email: oju24.ai@gmail.com | GitHub: github.com/ojasvi24-coder | LinkedIn: linkedin.com/in/ojasvi-shrivastava-94a00b340

TECHNICAL SKILLS:
- Languages: Python, SQL, Java, C++, TypeScript, JavaScript
- AI/ML: PyTorch, TensorFlow, Keras, scikit-learn, XGBoost, LLMs, RAG, NLP, Deep Learning, Agentic Workflows, Vector Databases, Feature Engineering, Cross-Validation, Monte Carlo Simulation
- Data Science: NumPy, Pandas, Matplotlib, Plotly.js, GeoPandas, Statistical Modeling, Stochastic Simulation, Optimization Models
- Frameworks: Next.js, React.js, FastAPI, Tailwind CSS, Leaflet.js, Vercel
- Tools: GitHub, VS Code, Jupyter, Overleaf

CERTIFICATIONS:
- Kaggle: Intermediate Machine Learning (XGBoost, cross-validation, data leakage prevention, feature encoding)
- Kaggle: Intro to Deep Learning (TensorFlow, Keras, neural network architecture, performance tuning)
- IBM: Artificial Intelligence Fundamentals (ML principles, AI ethics, applied AI systems)

PROJECTS:
1. Scout — Autonomous AI Market Intelligence Engine
   - Uses LLMs + RAG + agentic workflows
   - Ingests: research papers, patents, startup launches, VC funding, job postings, government grants
   - Auto-generates: startup concepts, TAM/SAM/SOM market sizing, MVP specs, investor pitch decks
   - Tech: Python, LLMs, RAG, Agentic Workflows, NLP, Vector DBs, FastAPI
   - Live: https://scout-eight-psi.vercel.app/

2. FinSight — Full-Stack Wealth & Retirement Simulator
   - Stochastic Monte Carlo (Geometric Brownian Motion), 3,000+ trials, P10/P50/P90 percentile forecasting
   - AI-driven expense categorization and dynamic budget trend visualizations
   - Tech: Python, Next.js, TypeScript, React.js, Tailwind CSS, Monte Carlo, FastAPI, Vercel
   - Live: https://finsight-tau-livid.vercel.app/

3. GIStice League — UC Berkeley Open Project, Machine Learning Team
   - Maps grocery accessibility across 500+ Bay Area census tracts (SF, Oakland, Berkeley)
   - Uses PyTorch + scikit-learn regression models
   - 18% R² improvement via K-Means spatial clustering and grocery density kernels
   - Tech: Python, PyTorch, scikit-learn, GeoPandas, NumPy, Leaflet.js, Plotly.js
   - Live: https://gistice-league.onrender.com/

EXPERIENCE:
- Private Mathematics Tutor (Jan 2024–Sep 2025)
  - 60% average exam score improvement across tutees
  - First-principles frameworks for Calculus, Linear Algebra, Statistics
  - 20+ sessions per student building reusable problem libraries

AVAILABILITY: Open to Fall 2026 / Winter 2027 internships`;

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 1000;
const MAX_HISTORY_MESSAGES = 20; // cap how much history we forward to the model
const MAX_MESSAGE_CHARS = 4000; // cap per-message size to limit cost/abuse

export default async function handler(req, res) {
  console.log("[BACKEND] /api/chat handler called");
  console.log("[BACKEND] Request method:", req.method);
  
  // Visit this endpoint directly in a browser (GET request) any time to
  // confirm the function is deployed and whether it can see the API key,
  // without needing curl/PowerShell. Never reveals the key itself.
  if (req.method === "GET") {
    console.log("[BACKEND] GET request - returning status check");
    return res.status(200).json({
      status: "ok",
      hasApiKey: Boolean(process.env.ANTHROPIC_API_KEY),
    });
  }

  if (req.method !== "POST") {
    console.warn("[BACKEND] Invalid method:", req.method);
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[BACKEND ERROR] Missing ANTHROPIC_API_KEY environment variable");
    return res.status(500).json({ error: "Server is not configured correctly" });
  }
  console.log("[BACKEND] API key is set (first 10 chars):", apiKey.substring(0, 10) + "...");

  let body = req.body;
  console.log("[BACKEND] Received body type:", typeof body);
  
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
      console.log("[BACKEND] Parsed string body");
    } catch (parseErr) {
      console.error("[BACKEND ERROR] Failed to parse JSON body:", parseErr);
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const { messages } = body || {};
  console.log("[BACKEND] Messages array length:", messages?.length);
  
  if (!Array.isArray(messages) || messages.length === 0) {
    console.error("[BACKEND ERROR] Invalid messages array");
    return res.status(400).json({ error: "messages array is required" });
  }

  // Sanitize: only allow user/assistant roles, cap length and size.
  const safeMessages = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({
      role: m && m.role === "assistant" ? "assistant" : "user",
      content: String(m?.content ?? "").slice(0, MAX_MESSAGE_CHARS),
    }))
    .filter((m) => m.content.trim().length > 0);

  console.log("[BACKEND] Safe messages (sanitized) count:", safeMessages.length);
  console.log("[BACKEND] Last message content:", safeMessages[safeMessages.length - 1]?.content.substring(0, 50) + "...");

  if (safeMessages.length === 0) {
    console.error("[BACKEND ERROR] No valid message content after sanitization");
    return res.status(400).json({ error: "No valid message content provided" });
  }

  try {
    console.log("[BACKEND] Calling Anthropic API endpoint: https://api.anthropic.com/v1/messages");
    console.log("[BACKEND] Model:", MODEL, "| Max tokens:", MAX_TOKENS);
    
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: safeMessages,
      }),
    });

    console.log("[BACKEND] Anthropic response received. Status:", anthropicRes.status, "OK:", anthropicRes.ok);

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error(`[BACKEND ERROR] Anthropic API failed | Status: ${anthropicRes.status} | Response:`, errText);
      return res.status(502).json({ 
        error: "Upstream AI provider error",
        details: `Anthropic API returned ${anthropicRes.status}` 
      });
    }

    let data;
    try {
      data = await anthropicRes.json();
      console.log("[BACKEND] Parsed Anthropic response");
    } catch (parseErr) {
      console.error("[BACKEND ERROR] Failed to parse Anthropic JSON response:", parseErr);
      return res.status(502).json({ error: "Failed to parse AI provider response" });
    }

    console.log("[BACKEND] Response structure - has content array:", Array.isArray(data.content));
    console.log("[BACKEND] Content array length:", data.content?.length);
    
    if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
      console.error("[BACKEND ERROR] Unexpected Anthropic response format:", JSON.stringify(data, null, 2));
      return res.status(502).json({ error: "Invalid response from AI provider" });
    }

    const reply = data.content[0].text || "Sorry, I couldn't generate a response.";
    console.log("[BACKEND] Extracted reply (first 50 chars):", reply.substring(0, 50) + "...");
    console.log("[BACKEND] Sending success response to frontend");

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("[BACKEND ERROR] Chat handler exception:", err.message || err);
    console.error("[BACKEND ERROR] Full error:", err);
    return res.status(500).json({ 
      error: "Internal server error",
      message: err.message || "Unknown error" 
    });
  }
}
