import { useState, useEffect, useRef, useCallback } from 'react';

export interface TimerState {
  elapsedSeconds: number;
  isRunning: boolean;
}

export function useTimer(initialRunning: boolean = false) {
  const [state, setState] = useState<TimerState>({
    elapsedSeconds: 0,
    isRunning: initialRunning,
  });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = window.setInterval(() => {
        setState((prev) => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        }));
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
  }, [state.isRunning]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const stop = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ elapsedSeconds: 0, isRunning: false });
  }, []);

  return {
    elapsedSeconds: state.elapsedSeconds,
    isRunning: state.isRunning,
    start,
    stop,
    reset,
  };
}

