interface FeedbackDisplayProps {
  isCorrect: boolean;
  correctAnswer: number;
}

export function FeedbackDisplay({ isCorrect, correctAnswer }: FeedbackDisplayProps) {
  if (isCorrect) {
    return (
      <div className="feedback feedback-correct">
        ✓ Correct!
      </div>
    );
  }

  return (
    <div className="feedback feedback-incorrect">
      ✗ Incorrect. The correct answer is {correctAnswer}
    </div>
  );
}

