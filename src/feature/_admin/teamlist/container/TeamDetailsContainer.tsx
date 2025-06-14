"use client";

import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";

const TeamDetailsContainer = () => {
  const { team_id } = useParams();
  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full">
      <div className="mb-8">
        <Link
          href="/mangujo/admin/team-list"
          className="inline-block mb-4 text-white font-bold hover:text-slate-400 transition-colors transition-100"
        >
          ← Back to Team List
        </Link>
        <h4>Yuhu sampai di <span className="font-bold">{team_id}</span></h4>
      </div>
    </section>
  );
};

export default TeamDetailsContainer;