import { formatTime } from '../utils/formatTime';

interface TimerDisplayProps {
  elapsedSeconds: number;
}

export function TimerDisplay({ elapsedSeconds }: TimerDisplayProps) {
  return (
    <div className="timer-display">
      <span className="timer-label">Time:</span>
      <span className="timer-value">{formatTime(elapsedSeconds)}</span>
    </div>
  );
}

