
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Language, ContentType, GeoDiagnostic, GeoKnowledgeUnit } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * System Health & Admin Stats
 */
export const fetchSystemHealth = async () => {
  await new Promise(r => setTimeout(r, 800));
  return {
    uptime: '99.99%',
    activeNodes: 1024,
    latency: '42ms',
    throughput: '15.2k req/s',
    sovereignEncryption: 'AES-256-GCM',
    computeUsage: 64
  };
};

/**
 * Global GEO Intelligence Data
 */
export const fetchGeoIntelligence = async () => {
  await new Promise(r => setTimeout(r, 1200));
  return [
    { region: 'North America', visibility: 88, dominance: 'High', trending: 'AI Search' },
    { region: 'Europe', visibility: 72, dominance: 'Medium', trending: 'Compliance' },
    { region: 'Southeast Asia', visibility: 91, dominance: 'Very High', trending: 'Live Commerce' },
    { region: 'Middle East', visibility: 45, dominance: 'Low', trending: 'Luxury Retail' },
  ];
};

/**
 * Knowledge Base: Upload and process a knowledge unit
 */
export const processKnowledgeUnit = async (title: string, body: string): Promise<GeoKnowledgeUnit> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Extract top 3 tags for this knowledge unit: ${title}\n\n${body}. JSON format: ["tag1", "tag2", "tag3"]`,
    config: { responseMimeType: "application/json" }
  });
  
  const tags = JSON.parse(response.text || '[]');
  return {
    id: Math.random().toString(36).substr(2, 9),
    contentId: 'local-kb',
    orderIndex: 0,
    title,
    body,
    tags,
    embeddingStatus: 'PROCESSED'
  };
};

/**
 * Neural Training: Simulate fine-tuning epoch
 */
export const runFineTuningEpoch = async (instruction: string, samples: string[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Fine-tuning simulation based on: ${instruction}. Review these samples: ${samples.join('|')}. Return a summary of improvements and estimated loss reduction.`,
  });
  return response.text;
};

/**
 * Batch GEO: Mass content generation with factor weights
 */
export const generateBatchGeoContent = async (baseTopic: string, count: number, factorWeights: Record<string, number>) => {
  const ai = getAI();
  const weightSummary = Object.entries(factorWeights)
    .filter(([_, v]) => v > 0)
    .map(([k, v]) => `${k}: ${v}%`)
    .join(', ');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate ${count} diverse GEO-optimized snippets about ${baseTopic}. 
    STRICT STRATEGY WEIGHTS: ${weightSummary}. 
    Ensure higher weight factors are more prominent in the text. 
    Return JSON array of objects with {title, text, dominantFactor}.`,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: "You are a batch GEO content engine. Generate high-utility, citation-ready content snippets optimized for LLM retrieval."
    }
  });
  return JSON.parse(response.text || '[]');
};

/**
 * Tool definition for fetching URL content (Simulating Firecrawl MCP Server)
 */
const fetchUrlTool: FunctionDeclaration = {
  name: 'firecrawl_fetch',
  parameters: {
    type: Type.OBJECT,
    description: 'Use Firecrawl MCP to crawl a URL and extract clean markdown content for AI analysis.',
    properties: {
      url: {
        type: Type.STRING,
        description: 'The target URL to crawl.',
      },
    },
    required: ['url'],
  },
};

/**
 * Fetch URL content via Firecrawl Simulation
 */
export const fetchUrlContent = async (url: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Please use the firecrawl_fetch tool to get the content of this page: ${url}. Then, extract the main body text suitable for GEO (Generative Engine Optimization) analysis.`,
    config: {
      tools: [{ functionDeclarations: [fetchUrlTool] }],
      systemInstruction: "You are an expert at web content extraction via Firecrawl MCP. Get clean, semantically rich data. Ignore headers, footers, and scripts.",
    },
  });

  const fc = response.functionCalls?.find(c => c.name === 'firecrawl_fetch');
  if (fc) {
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl);
      const data = await res.json();
      const html = data.contents;
      
      const doc = new DOMParser().parseFromString(html, 'text/html');
      ['script', 'style', 'nav', 'footer', 'header', 'aside', 'iframe'].forEach(tag => {
        doc.querySelectorAll(tag).forEach(el => el.remove());
      });
      
      const cleanText = doc.body.innerText.replace(/\s+/g, ' ').trim();
      return cleanText.substring(0, 12000); 
    } catch (e) {
      return "Firecrawl Error: Node 'firecrawl-v2' failed to reach the target domain. Please ensure the URL is public.";
    }
  }

  return response.text || "Firecrawl returned no content. The page might be protected or empty.";
};

