interface TransferTeam {
  team?: string;
  position?: string;
}

export interface Transfer {
  date: Date;
  players: string[];
  from: TransferTeam;
  to: TransferTeam;
}
