import { useEffect, useState, useRef } from 'react';
import type { GameConfig, DifficultyLevel } from './types';
import { useLanguage } from './contexts/LanguageContext';
import { useMathGame } from './hooks/useMathGame';
import { useTimer } from './hooks/useTimer';
import { QuestionDisplay } from './components/QuestionDisplay';
import { AnswerInput } from './components/AnswerInput';
import { SubmitButton } from './components/SubmitButton';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { NextButton } from './components/NextButton';
import { ConfigToggle } from './components/ConfigToggle';
import { DifficultySelector } from './components/DifficultySelector';
import { TimerDisplay } from './components/TimerDisplay';
import { LanguageSelector } from './components/LanguageSelector';
import './App.css';

function App() {
  const [config, setConfig] = useState<GameConfig>({
    allowTwoDigitOperations: false,
    difficultyLevel: 'MIXED',
  });
  const [timerEnabled, setTimerEnabled] = useState(false);
  const questionIdRef = useRef<number>(0);

  const { t } = useLanguage();
  const { gameState, startNewQuestion, handleAnswerSubmit, handleAnswerChange, handleNextQuestion } = useMathGame(config);
  const timer = useTimer(false, 20);

  useEffect(() => {
    startNewQuestion();
    questionIdRef.current += 1;
  }, [startNewQuestion, config]);

  useEffect(() => {
    if (timerEnabled && gameState.currentQuestion && !gameState.showFeedback) {
      const currentQuestionId = questionIdRef.current;
      timer.reset();
      timer.start();
      
      return () => {
        if (currentQuestionId === questionIdRef.current) {
          timer.stop();
        }
      };
    } else if (!timerEnabled) {
      timer.stop();
      timer.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerEnabled, gameState.currentQuestion, gameState.showFeedback]);

  useEffect(() => {
    const currentQuestionId = questionIdRef.current;
    if (timer.isExpired && !gameState.showFeedback && gameState.currentQuestion && timerEnabled && timer.isRunning === false) {
      if (currentQuestionId === questionIdRef.current) {
        handleAnswerSubmit(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.isExpired, timer.isRunning, gameState.showFeedback, gameState.currentQuestion, timerEnabled]);

  const canSubmit = gameState.userAnswer.trim() !== '' && !gameState.showFeedback;
  const showFeedback = gameState.showFeedback && gameState.currentQuestion;
  const showNextButton = gameState.showFeedback;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1>{t.appTitle}</h1>
          <LanguageSelector />
        </div>
        <DifficultySelector
          difficultyLevel={config.difficultyLevel}
          onSelect={(level: DifficultyLevel) => setConfig({ ...config, difficultyLevel: level })}
        />
        <ConfigToggle
          allowTwoDigitOperations={config.allowTwoDigitOperations}
          onToggle={(value) => setConfig({ ...config, allowTwoDigitOperations: value })}
        />
        <label className="config-toggle">
          <input
            type="checkbox"
            checked={timerEnabled}
            onChange={(e) => setTimerEnabled(e.target.checked)}
            className="config-checkbox"
          />
          <span className="config-label">{t.enableTimer}</span>
        </label>
        {timerEnabled && <TimerDisplay remainingSeconds={timer.remainingSeconds} isExpired={timer.isExpired} />}
      </header>
      
      <main className="app-main">
        {gameState.currentQuestion && (
          <>
            <QuestionDisplay question={gameState.currentQuestion} />
            
            <div className="input-section">
              <AnswerInput
                value={gameState.userAnswer}
                onChange={handleAnswerChange}
                onSubmit={() => handleAnswerSubmit(false)}
                disabled={gameState.showFeedback || timer.isExpired}
              />
              {!showNextButton && (
                <SubmitButton onClick={() => handleAnswerSubmit(false)} disabled={!canSubmit} />
              )}
            </div>

            {showFeedback && gameState.isCorrect !== null && (
              <FeedbackDisplay
                isCorrect={gameState.isCorrect}
                correctAnswer={gameState.currentQuestion.correctAnswer}
                isTimeout={gameState.isTimeout}
              />
            )}

            {showNextButton && (
              <NextButton onClick={() => {
                if (timerEnabled) {
                  timer.reset();
                }
                handleNextQuestion();
              }} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
