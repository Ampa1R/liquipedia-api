import { Transfer } from '../types/pubgmobile/transfer';
import { Team, TeamRegion } from '../types/pubgmobile/team';
import { Map } from '../types/pubgmobile/map';
import { Weapon, WeaponCategory } from '../types/pubgmobile/weapon';
import { Vehicle, VehicleCategory } from '../types/pubgmobile/vehicle';
import { Tournament, TournamentStatus, TournamentTier } from '../types/pubgmobile/tournaments';
import { parse } from '../common/parse';
import { Match, MatchStatus } from '../types/pubgmobile/match';

export class PubgMobileParser {
  parseTeams(teamsResponse: string): Team[] {
    const htmlRoot = parse(teamsResponse);
    const parent = htmlRoot.querySelector('.lp-container-fluid');
    if (!parent) {
      return [];
    }
    const regionBoxes = parent.querySelectorAll('.panel-box');

    const teams: Team[] = [];
    for (const regionBox of regionBoxes) {
      const region = regionBox.querySelector('.panel-box-heading a')?.textContent as TeamRegion;
      const teamDetailBoxes = regionBox.querySelectorAll('.team-template-team-standard');

      for (const teamDetail of teamDetailBoxes) {
        const teamLink = teamDetail.querySelector('.team-template-text a');
        const name = teamLink?.textContent;
        const url = teamLink?.getAttribute('href');
        const logo = teamDetail.querySelector('img')?.getAttribute('src');

        if (!name || !url) {
          continue;
        }

        const team: Team = {
          name,
          region,
          url: `https://liquipedia.net${url}`,
          logo: `https://liquipedia.net${logo}`,
        };
        teams.push(team);
      }
    }
    return teams;
  }

  parseMaps(mapsResponse: string): Map[] {
    const maps: Map[] = [];
    const htmlRoot = parse(mapsResponse);
    const mapBoxes = htmlRoot.querySelectorAll('.infobox');

    for (const mapBox of mapBoxes) {
      const mapLink = mapBox.querySelector('a');
      const img = mapLink?.querySelector('img')?.getAttribute('src') || '';
      const name = mapLink?.getAttribute('title') || '';
      const url = mapLink?.getAttribute('href');

      if (!name || !url) {
        continue;
      }

      const map: Map = {
        name,
        type: 'Battle Royale', // Default type, can be enhanced based on actual data
        img: `https://liquipedia.net${img}`,
        url: `https://liquipedia.net${url}`,
      };
      maps.push(map);
    }
    return maps;
  }

  parseWeapons(weaponsResponse: string): Weapon[] {
    const weapons: Weapon[] = [];
    const htmlRoot = parse(weaponsResponse);
    const weaponBoxes = htmlRoot.querySelectorAll('.infobox');

    for (const weaponBox of weaponBoxes) {
      const weaponLink = weaponBox.querySelector('a');
      const img = weaponLink?.querySelector('img')?.getAttribute('src') || '';
      const name = weaponLink?.getAttribute('title') || '';
      const url = weaponLink?.getAttribute('href');

      if (!name || !url) {
        continue;
      }

      // Determine category based on weapon name or other attributes
      let category = WeaponCategory.ASSAULT_RIFLE; // Default
      const nameLower = name.toLowerCase();
      if (nameLower.includes('smg') || nameLower.includes('ump') || nameLower.includes('vector')) {
        category = WeaponCategory.SMG;
      } else if (nameLower.includes('sniper') || nameLower.includes('kar98') || nameLower.includes('awm')) {
        category = WeaponCategory.SNIPER;
      } else if (nameLower.includes('shotgun') || nameLower.includes('s12k')) {
        category = WeaponCategory.SHOTGUN;
      } else if (nameLower.includes('pistol') || nameLower.includes('p92')) {
        category = WeaponCategory.PISTOL;
      }

      const weapon: Weapon = {
        name,
        category,
        img: `https://liquipedia.net${img}`,
        url: `https://liquipedia.net${url}`,
      };
      weapons.push(weapon);
    }
    return weapons;
  }

  parseVehicles(vehiclesResponse: string): Vehicle[] {
    const vehicles: Vehicle[] = [];
    const htmlRoot = parse(vehiclesResponse);
    const vehicleBoxes = htmlRoot.querySelectorAll('.infobox');

    for (const vehicleBox of vehicleBoxes) {
      const vehicleLink = vehicleBox.querySelector('a');
      const img = vehicleLink?.querySelector('img')?.getAttribute('src') || '';
      const name = vehicleLink?.getAttribute('title') || '';
      const url = vehicleLink?.getAttribute('href');

      if (!name || !url) {
        continue;
      }

      // Determine category based on vehicle name
      let category = VehicleCategory.LAND; // Default
      const nameLower = name.toLowerCase();
      if (nameLower.includes('boat') || nameLower.includes('jet ski')) {
        category = VehicleCategory.WATER;
      } else if (nameLower.includes('glider') || nameLower.includes('helicopter')) {
        category = VehicleCategory.AIR;
      }

      const vehicle: Vehicle = {
        name,
        category,
        img: `https://liquipedia.net${img}`,
        url: `https://liquipedia.net${url}`,
      };
      vehicles.push(vehicle);
    }
    return vehicles;
  }

