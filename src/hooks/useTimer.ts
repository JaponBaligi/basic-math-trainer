import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_COUNTDOWN_SECONDS = 20;

export interface TimerState {
  remainingSeconds: number;
  isRunning: boolean;
  isExpired: boolean;
}

export function useTimer(initialRunning: boolean = false, countdownSeconds: number = DEFAULT_COUNTDOWN_SECONDS) {
  const [state, setState] = useState<TimerState>({
    remainingSeconds: countdownSeconds,
    isRunning: initialRunning,
    isExpired: false,
  });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (state.isRunning && state.remainingSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setState((prev) => {
          const newRemaining = prev.remainingSeconds - 1;
          if (newRemaining <= 0) {
            return {
              ...prev,
              remainingSeconds: 0,
              isRunning: false,
              isExpired: true,
            };
          }
          return {
            ...prev,
            remainingSeconds: newRemaining,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.remainingSeconds]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true, isExpired: false }));
  }, []);

  const stop = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ remainingSeconds: countdownSeconds, isRunning: false, isExpired: false });
  }, [countdownSeconds]);

  return {
    remainingSeconds: state.remainingSeconds,
    isRunning: state.isRunning,
    isExpired: state.isExpired,
    start,
    stop,
    reset,
  };
}

