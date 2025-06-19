"use client";

import Stars from "@/feature/hero/components/Stars";
import React, { useState } from "react";
import { useTeamProfile } from "../hooks/useTeamProfile";
import SideButtons from "../components/information/SideButton";
import Deadline from "../components/information/Deadline";
import Announcement from "../components/information/Announcement";
import TeamProfile from "../components/information/TeamProfile";
import Guidebook from "../components/information/Guidebook";
import SubmissionHeader from "../components/submission/SubmissionHeader";
import SubmissionStages from "../components/submission/SubmissionStage";
import SubmissionMessage from "../components/submission/SubmissionMessage";
import { useSubmissions, useSubmissionStage } from "../hooks/useSubmission";

const DashboardContainer = () => {
  const {
    data: teamData,
    loading: teamLoading,
    error: teamError,
  } = useTeamProfile();
  const {
    data: submissionsData,
    loading: submissionsLoading,
    error: submissionsError,
  } = useSubmissions();
  const {
    data: stageData,
    loading: stageLoading,
    error: stageError,
  } = useSubmissionStage();

  const [active, setActive] = useState<"info" | "submit">("info");
  const isNotRegistered = teamData?.competition_category === "Not Registered";

  if (
    teamLoading ||
    (active === "submit" && (submissionsLoading || stageLoading))
  ) {
    return (
      <div className="relative mycontainer pt-40">
        <div className="text-center py-16 text-lg font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  if (teamError || (active === "submit" && (submissionsError || stageError))) {
    return (
      <div className="relative mycontainer pt-40">
        <div className="text-center py-16 text-lg font-semibold text-red-400">
          Error loading data. Please try again later.
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="relative mycontainer pt-40">
        <Stars />
        <div className="text-center py-16 text-lg font-semibold">
          No data found.
        </div>
      </div>
    );
  }

  const getCurrentStageIndex = () => {
    if (!stageData || stageData.message === "failed to get current stage") {
      return 0;
    }
    return stageData.data.id_current_stage;
  };

  const getSubmissionStatus = () => {
    if (
      !submissionsData ||
      !Array.isArray(submissionsData) ||
      submissionsData.length === 0
    ) {
      return "No submissions yet";
    }
    return submissionsData.status || "Waiting for payment...";
  };

  return (
    <div className="relative mycontainer pt-40">
      <Stars />

      <div className="flex flex-col lg:flex-row gap-8">
        <section className="w-full lg:w-2xs">
          <SideButtons
            active={active}
            onChange={setActive}
            disabledSubmit={isNotRegistered}
          />
        </section>

        <main className="flex flex-col gap-6 w-full">
          {active === "info" ? (
            <>
              <div className="flex flex-col md:flex-row gap-6">
                <section className="w-full md:w-1/2">
                  <Deadline deadline={teamData.deadline} />
                </section>

                <section className="w-full md:w-1/2">
                  <Guidebook
                    competitionCategory={teamData.competition_category}
                  />
                </section>
              </div>

              {!isNotRegistered && (
                <div className="flex flex-col lg:flex-row gap-6">
                  <section className="w-full lg:w-2/3">
                    <TeamProfile profile={teamData} />
                  </section>

                  <section className="w-full lg:w-1/3">
                    <Announcement />
                  </section>
                </div>
              )}
            </>
          ) : (
            <>
              <SubmissionHeader
                competitionCategory={teamData.competition_category}
                status={"ayam"}
              />
             {console.log(submissionsData?.data.map((item) => (console.log(item.created_at))))}
             <SubmissionStages status={submissionsData?.data.map((stage) => (stage.status))} currentStageIndex={stageData?.data.id_current_stage}/>
              <SubmissionMessage leaderName={teamData.leader_name} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardContainer;