/**
 * Mocking Product System Integration
 */
export const fetchShopifyProducts = async () => {
  await new Promise(r => setTimeout(r, 1000));
  return [
    { id: 'p1', title: 'Solar Inverter X-Pro 5000', description: 'High efficiency industrial solar inverter.', price: '$1200' },
    { id: 'p2', title: 'Smart Home Hub v2', description: 'Centralized control for all your smart devices.', price: '$299' },
    { id: 'p3', title: 'Titanium Camping Stove', description: 'Ultra-lightweight portable stove for professionals.', price: '$85' }
  ];
};

/**
 * Stage 1: GEO-analysis Diagnostic
 */
export const analyzeGeoDiagnostic = async (content: string): Promise<GeoDiagnostic> => {
  const ai = getAI();
  const systemInstruction = `You are a world-class GEO-analysis assistant. Analyze the content for: Authoritative, Statistics, Quotations, TechnicalTerms, Fluent, UniqueWords. Output JSON. Scores should be between 0 and 1.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Baseline Content for GEO Analysis:\n\n${content}`,
    config: {
      systemInstruction,
      temperature: 0,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          missingFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
          detectedFactors: {
            type: Type.OBJECT,
            properties: {
              Authoritative: { type: Type.NUMBER },
              Statistics: { type: Type.NUMBER },
              Quotations: { type: Type.NUMBER },
              TechnicalTerms: { type: Type.NUMBER },
              Fluent: { type: Type.NUMBER },
              UniqueWords: { type: Type.NUMBER }
            }
          },
          suggestedSources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                topic: { type: Type.STRING },
                url: { type: Type.STRING }
              }
            }
          },
          suggestedQuotes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                author: { type: Type.STRING },
                text: { type: Type.STRING },
                url: { type: Type.STRING }
              }
            }
          },
          keyTechnicalTerms: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["missingFactors", "detectedFactors", "suggestedSources", "suggestedQuotes", "keyTechnicalTerms"]
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  const values = Object.values(parsed.detectedFactors) as number[];
  parsed.overallScore = Math.round((values.reduce((a, b) => a + b, 0) / (values.length || 1)) * 100);
  
  return parsed as GeoDiagnostic;
};

/**
 * Stage 2: GEO-Content Optimization
 */
