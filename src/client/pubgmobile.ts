import { Config } from '../types/config';
import { Map } from '../types/pubgmobile/map';
import { Match } from '../types/pubgmobile/match';
import { Player } from '../types/pubgmobile/player';
import { Team } from '../types/pubgmobile/team';
import { Transfer } from '../types/pubgmobile/transfer';
import { PubgMobileApi } from '../api/pubgmobile';
import { PubgMobileParser } from '../parser/pubgmobile';
import { Tournament, TournamentTier } from '../types/pubgmobile/tournaments';
import { Weapon } from '../types/pubgmobile/weapon';
import { Vehicle } from '../types/pubgmobile/vehicle';

export class PubgMobileClient {
  private api: PubgMobileApi;
  private parser: PubgMobileParser;

  constructor(config: Config) {
    this.api = new PubgMobileApi(config);
    this.parser = new PubgMobileParser();
  }

  async getPlayers(): Promise<Player[]> {
    throw new Error('TODO: create getPlayers method');
    const response = await this.api.getPlayers();
    // return this.parser.parsePlayers(response.parse.text['*']);
  }

  async getTeams(): Promise<Team[]> {
    const response = await this.api.getTeams();
    return this.parser.parseTeams(response.parse.text['*']);
  }

  async getTransfers(): Promise<Transfer[]> {
    const response = await this.api.getTransfers();
    return this.parser.parseTransfers(response.parse.text['*']);
  }

  async getMatches(): Promise<Match[]> {
    const response = await this.api.getMatches();
    return this.parser.parseMatches(response.parse.text['*']);
  }

  async getMaps(): Promise<Map[]> {
    const response = await this.api.getMaps();
    return this.parser.parseMaps(response.parse.text['*']);
  }

  async getWeapons(): Promise<Weapon[]> {
    const response = await this.api.getWeapons();
    return this.parser.parseWeapons(response.parse.text['*']);
  }

  async getVehicles(): Promise<Vehicle[]> {
    const response = await this.api.getVehicles();
    return this.parser.parseVehicles(response.parse.text['*']);
  }

  async getTournaments(tournamentType: TournamentTier = TournamentTier.All): Promise<Tournament[]> {
    const response = await this.api.getTournaments(tournamentType);
    return this.parser.parseTournaments(response.parse.text['*']);
  }
} 