export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = JSON.parse(req.body);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.message || "API Error" });
    }

    const data = await response.json();
    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
