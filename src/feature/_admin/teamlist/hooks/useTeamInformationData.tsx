import { participantService, TeamInformationResponse, TeamInformationData } from "@/api/services/admin";
import { useState, useEffect } from "react";

interface UseTeamInformationReturn {
  teamInformationData: TeamInformationData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTeamInformation = (team_id: string): UseTeamInformationReturn => {
  const [teamInfo, setTeamInfo] = useState<TeamInformationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamInformationData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await participantService.getTeamInformation(team_id);

      if (response.status.isSuccess && response.data) {
        setTeamInfo(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch team information"
      );
      console.error("Error fetching team information:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchTeamInformationData();
  };

  useEffect(() => {
    fetchTeamInformationData();
  }, []);

  return {
    teamInformationData: teamInfo,
    loading,
    error,
    refetch,
  };
};