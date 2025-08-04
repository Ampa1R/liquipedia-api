export interface Transfer {
  date: Date;
  players: string[];
  from: {
    team?: string;
    position?: string;
  };
  to: {
    team?: string;
    position?: string;
  };
} 