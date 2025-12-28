import React, { useState, useMemo, useEffect } from 'react';
import { Subject, Quiz as QuizType } from './types';
import { getAvailableQuizzes, generateQuizWithAI } from './services/quizService';
import HomeComponent from './components/HomeComponent';
import QuizSelection from './components/QuizSelection';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import Chatbot from './components/Chatbot';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import { setApiKey, getApiKey } from './services/apiKeyService';

type View = 'HOME' | 'QUIZ_SELECTION' | 'QUIZ' | 'RESULTS';

const App: React.FC = () => {
  const [isKeySet, setIsKeySet] = useState(!!getApiKey());
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [view, setView] = useState<View>('HOME');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  useEffect(() => {
    setSubjects(getAvailableQuizzes());
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setIsKeySet(true);
  };

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setView('QUIZ_SELECTION');
  };

  const handleSelectQuiz = async (quizInfo: { id: string, title: string }) => {
    if (!selectedSubject) return;
    
    setIsGeneratingQuiz(true);
    const generatedQuiz = await generateQuizWithAI(selectedSubject.name, quizInfo.title);
    setIsGeneratingQuiz(false);

    if (generatedQuiz) {
      setSelectedQuiz(generatedQuiz);
      setView('QUIZ');
    }
  };

  const handleQuizFinish = (finalScore: number) => {
    setScore(finalScore);
    setView('RESULTS');
  };

  const handleRestart = () => {
    if (selectedQuiz) {
        handleSelectQuiz({ id: selectedQuiz.id, title: selectedQuiz.title });
    }
  };

  const handleGoHome = () => {
    setView('HOME');
    setSelectedSubject(null);
    setSelectedQuiz(null);
    setScore(0);
  };

  const currentQuizzes = useMemo(() => {
    return subjects.find(s => s.id === selectedSubject?.id)?.quizzes || [];
  }, [selectedSubject, subjects]);
  
  const renderContent = () => {
    if (isGeneratingQuiz) {
      return (
        <div className="text-center">
            <div role="status" className="flex justify-center items-center mb-4">
                <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5424 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span className="sr-only">Loading...</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">AI đang tạo đề thi...</h2>
            <p className="text-slate-300">Việc này có thể mất một vài giây, vui lòng chờ nhé.</p>
        </div>
      );
    }

    switch (view) {
      case 'QUIZ_SELECTION':
        return selectedSubject && (
          <QuizSelection
            subject={selectedSubject}
            quizzes={currentQuizzes}
            onSelectQuiz={handleSelectQuiz}
            onBack={handleGoHome}
          />
        );
      case 'QUIZ':
        return selectedQuiz && (
          <QuizView
            quiz={selectedQuiz}
            onFinish={handleQuizFinish}
          />
        );
      case 'RESULTS':
        return selectedQuiz && (
          <ResultsView
            score={score}
            totalQuestions={selectedQuiz.questions?.length || 0}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
          />
        );
      case 'HOME':
      default:
        return <HomeComponent subjects={subjects} onSelectSubject={handleSelectSubject} />;
    }
  };

  const backgroundView = (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-900"></div>
      <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-sky-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
    </>
  );

  if (!isKeySet) {
    return (
      <div className="bg-slate-900 min-h-screen text-white relative overflow-hidden flex items-center justify-center p-4">
        {backgroundView}
        <ApiKeyPrompt onSubmit={handleApiKeySubmit} />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white relative overflow-hidden">
      {backgroundView}
      <main className="relative z-10 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
        {renderContent()}
      </main>
      <Chatbot isKeySet={isKeySet} />
    </div>
  );
};

export default App;
