import React, { useState } from 'react';

interface ApiKeyPromptProps {
  onSubmit: (key: string) => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) {
      setError('Vui lòng nhập API key');
      return;
    }
    onSubmit(input);
    setInput('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2">API Key Gemini</h2>
      <p className="text-slate-300 mb-6">Nhập API key của bạn để bắt đầu sử dụng ứng dụng</p>
      
      <input
        type="password"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError('');
        }}
        onKeyPress={handleKeyPress}
        placeholder="Nhập API key của bạn..."
        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 mb-4"
      />
      
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
      >
        Xác nhận
      </button>
      
      <p className="text-slate-400 text-xs mt-4">
        Bạn có thể lấy API key từ{' '}
        <a
          href="https://aistudio.google.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 underline"
        >
           Google AI Studio
        </a>
      </p>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ApiKeyPrompt;
