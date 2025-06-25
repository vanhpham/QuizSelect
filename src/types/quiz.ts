export interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  showResult: boolean;
  score: number;
  totalQuestions: number;
  isComplete: boolean;
}
