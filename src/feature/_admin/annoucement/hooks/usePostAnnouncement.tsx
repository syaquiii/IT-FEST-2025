import { announcementService } from "@/api/services/admin";
import { useState } from "react";

interface UsePostAnnouncementReturn {
  postAnnouncement: (message: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const usePostAnnouncement = (): UsePostAnnouncementReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const postAnnouncement = async (message: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await announcementService.createAnnouncement(message);

      if (response.status.isSuccess) {
        setSuccess(true);
        return true; // <-- KEMBALIKAN true saat sukses
      } else {
        setError(response.message);
        return false; // <-- KEMBALIKAN false saat gagal
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create announcement"
      );
      console.error("Error creating announcement:", err);
      return false; // <-- KEMBALIKAN false saat error
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