import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize the client
// Note: In a real production app, ensure the key is safe. 
// For this prototype, we assume process.env.API_KEY is available via the environment.
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const createChatSession = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are "EquiBot", a world-class equestrian assistant for "The EquiDex". 
            You are knowledgeable about horse care, riding disciplines (Show Jumping, Dressage, Eventing), 
            stable management, and luxury equestrian equipment. 
            Your tone is professional, encouraging, and refined. 
            Keep answers concise but helpful.`,
        },
    });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await chat.sendMessage({ 
            message: message 
        });
        
        // Using the correct property access for the new SDK
        return response.text || "Je n'ai pas pu générer de réponse.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Désolé, je rencontre des difficultés techniques pour le moment.";
    }
};