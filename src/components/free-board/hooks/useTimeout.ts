import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useTimeout() {
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const timeoutId = useRef<number>(0);
  const callbackRef = useRef<() => void>();

  function resetTimeout() {
    clearTimeout(timeoutId.current);
    timeoutId.current = 0;
  }

  const cancel = useCallback(() => {
    setIsRunning(false);
    setIsCompleted(false);
    setIsCanceled(true);
    resetTimeout();
  }, []);

  const completed = useCallback(() => {
    setIsRunning(false);
    setIsCompleted(true);
    setIsCanceled(false);
    resetTimeout();

    callbackRef.current?.();
  }, []);

  const start = useCallback(
    (callback: () => void, delay: number) => {
      resetTimeout();

      // must give us valid callback and delay
      if (!callback || !delay) return;

      callbackRef.current = callback;
      timeoutId.current = window.setTimeout(completed, delay);

      setIsRunning(true);
      setIsCompleted(false);
      setIsCanceled(false);
    },
    [completed]
  );

  // CREATE DESTROY HOOK
  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);

  return useMemo(
    () => ({ isRunning, isCompleted, isCanceled, start, cancel }),
    [cancel, start, isCanceled, isCompleted, isRunning]
  );
}
