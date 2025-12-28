
import { GoogleGenAI, Chat } from "@google/genai";

// FIX: The apiKey parameter is removed. The function now uses process.env.API_KEY directly.
export const createChatSession = (): Chat | null => {
    // FIX: The check for a passed-in apiKey is removed, assuming process.env.API_KEY is available.
    try {
        // FIX: The GoogleGenAI constructor now exclusively uses process.env.API_KEY.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
