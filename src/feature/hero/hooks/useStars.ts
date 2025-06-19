import { useMemo } from "react";
import { allStarImages } from "../data/stars";
import { StaticImageData } from "next/image";

export interface DynamicStar {
  id: string;
  src: StaticImageData;
  style: React.CSSProperties;
}

const generateDynamicStarsData = (count: number): DynamicStar[] => {
  return Array.from({ length: count }, (_, index) => {
    const src = allStarImages[Math.floor(Math.random() * allStarImages.length)];
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.5 + 0.4;

    return {
      id: `random-${index}`,
      src,
      style: {
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity,
        animationName: "pulse",
        animationDuration: "2s",
        animationIterationCount: "infinite",
      },
    };
  });
};

export const useDynamicStars = (count: number): DynamicStar[] => {
  return useMemo(() => generateDynamicStarsData(count), [count]);
};
