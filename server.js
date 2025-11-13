require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/recommend", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // lighter, fast, reliable model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    // Extract response text safely
    const aiResponse = completion.choices[0].message.content;
    res.json({ content: aiResponse });
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
