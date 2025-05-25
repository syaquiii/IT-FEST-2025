import { useState, useEffect } from "react";

export const useCountAnimation = (
  isVisible: boolean,
  targetValue: number,
  duration: number = 2000
) => {
  const [count, setCount] = useState(0);
  const framesPerSecond = 60;
  const totalFrames = (duration / 1000) * framesPerSecond;
  const incrementPerFrame = targetValue / totalFrames;

  useEffect(() => {
    if (isVisible && count < targetValue) {
      const timer = setTimeout(() => {
        const nextCount = Math.min(count + incrementPerFrame, targetValue);
        setCount(nextCount);
      }, 1000 / framesPerSecond);

      return () => clearTimeout(timer);
    }
  }, [count, isVisible, incrementPerFrame, targetValue]);

  return count;
};
