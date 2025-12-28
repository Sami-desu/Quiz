
import React, { useState, useEffect } from 'react';
import { Quiz } from '../types';
import { checkAnswersWithAI } from '../services/quizService';

interface QuizViewProps {
  quiz: Quiz;
  onFinish: (score: number) => void;
  // FIX: Removed apiKey prop. The key is now handled by the service.
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onFinish }) => {
  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="w-full max-w-3xl text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">Lỗi</h2>
        <p className="text-slate-300">Đề thi này không có câu hỏi nào.</p>
      </div>
    );
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [timeLeft, setTimeLeft] = useState(quiz.questions.length * 30); // 30s per question
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (isSubmitting) return; // Pause timer during submission
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitting, quiz]); // Added quiz dependency to reset timer on new quiz

  useEffect(() => {
    // Reset state when a new quiz is generated (e.g., on restart)
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(quiz.questions.length * 30);
  }, [quiz]);

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // FIX: The apiKey is no longer passed to checkAnswersWithAI.
      const score = await checkAnswersWithAI(quiz.questions, selectedAnswers);
      onFinish(score);
    } catch (error) {
      // Error is already handled inside the service with an alert
      setIsSubmitting(false); // Re-enable button on error
    }
    // No finally block to set isSubmitting to false, as the component will unmount on success
  };
  
  const getOptionClass = (option: string) => {
    const isSelected = selectedAnswers[currentQuestion.id] === option;
    return `w-full text-left p-4 my-2 rounded-lg border-2 transition-all duration-300 ease-in-out cursor-pointer text-lg
      ${isSelected 
        ? 'bg-purple-600 border-purple-400 shadow-lg text-white' 
        : 'bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-purple-500'
      }`;
  };

  return (
    <div className="w-full max-w-3xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-10 shadow-2xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-slate-300">
          <span>Câu hỏi {currentQuestionIndex + 1}/{totalQuestions}</span>
          <span className="font-semibold">{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div className="bg-gradient-to-r from-purple-500 to-sky-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-100">{currentQuestion.question}</h2>
        <div>
          {currentQuestion.options.map((option, index) => (
            <button key={index} onClick={() => handleSelectAnswer(option)} className={getOptionClass(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button onClick={handleNext} className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors transform hover:scale-105">
            Câu tiếp theo
          </button>
        ) : (
          <button 
            onClick={handleSubmit} 
            className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang chấm điểm...' : 'Nộp bài'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
