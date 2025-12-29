import { GoogleGenAI, Type } from "@google/genai";
import { Quiz, Question, Subject, ReviewResult } from '../types';
import { getApiKey } from './apiKeyService';

export const getAvailableQuizzes = (): Subject[] => ([
  {
    id: 'math',
    name: 'Toán học',
    icon: '🧮',
    color: 'from-blue-500 to-cyan-400',
    quizzes: [
      { id: 'math-1', title: 'Số học cơ bản' },
      { id: 'math-2', title: 'Hình học phẳng' },
      { id: 'math-3', title: 'Đại số' },
      { id: 'math-4', title: 'Lượng giác' },
    ],
  },
  {
    id: 'science',
    name: 'Khoa học',
    icon: '🔬',
    color: 'from-green-500 to-emerald-400',
    quizzes: [
      { id: 'science-1', title: 'Khoa học Trái Đất' },
      { id: 'science-2', title: 'Vật lý cơ học' },
      { id: 'science-3', title: 'Hóa học vô cơ' },
    ],
  },
  {
    id: 'history',
    name: 'Lịch sử',
    icon: '📜',
    color: 'from-amber-500 to-yellow-400',
    quizzes: [
      { id: 'history-1', title: 'Lịch sử Việt Nam' },
      { id: 'history-2', title: 'Lịch sử thế giới cổ đại' },
    ],
  },
  {
    id: 'literature',
    name: 'Văn học',
    icon: '📚',
    color: 'from-red-500 to-orange-400',
    quizzes: [
      { id: 'literature-1', title: 'Tác phẩm văn học Việt Nam' },
      { id: 'literature-2', title: 'Thơ ca trung đại' },
    ],
  },
  {
    id: 'geography',
    name: 'Địa lý',
    icon: '🌍',
    color: 'from-teal-500 to-lime-400',
    quizzes: [
      { id: 'geography-1', title: 'Địa lý tự nhiên Việt Nam' },
      { id: 'geography-2', title: 'Các châu lục trên thế giới' },
    ],
  },
  {
    id: 'english',
    name: 'Tiếng Anh',
    icon: '🇬🇧',
    color: 'from-pink-500 to-rose-400',
    quizzes: [
      { id: 'english-1', title: 'Ngữ pháp cơ bản (Thì)' },
      { id: 'english-2', title: 'Từ vựng chủ đề Du lịch' },
    ],
  },
]);

export const generateQuizWithAI = async (subjectName: string, quizTitle: string): Promise<Quiz | null> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    alert("Lỗi: Không tìm thấy API key. Vui lòng nhập API key của bạn.");
    return null;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Hãy tạo một bài thi trắc nghiệm gồm 5 câu hỏi về chủ đề "${quizTitle}" trong môn học "${subjectName}".
      Mỗi câu hỏi phải có 4 lựa chọn.
      Chỉ trả về kết quả dưới dạng một đối tượng JSON. Đối tượng này phải có một khóa "questions", là một mảng các đối tượng câu hỏi.
      Mỗi đối tượng câu hỏi phải có các khóa: "id" (số thứ tự từ 1), "question" (string), và "options" (mảng 4 string).
      
      **QUAN TRỌNG: KHÔNG được bao gồm khóa "correctAnswer" trong JSON trả về.**
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                },
                required: ["id", "question", "options"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("Phản hồi từ AI không hợp lệ hoặc rỗng.");
    }
    const result = JSON.parse(text.trim());
    
    const newQuiz: Quiz = {
        id: `${subjectName}-${quizTitle}-${Date.now()}`,
        title: quizTitle,
        questions: result.questions,
    };
    return newQuiz;

  } catch (error) {
    console.error("Lỗi khi tạo đề thi bằng AI:", error);
    alert("Đã có lỗi xảy ra trong quá trình tạo đề thi bằng AI. Vui lòng thử lại.");
    return null;
  }
};

export const checkAnswersWithAI = async (questions: Question[], userAnswers: { [key: number]: string }): Promise<ReviewResult> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    alert("Lỗi: Không tìm thấy API key. Không thể chấm điểm.");
    return {
      score: 0,
      total: questions.length,
      reviews: questions.map(q => ({ id: q.id, correctAnswer: '', userAnswer: userAnswers[q.id] ?? null, isCorrect: false })),
    };
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Bạn là một giám khảo chấm thi trắc nghiệm. Dưới đây là danh sách các câu hỏi đã được đưa cho thí sinh, và bài làm của họ.
      Nhiệm vụ của bạn là:
      1. Với mỗi câu hỏi, hãy xác định đáp án đúng (lấy ra chuỗi lựa chọn chính xác).
      2. So sánh đáp án đúng đó với câu trả lời của thí sinh.
      3. Tính tổng số câu trả lời đúng.
      Chỉ trả về kết quả dưới dạng một đối tượng JSON với cấu trúc sau:
      {
        "score": <số đúng>,
        "total": <tổng số câu>,
        "reviews": [
          { "id": <số>, "correctAnswer": <string>, "userAnswer": <string|null>, "isCorrect": <boolean> },
          ...
        ]
      }

      Dữ liệu câu hỏi:
      ${JSON.stringify(questions, null, 2)}

      Bài làm của thí sinh:
      ${JSON.stringify(userAnswers, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            total: { type: Type.INTEGER },
            reviews: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  correctAnswer: { type: Type.STRING },
                  userAnswer: { type: Type.STRING },
                  isCorrect: { type: Type.BOOLEAN },
                },
                required: ["id", "correctAnswer", "isCorrect"],
              }
            }
          },
          required: ["score", "total", "reviews"],
        },
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("Phản hồi từ AI không hợp lệ hoặc rỗng.");
    }
    const result = JSON.parse(text.trim());

    // Basic validation and normalization
    const score = typeof result.score === 'number' ? result.score : 0;
    const total = typeof result.total === 'number' ? result.total : questions.length;
    const reviews = Array.isArray(result.reviews) ? result.reviews.map((r: any) => ({
      id: r.id,
      correctAnswer: r.correctAnswer,
      userAnswer: r.userAnswer ?? null,
      isCorrect: !!r.isCorrect,
    })) : questions.map(q => ({ id: q.id, correctAnswer: '', userAnswer: userAnswers[q.id] ?? null, isCorrect: false }));

    const reviewResult: ReviewResult = {
      score,
      total,
      reviews,
    };

    return reviewResult;

  } catch (error) {
    console.error("Lỗi khi chấm điểm bằng AI:", error);
    alert("Đã có lỗi xảy ra trong quá trình chấm điểm bằng AI. Vui lòng thử lại.");
    return {
      score: 0,
      total: questions.length,
      reviews: questions.map(q => ({ id: q.id, correctAnswer: '', userAnswer: userAnswers[q.id] ?? null, isCorrect: false })),
    };
  }
};
