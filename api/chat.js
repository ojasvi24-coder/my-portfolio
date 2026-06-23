// Vercel serverless function.
// Lives at the project ROOT in /api (not under src/) — this is Vercel's
// required convention for serverless functions, so it must stay here.
//
// Responsibility: hold the Groq API key server-side and proxy chat
// requests from the "Ask My AI" widget to Groq's free LLM API.
// Uses Mixtral 8x7B model (completely free, no credit card needed).
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
- Machine Learning Engineer (Feb 2026–May 2026) | Open Project, Berkeley, CA
  - Engineered spatial ML pipelines and regression models using PyTorch and scikit-learn
  - Feature engineering, high-dimensional data ingestion, cross-validation strategies
  - Multi-source geospatial datasets

- Private Mathematics Tutor (Jan 2024–Sep 2025)
  - 60% average exam score improvement across tutees
  - First-principles frameworks for Calculus, Linear Algebra, Statistics
  - 20+ sessions per student building reusable problem libraries

AVAILABILITY: Open to Fall 2026 / Winter 2027 internships`;

const MODEL = "llama-3.3-70b-versatile";
const MAX_TOKENS = 1024;
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 4000;

export default async function handler(req, res) {
  console.log("[BACKEND] /api/chat handler called");
  console.log("[BACKEND] Request method:", req.method);
  
  if (req.method === "GET") {
    console.log("[BACKEND] GET request - returning status check");
    return res.status(200).json({
      status: "ok",
      hasApiKey: Boolean(process.env.GROQ_API_KEY),
    });
  }

  if (req.method !== "POST") {
    console.warn("[BACKEND] Invalid method:", req.method);
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("[BACKEND ERROR] Missing GROQ_API_KEY environment variable");
    return res.status(500).json({ error: "Server is not configured correctly" });
  }
  console.log("[BACKEND] Groq API key is set (first 10 chars):", apiKey.substring(0, 10) + "...");

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

  // Groq uses OpenAI-compatible format: system must be first message with role "system"
  const messagesWithSystem = [
    { role: "system", content: SYSTEM_PROMPT },
    ...safeMessages,
  ];

  console.log("[BACKEND] Final messages payload (with system):", messagesWithSystem.length, "messages total");

  try {
    console.log("[BACKEND] Calling Groq API endpoint: https://api.groq.com/openai/v1/chat/completions");
    console.log("[BACKEND] Model:", MODEL, "| Max tokens:", MAX_TOKENS);
    
    const requestBody = {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: messagesWithSystem,
    };
    
    console.log("[BACKEND] Request body being sent to Groq:", JSON.stringify(requestBody, null, 2));
    
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("[BACKEND] Groq response received. Status:", groqRes.status, "OK:", groqRes.ok);

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error(`[BACKEND ERROR] Groq API failed | Status: ${groqRes.status}`);
      console.error(`[BACKEND ERROR] Full Groq error response:`, errText);
      try {
        const errJson = JSON.parse(errText);
        console.error(`[BACKEND ERROR] Parsed error JSON:`, JSON.stringify(errJson, null, 2));
      } catch (e) {
        console.error(`[BACKEND ERROR] Could not parse error as JSON`);
      }
      return res.status(502).json({ 
        error: "Upstream AI provider error",
        details: `Groq API returned ${groqRes.status}`,
        groqError: errText.substring(0, 200) // First 200 chars of error
      });
    }

    let data;
    try {
      data = await groqRes.json();
      console.log("[BACKEND] Parsed Groq response");
    } catch (parseErr) {
      console.error("[BACKEND ERROR] Failed to parse Groq JSON response:", parseErr);
      return res.status(502).json({ error: "Failed to parse AI provider response" });
    }

    console.log("[BACKEND] Response structure - has choices array:", Array.isArray(data.choices));
    console.log("[BACKEND] Choices array length:", data.choices?.length);
    
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error("[BACKEND ERROR] Unexpected Groq response format:", JSON.stringify(data, null, 2));
      return res.status(502).json({ error: "Invalid response from AI provider" });
    }

    const reply = data.choices[0].message?.content || "Sorry, I couldn't generate a response.";
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
