import { TeamInformationData } from "@/api/services/admin";

interface TeamDetailsCardProps {
  teamInfo: TeamInformationData;
}

const TeamInformationCard = ({ teamInfo }: TeamDetailsCardProps) => {
  return (
    <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 h-full">
      <h2 className="text-xl font-bold mb-2">Team Name</h2>
      <p className="text-2xl font-semibold text-cyan-400 mb-6">
        {teamInfo.team_name || '[Team Name]'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <h3 className="font-bold text-lg">Team Leader</h3>
          <p className="text-gray-300">Name: {teamInfo.leader_name}</p>
          <p className="text-gray-300">Student ID: {teamInfo.student_number}</p>
        </div>

        {/* Mapping untuk anggota tim */}
        {teamInfo.members.map((member, index) => (
          <div key={index}>
            <h3 className="font-bold text-lg">Team Member {index + 1}</h3>
            <p className="text-gray-300">Name: {member.full_name}</p>
            <p className="text-gray-300">Student ID: {member.student_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamInformationCard;