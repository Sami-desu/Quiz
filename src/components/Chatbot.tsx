import React, { useState, useRef, useEffect } from 'react';
import { createChatSession } from '../services/geminiService';
import { ChatIcon, CloseIcon, SendIcon, BrainIcon, UserIcon } from './icons';
import { Chat } from '@google/genai';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotProps {
  isKeySet: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ isKeySet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isKeySet) {
      const session = createChatSession();
      setMessages([
        { text: 'Chào bạn, tôi là trợ lý học tập AI. Bạn cần giúp gì không?', sender: 'bot' }
      ]);
      if (session) {
        setChat(session);
      } else {
        setMessages(prev => [...prev, { text: 'Không thể khởi tạo trợ lý AI. Vui lòng kiểm tra lại cấu hình API key.', sender: 'bot' }]);
      }
    } else {
        setMessages([
            { text: 'Vui lòng nhập API key để bắt đầu trò chuyện.', sender: 'bot'}
        ]);
    }
  }, [isKeySet]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading || !chat) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessage({ message: input });
      const text = result.text;
      const botMessage: Message = { text: text || "Tôi không thể xử lý yêu cầu này.", sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        const errorMessage: Message = { text: 'Xin lỗi, đã có lỗi xảy ra khi giao tiếp với AI. Vui lòng thử lại.', sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <CloseIcon className="w-8 h-8" /> : <ChatIcon className="w-8 h-8" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-40 animate-fade-in-up">
          <div className="p-4 border-b border-slate-700 flex items-center">
            <BrainIcon className="w-8 h-8 text-purple-400 mr-3" />
            <h3 className="text-xl font-bold text-white">Trợ lý học tập</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center"><BrainIcon className="w-5 h-5 text-white" /></div>}
                <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                  {msg.text}
                </div>
                 {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-slate-600 flex-shrink-0 flex items-center justify-center"><UserIcon className="w-5 h-5 text-white" /></div>}
              </div>
            ))}
            {isLoading && (
               <div className="flex items-start gap-3 justify-start">
                 <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center"><BrainIcon className="w-5 h-5 text-white" /></div>
                 <div className="px-4 py-3 bg-slate-700 rounded-2xl rounded-bl-none">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center bg-slate-700 rounded-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={!chat ? "Nhập API key để bắt đầu" : "Nhập câu hỏi của bạn..."}
                className="flex-1 bg-transparent px-5 py-3 text-white placeholder-slate-400 focus:outline-none"
                disabled={isLoading || !chat}
              />
              <button onClick={handleSendMessage} className="p-3 text-purple-400 hover:text-purple-300 disabled:text-slate-500 disabled:cursor-not-allowed" disabled={isLoading || !chat}>
                <SendIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
