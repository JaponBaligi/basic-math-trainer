export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';

export interface Question {
  operand1: number;
  operand2: number;
  operation: Operation;
  correctAnswer: number;
}

export interface GameConfig {
  allowTwoDigitOperations: boolean;
}

export interface GameState {
  currentQuestion: Question | null;
  userAnswer: string;
  isCorrect: boolean | null;
  showFeedback: boolean;
}

