import React from "react";
import Image from "next/image";
import { useDynamicStars } from "../hooks/useStars";

const Stars = () => {
  const stars = useDynamicStars(100);

  return (
    <div className="overflow-x-hidden z-0">
      {stars.map(({ id, src, style }) => (
        <Image key={id} src={src} alt="random star" style={style} unoptimized />
      ))}
    </div>
  );
};

export default Stars;
