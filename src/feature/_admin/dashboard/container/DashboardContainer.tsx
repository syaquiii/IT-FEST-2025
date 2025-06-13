"use client";
import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useAuth } from "@/shared/hooks/useAuth";
import { useParticipant } from "../hooks/useParticipantData";
import TotalTeamsCard from "../components/TotalTeamsCard";
import TotalPaymentsCard from "../components/TotalPaymentsCard";
import TotalEachCompe from "../components/TotalEachCompe";
import { Button } from "@/shared/components/ui/Button";
import { useDownloadTeams, useDownloadPayments } from "../hooks/useDownload";

const DashboardContainer = () => {
  const { user } = useAuth();
  const { totalAll, participantData, loading } = useParticipant();
  const [teamsMessage, setTeamsMessage] = useState<string>('');
  const [paymentsMessage, setPaymentsMessage] = useState<string>('');

  const {
    downloadTeams,
    isDownloading: isDownloadingTeams,
    error: teamsError,
    success: teamsSuccess
  } = useDownloadTeams();

  const {
    downloadPayments,
    isDownloading: isDownloadingPayments,
    error: paymentsError,
    success: paymentsSuccess
  } = useDownloadPayments();


  useEffect(() => {
    if (teamsError) {
      setTeamsMessage(teamsError);
    } else if (teamsSuccess) {
      setTeamsMessage('Teams data downloaded successfully!');
    } else {
      return;
    }

    const timer = setTimeout(() => {
      setTeamsMessage('');
    }, 3000);

    return () => clearTimeout(timer);

  }, [teamsError, teamsSuccess]);

  useEffect(() => {
    if (paymentsError) {
      setPaymentsMessage(paymentsError);
    } else if (paymentsSuccess) {
      setPaymentsMessage('Payments data downloaded successfully!');
    } else {
      return;
    }

    const timer = setTimeout(() => {
      setPaymentsMessage('');
    }, 3000);

    return () => clearTimeout(timer);

  }, [paymentsError, paymentsSuccess]);

  return (
    <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full">
      <DashboardHeader username={user?.name ? user?.name : user?.email} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="space-y-4">
          <TotalTeamsCard totalAll={totalAll} isLoading={loading} />
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
        <div>
          <h4 className="text-2xl font-changa text-white font-bold">Export Button</h4>
          <div className="mt-4 space-y-4">
            <Button
              onClick={downloadTeams}
              disabled={isDownloadingTeams}
              type="button"
              size="small"
              className={`w-full text-sm sm:text-base transition-colors duration-300 ${teamsMessage ? (teamsError ? 'bg-red-500' : 'bg-green-500') : 'hover:bg-blue-500'
                }`}
            >
              {isDownloadingTeams ? 'Downloading...' : teamsMessage || 'Download Teams Data'}
            </Button>
            <Button
              onClick={downloadPayments}
              disabled={isDownloadingPayments}
              type="button"
              size="small"
              className={`w-full text-sm sm:text-base transition-colors duration-300 ${paymentsMessage ? (paymentsError ? 'bg-red-500' : 'bg-green-500') : 'hover:bg-blue-500'
                }`}
            >
              {isDownloadingPayments ? 'Downloading...' : paymentsMessage || 'Download Payments Data'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardContainer;
