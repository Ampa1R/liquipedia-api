export enum MatchStatus {
  Upcoming = 'Upcoming',
  Live = 'Live',
  Completed = 'Completed',
}

export interface Match {
  leftTeam: {
    name: string;
    shortName: string;
    currentScore: number;
  };
  rightTeam: {
    name: string;
    shortName: string;
    currentScore: number;
  };
  bestOf: number;
  status: MatchStatus;
  startTime: Date;
  twitchStream?: string;
  tournamentName: string;
  tournamentShortName: string;
} 