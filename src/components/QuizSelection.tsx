
import React from 'react';
import { Subject, Quiz } from '../types';
import { ArrowLeftIcon } from './icons';

interface QuizSelectionProps {
  subject: Subject;
  quizzes: Pick<Quiz, 'id' | 'title'>[];
  onSelectQuiz: (quiz: Pick<Quiz, 'id' | 'title'>) => void;
  onBack: () => void;
}

const QuizSelection: React.FC<QuizSelectionProps> = ({ subject, quizzes, onSelectQuiz, onBack }) => {
  return (
    <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl animate-fade-in">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-700 transition-colors mr-4">
          <ArrowLeftIcon className="w-6 h-6 text-slate-300" />
        </button>
        <h2 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${subject.color}`}>
          {subject.name}
        </h2>
      </div>
      <p className="text-slate-300 mb-8 text-lg">Vui lòng chọn một đề thi để bắt đầu:</p>
      <div className="space-y-4">
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <button
              key={quiz.id}
              onClick={() => onSelectQuiz(quiz)}
              className="w-full text-left p-5 rounded-lg bg-slate-700/50 hover:bg-purple-600/30 border border-slate-600 hover:border-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="font-semibold text-xl text-white">{`Đề ${index + 1}: ${quiz.title}`}</span>
            </button>
          ))
        ) : (
          <p className="text-slate-400">Chưa có đề thi nào cho môn học này.</p>
        )}
      </div>
    </div>
  );
};

export default QuizSelection;