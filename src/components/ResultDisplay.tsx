'use client';

import { Question } from '@/types/quiz';
import { getOptionText } from '@/utils/csvParser';

interface ResultDisplayProps {
  question: Question;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

export default function ResultDisplay({ question, selectedAnswer, isCorrect }: ResultDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <div className={`inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-lg ${
          isCorrect ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {isCorrect ? '✓ Chính xác!' : '✗ NGU!'}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Câu {question.id}: {question.question}
        </h3>
        
        <div className="space-y-3">
          <div className="p-4 bg-green-100 border-2 border-green-500 rounded-lg">
            <span className="font-bold text-green-800">Đáp án đúng: {question.correctAnswer}. </span>
            <span className="text-green-700">{getOptionText(question, question.correctAnswer)}</span>
          </div>
          
          {!isCorrect && (
            <div className="p-4 bg-red-100 border-2 border-red-500 rounded-lg">
              <span className="font-bold text-red-800">Bạn đã chọn: {selectedAnswer}. </span>
              <span className="text-red-700">{getOptionText(question, selectedAnswer)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
