"use client";
import { useState, useEffect } from "react";

const useScrollNavbar = (hideThreshold = 100, showAgainThreshold = 300) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // At the top of the page
      if (currentScrollPos === 0) {
        setIsVisible(true);
      }
      // When scrolling down and passing the first threshold
      else if (
        currentScrollPos > prevScrollPos &&
        currentScrollPos > hideThreshold &&
        currentScrollPos < showAgainThreshold
      ) {
        setIsVisible(false);
      }
      // When scrolling down past the show-again threshold
      else if (currentScrollPos > showAgainThreshold) {
        setIsVisible(true);
      }
      // When scrolling up
      else if (currentScrollPos < prevScrollPos) {
        setIsVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, hideThreshold, showAgainThreshold]);

  return { isVisible };
};

export default useScrollNavbar;
