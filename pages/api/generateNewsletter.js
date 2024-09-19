// pages/api/newsletter.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY; // Ensure you have this in your .env file
const genAI = new GoogleGenerativeAI(apiKey);

// Define the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "Summarize the following news articles into a concise, engaging newsletter.",
});

const generationConfig = {
  temperature: 0.7,  // Controls randomness
  topP: 0.95,
  topK: 50,
  maxOutputTokens: 1024,  // Adjust based on newsletter length
  responseMimeType: "text/plain",
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;

    // Ensure news content is provided
    if (!content || !Array.isArray(content)) {
      return res.status(400).json({ error: "Invalid content provided" });
    }

    try {
      // Create a summary of all news articles into a newsletter format
      const articlesText = content.map(article => `${article.title}: ${article.description}`).join('\n\n');

      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: `Generate a newsletter from the following news:\n${articlesText}` }],
          },
        ],
      });

      // Get AI-generated newsletter
      const result = await chatSession.sendMessage("");
      const newsletter = await result.response.text();

      return res.status(200).json({ newsletter });
    } catch (error) {
      console.error("Error generating newsletter:", error);
      return res.status(500).json({ error: "Failed to generate newsletter." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}