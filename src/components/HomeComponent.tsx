
import React from 'react';
import { Subject } from '../types';

interface HomeComponentProps {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
}

const SubjectCard: React.FC<{ subject: Subject; onClick: () => void }> = ({ subject, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative w-full p-6 rounded-2xl bg-slate-800/60 hover:bg-slate-700/80 transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden border border-slate-700 hover:border-purple-500`}
  >
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${subject.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
    <div className="flex items-center space-x-6">
      <div className={`text-5xl transition-transform duration-300 group-hover:scale-110`}>
        {subject.icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white tracking-wide">{subject.name}</h3>
        <p className="text-slate-400">{subject.quizzes.length} đề thi có sẵn</p>
      </div>
    </div>
  </button>
);


const HomeComponent: React.FC<HomeComponentProps> = ({ subjects, onSelectSubject }) => {
  return (
    <div className="w-full max-w-3xl text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400">
        Quiz Học Tập Thông Minh
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-12">
        Chọn một môn học để bắt đầu thử thách kiến thức của bạn!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} onClick={() => onSelectSubject(subject)} />
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;