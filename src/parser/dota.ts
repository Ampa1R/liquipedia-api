import { parse } from "src/common/parse";
import { Match, MatchStatus } from "src/types/match";

export class DotaParser {
  constructor() {}

  parseMatches(matchesResponse: string): Match[] {
    const htmlRoot = parse(matchesResponse);
    const matchDetailBoxes = htmlRoot.querySelectorAll(
      ".infobox_matches_content"
    );

    const matches: Match[] = [];
    for (const matchDetails of matchDetailBoxes) {
      const homeTeam = matchDetails.querySelector(".team-left > span");
      const homeTeamName = homeTeam?.getAttribute("data-highlightingclass");
      const homeTeamShortName = homeTeam?.querySelector("a")?.textContent;
      const awayTeam = matchDetails.querySelector(".team-right > span");
      const awayTeamName = awayTeam?.getAttribute("data-highlightingclass");
      const awayTeamShortName = awayTeam?.querySelector("a")?.textContent;
      const bestOf = matchDetails.querySelector(".versus abbr")?.textContent;
      const matchTimeContainer = matchDetails.querySelector(".timer-object");
      const matchTime = matchTimeContainer?.getAttribute("data-timestamp");
      const twitchStream =
        matchTimeContainer?.getAttribute("data-stream-twitch");
      const tournamentName = matchDetails
        .querySelector(".league-icon-small-image > a")
        ?.getAttribute("title");

      if (!homeTeamName || !awayTeamName || !bestOf || !matchTime) {
        continue;
      }

      // Convert to millisecond-based timestamp (multiply by 1000)
      const startTimestamp = parseInt(matchTime) * 1000;
      const startTime = new Date(startTimestamp);

      const match: Match = {
        homeTeam: {
          name: homeTeamName,
          shortName: homeTeamShortName,
        },
        awayTeam: {
          name: awayTeamName,
          shortName: awayTeamShortName,
        },
        bestOf: parseInt(bestOf.slice(2)),
        status: MatchStatus.Upcoming,
        startTime,
        twitchStream: twitchStream
          ? `https://twitch.tv/${twitchStream.toLowerCase().replace(/_/g, "")}`
          : undefined,
        tournamentName,
      };

      if (startTimestamp < Date.now()) {
        match.status = MatchStatus.Live;

        // If we're live, parse the scores
        const score = matchDetails.querySelector(".versus > div")?.textContent;
        const scores = score?.split(":");
        if (scores) {
          match.homeTeam.currentScore = parseInt(scores[0]);
          match.awayTeam.currentScore = parseInt(scores[1]);
        }
      }

      matches.push(match);
    }
    return matches;
  }
}
