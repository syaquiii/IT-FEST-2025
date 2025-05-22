import React from "react";

export const useMeteorAnimation = () => {
  const styles = (
    <style jsx global>{`
      @keyframes moveRight {
        0% {
          transform: translateX(0px) translateY(0px) scaleX(-1);
        }
        25% {
          transform: translateX(20px) translateY(-10px) scaleX(-1);
        }
        50% {
          transform: translateX(40px) translateY(-20px) scaleX(-1);
        }
        75% {
          transform: translateX(20px) translateY(-10px) scaleX(-1);
        }
        100% {
          transform: translateX(0px) translateY(0px) scaleX(-1);
        }
      }

      @keyframes moveLeft {
        0% {
          transform: translateX(0px) translateY(0px);
        }
        25% {
          transform: translateX(-15px) translateY(-8px);
        }
        50% {
          transform: translateX(-30px) translateY(-16px);
        }
        75% {
          transform: translateX(-15px) translateY(-8px);
        }
        100% {
          transform: translateX(0px) translateY(0px);
        }
      }

      @keyframes glow {
        0%,
        100% {
          filter: brightness(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
        }
        50% {
          filter: brightness(1.3) drop-shadow(0 0 20px rgba(255, 255, 255, 0.7));
        }
      }

      .meteor-move-right {
        animation: moveRight 5s ease-in-out infinite,
          glow 3s ease-in-out infinite;
      }

      .meteor-move-left {
        animation: moveLeft 4.5s ease-in-out infinite,
          glow 2.5s ease-in-out infinite;
      }
    `}</style>
  );

  return { styles };
};
