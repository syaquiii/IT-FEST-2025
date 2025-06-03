import { apiClient } from "../core/core";

export interface ParticipantTotalData {
  total_uiux: number;
  total_bp: number;
}

export interface ParticipantTotalResponse {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: ParticipantTotalData;
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
}

export const participantService = ParticipantService.getInstance();
