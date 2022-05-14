import { Config } from '../types/config';
import { Hero } from '../types/dota/hero';
import { Match } from '../types/dota/match';
import { Patch } from '../types/dota/patch';
import { Player } from '../types/dota/player';
import { Team } from '../types/dota/team';
import { Transfer } from '../types/dota/transfer';
import { DotaApi } from '../api/dota';
import { DotaParser } from '../parser/dota';
import { TournamentTier } from '../types/dota/tournaments';

export class DotaClient {
  private api: DotaApi;

  private parser: DotaParser;

  constructor(config: Config) {
    this.api = new DotaApi(config);
    this.parser = new DotaParser();
  }

  async getPlayers(): Promise<Player[]> {
    throw new Error('TODO: create getPlayers method');
    const response = await this.api.getPlayers();
    // return this.parser.parsePlayers(response.parse.text['*']);
  }

  // async getPlayer(name: string): Promise<any> {
  // const response = await return this.api.getPlayer();
  // }

  async getTeams(): Promise<Team[]> {
    const response = await this.api.getTeams();
    return this.parser.parseTeams(response.parse.text['*']);
  }

  // async getTeam(name: string): Promise<any> {
  // const response = await return this.api.getTeam();
  // }

  async getTransfers(): Promise<Transfer[]> {
    const response = await this.api.getTransfers();
    return this.parser.parseTransfers(response.parse.text['*']);
  }

  async getMatches(): Promise<Match[]> {
    const response = await this.api.getMatches();
    return this.parser.parseMatches(response.parse.text['*']);
  }

  async getHeroes(): Promise<Hero[]> {
    const response = await this.api.getHeroes();
    return this.parser.parseHeroes(response.parse.text['*']);
  }

  async getItems(): Promise<any> {
    const response = await this.api.getItems();
    return this.parser.parseItems(response.parse.text['*']);
  }

  async getPatches(): Promise<Patch[]> {
    const response = await this.api.getPatches();
    return this.parser.parsePatches(response.parse.text['*']);
  }

  async getTournaments(tournamentType: TournamentTier = TournamentTier.All): Promise<any> {
    const response = await this.api.getTournaments(tournamentType);
    return this.parser.parseTournaments(response.parse.text['*']);
  }
}
