import { useState, useRef, useEffect } from "react";

const SUGGESTED_PROMPTS = [
  "What projects has Ojasvi built?",
  "What are Ojasvi's technical skills?",
  "Is Ojasvi available for internships?",
];

export default function AskAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    console.log("[CHAT] sendMessage called with text:", trimmed);

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    console.log("[CHAT] Messages array before state update:", nextMessages);
    
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    console.log("[CHAT] State updated - isLoading set to true");

    try {
      const targetUrl = "/api/chat";
      const payload = { messages: nextMessages };
      
      console.log("[FRONTEND] Sending to API URL:", targetUrl);
      console.log("[FRONTEND] Request payload:", JSON.stringify(payload, null, 2));
      
      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[FRONTEND] Response received. Status:", res.status, "OK:", res.ok);

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[FRONTEND ERROR] Status: ${res.status} | Raw Response:`, errorText);
        try {
          const errorJson = JSON.parse(errorText);
          console.error(`[FRONTEND ERROR] Parsed error JSON:`, errorJson);
        } catch (e) {
          console.error(`[FRONTEND ERROR] Could not parse error as JSON`);
        }
        throw new Error(`API failed with status ${res.status}`);
      }

      let data;
      try {
        data = await res.json();
        console.log("[FRONTEND] Parsed JSON response:", data);
      } catch (parseErr) {
        console.error("[FRONTEND ERROR] Failed to parse JSON:", parseErr);
        throw new Error("Invalid JSON response from server");
      }

      if (!data.reply) {
        console.error("[FRONTEND ERROR] Invalid response format. Expected 'reply' field.", data);
        throw new Error("Invalid response format from server");
      }

      console.log("[FRONTEND] Assistant reply received:", data.reply);
      
      setMessages((prev) => {
        const updated = [...prev, { role: "assistant", content: data.reply }];
        console.log("[CHAT] Messages state updated with assistant response. New length:", updated.length);
        return updated;
      });
    } catch (err) {
      console.error("[FRONTEND ERROR] Chat request failed:", err.message || err);
      console.error("[FRONTEND ERROR] Full error object:", err);
      setError("Something went wrong. Please try again in a moment.");
      // Remove the failed user message if API call failed
      setMessages((prev) => {
        const rolled = prev.slice(0, -1);
        console.log("[CHAT] Rolled back user message due to error. Messages length:", rolled.length);
        return rolled;
      });
    } finally {
      setIsLoading(false);
      console.log("[CHAT] sendMessage complete. isLoading set to false");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("[CHAT] Form submitted. Input value:", input);
    sendMessage(input);
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 border">
      <h3 className="text-xl font-semibold mb-2">Ask AI about Ojasvi</h3>
      <p className="text-gray-600 mb-6">
        Ask anything about Ojasvi's background, skills, or projects, and get
        an answer grounded in her resume.
      </p>

      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto rounded-xl border bg-gray-50 p-4 mb-4 flex flex-col gap-3"
      >
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">
            Try one of the prompts below, or ask your own question.
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
              m.role === "user"
                ? "self-end bg-black text-white"
                : "self-start bg-white border text-gray-800"
            }`}
          >
            {m.content}
          </div>
        ))}

        {isLoading && (
          <div className="self-start bg-white border text-gray-400 text-sm px-4 py-2 rounded-2xl">
            Thinking…
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => sendMessage(p)}
              className="text-xs px-3 py-1.5 border rounded-full text-gray-600 hover:bg-gray-100 transition"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Ojasvi's experience…"
          className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-2 bg-black text-white rounded-xl text-sm font-medium disabled:opacity-40 hover:opacity-90 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
