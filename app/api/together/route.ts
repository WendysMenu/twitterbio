export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
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
    const output = data.choices?.[0]?.message?.content || "Roast generation failed. Try again!";

    return new Response(output);
  } catch (error) {
    return new Response("Error connecting to AI service.");
  }
}

export const runtime = "edge";
