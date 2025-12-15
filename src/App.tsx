import { useEffect, useState } from 'react';
import type { GameConfig, DifficultyLevel } from './types';
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
import './App.css';

function App() {
  const [config, setConfig] = useState<GameConfig>({
    allowTwoDigitOperations: false,
    difficultyLevel: 'MIXED',
  });
  const [timerEnabled, setTimerEnabled] = useState(false);

  const { gameState, startNewQuestion, handleAnswerSubmit, handleAnswerChange, handleNextQuestion } = useMathGame(config);
  const timer = useTimer(timerEnabled);

  useEffect(() => {
    startNewQuestion();
  }, [startNewQuestion, config]);

  useEffect(() => {
    if (timerEnabled) {
      timer.start();
    } else {
      timer.stop();
      timer.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerEnabled]);

  const canSubmit = gameState.userAnswer.trim() !== '' && !gameState.showFeedback;
  const showFeedback = gameState.showFeedback && gameState.currentQuestion;
  const showNextButton = gameState.showFeedback;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mental Math Trainer</h1>
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
          <span className="config-label">Enable timer</span>
        </label>
        {timerEnabled && <TimerDisplay elapsedSeconds={timer.elapsedSeconds} />}
      </header>
      
      <main className="app-main">
        {gameState.currentQuestion && (
          <>
            <QuestionDisplay question={gameState.currentQuestion} />
            
            <div className="input-section">
              <AnswerInput
                value={gameState.userAnswer}
                onChange={handleAnswerChange}
                onSubmit={handleAnswerSubmit}
                disabled={gameState.showFeedback}
              />
              {!showNextButton && (
                <SubmitButton onClick={handleAnswerSubmit} disabled={!canSubmit} />
              )}
            </div>

            {showFeedback && gameState.isCorrect !== null && (
              <FeedbackDisplay
                isCorrect={gameState.isCorrect}
                correctAnswer={gameState.currentQuestion.correctAnswer}
              />
            )}

            {showNextButton && (
              <NextButton onClick={handleNextQuestion} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
