import { GoogleGenAI, Type } from "@google/genai";
import { Quiz, Question, Subject } from '../types';

// Hardcoded list of subjects and topics for the UI. No questions or answers are stored here.
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

// This function dynamically generates a quiz using the Gemini API.
export const generateQuizWithAI = async (subjectName: string, quizTitle: string): Promise<Quiz | null> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    alert("Lỗi: Không tìm thấy API key. Không thể tạo đề thi.");
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
        throw new Error("Phản hồi từ AI không hợp lệ.");
    }
    const result = JSON.parse(text.trim());
    
    // Construct a Quiz object to be used by the UI
    const newQuiz: Quiz = {
        id: `${subjectName}-${quizTitle}-${Date.now()}`, // Unique ID for the generated quiz
        title: quizTitle,
        questions: result.questions,
    };
    return newQuiz;

  } catch (error) {
    console.error("Error generating quiz with AI:", error);
    alert("Đã có lỗi xảy ra trong quá trình tạo đề thi bằng AI. Vui lòng thử lại.");
    return null;
  }
};


// This function securely checks answers by sending the questions and user answers to the AI.
export const checkAnswersWithAI = async (questions: Question[], userAnswers: { [key: number]: string }): Promise<number> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    alert("Lỗi: Không tìm thấy API key. Không thể chấm điểm.");
    return 0;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Bạn là một giám khảo chấm thi trắc nghiệm. Dưới đây là danh sách các câu hỏi đã được đưa cho thí sinh, và bài làm của họ.
      Nhiệm vụ của bạn là:
      1. Với mỗi câu hỏi, hãy xác định đáp án nào là đúng.
      2. So sánh đáp án đúng đó với câu trả lời của thí sinh.
      3. Tính tổng số câu trả lời đúng.
      Chỉ trả về kết quả dưới dạng một đối tượng JSON duy nhất có khóa là "score".

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
            score: {
              type: Type.INTEGER,
              description: 'Tổng số câu trả lời đúng.'
            },
          },
          required: ["score"],
        },
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("Phản hồi từ AI không hợp lệ.");
    }
    const result = JSON.parse(text.trim());

    if (typeof result.score === 'number') {
      return result.score;
    } else {
      console.error("AI response did not contain a valid score.", result);
      return 0;
    }

  } catch (error) {
    console.error("Error checking answers with AI:", error);
    alert("Đã có lỗi xảy ra trong quá trình chấm điểm bằng AI. Vui lòng thử lại.");
    return 0;
  }
};