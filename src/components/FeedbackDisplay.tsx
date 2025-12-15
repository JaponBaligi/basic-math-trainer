import { useLanguage } from '../contexts/LanguageContext';

interface FeedbackDisplayProps {
  isCorrect: boolean;
  correctAnswer: number;
  isTimeout: boolean;
}

export function FeedbackDisplay({ isCorrect, correctAnswer, isTimeout }: FeedbackDisplayProps) {
  const { t } = useLanguage();
  
  if (isCorrect) {
    return (
      <div className="feedback feedback-correct">
        ✓ {t.correct}
      </div>
    );
  }

  if (isTimeout) {
    return (
      <div className="feedback feedback-incorrect">
        ⏱ {t.timeIsUp} {t.theCorrectAnswerIs} {correctAnswer}
      </div>
    );
  }

  return (
    <div className="feedback feedback-incorrect">
      ✗ {t.incorrect} {t.theCorrectAnswerIs} {correctAnswer}
    </div>
  );
}

