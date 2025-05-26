import { useState, useEffect, useCallback } from "react";
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const useSlotMachineAnimation = (
  isVisible: boolean,
  targetValue: number,
  duration: number = 4000
): [number[], boolean] => {
  const [digits, setDigits] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const totalDigits = 7;

  const animateFinalDigitSmoothly = useCallback(
    (fromValue: number, toValue: number, animDuration: number) => {
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / animDuration, 1);
        const easedProgress = easeInOutCubic(progress);

        const interpolated = Math.floor(
          fromValue + (toValue - fromValue) * easedProgress
        );
        const interpolatedStr = interpolated
          .toString()
          .padStart(totalDigits, "0");

        setDigits(interpolatedStr.split("").map((d) => parseInt(d)));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setIsFinished(true);
        }
      };

      requestAnimationFrame(step);
    },
    [totalDigits]
  );

  const animateToValue = useCallback(
    (
      from: number,
      to: number,
      animDuration: number,
      onComplete?: () => void
    ) => {
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / animDuration, 1);
        const easedProgress = easeOutQuart(progress);

        const current = Math.floor(from + (to - from) * easedProgress);
        const currentString = current.toString().padStart(totalDigits, "0");

        setDigits(currentString.split("").map((d) => parseInt(d)));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          onComplete?.();
        }
      };

      requestAnimationFrame(step);
    },
    [totalDigits]
  );

  useEffect(() => {
    if (!isVisible) {
      setDigits(new Array(totalDigits).fill(0));
      setIsFinished(false);
      return;
    }

    setDigits(new Array(totalDigits).fill(0));
    setIsFinished(false);

    const intermediate = 7999999;

    animateToValue(0, intermediate, duration * 0.75, () => {
      animateFinalDigitSmoothly(intermediate, targetValue, duration * 0.25);
    });
  }, [
    isVisible,
    targetValue,
    duration,
    animateToValue,
    animateFinalDigitSmoothly,
    totalDigits,
  ]);

  return [digits, isFinished];
};
