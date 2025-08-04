export enum TeamRegion {
  NA = 'North America',
  SA = 'South America',
  EU = 'Europe',
  CIS = 'CIS',
  CHINA = 'China',
  ASIA = 'Southeast Asia',
  INDIA = 'India',
  MENA = 'Middle East & North Africa',
  OCEANIA = 'Oceania',
  LATAM = 'Latin America',
}

export type Team = {
  name: string;
  region: TeamRegion;
  url: string;
  logo: string;
}; 