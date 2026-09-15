"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    setRoast("");

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

  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center px-4 mt-8">
      <h1 className="sm:text-6xl text-4xl font-bold text-slate-900 max-w-[700px]">
        Get Your Website or Profile Savage Roasted 🔥
      </h1>

      <form onSubmit={generateRoast} className="max-w-xl w-full mt-8">
        <div className="flex items-center space-x-3 mb-3">
          <span className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">1</span>
          <p className="text-left font-medium text-black">Drop your website URL, LinkedIn link, or Bio text.</p>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-3 border text-black"
          placeholder="e.g. https://tesla.com or paste bio text..."
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-6 mt-4 hover:bg-black/80 w-full disabled:opacity-50"
        >
          {loading ? "Roasting..." : "Roast Me 🔥"}
        </button>
      </form>

      {roast && (
        <div className="max-w-xl w-full mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl text-left">
          <h2 className="text-xl font-bold mb-4 text-black">The Roast 🔥</h2>
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed font-mono">{roast}</p>
        </div>
      )}
    </main>
  );
}
