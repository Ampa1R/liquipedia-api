export type MatchTeam = {
  name: string;
  shortName?: string;
  currentScore?: number;
};

export enum MatchStatus {
  Upcoming = 'Upcoming',
  Live = 'Live',
  Completed = 'Completed',
}

export type Match = {
  leftTeam: MatchTeam;
  rightTeam: MatchTeam;
  bestOf: number;
  status: MatchStatus;
  startTime?: Date;
  twitchStream?: string;
  tournamentName?: string;
  tournamentShortName?: string;
};

export interface MatchClient {
  getMatches(): Promise<Array<Match>>;
  getUpcomingMatches(): Promise<Array<Match>>;
  getLiveMatches(): Promise<Array<Match>>;
}
