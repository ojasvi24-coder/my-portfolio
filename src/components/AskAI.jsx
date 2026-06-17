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

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Status:", res.status, "Response:", errorText);
        throw new Error(`API error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      if (!data.reply) {
        console.error("Invalid response format. Expected 'reply' field.", data);
        throw new Error("Invalid response format from server");
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Chat request failed:", err.message || err);
      setError("Something went wrong. Please try again in a moment.");
      // Remove the failed user message if API call failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
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
