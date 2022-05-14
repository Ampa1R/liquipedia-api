import { Transfer } from '../types/dota/transfer';
import { Team, TeamRegion } from '../types/dota/team';
import { Patch } from '../types/dota/patch';
import {
  BasicItemCategory, Item, ItemType, NeutralItemTier, UpgradeItemCategory,
} from '../types/dota/item';
import { Hero, HeroAttr } from '../types/dota/hero';
import { Tournament, TournamentStatus, TournamentTier } from '../types/dota/tournaments';
import { parse } from '../common/parse';
import { Match, MatchStatus } from '../types/dota/match';

export class DotaParser {
  parseTeams(teamsResponse: string): Team[] {
    const htmlRoot = parse(teamsResponse);
    const parent = htmlRoot.querySelector('.lp-container-fluid'); // only active teams
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

  parseHeroes(heroesResponse: string): Hero[] {
    const heroes: Hero[] = [];

    const htmlRoot = parse(heroesResponse);
    const heroesAttrBoxes = htmlRoot.querySelectorAll('.halfbox');

    const attrs = [HeroAttr.STR, HeroAttr.AGI, HeroAttr.INT];
    for (const [sectionIndex, heroesSection] of heroesAttrBoxes.entries()) {
      const attr = attrs[sectionIndex] || HeroAttr.STR;
      const heroDetailsSections = heroesSection.querySelectorAll('li');
      for (const heroDetails of heroDetailsSections) {
        const heroLink = heroDetails.querySelector('a');
        const img = heroLink?.querySelector('img')?.getAttribute('src') || '';
        const name = heroLink?.getAttribute('title') || '';
        const url = heroLink?.getAttribute('href');

        const hero: Hero = {
          name,
          attr,
          img: `https://liquipedia.net${img}`,
          url: `https://liquipedia.net${url}`,
        };
        heroes.push(hero);
      }
    }
    return heroes;
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
      const twitchStream = matchTimeContainer?.getAttribute('data-stream-twitch');

      const tournamentName = matchDetails.querySelector('.league-icon-small-image > a')?.getAttribute('title');
      const tournamentShortName = matchDetails.querySelector('.match-filler > div > div > a')?.textContent;

      if (!leftTeamName || !rightTeamName || !bestOf || !matchTime) {
        continue;
      }

      // Convert to millisecond-based timestamp (multiply by 1000)
      const startTimestamp = parseInt(matchTime, 10) * 1000;
      const startTime = new Date(startTimestamp);

      const match: Match = {
        leftTeam: {
          name: leftTeamName,
          shortName: leftTeamShortName,
        },
        rightTeam: {
          name: rightTeamName,
          shortName: rightTeamShortName,
        },
        bestOf: parseInt(bestOf.slice(2), 10),
        status: MatchStatus.Upcoming,
        startTime,
        twitchStream: twitchStream ? `https://twitch.tv/${twitchStream.toLowerCase().replace(/_/g, '')}` : undefined,
        tournamentName,
        tournamentShortName,
      };

      if (startTimestamp < Date.now()) {
        match.status = MatchStatus.Live;

        // If we're live, parse the scores
        const score = matchDetails.querySelector('.versus > div')?.textContent;
        const scores = score?.split(':');
        if (scores) {
          match.leftTeam.currentScore = parseInt(scores[0], 10);
          match.rightTeam.currentScore = parseInt(scores[1], 10);
        }
      }

      matches.push(match);
    }
    return matches;
  }

  parseTournaments(tournamentsResponse: string): Tournament[] {
    const tournaments: Tournament[] = [];

    const htmlRoot = parse(tournamentsResponse);
    const tournamentSectionBoxes = htmlRoot.querySelectorAll('.tournament-card');

    const tournamentStatuses = [TournamentStatus.Upcoming, TournamentStatus.Ongoing, TournamentStatus.Completed];
    for (const [sectionIndex, tournamentSection] of tournamentSectionBoxes.entries()) {
      const tournamentStatus = tournamentStatuses[sectionIndex] || TournamentStatus.Upcoming;

      const tournamentDetailBoxes = tournamentSection.querySelectorAll('.divRow');

      for (const tournamentDetails of tournamentDetailBoxes) {
        const tier = tournamentDetails.querySelector('.Tier a')?.textContent as TournamentTier;

        const tourLink = tournamentDetails.querySelector('.Tournament b a');
        const name = tourLink?.textContent;
        const url = tourLink?.getAttribute('href');

        const dates = tournamentDetails.querySelector('.Date')?.textContent;
        const prizePool = tournamentDetails.querySelector('.Prize')?.textContent;
        const teams = parseInt(tournamentDetails.querySelector('.PlayerNumber')?.textContent || '0', 10).toString();
        const hostLocation = tournamentDetails.querySelector('.Location')?.textContent;
        const winner = tournamentDetails
          .querySelector('.FirstPlace .team-template-team-short')
          ?.getAttribute('data-highlightingclass') || 'TBD';
        const runnerUp = tournamentDetails
          .querySelector('.SecondPlace .team-template-team-short')
          ?.getAttribute('data-highlightingclass') || 'TBD';

        if (!tier || !tourLink || !name || !url || !dates || !prizePool || !teams || !hostLocation) {
          continue;
        }

        const tournament: Tournament = {
          status: tournamentStatus,
          tier,
          name,
          url: `https://liquipedia.net${url}`,
          dates,
          prizePool,
          teams,
          hostLocation,
          winner,
          runnerUp,
        };
        tournaments.push(tournament);
      }
    }
    return tournaments;
  }

