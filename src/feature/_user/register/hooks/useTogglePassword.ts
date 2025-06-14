import { useState } from "react";

export const useTogglePassword = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return { isVisible, toggleVisibility };
};
