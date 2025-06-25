import Papa from 'papaparse';
import { Question } from '@/types/quiz';

export const parseCSVData = (csvText: string): Question[] => {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data.map((row: any, index: number) => ({
    id: index + 1,
    question: row['Câu hỏi'] || '',
    optionA: row['Lựa chọn A'] || '',
    optionB: row['Lựa chọn B'] || '',
    optionC: row['Lựa chọn C'] || '',
    optionD: row['Lựa chọn D'] || '',
    correctAnswer: (row['Đáp án đúng'] || 'A') as 'A' | 'B' | 'C' | 'D',
  })).filter(question => question.question.trim() !== '');
};

export const getOptionText = (question: Question, option: 'A' | 'B' | 'C' | 'D'): string => {
  switch (option) {
    case 'A': return question.optionA;
    case 'B': return question.optionB;
    case 'C': return question.optionC;
    case 'D': return question.optionD;
    default: return '';
  }
};
