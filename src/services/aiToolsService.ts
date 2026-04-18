import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateCoverLetter = async (params: {
  jobTitle: string;
  companyName: string;
  skills: string;
  experienceLevel: string;
  tone: 'formal' | 'casual';
  length: 'short' | 'detailed';
}) => {
  const prompt = `Write a ${params.tone} and ${params.length} cover letter for a ${params.jobTitle} position at ${params.companyName}. 
  The candidate has the following skills: ${params.skills}. 
  The candidate's experience level is: ${params.experienceLevel}.
  Format it professionally.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const improveResume = async (resumeText: string) => {
  const prompt = `Act as a professional career coach. Review and improve the following resume text to make it more professional, impactful, and clear. 
  Focus on better wording, action verbs, and grammar. 
  Return only the improved version.
  
  Resume:
  ${resumeText}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const simplifyJobDescription = async (jdText: string) => {
  const prompt = `Simplify the following job description. Break it down into easy-to-understand language. 
  Highlight the key requirements and responsibilities in bullet points.
  
  Job Description:
  ${jdText}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const extractSkills = async (jdText: string) => {
  const prompt = `Extract a list of required skills, tools, and technologies from the following job description. 
  Format it as a clean list.
  
  Job Description:
  ${jdText}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const generateEmail = async (params: {
  type: 'Application' | 'Follow-up' | 'Inquiry';
  jobTitle: string;
  companyName: string;
}) => {
  const prompt = `Write a professional ${params.type} email for the ${params.jobTitle} position at ${params.companyName}.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const generateCoverLetterFromResume = async (params: {
  resumeText: string;
  jobTitle: string;
  companyName: string;
}) => {
  const prompt = `Write a professional cover letter for a ${params.jobTitle} position at ${params.companyName} based on the following resume content:
  
  Resume:
  ${params.resumeText}
  
  Format it professionally.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};
