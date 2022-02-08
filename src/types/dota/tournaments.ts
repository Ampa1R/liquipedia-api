export enum TournamentTier {
  All = 'Portal:Tournaments',
  Tier1 = 'Tier_1_Tournaments',
  Tier2 = 'Tier_2_Tournaments',
  Tier3 = 'Tier_3_Tournaments',
  Tier4 = 'Tier_4_Tournaments',
  Qualifier = 'Qualifier_Tournaments',
  Monthly = 'Monthly_Tournaments',
  Weekly = 'Weekly_Tournaments',
  ShowMatches = 'Show_Matches',
}

export enum TournamentStatus {
  Upcoming = 'Upcoming',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
}

export interface Tournament {
  tier: TournamentTier;
  status: TournamentStatus;
  name: string;
  url: string;
  dates: string;
  teams: string;
  prizePool: string;
  hostLocation: string;
  winner: string;
  runnerUp: string;
}
