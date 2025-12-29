export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions?: Question[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  quizzes: Pick<Quiz, 'id' | 'title'>[];
}

export interface AnswerReview {
  id: number;
  correctAnswer: string;
  userAnswer?: string;
  isCorrect: boolean;
}

export interface ReviewResult {
  score: number;
  total: number;
  reviews: AnswerReview[];
}
