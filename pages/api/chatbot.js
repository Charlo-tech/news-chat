// pages/api/chatbot.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { knowledgeBase } from "../../utils/stackupKnowledgeBase";  // Import the updated knowledge base

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Define the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "Give short answers. Ask questions when in doubt. Any question outside Stackup should be ignored, and an apology should be issued to the user.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Check if the query is related to Stackup
const isStackupRelated = (query) => {
  const keywords = ['stackup', 'hackathon', 'learn', 'pathways', 'campaigns'];
  return keywords.some(keyword => query.toLowerCase().includes(keyword.toLowerCase()));
};

// Get predefined answer from the knowledge base
const getKnowledgeBaseAnswer = (query) => {
  const normalizedQuery = query.toLowerCase().trim();
  return knowledgeBase[normalizedQuery] || null;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { query } = req.body;

    // Ensure the user has provided a query
    if (!query) {
      return res.status(400).json({ error: "No query provided" });
    }

    // Check the knowledge base first
    const knowledgeBaseAnswer = getKnowledgeBaseAnswer(query);
    if (knowledgeBaseAnswer) {
      return res.status(200).json({ answer: knowledgeBaseAnswer });
    }

    // Check if the query is related to Stackup
    if (!isStackupRelated(query)) {
      return res.status(200).json({ answer: "Sorry, I can only respond to questions related to Stackup. Please try again with a Stackup-specific question." });
    }

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: "**User Question:** " + query }],
          },
        ],
      });

      const result = await chatSession.sendMessage("");
      const answer = await result.response.text();

      return res.status(200).json({ answer });
    } catch (error) {
      console.error("Error querying Gemini API:", error);
      return res.status(500).json({ error: "Error querying chatbot." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }
}
