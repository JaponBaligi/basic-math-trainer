export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'MIXED';

export type QuestionType = 'standard' | 'fillInBlank';

export type MissingPosition = 'operand1' | 'operand2' | 'result';

export interface Question {
  operand1: number | null;
  operand2: number | null;
  operation: Operation;
  correctAnswer: number;
  questionType: QuestionType;
  missingPosition?: MissingPosition;
}

export interface GameConfig {
  allowTwoDigitOperations: boolean;
  difficultyLevel: DifficultyLevel;
}

export interface GameState {
  currentQuestion: Question | null;
  userAnswer: string;
  isCorrect: boolean | null;
  showFeedback: boolean;
  isTimeout: boolean;
}

