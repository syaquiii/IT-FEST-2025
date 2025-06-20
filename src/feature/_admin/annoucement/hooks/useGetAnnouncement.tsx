import { announcementService, AnnouncementData } from "@/api/services/admin";
import { useState, useEffect } from "react";

interface UseGetAnnouncementReturn {
  announcements: AnnouncementData[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGetAnnouncement = (): UseGetAnnouncementReturn => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await announcementService.getAnnouncements();

      if (response.status.isSuccess && response.data) {
        setAnnouncements(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch announcements"
      );
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchAnnouncements();
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    loading,
    error,
    refetch,
  };
};