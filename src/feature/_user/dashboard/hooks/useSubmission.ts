import { useEffect, useState } from "react";
import { userService } from "@/api/services/user";
import { SubmissionsResponse, SubmissionStageResponse } from "../types/submission";

export const useSubmissions = () => {
  const [data, setData] = useState<SubmissionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const submissionsData = await userService.getSubmissions();
      console.log("Submissions data:", submissionsData);
      setData(submissionsData);
      
    } catch (err) {
      console.error("Failed to fetch submissions", err);
      setError(err instanceof Error ? err.message : "Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return { 
    data, 
    loading, 
    error,
    refetch: fetchSubmissions
  };
};

export const useSubmissionStage = () => {
  const [data, setData] = useState<SubmissionStageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissionStage = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const stageData = await userService.getSubmissionStage();
      console.log("Submission stage data:", stageData);
      setData(stageData);
      
    } catch (err) {
      console.error("Failed to fetch submission stage", err);
      setError(err instanceof Error ? err.message : "Failed to fetch submission stage");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissionStage();
  }, []);

  return { 
    data, 
    loading, 
    error,
    refetch: fetchSubmissionStage
  };
};