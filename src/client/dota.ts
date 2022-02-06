import { DotaApi } from "src/api/dota";
import { DotaParser } from "src/parser/dota";
import { Config } from "src/types/config";
import { Tournaments } from "src/types/tournaments";

export class DotaClient {
  private api: DotaApi;
  private parser: DotaParser;

  constructor(config: Config) {
    this.api = new DotaApi(config);
    this.parser = new DotaParser();
  }

  async getPlayers(): Promise<any> {
    const response = await this.api.getPlayers();
  }

  // async getPlayer(name: string): Promise<any> {
  // const response = await return this.api.getPlayer();
  // }

  async getTeams(): Promise<any> {
    const response = await this.api.getTeams();
  }

  // async getTeam(name: string): Promise<any> {
  // const response = await return this.api.getTeam();
  // }

  async getTransfers(): Promise<any> {
    const response = await this.api.getTransfers();
  }

  async getUpcomingAndOngoingMatches(): Promise<any> {
    const response = await this.api.getUpcomingAndOngoingMatches();
    return this.parser.parseMatches(response.parse.text["*"]);
  }

  async getHeroes(): Promise<any> {
    const response = await this.api.getHeroes();
  }

  async getItems(): Promise<any> {
    const response = await this.api.getItems();
  }

  async getPatches(): Promise<any> {
    const response = await this.api.getPatches();
  }

  async getTournaments(
    tournamentType: Tournaments = Tournaments.All
  ): Promise<any> {
    const response = await this.api.getTournaments(tournamentType);
  }
}
