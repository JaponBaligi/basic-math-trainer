import { useState, useCallback } from 'react';
import type { GameConfig, GameState } from '../types';
import { generateQuestion } from '../services/questionGenerator';
import { validateAnswer } from '../services/answerValidator';

const DEFAULT_CONFIG: GameConfig = {
  allowTwoDigitOperations: false,
  difficultyLevel: 'MIXED',
};

export function useMathGame(config: GameConfig = DEFAULT_CONFIG) {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: null,
    userAnswer: '',
    isCorrect: null,
    showFeedback: false,
    isTimeout: false,
  });

  const startNewQuestion = useCallback(() => {
    const newQuestion = generateQuestion(config);
    setGameState({
      currentQuestion: newQuestion,
      userAnswer: '',
      isCorrect: null,
      showFeedback: false,
      isTimeout: false,
    });
  }, [config]);

  const handleAnswerSubmit = useCallback((isTimeout: boolean = false) => {
    setGameState((prev) => {
      if (!prev.currentQuestion) {
        return prev;
      }

      const isValid = validateAnswer(prev.currentQuestion, prev.userAnswer);
      return {
        ...prev,
        isCorrect: isValid,
        showFeedback: true,
        isTimeout,
      };
    });
  }, []);

  const handleAnswerChange = useCallback((value: string) => {
    setGameState((prev) => ({
      ...prev,
      userAnswer: value,
    }));
  }, []);

  const handleNextQuestion = useCallback(() => {
    startNewQuestion();
  }, [startNewQuestion]);

  return {
    gameState,
    startNewQuestion,
    handleAnswerSubmit,
    handleAnswerChange,
    handleNextQuestion,
  };
}

