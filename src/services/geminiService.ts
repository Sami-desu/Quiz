import { GoogleGenAI, Chat } from "@google/genai";

export const createChatSession = (): Chat | null => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
        console.error("API key for Gemini is required. Make sure to set VITE_API_KEY in your .env file.");
        return null;
    }
    
    try {
        const ai = new GoogleGenAI({ apiKey });
        return ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: 'Bạn là một trợ lý học tập thân thiện và hữu ích. Hãy trả lời các câu hỏi của học sinh một cách rõ ràng, ngắn gọn, và khuyến khích họ tư duy. Hãy giao tiếp bằng tiếng Việt.',
            },
        });
    } catch (error) {
        console.error("Failed to initialize GoogleGenAI. Please check if the API key is valid.", error);
        return null;
    }
};
