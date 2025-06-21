"use client";

import { useTeamInformation } from "../hooks/useTeamInformationData";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/shared/utils/formatDate";
import { Button } from "@/shared/components/ui/Button";
import PaymentCard from "../components/TeamInformation/PaymentCard";
import TeamInformationCard from "../components/TeamInformation/TeamInformationCard";
import { getCurrentStagesStyle } from "@/shared/utils/currentStagesStyle";
import Modal from "@/shared/components/ui/Modal";
import { teamsService } from "@/api/services/admin";

const TeamInformationContainer = () => {
  const params = useParams();
  const team_id = params.team_id as string;
  const { teamInformationData, loading, error, refetch } = useTeamInformation(team_id);
  const [modalState, setModalState] = useState({ isOpen: false, type: null as 'accept' | 'deny' | null });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!teamInformationData) {
    return <div>No team information found.</div>;
  }

  const handleAcceptVerify = () => {
    setModalState({ isOpen: true, type: 'accept' });
  };

  const handleDenyVerify = () => {
    setModalState({ isOpen: true, type: 'deny' });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleConfirmAction = async () => {
    try {
      if (modalState.type === 'accept') {
        await teamsService.verifyPayment(team_id);
      } else if (modalState.type === 'deny') {
        await teamsService.unverifyPayment(team_id);
      }
      // Refresh team data after successful update
      await refetch();
    } catch (err) {
      console.error('Error updating payment status:', err);
      // You might want to show an error toast/notification here
    } finally {
      handleCloseModal();
    }
  };

  const handleCheckPayment = () => {
    if (teamInformationData?.payment_transaction) {
      window.open(teamInformationData.payment_transaction, '_blank');
    }
  };

  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full font-changa">
      <div className="">
        <Link
          href="/mangujo/admin/team-list"
          className="inline-block mb-4 text-white font-bold hover:text-slate-400 transition-colors transition-100"
        >
          ← Back to Team List
        </Link>

      </div>
      <div className=" text-white">
        <h1 className="text-3xl font-bold mb-6">Team Details</h1>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Tengah (Lebih besar) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <TeamInformationCard teamInfo={teamInformationData} />
            <PaymentCard
              teamInfo={teamInformationData}
              onAcceptVerify={handleAcceptVerify}
              onDenyVerify={handleDenyVerify}
              onCheckPayment={handleCheckPayment}
            />
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
              <div className="text-center py-2 rounded-lg mb-4">
                <p className={getCurrentStagesStyle(teamInformationData.progress.stage_status)}>{teamInformationData.progress.stage_status}</p>
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

      {/* 6. Render Modal di sini. Ia hanya akan tampil jika isOpen adalah true */}
      <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
        <div className="text-center text-white p-4">
          <h2 className="text-2xl font-bold mb-4">
            {modalState.type === 'accept' ? 'Konfirmasi Terima Pembayaran' : 'Konfirmasi Tolak Pembayaran'}
          </h2>
          <p className="text-gray-300 mb-8">
            Apakah Anda yakin ingin {modalState.type === 'accept' ? 'MENERIMA' : 'MENOLAK'} verifikasi pembayaran ini? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              size={'small'}
              variant="secondary"
              onClick={handleCloseModal}
            >
              Batal
            </Button>
            <Button
              type="button"
              size={'small'}
              onClick={handleConfirmAction}
              className={modalState.type === 'accept' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}
            >
              Ya, {modalState.type === 'accept' ? 'Terima' : 'Tolak'}
            </Button>
          </div>
        </div>
      </Modal>

    </section>
  );
};

export default TeamInformationContainer;