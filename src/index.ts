import { DotaApi } from "./api/dota";
import { Config } from "./types/config";

export class LiquipediaApi {
  dota: DotaApi;
  constructor(private config: Config) {
    this.dota = new DotaApi(config);
  }
}
