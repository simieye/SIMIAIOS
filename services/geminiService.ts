
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../types";

// Always initialize the client using the API_KEY from process.env inside a factory or at the call site.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const calculateSovereignScore = async (urlOrContent: string, lang: Language = 'zh') => {
  const ai = getAI();
  const systemInstruction = `You are a Simiai Growth Mentor. 
  Your core philosophy is: "You Are the Hero, We Are the Tool."
  Your target audience includes: Super Individuals, SOHO sellers, B2B exporters, B2C/C2C brands, and source factories.
  
  Evaluate the business potential based on:
  1. Sovereignty Maturity (Data ownership, independent brand sites).
  2. Logic Depth (Lige Five Steps mastery).
  3. Efficiency Potential (Gary Workflows for 90% automation).
  4. Channel Readiness (Bridging TikTok viral clips to Redmond's 10,000+ global shelves).
  
  Provide a "Success Index" (0-100) and 3 tips focused on "YOU" and "YOUR" growth.`;

  const prompt = lang === 'zh' 
    ? `评估该创业者的主权主宰潜力：${urlOrContent}。请从英雄叙事视角出发，告诉他们如何利用 AI 成为不可阻挡的商业精英。以 JSON 格式输出。`
    : `Evaluate this entrepreneur's sovereign potential: ${urlOrContent}. Empower them with hero-centric logic. Output as JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Success Index from 0 to 100" },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 technical tips to empower the hero's personal growth"
          }
        },
        required: ["score", "tips"]
      }
    }
  });
  const jsonStr = response.text?.trim() || '{}';
  return JSON.parse(jsonStr);
};

export const runMarketingWorkflow = async (prompt: string, model: string = 'gemini-3-flash-preview', lang: Language = 'zh') => {
  const ai = getAI();
  const systemPrompt = lang === 'zh' 
    ? `作为 Simiai OS 增长导师。帮助用户解决：${prompt}。信条：用户是主宰，AI 是最强锋刃。目标：运营效率提升 10 倍。使用中文。`
    : `Act as a Simiai Growth Mentor. creed: "You lead, we execute." Task: ${prompt}. Goal: 10x operational efficiency. Use English.`;

  const response = await ai.models.generateContent({
    model,
    contents: systemPrompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text;
};

export const chatWithModel = async (messages: {role: string, content: string}[], model: string = 'gemini-3-flash-preview', lang: Language = 'zh') => {
  const ai = getAI();
  const lastMessage = messages[messages.length - 1].content;
  
  const instruction = lang === 'zh'
    ? "你是一个名为 Simiai 的增长导师。你的信条是‘你是英雄，我们是工具’。你专门为超级个体、外贸 SOHO、工厂主和中小企业提供赋能。你鼓励用户拿回数据与决策的主权，主宰自己的生意与人生。始终使用中文。"
    : "You are the Simiai Growth Mentor. Philosophy: 'You Are the Hero, We Are the Tool.' You empower Super Individuals, SOHO, Factories, and SMEs. Encourage sovereignty and confidence. Always respond in English.";

  const chat = ai.chats.create({
    model,
    config: {
        systemInstruction: instruction,
    }
  });

  const response = await chat.sendMessage({ message: lastMessage });
  return response.text;
};
