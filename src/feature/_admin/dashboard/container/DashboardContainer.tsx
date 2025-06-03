"use client";
import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useAuth } from "@/shared/hooks/useAuth";
import { useParticipant } from "../hooks/useParticipantData";
import TotalTeamsCard from "../components/TotalTeamsCard";
import TotalPaymentsCard from "../components/TotalPaymentsCard";
import TotalEachCompe from "../components/TotalEachCompe";

const DashboardContainer = () => {
  const { user } = useAuth();
  const { totalAll, participantData } = useParticipant();
  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-8 md:py-12 lg:py-20 h-full">
      <DashboardHeader username={user?.name ? user?.name : user?.email} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="space-y-4">
          <TotalTeamsCard totalAll={totalAll} />
          <TotalPaymentsCard totalPayment="100" />
          <div className="flex flex-col sm:flex-row gap-4">
            <TotalEachCompe
              total_bp={participantData?.total_bp}
              label="Business Teams"
            />
            <TotalEachCompe
              total_uiux={participantData?.total_uiux}
              label="UI/UX Teams"
            />
          </div>
        </div>
        <div>b</div>
      </div>
    </section>
  );
};

export default DashboardContainer;
