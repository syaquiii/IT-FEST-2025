"use client";

import React from "react";
import TeamListTable from "../components/TeamListTable";
import TeamListHeader from "../components/TeamListHeader";
import { useAuth } from "@/shared/hooks/useAuth";
import { useParticipant } from "../../dashboard/hooks/useParticipantData";

const TeamListContainer = () => {
  const { user } = useAuth();
  const { totalAll } = useParticipant();
  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full">
      <div className="mb-8">
        <TeamListHeader />
      </div>
      <TeamListTable totalAll={totalAll} />
    </section>
  );
};

export default TeamListContainer;