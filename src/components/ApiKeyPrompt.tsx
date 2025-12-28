
import React, { useState } from 'react';

interface ApiKeyPromptProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-white">Chào mừng!</h2>
      <p className="text-slate-300 mb-6">
        Để sử dụng Trợ lý AI, vui lòng nhập API Key của bạn từ Google AI Studio.
        Key của bạn sẽ chỉ được lưu trong phiên truy cập này.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Nhập API Key của bạn vào đây"
          className="w-full bg-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={!apiKey.trim()}
        >
          Bắt đầu
        </button>
      </form>
      <p className="text-xs text-slate-400 mt-4">
        Bạn chưa có API key? Lấy key tại{' '}
        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
          Google AI Studio
        </a>.
      </p>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ApiKeyPrompt;