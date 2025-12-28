
import React from 'react';

interface ResultsViewProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ score, totalQuestions, onRestart, onGoHome }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getFeedback = () => {
    if (percentage === 100) return "Xuất sắc! Bạn thật tuyệt vời!";
    if (percentage >= 80) return "Làm tốt lắm! Gần như hoàn hảo!";
    if (percentage >= 50) return "Khá tốt! Hãy cố gắng hơn ở lần sau nhé!";
    return "Đừng nản lòng, hãy ôn tập và thử lại nào!";
  };

  return (
    <div className="w-full max-w-2xl text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-10 shadow-2xl animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400">
        Kết quả
      </h2>
      <p className="text-xl text-slate-300 mb-8">{getFeedback()}</p>
      
      <div className="my-10">
        <div className={`relative w-48 h-48 mx-auto flex items-center justify-center rounded-full bg-slate-700`}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4a5568"
              strokeWidth="3"
            />
            <path
              className="transition-all duration-1000 ease-out"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
             <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-bold text-white">{percentage}%</span>
            <span className="text-slate-300">{score} / {totalQuestions} câu đúng</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition-colors"
        >
          Làm lại
        </button>
        <button
          onClick={onGoHome}
          className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default ResultsView;