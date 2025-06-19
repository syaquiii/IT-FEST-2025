import React from "react";
import { useCountdown } from "../../hooks/useCountdown";

interface Props {
  deadline: string;
}

const Deadline = ({ deadline }: Props) => {
  const timeLeft = useCountdown(deadline);

  return (
    <div className="px-2 py-14 bg-blue-500 rounded-4xl text-white text-center border-2 border-purple-300 h-full">
      <h2 className="font-changa font-bold text-3xl">
        Submission Deadline
      </h2>
      <p className="font-robotech lg:text-5xl text-5xl mt-2 text-purple-100 lg:tracking-widest tracking-wide">
        {`${timeLeft.days}:${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
      </p>
    </div>
  );
};

export default Deadline;
