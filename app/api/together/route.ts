export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY missing in Vercel." }), { status: 500 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a savage, hilarious, and sarcastic AI critic. Roast the user's input in 3 brutal yet funny bullet points. End with a 'Savage Score: X/10'."
          },
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || "Groq API error" }), { status: 500 });
    }

    const output = data.choices?.[0]?.message?.content || "Could not generate roast.";
    return new Response(JSON.stringify({ result: output }));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server connection failed." }), { status: 500 });
  }
}

export const runtime = "edge";
