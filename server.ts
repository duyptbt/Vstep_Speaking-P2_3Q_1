import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initializer for Google GenAI to handle missing keys gracefully on startup
let genaiInstance: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genaiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please add it in Settings > Secrets.");
    }
    genaiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genaiInstance;
}

// REST API endpoint: Evaluate user speaking draft
app.post("/api/evaluate", async (req, res) => {
  try {
    const { topicLabel, situation, selectedChoiceName, otherChoicesNames, draftText } = req.body;

    if (!draftText || draftText.trim() === "") {
      return res.status(400).json({ error: "Draft text cannot be empty." });
    }

    const ai = getGenAI();

    const systemInstruction = `You are an expert VSTEP Trainer specializing in Part 2: Solution Discussion (preparing and reviewing written outlines/scripts for speaking practice). 
The VSTEP (Vietnamese Standardized Test of English Proficiency) Speaking Part 2 requires a candidate to:
1. Discuss a given situation and select the best option among three provided alternatives.
2. Justify why their chosen option is the best (advantages).
3. Contrast and reject the other two options (disadvantages/drawbacks).
4. Provide a cohesive conclusion.

The structural framework is SOCA:
- S: Situation & Choice (Introduce the scenario and state choice)
- O: Own Option Advantages (Develop chosen option advantages)
- C: Comparison & Rejection (Critique and dismiss the other two options)
- A: Conclusion (Natural wrap-up)

Evaluate the candidate's script specifically as an oral presentation (bài nói). Under the 'vocabulary' or 'fluency' critique, you MUST identify 3-5 challenging or advanced words they used, and provide their exact phonetic transcriptions using the International Phonetic Alphabet (IPA) (e.g., 'strategic' /strəˈtiː.dʒɪk/) along with concrete Vietnamese tips to help them practice speaking these words with correct stress and vowels. Encourage natural spoken transitions, proper pauses, and speech rhythm suitable for a 3-minute VSTEP oral discussion.`;

    const prompt = `Topic: ${topicLabel}
Situation: ${situation}
Candidate Chosen Option: ${selectedChoiceName}
Other Options Rejected: ${otherChoicesNames.join(", ")}

Candidate's draft kịch bản text:
"""
${draftText}
"""

Evaluate this script according to the VSTEP framework. Estimate if they are in Band B1 (4.0-5.5), Band B2 (6.0-8.0), or Band C1 (8.5-10.0).
Organize your response according to the requested JSON schema. Make sure the 'revisedVersion' splits their draft into S, O, C, A steps but in a polished, highly-effective version in English (correcting grammar, improving style and transition words). Include details of grammar errors and how to fix them in the critique.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.STRING,
              description: "Estimated score band in Vietnamese, e.g. 'B2 (7.0)' or 'B1 (5.0)'",
            },
            band: {
              type: Type.STRING,
              description: "Must be exactly 'B1', 'B2', or 'C1'",
            },
            overallFeedback: {
              type: Type.STRING,
              description: "Positive summary feedback pointing out what they did well and where to focus, in Vietnamese.",
            },
            critique: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.STRING, description: "Feedback on the overall flow, transition phrases, and written fluency/layout of the script in Vietnamese." },
                vocabulary: { type: Type.STRING, description: "Critique of their lexical choices, highlighting word improvements, in Vietnamese." },
                grammar: { type: Type.STRING, description: "Grammatical error corrections, stating specific mistakes and fixes, in Vietnamese." },
                coherence: { type: Type.STRING, description: "Critique of transition phrases and logical flow in Vietnamese." },
              },
              required: ["fluency", "vocabulary", "grammar", "coherence"],
            },
            frameworkAnalysis: {
              type: Type.OBJECT,
              properties: {
                s: { type: Type.STRING, description: "Evaluation of their Situation & Choice step in Vietnamese." },
                o: { type: Type.STRING, description: "Evaluation of how they developed their Chosen Option in Vietnamese." },
                c: { type: Type.STRING, description: "Evaluation of how they analyzed and rejected the other two options in Vietnamese." },
                a: { type: Type.STRING, description: "Evaluation of their concluding remarks in Vietnamese." },
              },
              required: ["s", "o", "c", "a"],
            },
            revisedVersion: {
              type: Type.OBJECT,
              properties: {
                s: { type: Type.STRING, description: "Polished and corrected English sentence(s) representing the 'S' (Situation & Choice) segment." },
                o: { type: Type.STRING, description: "Polished and corrected English sentence(s) representing the 'O' (Own Option Advantages) segment." },
                c: { type: Type.STRING, description: "Polished and corrected English sentence(s) representing the 'C' (Comparison & Rejection) segment." },
                a: { type: Type.STRING, description: "Polished and corrected English sentence(s) representing the 'A' (Conclusion) segment." },
              },
              required: ["s", "o", "c", "a"],
            },
          },
          required: ["score", "band", "overallFeedback", "critique", "frameworkAnalysis", "revisedVersion"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini API");
    }

    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Evaluation error:", error);
    res.status(500).json({ error: error.message || "An error occurred during evaluation." });
  }
});

// REST API endpoint: Generate high-quality model speaking script
app.post("/api/generate-answer", async (req, res) => {
  try {
    const { topicLabel, situation, selectedChoiceName, otherChoicesNames, band } = req.body;

    const ai = getGenAI();

    const systemInstruction = `You are a professional native English educator specializing in VSTEP training.
Generate a cohesive VSTEP Speaking Part 2 Solution Discussion speech.
Structure it strictly using the S-O-C-A framework:
- S: Situation & Choice (Paraphrase the situation and state choice)
- O: Own Option Advantages (Explain benefits of your choice)
- C: Comparison & Rejection (Critique and dismiss the other two options)
- A: Conclusion (Natural summary)

Target Band: ${band}.
- For B1: Keep sentences clear, relatively short, use standard transition markers (Firstly, Secondly, On the other hand, In conclusion), very realistic and reachable.
- For B2: Use richer vocabulary, more advanced structures, natural personal connections, and well-developed arguments.
- For C1: Use idiomatic English, advanced vocabulary (e.g., socioeconomic impact, logistical challenges, puts the cart before the horse), elegant transitions, and profound reasoning.`;

    const prompt = `Topic: ${topicLabel}
Situation: ${situation}
Chosen Option: ${selectedChoiceName}
Other Options: ${otherChoicesNames.join(", ")}
Target VSTEP Band: ${band}

Generate a complete model speaking script divided into S, O, C, A components. Also provide a detailed Vietnamese critique/explanation ('note') describing why this speech belongs to the ${band} band, including specific vocabulary highlights and syntactic patterns.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            s: { type: Type.STRING, description: "Polished VSTEP Part 2 opening + choice in English." },
            o: { type: Type.STRING, description: "Chosen option benefits section in English." },
            c: { type: Type.STRING, description: "Other two options critique and dismissal in English." },
            a: { type: Type.STRING, description: "Wrap-up closing statement in English." },
            note: { type: Type.STRING, description: "Vietnamese annotation detailing why this meets the target band, highlighting vocabulary and sentence structures." },
          },
          required: ["s", "o", "c", "a", "note"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini API");
    }

    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Generation error:", error);
    res.status(500).json({ error: error.message || "An error occurred during answer generation." });
  }
});

// Configure Vite or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
