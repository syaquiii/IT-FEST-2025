import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import crossCircle from "@/assets/img/_user/dashboard/crossCircle.webp";
import { competitionData } from "../../data/competitionData";

interface GuidebookProps {
  competitionCategory: "BP" | "UI/UX" | "Not Registered";
}

const Guidebook = ({ competitionCategory }: GuidebookProps) => {
  const isNotRegistered = competitionCategory === "Not Registered";
  const content =
    competitionData[competitionCategory as keyof typeof competitionData];

  return (
    <div className="w-full max-w-xl h-full bg-blue-500 border-2 border-purple-300 rounded-4xl p-4 flex lg:flex-row flex-col items-center justify-center text-white space-y-4">
      <section className="flex flex-col items-center">
        {isNotRegistered ? (
          <div className="relative mb-4">
            <Image
              src={content.icon}
              alt="Blank Phone"
              className="object-contain w-full max-w-xs z-10 glow-purple"
              width={150} 
              height={150}
            />
            <Image
              src={crossCircle}
              alt="Cross Circle"
              className="object-contain w-14 absolute top-10 left-8 glitch"
            />
          </div>
        ) : (
          <Image
            src={content.icon}
            alt="Category Icon"
            width={64}
            height={64}
            className="w-36 min-w-24 p-2 object-contain"
          />
        )}
      </section>

      <section className="flex-1 text-center">
        <h2
          className={`mb-2 font-bold ${
            isNotRegistered
              ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-changa"
              : "text-2xl sm:text-3xl md:text-4xl lg:text-4xl 2xl:text-5xl font-robotech text-purple-100"
          }`}
        >
          {isNotRegistered ? "Not registered yet" : content.title}
        </h2>

        <div className="flex justify-center">
          {isNotRegistered ? (
            <Button variant="primary" size="normal">
              Register Now
            </Button>
          ) : (
            <a href={content.link}>
              <Button variant="primary" size="normal">
                <span className="text-xl">Download GuideBook</span>
              </Button>
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default Guidebook;
