import { formatTime } from '../utils/formatTime';

interface TimerDisplayProps {
  remainingSeconds: number;
  isExpired: boolean;
}

export function TimerDisplay({ remainingSeconds, isExpired }: TimerDisplayProps) {
  return (
    <div className={`timer-display ${isExpired ? 'timer-expired' : ''}`}>
      <span className="timer-label">Time:</span>
      <span className="timer-value">{formatTime(remainingSeconds)}</span>
    </div>
  );
}

