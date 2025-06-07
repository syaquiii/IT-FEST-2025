"use client";

import React from "react";
import TeamListTable from "../components/TeamListTable";
import { useAuth } from "@/shared/hooks/useAuth";

const TeamListContainer = () => {
  const { user } = useAuth();
  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full">
      <TeamListTable />

    </section>
  );
};

export default TeamListContainer;