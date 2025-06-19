export interface TeamMember {
  full_name: string;
  student_number: string;
}

export interface TeamProfileResponse {
  leader_name: string;
  student_number: string;
  competition_category: "BP" | "UI/UX" | "Not Registered";
  deadline: string;
  members?: TeamMember[];
  team_name: string;
}