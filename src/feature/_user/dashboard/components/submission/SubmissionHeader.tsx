import Image from "next/image";
import { competitionData } from "../../data/competitionData";

interface SubmissionHeaderProps {
  competitionCategory: "BP" | "UI/UX" | "Not Registered";
  status: string;
}

const SubmissionHeader = ({
  competitionCategory,
  status,
}: SubmissionHeaderProps) => {
  const content =
    competitionData[competitionCategory as keyof typeof competitionData];

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-blue-500 border-2 border-purple-300 p-4 rounded-xl mycontainer font-changa h-50">
      <section className="flex items-center gap-4">
        <Image
          src={content.icon}
          alt="Category Icon"
          width={64}
          height={64}
          className="w-50 h-50 p-2 object-contain"
        />

        <h2 className="text-5xl font-robotech text-purple-100 font-bold">
          {content.title}
        </h2>
      </section>

      <section className="text-2xl font-bold mt-2 flex flex-col gap-2 mr-10">
        Status: <span className="text-white text-lg font-normal">{status}</span>
      </section>
    </header>
  );
};

export default SubmissionHeader;
