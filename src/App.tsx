
import React, { useState, useMemo, useEffect } from 'react';
import { Subject, Quiz as QuizType } from './types';
import { getAvailableQuizzes, generateQuizWithAI } from './services/quizService';
import HomeComponent from './components/HomeComponent';
import QuizSelection from './components/QuizSelection';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import Chatbot from './components/Chatbot';
// FIX: ApiKeyPrompt is no longer used as the API key is handled by environment variables.
// import ApiKeyPrompt from './components/ApiKeyPrompt';

type View = 'HOME' | 'QUIZ_SELECTION' | 'QUIZ' | 'RESULTS';

const App: React.FC = () => {
  // FIX: Removed useState for apiKey. The API key should be accessed via process.env.API_KEY directly in services as per guidelines. This resolves the `import.meta.env` error.
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [view, setView] = useState<View>('HOME');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);


  useEffect(() => {
    // Load the list of available subjects and quiz topics (without questions)
    setSubjects(getAvailableQuizzes());
  }, []);

  // FIX: Removed handleApiKeySubmit as the UI no longer prompts for an API key.

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setView('QUIZ_SELECTION');
  };

  const handleSelectQuiz = async (quizInfo: { id: string, title: string }) => {
    // FIX: API key is no longer managed in the component's state.
    if (!selectedSubject) {
        return;
    }
    
    setIsGeneratingQuiz(true);
    // FIX: API key is no longer passed as an argument. The service will use process.env.API_KEY.
    const generatedQuiz = await generateQuizWithAI(selectedSubject.name, quizInfo.title);
    setIsGeneratingQuiz(false);

    if (generatedQuiz) {
      setSelectedQuiz(generatedQuiz);
      setView('QUIZ');
    }
    // If quiz generation fails, an alert is shown in the service, and the user stays on the selection screen.
  };

  const handleQuizFinish = (finalScore: number) => {
    setScore(finalScore);
    setView('RESULTS');
  };

  const handleRestart = () => {
    // Regenerate the quiz for a new set of questions
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
            <h2 className="text-3xl font-bold text-white mb-4">AI đang tạo đề thi...</h2>
            <p className="text-slate-300">Vui lòng chờ trong giây lát.</p>
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

  // FIX: Removed ApiKeyPrompt and related conditional rendering. The app now assumes process.env.API_KEY is available.
  return (
    <div className="bg-slate-900 min-h-screen text-white relative overflow-hidden">
      {backgroundView}
      <main className="relative z-10 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
        {renderContent()}
      </main>
      <Chatbot />
    </div>
  );
};

export default App;
