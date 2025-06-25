'use client'

import { useState, useEffect } from 'react'
import { Question } from '@/types/quiz'
import { parseCSVData, getOptionText } from '@/utils/csvParser'

export default function AllQuestionsView() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/question.csv')
        if (!response.ok) {
          throw new Error('Failed to load questions')
        }
        const csvText = await response.text()
        const parsedQuestions = parseCSVData(csvText)
        setQuestions(parsedQuestions)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  const getChoiceLetter = (index: number) => {
    return String.fromCharCode(65 + index) // A, B, C, D
  }

  const getChoiceText = (question: Question, choice: 'A' | 'B' | 'C' | 'D') => {
    return getOptionText(question, choice)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải câu hỏi...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Lỗi: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Tất cả câu hỏi và đáp án
          </h1>
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">Tổng số câu hỏi: {questions.length}</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Làm đi
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Câu {index + 1}: {question.question}
                </h2>
              </div>

              <div className="grid gap-3 mb-4">
                {(['A', 'B', 'C', 'D'] as const).map((choiceLetter) => {
                  const choiceText = getChoiceText(question, choiceLetter)
                  const isCorrect = choiceLetter === question.correctAnswer
                  
                  // Skip empty choices
                  if (!choiceText.trim()) return null
                  
                  return (
                    <div
                      key={choiceLetter}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        isCorrect
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : 'bg-gray-50 border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-start">
                        <span className={`font-semibold mr-3 ${
                          isCorrect ? 'text-green-700' : 'text-gray-600'
                        }`}>
                          {choiceLetter}.
                        </span>
                        <span className="flex-1">{choiceText}</span>
                        {isCorrect && (
                          <span className="ml-2 text-green-600 font-bold">✓ Đáp án đúng</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <strong>Đáp án đúng: {question.correctAnswer}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}
