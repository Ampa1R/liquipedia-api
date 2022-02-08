export type TeamMember = {
  nickname: string;
  fullName: string;
  joinDate: Date;
  position: string;
};

export type Team = {
  name: string;
  roster: TeamMember[];
  region: string;
  captain?: string;
};

export interface TeamClient {
  getTeam(teamName: string): Promise<Team>;
}