export const runGeoOptimization = async (content: string, factorWeights: Record<string, number>, diagnostic: GeoDiagnostic, lang: Language = 'zh') => {
  const ai = getAI();
  const weightSummary = Object.entries(factorWeights).map(([k, v]) => `${k}: ${v}%`).join(', ');
  
  const systemInstruction = `You are a world-class GEO (Generative Engine Optimization) expert. 
Optimize the provided content by explicitly prioritizing the following weighted factors: ${weightSummary}. 
Heavy prioritization should be given to factors with higher percentage values.
For Authoritative: Add expert persona and deep insights.
For Statistics: Inject quantitative data points.
For Quotes: Use relevant social proof or expert citations.
Output JSON with optimizedHtml, units, schema, citations, statistics, overallScore, and optimizedFactors.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Original Content: ${content}`,
    config: {
      systemInstruction,
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          optimizedHtml: { type: Type.STRING },
          units: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                body: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          schema: { type: Type.STRING },
          overallScore: { type: Type.NUMBER },
          optimizedFactors: {
            type: Type.OBJECT,
            properties: {
              Authoritative: { type: Type.NUMBER },
              Statistics: { type: Type.NUMBER },
              Quotations: { type: Type.NUMBER },
              TechnicalTerms: { type: Type.NUMBER },
              Fluent: { type: Type.NUMBER },
              UniqueWords: { type: Type.NUMBER }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

/**
 * Stage 3: Content Refinement
 */
export const refineGeoOptimization = async (currentManifest: any, feedback: string, factorWeights: Record<string, number>, diagnostic: GeoDiagnostic, lang: Language = 'zh') => {
  const ai = getAI();
  const weightSummary = Object.entries(factorWeights).map(([k, v]) => `${k}: ${v}%`).join(', ');
  
  const prompt = `
    User Instruction/Feedback: "${feedback}"
    Current Optimized Content: ${currentManifest.optimizedHtml}
    Target Strategy Weights: ${weightSummary}
    
    Refine the content based on the feedback while respecting the optimization priorities defined by the weights.
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { 
      responseMimeType: "application/json",
      systemInstruction: "You are a professional GEO editor. Apply user feedback precisely while preserving SEO/GEO structure. Maintain JSON schema.",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          optimizedHtml: { type: Type.STRING },
          units: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                body: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          schema: { type: Type.STRING },
          overallScore: { type: Type.NUMBER },
          optimizedFactors: {
            type: Type.OBJECT,
            properties: {
              Authoritative: { type: Type.NUMBER },
              Statistics: { type: Type.NUMBER },
              Quotations: { type: Type.NUMBER },
              TechnicalTerms: { type: Type.NUMBER },
              Fluent: { type: Type.NUMBER },
              UniqueWords: { type: Type.NUMBER }
            }
          }
        }
      }
    }
  });
  
  return JSON.parse(response.text || '{}');
};

/**
 * Simulation of Deployment
 */
export const deployGeoToMarketing = async (contentId: string, channel: 'google' | 'tiktok' | 'perplexity') => {
  await new Promise(r => setTimeout(r, 2000));
  return {
    status: 'SUCCESS',
    deployedUrl: `https://deployed.simiai.os/${channel}/${contentId}`,
    message: `Assets synced to ${channel.toUpperCase()} marketing node.`
  };
};

/**
 * BextAI Image Generation
 */
export const generateVisualContent = async (prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1") => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `Professional commercial product photography: ${prompt}. High-end lighting, 8k resolution.` }]
    },
    config: {
      imageConfig: { aspectRatio }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image data returned from model.");
};

/**
 * Snov.io B2B Lead Intelligence
 */
export const fetchB2BLeadsIntelligence = async (domain: string, targetRole: string) => {
  const ai = getAI();
  const prompt = `Simulate Snov.io v2 API lead discovery for domain "${domain}" seeking "${targetRole}". 
  Provide 5 realistic mock leads (Name, Position, Simulated Email) and a tailored cold email sequence. 
  Output ONLY JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          leads: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                position: { type: Type.STRING },
                email: { type: Type.STRING }
              }
            }
          },
          sequence: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                body: { type: Type.STRING },
                delayDays: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const chatWithModel = async (messages: {role: string, content: string}[], model: string = 'gemini-3-flash-preview', lang: Language = 'zh') => {
  const ai = getAI();
  const lastMessage = messages[messages.length - 1].content;
  const instruction = `You are Simiai OS Mentor. Help user master the sovereign AI ecosystem.`;
  const chat = ai.chats.create({ model, config: { systemInstruction: instruction } });
  const response = await chat.sendMessage({ message: lastMessage });
  return response.text;
};

export const calculateSovereignScore = async (content: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Evaluate BP/Content Sovereignty: ${content}. JSON: {score: number, breakdown: string[]}`,
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || '{}');
}
