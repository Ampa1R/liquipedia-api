import { DotaClient } from './client/dota';
import { PubgMobileClient } from './client/pubgmobile';
import { Config } from './types/config';

export class LiquipediaApi {
  dota: DotaClient;
  pubgmobile: PubgMobileClient;

  constructor(private config: Config) {
    this.dota = new DotaClient(config);
    this.pubgmobile = new PubgMobileClient(config);
  }
}
