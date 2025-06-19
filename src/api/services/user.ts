import { apiClient } from "@/api/core/core";
import { SubmissionItem, SubmissionsResponse, SubmissionStageResponse } from "@/feature/_user/dashboard/types/submission";
import { TeamProfileResponse } from "@/feature/_user/dashboard/types/teamProfile";

export const userService = {
    getMyTeamProfile: async (): Promise<TeamProfileResponse> => {
        const response = await apiClient.get<TeamProfileResponse>("users/my-team-profile");
        if (!response.data) {
            throw new Error("Failed to fetch team profile data");
        }
        return response.data;
    },

    getSubmissions: async (): Promise<SubmissionsResponse> => {
        const response = await apiClient.get<SubmissionsResponse>("submissions/");
        console.log('Full API response:', response);
        
        if (!response) {
            throw new Error("Failed to fetch submissions data");
        }
        
        return response;
    },

    getSubmissionStage: async (): Promise<SubmissionStageResponse> => {
        const response = await apiClient.get<SubmissionStageResponse>("submissions/stage");
        
        if (!response.data) {
            throw new Error("Failed to fetch submission stage data");
        }
        
        return response.data;
    },
};