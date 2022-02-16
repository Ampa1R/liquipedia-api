export enum TeamRegion {
  NA = 'North America',
  SA = 'South America',
  EU = 'Europe',
  CIS = 'CIS',
  CHINA = 'China',
  ASIA = 'Southeast Asia',
}

export type Team = {
  name: string;
  region: TeamRegion;
  url: string;
  logo: string;
};
