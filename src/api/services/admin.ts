import { BlobResponse } from "@/shared/type/TAuth";
import { apiClient } from "../core/core";

export interface ParticipantTotalData {
  total_uiux: number;
  total_bp: number;
}

export interface TeamDetailsData {
  team_id: string;
  team_name: string;
  leader_name: string;
  university: string;
  payment_status: string;
  competition_name: string;
  team_members: TeamMember[];
}

export interface TeamMember {
  full_name: string;
  student_number: string;
}

export interface TeamProgress {
  stage_name: string;
  stage_status: string;
  deadline: string;
}

export interface TeamInformationData {
  team_name: string;
  competition_category: string;
  leader_name: string;
  student_number: string;
  payment_status: string;
  payment_transaction: string;
  members: TeamMember[];
  progress: TeamProgress;
}

export interface TeamInformationResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: TeamInformationData; // Changed to single object since API returns one team
}

export interface TeamMember {
  name: string;
}

export interface ParticipantTotalResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: ParticipantTotalData;
}

export interface TeamDetailsResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: TeamDetailsData[];
}

export interface FileDownloadResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: Blob;
}

export interface AnnouncementData {
  id_announcement : string;
  date_announcement: string;
  message_announcement: string;
}

export interface AnnouncementResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: AnnouncementData[];
}

export interface CreateAnnouncementResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: AnnouncementData;
}

export class ParticipantService {
  private static instance: ParticipantService;

  public static getInstance(): ParticipantService {
    if (!ParticipantService.instance) {
      ParticipantService.instance = new ParticipantService();
    }
    return ParticipantService.instance;
  }

  async getTotalParticipants(): Promise<ParticipantTotalResponse> {
    try {
      const response = await apiClient.get<ParticipantTotalData>(
        "/admin/total-participants"
      );

      if (response.status.isSuccess && response.data) {
        return {
          status: response.status,
          message: response.message,
          data: response.data,
        };
      }

      return response as ParticipantTotalResponse;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Get total participants error:", err.message);
        throw new Error(err.message || "Failed to get total participants");
      }
      throw new Error("Failed to get total participants");
    }
  }

  // Method helper untuk mendapatkan total UI/UX saja
  async getTotalUIUX(): Promise<number> {
    try {
      const response = await this.getTotalParticipants();
      return response.data.total_uiux;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Get total UI/UX error:", err.message);
      }
      return 0;
    }
  }

  // Method helper untuk mendapatkan total BP saja
  async getTotalBP(): Promise<number> {
    try {
      const response = await this.getTotalParticipants();
      return response.data.total_bp;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Get total BP error:", err.message);
      }
      return 0;
    }
  }

  // Method helper untuk mendapatkan total keseluruhan
  async getTotalAll(): Promise<number> {
    try {
      const response = await this.getTotalParticipants();
      return response.data.total_uiux + response.data.total_bp;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Get total all participants error:", err.message);
      }
      return 0;
    }
  }

  async getTeamDetails(): Promise<TeamDetailsResponse> {
    try {
      const response = await apiClient.get<TeamDetailsData[]>(
        "/admin/teams"
      );

      if (response.status.isSuccess && response.data) {
        return {
          status: response.status,
          message: response.message,
          data: response.data,
        };
      }

      return response as TeamDetailsResponse;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Get teams error:", err.message);
        throw new Error(err.message || "Failed to get teams");
      }
      throw new Error("Failed to get teams");
    }
  }

  async getTeamInformation(team_id: string): Promise<TeamInformationResponse> {
    try {
      const response = await apiClient.get<TeamInformationData>( // Removed array type
        `/admin/teams/${team_id}` // Added team_id to URL
      );

      if (response.status.isSuccess && response.data) {
        return {
          status: response.status,
          message: response.message,
          data: response.data // Now matches TeamInformationResponse type
        };
      }

      return response as TeamInformationResponse;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Get team information error:", err.message);
        throw new Error(err.message || "Failed to get team information");
      }
      throw new Error("Failed to get team information");
    }
  }
}

export const participantService = ParticipantService.getInstance();


export class ExcelService {
  private static instance: ExcelService;

  public static getInstance(): ExcelService {
    if (!ExcelService.instance) {
      ExcelService.instance = new ExcelService();
    }
    return ExcelService.instance;
  }

  async downloadPaymentData(): Promise<BlobResponse> {
    try {
      const response = await apiClient.getBlob("/admin/excel/data-payment");

      if (!(response.data instanceof Blob)) {
        console.error("Invalid response format: Expected a Blob but received", typeof response.data);
        throw new Error("The server response was not a valid file.");
      }

      return response;

    } catch (err: unknown) {
      console.error("Download payment data error:", err);
      if (err instanceof Error) {
        throw new Error(`Download failed: ${err.message}`);
      }
      throw new Error("An unknown error occurred while downloading the file.");
    }
  }

  async downloadTeamsData(): Promise<BlobResponse> {
    try {
      const response = await apiClient.getBlob("/admin/excel/data-team");

      if (!(response.data instanceof Blob)) {
        console.error("Invalid response format: Expected a Blob but received", typeof response.data);
        throw new Error("The server response was not a valid file.");
      }

      return response;

    } catch (err: unknown) {
      console.error("Download payment data error:", err);
      if (err instanceof Error) {
        throw new Error(`Download failed: ${err.message}`);
      }
      throw new Error("An unknown error occurred while downloading the file.");
    }
  }
}

export const excelService = ExcelService.getInstance();



export class AnnouncementService {
  private static instance: AnnouncementService;

  public static getInstance(): AnnouncementService {
    if (!AnnouncementService.instance) {
      AnnouncementService.instance = new AnnouncementService();
    }
    return AnnouncementService.instance;
  }

  async getAnnouncements(): Promise<AnnouncementResponse> {
    try {
      const response = await apiClient.get<AnnouncementData[]>("/admin/announcement/");

      if (response.status.isSuccess && response.data) {
        return {
          status: response.status,
          message: response.message,
          data: response.data
        };
      }

      return response as AnnouncementResponse;
    } catch (err: unknown) {
      console.error("Get announcements error:", err);
      if (err instanceof Error) {
        throw new Error(err.message || "Failed to get announcements");
      }
      throw new Error("Failed to get announcements");
    }
  }

  async createAnnouncement(message: string): Promise<CreateAnnouncementResponse> {
    try {
      const response = await apiClient.post<AnnouncementData, { message: string }>(
        "/admin/announcement/",
        { message }
      );

      if (response.status.isSuccess && response.data) {
        return {
          status: response.status,
          message: response.message,
          data: response.data
        };
      }

      return response as CreateAnnouncementResponse;
    } catch (err: unknown) {
      console.error("Create announcement error:", err);
      if (err instanceof Error) {
        throw new Error(err.message || "Failed to create announcement");
      }
      throw new Error("Failed to create announcement");
    }
  }
}

export const announcementService = AnnouncementService.getInstance();