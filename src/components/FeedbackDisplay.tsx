interface FeedbackDisplayProps {
  isCorrect: boolean;
  correctAnswer: number;
  isTimeout: boolean;
}

export function FeedbackDisplay({ isCorrect, correctAnswer, isTimeout }: FeedbackDisplayProps) {
  if (isCorrect) {
    return (
      <div className="feedback feedback-correct">
        ✓ Correct!
      </div>
    );
  }

  if (isTimeout) {
    return (
      <div className="feedback feedback-incorrect">
        ⏱ Time is up. The correct answer is {correctAnswer}
      </div>
    );
  }

  return (
    <div className="feedback feedback-incorrect">
      ✗ Incorrect. The correct answer is {correctAnswer}
    </div>
  );
}

