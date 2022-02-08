import { Config } from 'src/types/config';
import { TournamentTier } from 'src/types/dota/tournaments';
import { Request } from '../common/request';
import { Game } from '../types/dota/games';

export class DotaApi {
  private request: Request;

  constructor(private config: Config) {
    this.request = new Request(Game.DOTA, config.USER_AGENT, config.BASE_URL);
  }

  getPlayers() {
    return this.request.get('Players_(all)');
  }

  // getPlayer(name: string) {
  //   return this.request.get('')
  // }

  getTeams() {
    return this.request.get('Portal:Teams');
  }

  // getTeam(name: string) {
  //   return this.request.get('');
  // }

  getTransfers() {
    return this.request.get('Portal:Transfers');
  }

  getMatches() {
    return this.request.get('Liquipedia:Upcoming_and_ongoing_matches');
  }

  getHeroes() {
    return this.request.get('Portal:Heroes');
  }

  getItems() {
    return this.request.get('Portal:Items');
  }

  getPatches() {
    return this.request.get('Portal:Patches');
  }

  getTournaments(tournamentType: TournamentTier) {
    return this.request.get(tournamentType);
  }
}
