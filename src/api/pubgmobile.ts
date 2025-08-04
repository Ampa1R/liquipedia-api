import { Config } from '../types/config';
import { TournamentTier } from '../types/pubgmobile/tournaments';
import { Request } from '../common/request';
import { Game } from '../types/dota/games';

/**
 * API class for interacting with Liquipedia PUBG Mobile endpoints.
 */
export class PubgMobileApi {
  private request: Request;

  /**
   * Create a new PubgMobileApi instance.
   * @param config API configuration
   */
  constructor(private config: Config) {
    this.request = new Request(Game.PUBG_MOBILE, config.USER_AGENT, config.BASE_URL);
  }

  /**
   * Get all PUBG Mobile players.
   */
  getPlayers() {
    return this.request.get('Players_(all)');
  }

  /**
   * Get all PUBG Mobile teams.
   */
  getTeams() {
    return this.request.get('Portal:Teams');
  }

  /**
   * Get all PUBG Mobile player transfers.
   */
  getTransfers() {
    return this.request.get('Portal:Transfers');
  }

  /**
   * Get all upcoming and ongoing PUBG Mobile matches.
   */
  getMatches() {
    return this.request.get('Liquipedia:Upcoming_and_ongoing_matches');
  }

  /**
   * Get all PUBG Mobile maps.
   */
  getMaps() {
    return this.request.get('Portal:Maps');
  }

  /**
   * Get all PUBG Mobile weapons.
   */
  getWeapons() {
    return this.request.get('Portal:Weapons');
  }

  /**
   * Get all PUBG Mobile vehicles.
   */
  getVehicles() {
    return this.request.get('Portal:Vehicles');
  }

  /**
   * Get all PUBG Mobile tournaments for a given tier.
   * @param tournamentTier The tournament tier to filter by
   */
  getTournaments(tournamentTier: TournamentTier) {
    return this.request.get(tournamentTier);
  }
} 