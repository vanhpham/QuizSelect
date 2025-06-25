'use client';

import { Question } from '@/types/quiz';
import { getOptionText } from '@/utils/csvParser';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  onAnswerSelect: (answer: 'A' | 'B' | 'C' | 'D') => void;
  showResult: boolean;
  disabled: boolean;
}

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult, 
  disabled 
}: QuestionCardProps) {
  const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  const getOptionStyle = (option: 'A' | 'B' | 'C' | 'D') => {
    let baseStyle = "p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 text-left ";
    
    if (disabled) {
      baseStyle += "cursor-not-allowed opacity-50 ";
    }
    
    if (showResult) {
      if (option === question.correctAnswer) {
        baseStyle += "border-green-500 bg-green-100 text-green-800 ";
      } else if (option === selectedAnswer && option !== question.correctAnswer) {
        baseStyle += "border-red-500 bg-red-100 text-red-800 ";
      } else {
        baseStyle += "border-gray-300 bg-gray-50 ";
      }
    } else {
      if (selectedAnswer === option) {
        baseStyle += "border-primary-500 bg-primary-50 text-primary-700 ";
      } else {
        baseStyle += "border-gray-300 hover:border-primary-300 hover:bg-primary-50 ";
      }
    }
    
    return baseStyle;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Câu {question.id}: {question.question}
        </h2>
        
        <div className="space-y-4">
          {options.map((option) => {
            const optionText = getOptionText(question, option);
            if (!optionText.trim()) return null;
            
            return (
              <div
                key={option}
                className={getOptionStyle(option)}
                onClick={() => !disabled && !showResult && onAnswerSelect(option)}
              >
                <div className="flex items-start">
                  <span className="font-bold mr-3 text-lg">{option}.</span>
                  <span className="flex-1">{optionText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
