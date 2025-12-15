import { formatTime } from '../utils/formatTime';
import { useLanguage } from '../contexts/LanguageContext';

interface TimerDisplayProps {
  remainingSeconds: number;
  isExpired: boolean;
}

export function TimerDisplay({ remainingSeconds, isExpired }: TimerDisplayProps) {
  const { t } = useLanguage();
  return (
    <div className={`timer-display ${isExpired ? 'timer-expired' : ''}`}>
      <span className="timer-label">{t.time}</span>
      <span className="timer-value">{formatTime(remainingSeconds)}</span>
    </div>
  );
}

