import { useState, useCallback } from 'react';
import type { Question, GameConfig, GameState } from '../types';
import { generateQuestion } from '../services/questionGenerator';
import { validateAnswer } from '../services/answerValidator';

const DEFAULT_CONFIG: GameConfig = {
  allowTwoDigitOperations: false,
};

export function useMathGame(config: GameConfig = DEFAULT_CONFIG) {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: null,
    userAnswer: '',
    isCorrect: null,
    showFeedback: false,
  });

  const startNewQuestion = useCallback(() => {
    const newQuestion = generateQuestion(config);
    setGameState({
      currentQuestion: newQuestion,
      userAnswer: '',
      isCorrect: null,
      showFeedback: false,
    });
  }, [config]);

  const handleAnswerSubmit = useCallback(() => {
    if (!gameState.currentQuestion) {
      return;
    }

    const isValid = validateAnswer(gameState.currentQuestion, gameState.userAnswer);
    setGameState((prev) => ({
      ...prev,
      isCorrect: isValid,
      showFeedback: true,
    }));
  }, [gameState.currentQuestion, gameState.userAnswer]);

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

