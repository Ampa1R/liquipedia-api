import { Tournament, TournamentStatus, TournamentTier } from "../types/tournaments";
import { parse } from "../common/parse";
import { Match, MatchStatus } from "../types/match";

export class DotaParser {
  constructor() {}

  parseMatches(matchesResponse: string): Match[] {
    const htmlRoot = parse(matchesResponse);
    const matchDetailBoxes = htmlRoot.querySelectorAll(".infobox_matches_content");

    const matches: Match[] = [];
    for (const matchDetails of matchDetailBoxes) {
      const leftTeam = matchDetails.querySelector(".team-left > span");
      const leftTeamName = leftTeam?.getAttribute("data-highlightingclass");
      const leftTeamShortName = leftTeam?.querySelector(".team-template-text a")?.textContent;

      const rightTeam = matchDetails.querySelector(".team-right > span");
      const rightTeamName = rightTeam?.getAttribute("data-highlightingclass");
      const rightTeamShortName = rightTeam?.querySelector(".team-template-text a")?.textContent;

      const bestOf = matchDetails.querySelector(".versus abbr")?.textContent;

      const matchTimeContainer = matchDetails.querySelector(".timer-object");
      const matchTime = matchTimeContainer?.getAttribute("data-timestamp");
      const twitchStream = matchTimeContainer?.getAttribute("data-stream-twitch");

      const tournamentName = matchDetails.querySelector(".league-icon-small-image > a")?.getAttribute("title");

      if (!leftTeamName || !rightTeamName || !bestOf || !matchTime) {
        continue;
      }

      // Convert to millisecond-based timestamp (multiply by 1000)
      const startTimestamp = parseInt(matchTime) * 1000;
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
        bestOf: parseInt(bestOf.slice(2)),
        status: MatchStatus.Upcoming,
        startTime,
        twitchStream: twitchStream ? `https://twitch.tv/${twitchStream.toLowerCase().replace(/_/g, "")}` : undefined,
        tournamentName,
      };

      if (startTimestamp < Date.now()) {
        match.status = MatchStatus.Live;

        // If we're live, parse the scores
        const score = matchDetails.querySelector(".versus > div")?.textContent;
        const scores = score?.split(":");
        if (scores) {
          match.leftTeam.currentScore = parseInt(scores[0]);
          match.rightTeam.currentScore = parseInt(scores[1]);
        }
      }

      matches.push(match);
    }
    return matches;
  }

  parseTournaments(tournamentsResponse: string): Tournament[] {
    const tournaments: Tournament[] = [];

    const htmlRoot = parse(tournamentsResponse);
    const tournamentSectionBoxes = htmlRoot.querySelectorAll(".tournament-card");

    const tournamentStatuses = [TournamentStatus.Upcoming, TournamentStatus.Ongoing, TournamentStatus.Completed];
    for (const [sectionIndex, tournamentSection] of tournamentSectionBoxes.entries()) {
      const tournamentStatus = tournamentStatuses[sectionIndex] || TournamentStatus.Upcoming;

      const tournamentDetailBoxes = tournamentSection.querySelectorAll(".divRow");

      for (const tournamentDetails of tournamentDetailBoxes) {
        const tier = tournamentDetails.querySelector(".Tier a")?.textContent as TournamentTier;

        const tourLink = tournamentDetails.querySelector(".Tournament b a");
        const name = tourLink?.textContent;
        const url = tourLink?.getAttribute("href");

        const dates = tournamentDetails.querySelector(".Date")?.textContent;
        const prizePool = tournamentDetails.querySelector(".Prize")?.textContent;
        const teams = parseInt(tournamentDetails.querySelector(".PlayerNumber")?.textContent || "0").toString();
        const hostLocation = tournamentDetails.querySelector(".Location")?.textContent;
        const winner =
          tournamentDetails.querySelector(".FirstPlace .team-template-team-short")?.getAttribute("data-highlightingclass") || "TBD";
        const runnerUp =
          tournamentDetails.querySelector(".SecondPlace .team-template-team-short")?.getAttribute("data-highlightingclass") || "TBD";

        if (!tier || !tourLink || !name || !url || !dates || !prizePool || !teams || !hostLocation) {
          continue;
        }

        const tournament: Tournament = {
          status: tournamentStatus,
          tier: tier,
          name,
          url: `https://liqupedia.net${url}`,
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
}
