import { DotaClient } from "./client/dota";
import { Config } from "./types/config";

export class LiquipediaApi {
  dota: DotaClient;
  constructor(private config: Config) {
    this.dota = new DotaClient(config);
  }
}
