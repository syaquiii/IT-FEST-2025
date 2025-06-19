import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

interface BaseApiResponse {
  message: string;
}
export interface SubmissionItem {
  status: string;
  created_at: Timestamp;
  stage_id: number;
  gdrive_link: string;
  team_id: string;
  team_progress_id: number;
  updated_at: Timestamp;
}

export interface SubmissionsResponse {
  data: SubmissionItem[]; 
  message: string;
  status: {
    code: number;
    isSuccess: boolean;
  };
}

export interface SubmissionStageResponse extends BaseApiResponse {
message: string;
  data: {
    deadline_next_stage : Timestamp,
    id_current_stage : number,
    id_next_stage : number,
    next_stage : number
  };
  status:  {
    code : number,
    isSucces: boolean
  }
  
}

// message: string;
//   data: string | null;
//   status:  {
//     code : number,
//     isSucces: boolean
//   }