  parsePatches(patchesResponse: string): Patch[] {
    const patches: Patch[] = [];
    const htmlRoot = parse(patchesResponse);
    const parent = htmlRoot.querySelector('.wikitable');
    if (!parent) {
      return patches;
    }

    const patchDetailBoxes = parent.querySelectorAll('tr');
    for (const [i, patchDetails] of patchDetailBoxes.entries()) {
      if (i === 0) {
        // Skip table head
        continue;
      }

      const version = patchDetails.querySelector('td:nth-child(1) a')?.textContent || '';
      const url = patchDetails.querySelector('td:nth-child(1) a')?.getAttribute('href') || '';
      const date = patchDetails.querySelector('td:nth-child(2)')?.textContent || '';
      const changes = patchDetails.querySelector('td:nth-child(3)')?.textContent || '';

      const patch: Patch = {
        version,
        date: new Date(date),
        changes: changes.replace(/^\n(\s)?/g, ''),
        url: `https://liquipedia.net${url}`,
      };
      patches.push(patch);
    }

    return patches;
  }

  parseTransfers(transfersResponse: string): Transfer[] {
    const htmlRoot = parse(transfersResponse);
    const transferDetailBoxes = htmlRoot.querySelectorAll('.mainpage-transfer .divRow');

    const transfers: Transfer[] = [];
    for (const transferDetails of transferDetailBoxes) {
      const date = transferDetails.querySelector('.Date')?.textContent;
      const players = transferDetails.querySelectorAll('.Name > a');
      const from = transferDetails.querySelector('.OldTeam');
      const fromTeam = from?.querySelector('.team-template-team-icon')?.getAttribute('data-highlightingclass');
      const fromPosition = from?.querySelector('span[style="font-size:85%;font-style:italic"]')?.textContent;
      const to = transferDetails.querySelector('.NewTeam');
      const toTeam = to?.querySelector('.team-template-team-icon')?.getAttribute('data-highlightingclass');
      const toPosition = to?.querySelector('span[style="font-size:85%;font-style:italic"]')?.textContent;

      const transfer: Transfer = {
        date: new Date(date || ''),
        players: players.map(playerElement => playerElement.textContent),
        from: {
          team: fromTeam!,
          position: fromPosition,
        },
        to: {
          team: toTeam!,
          position: toPosition,
        },
      };
      transfers.push(transfer);
    }
    return transfers;
  }

  parseItems(itemsResponse: string): Item[] {
    const types = [
      {
        type: ItemType.Basic,
        categories: Object.values(BasicItemCategory),
      },
      {
        type: ItemType.RoshanDrop,
      },
      {
        type: ItemType.Upgrade,
        categories: Object.values(UpgradeItemCategory),
      },
      {
        type: ItemType.Neutral,
        categories: Object.values(NeutralItemTier),
      },
    ];

    const items: Item[] = [];

    const htmlRoot = parse(itemsResponse);
    const itemCategoryBoxes = htmlRoot.querySelectorAll('.row');

    let typeIndex = 0;
    let categoryIndex = 0;
    for (const itemCategory of itemCategoryBoxes) {
      const typeObj = types[typeIndex];
      if (!typeObj) {
        continue;
      }

      const { type } = typeObj;
      const category = typeObj.categories ? typeObj.categories[categoryIndex] : undefined;

      const itemBoxes = itemCategory.querySelectorAll('.responsive');
      for (const itemDetails of itemBoxes) {
        const url = itemDetails.querySelector('a')?.getAttribute('href') || '';
        const name = itemDetails.querySelector('a:nth-child(2)')?.getAttribute('title') || '';
        const img = itemDetails.querySelector('img')?.getAttribute('src') || '';
        const price = itemDetails.querySelector('b')?.textContent || '';

        const item = {
          type,
          category,
          url: `https://liquipedia.net${url}`,
          name,
          img: `https://liquipedia.net${img}`,
          price: parseInt(price.replace(',', ''), 10) || undefined,
        };
        items.push(item as any);
      }
      if (!typeObj.categories || typeObj.categories?.length <= categoryIndex + 1) {
        typeIndex += 1;
        categoryIndex = 0;
      } else {
        categoryIndex += 1;
      }
    }

    return items;
  }
}
