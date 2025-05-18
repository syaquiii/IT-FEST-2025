import { useEffect, useState, useRef } from "react";

export const useTimelineAnimation = (id: number) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lineWidth, setLineWidth] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const timeout = setTimeout(() => {
            setIsVisible(true);
          }, id * 300);

          const lineTimeout = setTimeout(() => {
            setLineWidth(100);
          }, id * 300 - 150);

          observer.disconnect();

          return () => {
            clearTimeout(timeout);
            clearTimeout(lineTimeout);
          };
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [id]);

  return { isVisible, lineWidth, elementRef };
};
