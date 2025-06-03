import { participantService, ParticipantTotalData } from "@/api/services/admin";
import { useState, useEffect } from "react";

interface UseParticipantReturn {
  participantData: ParticipantTotalData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalAll: number;
}

export const useParticipant = (): UseParticipantReturn => {
  const [participantData, setParticipantData] =
    useState<ParticipantTotalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParticipantData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await participantService.getTotalParticipants();
      setParticipantData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch participant data"
      );
      console.error("Error fetching participant data:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchParticipantData();
  };

  const totalAll = participantData
    ? participantData.total_uiux + participantData.total_bp
    : 0;

  useEffect(() => {
    fetchParticipantData();
  }, []);

  return {
    participantData,
    loading,
    error,
    refetch,
    totalAll,
  };
};