  parseMatches(matchesResponse: string): Match[] {
    const htmlRoot = parse(matchesResponse);
    const matchDetailBoxes = htmlRoot.querySelectorAll('.infobox_matches_content');

    const matches: Match[] = [];
    for (const matchDetails of matchDetailBoxes) {
      const leftTeam = matchDetails.querySelector('.team-left > span');
      const leftTeamName = leftTeam?.getAttribute('data-highlightingclass');
      const leftTeamShortName = leftTeam?.querySelector('.team-template-text a')?.textContent;

      const rightTeam = matchDetails.querySelector('.team-right > span');
      const rightTeamName = rightTeam?.getAttribute('data-highlightingclass');
      const rightTeamShortName = rightTeam?.querySelector('.team-template-text a')?.textContent;

      const bestOf = matchDetails.querySelector('.versus abbr')?.textContent;

      const matchTimeContainer = matchDetails.querySelector('.timer-object');
      const matchTime = matchTimeContainer?.getAttribute('data-timestamp');

      if (!leftTeamName || !rightTeamName || !bestOf || !matchTime) {
        continue;
      }

      const twitchStream = matchTimeContainer?.getAttribute('data-stream-twitch');
      const tournamentName = matchDetails.querySelector('.match-filler')?.textContent || '';
      const tournamentShortName = matchDetails.querySelector('.match-filler a')?.textContent || '';

      const match: Match = {
        leftTeam: {
          name: leftTeamName,
          shortName: leftTeamShortName || leftTeamName,
          currentScore: 0, // Parse from actual data if available
        },
        rightTeam: {
          name: rightTeamName,
          shortName: rightTeamShortName || rightTeamName,
          currentScore: 0, // Parse from actual data if available
        },
        bestOf: parseInt(bestOf, 10) || 1,
        status: MatchStatus.Upcoming, // Parse from actual data if available
        startTime: new Date(parseInt(matchTime, 10) * 1000),
        twitchStream,
        tournamentName,
        tournamentShortName,
      };
      matches.push(match);
    }
    return matches;
  }

  parseTournaments(tournamentsResponse: string): Tournament[] {
    const htmlRoot = parse(tournamentsResponse);
    const tournamentBoxes = htmlRoot.querySelectorAll('.infobox');

    const tournaments: Tournament[] = [];
    for (const tournamentBox of tournamentBoxes) {
      const tournamentLink = tournamentBox.querySelector('a');
      const name = tournamentLink?.textContent;
      const url = tournamentLink?.getAttribute('href');

      if (!name || !url) {
        continue;
      }

      // Parse additional tournament data from the infobox
      const rows = tournamentBox.querySelectorAll('tr');
      let dates = '';
      let prizePool = '';
      let teams = '';
      let hostLocation = '';
      let winner = '';
      let runnerUp = '';

      for (const row of rows) {
        const header = row.querySelector('th')?.textContent?.toLowerCase();
        const value = row.querySelector('td')?.textContent;

        if (header && value) {
          if (header.includes('date')) {
            dates = value;
          } else if (header.includes('prize')) {
            prizePool = value;
          } else if (header.includes('team')) {
            teams = value;
          } else if (header.includes('location')) {
            hostLocation = value;
          } else if (header.includes('winner')) {
            winner = value;
          } else if (header.includes('runner')) {
            runnerUp = value;
          }
        }
      }

      const tournament: Tournament = {
        tier: TournamentTier.All, // Parse from actual data if available
        status: TournamentStatus.Upcoming, // Parse from actual data if available
        name,
        url: `https://liquipedia.net${url}`,
        dates,
        teams,
        prizePool,
        hostLocation,
        winner,
        runnerUp,
      };
      tournaments.push(tournament);
    }
    return tournaments;
  }

  parseTransfers(transfersResponse: string): Transfer[] {
    const htmlRoot = parse(transfersResponse);
    const transferBoxes = htmlRoot.querySelectorAll('.infobox');

    const transfers: Transfer[] = [];
    for (const transferBox of transferBoxes) {
      const dateElement = transferBox.querySelector('.date');
      const date = dateElement?.textContent;

      if (!date) {
        continue;
      }

      const players: string[] = [];
      const playerElements = transferBox.querySelectorAll('.player');
      for (const playerElement of playerElements) {
        const playerName = playerElement.textContent;
        if (playerName) {
          players.push(playerName);
        }
      }

      const fromTeam = transferBox.querySelector('.from-team')?.textContent;
      const toTeam = transferBox.querySelector('.to-team')?.textContent;

      const transfer: Transfer = {
        date: new Date(date),
        players,
        from: {
          team: fromTeam,
        },
        to: {
          team: toTeam,
        },
      };
      transfers.push(transfer);
    }
    return transfers;
  }
} 