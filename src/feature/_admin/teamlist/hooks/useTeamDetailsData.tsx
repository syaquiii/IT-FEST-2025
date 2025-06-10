import { participantService, TeamDetailsData } from "@/api/services/admin";
import { useState, useEffect } from "react";

interface UseTeamDetailsReturn {
  teamData: TeamDetailsData[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTeamDetails = (): UseTeamDetailsReturn => {
  const [teamData, setTeamData] = useState<TeamDetailsData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await participantService.getTeamDetails();
      setTeamData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch team details"
      );
      console.error("Error fetching team details:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchTeamData();
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  return {
    teamData,
    loading,
    error,
    refetch,
  };
};