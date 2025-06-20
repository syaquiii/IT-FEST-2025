"use client";

import { formatDate } from "@/shared/utils/formatDate";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useTeamInformation } from "../hooks/useTeamInformationData";
import { getCurrentStagesStyle } from "@/shared/utils/currentStagesStyle";

const TeamListContainer = () => {
    const params = useParams();
    const team_id = params.team_id as string;
    const { teamInformationData, loading, error } = useTeamInformation(team_id);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!teamInformationData) {
        return <div>No team information found.</div>;
    }
    return (
        <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full font-changa">
            <div className="">
                <Link
                    href={`/mangujo/admin/team-list/${team_id}`}
                    className="inline-block mb-4 text-white font-bold hover:text-slate-400 transition-colors transition-100"
                >
                    ← Back to Team Information
                </Link>
            </div>
            <div className=" text-white">
                <h1 className="text-3xl font-bold mb-6">Team Stages</h1>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Kartu Kategori Lomba */}
                    <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 text-center">
                        <h2 className="text-5xl font-robotech font-bold text-cyan-400">{teamInformationData.competition_category}</h2>
                    </div>

                    {/* Kartu Stages */}
                    <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 text-center">
                        <h2 className="text-xl font-bold mb-2">Stages</h2>
                        <div className="text-center py-2 rounded-lg mb-4">
                            <p className={getCurrentStagesStyle(teamInformationData.progress.stage_status)}>{teamInformationData.progress.stage_status}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold">{teamInformationData.progress.stage_name}</p>
                            <p className="text-gray-200 text-sm">
                                Until {formatDate(teamInformationData.progress.deadline)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamListContainer;