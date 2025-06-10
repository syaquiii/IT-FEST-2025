"use client";

import React from "react";
import TeamListTable from "../components/TeamListTable";
import TeamListHeader from "../components/TeamListHeader";
import { useParticipant } from "../../dashboard/hooks/useParticipantData";
import { useTeamDetails } from "../hooks/useTeamDetailsData";

const TeamListContainer = () => {
  const { totalAll } = useParticipant();
  const { teamData } = useTeamDetails();
  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full">
      <div className="mb-8">
        <TeamListHeader />
      </div>
      <TeamListTable totalAll={totalAll} teamData={teamData} />
    </section>
  );
};

export default TeamListContainer;