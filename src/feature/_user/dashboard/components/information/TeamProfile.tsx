import React from "react";
import { TeamProfileResponse } from "../../types/teamProfile";

interface Props {
  profile: TeamProfileResponse;
}

const TeamProfile = ({ profile }: Props) => {
  return (
    <section className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 font-changa">
      <h2 className="text-3xl font-bold text-center mb-6">Team Profile</h2>

      <p className="font-bold text-xl">[Team Name]</p>
      <p className="font-normal text-xl mb-6">{profile.team_name}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-lg font-normal leading-relaxed">
        <section>
          <p className="font-bold text-xl">Team Leader</p>
          <div className="flex flex-wrap gap-2">
            <p>Name: </p>
            <p>{profile.leader_name || "-"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <p>Student ID: </p>
            <p>{profile.student_number || "-"}</p>
          </div>
        </section>

        <section>
          <p className="font-bold text-xl">Team Member 1</p>
          <p>Name: {profile.members?.[0]?.full_name || "-"}</p>
          <p>Student ID: {profile.members?.[0]?.student_number || "-"}</p>
        </section>

        <section>
          <p className="font-bold text-xl">Team Member 2</p>
          <p>Name: {profile.members?.[1]?.full_name || "-"}</p>
          <p>Student ID: {profile.members?.[1]?.student_number || "-"}</p>
        </section>
      </div>
    </section>
  );
};

export default TeamProfile;
