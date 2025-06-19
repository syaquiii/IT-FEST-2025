import { useEffect, useState } from "react";
import { userService } from "@/api/services/user";
import { TeamProfileResponse } from "../types/teamProfile";

export const useTeamProfile = () => {
  const [data, setData] = useState<TeamProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const profileData = await userService.getMyTeamProfile();
      console.log(profileData);
      setData(profileData);
      
    } catch (err) {
      console.error("Failed to fetch team profile", err);
      setError(err instanceof Error ? err.message : "Failed to fetch team profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { 
    data, 
    loading, 
    error,
    refetch: fetchProfile
  };
};