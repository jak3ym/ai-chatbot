
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // Preflight request
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    console.log("Received message:", message);
    console.log("Using API key:", process.env.OPENROUTER_API_KEY ? "[set]" : "[not set]");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [{ role: "user", content: message }],
      }),
    });

    console.log("OpenRouter response status:", response.status);

    let data;
    try {
      data = await response.json();
      console.log("OpenRouter response data:", data);
    } catch (jsonErr) {
      console.error("Failed to parse OpenRouter response as JSON", jsonErr);
      return res.status(500).json({ error: "Failed to parse OpenRouter response as JSON" });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "API Error" });
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      console.error("No valid reply in OpenRouter response", data);
      return res.status(500).json({ error: "No valid reply from OpenRouter API" });
    }

    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
