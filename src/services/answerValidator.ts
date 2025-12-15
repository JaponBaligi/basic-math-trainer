import type { Question } from '../types';

export function validateAnswer(question: Question, userAnswer: string): boolean {
  const parsedAnswer = parseInt(userAnswer, 10);
  
  if (Number.isNaN(parsedAnswer)) {
    return false;
  }
  
  return parsedAnswer === question.correctAnswer;
}

