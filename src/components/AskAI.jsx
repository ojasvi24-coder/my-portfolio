import { useState, useRef, useEffect } from "react";

const SUGGESTED_PROMPTS = [
  "What projects have you built?",
  "What are your technical skills?",
  "Tell me about your experience",
  "Are you available for internships?",
];

export default function AskAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scrollRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("askAI_messages");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load chat history:", e);
      }
    }

    // Check dark mode preference
    const isDark = localStorage.getItem("askAI_darkMode") === "true" ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("askAI_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("askAI_darkMode", String(newMode));
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear the chat history?")) {
      setMessages([]);
      localStorage.removeItem("askAI_messages");
      setError(null);
    }
  };

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
        throw new Error(`API error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      if (!data.reply) {
        throw new Error("Invalid response format from server");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Something went wrong. Please try again in a moment.");
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
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className={`${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      } shadow-xl rounded-2xl border flex flex-col h-full max-h-[600px] overflow-hidden`}>
        
        {/* Header */}
        <div className={`${
          isDarkMode ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gradient-to-r from-blue-600 to-purple-600"
        } text-white p-4 flex justify-between items-center`}>
          <div>
            <h3 className="font-bold text-lg">Ask AI about Ojasvi</h3>
            <p className="text-xs opacity-90">Powered by Groq</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleDarkMode}
              title="Toggle dark mode"
              className="p-2 rounded-lg hover:bg-white/20 transition"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            {messages.length > 0 && (
              <button
                onClick={clearHistory}
                title="Clear chat history"
                className="p-2 rounded-lg hover:bg-white/20 transition"
              >
                🗑️
              </button>
            )}
          </div>
        </div>

        {/* Messages Container */}
        <div
          ref={scrollRef}
          className={`${
            isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
          } flex-1 overflow-y-auto p-4 flex flex-col gap-3`}
        >
          {messages.length === 0 ? (
            <div className={`${
              isDarkMode ? "text-gray-400" : "text-gray-400"
            } text-sm text-center py-8`}>
              <p className="mb-4 text-base">👋 Hello! Ask me anything.</p>
              <p>Try one of the suggested questions below or ask your own question about my background, skills, or projects.</p>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : isDarkMode
                        ? "bg-gray-700 text-white rounded-bl-none border border-gray-600"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`${
                    isDarkMode ? "bg-gray-700" : "bg-white border border-gray-200"
                  } px-4 py-2 rounded-2xl rounded-bl-none flex gap-1`}>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs rounded">
            {error}
          </div>
        )}

        {/* Suggested Questions or Input */}
        <div className={`${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-t p-4 flex-shrink-0`}>
          {messages.length === 0 ? (
            <div className="space-y-2">
              <p className={`text-xs font-semibold ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } uppercase tracking-wide`}>
                Suggested Questions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    disabled={isLoading}
                    className={`text-xs px-3 py-1.5 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDarkMode
                        ? "border border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                disabled={isLoading}
                className={`flex-1 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition ${
                  isDarkMode
                    ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
