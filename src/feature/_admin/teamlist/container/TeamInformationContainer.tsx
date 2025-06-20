"use client";

import { useTeamInformation } from "../hooks/useTeamInformationData";
import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import { getPaymentStatusStyle } from "@/shared/utils/paymentStyles";
import { formatDate } from "@/shared/utils/formatDate";
import { Button } from "@/shared/components/ui/Button";

const TeamInformationContainer = () => {
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
          href="/mangujo/admin/team-list"
          className="inline-block mb-4 text-white font-bold hover:text-slate-400 transition-colors transition-100"
        >
          ← Back to Team List
        </Link>
        {/* <h4>Yuhu sampai di <span className="font-bold">{team_id}</span></h4> */}
      </div>
      <div className=" text-white">
        <h1 className="text-3xl font-bold mb-6">Team Details</h1>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Kolom Tengah (Lebih besar) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Kartu Profil Tim */}
            <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 h-full">
              <h2 className="text-xl font-bold mb-2">Team Name</h2>
              <p className="text-2xl font-semibold text-cyan-400 mb-6">{teamInformationData.team_name || '[Team Name]'}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <h3 className="font-bold text-lg">Team Leader</h3>
                  <p className="text-gray-300">Name: {teamInformationData.leader_name}</p>
                  <p className="text-gray-300">Student ID: {teamInformationData.student_number}</p>
                </div>

                {/* Mapping untuk anggota tim */}
                {teamInformationData.members.map((member, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-lg">Team Member {index + 1}</h3>
                    <p className="text-gray-300">Name: {member.full_name}</p>
                    <p className="text-gray-300">Student ID: {member.student_number}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kartu Pembayaran */}
            <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 w-full md:w-xl">
              <div className="flex justify-center space-x-6 items-center mb-4">
                <h2 className="text-xl font-bold">Payment</h2>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusStyle(teamInformationData.payment_status)}`}>
                  {teamInformationData.payment_status}
                </span>
              </div>

              <div className="flex justify-center space-x-8 items-center mt-8">
                {/* Sisi Kiri Kartu Pembayaran */}
                <div className="text-center">
                  <p className="text-gray-400 mb-2">
                    {teamInformationData.payment_transaction ? 'Link Available' : 'No Links Yet'}
                  </p>
                  <Button
                    type="submit"
                    size={"small"}
                    disabled={!teamInformationData.payment_transaction}
                    className=" text-sm sm:text-base disabled:opacity-50"
                  >
                    Check Payment
                  </Button>
                </div>

                {/* Garis Pemisah Vertikal */}
                <div className="border-l border-gray-600 h-20"></div>

                {/* Sisi Kanan Kartu Pembayaran */}
                <div className="flex flex-col gap-3">
                  <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg">
                    Accept Verify
                  </button>
                  <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg">
                    Deny Verify
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Kolom Kanan */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Kartu Kategori Lomba */}
            <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 text-center">
              <h2 className="text-5xl font-robotech font-bold text-cyan-400">{teamInformationData.competition_category}</h2>
            </div>

            {/* Kartu Stages */}
            <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300">
              <h2 className="text-xl font-bold mb-2">Stages</h2>
              <div className="text-center bg-gray-700 py-2 px-4 rounded-lg mb-4">
                <p className="font-semibold">{teamInformationData.progress.stage_status}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{teamInformationData.progress.stage_name}</p>
                <p className="text-gray-200 text-sm">
                  Until {formatDate(teamInformationData.progress.deadline)}
                </p>
                <Link 
                  href={`${team_id}/stages`} 
                  className="mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg w-full inline-block text-center"
                >
                  Open Stages Page
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamInformationContainer;