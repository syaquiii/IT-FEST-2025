import { announcementService } from "@/api/services/admin";
import { useState } from "react";

interface UsePostAnnouncementReturn {
  postAnnouncement: (message: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const usePostAnnouncement = (): UsePostAnnouncementReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const postAnnouncement = async (message: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await announcementService.createAnnouncement(message);

      if (response.status.isSuccess) {
        setSuccess(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create announcement"
      );
      console.error("Error creating announcement:", err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    postAnnouncement,
    loading,
    error,
    success,
    reset,
  };
};