import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "Give short answers. Ask questions when in doubt. Any question outside stackup is to be ignored an an apology issued to the user.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(question) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: "**User Question:** " + question },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(""); // Empty message for consistency
  console.log(result.response.text());
}

function Chatbot() {
  const [question, setQuestion] = useState("");

  const handleButtonClick = () => {
    if (question) {
      run(question);
    }
  };

  return (
    <div>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your question for Stackie" />
      <button onClick={handleButtonClick}>Ask Stackie</button>
    </div>
  );
}

export default Chatbot;