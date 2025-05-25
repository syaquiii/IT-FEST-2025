import { useState, useRef, useEffect, useCallback } from "react";

export const useFaqAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  useEffect(() => {
    updateHeight();
  }, [isOpen, updateHeight]);

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [updateHeight]);

  return { isOpen, setIsOpen, height, contentRef };
};
