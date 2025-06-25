'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export default function ProgressBar({ current, total, score }: ProgressBarProps) {
  const progressPercentage = (current / total) * 100;
  
  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Câu hỏi {current} / {total}
        </span>
        <span className="text-sm font-medium text-gray-700">
          Điểm: {score} / {current - 1}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-primary-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
