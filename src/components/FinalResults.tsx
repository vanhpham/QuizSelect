'use client';

interface FinalResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function FinalResults({ score, total, onRestart }: FinalResultsProps) {
  const percentage = Math.round((score / total) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) return "Sắp bằng tao rồi";
    if (percentage >= 80) return "Hay";
    if (percentage >= 70) return "Thông minh hơn Sơn đấy";
    if (percentage >= 60) return "M khá!";
    return "Ngoo 🐒";
  };

  const getResultColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        ĐON !
      </h2>
      
      <div className="mb-8">
        <div className={`text-6xl font-bold mb-4 ${getResultColor()}`}>
          {percentage}%
        </div>
        <div className="text-xl text-gray-600 mb-2">
          Bạn đã trả lời đúng {score} / {total} câu hỏi
        </div>
        <div className={`text-2xl font-semibold ${getResultColor()}`}>
          {getResultMessage()}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
      >
        Làm lại bài quiz
      </button>
    </div>
  );
}
