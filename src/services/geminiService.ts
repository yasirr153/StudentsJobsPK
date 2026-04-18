import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY! 
});

export interface JobRewriteResult {
  title: string;
  summary: string;
  requirements: string[];
  tags: string[];
  description: string;
}

export async function rewriteJobContent(rawTitle: string, rawDescription: string): Promise<JobRewriteResult> {
  const prompt = `
    You are an expert HR content creator specializing in the Pakistani job market for students and fresh graduates.
    
    TASK: Rewrite the following job information to be more engaging, readable, and SEO-optimized.
    - Rewrite the title if it's generic.
    - Summarize the requirements into a clean list.
    - Create a concise summary (under 200 characters) for a job card.
    - Extract 5 key skill tags.
    - Clean up the main description.
    
    RAW JOB TITLE: ${rawTitle}
    RAW JOB DESCRIPTION: ${rawDescription}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            requirements: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            description: { type: Type.STRING }
          },
          required: ["title", "summary", "requirements", "tags", "description"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as JobRewriteResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to rewrite job content");
  }
}
