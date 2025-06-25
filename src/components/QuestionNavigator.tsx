'use client';

import { Question } from '@/types/quiz';

interface QuestionNavigatorProps {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: { [key: number]: 'A' | 'B' | 'C' | 'D' };
  onQuestionSelect: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestionNavigator({
  questions,
  currentQuestionIndex,
  userAnswers,
  onQuestionSelect,
  isOpen,
  onClose
}: QuestionNavigatorProps) {
  if (!isOpen) return null;

  const getQuestionStatus = (index: number) => {
    if (index === currentQuestionIndex) return 'current';
    if (userAnswers[index]) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-blue-500 text-white border-blue-500';
      case 'answered':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Danh sách câu hỏi ({questions.length} câu)
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questions.map((question, index) => {
              const status = getQuestionStatus(index);
              const statusColor = getStatusColor(status);
              
              return (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 ${statusColor}`}
                  onClick={() => {
                    onQuestionSelect(index);
                    onClose();
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-bold text-sm">
                      Câu {index + 1}
                    </span>
                    <div className="flex items-center space-x-1">
                      {status === 'current' && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          Hiện tại
                        </span>
                      )}
                      {status === 'answered' && (
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                          Đã trả lời
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm line-clamp-3 text-gray-700">
                    {question.question}
                  </p>
                  
                  {userAnswers[index] && (
                    <div className="mt-2 text-xs text-gray-600">
                      Đáp án đã chọn: <span className="font-semibold">{userAnswers[index]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Câu hiện tại</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span>Đã trả lời</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                <span>Chưa trả lời</span>
              </div>
            </div>
            <div>
              <span className="font-semibold">
                {Object.keys(userAnswers).length}/{questions.length}
              </span> câu đã trả lời
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
