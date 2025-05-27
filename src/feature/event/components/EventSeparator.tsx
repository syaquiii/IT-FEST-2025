"use client";
import React from "react";

const EventSeparator = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-screen overflow-hidden">
      <div className="absolute bottom-2 lg:bottom-0 left-0 right-0 flex animate-pulse">
        <svg
          className="w-1/2 h-auto flex-shrink-0 transform transition-all duration-1000 ease-in-out animate-[pulse_3s_ease-in-out_infinite]"
          xmlns="http://www.w3.org/2000/svg"
          width="968"
          height="141"
          viewBox="0 0 968 141"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34.6118 55.465H127.405L159.888 107.011H398.591L387.207 88.9488H301.286C298.625 95.3914 292.283 99.9233 284.88 99.9233C275.081 99.9233 267.132 91.9751 267.132 82.176C267.132 72.372 275.081 64.4237 284.88 64.4237C292.528 64.4237 299.045 69.2607 301.542 76.0435H394.33L413.848 107.011H516.47L576.615 11.577H666.086C668.707 5.04935 675.095 0.442429 682.558 0.442429C692.357 0.442429 700.305 8.3907 700.305 18.1947C700.305 27.9938 692.357 35.942 682.558 35.942C674.97 35.942 668.497 31.1801 665.956 24.4823H583.737L580.891 28.9992L523.593 119.922H421.981L426.818 127.595H783.395L843.539 32.1555H933.011C935.632 25.6328 942.02 21.0259 949.483 21.0259C959.282 21.0259 967.23 28.9692 967.23 38.7732C967.23 48.5772 959.282 56.5205 949.483 56.5205C941.895 56.5205 935.422 51.7585 932.881 45.0608H850.662L847.811 49.5826L790.517 140.5H419.69L406.72 119.922H152.765L120.277 68.3704H34.3567C31.6956 74.808 25.353 79.3449 17.9499 79.3449C8.1509 79.3449 0.202637 71.3966 0.202637 61.5926C0.202637 51.7935 8.1509 43.8453 17.9499 43.8453C25.5981 43.8453 32.1158 48.6823 34.6118 55.4601V55.465Z"
            fill="#543588"
            className="drop-shadow-lg animate-[glow_2s_ease-in-out_infinite_alternate]"
          />
          <circle
            cx="284"
            cy="82"
            r="4"
            fill="#8B5FBF"
            className="animate-ping opacity-75"
          />
          <circle
            cx="682"
            cy="18"
            r="3"
            fill="#8B5FBF"
            className="animate-ping opacity-75"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="949"
            cy="38"
            r="3.5"
            fill="#8B5FBF"
            className="animate-ping opacity-75"
            style={{ animationDelay: "1s" }}
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="968"
          className="scale-x-[-1] w-1/2 h-auto flex-shrink-0 transform transition-all duration-1000 ease-in-out animate-[pulse_3s_ease-in-out_infinite]"
          height="141"
          viewBox="0 0 968 141"
          fill="none"
          preserveAspectRatio="none"
          style={{ animationDelay: "0.3s" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34.6118 55.465H127.405L159.888 107.011H398.591L387.207 88.9488H301.286C298.625 95.3914 292.283 99.9233 284.88 99.9233C275.081 99.9233 267.132 91.9751 267.132 82.176C267.132 72.372 275.081 64.4237 284.88 64.4237C292.528 64.4237 299.045 69.2607 301.542 76.0435H394.33L413.848 107.011H516.47L576.615 11.577H666.086C668.707 5.04935 675.095 0.442429 682.558 0.442429C692.357 0.442429 700.305 8.3907 700.305 18.1947C700.305 27.9938 692.357 35.942 682.558 35.942C674.97 35.942 668.497 31.1801 665.956 24.4823H583.737L580.891 28.9992L523.593 119.922H421.981L426.818 127.595H783.395L843.539 32.1555H933.011C935.632 25.6328 942.02 21.0259 949.483 21.0259C959.282 21.0259 967.23 28.9692 967.23 38.7732C967.23 48.5772 959.282 56.5205 949.483 56.5205C941.895 56.5205 935.422 51.7585 932.881 45.0608H850.662L847.811 49.5826L790.517 140.5H419.69L406.72 119.922H152.765L120.277 68.3704H34.3567C31.6956 74.808 25.353 79.3449 17.9499 79.3449C8.1509 79.3449 0.202637 71.3966 0.202637 61.5926C0.202637 51.7935 8.1509 43.8453 17.9499 43.8453C25.5981 43.8453 32.1158 48.6823 34.6118 55.4601V55.465Z"
            fill="#543588"
            className="drop-shadow-lg animate-[glow_2s_ease-in-out_infinite_alternate]"
          />
          <circle
            cx="284"
            cy="82"
            r="4"
            fill="#8B5FBF"
            className="animate-ping opacity-75"
            style={{ animationDelay: "1.2s" }}
          />
          <circle
            cx="682"
            cy="18"
            r="3"
            fill="#8B5FBF"
            className="animate-ping opacity-75"
            style={{ animationDelay: "0.8s" }}
          />
          <circle
            cx="949"
            cy="38"
            r="3.5"
            fill="#8B5FBF"
            className="animate-ping opacity-75"
            style={{ animationDelay: "0.2s" }}
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes glow {
          0% {
            filter: drop-shadow(0 0 5px rgba(84, 53, 136, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 20px rgba(84, 53, 136, 0.8))
              drop-shadow(0 0 30px rgba(84, 53, 136, 0.4));
          }
        }
      `}</style>
    </div>
  );
};

export default EventSeparator;
