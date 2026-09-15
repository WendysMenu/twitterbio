"use client";
import { useState, useEffect } from "react";
import { useEffect } from "react";

function NativeAd() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pl31351417.profitableratecpmnetwork.com/2e7082e789ee952c6c92ca80807feec2/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-6 flex justify-center items-center">
      <div id="container-2e7082e789ee952c6c92ca80807feec2"></div>
    </div>
  );
}

export default function Home() {
  const [input, setInput] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    setRoast("");
    setCopied(false);

    try {
      const response = await fetch("/api/together", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      if (data.result) {
        setRoast(data.result);
      } else {
        setRoast(data.error || "Failed to generate roast.");
      }
    } catch (err) {
      setRoast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    const text = encodeURIComponent(`I just got roasted by AI 🔥:\n\n"${roast.slice(0, 200)}..."\n\nGet roasted here:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center px-4 my-8">
      <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-pulse">
        🔥 Brutal AI Critic Online
      </div>

      <h1 className="sm:text-6xl text-4xl font-extrabold text-slate-900 max-w-[750px] tracking-tight leading-tight">
        Get Your Website or Profile <span className="text-red-600 underline decoration-wavy">Savage Roasted</span>
      </h1>

      <form onSubmit={generateRoast} className="max-w-xl w-full mt-8">
        <div className="flex items-center space-x-3 mb-3">
          <span className="bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shadow-md">1</span>
          <p className="text-left font-semibold text-slate-800">Drop your website URL, LinkedIn link, or Bio text.</p>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full rounded-2xl border-2 border-slate-200 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 p-4 text-slate-900 transition-all text-base outline-none resize-none"
          placeholder="e.g. https://tesla.com or 'I build cool web apps...'"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-2xl px-6 py-4 mt-4 w-full transition-all shadow-lg shadow-red-600/30 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Cooking Up A Savage Roast...
            </span>
          ) : (
            "Destroy My Pride 🔥"
          )}
        </button>
      </form>

      {roast && (
        <div className="max-w-xl w-full mt-8 text-left bg-slate-950 text-slate-100 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <h2 className="text-xl font-bold text-white tracking-wide">The Verdict</h2>
            </div>
            <span className="bg-red-600/20 text-red-400 border border-red-500/30 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Brutal Mode
            </span>
          </div>

          <div className="text-slate-200 leading-relaxed font-sans text-base whitespace-pre-wrap space-y-3">
            {roast}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-slate-800">
            <button
              onClick={copyToClipboard}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 border border-slate-700"
            >
              {copied ? "✅ Copied!" : "📋 Copy Roast"}
            </button>
            <button
              onClick={shareOnX}
              className="flex-1 bg-white text-slate-950 hover:bg-slate-200 font-bold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2"
            >
              𝕏 Share on Twitter
            </button>
          </div>
          <NativeAd/>
        </div>
      )}
    </main>
  );
}
