import { useEffect } from 'react';
import { useMathGame } from './hooks/useMathGame';
import { QuestionDisplay } from './components/QuestionDisplay';
import { AnswerInput } from './components/AnswerInput';
import { SubmitButton } from './components/SubmitButton';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { NextButton } from './components/NextButton';
import './App.css';

function App() {
  const { gameState, startNewQuestion, handleAnswerSubmit, handleAnswerChange, handleNextQuestion } = useMathGame();

  useEffect(() => {
    startNewQuestion();
  }, [startNewQuestion]);

  const canSubmit = gameState.userAnswer.trim() !== '' && !gameState.showFeedback;
  const showFeedback = gameState.showFeedback && gameState.currentQuestion;
  const showNextButton = gameState.showFeedback;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mental Math Trainer</h1>
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
