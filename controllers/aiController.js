const axios = require("axios");
const Chat = require("../models/chat");

// ✅ Ask AI
exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY missing" });
    }

    const response = await axios.post(
      process.env.API_URL,
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.FRONTEND_URL,
          "X-Title": "My AI App",
        },
      },
    );

    const reply =
      response?.data?.choices?.[0]?.message?.content || "No response";

    res.json({ reply });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: "AI request failed",
      details: error.response?.data?.error?.message || error.message,
    });
  }
};

// ✅ Save Chat
exports.saveChat = async (req, res) => {
  try {
    const { prompt, response } = req.body;
    if (!prompt || !response) {
      return res
        .status(400)
        .json({ error: "Both prompt and response are required" });
    }
    const chat = await Chat.create({ prompt, response });

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Save failed" });
  }
};
