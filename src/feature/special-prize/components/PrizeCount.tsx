"use client";
import React, { useEffect, useState } from "react";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import { useSlotMachineAnimation } from "../hooks/useCountAnimation";

const PrizeCount = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const [digits, isFinished] = useSlotMachineAnimation(
    isVisible,
    8000000,
    2500
  );
  const [isShaking, setIsShaking] = useState(false);

  // Trigger shake animation when finished
  useEffect(() => {
    if (isFinished) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 1000); // shake for 1s
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  const addThousandSeparators = (digitArray: number[]): React.ReactNode => {
    const digitString = digitArray.join("");
    const reversedDigits = digitString.split("").reverse();
    const result: React.ReactNode[] = [];

    reversedDigits.forEach((digit, index) => {
      if (index > 0 && index % 3 === 0) {
        result.unshift(
          <span key={`dot-${index}`} className="mx-1">
            .
          </span>
        );
      }
      result.unshift(
        <span
          key={`digit-${reversedDigits.length - 1 - index}`}
          className="inline-block tabular-nums"
          style={{
            minWidth: "1ch",
            textAlign: "center",
          }}
        >
          {digit}
        </span>
      );
    });

    return result;
  };

  return (
    <div
      ref={ref}
      className={`text-center font-robotech relative xl:text-9xl lg:text-4xl text-6xl textprizeglow text-blue-100 transition-transform duration-300 ${
        isShaking ? "animate-bounce-down " : ""
      }`}
    >
      <div className="flex items-center justify-center leading-none">
        <span className="mr-2">RP.</span>
        <div className="flex items-center tabular-nums leading-none">
          {addThousandSeparators(digits)}
        </div>
      </div>
    </div>
  );
};

export default PrizeCount;
