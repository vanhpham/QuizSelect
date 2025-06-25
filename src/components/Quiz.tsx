'use client';

import { useState, useEffect } from 'react';
import { Question, QuizState } from '@/types/quiz';
import { parseCSVData } from '@/utils/csvParser';
import QuestionCard from '@/components/QuestionCard';
import ResultDisplay from '@/components/ResultDisplay';
import ProgressBar from '@/components/ProgressBar';
import FinalResults from '@/components/FinalResults';
import QuestionNavigator from '@/components/QuestionNavigator';

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showResult: false,
    score: 0,
    totalQuestions: 0,
    isComplete: false,
  });
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: 'A' | 'B' | 'C' | 'D' }>({});
  const [showNavigator, setShowNavigator] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await fetch('/question.csv');
      if (!response.ok) {
        throw new Error('Failed to load questions');
      }
      
      const csvText = await response.text();
      const parsedQuestions = parseCSVData(csvText);
      
      if (parsedQuestions.length === 0) {
        throw new Error('No valid questions found in CSV file');
      }
      
      setQuestions(parsedQuestions);
      setQuizState(prev => ({
        ...prev,
        totalQuestions: parsedQuestions.length,
      }));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
    }));
  };

  const handleSubmitAnswer = () => {
    if (!quizState.selectedAnswer) return;

    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = quizState.selectedAnswer === currentQuestion.correctAnswer;
    
    // Save the answer
    setUserAnswers(prev => ({
      ...prev,
      [quizState.currentQuestionIndex]: quizState.selectedAnswer!
    }));
    
    setQuizState(prev => ({
      ...prev,
      showResult: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNextQuestion = () => {
    const nextIndex = quizState.currentQuestionIndex + 1;
    
    if (nextIndex >= questions.length) {
      setQuizState(prev => ({
        ...prev,
        isComplete: true,
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedAnswer: userAnswers[nextIndex] || null,
        showResult: false,
      }));
    }
  };

  const handleQuestionJump = (questionIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: questionIndex,
      selectedAnswer: userAnswers[questionIndex] || null,
      showResult: false,
    }));
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0,
      totalQuestions: questions.length,
      isComplete: false,
    });
    setUserAnswers({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">CHỜ VỘI C...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadQuestions}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Ôn cmm vhkd&ttkn đi 
          </h1>
          <p className="text-gray-600 mb-4">
            làm đi 
          </p>
          <div className="mb-6 space-x-4">
            <button
              onClick={() => window.location.href = '/all-questions'}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Xem tất cả câu hỏi & đáp án
            </button>
            <button
              onClick={() => setShowNavigator(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Danh sách câu hỏi ({Object.keys(userAnswers).length}/{questions.length})
            </button>
          </div>
        </header>

        {quizState.isComplete ? (
          <FinalResults
            score={quizState.score}
            total={quizState.totalQuestions}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <ProgressBar
              current={quizState.currentQuestionIndex + 1}
              total={quizState.totalQuestions}
              score={quizState.score}
            />

            {quizState.showResult && quizState.selectedAnswer ? (
              <>
                <ResultDisplay
                  question={currentQuestion}
                  selectedAnswer={quizState.selectedAnswer}
                  isCorrect={quizState.selectedAnswer === currentQuestion.correctAnswer}
                />
                <div className="text-center mt-6">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                  >
                    {quizState.currentQuestionIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <QuestionCard
                  question={currentQuestion}
                  selectedAnswer={quizState.selectedAnswer}
                  onAnswerSelect={handleAnswerSelect}
                  showResult={quizState.showResult}
                  disabled={false}
                />
                <div className="text-center mt-6">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!quizState.selectedAnswer}
                    className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                  >
                    Xác nhận đáp án
                  </button>
                </div>
              </>
            )}
          </>
        )}

        <QuestionNavigator
          questions={questions}
          currentQuestionIndex={quizState.currentQuestionIndex}
          userAnswers={userAnswers}
          onQuestionSelect={handleQuestionJump}
          isOpen={showNavigator}
          onClose={() => setShowNavigator(false)}
        />
      </div>
    </div>
  );
}
